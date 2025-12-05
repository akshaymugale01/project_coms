import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { BsEye } from 'react-icons/bs';
import Table from '../components/table/Table';
import { useSelector } from "react-redux";
import { getOtherBills } from '../api';
import { BiEdit } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCreditCard, FaHourglassHalf, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaMoneyCheckAlt, FaRegFileAlt } from 'react-icons/fa';
function Bills() {
  const themeColor = useSelector((state) => state.theme.color);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const FormatedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
 
  const column = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/-other-bills-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/other-bills-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Supplier", selector: (row) => row.vendor_name, sortable: true },
    { name: "Last Approved By", selector: (row) => row.LastApprovedBy, sortable: true },
    { name: "Total Amount", selector: (row) => row.total_amount, sortable: true },
    { name: "Deduction", selector: (row) => row.Deduction, sortable: true },
    { name: "TDS(%)", selector: (row) => row.tds_percentage, sortable: true },
    {
      name: "TDS Amount",
      selector: (row) => ((row.total_amount - row.tax_amount * (row.tds_percentage / 100)).toFixed(2)),
      sortable: true
    },
    
        { name: "Retention(%)", selector: (row) => row.retention_percentage, sortable: true },
    { name: "Retention Amount", selector: (row) =>  ((row.total_amount-row.tax_amount * (row.retention_percentage / 100)).toFixed(2)), sortable: true },
    { name: "Payable Amount", selector: (row) => row.PayableAmount, sortable: true },
    { name: "Bill Date", selector: (row) => row.bill_date, sortable: true },
    { name: "Invoice Number", selector: (row) => row.invoice_number, sortable: true },
    { name: "Payment Tenure(In Days)", selector: (row) => row.payment_tenure, sortable: true },
    
    { name: "Amount Paid", selector: (row) => row.AmountPaid, sortable: true },
    { name: "Balance Amount", selector: (row) => row.BalanceAmount, sortable: true },
    { name: "Payment Status", selector: (row) => row.PaymentStatus, sortable: true },

    // { name: "Related to", selector: (row) => row.related_to, sortable: true },
    
    // { name: "Deduction Remarks", selector: (row) => row.deduction_remarks, sortable: true },
    // { name: "Amount", selector: (row) => row.deduction_amount, sortable: true },
    // { name: "Additional Expenses", selector: (row) => row.additional_expenses, sortable: true },
    
    // { name: "CGST Rate", selector: (row) => row.cgst_rate, sortable: true },
    // { name: "CGST Amount", selector: (row) => row.cgst_amount, sortable: true },
    // { name: "SGST Rate", selector: (row) => row.sgst_rate, sortable: true },
    // { name: "SGST Amount", selector: (row) => row.sgst_amount, sortable: true },
    // { name: "IGST Rate", selector: (row) => row.igst_rate, sortable: true },
    // { name: "IGST Amount", selector: (row) => row.igst_amount, sortable: true },
    // { name: "TCS Rate", selector: (row) => row.tcs_rate, sortable: true },
    // { name: "TCS Amount", selector: (row) => row.tcs_amount, sortable: true },
    // { name: "Tax Amount", selector: (row) => row.tax_amount, sortable: true },
    // { name: "Total Amount", selector: (row) => row.total_amount, sortable: true },
    
    
    // { name: "Payment Status", selector: (row) => row.Payment_Status, sortable: true },
    { name: "Created On", selector: (row) => FormatedDate(row.created_at), sortable: true },
    { name: "Created By", selector: (row) => row.Created_by, sortable: true },
  ];

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getOtherBills();
        setData(response.data); // Assuming response.data contains the array of bills
        setFilteredData(response.data);
      } catch (error) {
        setError('Failed to fetch bills');
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);
  const getTotalAmount = () => {
    return data.reduce((acc, bill) => acc + bill.total_amount, 0);
  };
  useEffect(() => {
    const handleFilter = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredData(filtered);
    };

    handleFilter();
  }, [searchQuery, data]);
  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter(row => {
        const billDate = new Date(row.bill_date);
        return billDate >= startDate && billDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Show all data if no date range is selected
    }
  }, [startDate, endDate, data]);
  return (
    <section className='flex'>
      <Navbar />
      <div className="p-4 w-full my-2 flex overflow-hidden flex-col">
      <div className="flex items-center gap-6 overflow-auto p-2 ">
      <div className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-gray-500 text-sm w-fit font-medium">
      <div className="flex gap-4">
  <FaRegFileAlt  size={40} />
  <div className="flex flex-col">
    <span>Total Bills</span>
    <span className="font-medium text-base text-center text-black">
      {data.length}
    </span>
  </div>
</div>

          </div>
          
          <div className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-gray-500 text-sm w-fit font-medium">
          <div className="flex gap-4">
  <FaMoneyBillWave  size={40} />
  <div className="flex flex-col">
          Total Amount
  <span className="font-medium text-base text-black">
  ₹ {getTotalAmount().toLocaleString()}
          </span>{" "}
</div>
</div>
</div>
<div className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-gray-500 text-sm w-fit font-medium">
<div className="flex gap-4">
  <FaCreditCard  size={40} />
  <div className="flex flex-col">
Total Paid Amount
<span className="font-medium text-base text-black">
₹123
          </span>{" "}
          </div>
          </div></div>
          <div className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-gray-500 text-sm w-fit font-medium">
          <div className="flex gap-4">
  <FaHourglassHalf  size={40} />
  <div className="flex flex-col">
         Total Pending Amount
         <span className="font-medium text-base text-black">
₹56231
          </span>{" "}
          </div>
        </div>
        </div></div>
        <div className='flex md:flex-row flex-col justify-between md:items-center my-2 gap-2'>
          <input
            type="text"
            className='p-2 md:w-96 border-gray-300 rounded-md placeholder:text-sm outline-none border'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='flex justify-end gap-2 z-20'>
          {/* Single Date Range Picker Input */}
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Search by Bill Date"
            className="p-2 border-gray-300 rounded-md w-64 outline-none border"
          />
          <Link
            to={"/admin/add-other-bills"}
           className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            style={{ background: themeColor }}
          >
            <IoAddCircleOutline />
            Add
          </Link>
          </div>
        </div>
        <Table
          columns={column}
          data={filteredData}
          isPagination={true}
        />
      </div>
    </section>
  );
}

export default Bills;
