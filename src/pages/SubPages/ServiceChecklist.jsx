import React, { useEffect, useState } from "react";
import { getServicesChecklist } from "../../api";
import Table from "../../components/table/Table";
import Services from "../Services";
import Navbar from "../../components/Navbar";
import { BiEdit, BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import { DNA } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
const ServiceChecklist = () => {
  const [searchChecklistText, setSearchChecklistCheck] = useState("");
  const [filteredChecklistData, setFilteredChecklistData] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [filter, setFilter] = useState(false);
  const checklistColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/services/checklist-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/services/edit-service-checklist/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Priority level",
      selector: (row) => row.priority_level,
      sortable: true,
    },
    {
      name: "Frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
    {
      name: "No. Of Questions",
      selector: (row) =>
        Array.isArray(row.questions) ? row.questions.length : 0,
      sortable: true,
    },
    {
      name: "Associations",
      selector: (row) => (
        <div>
          <Link
            to={`/services/associate-checklist/${row.id}`}
            className="px-4 bg-green-400 text-white rounded-full"
          >
            Associate
          </Link>
        </div>
      ),
      sortable: true,
    },
  ];
  useEffect(() => {
    try {
      const fetchServicesChecklist = async () => {
        const checklistResponse = await getServicesChecklist();
        const sortedChecklists = checklistResponse.data.checklists.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setFilteredChecklistData(sortedChecklists);
        setChecklists(sortedChecklists);
        console.log(checklistResponse);
      };
      fetchServicesChecklist();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleChecklistSearch = (event) => {
    const searchValue = event.target.value;
    setSearchChecklistCheck(searchValue);
    if (searchValue.trim() === "") {
      setFilteredChecklistData(checklists);
    } else {
      const filteredResults = filteredChecklistData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredChecklistData(filteredResults);
      console.log(filteredResults);
      console.log(filteredData);
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const exportToExcel = () => {
    const mappedData = filteredChecklistData.map((check) => ({
      "Checklist Name": check.name,
      "Start Date": check.start_date,
      "End Date": check.end_date,
      Frequency: check.frequency,
      "Created On": dateFormat(check.created_at),
      // "Question": check.questions.map(q => q.toString()).join(', ')
    }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "Checklist_data.xlsx";
    const ws = XLSX.utils.json_to_sheet(mappedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex ">
      <Navbar />
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <Services />
        {/* {filter && (
          <div className="flex items-center justify-center gap-2">
            <div>
              <label htmlFor="" className="font-medium">
                Service Name:{" "}
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Service Name"
                className="border p-1 placeholder:text-sm px-4 border-gray-500 rounded-md"
              />
            </div>

            <select className="border p-1 px-4 border-gray-500 rounded-md">
              <option value="">Select Area</option>
              <option value="unit1">Area 1</option>
              <option value="unit2">Area 2</option>
              <option value="unit2">Area 3</option>
            </select>

            <select className="border p-1 px-4 border-gray-500 rounded-md">
              <option value="">Select Building</option>
              <option value="unit1">Building 1</option>
              <option value="unit2">Building 2</option>
              <option value="unit2">Building 3</option>
            </select>
            <button className="bg-black p-1 px-4 text-white rounded-md">
              Apply
            </button>
          </div>
        )} */}
        <div className="flex flex-wrap justify-between items-center my-2 ">
          <input
            type="text"
            placeholder="Search By name"
            className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            value={searchChecklistText}
            onChange={handleChecklistSearch}
          />
          <div className="flex flex-wrap gap-2">
            {/* <button
      className="text-lg font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
      onClick={() => setOmitColumn(!omitColumn)}
    >
      <IoFilterOutline />
      Filter Columns
    </button> */}
            {/* <button
              className="text-lg font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
              onClick={() => setFilter(!filter)}
            >
              <BiFilterAlt />
              Filter
            </button> */}

            <Link
              to={"/services/add-service-checklist"}
              className="bg-black  rounded-lg flex font-semibold  items-center gap-2 text-white p-2 "
              style={{ background: themeColor }}
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={exportToExcel}
              style={{ background: themeColor }}
            >
              Export
            </button>
            {/* <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={handleDownloadQRCode}
    disabled={selectedRows.length === 0}
  >
    Download QR Code
  </button> */}
          </div>
        </div>
        {checklists.length !== 0 ? (
          <Table columns={checklistColumn} data={filteredChecklistData} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceChecklist;
