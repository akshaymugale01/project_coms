import React, { useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getFloors } from "../../api";

const EmployeeSeatBooking = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  //   const [seatDate, setSeatDate] = useState();
  const [floors, setFloors] = useState([]);
  const [formData, setFormData] = useState({
    building_id: "",
    floor_id: "",
    seat_date: formattedDate,
    user_id: "",
  });

  const buildings = getItemInLocalStorage("Building");
 

  const handleChange = async (e) => {
    const fetchFloors = async (buildingId) => {
      const AllFloors = await getFloors(buildingId);
      setFloors(
        AllFloors.data.map((floor) => ({ name: floor.name, id: floor.id }))
      );
    };

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const buildId = Number(e.target.value);
      await fetchFloors(buildId);
      setFormData({
        ...formData,
        building_id: buildingId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <section className="w-screen">
      <div className="flex flex-col mb-10">
        <div className="flex justify-center bg-black m-5  p-2 rounded-md">
          <h2 className="text-xl font-semibold text-center text-white ">
            Book Your Seat
          </h2>
        </div>
        <div className="border border-gray-400 rounded-md mx-20 p-4">
          
         
          <div className="grid grid-cols-3 gap-5">
            <div className="grid  items-center">
              <label htmlFor="" className="font-semibold">
                Select Date :
              </label>
              <input
                type="date"
                value={formData.seat_date}
                onChange={handleChange}
                name="seat_date"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="grid ">
              <label htmlFor="" className="font-semibold">
                Select Building
              </label>
              <select
                name="building_id"
                id=""
                value={formData.building_id}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Building :</option>
                {buildings?.map((building) => (
                  <option value={building.id} key={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid ">
              <label htmlFor="" className="font-semibold">
                Select Floor :
              </label>
              <select
                name="building_id"
                id=""
                value={formData.floor_id}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Floor</option>
                {floors?.map((floor) => (
                  <option value={floor.id} key={floor.id}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-b border-gray-500 my-5 mt-10" />
          <div className="grid grid-cols-3">
            <div className="grid grid-cols-2">
              <p className="font-semibold">Booked Seats :</p>
              <p>5</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Available Seats :</p>
              <p>5</p>
            </div>
            <div className="grid grid-cols-2 mx-2">
              <p className="font-semibold">Total Seats :</p>
              <p>10</p>
            </div>
          </div>
          <div className="border-b border-gray-500 my-5 mb-10" />
          <div className="flex justify-center my-5">
            <button className="bg-black text-white p-2 px-4 rounded-md font-medium">
              Send Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};




export default EmployeeSeatBooking
