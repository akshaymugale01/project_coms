import React, { useState, useRef, useEffect } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { PiPlusCircle } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import AddNewCTC from "./AddNewCTC";
import { getEmployeeSalaryDetails } from "../../api";
import { useSelector } from "react-redux";
const SectionSalary = () => {
  const [isopen, setisopen] = useState(false);
  const [page, setPage] = useState("table");
  const [isTaxSettingsVisible, setTaxSettingsVisible] = useState(false);
  const [isCTCComponentsVisible, setCTCComponentsVisible] = useState(false);
  const [isEmployerContributionsVisible, setEmployerContributionsVisible] =
    useState(false);
  const [isEmployeeDeductionsVisible, setEmployeeDeductionsVisible] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const column = [
  //   { name: "Sr. No.", selector: (row, index) => index + 1, sortable: true },
  //   {
  //     name: "CTC Effective From",
  //     selector: (row) => row.effective_date,
  //     sortable: true,
  //   },
  //   { name: "CTC Effective To", selector: (row) => row.to, sortable: true },
  //   {
  //     name: "Monthly Gross",
  //     selector: (row) => row.monthly_gross_amount && row.monthly_gross_amount,
  //     sortable: true,
  //   },
  //   {
  //     name: "Monthly CTC",
  //     selector: (row) => row.monthly_ctc_amount && row.monthly_ctc_amount,
  //     sortable: true,
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <div className="flex items-center gap-4">
  //         <button onClick={() => setisopen(true)}>
  //           <BsEye size={15} />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const [columns, setColumns] = useState([]);

  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
    const hasMonthlyGross = salaries?.some((row) => row.monthly_gross_amount);
    const hasMonthlyCTC = salaries?.some((row) => row.monthly_ctc_amount);
    const hasAnnuallyCTC = salaries?.some((row) => row.annually_ctc_amount);
    const hasAnnuallyGross = salaries?.some((row) => row.annually_gross_amount);
    console.log(hasMonthlyGross);
    console.log(hasMonthlyCTC);
    console.log(hasAnnuallyCTC);
    console.log(hasAnnuallyGross);
    const dynamicColumns = [
      { name: "Sr. No.", selector: (row, index) => index + 1, sortable: true },
      {
        name: "CTC Effective From",
        selector: (row) => row.effective_date,
        sortable: true,
      },
      {
        name: "CTC Effective To",
        selector: (row) => row.to,
        sortable: true,
      },
      ...(hasMonthlyGross
        ? [
            {
              name: "Monthly Gross",
              selector: (row) => row.monthly_gross_amount,
              sortable: true,
            },
          ]
        : []),
      ...(hasMonthlyCTC
        ? [
            {
              name: "Monthly CTC",
              selector: (row) => row.monthly_ctc_amount,
              sortable: true,
            },
          ]
        : []),
      ...(hasAnnuallyCTC
        ? [
            {
              name: "Annually CTC",
              selector: (row) => row.annually_ctc_amount,
              sortable: true,
            },
          ]
        : []),
      ...(hasAnnuallyGross
        ? [
            {
              name: "Annually Gross",
              selector: (row) => row.annually_gross_amount,
              sortable: true,
            },
          ]
        : []),

      {
        name: "Action",
        cell: (row) => (
          <div className="flex items-center gap-4">
            <button onClick={() => setisopen(true)}>
              <BsEye size={15} />
            </button>
          </div>
        ),
      },
    ];

    setColumns(dynamicColumns);
  }, [salaries]);
  const { id } = useParams();
  const fetchEmployeeSalary = async () => {
    try {
      const res = await getEmployeeSalaryDetails(id);
      setSalaries(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployeeSalary();
  }, []);
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />

      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>
        {page === "table" && (
          <div className=" w-full mt-5 p-5  rounded-md">
            {/* <Collapsible
              readOnly
              trigger={
                <CustomTrigger isOpen={isOpen}>
                  <h2 className="text-xl font-medium ">Salary Information</h2>
                </CustomTrigger>
              }
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              className="bg-gray-100 my-4 p-2 rounded-md font-bold "
            > */}
              <div className="flex justify-end mb-1">
                <button
                  onClick={() => setPage("add")}
                  style={{background: themeColor}}
                  className="border-2 font-semibold hover:bg-black text-white duration-150 transition-all p-2 rounded-md  cursor-pointer text-center flex items-center  gap-2 justify-center"
                >
                  <PiPlusCircle size={20} />
                  Add New CTC
                </button>
              </div>
              <Table columns={columns} data={salaries} isPagination={true} />
            {/* </Collapsible> */}
          </div>
        )}
        {page === "add" && <AddNewCTC setPageChange={setPage} empId={id} fetchEmployeeSalary={fetchEmployeeSalary} />}
        {isopen && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-2/4 max-h-screen overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">CTC Structures Details</h2>
              <div className="mb-4">
                <p>
                  <strong>Payroll Effective Date:</strong> 01-04-2023
                </p>
                <p>
                  <strong>Actual Effective Date:</strong> 01-04-2023
                </p>
                <p>
                  <strong>Auto Salary Revision Arrears Required?</strong> No
                </p>
                <p>
                  <strong>Selected CTC Template:</strong> Enter Manually
                </p>
                <p>
                  <strong>Entered CTC Amount:</strong> 0
                </p>
              </div>
              <div className="mb-4">
                <p
                  className="cursor-pointer"
                  onClick={() => setTaxSettingsVisible(!isTaxSettingsVisible)}
                >
                  Tax and Statutory Settings {isTaxSettingsVisible ? "-" : "+"}
                </p>
                {isTaxSettingsVisible && (
                  <div className="ml-4">
                    <p>
                      <strong>PF Deduction:</strong> No
                    </p>
                    <p>
                      <strong>Provident Pension Deduction:</strong> No
                    </p>
                    <p>
                      <strong>
                        Employee's Provident Fund contribution capped at the PF
                        Ceiling?
                      </strong>{" "}
                      No
                    </p>
                    <p>
                      <strong>
                        Employer's Provident Fund contribution capped at the PF
                        Ceiling?
                      </strong>{" "}
                      No
                    </p>
                    <p>
                      <strong>PF Wage:</strong> 0
                    </p>
                    <p>
                      <strong>ESIC Deduction:</strong> No
                    </p>
                    <p>
                      <strong>PT Deduction:</strong> Yes
                    </p>
                    <p>
                      <strong>LWF Deduction:</strong> No
                    </p>
                    <p>
                      <strong>Income Tax Deduction:</strong> No
                    </p>
                    <p>
                      <strong>NPS Deduction:</strong> No
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-between">
                  <p>CTC Components</p>
                  <p>Monthly</p>
                  <p>Yearly</p>
                </div>
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    setCTCComponentsVisible(!isCTCComponentsVisible)
                  }
                >
                  Fixed Allowances Details{isCTCComponentsVisible ? "-" : "+"}
                </p>
                {isCTCComponentsVisible && (
                  <div className="ml-4">
                    <div className="mt-4 space-y-4 w-4/5">
                      <hr />
                      <div className="flex justify-between">
                        <label className="text-gray-600">Basic</label>

                        <p className="ml-20">12000</p>
                        <p>{12000 * 12}</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">HRA</label>
                        <p className="ml-20">2000</p>
                        <p>{2000 * 12}</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">Child Education</label>
                        <p>2000</p>
                        <p>{2000 * 12}</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">Special</label>
                        <p className="ml-16">2555</p>
                        <p>{5222 * 12}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    setEmployerContributionsVisible(
                      !isEmployerContributionsVisible
                    )
                  }
                >
                  Total Employer Statutory Contributions{" "}
                  {isEmployerContributionsVisible ? "-" : "+"}
                </p>
                {isEmployerContributionsVisible && (
                  <div className="ml-4">
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
                  </div>
                )}
              </div>
              <div className="mb-4">
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    setEmployeeDeductionsVisible(!isEmployeeDeductionsVisible)
                  }
                >
                  Total Employee Statutory Deductions{" "}
                  {isEmployeeDeductionsVisible ? "-" : "+"}
                </p>
                {isEmployeeDeductionsVisible && (
                  <div className="ml-4">
                    <div className="mt-4 space-y-4 w-4/5">
                      <hr />
                      <div className="flex justify-between">
                        <label className="text-gray-600 ">
                          Employee PF Contribution
                        </label>
                        <p className="ml-4">0</p>
                        <p>0</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">
                          Employee ESIC Contribution
                        </label>
                        <p className="ml-1">0</p>
                        <p>0</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">
                          Employee LWF Contribution
                        </label>
                        <p className="">0</p>
                        <p>0</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">
                          Employee PT Deduction
                        </label>
                        <p className="">0</p>
                        <p>0</p>
                      </div>
                      <div className="flex justify-between">
                        <label className="text-gray-600">
                          Employee NPS Deduction
                        </label>
                        <p>0</p>
                        <p>0</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="mt-5 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Consolidated output</h2>
                  <p className="text-lg font-semibold ml-20">
                    &nbsp;&nbsp;&nbsp;&nbsp;Monthly
                  </p>
                  <p className="text-lg font-semibold  pr-48">Yearly</p>
                </div>
                <div className="w-3/4">
                  <div className="mt-5  flex justify-between">
                    <p className="text-gray-600">
                      Total Take Home (excluding Variable)
                    </p>
                    <p className="ml-10">₹10000</p>
                    <p>₹10000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">
                      Total CTC (excluding Variable & Other Benefits)
                    </p>
                    <p className="mr-6">₹200000</p>
                    <p>₹200000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">
                      Total CTC (including Variable)
                    </p>
                    <p className="ml-24">₹5555</p>
                    <p>₹44555</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setisopen(false)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSalary;
