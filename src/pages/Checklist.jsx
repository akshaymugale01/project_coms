import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API_URL, getChecklist, getVibeBackground } from "../api";
import Table from "../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import AssetNav from "../components/navbars/AssetNav";
import Navbar from "../components/Navbar";
import { getItemInLocalStorage } from "../utils/localStorage";
import { DNA } from "react-loader-spinner";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState("")
const themeColor =useSelector((state)=> state.theme.color)
  useEffect(() => {
    const fetchChecklist = async () => {
     try {
       const checklist = await getChecklist();
       const sortedChecklists = checklist.data.checklists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
       setChecklists(sortedChecklists);
       console.log(checklist.data.checklists)
       setFilteredData(sortedChecklists)
     } catch (error) {
      console.log(error)
     }
    };
    fetchChecklist();
    console.log(checklists);
  }, []);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },

    {
      name: "frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
    { name: "Start Date", selector: (row) => row.start_date, sortable: true },
    { name: "End Date", selector: (row) => row.end_date, sortable: true },
    {
      name: "No. of Questions",
      selector: (row) => row?.questions?.length,
      sortable: true,
    },
   
    {
      name: "Associations",
      selector: (row) => (
        <div>
          <Link to={`/assets/associate-checklist/${row.id}`} className=" px-4 bg-green-400 text-white rounded-full">Associate</Link>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-checklist/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          {/* <button className="text-red-400">
            <MdDeleteForever size={25} />
          </button> */}
        </div>
      ),
    },
  ];

  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const Get_Background = async () => {
    try {
      // const params = {
      //   user_id: user_id,
      // };
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        selectedImageIndex = data.data.index;

        // Now, you can use selectedImageSrc and selectedImageIndex as needed
        console.log("Received response:", data);

        // For example, update state or perform any other actions
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
        // dispatch(setBackground(selectedImageSrc));
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Call the function to get the background image when the component mounts
    Get_Background();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(checklists);
    } else {
      const filteredResults = checklists.filter(
        (item) =>
          
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const exportToExcel = () => {
    const mappedData = filteredData.map((check) => ({
     
      "Checklist Name": check.name,
      "Start Date": check.start_date,
      "End Date": check.end_date,
      "Frequency": check.frequency,
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

  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <AssetNav />
      <div className="flex md:flex-row flex-col justify-between items-center my-2 gap-2  ">
        <input
          type="text"
          placeholder="Search By name"
          className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
            value={searchText}
            onChange={handleSearch}
        />
        <div className="md:flex grid grid-cols-2 sm:flex-row  flex-col gap-2">
          <Link
            to={"/admin/add-checklist"}
            className="bg-black  text-sm rounded-lg flex justify-center font-semibold items-center gap-2 text-white py-2 px-4 transition-all duration-300 "
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
         
        </div>
      </div>
      {checklists.length !== 0 ?<Table columns={columns} data={filteredData} isPagination={true} /> 
     : (
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

export default Checklist;
