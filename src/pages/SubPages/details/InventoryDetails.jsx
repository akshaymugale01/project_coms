import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getInventoryDetails } from "../../../api";
import { BiEdit } from "react-icons/bi";

const EditStocks = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rate: "",
    available_quantity: "",
    group_name:"",
    group_id:"",
    min_stock:"",
    max_stock:"",
    sub_group_name:""
  });

  useEffect(() => {
    const fetchStockDetails = async () => {
      const stockDetails = await getInventoryDetails(id);
      setFormData(stockDetails.data);
    };
    fetchStockDetails();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
 
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <section>
      <div className="m-2">
        <h2 style={{background: themeColor}} className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
           Stock Details
        </h2>
        <div className="flex justify-end my-2">
        <Link to={`/admin/edit-stock/${id}`} className=" p-1 px-4 rounded-full justify-center flex items-center gap-2 border-2 border-black">
            <BiEdit size={15} />
            Edit
          </Link>
        </div>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <div className="flex  flex-col justify-around">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Name :
                </label>
                <input
                readOnly
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id=""
                  className="border p-1 px-4  rounded-md bg-gray-100"
                  
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Rate :
                </label>
                <input
                readOnly
                  type="text"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  id=""
                  className="border p-1 px-4  rounded-md bg-gray-100"
                  
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Available Quantity :
                </label>
                <input
                readOnly
                  type="text"
                  name="available_quantity"
                  value={formData.available_quantity}
                  onChange={handleChange}
                  id=""
                  className="border p-1 px-4  rounded-md bg-gray-100"
                 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Group :
                </label>
                <input
                  type="text"
                  name=""
                  value={formData.group_name}
                  id=""
                className="border p-1 px-4 rounded-md bg-gray-100"
                  
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Sub Group :
                </label>
                <input
                readOnly
                  type="text"
                  name=""
                  value={formData.sub_group_name}
                  id=""
                  className="border p-1 px-4 rounded-md bg-gray-100"
                 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Min Stock Level :
                </label>
                <input
                readOnly
                  type="text"
                  name=""
                  value={formData.min_stock}
                  id=""
                  className="border p-1 px-4 rounded-md bg-gray-100"
                  
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Max Stock Level :
                </label>
                <input
                readOnly
                  type="text"
                  name=""
                  value={formData.max_stock}
                  id=""
                  className="border p-1 px-4 rounded-md bg-gray-100"
                  
                />
              </div>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold">
                Description :
              </label>
              <textarea
              readOnly
                name="description"
                value={formData.description}
                onChange={handleChange}
                id=""
                
                className="border p-1 px-4 rounded-md bg-gray-100"
              ></textarea>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditStocks;
