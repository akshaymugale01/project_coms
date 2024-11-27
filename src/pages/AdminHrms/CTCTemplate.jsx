import React, { useEffect, useState } from "react";

import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { deleteCTCTemplate, deleteNewCTCTemplate, getCTCTemplate, showCTCTemplates } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import { GrHelpBook } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const CTCTemplate = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Template Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "No. Of Employees Covered",
    //   selector: (row) => row.Label,
    //   sortable: true,
    // },
    // {
    //   name: "Fixed Allowances",
    //   selector: (row) => row.fixed_salary_allowance.length,
    //   sortable: true,
    // },
    // {
    //   name: "Other Allowances	",
    //   selector: (row) => row.Country,
    //   sortable: true,
    // },
    // {
    //   name: "Fixed Deductions",
    //   selector: (row) => row.fixed_salary_deductions.length,
    //   sortable: true,
    // },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link
          to={`/admin/hrms/ctc/ctc-template/edit/${row.id}`}
          >
            <BiEdit size={15} />
          </Link>
          <button
            className="text-red-400"
            onClick={() => handleDeleteTemplate(row.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteTemplate = async (id) => {
    try {
      await deleteNewCTCTemplate(id);
      fetchCTCTemplates();
      toast.success("CTC template deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchCTCTemplates = async () => {
    try {
      const res = await showCTCTemplates(hrmsOrgId);
      setFilteredTemplates(res);
      setTemplates(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCTCTemplates();
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredTemplates(templates);
    } else {
      const filteredResult = templates.filter((template) =>
        template.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTemplates(filteredResult);
    }
  };

  return (
    <section className="flex ml-20">
      <AdminHRMS />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex  justify-between my-2 gap-4">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <Link
            style={{ background: themeColor }}
            to={"/admin/hrms/ctc/ctc-template/General-Settings"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Template
          </Link>
        </div>
        <Table columns={columns} data={filteredTemplates} isPagination={true} />
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium text-base">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Create a New Template: Click the "+ New CTC Template" button
                    to start creating a new template.
                  </li>{" "}
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Enter Template Details: Template Label: Provide a
                    descriptive label for the new CTC template.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Employee Selection Based on CTC Basket: Choose whether to
                    include an employee selection based on the CTC basket.
                    Select "Yes" to customize components or "No" to proceed
                    without this option.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Component and Hierarchy Selection: If you selected 'Yes' for
                    the CTC basket, choose the relevant components such as
                    flexi-benefit components, flexi-allowances, etc., to form
                    the employee CTC.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Define the hierarchy and components: Fixed Components:
                    Specify all fixed salary components.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Flexi-Benefit Components: List the components under
                    flexi-benefits.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Employee Contribution: Outline contributions made by
                    employees.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Employee Deduction: Define deductions applicable to
                    employees.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Flexibility Deduction: Include any flexibility deductions.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Set Restrictions: Determine any restrictions on the CTC
                    basket and amount allocation to ensure compliance with
                    organizational policies.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTCTemplate;
