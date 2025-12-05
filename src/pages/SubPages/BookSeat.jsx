import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getAssignedTo, getFloors } from "../../api";
import Select from "react-select";
import SeatLayout from "./SeatLayout";
import SeatTimeSlot, { initialSelectedTimes } from "./SeatTimeSlot";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const BookSeat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  //   const [seatDate, setSeatDate] = useState();
  const [selectedTimes, setSelectedTimes] = useState(initialSelectedTimes);
  const [timeSelected, setTimeSelected] = useState(false);
  const [time, setTime] = useState("")
  const [floors, setFloors] = useState([]);
  const [behalf, setBehalf] = useState("self");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    building_id: "",
    floor_id: "",
    seat_date: formattedDate,
    user_id: "",
  });
  // const handleButtonClick = (time) => {
  //   setSelectedTimes((prevState) => ({
  //     ...prevState,
  //     [time]: !prevState[time],
  //   }));
  // setTime(time)
  // console.log(time)
  //   setTimeSelected(
  //     (prevState) =>
  //       ({
  //         ...prevState,
  //         [time]: !prevState[time],
  //       } || !selectedTimes[time])
  //   );
  // };
  const handleButtonClick = (selectedTime) => {
    setSelectedTimes((prevState) => {
      const newState = { ...prevState, [selectedTime]: !prevState[selectedTime] };

      // Determine if any time slot is selected
      const anyTimeSelected = Object.values(newState).some((isSelected) => isSelected);

      // Update the state for timeSelected and time
      setTimeSelected(anyTimeSelected);
      setTime(anyTimeSelected ? selectedTime : '');

      return newState;
    });
  };

  const buildings = getItemInLocalStorage("Building");
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
        building_id: buildId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleBookSeat = async()=>{
    if(formData.floor_id === ""){
      return toast.error("All fields are Required!")
    }
    toast.success("Seat Booked Successfully")
  }
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="w-screen">
      <div className="flex flex-col mb-10">
        <div
          style={{ background: themeColor }}
          className="flex justify-center  m-5  p-2 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-white ">
            Book Your Seat
          </h2>
        </div>
        <div className="border md:border-gray-400 rounded-md md:mx-20 p-4">
          <div className="md:grid flex flex-col grid-cols-4 items-center">
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
          <div className="grid md:grid-cols-3 gap-5 my-4">
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
                name="floor_id"
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
          {/* <div className="border-b border-gray-500 my-5 mb-10" /> */}

          {formData.floor_id !== "" && (
            <SeatTimeSlot
              selectedTimes={selectedTimes}
              handleButtonClick={handleButtonClick}
            />
          )}

          {/* <div className="border-b border-gray-500 my-5 mt-10" /> */}
          {time !=="" && (
            <div>
              <p className="font-semibold border-b border-gray-500">
                Available Seats{" "}
              </p>

              <SeatLayout />
            </div>
          )}
          <div className="border-b border-gray-500 my-5 mb-10" />
          <div className="flex justify-center my-5">
            <button
              style={{ background: themeColor }}
              className=" text-white p-2 px-4 rounded-md font-medium"
              onClick={handleBookSeat}

            >
              Book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSeat;
