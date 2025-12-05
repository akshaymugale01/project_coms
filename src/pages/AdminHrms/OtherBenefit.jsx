import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  deleteOtherBenefits,
  getOtherBenefits,
  postOtherBenefits,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import EditOtherBenefitModal from "./Modals/EditOtherBenefitModal";

const OtherBenefit = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [formData, setFormData] = useState({
    label: "",
    inReport: false,
    affectAttendance: false,
  });

  const handleAddBenefits = async () => {
    if (!formData.label) {
      return toast.error("Please provide benefit name");
    }
    const postData = new FormData();
    postData.append("custom_label", formData.label);
    postData.append("include_in_salary_reports", formData.inReport);
    postData.append(
      "attendance_effects_eligibility",
      formData.affectAttendance
    );
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postOtherBenefits(postData);
      toast.success("Other benefit added successfully");
      fetchOtherBenefits();
      setModalIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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
            <BiEdit />
          </button>
          <button
            className="text-red-400"
            onClick={() => handleDeleteBenefits(row.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const [editId, setEditId] = useState("");
  const handleEditModal = (id) => {
    setEditId(id);
    setEditModal(true);
  };

  const handleDeleteBenefits = async (id) => {
    try {
      await deleteOtherBenefits(id);
      toast.success("Benefit deleted successfully");
      fetchOtherBenefits();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOtherBenefits();
  }, []);
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchOtherBenefits = async () => {
    try {
      const res = await getOtherBenefits(hrmsOrgId);
      setBenefits(res);
      setFilteredBenefits(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
          />
          <button
            onClick={openModal}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={filteredBenefits} isPagination={true} />
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
          <div class="max-h-screen h-80vh bg-white p-4 w-96 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Allowance</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="deductionLabel"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  What would you want to call this Benefit? *
                </label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter deduction label"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="showInCTC"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Do you want to include this in salary reports? *
                </label>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inReport"
                    checked={formData.inReport === true}
                    onChange={() =>
                      setFormData({ ...formData, inReport: true })
                    }
                    className="mr-2"
                  />
                  Yes
                  <input
                    type="radio"
                    name="inReport"
                    checked={formData.inReport === false}
                    onChange={() =>
                      setFormData({ ...formData, inReport: false })
                    }
                    className="ml-4 mr-2"
                  />
                  No
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="frequency"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Do you want attendance to effect the eligibility?*
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="attendanceEffect"
                    checked={formData.affectAttendance === true}
                    onChange={() =>
                      setFormData({ ...formData, affectAttendance: true })
                    }
                    className="mr-2"
                  />
                  Yes
                  <input
                    type="radio"
                    name="attendanceEffect"
                    checked={formData.affectAttendance === false}
                    onChange={() =>
                      setFormData({ ...formData, affectAttendance: false })
                    }
                    className="ml-4 mr-2"
                  />
                  No
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
                  onClick={handleAddBenefits}
                  className="bg-blue-500 text-white font-semibold p-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {editModal && (
        <EditOtherBenefitModal
          editId={editId}
          fetchOtherBenefits={fetchOtherBenefits}
          onClose={() => setEditModal(false)}
        />
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
                    Other benefits the one which are not paid directly to
                    employees through the salary; however, it is a part of their
                    CTC. E.g. Insurance Premium paid by employer, any fixed
                    reimbursement paid off the salary etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    There is an option to map these as well to the employee CTC.{" "}
                  </li>
                </ul>
              </li>
              {/* <li>
                  <ul style={listItemStyle}>
                    <li>
                    These deduction can be with or without linked with attendance or Payable days                </li>
                  </ul>
                </li> */}

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

export default OtherBenefit;
