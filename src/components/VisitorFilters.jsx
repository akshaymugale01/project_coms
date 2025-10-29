import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getVisitorPurposes, getVisitorHosts, getUnitsByUserId } from '../api';
import { FaFilter, FaTimes } from 'react-icons/fa';

const VisitorFilters = ({ onApplyFilters, onResetFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [purposes, setPurposes] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    mobile: '',
    hostId: '',
    unitId: '',
    hostApproval: '',
    purpose: ''
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      
      // Fetch purposes
      const purposesRes = await getVisitorPurposes();
      if (purposesRes?.data) {
        setPurposes(Array.isArray(purposesRes.data) ? purposesRes.data : []);
      }

      // Fetch hosts
      const hostsRes = await getVisitorHosts();
      if (hostsRes?.data) {
        const hostsList = Array.isArray(hostsRes.data) ? hostsRes.data : hostsRes.data.users || [];
        setHosts(hostsList);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filter options:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));

    // When host changes, fetch units for that host and reset unit filter
    if (field === 'hostId') {
      setFilters(prev => ({
        ...prev,
        hostId: value,
        unitId: '' // Reset unit when host changes
      }));
      
      if (value) {
        fetchUnitsByHost(value);
      } else {
        setUnits([]);
      }
    }
  };

  const fetchUnitsByHost = async (userId) => {
    try {
      setLoadingUnits(true);
      const unitsRes = await getUnitsByUserId(userId);
      console.log("Units for user:", unitsRes);
      
      if (unitsRes?.data) {
        // The API returns units directly or in a units array
        const unitsList = Array.isArray(unitsRes.data) 
          ? unitsRes.data 
          : unitsRes.data.units || [];
        
        console.log("Extracted units:", unitsList);
        setUnits(unitsList);
      }
      
      setLoadingUnits(false);
    } catch (error) {
      console.error("Error fetching units:", error);
      setUnits([]);
      setLoadingUnits(false);
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
    
    if (filters.hostId) {
      apiFilters['q[hosts_user_id_eq]'] = filters.hostId;
    }
    
    if (filters.unitId) {
      apiFilters['q[hosts_unit_id_eq]'] = filters.unitId;
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
      hostId: '',
      unitId: '',
      hostApproval: '',
      purpose: ''
    });
    setUnits([]);
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
                  Date Range
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

              {/* Host Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Host
                </label>
                <select
                  value={filters.hostId}
                  onChange={(e) => handleFilterChange('hostId', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">All Hosts</option>
                  {hosts.map((host) => (
                    <option key={host.id} value={host.id}>
                      {host.firstname} {host.lastname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Filter - Only shown when a host is selected */}
              {filters.hostId && (
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
                      <option value="">All Units</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name || unit.unit_name || unit.unit_number || `Unit ${unit.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                  {!loadingUnits && units.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">No units found for this host</p>
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

              {/* Purpose Filter */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose
                </label>
                <select
                  value={filters.purpose}
                  onChange={(e) => handleFilterChange('purpose', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">All Purposes</option>
                  {purposes.map((purpose) => (
                    <option key={purpose.id} value={purpose.info_value || purpose.name}>
                      {purpose.info_value || purpose.name}
                    </option>
                  ))}
                </select>
              </div> */}




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
