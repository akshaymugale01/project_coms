import React, { useEffect, useState } from 'react';
import { getServicesRoutineList, getSoftServiceStatus } from '../../api';
import Table from '../../components/table/Table';
import { Link } from 'react-router-dom';
import Services from '../Services';
import Navbar from '../../components/Navbar';
import * as XLSX from 'xlsx';
import { BsEye } from 'react-icons/bs';
import { DNA } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';

const ServicesTask = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [routines, setRoutines] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searchRoutineText, setSearchRoutineCheck] = useState('');
  const [filteredRoutineData, setFilteredRoutineData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // Date filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); 

  const themeColor = useSelector((state) => state.theme.color);

  // Helper: Format date for display
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const routineColumn = [
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/service/checklist/${row.soft_service_id}/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: 'Service Name',
      selector: (row) => row.soft_service_name,
      sortable: true,
    },
    {
      name: 'Checklist Name',
      selector: (row) => row.checklist_name,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row) => dateFormat(row.start_time),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Assigned To',
      selector: (row) => row.assigned_to_name,
      sortable: true,
    },
  ];

  // Initial data fetching & pagination
  useEffect(() => {
    const fetchServiceRoutine = async () => {
      try {
        const ServiceRoutineResponse = await getServicesRoutineList(pageNo, perPage);
        const filteredServiceTask = ServiceRoutineResponse.data.activities.filter(
          (asset) => asset.soft_service_name
        );
        setRoutines(filteredServiceTask);
        setFilteredRoutineData(filteredServiceTask);
        setTotal(ServiceRoutineResponse.data.total_pages * perPage);
      } catch (error) {
        console.error('Error fetching service routines:', error);
      }
    };
    fetchServiceRoutine();
  }, [pageNo, perPage]);

  // Pagination handler
  const handlePageChange = (page, pageSize) => {
    setPageNo(page);
    setPerPage(pageSize);
  };

  // Update filtered data based on combined filters: status, search, and date range
  const applyFilters = (status = selectedStatus, searchText = searchRoutineText, fromDate = startDate, toDate = endDate, baseData = routines) => {
    let filtered = baseData;

    // Status filter
    if (status !== 'all') {
      filtered = filtered.filter((item) => item.status?.toLowerCase() === status.toLowerCase());
    }

    // Search filter
    if (searchText.trim() !== '') {
      filtered = filtered.filter(
        (item) =>
          item.soft_service_name &&
          item.soft_service_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Date filter
    if (fromDate || toDate) {
      const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
      const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;
      filtered = filtered.filter((item) => {
        if (!item.start_time) return false;
        const itemDate = new Date(item.start_time).getTime();
        if (from && to) return itemDate >= from && itemDate <= to;
        if (from) return itemDate >= from;
        if (to) return itemDate <= to;
        return true;
      });
    }

    return filtered;
  };

  // When user changes status radio buttons
  const handleStatusChange = async (status) => {
    setSelectedStatus(status);

    // If 'all', no API fetch, just filter existing routines for other criteria
    if (status === 'all') {
      const updatedFiltered = applyFilters('all', searchRoutineText, startDate, endDate, routines);
      setFilteredRoutineData(updatedFiltered);
    } else {
      // For other statuses, try fetching fresh data but apply search and date filter locally
      try {
        const respdata = await getSoftServiceStatus(status);
        const filteredServiceTask = respdata.data.activities.filter(
          (asset) => asset.soft_service_name
        );
        const updatedFiltered = applyFilters(status, searchRoutineText, startDate, endDate, filteredServiceTask);
        setFilteredRoutineData(updatedFiltered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  // Search input handler
  const handleRoutineSearch = (event) => {
    const searchValue = event.target.value;
    setSearchRoutineCheck(searchValue);
    const updatedFiltered = applyFilters(selectedStatus, searchValue, startDate, endDate, routines);
    setFilteredRoutineData(updatedFiltered);
  };

  // Apply date filter button handler
  const handleApplyDateFilter = () => {
    const updatedFiltered = applyFilters(selectedStatus, searchRoutineText, startDate, endDate, routines);
    setFilteredRoutineData(updatedFiltered);
  };

  // Clear date filter button handler - clears only dates and reapplies filters without date
  const handleClearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    const updatedFiltered = applyFilters(selectedStatus, searchRoutineText, '', '', routines);
    setFilteredRoutineData(updatedFiltered);
  };

  // Export to Excel
  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = 'service Task Data.xlsx';
    const ws = XLSX.utils.json_to_sheet(filteredRoutineData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <Services />

        {/* Optional filter toggle toggle can be added here if required */}
        {/* {filter && ( */}
        {/* Filter inputs for Service Name, Area, Building can be implemented if needed */}
        {/* )} */}

        {/* Date Filter Section */}
        <div className="flex items-center justify-start gap-4 my-4 p-4 bg-gray-50 rounded-md border">
          <div className="flex items-center gap-2">
            <label htmlFor="startDate" className="font-medium text-sm">
              Start:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="endDate" className="font-medium text-sm">
              End:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleApplyDateFilter}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
            style={{ background: themeColor }}
          >
            Apply
          </button>

          <button
            onClick={handleClearDateFilter}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
          >
            Clear
          </button>

          <button
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
          >
            Export ({filteredRoutineData.length})
          </button>
        </div>

        <div className="flex sm:flex-row flex-col justify-between gap-2 my-5">
          <div className="md:flex justify-between grid grid-cols-2 items-center gap-2 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === 'all'}
                onChange={() => handleStatusChange('all')}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="pending"
                name="status"
                checked={selectedStatus === 'pending'}
                onChange={() => handleStatusChange('pending')}
              />
              <label htmlFor="pending" className="text-sm">
                Pending
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === 'completed'} // fix here
                onChange={() => handleStatusChange('completed')}
              />
              <label htmlFor="completed" className="text-sm">
                Complete
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="overdue"
                name="status"
                checked={selectedStatus === 'overdue'}
                onChange={() => handleStatusChange('overdue')}
              />
              <label htmlFor="overdue" className="text-sm">
                Overdue
              </label>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-2">
            <input
              type="text"
              placeholder="Search By name"
              className="border border-gray-400 md:w-96 placeholder:text-xs rounded-lg p-2"
              value={searchRoutineText}
              onChange={handleRoutineSearch}
            />
          </div>
        </div>

        {routines.length !== 0 ? (
          <>
            <Table
              selectableRows
              columns={routineColumn}
              data={filteredRoutineData}
              fixedHeader
              pagination={false}
            />
            <div className="bg-white mb-10 p-2 flex justify-end">
              <Pagination
                current={pageNo}
                total={total}
                pageSize={perPage}
                onChange={handlePageChange}
                responsive
                showSizeChanger
                onShowSizeChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesTask;
