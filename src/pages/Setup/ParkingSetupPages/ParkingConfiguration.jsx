import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Navbar from "../../../components/Navbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const ParkingConfiguration = () => {
  const [towerName, setTowerName] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState({
    stilt: [],
    stack: [],
  });
  const [slotCounts, setSlotCounts] = useState({
    stilt: {},
    stack: {},
  });
  const [mechanismType, setMechanismType] = useState(""); //Stilt/Stack/Both
  const [evAvailability, setEvAvailability] = useState({});
  const [evSlots, setEvSlots] = useState({});
  const totalEVSlots = evSlots.twoWheeler + evSlots.fourWheeler;
  const [totalStackSlots, setTotalStackSlots] = useState(0);
  const [displayFormats, setDisplayFormats] = useState({});
  const themeColor = useSelector((state) => state.theme.color);
  const userId = getItemInLocalStorage("UserId");
  const buildings = getItemInLocalStorage("Building");
  const stiltdropdownRefs = useRef({});
  const stackdropdownRefs = useRef({});
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false); //stack dropdown
  const [stackSlotCounts, setStackSlotCounts] = useState(0);
  const [stackLevels, setStackLevels] = useState({});
  const [showCategories, setShowCategories] = useState({});
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
  const [floorConfigMap, setFloorConfigMap] = useState({});
  const [floors, setFloors] = useState([]);
  const [showAddFloor, setShowAddFloor] = useState(true);
  const [visibleDropdowns, setVisibleDropdowns] = useState({});
  const [visibleStackDropdowns, setVisibleStackDropdowns] = useState({});

  // Utility to update a floor's property by key
  const updateFloorField = (index, field, value) => {
    setFloors((prev) =>
      prev.map((floor, i) =>
        i === index ? { ...floor, [field]: value } : floor
      )
    );
  };

  useEffect(() => {
    console.log("DisplayFormats", displayFormats);
    console.log("SlotCounts", slotCounts);
    console.log("StackSlotCounts", stackSlotCounts);
  }, [displayFormats, slotCounts, stackSlotCounts]);

  // Add a new floor
  const handleAddFloor = () => {
    const newFloorNo = floors.length + 1;
    console.log("New floor addedd!", newFloorNo);
    const newFloorConfig = {
      floorNo: newFloorNo,
      zoneType: "",
      mechanismType: "",
      displayFormat: "",
      selectedVehicles: [],
      slotCounts: {},
      evAvailable: false,
      evSlots: { twoWheeler: 0, fourWheeler: 0 },
    };

    setFloors((prev) => [...prev, newFloorConfig]);
  };

  // Delete a specific floor
  const handleDeleteFloor = (index) => {
    setFloors((prev) => prev.filter((_, i) => i !== index));

    setFloorConfigMap((prev) => {
      const updatedMap = { ...prev };
      delete updatedMap[index];
      return updatedMap;
    });

    setShowAddFloor(true);
  };

  // Update zone type
  const handleZoneChange = (index, value) => {
    updateFloorField(index, "zoneType", value);
  };

  // Update mechanism type
  const handleMechanismChange = (index, value) => {
    updateFloorField(index, "mechanismType", value);
    setShowAddFloor(true);
  };
  // console.log(typeof evSlots.twoWheeler, evSlots.twoWheeler);

  // const handleSubmit = () => {
  //   let missing = selectedVehicles.filter((v) => !vehicleList.includes(v));
  //   if (missing.length > 0) {
  //     alert(`Missing vehicle types: ${missing.join(", ")}. Please add them via Vehicle Configuration.`);
  //     return;
  //   }

  const handleClickOutside = useCallback(
    (event) => {
      if (!event?.target) return;

      Object.entries(stiltdropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setVisibleDropdowns((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    },
    [stiltdropdownRefs, setVisibleDropdowns]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, {
        passive: true,
      });
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const total = Object.values(floorConfigMap).reduce((acc, config) => {
      const { slotCount = 0, levels = 0 } = config.stack?.config || {};
      return acc + slotCount * levels;
    }, 0);
    setTotalStackSlots(total);
  }, [floorConfigMap]);

  // Reset vehicle-related selections when mechanism changes
  useEffect(() => {
    if (!floorConfigMap || Object.keys(floorConfigMap).length === 0) {
      const resetFloorConfigs = Object.keys(floorConfigMap).reduce(
        (acc, index) => {
          acc[index] = {
            stilt: {
              vehicles: {},
              evSlots: {},
              config: { displayFormat: "" },
            },
            stack: {
              vehicles: {},
              evSlots: {},
              config: {
                slotCount: 0,
                levels: 0,
                displayFormat: "",
              },
            },
          };
          return acc;
        },
        {}
      );
      setFloorConfigMap(resetFloorConfigs);
      setSelectedVehicles({ stilt: [], stack: [] });
      setEvSlots({});
      setTotalStackSlots(0);
    }
  }, [mechanismType]);

  const toggleVehicleSelection = ({
    type,
    level,
    floorIndex,
    selectedVehicles,
    setSelectedVehicles,
    slotCounts,
    setSlotCounts,
  }) => {
    const currentList = selectedVehicles[level]?.[floorIndex] ?? [];
    const isSelected = currentList.includes(type);

    const updatedSelection = isSelected
      ? currentList.filter((v) => v !== type)
      : [...currentList, type];

    const updatedSlots = {
      ...(slotCounts[level]?.[floorIndex] ?? {}),
    };

    if (isSelected) {
      delete updatedSlots[type];
    } else {
      updatedSlots[type] = 1;
    }

    // Updated selectedVehicles with safety fallback
    setSelectedVehicles((prev) => ({
      ...prev,
      [level]: {
        ...(prev[level] || {}),
        [floorIndex]: updatedSelection,
      },
    }));

    //Updated slotCounts with safety fallback
    setSlotCounts((prev) => ({
      ...prev,
      [level]: {
        ...(prev[level] || {}),
        [floorIndex]: updatedSlots,
      },
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

  const SlotCountInputRow = React.memo(
    ({ type, index, slotCount, isSelected, onToggle, onSlotChange }) => {
      const inputRef = useRef();

      useEffect(() => {
        if (isSelected && inputRef.current) {
          inputRef.current.focus();
        }
      }, [isSelected]);

      return (
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggle}
              className="accent-indigo-600"
            />
            <span className="text-sm text-gray-800">{type}</span>
          </label>

          {isSelected && (
            <input
              type="number"
              min={1}
              value={slotCount ?? ""}
              onChange={(e) =>
                onSlotChange(parseInt(e.target.value || "0", 10))
              }
              className="w-20 px-2 py-1 border rounded-md text-sm text-center"
            />
          )}
        </div>
      );
    }
  );

  const StiltConfig = ({ index }) => {
    const displayFormat = displayFormats[index] || "";
    const evTotal =
      (evSlots[index]?.twoWheeler || 0) + (evSlots[index]?.fourWheeler || 0);
    const nonEVTotal = getTotalSlots(slotCounts?.stilt?.[index]);

    const handleDisplayChange = (e) => {
      setDisplayFormats((prev) => ({
        ...prev,
        [index]: e.target.value,
      }));
    };

    const handleClearSelections = () => {
      setSelectedVehicles((prev) => ({
        ...prev,
        stilt: { ...prev.stilt, [index]: [] },
      }));
      setSlotCounts((prev) => ({
        ...prev,
        stilt: { ...prev.stilt, [index]: {} },
      }));
    };

    return (
      <div className="mt-4 space-y-6 relative">
        <h4 className="text-md text-center font-semibold text-gray-800">
          Stilt Parking Configuration
        </h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Format Prefix
          </label>
          <input
            type="text"
            placeholder="e.g. A1"
            value={displayFormat}
            onChange={(e) => {
              setDisplayFormats((prev) => ({
                ...prev,
                [index]: e.target.value,
              }));
            }}
            className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            readOnly
            value={
              (selectedVehicles?.stilt?.[index] ?? []).join(", ") ||
              "Select Vehicle Categories"
            }
            onClick={() =>
              setVisibleDropdowns((prev) => ({
                ...prev,
                [index]: !prev[index],
              }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer pr-10"
          />
          <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">
            ▼
          </span>

          {visibleDropdowns[index] && (
            <div
              ref={(el) => {
                stiltdropdownRefs.current[index] = el;
              }}
              className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md"
            >
              <div className="px-4 py-3 max-h-64 overflow-y-auto space-y-3">
                {(selectedVehicles?.stilt?.[index] ?? []).length > 0 && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={handleClearSelections}
                      className="text-sm text-red-600 underline"
                    >
                      Clear selections
                    </button>
                  </div>
                )}

                {stiltCategories.map((type) => {
                  const isSelected = (
                    selectedVehicles?.stilt?.[index] ?? []
                  ).includes(type);
                  const slotCount = slotCounts?.stilt?.[index]?.[type];

                  return (
                    <SlotCountInputRow
                      key={`stilt-${index}-${type}`}
                      type={type}
                      index={index}
                      slotCount={slotCount}
                      isSelected={isSelected}
                      onToggle={() =>
                        toggleVehicleSelection({
                          type,
                          level: "stilt",
                          floorIndex: index,
                          selectedVehicles,
                          setSelectedVehicles,
                          slotCounts,
                          setSlotCounts,
                        })
                      }
                      onSlotChange={(val) =>
                        setSlotCounts((prev) => ({
                          ...prev,
                          stilt: {
                            ...(prev.stilt || {}),
                            [index]: {
                              ...(prev.stilt?.[index] || {}),
                              [type]: val,
                            },
                          },
                        }))
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={evAvailability[index] || false}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEvAvailability((prev) => ({ ...prev, [index]: isChecked }));
                if (!isChecked) {
                  setEvSlots((prev) => ({
                    ...prev,
                    [index]: { twoWheeler: 0, fourWheeler: 0 },
                  }));
                }
              }}
            />
            <span className="font-medium text-gray-700">
              EV Charging Available
            </span>
          </label>

          {evAvailability[index] && (
            <div className="grid gap-4 pl-6">
              {["twoWheeler", "fourWheeler"].map((type) => (
                <div className="flex items-center gap-4" key={type}>
                  <label className="w-32 text-gray-600">{`${type.replace(
                    "Wheeler",
                    "-wheeler"
                  )} slots:`}</label>
                  <input
                    type="number"
                    min={0}
                    value={evSlots[index]?.[type] || 0}
                    onChange={(e) =>
                      setEvSlots((prev) => ({
                        ...prev,
                        [index]: {
                          ...(prev[index] || {}),
                          [type]: Number(e.target.value),
                        },
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
          )}

          {(nonEVTotal > 0 || evTotal > 0) && (
            <div className="mt-4 text-sm font-semibold text-green-700 text-center space-y-1">
              <div>Non EV Slots: {nonEVTotal}</div>
              <div>EV Slots: {evTotal}</div>
            </div>
          )}

          {nonEVTotal === 0 && evTotal === 0 && (
            <div className="text-xs text-gray-500 text-center">
              No slots configured yet for this floor
            </div>
          )}
        </div>
      </div>
    );
  };

  const StackConfig = ({ index }) => {
    const slotCount = stackSlotCounts[index] || 0;
    const levels = stackLevels[index] || 0;
    const displayFormat = displayFormats[index] || "";
    const totalSlots = slotCount > 0 && levels > 0 ? slotCount * levels : 0;

    const config = useMemo(
      () => ({
        slotCount,
        levels,
        displayFormat,
      }),
      [slotCount, levels]
    );

    const prevConfigRef = useRef();
    useEffect(() => {
      const prevConfig = prevConfigRef.current;
      const isSame =
        prevConfig &&
        prevConfig.slotCount === config.slotCount &&
        prevConfig.levels === config.levels &&
        prevConfig.displayFormat === config.displayFormat;
      if (!isSame) {
        setFloorConfigMap((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            stack: {
              ...(prev[index]?.stack || {}),
              config,
            },
          },
        }));
        prevConfigRef.current = config;
      }
    }, []);

    const handleDisplayFormatChange = (e) => {
      setDisplayFormats((prev) => ({
        ...prev,
        [index]: e.target.value,
      }));
    };

    const handleSlotCountChange = (e) => {
      const value = parseInt(e.target.value || "0", 10);
      setStackSlotCounts((prev) => ({
        ...prev,
        [index]: value,
      }));
    };

    const handleLevelChange = (e) => {
      const value = parseInt(e.target.value || "0", 10);
      setStackLevels((prev) => ({
        ...prev,
        [index]: value,
      }));
    };

    return (
      <div className="mt-4 space-y-6 relative">
        <h4 className="text-md text-center font-semibold text-gray-800">
          Stack Parking Configuration
        </h4>

        {/* Display Format Prefix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Format Prefix
          </label>
          <input
            type="text"
            placeholder="e.g. A1"
            value={displayFormat}
            onChange={handleDisplayFormatChange}
            className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Format Prefix
          </label>
          <input
            type="text"
            placeholder="e.g. A1"
            value={displayFormat}
            onChange={handleDisplayFormatChange}
            className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        {/* Stack Slot Count & Levels */}
        <div className="flex gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stack Slot Count
            </label>
            <input
              type="number"
              value={slotCount}
              min={0}
              onChange={handleSlotCountChange}
              className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stack Levels
            </label>
            <input
              type="number"
              value={levels}
              min={0}
              onChange={handleLevelChange}
              className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Total Stack Slots */}
        {totalSlots > 0 && (
          <div className="mt-2 text-sm font-semibold text-green-700 text-center">
            Total Stack Slots: {totalSlots}
          </div>
        )}
      </div>
    );
  };

  const BothConfigs = (index) => (
    <>
      <StiltConfig key={floors[index]?.floorNo ?? index} index={index} />
      <StackConfig
        key={(floors[index]?.floorNo ?? index) + "-stack"}
        index={index}
      />
    </>
  );

  const renderConfigForType = (type, index) => {
    switch (type) {
      case "Stilt":
        return (
          <StiltConfig key={floors[index]?.floorNo ?? index} index={index} />
        );
      case "Stack":
        return (
          <StackConfig
            key={(floors[index]?.floorNo ?? index) + "-stack"}
            index={index}
          />
        );
      case "Both":
        return <BothConfigs index={index} />;
      default:
        return null;
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-6 mt-12 mb-20">
        <h2 className="text-xl font-semibold mb-4">Parking Configuration</h2>
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
        </div>

        {/* Add floor */}
        <div className="max-w-3xl mt-4 space-y-2">
          {floors.map((floor, index) =>
            floor ? (
              <div
                key={index}
                className="border p-4 rounded-md bg-gray-50 shadow-sm relative"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`Floor ${floor.floorNo}`}
                    disabled
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-100 text-gray-600"
                  />
                  <button
                    onClick={() => handleDeleteFloor(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
                {/* Zone Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                    Zone Type
                  </label>
                  <select
                    value={floor.zoneType}
                    onChange={(e) => handleZoneChange(index, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                  >
                    <option value="">--Select--</option>
                    <option value="Open">Open</option>
                    <option value="Covered">Covered</option>
                    <option value="Basement">Basement</option>
                    <option value="Podium">Podium</option>
                  </select>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                  Mechanism Type
                </label>
                <select
                  value={floor.mechanismType}
                  onChange={(e) => handleMechanismChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                >
                  <option value="">--Select--</option>
                  <option value="Stilt">Stilt Parking</option>
                  <option value="Stack">Stack Parking</option>
                  <option value="Both">Both</option>
                </select>

                {renderConfigForType(floor.mechanismType, index)}
              </div>
            ) : (
              <div key={index}>Floor data missing</div>
            )
          )}

          {showAddFloor && (
            <button
              onClick={() => {
                const newFloorNo = floors.length + 1;

                const newFloor = {
                  floorNo: newFloorNo,
                  zoneType: "",
                  mechanismType: "",
                  displayFormats: "",
                  selectedVehicles: [],
                  slotCounts: {},
                  evAvailable: false,
                  evSlots: { twoWheeler: 0, fourWheeler: 0 },
                };

                setFloors((prev) => [...prev, newFloor]);
                setFloorConfigMap((prev) => ({
                  ...prev,
                  [newFloorNo - 1]: newFloor, // optional if you're syncing with index
                }));
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Floor
            </button>
          )}
        </div>

        {/* Mechanism type */}
        {/* {mechanismType === "Stilt" && renderStiltConfig()}

        {mechanismType === "Stack" && renderStackConfig()}

        {mechanismType === "Both" && renderBothConfigs()} */}

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
    </section>
  );
};

export default ParkingConfiguration;
