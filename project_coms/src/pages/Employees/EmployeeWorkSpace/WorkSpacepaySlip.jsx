import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import EmployeePortal from '../../../components/navbars/EmployeePortal';
import Table from '../../../components/table/Table';
import { BsEye } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import pay from '/pay.png'; // Ensure the path is correct
import { Link } from 'react-router-dom';

// Sample data for the table
const initialPayslipData = [
  { id: 1, monthYear: '2024-08', payslip: 'View', taxPayslip: 'View', detailedPayslip: 'View' },
  { id: 2, monthYear: '2024-07', payslip: 'View', taxPayslip: 'View', detailedPayslip: 'View' },
  { id: 3, monthYear: '2024-06', payslip: 'View', taxPayslip: 'View', detailedPayslip: 'View' },
  // Add more data as needed
];

// Columns for the DataTable
const columns = [
  {
    name: 'Month-Year',
    selector: row => row.monthYear,
    sortable: true,
  },
  {
    name: 'Payslip',
    cell: row => (
      <div className="flex space-x-4">
        <Link to={"/employee-portal/payslip-details"}  className="btn btn-primary">
          <BsEye />
        </Link>
        <button onClick={() => handleDownloadPayslip(row.id)} className="btn btn-secondary">
          <FaDownload />
        </button>
      </div>
    ),
  },
  {
    name: 'Tax Payslip',
    cell: row => (
      <div className="flex space-x-4">
        <Link to={"/employee-portal/payslip-details"}  className="btn btn-primary">
          <BsEye />
        </Link>
        <button onClick={() => handleDownloadPayslip(row.id)} className="btn btn-secondary">
          <FaDownload />
        </button>
      </div>
    ),
  },
  {
    name: 'Detailed Payslip',
    cell: row => (
      <div className="flex space-x-4">
        <Link to={"/employee-portal/payslip-details"}  className="btn btn-primary">
          <BsEye />
        </Link>
        <button onClick={() => handleDownloadPayslip(row.id)} className="btn btn-secondary">
          <FaDownload />
        </button>
      </div>
    ),
  },
];

// Handlers for button clicks
const handleViewPayslip = (id) => {
  console.log('View Payslip for ID:', id);
};

const handleDownloadPayslip = async (id) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Create an image element
  const img = new Image();
  img.src = pay;

  // Wait for the image to load
  img.onload = () => {
    // Convert the image to a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Convert the canvas to a data URL
    const imgData = canvas.toDataURL('image/jpeg');

    // Add the image to the PDF
    doc.addImage(imgData, 'JPEG', 10, 10, 180, 0); // Adjust positioning and size as needed

    // Save the PDF
    doc.save(`payslip_${id}.pdf`);
  };
};

const handleViewTaxPayslip = (id) => {
  console.log('View Tax Payslip for ID:', id);
};

const handleDownloadTaxPayslip = (id) => {
  console.log('Download Tax Payslip for ID:', id);
};

const handleViewDetailedPayslip = (id) => {
  console.log('View Detailed Payslip for ID:', id);
};

const handleDownloadDetailedPayslip = (id) => {
  console.log('Download Detailed Payslip for ID:', id);
};

const WorkSpacePaySlip = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const [payslipData, setPayslipData] = useState([]);

  useEffect(() => {
    // Filter or update data based on selectedMonth
    const filteredData = initialPayslipData.filter(
      data => data.monthYear === selectedMonth
    );
    setPayslipData(filteredData);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="my-2">
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded-md p-2 w-60"
          />
        </div>
        <Table
          columns={columns}
          data={payslipData}
          pagination
          highlightOnHover
          striped
          className="mt-4"
        />
      </div>
    </section>
  );
};

export default WorkSpacePaySlip;
