import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";

import UserDetailsList from "./UserDetailsList";
import { FaAngleRight, FaChevronDown, FaTrash } from "react-icons/fa";

const ThirdParty = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    // {
    //   name: "Leave Label",
    //   selector: (row) => row.Label,
    //   sortable: true,
    // },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) => <div className="text-red-400">{row.approval}</div>,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDetailsModal(true)}
            //   to={`/admin/edit-templates/${row.id}`}
          >
            <BsEye size={15} />
          </button>
          <button
            onClick={() => setShowModal1(true)}
            //   to={`/admin/edit-templates/${row.id}`}
          >
            <BiEdit size={15} />
          </button>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data = [
    {
      Name: "person 1",
      Email: "ABC@gmail.com",
      mobile: "994048473",
      gender: "Male",
      approval: "Pending",
      // State: "Maharashtra",
      // Country: "India",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState("General Info");
  const [aadhar, setAadhar] = useState("");
  const [basic, setBasic] = useState(2000);
  const [hra, setHra] = useState(2000);
  const [childEducation, setChildEducation] = useState(1000);
  const [special, setSpecial] = useState(5000);
  const total = basic + hra + childEducation + special;
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    let formattedValue =
      value
        .match(/.{1,4}/g)
        ?.join("-")
        .slice(0, 14) || "";
    setAadhar(formattedValue);
  };
  const [currentForm, setCurrentForm] = useState("userDetails");
  const [otpBtn, setOtpBtn] = useState(false);

  const handleNext = () => {
    setCurrentForm("salaryDetails");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentForm("userDetails");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="flex gap-1 ml-20">
      {/* <OrganisationSetting/>
     <UserDetailsList/> */}
      <UserDetailsList />
      <div className=" w-2/3 flex my-3 flex-col overflow-hidden">
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <button
            onClick={() => setShowModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-h-[90%] overflow-y-auto w-[60%] transition-transform duration-500 ease-in-out">
              <div
                className={`transform transition-transform duration-500 ${
                  currentForm === "salaryDetails"
                    ? "translate-x-[-1%]"
                    : "translate-x-[0]"
                }`}
              >
                {currentForm === "userDetails" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Add Third Party User
                    </h1>
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-2">
                        <label>Aadhaar Number</label>
                        <input
                          type="text"
                          id="aadharInput"
                          value={aadhar}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="border border-gray-300 p-2 w-60 rounded"
                          placeholder="xxxx-xxxx-xxxx"
                        />
                      </div>
                      <div>
                        {!otpBtn && (
                          <button
                            className="bg-green-500 p-2 px-3 rounded text-white"
                            onClick={() => setOtpBtn(!otpBtn)}
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                      {otpBtn && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="otpInput"
                            value=""
                            maxLength={6}
                            className="border border-gray-300 p-2 w-60 rounded"
                            placeholder="Enter OTP"
                          />
                          <button
                            className="bg-green-500 p-2 px-3 rounded text-white"
                            onClick={() => setOtpBtn(!otpBtn)}
                          >
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-2">
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Full Name :
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="border border-gray-300 p-2 w-full rounded "
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Email :
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="border border-gray-300 p-2 w-full rounded "
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Mobile No. :
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          className="border border-gray-300 p-2 rounded w-full"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="Enter Mobile No."
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Select Gender :
                        </label>
                        <select className="border border-gray-300 p-2 rounded w-full">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Permanent Address :
                      </label>
                      <textarea
                        name="permanentAddress"
                        cols="10"
                        rows="3"
                        className="border border-gray-300 p-2 mt-2 rounded w-full"
                        placeholder="Enter permanent address"
                      ></textarea>
                    </div>
                    <div className="mt-2">
                      <label className="block text-gray-700">
                        Temporary Address :
                      </label>
                      <textarea
                        name="temporaryAddress"
                        cols="10"
                        rows="3"
                        className="border border-gray-300 p-2 mt-2 rounded w-full"
                        placeholder="Enter temporary address"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentForm === "salaryDetails" && (
                  <div>
                    <div className=" w-full mt-2 p-2   rounded-md">
                      {/* <h2 className="text-2xl font-bold mb-6">Salary</h2> */}
                      <h2 className="text-2xl font-bold mb-6">Add New CTC</h2>

                      <div className=" w-full my-2 flex  overflow-hidden flex-col">
                        <div className="flex w-full">
                          <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
                            <h2
                              className={`p-1 ${
                                page === "General Info" &&
                                `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                              } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                              onClick={() => setPage("General Info")}
                            >
                              General Info
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "Tax and Statutory Setting" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() =>
                                setPage("Tax and Statutory Setting")
                              }
                            >
                              Tax and Statutory Setting
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "CTC Components" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() => setPage("CTC Components")}
                            >
                              CTC Components
                            </h2>
                          </div>
                        </div>
                      </div>
                      {page === "General Info" && (
                        <div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="effectiveDate"
                            >
                              Select Effective Date for Payroll Processing
                            </label>
                            <input
                              type="date"
                              id="effectiveDate"
                              //   value={effectiveDate}
                              //   onChange={handleEffectiveDateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Does the actual effective date of salary differ?
                            </label>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="yes"
                                name="effectiveDateDiffers"
                                value="yes"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                              />
                              <label htmlFor="yes" className="mr-4">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="no"
                                name="effectiveDateDiffers"
                                value="no"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                              />
                              <label htmlFor="no">No</label>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcAmount"
                            >
                              Enter CTC Amount frequency
                            </label>
                            <select
                              id="ctcTemplate"
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="" disabled>
                                Select CTC Amount frequency
                              </option>
                              <option value="template1">Monthly</option>
                              <option value="template2">Annualy</option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcTemplate"
                            >
                              Select CTC Template
                            </label>
                            <select
                              id="ctcTemplate"
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="" disabled>
                                Select Template
                              </option>
                              <option value="template1">Template 1</option>
                              <option value="template2">Template 2</option>
                              <option value="template3">Template 3</option>
                            </select>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Back
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                      {page === "Tax and Statutory Setting" && (
                        <div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Pension Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employee’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employer’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Fund Wage Amount
                            </label>
                            <input
                              type="number"
                              name="pfWageAmount"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for no amount"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Template
                            </label>
                            <input
                              type="text"
                              name="pfTemplate"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for default settings"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              ESIC Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PT Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              LWF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Income Tax Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              NPS Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className=" flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div>
                        </div>
                      )}
                      {page === "CTC Components" && (
                        <div>
                          <div className="flex justify-between items-center  px-10">
                            <h2 className=" font-semibold">Components</h2>
                            <p className=" font-semibold ">Monthly</p>
                            <p className=" font-semibold ">Yearly</p>
                          </div>
                          {/* <div className="flex justify-between items-center ml-10">
                            <h2 className="text-lg font-semibold">
                              Components
                            </h2>
                            <p className="text-lg font-semibold ">
                              &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                            </p>
                            <p className="text-lg font-semibold mr-24">
                            Yearly
                            </p>
                          </div> */}
                          <div className="flex flex-col gap-2 p-1">
                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Fixed Allowance
                                </h2>
                                <p className="text-lg font-semibold ml-28 pl-24">
                                  ₹{total}
                                </p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹{total * 12}
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  {isOpen ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Basic
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      value={basic}
                                      onChange={(e) =>
                                        setBasic(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{basic * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for HRA
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      value={hra}
                                      onChange={(e) =>
                                        setHra(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{hra * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Child Education
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 mr-14 rounded-md"
                                      value={childEducation}
                                      onChange={(e) =>
                                        setChildEducation(
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <p>{childEducation * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Special
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 rounded-md"
                                      value={special}
                                      onChange={(e) =>
                                        setSpecial(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{special * 12}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Contributions
                                </h2>
                                <p className="text-lg font-semibold ">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen1(!isOpen1)}
                                >
                                  {isOpen1 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen1 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p>0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Deductions
                                </h2>
                                <p className="text-lg font-semibold ml-4">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen2(!isOpen2)}
                                >
                                  {isOpen2 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen2 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-5">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer PT Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p className="ml-2">0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-5 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                              Consolidated output
                            </h2>
                            <p className="text-lg font-semibold ml-20">
                              &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                            </p>
                            <p className="text-lg font-semibold  pr-48">
                              Yearly
                            </p>
                          </div>
                          <div className="w-3/4">
                            <div className="mt-5  flex justify-between">
                              <p className="text-gray-600">
                                Total Take Home (excluding Variable)
                              </p>
                              <p className="ml-10">₹5000</p>
                              <p>₹{5000 * 12}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (excluding Variable & Other Benefits)
                              </p>
                              <p className="mr-6">₹5000</p>
                              <p>₹60000</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (including Variable)
                              </p>
                              <p className="ml-24">₹4562</p>
                              <p>₹{4562 * 12}</p>
                            </div>
                          </div>
                          {/* <div className="mt-10 flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-md"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={() => setShowModal(false)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showModal1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-h-[90%] overflow-y-auto w-[60%] transition-transform duration-500 ease-in-out">
              <div
                className={`transform transition-transform duration-500 ${
                  currentForm === "salaryDetails"
                    ? "translate-x-[-1%]"
                    : "translate-x-[0]"
                }`}
              >
                {currentForm === "userDetails" && (
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Edit Third Party User
                    </h1>
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-2">
                        <label>Aadhaar Number</label>
                        <input
                          type="text"
                          id="aadharInput"
                          value={aadhar}
                          onChange={handleInputChange}
                          maxLength={14}
                          className="border border-gray-300 p-2 w-60 rounded"
                          placeholder="xxxx-xxxx-xxxx"
                        />
                      </div>
                      <div>
                        {!otpBtn && (
                          <button
                            className="bg-green-500 p-2 px-3 rounded text-white"
                            onClick={() => setOtpBtn(!otpBtn)}
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                      {otpBtn && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="otpInput"
                            value=""
                            maxLength={6}
                            className="border border-gray-300 p-2 w-60 rounded"
                            placeholder="Enter OTP"
                          />
                          <button
                            className="bg-green-500 p-2 px-3 rounded text-white"
                            onClick={() => setOtpBtn(!otpBtn)}
                          >
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-2">
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Full Name :
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="border border-gray-300 p-2 w-full rounded "
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Email :
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="border border-gray-300 p-2 w-full rounded "
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Mobile No. :
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          className="border border-gray-300 p-2 rounded w-full"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="Enter Mobile No."
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label className="block text-gray-700 font-medium">
                          Select Gender :
                        </label>
                        <select className="border border-gray-300 p-2 rounded w-full">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Permanent Address :
                      </label>
                      <textarea
                        name="permanentAddress"
                        cols="10"
                        rows="3"
                        className="border border-gray-300 p-2 mt-2 rounded w-full"
                        placeholder="Enter permanent address"
                      ></textarea>
                    </div>
                    <div className="mt-2">
                      <label className="block text-gray-700">
                        Temporary Address :
                      </label>
                      <textarea
                        name="temporaryAddress"
                        cols="10"
                        rows="3"
                        className="border border-gray-300 p-2 mt-2 rounded w-full"
                        placeholder="Enter temporary address"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentForm === "salaryDetails" && (
                  <div>
                    <div className=" w-full mt-2 p-2   rounded-md">
                      {/* <h2 className="text-2xl font-bold mb-6">Salary</h2> */}
                      <h2 className="text-2xl font-bold mb-6">Add New CTC</h2>
                      <div className=" w-full my-2 flex  overflow-hidden flex-col">
                        <div className="flex w-full">
                          <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
                            <h2
                              className={`p-1 ${
                                page === "General Info" &&
                                `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                              } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                              onClick={() => setPage("General Info")}
                            >
                              General Info
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "Tax and Statutory Setting" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() =>
                                setPage("Tax and Statutory Setting")
                              }
                            >
                              Tax and Statutory Setting
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "CTC Components" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() => setPage("CTC Components")}
                            >
                              CTC Components
                            </h2>
                          </div>
                        </div>
                      </div>
                      {page === "General Info" && (
                        <div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="effectiveDate"
                            >
                              Select Effective Date for Payroll Processing
                            </label>
                            <input
                              type="date"
                              id="effectiveDate"
                              //   value={effectiveDate}
                              //   onChange={handleEffectiveDateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Does the actual effective date of salary differ?
                            </label>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="yes"
                                name="effectiveDateDiffers"
                                value="yes"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                              />
                              <label htmlFor="yes" className="mr-4">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="no"
                                name="effectiveDateDiffers"
                                value="no"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                              />
                              <label htmlFor="no">No</label>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcAmount"
                            >
                              Enter CTC Amount frequency
                            </label>
                            <select
                              id="ctcTemplate"
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="" disabled>
                                Select CTC Amount frequency
                              </option>
                              <option value="template1">Monthly</option>
                              <option value="template2">Annualy</option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcTemplate"
                            >
                              Select CTC Template
                            </label>
                            <select
                              id="ctcTemplate"
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="" disabled>
                                Select Template
                              </option>
                              <option value="template1">Template 1</option>
                              <option value="template2">Template 2</option>
                              <option value="template3">Template 3</option>
                            </select>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Back
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                      {page === "Tax and Statutory Setting" && (
                        <div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Pension Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employee’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employer’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Fund Wage Amount
                            </label>
                            <input
                              type="number"
                              name="pfWageAmount"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for no amount"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Template
                            </label>
                            <input
                              type="text"
                              name="pfTemplate"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for default settings"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              ESIC Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PT Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              LWF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Income Tax Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              NPS Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="No"
                                  className="form-radio"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className=" flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div>
                        </div>
                      )}
                      {page === "CTC Components" && (
                        <div>
                          <div className="flex justify-between items-center px-10">
                            <h2 className=" font-semibold">Components</h2>
                            <p className=" font-semibold ">Monthly</p>
                            <p className=" font-semibold ">Yearly</p>
                          </div>
                         
                          <div className="flex flex-col gap-2 p-1">
                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Fixed Allowance
                                </h2>
                                <p className="text-lg font-semibold ml-28 pl-24">
                                  ₹{total}
                                </p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹{total * 12}
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  {isOpen ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Basic
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      value={basic}
                                      onChange={(e) =>
                                        setBasic(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{basic * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for HRA
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      value={hra}
                                      onChange={(e) =>
                                        setHra(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{hra * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Child Education
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 mr-14 rounded-md"
                                      value={childEducation}
                                      onChange={(e) =>
                                        setChildEducation(
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <p>{childEducation * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Special
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 rounded-md"
                                      value={special}
                                      onChange={(e) =>
                                        setSpecial(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{special * 12}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Contributions
                                </h2>
                                <p className="text-lg font-semibold ">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen1(!isOpen1)}
                                >
                                  {isOpen1 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen1 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p>0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Deductions
                                </h2>
                                <p className="text-lg font-semibold ml-4">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen2(!isOpen2)}
                                >
                                  {isOpen2 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen2 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-5">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer PT Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p className="ml-2">0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-5 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                              Consolidated output
                            </h2>
                            <p className="text-lg font-semibold ml-20">
                              &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                            </p>
                            <p className="text-lg font-semibold  pr-48">
                              Yearly
                            </p>
                          </div>
                          <div className="w-3/4">
                            <div className="mt-5  flex justify-between">
                              <p className="text-gray-600">
                                Total Take Home (excluding Variable)
                              </p>
                              <p className="ml-10">₹5000</p>
                              <p>₹{5000 * 12}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (excluding Variable & Other Benefits)
                              </p>
                              <p className="mr-6">₹5000</p>
                              <p>₹60000</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (including Variable)
                              </p>
                              <p className="ml-24">₹4562</p>
                              <p>₹{4562 * 12}</p>
                            </div>
                          </div>
                          {/* <div className="mt-10 flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <div>
                        <button
                          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-md"
                          onClick={handleBack}
                        >
                          Back
                        </button>
                        <button
                          className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                          onClick={() => setShowModal1(false)}
                        >
                          Submit
                        </button>
                        <button
                          className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                          onClick={() => setShowModal1(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showDetailsModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-h-[90%] overflow-y-auto w-[60%] transition-transform duration-500 ease-in-out">
              <div
                className={`transform transition-transform duration-500 ${
                  currentForm === "salaryDetails"
                    ? "translate-x-[-1%]"
                    : "translate-x-[0]"
                }`}
              >
                {currentForm === "userDetails" && (
                  <div>
                    <div className="bg-gray-200  p-2 px-4 rounded-md flex justify-between">
                      <div className=" flex gap-2 items-center">
                        <h2 className="font-medium">HR Approval :</h2>
                        <p className="bg-red-400 text-white p-1 px-4 rounded-full">
                          Pending
                        </p>
                      </div>
                      <h2 className="font-medium">Created on : 28/08/2024</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3">
                      <div className="grid grid-cols-2">
                        <p className="block text-gray-700 font-medium">
                          Full Name :
                        </p>
                        <p className="block text-gray-700 font-medium">ABC</p>
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="block text-gray-700 font-medium">
                          Email :
                        </p>
                        <p className="block text-gray-700 font-medium">
                          ABC@example.com
                        </p>
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="block text-gray-700 font-medium">
                          Mobile No. :
                        </p>
                        <p className="block text-gray-700 font-medium">
                          09930337986
                        </p>
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="block text-gray-700 font-medium">
                          gender :
                        </p>
                        <p className="block text-gray-700 font-medium">Male</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Permanent Address :
                      </label>
                      <p className="border border-gray-300 bg-gray-100 p-2 mt-2 rounded w-full text-sm">
                        314, SAMRUDDHI BUSINESS PARK BEHIND EVERSHINE MALL, New
                        Link Rd, Chincholi Bunder, Malad West, Mumbai,
                        Maharashtra 400064
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Temporary Address :
                      </label>
                      <p className="border border-gray-300 bg-gray-100 p-2 mt-2 rounded w-full text-sm">
                        314, SAMRUDDHI BUSINESS PARK BEHIND EVERSHINE MALL, New
                        Link Rd, Chincholi Bunder, Malad West, Mumbai,
                        Maharashtra 400064
                      </p>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={() => setShowDetailsModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentForm === "salaryDetails" && (
                  <div>
                    <div className=" w-full mt-2 p-2   rounded-md">
                      {/* <h2 className="text-2xl font-bold mb-6">Salary</h2> */}
                      <h2 className="text-2xl font-bold mb-6">Add New CTC</h2>

                      <div className=" w-full my-2 flex  overflow-hidden flex-col">
                        <div className="flex w-full">
                          <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
                            <h2
                              className={`p-1 ${
                                page === "General Info" &&
                                `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                              } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                              onClick={() => setPage("General Info")}
                            >
                              General Info
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "Tax and Statutory Setting" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() =>
                                setPage("Tax and Statutory Setting")
                              }
                            >
                              Tax and Statutory Setting
                            </h2>
                            <h2
                              className={`p-1 ${
                                page === "CTC Components" &&
                                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                              onClick={() => setPage("CTC Components")}
                            >
                              CTC Components
                            </h2>
                          </div>
                        </div>
                      </div>
                      {page === "General Info" && (
                        <div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="effectiveDate"
                            >
                              Select Effective Date for Payroll Processing
                            </label>
                            <input
                              type="date"
                              id="effectiveDate"
                              //   value={effectiveDate}
                              //   onChange={handleEffectiveDateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              disabled
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Does the actual effective date of salary differ?
                            </label>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="yes"
                                name="effectiveDateDiffers"
                                value="yes"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                                disabled
                              />
                              <label htmlFor="yes" className="mr-4">
                                Yes
                              </label>
                              <input
                                type="radio"
                                id="no"
                                name="effectiveDateDiffers"
                                value="no"
                                // onChange={handleEffectiveDateDiffersChange}
                                className="mr-2"
                                disabled
                              />
                              <label htmlFor="no">No</label>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcAmount"
                            >
                              Enter CTC Amount frequency
                            </label>
                            <select
                              id="ctcTemplate"
                              disabled
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="">
                                Select CTC Amount frequency
                              </option>
                              <option value="template1">Monthly</option>
                              <option value="template2">Annualy</option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="ctcTemplate"
                            >
                              Select CTC Template
                            </label>
                            <select
                              id="ctcTemplate"
                              //   value={ctcTemplate}
                              //   onChange={handleCtcTemplateChange}
                              disabled
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                              <option value="" disabled>
                                Select Template
                              </option>
                              <option value="template1">Template 1</option>
                              <option value="template2">Template 2</option>
                              <option value="template3">Template 3</option>
                            </select>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                      {page === "Tax and Statutory Setting" && (
                        <div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="pfDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Pension Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="providentPensionDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employee’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employeePfCapped"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Employer’s PF contribution capped at the PF
                              Ceiling?
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="Yes"
                                  className="form-radio"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="employerPfCapped"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Provident Fund Wage Amount
                            </label>
                            <input
                              type="number"
                              name="pfWageAmount"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for no amount"
                              disabled
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PF Template
                            </label>
                            <input
                              type="text"
                              name="pfTemplate"
                              className="w-full mt-2 p-2 border border-gray-300 rounded"
                              placeholder="Leave blank for default settings"
                              disabled
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              ESIC Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="esicDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              PT Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="ptDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              LWF Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="lwfDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              Income Tax Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="incomeTaxDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">
                              NPS Deduction
                            </label>
                            <div className="mt-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="Yes"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="inline-flex items-center ml-6">
                                <input
                                  type="radio"
                                  name="npsDeduction"
                                  value="No"
                                  className="form-radio"
                                  disabled
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {/* <div className=" flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div> */}
                        </div>
                      )}
                      {page === "CTC Components" && (
                        <div>
                          <div className="flex justify-between items-center  px-10">
                            <h2 className=" font-semibold">Components</h2>
                            <p className=" font-semibold ">Monthly</p>
                            <p className=" font-semibold ">Yearly</p>
                          </div>
                          {/* <div className="flex justify-between items-center ml-10">
                            <h2 className="text-lg font-semibold">
                              Components
                            </h2>
                            <p className="text-lg font-semibold ">
                              &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                            </p>
                            <p className="text-lg font-semibold mr-24">
                            Yearly
                            </p>
                          </div> */}
                          <div className="flex flex-col gap-2 p-1">
                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Fixed Allowance
                                </h2>
                                <p className="text-lg font-semibold ml-28 pl-24">
                                  ₹{total}
                                </p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹{total * 12}
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  {isOpen ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Basic
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      value={basic}
                                      disabled
                                      onChange={(e) =>
                                        setBasic(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{basic * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for HRA
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 ml-4 p-2 rounded-md"
                                      disabled
                                      value={hra}
                                      onChange={(e) =>
                                        setHra(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{hra * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Child Education
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 mr-14 rounded-md"
                                      disabled
                                      value={childEducation}
                                      onChange={(e) =>
                                        setChildEducation(
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <p>{childEducation * 12}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Enter the Amount for Special
                                    </label>
                                    <input
                                      type="number"
                                      className="border w-20 border-gray-400 p-2 rounded-md"
                                      disabled
                                      value={special}
                                      onChange={(e) =>
                                        setSpecial(parseInt(e.target.value))
                                      }
                                    />
                                    <p>{special * 12}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Contributions
                                </h2>
                                <p className="text-lg font-semibold ">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen1(!isOpen1)}
                                >
                                  {isOpen1 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen1 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p>0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-6 bg-white shadow-custom-all-sides rounded-md">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                  Total Employer Statutory Deductions
                                </h2>
                                <p className="text-lg font-semibold ml-4">₹0</p>
                                <p className="text-lg font-semibold ml-28">
                                  ₹0
                                </p>
                                <button
                                  className="ml-4 text-blue-500 focus:outline-none"
                                  onClick={() => setIsOpen2(!isOpen2)}
                                >
                                  {isOpen2 ? (
                                    <FaChevronDown />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </button>
                              </div>
                              {isOpen2 && (
                                <div className="mt-4 space-y-4 w-4/5">
                                  <hr />
                                  <div className="flex justify-between">
                                    <label className="text-gray-600 ">
                                      Employer PF Contribution
                                    </label>
                                    <p className="ml-5">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer ESIC Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer LWF Contribution
                                    </label>
                                    <p className="ml-1">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer PT Contribution
                                    </label>
                                    <p className="ml-4">0</p>
                                    <p>0</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-600">
                                      Employer NPS Contribution
                                    </label>
                                    <p className="ml-2">0</p>
                                    <p>0</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-5 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                              Consolidated output
                            </h2>
                            <p className="text-lg font-semibold ml-20">
                              &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                            </p>
                            <p className="text-lg font-semibold  pr-48">
                              Yearly
                            </p>
                          </div>
                          <div className="w-3/4">
                            <div className="mt-5  flex justify-between">
                              <p className="text-gray-600">
                                Total Take Home (excluding Variable)
                              </p>
                              <p className="ml-10">₹5000</p>
                              <p>₹{5000 * 12}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (excluding Variable & Other Benefits)
                              </p>
                              <p className="mr-6">₹5000</p>
                              <p>₹60000</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-gray-600">
                                Total CTC (including Variable)
                              </p>
                              <p className="ml-24">₹4562</p>
                              <p>₹{4562 * 12}</p>
                            </div>
                          </div>
                          {/* <div className="mt-10 flex justify-center gap-2">
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Cancel
                            </button>
                            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
                              Save & Proceed
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <div>
                        <button
                          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-md"
                          onClick={handleBack}
                        >
                          Back
                        </button>
                        {/* <button
                          className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                          onClick={() => setShowDetailsModal(false)}
                        >
                          Submit
                        </button> */}
                        <button
                          className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                          onClick={() => setShowDetailsModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className="my-4 ml-1 w-fit">
        <div className="flex flex-col mt-4 mr-1  bg-gray-100 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
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
                    You can add administrators and manage admin access rights
                    like IP restrictions, 2-factor authentication, etc{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also restrict access permission based on
                    departments, locations, etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can add and manage third party users and invite them to
                    join login to the My Citi Life HRMS software. For e.g.,
                    External auditor, external consultants, etc.{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                  You can view/edit/delete admin permissions at any time.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdParty;
