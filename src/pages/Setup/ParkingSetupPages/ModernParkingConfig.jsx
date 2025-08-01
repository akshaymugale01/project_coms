import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Navbar from "../../../components/Navbar";
import { getItemInLocalStorage } from "../../../utils/localStorage";

// Modern Card Component
const Card = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

// Modern Input Component with stable focus
const ModernInput = React.memo(({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  className = "",
  icon,
  error,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  
  React.useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      if (type === "number") {
        onChange(newValue === "" ? 0 : Number(newValue));
      } else {
        onChange(newValue);
      }
    }
  }, [onChange, type]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          type={type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border border-gray-200 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 ease-in-out
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-300 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

ModernInput.displayName = "ModernInput";
ModernInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  error: PropTypes.string,
};

// Modern Select Component
const ModernSelect = React.memo(({ label, value, onChange, options, placeholder, className = "" }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 border border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 ease-in-out
          bg-white cursor-pointer
          ${className}
        `}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

ModernSelect.displayName = "ModernSelect";
ModernSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

// Vehicle Selection Component with checkboxes
const VehicleSelector = React.memo(({ selectedVehicles, slotCounts, onChange }) => {
  const vehicleTypes = [
    "2 wheeler", "4 wheeler", "6 wheeler", "10 wheeler",
    "12 wheeler", "14 wheeler", "18 wheeler"
  ];

  const handleVehicleToggle = useCallback((vehicleType) => {
    const isSelected = selectedVehicles.includes(vehicleType);
    let newSelected;
    let newSlotCounts = { ...slotCounts };

    if (isSelected) {
      newSelected = selectedVehicles.filter(v => v !== vehicleType);
      delete newSlotCounts[vehicleType];
    } else {
      newSelected = [...selectedVehicles, vehicleType];
      newSlotCounts[vehicleType] = 1;
    }

    onChange({ selectedVehicles: newSelected, slotCounts: newSlotCounts });
  }, [selectedVehicles, slotCounts, onChange]);

  const handleSlotCountChange = useCallback((vehicleType, count) => {
    const newSlotCounts = { ...slotCounts, [vehicleType]: count };
    onChange({ selectedVehicles, slotCounts: newSlotCounts });
  }, [selectedVehicles, slotCounts, onChange]);

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800 mb-3">Vehicle Categories</h4>
      <div className="grid grid-cols-1 gap-4">
        {vehicleTypes.map((vehicleType) => {
          const isSelected = selectedVehicles.includes(vehicleType);
          return (
            <div
              key={vehicleType}
              className={`
                p-4 border-2 rounded-lg transition-all duration-200
                ${isSelected 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleVehicleToggle(vehicleType)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {vehicleType}
                  </span>
                </label>
                
                {isSelected && (
                  <div className="w-24">
                    <ModernInput
                      type="number"
                      value={slotCounts[vehicleType] || 1}
                      onChange={(value) => handleSlotCountChange(vehicleType, value)}
                      placeholder="Slots"
                      className="text-center text-sm"
                      min={1}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

VehicleSelector.displayName = "VehicleSelector";
VehicleSelector.propTypes = {
  selectedVehicles: PropTypes.array.isRequired,
  slotCounts: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

// EV Charging Section
const EVChargingSection = React.memo(({ evConfig, onChange }) => {
  const handleToggle = useCallback((enabled) => {
    onChange({
      ...evConfig,
      enabled,
      ...(enabled ? {} : { twoWheeler: 0, fourWheeler: 0 })
    });
  }, [evConfig, onChange]);

  const handleSlotChange = useCallback((type, value) => {
    onChange({
      ...evConfig,
      [type]: value
    });
  }, [evConfig, onChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="ev-charging"
          checked={evConfig.enabled}
          onChange={(e) => handleToggle(e.target.checked)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="ev-charging" className="font-medium text-gray-700">
          EV Charging Available
        </label>
      </div>

      {evConfig.enabled && (
        <div className="pl-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ModernInput
              label="2-Wheeler EV Slots"
              type="number"
              value={evConfig.twoWheeler}
              onChange={(value) => handleSlotChange('twoWheeler', value)}
              placeholder="0"
              min={0}
              icon="🏍️"
            />
            <ModernInput
              label="4-Wheeler EV Slots"
              type="number"
              value={evConfig.fourWheeler}
              onChange={(value) => handleSlotChange('fourWheeler', value)}
              placeholder="0"
              min={0}
              icon="🚗"
            />
          </div>
          
          {(evConfig.twoWheeler > 0 || evConfig.fourWheeler > 0) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-800">
                <div className="font-medium">Total EV Slots: {(evConfig.twoWheeler || 0) + (evConfig.fourWheeler || 0)}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

EVChargingSection.displayName = "EVChargingSection";
EVChargingSection.propTypes = {
  evConfig: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Stack Parking Configuration
const StackParkingConfig = React.memo(({ stackConfig, onChange }) => {
  const handleChange = useCallback((field, value) => {
    onChange({
      ...stackConfig,
      [field]: value
    });
  }, [stackConfig, onChange]);

  const totalSlots = (stackConfig.slotCount || 0) * (stackConfig.levels || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <ModernInput
          label="Stack Slot Count"
          type="number"
          value={stackConfig.slotCount}
          onChange={(value) => handleChange('slotCount', value)}
          placeholder="Enter slot count"
          min={0}
          icon="📦"
        />
        <ModernInput
          label="Stack Levels"
          type="number"
          value={stackConfig.levels}
          onChange={(value) => handleChange('levels', value)}
          placeholder="Enter levels"
          min={0}
          icon="🏢"
        />
      </div>

      {totalSlots > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">{totalSlots}</div>
            <div className="text-sm text-blue-600">Total Stack Slots</div>
          </div>
        </div>
      )}
    </div>
  );
});

StackParkingConfig.displayName = "StackParkingConfig";
StackParkingConfig.propTypes = {
  stackConfig: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Main Floor Configuration Component
const FloorConfig = React.memo(({ floor, floorIndex, onUpdate, onDelete }) => {
  const zoneOptions = [
    { value: "Open", label: "Open" },
    { value: "Covered", label: "Covered" },
    { value: "Basement", label: "Basement" },
    { value: "Podium", label: "Podium" },
  ];

  const mechanismOptions = [
    { value: "Stilt", label: "Stilt Parking" },
    { value: "Stack", label: "Stack Parking" },
    { value: "Both", label: "Both (Stilt + Stack)" },
  ];

  const handleUpdate = useCallback((field, value) => {
    onUpdate(floorIndex, { ...floor, [field]: value });
  }, [floor, floorIndex, onUpdate]);

  const getTotalNonEVSlots = () => {
    return Object.values(floor.stiltConfig?.slotCounts || {}).reduce((sum, count) => sum + (count || 0), 0);
  };

  return (
    <Card className="mb-6" title={`Floor ${floor.floorNo}`}>
      <div className="space-y-6">
        {/* Floor Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">{floor.floorNo}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Floor {floor.floorNo}</h3>
              <p className="text-sm text-gray-500">Configure parking settings</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(floorIndex)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Delete Floor
          </button>
        </div>

        {/* Basic Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModernInput
            label="Display Format Prefix"
            value={floor.displayFormat}
            onChange={(value) => handleUpdate('displayFormat', value)}
            placeholder="e.g., A1, B2, C3"
            icon="🏷️"
          />
          
          <ModernSelect
            label="Zone Type"
            value={floor.zoneType}
            onChange={(value) => handleUpdate('zoneType', value)}
            options={zoneOptions}
            placeholder="Select zone type"
          />
          
          <ModernSelect
            label="Mechanism Type"
            value={floor.mechanismType}
            onChange={(value) => handleUpdate('mechanismType', value)}
            options={mechanismOptions}
            placeholder="Select mechanism"
          />
        </div>

        {/* Configuration Content */}
        {floor.mechanismType && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stilt Configuration */}
            {(floor.mechanismType === "Stilt" || floor.mechanismType === "Both") && (
              <Card title="🚗 Stilt Parking" className="h-fit">
                <div className="space-y-6">
                  <VehicleSelector
                    selectedVehicles={floor.stiltConfig?.selectedVehicles || []}
                    slotCounts={floor.stiltConfig?.slotCounts || {}}
                    onChange={(config) => handleUpdate('stiltConfig', config)}
                  />
                  
                  <EVChargingSection
                    evConfig={floor.evConfig || { enabled: false, twoWheeler: 0, fourWheeler: 0 }}
                    onChange={(config) => handleUpdate('evConfig', config)}
                  />

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Stilt Summary</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Non-EV Slots: {getTotalNonEVSlots()}</div>
                      <div>EV Slots: {(floor.evConfig?.twoWheeler || 0) + (floor.evConfig?.fourWheeler || 0)}</div>
                      <div className="font-medium">Total: {getTotalNonEVSlots() + (floor.evConfig?.twoWheeler || 0) + (floor.evConfig?.fourWheeler || 0)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Stack Configuration */}
            {(floor.mechanismType === "Stack" || floor.mechanismType === "Both") && (
              <Card title="📦 Stack Parking" className="h-fit">
                <StackParkingConfig
                  stackConfig={floor.stackConfig || { slotCount: 0, levels: 0 }}
                  onChange={(config) => handleUpdate('stackConfig', config)}
                />
              </Card>
            )}
          </div>
        )}
      </div>
    </Card>
  );
});

FloorConfig.displayName = "FloorConfig";
FloorConfig.propTypes = {
  floor: PropTypes.object.isRequired,
  floorIndex: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Main Component
const ModernParkingConfig = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [floors, setFloors] = useState([]);
  const buildings = getItemInLocalStorage("Building") || [];

  // Add new floor
  const addFloor = useCallback(() => {
    const newFloor = {
      id: Date.now(),
      floorNo: floors.length + 1,
      displayFormat: "",
      zoneType: "",
      mechanismType: "",
      stiltConfig: {
        selectedVehicles: [],
        slotCounts: {},
      },
      evConfig: {
        enabled: false,
        twoWheeler: 0,
        fourWheeler: 0,
      },
      stackConfig: {
        slotCount: 0,
        levels: 0,
      },
    };
    setFloors(prev => [...prev, newFloor]);
  }, [floors.length]);

  // Update floor
  const updateFloor = useCallback((index, updatedFloor) => {
    setFloors(prev => prev.map((floor, i) => i === index ? updatedFloor : floor));
  }, []);

  // Delete floor
  const deleteFloor = useCallback((index) => {
    setFloors(prev => {
      const newFloors = prev.filter((_, i) => i !== index);
      // Renumber floors
      return newFloors.map((floor, i) => ({
        ...floor,
        floorNo: i + 1
      }));
    });
  }, []);

  // Submit configuration
  const handleSubmit = useCallback(() => {
    const configData = {
      location: selectedLocation,
      floors: floors,
      timestamp: new Date().toISOString(),
    };
    console.log("Parking Configuration:", configData);
    alert("Configuration saved! Check console for details.");
  }, [selectedLocation, floors]);

  const buildingOptions = buildings.map(building => ({
    value: building.id,
    label: building.name
  }));

  return (
    <section className="flex min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 p-8 ml-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🚗 Modern Parking Configuration
            </h1>
            <p className="text-gray-600">
              Configure parking settings for different floors and zones with an intuitive interface.
            </p>
          </div>

          {/* Location Selection */}
          <Card title="🏢 Location Settings" className="mb-8">
            <div className="max-w-md">
              <ModernSelect
                label="Select Building Location"
                value={selectedLocation}
                onChange={setSelectedLocation}
                options={buildingOptions}
                placeholder="Choose a building"
              />
            </div>
          </Card>

          {/* Floors Configuration */}
          <div className="space-y-6">
            {floors.map((floor, index) => (
              <FloorConfig
                key={floor.id}
                floor={floor}
                floorIndex={index}
                onUpdate={updateFloor}
                onDelete={deleteFloor}
              />
            ))}

            {/* Add Floor Button */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="text-center py-8">
                <button
                  onClick={addFloor}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Floor
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Add a new floor to configure parking settings
                </p>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          {floors.length > 0 && (
            <Card className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{floors.length}</span> floor(s) configured
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setFloors([])}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedLocation}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModernParkingConfig;
