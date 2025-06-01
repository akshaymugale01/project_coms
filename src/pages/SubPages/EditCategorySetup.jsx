import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { editGenericCategoryDetails, getGenericCategoryDetails, getGenericCategoryRestaurtant, postGenericCategory } from "../../api";
import {
  getItemInLocalStorage
  
} from "../../utils/localStorage";
import FBDetails from "./details/FBDetails";
import { BiEdit } from "react-icons/bi";

const EditCategorySetup = () => {
  const siteID = getItemInLocalStorage("SITEID");
  const companyId = getItemInLocalStorage("COMPANYID");
  const [details, setDetails] = useState([]);
  const [id, setid] = useState();

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editisModalOpen, seteditIsModalOpen] = useState(false);

  const [update, setupdate] = useState(false);
  const themeColor = useSelector((state)=> state.theme.color);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => seteditIsModalOpen(true);
  const closeModal1 = () => seteditIsModalOpen(false);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const siteDetailsResp = await getGenericCategoryRestaurtant();
        
        setDetails(siteDetailsResp.data);
        setupdate(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [update]);
 
  const [formData, setFormData] = useState({
    name: "",
    time:"",
    company_id: "",
    site_id: "",
    info_type: "",
    
  });
  
  console.log(formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
         <button onClick={() => {
            setid(row.id); // Set the id when the button is clicked
            openModal1();  // Open the modal
          }}>
          <BiEdit/>
         </button>
        </div>
      ),
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Timings",
      selector: (row) => row.time,
      sortable: true,
    },
  ];

 
  useEffect(() => {
    
    const fetchCategoryDetails = async () => {
      if (!id) return;
      try {
        const siteDetailsResp = await getGenericCategoryDetails(id);
        
        setFormData(siteDetailsResp.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDetails();
  }, [id]);
  const data = [
    {
      id: 1,
      Category_Name: "MP",
      Timings: "10",
    },
  ];
  const navigate = useNavigate()
  const handleCreateCategory = async () => {
    
   
    const sendData = new FormData();
    sendData.append("generic_info[company_id]", companyId);
    sendData.append("generic_info[name]", formData.name);
    sendData.append("generic_info[time]", formData.time);

    sendData.append("generic_info[site_id]", siteID);
    sendData.append("generic_info[info_type]", "RestaurantCategory");

    try {
      const resp = await postGenericCategory(sendData);
      console.log(resp);
      setIsModalOpen(false);
      toast.success("Restaurtant Category added successfully");
      // setFormData((prev) => ({
      //   ...prev,
      //   name: "",
      // }));
      setupdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditCategory = async () => {
    
   
    const sendData = new FormData();
    sendData.append("generic_info[company_id]", companyId);
    sendData.append("generic_info[name]", formData.name);
    sendData.append("generic_info[site_id]", siteID);
    sendData.append("generic_info[info_type]", "RestaurantCategory");
    sendData.append("generic_info[time]", formData.time);
    try {
      const resp = await editGenericCategoryDetails(id,sendData);
      console.log(resp);
      seteditIsModalOpen(false);
      toast.success("Updated Category successfully");
      // setFormData((prev) => ({
      //   ...prev,
      //   name: "",
      // }));
      setupdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <section className="flex">
      <FBDetails/>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-end mt-10 my-2">
          {/* <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">All</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcoming"
                name="status"
                checked={selectedStatus === "upcoming"}
                onChange={() => handleStatusChange("upcoming")}
              />
              <label htmlFor="upcoming" className="text-sm">Upcoming</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">Completed</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">Cancelled</label>
            </div>
          </div> */}
          <span className="flex gap-4">
            <button
              onClick={openModal}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: '1cm' }}
            >
              <PiPlusCircle size={20} />
              Add
            </button>
          </span>
        </div>
        <Table columns={columns} data={details} isPagination={true} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="bg-white w-80 h-80 rounded-lg shadow-lg p-4 relative z-10">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Category</h2>
            <div className="flex flex-col gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                  Category Name
                </label>
                <input
                  id="category-name"
                  name="name"
                  className="border p-1 px-4 w-full border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  placeholder="Category Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timings">
               Timings
                </label>
                <input
                  id="timings"
                  name="time"
                  className="border p-1 px-4 w-full border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.time}
                  type="text"
                  placeholder="Timings"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md "
                  type="button"
                  onClick={handleCreateCategory}
                >
                  Add
                </button>
                {/* <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {editisModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal1}></div>
          <div className="bg-white w-80 h-80 rounded-lg shadow-lg p-4 relative z-10">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeModal1}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <div className="flex flex-col gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                  Category Name
                </label>
                <input
                  id="category-name"
                  name="name"
                  className="border p-1 px-4 w-full border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  placeholder="Category Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timings">
               Timings
                </label>
                <input
                  id="timings"
                  name="time"
                  className="border p-1 px-4 w-full border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.time}
                  type="text"
                  placeholder="Timings"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md "
                  type="button"
                 onClick={handleEditCategory}
                >
                  Update
                </button>
                {/* <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditCategorySetup;