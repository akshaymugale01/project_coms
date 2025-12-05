import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getVariableDeduction, postVariableDeduction } from "../../api";

const VariableDeduction = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deductionLabel, setDeductionLabel] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [effectivePeriod, setEffectivePeriod] = useState("");
  const [applicableTo, setApplicableTo] = useState("All");
  const [formData, setFormData] = useState({
    showCTC: false,
    hasEndingPeriod: "",
    enterAmount: "",
    appliesTo: "",
    headName: "",
    affectPF: false,
    affectESIC: false,
    affectLWF: false,
    affectPT: false,
    affectIT: false,
    incomeTaxDeductionMethod: "",
    auto_process_in_payroll: false,
    paymentFrequency: "",
    effectivePeriodStart: "",
    hasEndPeriod: false,
    manualEntry: true,
    applicableTo: "",
    autoProcess: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const columns = [
    {
      name: "Deduction Name",
      selector: (row) => row.head_name,
      sortable: true,
    },
    {
      name: "Frequency",
      selector: (row) => row.payment_frequency,
      sortable: true,
    },
    {
      name: "Applies To",
      selector: (row) => row.applicable_to,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <div className="flex items-center gap-4"></div>,
    },
  ];

  const [filteredDeductions, setFilteredDeductions] = useState([]);
  const [Deductions, setDeductions] = useState([]);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const fetchVariableDeduction = async () => {
    try {
      const res = await getVariableDeduction(hrmsOrgId);
      setFilteredDeductions(res);
      setDeductions(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVariableDeduction();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    closeModal();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleAddVariableDeduction = async () => {
    const postData = new FormData();
    postData.append("head_name", formData.headName);
    postData.append("in_ctc_structure", formData.showCTC);
    postData.append("auto_process_in_payroll", formData.autoProcess);
    postData.append("payment_frequency", formData.paymentFrequency);
    postData.append("effective_period_start", formData.effectivePeriodStart);
    postData.append("has_end_period", formData.hasEndingPeriod);
    postData.append("manual_entry", formData.manualEntry);
    postData.append("applicable_to", formData.applicableTo);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postVariableDeduction(postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-2 gap-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 placeholder:text-sm rounded-md w-full p-2"
          />
          <button
            onClick={openModal}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table
          columns={columns}
          data={filteredDeductions}
          isPagination={true}
        />
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
          <div class="max-h-screen h-80vh bg-white p-8 w-2/3 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Add New Variable Deduction
            </h2>
            <div onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="deductionLabel"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Label of Variable Deduction
                  </label>
                  <input
                    type="text"
                    id="deductionLabel"
                    value={deductionLabel}
                    onChange={(e) => setDeductionLabel(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter deduction label"
                    required
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label className="block font-semibold">
                    Does this variable deduction show up in CTC structure?
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="showCTC"
                      checked={formData.showCTC === true}
                      onChange={() =>
                        setFormData({ ...formData, showCTC: true })
                      }
                      className="mr-2"
                    />
                    Yes
                    <input
                      type="radio"
                      name="showCTC"
                      checked={formData.showCTC === false}
                      onChange={() =>
                        setFormData({ ...formData, showCTC: false })
                      }
                      className="ml-4 mr-2"
                    />
                    No
                  </div>
                </div>
                {formData.showCTC && (
                  <div className="grid gap-2 items-center w-full">
                    <label className="block font-semibold">
                      Do you want to automatically process this variable amount
                      in the payroll process?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="autoProcess"
                        checked={formData.autoProcess === true}
                        onChange={() =>
                          setFormData({ ...formData, autoProcess: true })
                        }
                        className="mr-2"
                      />
                      Yes
                      <input
                        type="radio"
                        name="autoProcess"
                        checked={formData.autoProcess === false}
                        onChange={() =>
                          setFormData({ ...formData, autoProcess: false })
                        }
                        className="ml-4 mr-2"
                      />
                      No
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="frequency"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    How frequently does employee pay this deduction?
                  </label>
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Monthly">Bi-Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="effectivePeriod"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    From what period is this deduction effective?
                  </label>
                  <input
                    type="month"
                    id="effectivePeriod"
                    value={effectivePeriod}
                    onChange={(e) => setEffectivePeriod(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter effective period"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="hasEndingPeriod"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Does this deduction have an ending period?
                  </label>
                  <select
                    className="border border-gray-400 rounded p-2 w-full"
                    value={formData.hasEndingPeriod}
                    onChange={handleChange}
                    name="hasEndingPeriod"
                  >
                    <option value="No">No. It is Continual</option>
                    <option value="Yes">Yes. It has an End Period</option>
                  </select>
                </div>
                {formData.hasEndingPeriod === "Yes" && (
                  <div className="grid gap-2 items-center col-span-1">
                    <label className="block font-semibold">
                      From when do you wish to stop applying this variable
                      allowance?
                    </label>
                    <input
                      type="month"
                      name=""
                      id=""
                      className="border border-gray-400 rounded p-2"
                    />
                  </div>
                )}
                <div className="grid gap-2 items-center col-span-1">
                  <label className="block font-semibold">
                    How would you like to enter the amount for this variable
                    allowance?
                  </label>
                  <select
                    className="border border-gray-400 rounded p-2 w-full"
                    value={formData.enterAmount}
                    onChange={handleChange}
                    name="enterAmount"
                  >
                    <option value="manually">
                      Manually, at the time of running payroll
                    </option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="percent-basic-da">
                      Percentage of (Basic + DA) paid (or Basic if DA is not
                      applicable)
                    </option>
                    <option value="percent-gross">
                      Percentage of gross salary paid
                    </option>
                  </select>
                </div>
                {formData.enterAmount === "fixed" && (
                  <div className="grid gap-2 items-center col-span-1">
                    <label className="block font-semibold">
                      Provide the Amount
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border border-gray-400 rounded p-2 w-full"
                      placeholder="Enter amount"
                    />
                  </div>
                )}
                {formData.enterAmount === "percent-basic-da" && (
                  <div className="grid gap-2 items-center col-span-1">
                    <label className="block font-semibold">
                      Provide the Percentage
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      className="border border-gray-400 rounded p-2 w-full"
                      placeholder="Enter percentage"
                    />
                  </div>
                )}
                {formData.enterAmount === "percent-gross" && (
                  <div className="grid gap-2 items-center col-span-1">
                    <label className="block font-semibold">
                      Provide the Percentage
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      className="border border-gray-400 rounded p-2 w-full"
                      placeholder="Enter percentage"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="applicableTo"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Which employees does this deduction apply to?
                  </label>
                  <select
                    id="applicableTo"
                    value={applicableTo}
                    onChange={(e) => setApplicableTo(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="All">All the Employees</option>
                    <option value="Some">Some Employees</option>
                    <option value="Specific">Specific Employees</option>
                    {/* Add other options as needed */}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold p-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                    You can create any kind of the deduction, these deduction
                    generally not fixed and value also vary.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Some of deductions like Advance Recovery, Penalty, and Other
                    Recovery etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>These can also be mapped to the employee CTC. </li>
                </ul>
              </li>

              {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
You can deductions too can be mapped to the employee CTC details and CTC calculator             </p>
                </li> */}
              <li>
                <p>
                  {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                  You can change allowances setting anytime but once payroll is
                  processed won’t be deleted.{" "}
                </p>
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

export default VariableDeduction;
