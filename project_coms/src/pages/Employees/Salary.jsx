import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaDownload } from "react-icons/fa";
import Table from "../../components/table/Table";

const Salary = () => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Basic Salary",
      selector: (row) => row.basicSalary,
      sortable: true,
    },
    {
      name: "Allowances",
      selector: (row) => row.allowances,
      sortable: true,
    },
    {
      name: "Deductions",
      selector: (row) => row.deductions,
      sortable: true,
    },
    {
      name: "Net Salary",
      selector: (row) => row.netSalary,
      sortable: true,
    },
    {
      name: "Download",
      cell: (row) => (
        <button onClick={() => handleDownload(row)} className="font-bold">
          <FaDownload />
        </button>
      ),
    },
  ];

  const data = [
    {
      date: "17/05/2024",
      basicSalary: "3000",
      allowances: "500",
      deductions: "200",
      netSalary: "3300",
    },
    {
      date: "18/05/2024",
      basicSalary: "4000",
      allowances: "600",
      deductions: "300",
      netSalary: "4300",
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
  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(data);
    } else {
      const filteredResults = data.filter(
        (item) =>
          item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.basicSalary.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.allowances.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.deductions.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.netSalary.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const filteredResults = data.filter((item) => {
      const currentDate = new Date(item.date);
      return (!start || currentDate >= start) && (!end || currentDate <= end);
    });

    setFilteredData(filteredResults);
  };

  const handleDownload = (row) => {
    const doc = new jsPDF();
    doc.text("Salary Slip", 10, 10);
    doc.text(`Date: ${row.date}`, 10, 20);
    doc.text(`Basic Salary: ${row.basicSalary}`, 10, 30);
    doc.text(`Allowances: ${row.allowances}`, 10, 40);
    doc.text(`Deductions: ${row.deductions}`, 10, 50);
    doc.text(`Net Salary: ${row.netSalary}`, 10, 60);
    doc.save(`salary_slip_${row.date}.pdf`);
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-5">
          <input
            type="text"
            placeholder="Search by Date "
            className="border border-gray-400 w-96 placeholder:text-xs rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)} 
            startDate={startDate}
            endDate={endDate}
            isClearable
            placeholderText="Select Date Range"
            selectsRange={true}
            dateFormat="dd/MM/yyyy"
            className="border border-gray-400 rounded-lg p-2"
          /> */}
        </div>
        <Table
          responsive
          columns={columns}
          data={filteredData}
          // customStyles={customStyle}
          // pagination
          // fixedHeader
          // selectableRowsHighlight
          // highlightOnHover
        />
      </div>
    </section>
  );
};

export default Salary;
