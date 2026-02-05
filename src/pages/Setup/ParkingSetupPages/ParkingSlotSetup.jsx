import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { PiPlusCircle } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { updateParkingSlot, postParkingSlots ,getParkingSlots} from "../../../api";

const ParkingSlotSetup = () => {
  const themeColor = useSelector((state) => state.theme.color);

  // ✅ 1. MOVE ALL STATE TO THE TOP (Fixes the undefined variable crash)
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);


  // ✅ 2. DEFINE HANDLERS AFTER STATE
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

  const handleCreateSlot = async () => {
    if (!startTime || !endTime) {
      alert("Please select start and end time");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be greater than start time");
      return;
    }

    // 🔥 Split time into hour & minute
    const [start_hr, start_min] = startTime.split(":");
    const [end_hr, end_min] = endTime.split(":");

    const payload = {
      start_hr: Number(start_hr),
      start_min: Number(start_min),
      end_hr: Number(end_hr),
      end_min: Number(end_min),
    };

    try {
      const res = await postParkingSlots(payload);

      setData((prev) => [
        ...prev,
        {
          id: res.data.id, // 👈 IMPORTANT for edit later
          time: `${startTime} to ${endTime}`,
          create: new Date().toLocaleDateString("en-GB"),
        },
      ]);

      closeModal();
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Create slot failed", error);
      alert("Failed to create slot");
    }
  };

  const handleUpdateSlot = async () => {
    if (!startTime || !endTime) {
      alert("Please select start and end time");
      return;
    }

    const [start_hr, start_min] = startTime.split(":");
    const [end_hr, end_min] = endTime.split(":");

    try {
      await updateParkingSlot({
        id: selectedRow.id,
        parking_slot: {
          start_hr: Number(start_hr),
          start_min: Number(start_min),
          end_hr: Number(end_hr),
          end_min: Number(end_min),
        },
      });

      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRow.id
            ? { ...item, time: `${startTime} to ${endTime}` }
            : item
        )
      );

      closeModal1();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update slot");
    }
  };


  useEffect(() => {
  const fetchSlots = async () => {
    const res = await getParkingSlots();

    const formatted = res.data.map((slot) => ({
      id: slot.id,
      time: `${String(slot.start_hr).padStart(2, "0")}:${String(slot.start_min).padStart(2, "0")}
             to
             ${String(slot.end_hr).padStart(2, "0")}:${String(slot.end_min).padStart(2, "0")}`,
      create: new Date(slot.created_at).toLocaleDateString("en-GB"),
    }));

    setData(formatted);
  };

  fetchSlots();
}, []);

  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSelectedRow(row);

              const [start, end] = row.time.split(" to ");
              setStartTime(start);
              setEndTime(end);

              openModal1();
            }}
          >
            <BiEdit size={15} />
          </button>


        </div>
      ),
    },
    { name: "Timings", selector: (row) => row.time, sortable: true },
    { name: "Created On", selector: (row) => row.create, sortable: true },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
        color: "black",
        fontSize: "14px",
      },
    },
  };

  document.title = `Permit - My Citi Life`;

  return (
    <section className="flex">
      <div className="w-full flex mx-3 flex-col overflow-hidden">

        <div className="flex m-3 flex-row">
          <button
            className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            style={{ height: '1cm' }}
            onClick={openModal}
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>

        <Table
          columns={column}
          data={data}
          customStyles={customStyle}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
        />

        {/* ✅ 3. MOVE MODALS OUTSIDE TABLE (Fixed Positioning) */}

        {/* CREATE SLOT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            />
            {/* Modal Content */}
            <div className="bg-white w-[400px] rounded-lg shadow-lg p-4 relative z-10">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
              >
                <IoClose size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">Create Slot</h2>

              <div className="mb-4">
                <label className="block font-bold mb-2">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold mb-2">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 text-white px-6 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSlot}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT SLOT MODAL */}
        {isModalOpen1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal1}></div>
            <div className="bg-white w-[400px] h-[300px] rounded-lg shadow-lg p-4 relative z-10">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal1}
              >
                <IoClose size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Slot</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3"
                  />

                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3"
                  />

                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-6 mx-3 mt-3 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={closeModal1}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-3 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    // Note: Add logic here to actually save the edit if needed
                  onClick={handleUpdateSlot}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ParkingSlotSetup;