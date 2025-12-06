import React from "react";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { MdApproval, MdCancel } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";

const AdminDailyPickup = () => {
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/pickup-details/${row.id}`}>
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
      name: "Employee",
      selector: (row) => row.employee,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Pickup Location",
      selector: (row) => row.pickUp,
      sortable: true,
    },
    {
      name: "Drop-off Location",
      selector: (row) => row.drop,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Pickup Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Passengers",
      selector: (row) => row.passengers,
      sortable: true,
    },

    // {
    //   name: "Status",
    //   selector: (row) => (row.approval === "Approved" ? row.status : ""),
    //   sortable: true,
    // },

    {
      name: "Approval",
      selector: (row) => (
        <div className="flex gap-4">
          <button className="text-green-400 font-medium">
            <TiTick size={25} />
          </button>
          <button className="text-red-400 font-medium">
            <ImCross />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const filteredData = [
    {
      id: 1,
      pickUp: "Home",
      employee: "employee 1",
      department: "IT",
      drop: "Office",
      date: "23/05/2024",
      time: "08:00 AM",
      passengers: 2,
      status: "Upcoming",
      approval: "Approved",
    },
    {
      id: 2,
      pickUp: "Home",
      employee: "employee 2",
      department: "Sales",
      drop: "Office",
      date: "13/05/2024",
      time: "08:00 AM",
      passengers: 2,
      status: "",
      approval: "Rejected",
    },
    {
      id: 3,
      pickUp: "Home",
      employee: "employee 3",
      department: "Finance",
      drop: "Office",
      date: "1/05/2024",
      time: "08:00 AM",
      passengers: 2,
      status: "Completed",
      approval: "Approved",
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
      <div className="flex md:flex-row flex-col justify-between gap-2 my-2">
        <input
          type="text"
          placeholder="Search by Pick up location or Drop Off location"
          className="border border-gray-400 md:w-96 placeholder:text-xs rounded-lg p-2"
          //   value={searchText}
          //   onChange={handleSearch}
        />
        <div className="flex gap-4">
          <Link
            to={"/admin/book-pickup"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-300 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
            // onClick={() => setShowCountry(!showCountry)}
          >
            <PiPlusCircle size={20} />
            Book
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            // onClick={exportToExcel}
          >
            Export
          </button>
        </div>
      </div>
      <Table
        responsive
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

export default AdminDailyPickup;
