import React from "react";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";

const OutStation = () => {
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employees/outstation-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Booking ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Departure Date",
      selector: (row) => row.departure_date,
      sortable: true,
    },
    {
      name: "Return Date",
      selector: (row) => row.return_date,
      sortable: true,
    },
    {
      name: "Passengers",
      selector: (row) => row.passengers,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Cancellation",
      selector: (row) =>
        row.status === "Completed" ? (
          ""
        ) : (
          <button className="text-red-400 font-medium">Cancel</button>
        ),
      sortable: true,
    },
  ];

  const filteredData = [
    {
      id: 1,
      destination: "Mumbai",
      departure_date: "20/05/2024",
      return_date: "23/05/2024",
      passengers: 2,
      status: "Upcoming",
    },
    {
      id: 2,
      destination: "Delhi",
      departure_date: "10/05/2024",
      return_date: "13/05/2024",
      passengers: 2,
      status: "Completed",
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
  };

  // const handleSearch = (e) => {
  //     const searchValue = e.target.value;
  //     setSearchText(searchValue);

  //     if (searchValue.trim() === "") {
  //       // If search input is empty, reset to show all data
  //       setFilteredData(complaints);
  //     } else {
  //       // Filter the data based on search input and selected status
  //       const filteredResults = complaints.filter(
  //         (item) =>
  //           ((selectedStatus === "all" ||
  //             item.issue_status.toLowerCase() === selectedStatus.toLowerCase()) &&
  //             (item.ticket_number
  //               .toLowerCase()
  //               .includes(searchValue.toLowerCase()) ||
  //               item.category_type
  //                 .toLowerCase()
  //                 .includes(searchValue.toLowerCase()))) ||
  //           item.issue_type.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.heading.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.priority.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           (item.unit && item.unit.toLowerCase().includes(searchValue.toLowerCase()))
  //         // ||
  //         // item.assigned_to.toLowerCase().includes(searchValue.toLowerCase())
  //       );
  //       setFilteredData(filteredResults);
  //     }
  //   };

  return (
    <section className="my-5">
      <div className="flex justify-between gap-2 my-2">
        <input
          type="text"
          placeholder="Search by Destination or Status"
          className="border border-gray-400 w-96 placeholder:text-xs rounded-lg p-2"
          //   value={searchText}
          //   onChange={handleSearch}
        />

        <Link
          to={"/employees/book-outstation"}
          className="border-2 font-semibold hover:bg-black hover:text-white duration-300 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2 justify-center"
          // onClick={() => setShowCountry(!showCountry)}
        >
          <PiPlusCircle size={20} />
          Book
        </Link>
      </div>
      <Table
        responsive
        // selectableRows
        columns={columns}
        data={filteredData}
        // customStyles={customStyle}
        // pagination
        // fixedHeader
        // // fixedHeaderScrollHeight="420px"
        // selectableRowsHighlight
        // highlightOnHover
      />
    </section>
  );
};

export default OutStation;
