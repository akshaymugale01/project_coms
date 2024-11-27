import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API_URL, getAMC, getVibeBackground } from "../../api";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import AssetNav from "../../components/navbars/AssetNav";
import { DNA } from "react-loader-spinner";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
const AMC = () => {
  const [searchText, setSearchText] = useState("");
  const [amc, setAmc] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
const themeColor = useSelector((state)=> state.theme.color)
  useEffect(() => {
    const fetchAmc = async () => {
      const AMCResponse = await getAMC();
      const sortedAmc = AMCResponse.data.sort((a,b)=> new Date(b.created_at)- new Date(a.created_at))
      setFilteredData(sortedAmc);
      setAmc(sortedAmc);
      console.log(AMCResponse);
    };
    fetchAmc();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(amc);
    } else {
      const filteredResults = amc.filter(
        (item) =>
          item.asset_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.vendor_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust the format as needed
  };

  const AMCColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/asset/asset-amc/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/assets/edit-amc/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          
        </div>
      ),
    },
    { name: "Asset Name", selector: (row) => row.asset_name },

    { name: "Vendor", selector: (row) => row.vendor_name },

    { name: "Start Date", selector: (row) => row.start_date },
    { name: "End Date", selector: (row) => row.end_date },
    { name: "Frequency", selector: (row) => row.frequency },
    
    { name: "First Service", selector: (row) => row.first_service },
    { name: "Status", selector: (row) => row.status },
    { name: "Created On", selector: (row) => dateFormat(row.created_at) },
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

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "AMC data.xlsx";
    const ws = XLSX.utils.json_to_sheet(filteredData);
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
            placeholder="Search By Asset Name, Vendor Name"
            className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={exportToExcel}
              style={{ background: themeColor }}
            >
              Export
            </button>
          </div>
        </div>

        {amc.length !== 0 ? (
          <Table columns={AMCColumn} data={filteredData} isPagination={true} />
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

export default AMC;
