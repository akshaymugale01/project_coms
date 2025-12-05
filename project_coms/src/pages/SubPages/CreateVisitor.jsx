import React, { useState, useRef } from "react";
import image from "/profile.png";
import { useSelector } from "react-redux";

const CreateVisitor = () => {
  const [behalf, setbehalf] = useState("Visitor");
  const[selfvisitor,setselfvisitor] =useState("self");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const getHeadingText = () => {
    switch (behalf) {
      case 'Visitor':
        return 'CREATE VISITOR';
      case 'Delivery':
        return 'DELIVERY & SUPPORT STAFF';
      case 'Cab':
        return 'CAB';
      default:
        return 'CREATE VISITOR';
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="flex justify-center items-center my-5 w-full p-4 ">
      <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 style={{background:themeColor}} className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          {getHeadingText()}
        </h2>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-5">
          <p className="font-semibold">For :</p>
          <div className="flex flex-col md:flex-row gap-5">
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${behalf === "Visitor" && "bg-black text-white"}`}
              onClick={() => setbehalf("Visitor")}
            >
              Visitor
            </p>
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${behalf === "Delivery" && "bg-black text-white"}`}
              onClick={() => setbehalf("Delivery")}
            >
              Delivery
            </p>
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${behalf === "Cab" && "bg-black text-white"}`}
              onClick={() => setbehalf("Cab")}
            >
              Cab
            </p>
          </div>
        </div><br/>
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-5">
          <p className="font-semibold">On Behalf :</p>
          <div className="flex flex-col md:flex-row gap-5">
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${selfvisitor === "self" && "bg-black text-white"}`}
              onClick={() => setselfvisitor("self")}
            >
             Self
            </p>
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${selfvisitor === "Others" && "bg-black text-white"}`}
              onClick={() => setselfvisitor("Others")}
            >
              Others
            </p>
           
          </div>
        </div>

        {behalf !== "Cab" && behalf !== "Delivery" && (
          <div onClick={handleImageClick} className="cursor-pointer flex justify-center items-center my-4">
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            ) : (
              <img
                src={image}
                alt="Default"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5">
        {selfvisitor !== "Self" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                User
              </label>
              <select
                id="service"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="Meeting">User1</option>
                <option value="Delivery">User2</option>
                <option value="Personal">User3</option>
                <option value="Fitout Staff">User4</option>
              </select>
            </div>
          )}
          {behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="mobileNumber" className="font-semibold">
                Mobile Number:
              </label>
              <input
                type="number"
                id="mobileNumber"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Mobile Number"
              />
            </div>
          )}

          {behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="visitorName" className="font-semibold">
                Visitor Name:
              </label>
              <input
                type="text"
                id="visitorName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Visitor Name"
              />
            </div>
          )}

          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="additionalVisitor" className="font-semibold">
                Additional Visitor:
              </label>
              <input
                type="text"
                id="additionalVisitor"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Additional Visitor"
              />
            </div>
          )}

          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="comingFrom" className="font-semibold">
                Coming from:
              </label>
              <input
                type="text"
                id="comingFrom"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Origin"
              />
            </div>
          )}

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleNumber" className="font-semibold">
              Vehicle Number:
            </label>
            <input
              type="text"
              id="vehicleNumber"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Vehicle Number"
            />
          </div>

          {behalf !== "Visitor" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="notes" className="font-semibold">
                Notes:
              </label>
              <input
                type="text"
                id="notes"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Notes"
              />
            </div>
          )}

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedDate" className="font-semibold">
              Expected Date:
            </label>
            <input
              type="date"
              id="expectedDate"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedTime" className="font-semibold">
              Expected Time:
            </label>
            <input
              type="time"
              id="expectedTime"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                Purpose:
              </label>
              <select
                id="purpose"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="Meeting">Meeting</option>
                <option value="Delivery">Delivery</option>
                <option value="Personal">Personal</option>
                <option value="Fitout Staff">Fitout Staff</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {behalf !== "Visitor" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                Category
              </label>
              <select
                id="category"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="Meeting">Courier</option>
                <option value="Delivery">R&M</option>
                <option value="Personal">Bank Services</option>
                <option value="Fitout Staff">Delivery</option>
              </select>
            </div>
          )}

          {behalf !== "Delivery" && behalf !== "Visitor" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                Service Provider
              </label>
              <select
                id="service"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="Meeting">Ola</option>
                <option value="Delivery">Uber</option>
                <option value="Personal">Meru</option>
                <option value="Fitout Staff">Kali Peeli</option>
              </select>
            </div>
          )}

       
        </div>

            

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVisitor;