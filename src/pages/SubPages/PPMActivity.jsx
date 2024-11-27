import React, { useEffect, useState } from "react";
import { API_URL, getAssetPPMList, getVibeBackground } from "../../api";

import { BiEdit } from "react-icons/bi";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import AssetNav from "../../components/navbars/AssetNav";
import Navbar from "../../components/Navbar";
import { getItemInLocalStorage } from "../../utils/localStorage";

const PPMActivity = () => {
  const [ppms, setPPms] = useState([]);
  const [searchPPMText, setSearchPPMCheck] = useState("");
  const [filteredPPMData, setFilteredPPMData] = useState([]);
  const themeColor = useSelector((state)=>state.theme.color)
  const handlePPMSearch = (event) => {
    const searchValue = event.target.value;
    setSearchPPMCheck(searchValue);
    if (searchValue.trim() === "") {
      setFilteredPPMData(ppms);
    } else {
      const filteredResults = filteredPPMData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPPMData(filteredResults);
      console.log(filteredResults);
      
    }
  };
  useEffect(() => {
    try {
      const fetchServicePPM = async () => {
        const ServicePPMResponse = await getAssetPPMList();
        const sortedPPMData = ServicePPMResponse.data.checklists.sort((a, b) => {
         
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setFilteredPPMData(sortedPPMData);
        setPPms(sortedPPMData);
        console.log(ServicePPMResponse.data.checklists);
      };
      fetchServicePPM();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(filteredPPMData)
  const PPMColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* :assetId/:activityId */}
          <Link to={`/asset/ppm-activity-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
          {/* <Link to={`/services/edit-ppm/${row.id}`}>
            <BiEdit size={15} />
          </Link> */}
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
      name: "Frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
    // {
    //   name: "Assigned To",
    //   selector: (row) => row.user_id,
    //   sortable: true,
    // },
    {
      name: "No. Of Questions",
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
      console.log("success");

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

  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <AssetNav/>
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
            value={searchPPMText}
            onChange={handlePPMSearch}
          />
          <div className="flex flex-wrap gap-2">
          <Link
                  to={"/asset/add-asset-ppm"}
                  style={{background: themeColor}}
                  className="  rounded-lg flex font-semibold  items-center gap-2 text-white p-2 "
                >
                  <IoAddCircleOutline size={20} />
                  Add
                </Link>
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
                </button>

               
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={exportToExcel}
                >
                  Export
                </button> */}
            {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadQRCode}
          disabled={selectedRows.length === 0}
        >
          Download QR Code
        </button> */}
          </div>
        </div>
        <Table columns={PPMColumn} data={filteredPPMData} />
        
     
      </div>
    </section>
    
  );
};

export default PPMActivity;
