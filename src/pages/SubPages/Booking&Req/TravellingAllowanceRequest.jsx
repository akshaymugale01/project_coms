import React, { useState ,useEffect} from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Navbar from "../../../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import { getTravellingAllowanceRequest } from "../../../api";
import BookingRequestNav from "./BookingRequestnav";

const TravellingAllowanceRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [TravelAllowancerequestsData, setTravelAllowancerequestsData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchTravelAllowanceRequest = async () => {
      try {
        const response = await getTravellingAllowanceRequest();
        const travelallowancereqresp = response.data.sort((a,b)=> {
          return new Date(b.created_at) - new Date(a.created_at)
        })
        console.log("response from api",travelallowancereqresp)
        
        setTravelAllowancerequestsData(travelallowancereqresp);
       
      } catch (err) {
        console.error("Failed to fetch travel allowance request data:", err);
      }
    };
  
    fetchTravelAllowanceRequest(); // Call the API
  }, []);

 

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/travelling-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/travelling-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Expense Category",
      selector: (row) => row.expense_category,
      sortable: true,
    },
    {
      name: "Date of Expense",
      selector: (row) => row.date_of_expense,
      sortable: true,
    },
    {
      name: "Description of Expense",
      selector: (row) => row.description_of_expense,
      sortable: true,
    },
    {
      name: "Amount Spent",
      selector: (row) => row.amount_spent,
      sortable: true,
    },
    // {
    //   name: "Supporting Documents",
    //   selector: (row) => row.document,
    //   sortable: true,
    // },
    {
      name: "Reimbursement Amount",
      selector: (row) => row.reimbursement_amount,
      sortable: true,
    },
    {
      name: "Reimbursement Method",
      selector: (row) => row.reimbursement_method,
      sortable: true,
    },
    {
      name: "Manager Approval",
      selector: (row) => row.manager_approval ? "Approved" : "Not Approved",
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.approval_status,
      sortable: true,
    },
    {
      name: "Reimbursement Confirmation Email",
      selector: (row) => row.reimbursement_confirmation_email,
      sortable: true,
    },
   
    {
        name: "Approval",
        selector: (row) =>
          (
            <div className="flex justify-center gap-2">
              <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                <TiTick size={20} />
              </button>
              <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                <IoClose size={20} />
              </button>
            </div>
          ),
        sortable: true,
      },
  ];

 
 

  // Function to handle status change (e.g., all, upcoming, completed, cancelled)
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Additional logic can be added here if needed
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
       <BookingRequestNav/>
        {/* Filter and Add section */}
        <div className="w-full flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcoming"
                name="status"
                checked={selectedStatus === "upcoming"}
                onChange={() => handleStatusChange("upcoming")}
              />
              <label htmlFor="upcoming" className="text-sm">
                Upcoming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          {/* Add button */}
          <span className="flex gap-4">
            <Link
              to={"/admin/add-travelallowance-request"}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"  
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
            {/* Additional buttons can be added here */}
          </span>
        </div>
        {/* Table section with right-side scrolling */}
        <div className="w-full overflow-x-auto">
          <Table
            responsive
            columns={columns}
            data={TravelAllowancerequestsData}
            // customStyles={customStyle}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </section>
  );
};

export default TravellingAllowanceRequest;