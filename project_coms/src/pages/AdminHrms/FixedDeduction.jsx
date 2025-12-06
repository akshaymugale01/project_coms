import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  deleteFixedDeductions,
  getFixedAllowance,
  getFixedDeductions,
  postFixedDeductions,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { MdClose } from "react-icons/md";
import { FaCheck, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import EditFixedDeductionModal from "./Modals/EditFixedDeductionModal";

const FixedDeduction = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [effectAttendance, setEffectAttendance] = useState(false);
  const columns = [
    {
      name: "Custom Label",
      selector: (row) => row.custom_label,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            className="text-blue-400"
            onClick={() => handleEditModal(row.id)}
          >
            <BiEdit size={18} />{" "}
          </button>
          <button
            className="text-red-400"
            onClick={() => handleDeleteFixedAllowance(row.id)}
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];
  const [EditId, setEditId] = useState("");
  const handleEditModal = (id) => {
    setIsEditModal(true);
    setEditId(id);
  };

  const handleDeleteFixedAllowance = async (FDId) => {
    try {
      await deleteFixedDeductions(FDId);
      fetchFixedDeduction();
      toast.success("Fixed Deduction deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [deductions, setDeduction] = useState([]);
  const [filteredDeductions, setFilteredDeduction] = useState([]);
  const fetchFixedDeduction = async () => {
    try {
      const res = await getFixedDeductions(hrmsOrgId);
      setDeduction(res);
      setFilteredDeduction(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFixedDeduction();
  }, []);
  const handleAddFixedDeduction = async () => {
    if (!customLabel) {
      return toast.error("Please provide custom label");
    }

    const postData = new FormData();
    postData.append("custom_label", customLabel);
    postData.append("attendance_affects_eligibility", effectAttendance);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postFixedDeductions(postData);
      fetchFixedDeduction();
      setModalIsOpen(false);
      toast.success("Deduction added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error creating deduction");
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
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
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
          <div className="max-h-screen h-30 bg-white p-2 w-[30rem] px-3 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Deduction</h2>
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  What would you want to call this deduction?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Custom label"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Do you want attendance to effect the eligibility?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="affectAttendance"
                      id="yes"
                      checked={effectAttendance}
                      onChange={() => setEffectAttendance(true)}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="affectAttendance"
                      id="no"
                      checked={!effectAttendance}
                      onChange={() => setEffectAttendance(false)}
                    />
                    <label htmlFor="yes">No</label>
                  </div>
                </div>
              </div>
              <div className="flex mt-2 justify-end gap-2 p-1 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border-2 font-semibold hover:bg-red-400 hover:text-red-500 hover:bg-opacity-30 flex items-center gap-2 duration-150 transition-all border-red-400 rounded-full p-1 px-3 text-red-400"
                >
                  <MdClose /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddFixedDeduction}
                  className="border-2 font-semibold hover:bg-green-400 hover:text-green-500 hover:bg-opacity-30 flex items-center gap-2  duration-150 transition-all border-green-400 rounded-full p-1 px-3 text-green-400"
                >
                  <FaCheck /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModal && (
        <EditFixedDeductionModal
          EditId={EditId}
          fetchFixedDeduction={fetchFixedDeduction}
          closeModal={()=>setIsEditModal(false)}
        />
      )}
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col mt-4 mr-2 bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
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
                    Here you can create fixed deductions which want to get
                    deducted automatically every month from employee salary.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Some of the fixed deductions like Insurance, Canteen, Food
                    Coupon etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    These deduction can be with or without linked with
                    attendance or Payable days{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                  You can deductions too can be mapped to the employee CTC
                  details and CTC calculator{" "}
                </p>
              </li>
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

export default FixedDeduction;
