import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { Link } from "react-router-dom";
import { GrHelpBook } from "react-icons/gr";
import { deletePayrollLoanCategory, getPayrollLoanCategory } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Loans = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };

  const columns = [
    { name: " Label", selector: (row) => row.label_name, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button className="text-blue-400 ">
            <BiEdit />
          </button>
          <button
            className="text-red-400 "
            onClick={() => handleDeleteLoanCategory(row.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteLoanCategory = async (id) => {
    try {
      await deletePayrollLoanCategory(id);
      toast.success("Loan category deleted successfully");
      fetchLoanCategory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchLoanCategory = async () => {
    try {
      const res = await getPayrollLoanCategory(hrmsOrgId);
      setFilteredCategories(res);
      setCategories(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoanCategory();
  }, []);

  return (
    <section className="flex ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-2 gap-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
          />
          <Link
            to={"/admin/add-loan"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <Table
          columns={columns}
          data={filteredCategories}
          isPagination={true}
        />
      </div>

      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className=" ">
            {/* <p className="font-medium">Help Center</p> */}
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can create the Category of loan or advance as per your
                    organization for e.g. loan can be Salary advance, Staff
                    Loan, Education Loan etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can further configure the setting like Tenure of the
                    loan, Mode of Loan disbursement and Recovery mode, Interest
                    Rate, Interest calculation method.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also choose whether to calculate the perquisite on
                    this category of loan, to calculate the correct value of
                    perquisite ensure to update the Interest rate as per market
                    i.e. Interest on 1st of April of relevant financial year SBI
                    Interest for the specific category (House loan, Education
                    loan, Personal Loan etc), this can be found on SBI official
                    website. COPYRIGHT © 2024 My Citi Life{" "}
                  </li>
                </ul>
              </li>

              {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
These allowance can be with or without linked with attendance or Payable days          </p>
                </li>
                <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
You can change allowances setting anytime but once payroll is processed won’t be deleted.        </p>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loans;
