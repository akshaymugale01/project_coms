import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAssignedTo } from "../../api";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
const AddParking = () => {
  const [behalf, setBehalf] = useState("self")
  const[users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    on_behalf:""
  })
  const buildings = getItemInLocalStorage("Building")
  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        // setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };
    fetchAssignedTo();
    console.log(users);
  }, []);
  const themeColor = useSelector((state)=> state.theme.color)
  return (
    <section className="w-screen">
      <div className="flex flex-col md:items-center mb-10">
        <div style={{background: themeColor}} className="flex justify-center bg-black mx-5 my-2 w-full p-2 rounded-md">
          <h2 className="text-xl font-semibold text-center mx-2 text-white w-full">
            Book Parking
          </h2>
        </div>
        <div className="md:border border-gray-400 rounded-md md:mx-10 md:w-[60rem] p-4">
        <div className="md:grid flex flex-col grid-cols-3 items-center my-2">
            <p className="font-semibold">For :</p>
            <div className="flex gap-5">
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "self" && "bg-black text-white"
                }`}
                onClick={() => setBehalf("self")}
              >
                Self
              </p>
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "others" && "bg-black text-white"
                }`}
                onClick={() => setBehalf("others")}
              >
                Others
              </p>
            </div>
            {behalf === "others" && (
              <Select
                options={users}
                placeholder="Select User"
                value={formData.on_behalf}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, on_behalf: selectedOption })
                }
                className="w-full my-2"
                isMulti
              />
            )}
          </div>
          <div className="flex md:grid  grid-cols-3 justify-between gap-4  flex-col">
            <div className="flex flex-col">
              {/* <div className="grid grid-cols-2 items-center"> */}
              <p className="font-semibold">Select Date :</p>
             <input type="date" name="" id="" className="border p-1 px-4 border-gray-500 rounded-md" />
            </div>
            <div className="flex flex-col">
              {/* <div className="grid grid-cols-2 items-center"> */}
              <p className="font-semibold">Select Tower :</p>
              <select className="border p-1 px-4 border-gray-500 rounded-md">
                <option value="">Select Tower</option>
                {buildings.map((build)=>(
                  <option value={build.id} key={build.id}>{build.name}</option>
                ))}
              </select>
            </div>
            {/* <div className="grid grid-cols-2 items-center "> */}
            <div className="flex flex-col">
              <p className="font-semibold ">Select Floor :</p>
              <select className="border p-1 px-4 border-gray-500 rounded-md">
                <option value="">Select Floor</option>
                <option value="user1">Floor 1</option>
                <option value="User2">Floor 2</option>
              </select>
            </div>
            {/* <div className="grid grid-cols-2 items-center "> */}
            <div className="flex flex-col">
              <p className="font-semibold ">Select Parking Slot :</p>
              <select className="border p-1 px-4 border-gray-500 rounded-md">
                <option value="">Select Parking Slot</option>
                <option value="all">All</option>
                <option value="EV">EV</option>
                <option value="visitor">Visitor</option>
              </select>
            </div>
            {/* <div className="flex justify-center mt-5">
              <button className="p-1 px-4 border-2 border-black rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300">
                Submit
              </button>
            </div> */}
          {/* </div> */}

          {/* <div className="my-5">
            <div className="flex md:grid grid-cols-3 flex-col gap-4 justify-between my-2 md:gap-2"> */}
            <div className="grid  items-center">
                <label className="font-semibold">Vehicle Type :</label>
                <select className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Vehicle Type</option>
                  <option value="4 wheeler">4 Wheeler</option>
                  <option value="2 wheeler">2 Wheeler</option>
                </select>
              </div>
              {/* <div className="flex flex-col">
                <p className="font-semibold ">Employee Name :</p>
                <select className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Employee</option>
                  <option value="all">Employee A</option>
                  <option value="EV">Employee B</option>
                  <option value="visitor">Employee C</option>
                </select>
              </div> */}
              {/* <div>
                <div className="grid grid-cols-2 items-center ">
                  <p className="font-semibold ">Free Slot :</p>
                  <p>10</p>
                </div>
                <div className="grid grid-cols-2 items-center ">
                  <p className="font-semibold ">Paid Slot :</p>
                  <p>10</p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center ">
                <p className="font-semibold ">Available Slot :</p>
                <p>10</p>
              </div> */}
              
              <div className="grid  items-center">
                <p className="font-semibold">From :</p>
                <input
                  type="time"
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="grid items-center">
                <p className="font-semibold">To :</p>
                <input
                  type="time"
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
             
              </div>
            {/*
          </div> */}

          <div className="flex justify-center">
            <button className="p-1 px-4 bg-black text-white hover:bg-white hover:text-black rounded-md border-2 border-black font-medium transition-all duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddParking;
