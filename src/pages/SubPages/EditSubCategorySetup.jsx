import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { FaTimes } from "react-icons/fa";
import { editGenericSubCategoryDetails, getFBSubCategories, getGenericCategoryRestaurtant, getGenericSubCategoryDetails, postGenericSubCategory } from "../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FBDetails from "./details/FBDetails";
import { BiEdit } from "react-icons/bi";

const EditSubCategorySetup = () => {
  const siteID = getItemInLocalStorage("SITEID");
  const companyId = getItemInLocalStorage("COMPANYID");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const[subcat,setsubcat]=useState([]);
  const [update, setupdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, seteditIsModalOpen] = useState(false);
  const[id,setid]=useState(null);
  const themeColor = useSelector((state) => state.theme.color);
  const [details, setDetails] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => seteditIsModalOpen(true);
  const closeModal1 = () => seteditIsModalOpen(false);
  const [formData, setFormData] = useState({
    generic_info_id:"",
    name: "",
    company_id: "",
    site_id: "",
    info_type: "", 
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const siteDetailsResp = await getGenericCategoryRestaurtant();
        
        setDetails(siteDetailsResp.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    
    const fetchCategoryDetails = async () => {
      if (!id) return;
      try {
        const siteDetailsResp = await getGenericSubCategoryDetails(id);
        
        setFormData(siteDetailsResp.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDetails();
  }, [id]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const siteDetailsResp = await getFBSubCategories();
        console.log("Subcat",siteDetailsResp);
        setsubcat(siteDetailsResp.data.sub_categories);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [update]);
  const handleCreateSubCategory = async () => {
    
   
    const sendData = new FormData();
    sendData.append("generic_sub_info[generic_info_id]", formData.generic_info_id); 
    sendData.append("generic_sub_info[name]", formData.name);
    try {
      const resp = await postGenericSubCategory(sendData);
      console.log(resp);
      setIsModalOpen(false);
      toast.success("Restaurtant SubCategory added successfully");
      // setFormData((prev) => ({
      //   ...prev,
      //   generic_info_id:"",
      //   name: "",
      // }));
      setupdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSubCategory = async () => {
    
   
    const sendData = new FormData();
    sendData.append("generic_sub_info[generic_info_id]", formData.generic_info_id); 
    sendData.append("generic_sub_info[name]", formData.name);
    try {
      const resp = await editGenericSubCategoryDetails(id,sendData);
      console.log(resp);
      seteditIsModalOpen(false);
      toast.success("Restaurtant SubCategory Updated successfully");
      // setFormData((prev) => ({
      //   ...prev,
      //   generic_info_id:"",
      //   name: "",
      // }));
      setupdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => {
            setid(row.id); // Set the id when the button is clicked
            openModal1();  // Open the modal
          }}
          >
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Category Name",
      selector: (row) => row.generic_info_name,
      sortable: true,
    },
    {
      name: "SubCategory Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Timings",
    //   selector: (row) => row.Timings,
    //   sortable: true,
    // },
  ];

 

  const data = [
    {
      id: 1,
      Category_Name: "MP",
      Timings: "10",
    },
  ];

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
        <Table columns={columns} data={subcat} isPagination={true} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="bg-white w-96 rounded-lg shadow-lg p-4 relative z-10">
            <button
              className="absolute top-4 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <FaTimes/>
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Sub Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                  Category Name
                </label>
                <select
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="category-name"
                   name="generic_info_id"
                  type="text"
                  onChange={handleChange}
                  value={formData.generic_info_id}
                  placeholder="Category Name"
                >
                  <option value="">Select Category</option>
                  {details.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                  SubCategory*
                </label>
                <input
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="subcategory"
                   name="name"
                   onChange={handleChange}
                   value={formData.name}
                  type="text"
                  placeholder="SubCategory"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description*
                </label>
                <input
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="description"
                  type="text"
                  placeholder="Description"
                />
              </div> */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleCreateSubCategory}
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
            </form>
          </div>
        </div>
      )}
       {iseditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal1}></div>
          <div className="bg-white w-96 rounded-lg shadow-lg p-4 relative z-10">
            <button
              className="absolute top-4 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal1}
            >
              <FaTimes/>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Sub Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                  Category Name
                </label>
                <select
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="category-name"
                   name="generic_info_id"
                  type="text"
                  onChange={handleChange}
                  value={formData.generic_info_id}
                  placeholder="Category Name"
                >
                  <option value="">Select Category</option>
                  {details.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                  SubCategory*
                </label>
                <input
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="subcategory"
                   name="name"
                   onChange={handleChange}
                   value={formData.name}
                  type="text"
                  placeholder="SubCategory"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description*
                </label>
                <input
 className="border p-1 px-4 w-full border-gray-500 rounded-md"
                   id="description"
                  type="text"
                  placeholder="Description"
                />
              </div> */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                 onClick={handleEditSubCategory}
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
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditSubCategorySetup;