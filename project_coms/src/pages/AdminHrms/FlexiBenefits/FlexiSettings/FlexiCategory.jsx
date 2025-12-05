import React, { useEffect, useState } from "react";
import FlexiSetting from "./FlexiSetting";
import Table from "../../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";
import { PiPlus } from "react-icons/pi";
import { useSelector } from "react-redux";
import AddFlexiCategory from "./AddFlexiCategory";
import { deleteFlexiBenefitCategory, getFlexiBenefitCategory } from "../../../../api";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import EditFlexiCategory from "./EditFlexiCategory";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const FlexiCategory = () => {
  const [page, setPage] = useState("table");
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Label",
      sortable: true,
      selector: (row) => row.label,
      width:"500px"
    },
    {
      name: "Action",

      selector: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditScreen(row.id)}>
            <BiEdit />
          </button>
          <button onClick={() => handleDeleteFlexiBenefit(row.id)} className="text-red-400">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteFlexiBenefit = async (id) => {
    try {
      await deleteFlexiBenefitCategory(id);
      fetchFlexiCategory();
      toast.success("Flexi benefit category deleted successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const [flexiId, setFlexiId] = useState("");

  const handleEditScreen = (id) => {
    setFlexiId(id);
    setPage("edit");
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const fetchFlexiCategory = async () => {
    try {
      const res = await getFlexiBenefitCategory(hrmsOrgId);
      setFilteredBenefits(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFlexiCategory();
  }, []);
  const themeColor = useSelector((state) => state.theme.color);

  return (
    <div className="ml-20 flex gap-2">
      <FlexiSetting />
      <div className="w-2/3 h-full my-2">
        <div className="p-6 bg-white rounded-md ">
          <div className="flex justify-between my-2">
            <h1 className=" font-semibold">
              {page === "table"
                ? "Flexi Benefit Categories"
                : page === "table"
                ? "Add Benefit Category"
                : "Edit Benefit Category"}
            </h1>
            {page === "table" && (
              <button
                style={{ background: themeColor }}
                className="flex items-center gap-2 font-medium rounded-md text-white p-2"
                onClick={() => setPage("add")}
              >
                <PiPlus /> Flexi Benefit Category
              </button>
            )}
          </div>
          {page === "table" ? (
            <Table columns={columns} data={filteredBenefits}  />
          ) : page === "add" ? (
            <AddFlexiCategory
              setPage={() => setPage("table")}
              fetchFlexiCategory={fetchFlexiCategory}
            />
          ) : (
            <EditFlexiCategory
              setPage={() => setPage("table")}
              fetchFlexiCategory={fetchFlexiCategory}
              flexiId={flexiId}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        <div className=" ">
          {/* <p className="font-medium">Leave Setting Guidelines:</p> */}
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Flexi benefit settings allow you to configure salary-related
                  reimbursements that let employees save on tax by submitting
                  proofs. Unsubmitted amount will be considered as a taxable
                  income.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  You can create different categories like internet allowances,
                  petrol reimbursements, food allowances, etc. and set the
                  allowance amount in the employee salary table. You can set the
                  frequency as monthly/quarterly/semi-annually/annually.
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  The eligibility of the calculations will be based on the
                  attendance.
                </li>
              </ul>
            </li>

            <li>
              <p>
                Employees can track their eligibility and reimbursement status
                from the flexi-benefits section. They also have an option to
                generate separate flexi payslip.
              </p>
            </li>
            <li>
              <p>
                Categories cannot be edited/deleted if already assigned to
                employees. Copyright © 2024 Vibeconnect
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlexiCategory;
