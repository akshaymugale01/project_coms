import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const ParkingConfiguration = () => {
  const [towerName, setTowerName] = useState("");
  const [numFloors, setNumFloors] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState({
    stilt: [],
    stack: [],
  });
  const [slotCounts, setSlotCounts] = useState({
    stilt: {},
    stack: {},
  });
  const [mechanismType, setMechanismType] = useState(""); //Stilt/Stack/Both
  const [isEvAvailable, setEvAvailable] = useState(false);
  const [evSlots, setEvSlots] = useState({
    twoWheeler: 0,
    fourWheeler: 0,
  });
  const totalEVSlots = evSlots.twoWheeler + evSlots.fourWheeler;

  const [totalStackSlots, setTotalStackSlots] = useState(0);
  const [displayFormat, setDisplayFormat] = useState("");
  const themeColor = useSelector((state) => state.theme.color);
  const userId = getItemInLocalStorage("UserId");
  const buildings = getItemInLocalStorage("Building");
  const stiltdropdownRef = useRef(null);
  const stackdropdownRef = useRef(null);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false); //stack dropdown
  const [stackSlotCount, setStackSlotCount] = useState(0);
  const [stackLevels, setStackLevels] = useState(0);
  const [showCategories, setShowCategories] = useState(false); //stilt dropdown //boolean field for dynamically adding inputs depending upon the category selection
  const stackCategories = ["SUV", "Sedan", "CUV", "Hatchback"];
  const stiltCategories = [
    "2 wheeler",
    "4 wheeler",
    "6 wheeler",
    "10 wheeler",
    "12 wheeler",
    "14 wheeler",
    "18 wheeler",
  ];

  // console.log(typeof evSlots.twoWheeler, evSlots.twoWheeler);

  // const handleSubmit = () => {
  //   let missing = selectedVehicles.filter((v) => !vehicleList.includes(v));
  //   if (missing.length > 0) {
  //     alert(`Missing vehicle types: ${missing.join(", ")}. Please add them via Vehicle Configuration.`);
  //     return;
  //   }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stiltdropdownRef.current &&
        !stiltdropdownRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }

      if (
        stackdropdownRef.current &&
        !stackdropdownRef.current.contains(event.target)
      ) {
        setShowVehicleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotalStackSlots(stackSlotCount * stackLevels);
  }, [stackSlotCount, stackLevels]);

  useEffect(() => {
    // Reset vehicle-related selections when mechanism changes
    setSelectedVehicles([]);
    setSlotCounts({});
    setEvAvailable(false);
    setEvSlots({ twoWheeler: 0, fourWheeler: 0 });
    setStackSlotCount(0);
    setStackLevels(0);
    // setShowCategories(false);
    // setShowVehicleDropdown(false);
  }, [mechanismType]);

  const config = {
    tower: towerName,
    floor: selectedFloor,
    totalFloors: numFloors,
    zoneType,
    vehicleTypes: selectedVehicles,
    slots: slotCounts,
    displayFormat,
  };

  const toggleVehicleSelection = ({
    type,
    level,
    selectedVehicles,
    setSelectedVehicles,
    slotCounts,
    setSlotCounts,
  }) => {
    const currentList = selectedVehicles[level] ?? [];
    const isSelected = currentList.includes(type);

    const updatedSelection = isSelected
      ? currentList.filter((v) => v !== type)
      : [...currentList, type];

    const updatedSlots = { ...(slotCounts[level] ?? {}) };
    if (isSelected) {
      delete updatedSlots[type];
    } else {
      updatedSlots[type] = 1;
    }

    setSelectedVehicles((prev) => ({
      ...prev,
      [level]: updatedSelection,
    }));

    setSlotCounts((prev) => ({
      ...prev,
      [level]: updatedSlots,
    }));
  };
  
  const handleVehicleSelection = (category, vehicleType) => {
    setSelectedVehicles((prev) => {
      const currentList = prev[category] ?? [];
      const alreadySelected = currentList.includes(vehicleType);

      const updatedList = alreadySelected
        ? currentList.filter((v) => v !== vehicleType)
        : [...currentList, vehicleType];

      return {
        ...prev,
        [category]: updatedList,
      };
    });
  };

  const getTotalSlots = (levelCounts) =>
    Object.values(levelCounts ?? {}).reduce(
      (sum, val) => sum + (parseInt(val, 10) || 0),
      0
    );

  const renderStiltConfig = () => (
    <>
      <div className="mt-4 space-y-6 relative">
        {/* Header */}
        <h4 className="text-md text-center font-semibold text-gray-800">
          Stilt Parking Configuration
        </h4>

        {/* Display Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Format Prefix
          </label>
          <input
            type="text"
            placeholder="e.g. A1"
            value={displayFormat}
            onChange={(e) => setDisplayFormat(e.target.value)}
            className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        {/* Dropdown Trigger Input */}
        <div className="relative">
          <input
            type="text"
            readOnly
            value={
              (selectedVehicles?.stilt ?? []).join(", ") ||
              "Select Vehicle Categories"
            }
            onClick={() => setShowCategories(!showCategories)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer pr-10"
          />
          <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">
            ▼
          </span>

          {/* Dropdown Panel */}
          {showCategories && (
            <div
              ref={stiltdropdownRef}
              className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md transition-all duration-200 ease-in-out"
            >
              <div className="px-4 py-3 max-h-64 overflow-y-auto space-y-3">
                {/* Clear Button at Top Right */}
                {(selectedVehicles?.stilt ?? []).length > 0 && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => {
                        setSelectedVehicles((prev) => ({ ...prev, stilt: [] }));
                        setSlotCounts((prev) => ({ ...prev, stilt: {} }));
                      }}
                      className="text-sm text-red-600 underline"
                    >
                      Clear selections
                    </button>
                  </div>
                )}

                {/*Vehicle Type Rows */}
                {stiltCategories.map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between gap-4"
                  >
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(selectedVehicles?.stilt ?? []).includes(type)}
                        onChange={() =>
                          toggleVehicleSelection({
                            type,
                            level: "stilt",
                            selectedVehicles,
                            setSelectedVehicles,
                            slotCounts,
                            setSlotCounts,
                          })
                        }
                        className="accent-indigo-600"
                      />
                      <span className="text-sm text-gray-800">{type}</span>
                    </label>

                    {/*Slot Count beside checkbox */}
                    {(selectedVehicles?.stilt ?? []).includes(type) && (
                      <input
                        type="number"
                        value={slotCounts?.stilt?.[type] ?? ""}
                        onChange={(e) =>
                          setSlotCounts((prev) => ({
                            ...prev,
                            stilt: {
                              ...prev.stilt,
                              [type]: parseInt(e.target.value || "0", 10),
                            },
                          }))
                        }
                        className="w-20 px-2 py-1 border rounded-md text-sm text-center"
                        min={1}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* EV Charging Configuration */}
        <div className="space-y-4">
          {/* EV Charging Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEvAvailable}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEvAvailable(isChecked);

                if (!isChecked) {
                  // Reset EV Slots when unchecked
                  setEvSlots({
                    twoWheeler: 0,
                    fourWheeler: 0,
                  });
                }
              }}
            />
            <span className="font-medium text-gray-700">
              EV Charging Available
            </span>
          </label>

          {/* Conditional Input Fields */}
          {isEvAvailable && (
            <div className="grid gap-4 pl-6">
              <div className="flex items-center gap-4">
                <label className="w-32 text-gray-600">2-wheeler slots:</label>
                <input
                  type="number"
                  min={0}
                  value={evSlots.twoWheeler}
                  onChange={(e) =>
                    setEvSlots((prev) => ({
                      ...prev,
                      twoWheeler: Number(e.target.value),
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-gray-600">4-wheeler slots:</label>
                <input
                  type="number"
                  min={0}
                  value={evSlots.fourWheeler}
                  onChange={(e) =>
                    setEvSlots((prev) => ({
                      ...prev,
                      fourWheeler: Number(e.target.value),
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          )}

          {/* Total Slots */}
          {(getTotalSlots(slotCounts?.stilt) > 0 ||
            parseInt(evSlots.twoWheeler || 0) > 0 ||
            parseInt(evSlots.fourWheeler || 0) > 0) && (
            <div className="mt-4 text-sm font-semibold text-green-700 text-center space-y-1">
              <div>Non EV Slots: {getTotalSlots(slotCounts?.stilt)}</div>
              <div>
                EV Slots:{" "}
                {(parseInt(evSlots.twoWheeler || 0) || 0) +
                  (parseInt(evSlots.fourWheeler || 0) || 0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderStackConfig = () => (
    <div className="mt-4 space-y-6 relative">
      {/* stilt configuration */}
      <div className="mt-4 space-y-6 relative">
        {/* Section Header */}
        <h4 className="text-md text-center font-semibold text-gray-800">
          Stack Parking Configuration
        </h4>

        {/* Display Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Format Prefix
          </label>
          <input
            type="text"
            placeholder="e.g. A1"
            value={displayFormat}
            onChange={(e) => setDisplayFormat(e.target.value)}
            className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        {/* Stack Slot Count & Stack Levels */}
        <div className="flex gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stack Slot Count
            </label>
            <input
              type="number"
              value={stackSlotCount}
              onChange={(e) =>
                setStackSlotCount(parseInt(e.target.value || "0", 10))
              }
              className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stack Levels
            </label>
            <input
              type="number"
              value={stackLevels}
              onChange={(e) =>
                setStackLevels(parseInt(e.target.value || "0", 10))
              }
              className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Allowed Vehicle Categories */}
        <div className="space-y-4 mt-6 relative">
          <label className="block text-sm font-medium text-gray-700">
            Select Vehicle Types
          </label>
          <input
            type="text"
            readOnly
            value={
              (selectedVehicles?.stack ?? []).join(", ") ||
              "Select Vehicle Categories"
            }
            onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
            onChange={() => handleVehicleSelection("stack", type)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer pr-10"
          />

          {showVehicleDropdown && (
            <div
              ref={stackdropdownRef}
              className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md max-h-64 overflow-y-auto px-4 py-3"
            >
              {/* Vehicle type in stack */}
              {stackCategories.map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between gap-4 mb-2"
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={(selectedVehicles?.stack ?? []).includes(type)}
                      onChange={() =>
                        toggleVehicleSelection({
                          type,
                          level: "stack",
                          selectedVehicles,
                          setSelectedVehicles,
                          slotCounts,
                          setSlotCounts,
                        })
                      }
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>

                  {/* {selectedVehicles.includes(type) && (
                      <input
                        type="number"
                        min={1}
                        value={slotCounts[type] || ""}
                        onChange={(e) =>
                          setSlotCounts((prev) => ({
                            ...prev,
                            [type]: parseInt(e.target.value || "0", 10),
                          }))
                        }
                        className="w-20 px-2 py-1 border rounded-md text-sm text-center"
                      />
                    )} */}
                </div>
              ))}
              {/* <div className="px-4 py-3 max-h-64 overflow-y-auto space-y-3"> */}
              {/* Clear Button at Top Right */}
              {(selectedVehicles?.stack ?? []).length > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      setSelectedVehicles((prev) => ({ ...prev, stack: [] }));
                      setSlotCounts((prev) => ({ ...prev, stack: {} }));
                    }}
                    className="text-sm text-red-600 underline"
                  >
                    Clear selections
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Total Slot Count */}
        {stackSlotCount > 0 && stackLevels > 0 && (
          <div className="mt-2 text-sm font-semibold text-green-700 text-center">
            Total Stack Slots: {stackSlotCount * stackLevels}
          </div>
        )}
      </div>
    </div>
  );

  const renderBothConfigs = () => (
    <>
      {renderStiltConfig()}
      {renderStackConfig()}
    </>
  );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6 mt-12 mb-20">
      <div className="grid grid-cols-2 gap-6">
        {/* Location Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            name="building_id"
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
            value={towerName}
            onChange={(e) => setTowerName(e.target.value)}
          >
            <option value="">Select a location</option>
            {buildings?.map((building) => (
              <option value={building.id} key={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Parking Floors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Parking Floors
          </label>
          <input
            type="number"
            value={numFloors}
            min={0}
            onChange={(e) => setNumFloors(parseInt(e.target.value || "0", 10))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>
      </div>
      {/* Floor Selection */}
      {numFloors > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Floor
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          >
            <option value="">--Select--</option>
            {[...Array(numFloors)].map((_, i) => (
              <option key={i} value={`${i + 1}`}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Zone Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zone Type
        </label>
        <select
          value={zoneType}
          onChange={(e) => setZoneType(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
        >
          <option value="">--Select--</option>
          <option value="Open">Open</option>
          <option value="Covered">Covered</option>
          <option value="Basement">Basement</option>
          <option value="Podium">Podium</option>
        </select>
      </div>

      {/* Slot configuration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mechanism Type
        </label>
        <select
          value={mechanismType}
          onChange={(e) => setMechanismType(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
        >
          <option value="">--Select--</option>
          <option
            value="Stilt"
            onClick={() => setShowCategories(!showCategories)}
          >
            Stilt Parking
          </option>
          <option value="Stack">Stack Parking</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Mechanism type */}
      {mechanismType === "Stilt" && renderStiltConfig()}

      {mechanismType === "Stack" && renderStackConfig()}

      {mechanismType === "Both" && renderBothConfigs()}

      {/* Buttons */}
      <div className="pt-4 flex justify-between items-center w-full">
        <button
          onClick={""}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ParkingConfiguration;
