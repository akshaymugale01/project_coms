import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import PayslipPreviewModal from "./Modals/PayslipPreviewModal";
import { ColorPicker } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropZone from "./Components/DropZone";
import Field from "./Components/Fields";
import { RiDragMoveFill } from "react-icons/ri";
import { editPayrollPaySetting, getPayrollPaySetting } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const initialFields = [
  "State",
  "Department",
  "Education Level",
  "klg",
  "Location Name",
  "Currency",
  "Son Birthday",
  "Which brand Laptop?",
  "CA Number",
  "Mobile Phone",
];

const PayslipSetting = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [companyName, setCompanyName] = useState("Bodyprocoach Pvt Ltd");
  const [showPaySlip, setShowPaySlip] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [availableFields, setAvailableFields] = useState(initialFields);
  const [leftFields, setLeftFields] = useState([]);
  const [rightFields, setRightFields] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    fnfNote: "",
    payslip_note: "",
    id: ""
  });

  const handleDropLeft = (field) => {
    setLeftFields((prevFields) => [...prevFields, field]);
    setAvailableFields((prevFields) => prevFields.filter((f) => f !== field));
  };

  const handleDropRight = (field) => {
    setRightFields((prevFields) => [...prevFields, field]);
    setAvailableFields((prevFields) => prevFields.filter((f) => f !== field));
  };

  const removeLeftField = (field) => {
    setLeftFields((prevFields) => prevFields.filter((f) => f !== field));
    setAvailableFields((prevFields) => [...prevFields, field]);
  };

  const removeRightField = (field) => {
    setRightFields((prevFields) => prevFields.filter((f) => f !== field));
    setAvailableFields((prevFields) => [...prevFields, field]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchPayslipSetting = async () => {
    try {
      const res = await getPayrollPaySetting(hrmsOrgId);
      const data = res[0];
      setFormData({
        ...formData,
        companyName: data.company_name,
        fnfNote: data.fnf_note,
        payslip_note: data.payslip_note,
        id: data.id
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchPayslipSetting()
  },[])

  const editPayslipSetting = async()=>{
    const editData = new FormData()
    editData.append("company_name", formData.companyName)
    editData.append("fnf_note", formData.fnfNote)
    editData.append("payslip_note", formData.payslip_note)
    editData.append("organization", hrmsOrgId)
    try {
      const res = editPayrollPaySetting(formData.id, editData)
      toast.success("Payslip setting updated successfully")
      fetchPayslipSetting()
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-between gap-5 ml-20">
        <PayrollSettingDetailsList />
        <div className="my-2 w-full">
          <div className="bg-white  rounded  w-full ">
            <div className="flex justify-between gap-2 mt-4">
              <h2 className="text-2xl font-bold mb-4">Payslip Setting</h2>
              <div className="flex justify-end">
                {isEditing ? (
                  <div className="flex gap-2 justify-center my-2">
                    <button
                      className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                      onClick={editPayslipSetting}
                    >
                      <FaCheck /> Save
                    </button>
                    <button
                      className="border-2 border-red-400 text-red-400 rounded-full p-1 px-4 flex items-center gap-2"
                      onClick={() => setIsEditing(false)}
                    >
                      <MdClose /> Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex gap-2 items-center"
                  >
                    <BiEdit /> Edit
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="">
                <label
                  className="block text-gray-700  font-medium mb-2"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className={`${
                    !isEditing && "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } border border-gray-300 w-full p-2 rounded-md`}
                  disabled={!isEditing}
                  value={formData.companyName}
                  name="companyName"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700  font-medium mb-2"
                  htmlFor="note"
                >
                  What note do you want to show in the FNF Payslip?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="note"
                  value={formData.fnfNote}
                  onChange={handleChange}
                  name="fnfNote"
                  className={`${
                    !isEditing && "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } border border-gray-300 w-full p-2 rounded-md`}
                  disabled={!isEditing}
                  rows="4"
                ></textarea>
              </div>
              <div className="">
                <label
                  className="block text-gray-700  font-medium mb-2"
                  htmlFor="note"
                >
                  What note would you like to include in the Payslip and
                  Detailed Payslip? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="note"
                  className={`${
                    !isEditing && "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } border border-gray-300 w-full p-2 rounded-md`}
                  disabled={!isEditing}
                  value={formData.payslip_note}
                  onChange={handleChange}
                  name="payslip_note"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center my-2">
              <button
                style={{ background: themeColor }}
                className="p-2 px-4 text-white rounded-md"
                onClick={() => setShowPaySlip(true)}
              >
                Payslip Preview
              </button>
            </div>
            {isEditing && (
              <>
                <div className="flex flex-col mb-2">
                  <label htmlFor="" className="font-medium">
                    Please select background color for employee details header
                  </label>
                  <ColorPicker
                    // value={formData.color}
                    // onChange={(color) =>
                    //   setFormData({ ...formData, color: color.toHexString() })
                    // }
                    size="large"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-medium">
                    Please select font color for employee details header
                  </label>
                  <ColorPicker
                    // value={formData.color}
                    // onChange={(color) =>
                    //   setFormData({ ...formData, color: color.toHexString() })
                    // }
                    size="large"
                  />
                </div>
                <div className="flex flex-col gap-4 my-4 w-full">
                  <h2 className="flex gap-2 items-center font-medium ">
                    <RiDragMoveFill size={20} /> Drag and drop the fields to be
                    displayed on the payslip
                  </h2>
                  <div className="flex gap-4 my-2 w-full">
                    <div>
                      <h3 className="font-semibold mb-4">Available Fields</h3>
                      {availableFields.map((field, index) => (
                        <Field key={index} name={field} />
                      ))}
                    </div>
                    <DropZone
                      title="Left Corner Of Payslip"
                      fields={leftFields}
                      onDrop={handleDropLeft}
                      removeField={removeLeftField}
                    />
                    <DropZone
                      title="Right Corner Of Payslip"
                      fields={rightFields}
                      onDrop={handleDropRight}
                      removeField={removeRightField}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="my-4 mx-2 w-fit">
          <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
            <div className="flex  gap-4 font-medium">
              <GrHelpBook size={20} />
              <h2>Help Center</h2>
            </div>
            <div className=" mt-1">
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You have to drag and drop the required fields that you
                      want to be displayed on the payslips and can preview it
                      once done.{" "}
                    </li>{" "}
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You also have an option to map the leave balances at the
                      bottom of the payslips.{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You have to drag and drop the required fields that you
                      want to be displayed on the payslips and can preview it
                      once done.
                    </li>
                  </ul>
                </li>

                {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
                    You can also set password for your salary register and the password will be suffix (@MMYYYY) with your entered password. E.g. If you enter password as abcd in Payroll Setting then password for salary register for month of April 2022 would be abcd@042022
                  </p>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {showPaySlip && (
          <PayslipPreviewModal onClose={() => setShowPaySlip(false)} />
        )}
      </div>
    </DndProvider>
  );
};

export default PayslipSetting;
