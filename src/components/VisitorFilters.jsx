import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getVisitorPurposes, getBuildings, getFloors, getUnits, getSetupUsersByUnit, getSetupUsersByFloor, getSetupUsersByBuilding } from '../api';
import { FaFilter, FaTimes } from 'react-icons/fa';

const VisitorFilters = ({ onApplyFilters, onResetFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFloors, setLoadingFloors] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadingHosts, setLoadingHosts] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    mobile: '',
    buildingId: '',
    floorId: '',
    unitId: '',
    hostId: '',
    hostApproval: '',
    purpose: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch buildings
      const buildingsRes = await getBuildings();
      if (buildingsRes?.data) {
        setBuildings(Array.isArray(buildingsRes.data) ? buildingsRes.data : []);
      }

      // Fetch purposes
      const purposesRes = await getVisitorPurposes();
      if (purposesRes?.data) {
        setPurposes(Array.isArray(purposesRes.data) ? purposesRes.data : []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));

    // Building changed - fetch floors and reset dependent fields
    if (field === 'buildingId') {
      setFilters(prev => ({
        ...prev,
        buildingId: value,
        floorId: '',
        unitId: '',
        hostId: ''
      }));
      
      setFloors([]);
      setUnits([]);
      setHosts([]);
      
      if (value) {
        fetchFloorsByBuilding(value);
      }
    }

    // Floor changed - fetch units and reset dependent fields
    if (field === 'floorId') {
      setFilters(prev => ({
        ...prev,
        floorId: value,
        unitId: '',
        hostId: ''
      }));
      
      setUnits([]);
      setHosts([]);
      
      if (value) {
        fetchUnitsByFloor(value);
      }
    }

    // Unit changed - fetch hosts and reset dependent fields
    if (field === 'unitId') {
      setFilters(prev => ({
        ...prev,
        unitId: value,
        hostId: ''
      }));
      
      setHosts([]);
      
      if (value) {
        fetchHostsByUnit(value);
      }
    }
  };

  const fetchFloorsByBuilding = async (buildingId) => {
    try {
      setLoadingFloors(true);
      const floorsRes = await getFloors(buildingId);
      console.log("Floors for building:", floorsRes);
      
      if (floorsRes?.data) {
        const floorsList = Array.isArray(floorsRes.data) 
          ? floorsRes.data 
          : floorsRes.data.floors || [];
        
        setFloors(floorsList);
      }
      
      setLoadingFloors(false);
    } catch (error) {
      console.error("Error fetching floors:", error);
      setFloors([]);
      setLoadingFloors(false);
    }
  };

  const fetchUnitsByFloor = async (floorId) => {
    try {
      setLoadingUnits(true);
      const unitsRes = await getUnits(floorId);
      console.log("Units for floor:", unitsRes);
      
      if (unitsRes?.data) {
        const unitsList = Array.isArray(unitsRes.data) 
          ? unitsRes.data 
          : unitsRes.data.units || [];
        
        setUnits(unitsList);
      }
      
      setLoadingUnits(false);
    } catch (error) {
      console.error("Error fetching units:", error);
      setUnits([]);
      setLoadingUnits(false);
    }
  };

  const fetchHostsByUnit = async (unitId) => {
    try {
      setLoadingHosts(true);
      // Determine which API to call based on available ids (unit > floor > building)
      let hostsRes = null;
      // prefer explicit unitId passed
      if (unitId) {
        hostsRes = await getSetupUsersByUnit('users', unitId);
      } else if (filters.unitId) {
        hostsRes = await getSetupUsersByUnit('users', filters.unitId);
      } else if (filters.floorId) {
        hostsRes = await getSetupUsersByFloor('users', filters.floorId);
      } else if (filters.buildingId) {
        hostsRes = await getSetupUsersByBuilding('users', filters.buildingId);
      } else {
        // nothing selected, clear hosts
        setHosts([]);
        setLoadingHosts(false);
        return;
      }
      console.log("Hosts for unit:", hostsRes);
      
      if (hostsRes?.data) {
        const hostsList = Array.isArray(hostsRes.data) 
          ? hostsRes.data 
          : hostsRes.data.users || [];
        
        setHosts(hostsList);
      }
      
      setLoadingHosts(false);
    } catch (error) {
      console.error("Error fetching hosts:", error);
      setHosts([]);
      setLoadingHosts(false);
    }
  };

  const handleApplyFilters = () => {
    // Build filter object for API
    const apiFilters = {};
    
    if (filters.dateFrom) {
      apiFilters['q[expected_date_gteq]'] = filters.dateFrom;
    }
    
    if (filters.dateTo) {
      apiFilters['q[expected_date_lteq]'] = filters.dateTo;
    }
    
    if (filters.mobile) {
      apiFilters['q[contact_no_cont]'] = filters.mobile;
    }
    
    // Use simple params depending on the most-specific selection
    // Priority: host > unit > floor > building
    if (filters.hostId) {
      apiFilters['host_id'] = filters.hostId;
    } else if (filters.unitId) {
      apiFilters['unit_id'] = filters.unitId;
    } else if (filters.floorId) {
      apiFilters['floor_id'] = filters.floorId;
    } else if (filters.buildingId) {
      apiFilters['building_id'] = filters.buildingId;
    }
    
    if (filters.hostApproval !== '') {
      if (filters.hostApproval === 'required') {
        apiFilters['q[skip_host_approval_eq]'] = false;
      } else if (filters.hostApproval === 'not_required') {
        apiFilters['q[skip_host_approval_eq]'] = true;
      }
    }
    
    if (filters.purpose) {
      apiFilters['q[purpose_cont]'] = filters.purpose;
    }
    
    onApplyFilters(apiFilters);
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      mobile: '',
      buildingId: '',
      floorId: '',
      unitId: '',
      hostId: '',
      hostApproval: '',
      purpose: ''
    });
    setFloors([]);
    setUnits([]);
    setHosts([]);
    onResetFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
          hasActiveFilters 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white text-gray-700 border-gray-300'
        } hover:shadow-md transition-all`}
      >
        <FaFilter />
        Filters
        {hasActiveFilters && (
          <span className="bg-white text-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {Object.values(filters).filter(v => v !== '').length}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-96 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Visitors</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading filter options...</div>
          ) : (
            <div className="space-y-4">
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="From"
                  />
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="To"
                  />
                </div>
              </div>

              {/* Mobile Number Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={filters.mobile}
                  onChange={(e) => handleFilterChange('mobile', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter mobile number"
                  maxLength={10}
                />
              </div>

              {/* Building Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building
                </label>
                <select
                  value={filters.buildingId}
                  onChange={(e) => handleFilterChange('buildingId', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Building</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Floor Filter - Only shown when building is selected */}
              {filters.buildingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>
                  {loadingFloors ? (
                    <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                      Loading floors...
                    </div>
                  ) : (
                    <select
                      value={filters.floorId}
                      onChange={(e) => handleFilterChange('floorId', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      disabled={floors.length === 0}
                    >
                      <option value="">Select Floor</option>
                      {floors.map((floor) => (
                        <option key={floor.id} value={floor.id}>
                          {floor.name || floor.floor_name || `Floor ${floor.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                  {!loadingFloors && floors.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">No floors found for this building</p>
                  )}
                </div>
              )}

              {/* Unit Filter - Only shown when floor is selected */}
              {filters.floorId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  {loadingUnits ? (
                    <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                      Loading units...
                    </div>
                  ) : (
                    <select
                      value={filters.unitId}
                      onChange={(e) => handleFilterChange('unitId', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      disabled={units.length === 0}
                    >
                      <option value="">Select Unit</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name || unit.unit_name || unit.unit_number || `Unit ${unit.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                  {!loadingUnits && units.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">No units found for this floor</p>
                  )}
                </div>
              )}

              {/* Host Filter - Only shown when unit is selected */}
              {filters.unitId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Host
                  </label>
                  {loadingHosts ? (
                    <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500">
                      Loading hosts...
                    </div>
                  ) : (
                    <select
                      value={filters.hostId}
                      onChange={(e) => handleFilterChange('hostId', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      disabled={hosts.length === 0}
                    >
                      <option value="">Select Host</option>
                      {hosts.map((host) => (
                        <option key={host.id} value={host.id}>
                          {host.good_name || `${host.firstname} ${host.lastname}` || host.email || `User ${host.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                  {!loadingHosts && hosts.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">No hosts found for this unit</p>
                  )}
                </div>
              )}

              {/* Host Approval Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Host Approval
                </label>
                <select
                  value={filters.hostApproval}
                  onChange={(e) => handleFilterChange('hostApproval', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">All</option>
                  <option value="required">Required</option>
                  <option value="not_required">Not Required</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

VisitorFilters.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
};

export default VisitorFilters;
