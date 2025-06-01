import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import FBDetails from "./FBDetails";
import { editStatusSetup, getFixedStatusSetup, getStatusSetup, getStatusSetupDetails, postStatusSetup } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";

const FBStatusSetup = () => {
  const siteID = getItemInLocalStorage("SITEID");
  const[statusdata,setstatusdata]=useState([]);
  const[id,setid]=useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[update,setupdate]=useState(false);

  const [iseditModalOpen, seteditIsModalOpen] = useState(false);
  const themeColor = useSelector((state)=> state.theme.color);
  const [selectedColor, setSelectedColor] = useState("#eb5768");
  const[status,setstatus]=useState([]);
  const [formData, setFormData] = useState({
    status: "",
    display_name: "",
    fixed_state: true,
    order: "",
    color: "",
    site_id: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const siteDetailsResp = await getStatusSetup();
        
        setstatusdata(siteDetailsResp.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [update]);
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const siteDetailsResp = await getStatusSetupDetails(id);
        
        setFormData(siteDetailsResp.data);
        setSelectedColor(siteDetailsResp.data.color);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [id]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const siteDetailsResp = await getFixedStatusSetup();
        
        setstatus(siteDetailsResp.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  
  const handleInputChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => seteditIsModalOpen(true);
  const closeModal1 = () => seteditIsModalOpen(false);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
         <button
        onClick={() => {
          setid(row.id); // Assuming 'row.id' contains the ID you want to set
          openModal1(); // Pass the row data to the modal logic
        }}
      >
        <BiEdit size={15} />
      </button>
        </div>
      ),
    },
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => row.Status,
    //   sortable: true,
    // },
    // {
    //     name: "Display",
    //     selector: (row) => row.Display,
    //     sortable: true,
    //   },
      {
        name: "Fixed Status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "Mail",
        selector: (row) => (
          <div className="flex items-center gap-4">
           <input
          type="checkbox"
          checked={row.mail}
          />
        </div>
        ),
        sortable: true,
      },
      {
        name: "SMS",
        selector: (row) => (
          <div className="flex items-center gap-4">
           <input
          type="checkbox"
          checked={row.sms}
          />
        </div>
        ),
        sortable: true,
      },
      {
        name: "Can Cancel",
        selector: (row) => (
          <div className="flex items-center gap-4">
           <input
          type="checkbox"
          checked={row.cancel}
          />
        </div>
        ),
        sortable: true,
      },
      {
        name: "Color",
        selector: (row) => row.color,
        sortable: true,
        cell: (row) => (
          <div
            style={{
              backgroundColor: row.color,
              width: "30px",
              height: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            title={row.color} // Show hex code on hover
          ></div>
        ),
      },
  ];

 
  const handleAddStatusSetup = async () => {
    
   
    const sendData = new FormData();
    sendData.append("status_restaurant[status]", formData.status);
    sendData.append("status_restaurant[order]", formData.order);
    sendData.append("status_restaurant[color]", selectedColor);
    sendData.append("status_restaurant[site_id]", siteID);
    
   
    try {
      const resp = await postStatusSetup(sendData);
      console.log(resp);
      setIsModalOpen(false);
      toast.success("Status added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditStatusSetup = async () => {
    
   
    const sendData = new FormData();
    sendData.append("status_restaurant[status]", formData.status);
    sendData.append("status_restaurant[order]", formData.order);
    sendData.append("status_restaurant[color]", selectedColor);
    sendData.append("status_restaurant[site_id]", siteID);
    
   
    try {
      const resp = await editStatusSetup(id,sendData);
      console.log(resp);
      
      seteditIsModalOpen(false);
      setupdate(true);
      toast.success("Status updated successfully");
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
              
            >
              <PiPlusCircle size={20} />
              Add
            </button>
          </span>
        </div>
        <Table columns={columns} data={statusdata} isPagination={true} />
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
    <div className="bg-white w-96 h-auto rounded-lg shadow-lg p-4 relative z-10">
      <button
        className="absolute top-4 right-2 text-gray-600 hover:text-gray-900"
        onClick={closeModal}
      >
        <FaTimes/>
      </button>
      <h2 className="text-xl font-semibold mb-4">Add Status</h2>
      <div className="grid grid-cols-1 gap-2">

        {/* <div className="grid gap-1">
          <label className="block text-gray-700 text-sm font-bold " htmlFor="status">
            Status
          </label>
          <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="status"
            type="text"
            placeholder="Status"
          />
        </div>
       
          <div className=" grid gap-1">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="display-name">
              Display Name*
            </label>
            <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="display-name"
              type="text"
              placeholder="Display Name"
            />
          </div> */}
          <div className="grid gap-1">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="fixed-state">
              Fixed Status*
            </label>
           <select 
           name="status" 
           id="status"   
           onChange={handleChange}
           value={formData.status} 
                              className="border p-1 px-4 border-gray-500 rounded-md"
           >
            {status.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
           </select>
          </div>
        
        <div className="grid gap-1">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="order">
            Order
          </label>
          <input
          name="order" 
          id="order"   
          onChange={handleChange}
          value={formData.order} 
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              
            type="text"
            placeholder="Order"
          />
        </div>
        {/* <div className="grid gap-1 mb-2 ">
          <label className="block text-gray-700 text-sm font-bold " htmlFor="color">
            Color:
          </label>
          <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="color"
            type="text"
            placeholder="Color"
          />
        </div> */}
         <div className="p-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="color"
      >
        Color:
      </label>
      <div className="flex flex-col items-center space-y-4 p-4">
      <label className="block text-gray-700 text-sm font-bold">Pick a Color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={handleInputChange}
        className="w-10 h-10 cursor-pointer rounded-full shadow-lg"
        style={{ backgroundColor: selectedColor }}
      />
      <input
        type="text"
        value={selectedColor}
        name="color" 
        id="color"   
       
        
        onChange={handleInputChange}
        className="border p-2 text-center border  border-black rounded-md w-40"
        placeholder="Enter Hex Code"
      />
    </div>
    </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddStatusSetup}
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
)}
{iseditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal1}></div>
    <div className="bg-white w-96 h-auto rounded-lg shadow-lg p-4 relative z-10">
      <button
        className="absolute top-4 right-2 text-gray-600 hover:text-gray-900"
        onClick={closeModal1}
      >
        <FaTimes/>
      </button>
      <h2 className="text-xl font-semibold mb-4">Edit Status</h2>
      <div className="grid grid-cols-1 gap-2">

        {/* <div className="grid gap-1">
          <label className="block text-gray-700 text-sm font-bold " htmlFor="status">
            Status
          </label>
          <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="status"
            type="text"
            placeholder="Status"
          />
        </div>
       
          <div className=" grid gap-1">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="display-name">
              Display Name*
            </label>
            <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="display-name"
              type="text"
              placeholder="Display Name"
            />
          </div> */}
          <div className="grid gap-1">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="fixed-state">
              Fixed Status*
            </label>
           <select 
           name="status" 
           id="status"   
           onChange={handleChange}
           value={formData.status} 
                              className="border p-1 px-4 border-gray-500 rounded-md"
           >
            {status.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
           </select>
          </div>
        
        <div className="grid gap-1">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="order">
            Order
          </label>
          <input
          name="order" 
          id="order"   
          onChange={handleChange}
          value={formData.order} 
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              
            type="text"
            placeholder="Order"
          />
        </div>
        {/* <div className="grid gap-1 mb-2 ">
          <label className="block text-gray-700 text-sm font-bold " htmlFor="color">
            Color:
          </label>
          <input
                              className="border p-1 px-4 border-gray-500 rounded-md"
                              id="color"
            type="text"
            placeholder="Color"
          />
        </div> */}
         <div className="p-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="color"
      >
        Color:
      </label>
      <div className="flex flex-col items-center space-y-4 p-4">
      <label className="block text-gray-700 text-sm font-bold">Pick a Color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={handleInputChange}
        className="w-10 h-10 cursor-pointer rounded-full shadow-lg"
        style={{ backgroundColor: selectedColor }}
      />
      <input
        type="text"
        value={selectedColor}
        name="color" 
        id="color"   
       
        
        onChange={handleInputChange}
        className="border p-2 text-center border  border-black rounded-md w-40"
        placeholder="Enter Hex Code"
      />
    </div>
    </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleEditStatusSetup}
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
)}

    </section>
  );
};

export default FBStatusSetup;