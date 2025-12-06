import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import LeaveSetting from "./LeaveSetting";
import { BiEdit } from "react-icons/bi";
import { deleteLeaveCategory, getLeaveCategory } from "../../api";
import { GrHelpBook } from "react-icons/gr";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const LeaveCategories = () => {
  const columns = [
    {
      name: "Leave Label",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row.type_of_leave,
      sortable: true,
    },
    {
      name: "Frequency Of Accrual",
      selector: (row) => row.accrual_period,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/leave-categories/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          <button onClick={() => handleDeleteLeaveCategory(row.id)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const handleDeleteLeaveCategory = async (catId) => {
    try {
      await deleteLeaveCategory(catId);
      toast.success("Leave category deleted successfully");
      fetchLeaveCategory();
    } catch (error) {
      console.log(object);
    }
  };

  const [filteredLeavesCat, setFilteredLeavesCat] = useState([]);
  const [leavesCat, setLeavesCat] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchLeaveCategory = async () => {
    try {
      const res = await getLeaveCategory(hrmsOrgId);
      setFilteredLeavesCat(res);
      setLeavesCat(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeaveCategory();
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredLeavesCat(leavesCat);
    } else {
      const filteredResult = leavesCat.filter((leave) =>
        leave.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLeavesCat(filteredResult);
    }
  };

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <section className="flex justify-between ml-20 gap-2">
      <LeaveSetting />
      <div className="w-[50rem] flex mx-2 flex-col overflow-hidden">
        <div className=" flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Search by label "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <Link
            to={"/admin/leave-categories"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-1 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <Table columns={columns} data={filteredLeavesCat} isPagination={true} />
      </div>
      <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        <div className=" ">
          <p className="font-medium">Leave Setting Guidelines:</p>
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Leaves consist of different categories like Privilege leave,
                  casual leave, maternity leave, etc.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Leave settings allows you to configure and assign leave policy
                  for different category of leaves based on department, profile,
                  locations, etc.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Within the leave category you can set custom leave policies
                  like accrual frequency period, leave encashment, recovery
                  policies, sandwich leave, etc.{" "}
                </li>
              </ul>
            </li>

            <li>
              <p>
                {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                Within the template settings you can set approval hierarchy and
                accrual policy for new joinees, etc.{" "}
              </p>
            </li>
            <li>
              <p>
                {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                Leave module is integrated with the attendance module. Hence the
                leave data will be synced to attendance.{" "}
              </p>
            </li>
            <li>
              <p>
                <a href="leave-link" className="text-blue-400">
                  Click Here{" "}
                </a>
                for detailed information.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LeaveCategories;
