import React, { useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SetupSeat = () => {
  const [selectedSeatType, setSelectedSeatType] = useState("Linear WS");
  const [seatConfigs, setSeatConfigs] = useState({
    "Linear WS": {
      totalSeats: 15,
      reservedSeats: 5,
      commonSeats: [],
      reservedSeatNames: [],
    },
    "Angular WS": {
      totalSeats: 0,
      reservedSeats: 0,
      commonSeats: [],
      reservedSeatNames: [],
    },
    Common: {
      totalSeats: 0,
      reservedSeats: 0,
      commonSeats: [],
      reservedSeatNames: [],
    },
    PMT: {
      totalSeats: 0,
      reservedSeats: 0,
      commonSeats: [],
      reservedSeatNames: [],
    },
    "test Seat": {
      totalSeats: 0,
      reservedSeats: 0,
      commonSeats: [],
      reservedSeatNames: [],
    },
  });
  const [newSeatNumber, setNewSeatNumber] = useState("");
  const [newReservedSeat, setNewReservedSeat] = useState("");
  const [editingSeat, setEditingSeat] = useState(null);

  useEffect(() => {
    updateSeats("Linear WS", 15, 5);
  }, []);

  const updateSeats = (type, total, reserved) => {
    const commonSeats = Array.from(
      { length: total - reserved },
      (_, i) => `S${i + 1}`
    );
    const reservedSeatNames = Array.from(
      { length: reserved },
      (_, i) => `S${total - reserved + i + 1}`
    );
    setSeatConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        totalSeats: total,
        reservedSeats: reserved,
        commonSeats,
        reservedSeatNames,
      },
    }));
  };

  const addSeat = (isReserved) => {
    const config = seatConfigs[selectedSeatType];
    const count = isReserved
      ? parseInt(newReservedSeat)
      : parseInt(newSeatNumber);

    if (isNaN(count) || count <= 0) return;

    const newSeats = Array.from({ length: count }, (_, i) => {
      const nextNum = isReserved
        ? config.reservedSeatNames.length + config.commonSeats.length + i + 1
        : config.commonSeats.length + i + 1;
      return `S${nextNum}`;
    });

    setSeatConfigs((prev) => ({
      ...prev,
      [selectedSeatType]: {
        ...config,
        totalSeats: config.totalSeats + count,
        ...(isReserved
          ? {
              reservedSeats: config.reservedSeats + count,
              reservedSeatNames: [...config.reservedSeatNames, ...newSeats],
            }
          : { commonSeats: [...config.commonSeats, ...newSeats] }),
      },
    }));

    if (isReserved) {
      setNewReservedSeat("");
    } else {
      setNewSeatNumber("");
    }
  };

  const removeSeat = (seat, isReserved) => {
    const config = seatConfigs[selectedSeatType];
    if (isReserved) {
      setSeatConfigs((prev) => ({
        ...prev,
        [selectedSeatType]: {
          ...config,
          reservedSeats: config.reservedSeats - 1,
          reservedSeatNames: config.reservedSeatNames.filter((s) => s !== seat),
          totalSeats: config.totalSeats - 1,
        },
      }));
    } else {
      setSeatConfigs((prev) => ({
        ...prev,
        [selectedSeatType]: {
          ...config,
          totalSeats: config.totalSeats - 1,
          commonSeats: config.commonSeats.filter((s) => s !== seat),
        },
      }));
    }
  };

  const editSeatName = (oldName, newName, isReserved) => {
    const config = seatConfigs[selectedSeatType];
    if (isReserved) {
      setSeatConfigs((prev) => ({
        ...prev,
        [selectedSeatType]: {
          ...config,
          reservedSeatNames: config.reservedSeatNames.map((s) =>
            s === oldName ? newName : s
          ),
        },
      }));
    } else {
      setSeatConfigs((prev) => ({
        ...prev,
        [selectedSeatType]: {
          ...config,
          commonSeats: config.commonSeats.map((s) =>
            s === oldName ? newName : s
          ),
        },
      }));
    }
    setEditingSeat(null);
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full p-2 mb-5">
        <h1
          style={{ background: themeColor }}
          className=" font-semibold mb-6 p-2 rounded-md text-center text-white"
        >
          Seat Group Configuration
        </h1>
        <div className="grid md:grid-cols-2 gap-4 bg-gray-100 rounded-lg p-2">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Location</label>
                <select defaultValue="hdfc" className="border p-2 rounded-md">
                  <option value="hdfc">Vibe </option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Floor</label>
                <select className="border p-2 rounded">
                  <option value="">Select Floor</option>
                  <option value="1">Floor 1</option>
                  <option value="2">Floor 2</option>
                </select>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <table className="w-full border-collapse ">
                <thead className="bg-gray-100 rounded-md">
                  <tr>
                    <th className="border border-gray-300 p-2 text-center">
                      Seat Type
                    </th>
                    <th className="border border-gray-300 p-2 text-center">
                      Total No. of Seats
                    </th>
                    <th className="border border-gray-300 p-2 text-center">
                      Reserved Seats
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(seatConfigs).map((type) => (
                    <tr
                      key={type}
                      className={`cursor-pointer hover:bg-gray-200 transition-colors border-b ${
                        selectedSeatType === type ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedSeatType(type)}
                    >
                      <td className="border border-gray-300 p-3 text-center">
                        {type}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {seatConfigs[type].totalSeats}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {seatConfigs[type].reservedSeats}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium border-b ">Floor Map</label>
              <input type="file" className="cursor-pointer" />
            </div>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">{selectedSeatType}</h2>
              <div className="space-y-4">
                <h3 className="font-medium border-b border-gray-400">
                  Common Seats
                </h3>
                <div className="flex flex-wrap gap-2">
                  {seatConfigs[selectedSeatType].commonSeats.map((seat) => (
                    <div
                      key={seat}
                      className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border"
                    >
                      {editingSeat === seat ? (
                        <input
                          value={seat}
                          onChange={(e) =>
                            editSeatName(seat, e.target.value, false)
                          }
                          onBlur={() => setEditingSeat(null)}
                          className="w-20 h-6 p-1"
                          autoFocus
                        />
                      ) : (
                        <>
                          {seat}
                          <button
                            onClick={() => setEditingSeat(seat)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => removeSeat(seat, false)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 my-2">
                  <input
                    type="number"
                    min="1"
                    value={newSeatNumber}
                    onChange={(e) => setNewSeatNumber(e.target.value)}
                    placeholder="Enter number of seats"
                    className="border p-2 rounded max-w-[200px]"
                  />
                  <button
                    onClick={() => addSeat(false)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 border-b border-gray-400">
                Reserved Seats
              </h3>
              <div className="flex flex-wrap gap-2">
                {seatConfigs[selectedSeatType].reservedSeatNames.map((seat) => (
                  <div
                    key={seat}
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border"
                  >
                    {editingSeat === seat ? (
                      <input
                        value={seat}
                        onChange={(e) =>
                          editSeatName(seat, e.target.value, true)
                        }
                        onBlur={() => setEditingSeat(null)}
                        className="w-20 h-6 p-1"
                        autoFocus
                      />
                    ) : (
                      <>
                        {seat}
                        <button
                          onClick={() => setEditingSeat(seat)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removeSeat(seat, true)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 my-2">
                <input
                  type="number"
                  min="1"
                  value={newReservedSeat}
                  onChange={(e) => setNewReservedSeat(e.target.value)}
                  placeholder="Enter number of reserved seats"
                  className="border p-2 rounded max-w-[200px]"
                />
                <button
                  onClick={() => addSeat(true)}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Add Reserved
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center my-5">
          <button className="bg-green-400 text-white rounded-md p-1 px-4">
            Proceed
          </button>
          <Link to={"/setup/facility"} className="bg-red-400 text-white rounded-md p-1 px-4">
            Cancel
          </Link>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default SetupSeat;
