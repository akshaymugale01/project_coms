import React, { useEffect, useState } from "react";
import CTCDetailsList from "./CTCDetailsList";
import { useSelector } from "react-redux";
import AdminHRMS from "./AdminHrms";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaProjectDiagram,
  FaShoppingBasket,
  FaWrench,
} from "react-icons/fa";
import TemplateLabel from "./CTCTemplates/TemplateLabel";
import ComponentCTCTemplate from "./CTCTemplates/ComponentCTCTemplate";
import Restrictions from "./CTCTemplates/Restrictions";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  createCTCTemplate,
  editCTCTemplateDetails,
  getTaxAndStatSetting,
  getTaxAndStatSettingByTemplateId,
  postCTCTemplate,
  postTaxAndStatSetting,
  showCTCTemplateDetails,
} from "../../api";
import toast from "react-hot-toast";

const CTCGeneralSettingEdit = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDeductions, setSelectedDeductions] = useState([]);
  const stepsData = [
    { id: 0, title: "General Settings", icon: <FaWrench /> },
    {
      id: 1,
      title: "Tax and Statutory Setting",
      icon: <FaProjectDiagram />,
    },
    // {
    //   id: 2,
    //   title: "Restrictions on CTC Basket and Amount Allocation",
    //   icon: <FaShoppingBasket />,
    // },
  ];
  const [activePage, setActivePage] = useState(0);
  const { id } = useParams();
  const [editableFields, setEditableFields] = useState([]);
  useEffect(() => {
    const fetchCTCTemplateDetails = async () => {
      try {
        const res = await showCTCTemplateDetails(id);

        setLabel(res[0].name);
        setCTCType(res[0].type);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCTCTaxStatutory = async () => {
      try {
        const res = await getTaxAndStatSettingByTemplateId(id);
        setTaxStatFields(res);
        setEditableFields(res.map((field) => ({ ...field, value: field.value })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCTCTemplateDetails();
    fetchCTCTaxStatutory();
  }, []);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin/hrms/ctc/CTC-Template");
  };
  const [label, setLabel] = useState("");
  const [ctcType, setCTCType] = useState("");
  const [templateId, setTemplateId] = useState("");
  const handleEditTemplate = async () => {
    if (!label) {
      return toast.error("Please Enter Template Label");
    }

    const postData = new FormData();
    postData.append("name", label);
    postData.append("type", ctcType);
    // const selectedAllowances = selectedOptions.map((items) => items);
    // // postData.append("fixed_salary_allowance", selectedAllowances);
    // selectedAllowances.forEach((allowance) => {
    //   postData.append("fixed_salary_allowance", allowance);
    // });
    // const selectedDeduction = selectedDeductions.map((items) => items);
    // selectedDeduction.forEach((allowance) => {
    //   postData.append("fixed_salary_deductions", allowance);
    // });
    // postData.append("fixed_salary_deductions", selectedDeduction);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await editCTCTemplateDetails(id, postData);
      setTemplateId(res.id);
      console.log(res);
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStepClick = (stepId) => {
    setActivePage(stepId);
  };
  const handleBack = () => {
    setActivePage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNext = () => {
    setActivePage((prevPage) => Math.min(stepsData.length - 1, prevPage + 1));
  };

  const [taxStatFields, setTaxStatFields] = useState([]);
  const [statData, setStatData] = useState({});

  useEffect(() => {
    const fetchTaxStat = async () => {
      try {
        const res = await getTaxAndStatSetting(hrmsOrgId);
        setTaxStatFields(res);
        const initialStatData = res.reduce((acc, field) => {
          acc[field.id] =
            field.value_type === "boolean"
              ? field.default_value === "true"
              : field.default_value;
          return acc;
        }, {});

        setStatData(initialStatData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTaxStat();
  }, []);
  const handleStatChange = (id, event, valueType) => {
    const updatedValue =
      valueType === "boolean"
        ? event.target.value === "true"
        : event.target.value;
    setStatData({
      ...statData,
      [id]: updatedValue,
    });
  };

  const handlePostTaxStatutory = async () => {
    const taxData = Object.entries(statData).map(([key, value]) => ({
      template: templateId,
      master_id: key,
      value: String(value),
    }));
    try {
      const res = await postTaxAndStatSetting(taxData);
      // setPage("CTC Components");
      navigate("/admin/hrms/ctc/CTC-Template");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex ml-20">
      <div className="flex ">
        <AdminHRMS />
        <div className="mt-10 mx-2 border rounded-xl max-w-96 w-80 max-h-80 h-80">
          <div className=" p-4 ">
            <h2 className="text-xl font-semibold flex items-center border-b">
              <FaChevronRight className="h-4 w-4 mr-2" />
              Steps
            </h2>
          </div>
          <div className="bg-white ">
            {stepsData.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center p-4 ${
                  index !== stepsData.length - 1 ? "border-b" : ""
                } cursor-pointer`}
                onClick={() => handleStepClick(step.id)}
              >
                <div
                  className={`rounded-full p-2 mr-4 ${
                    activePage === step.id ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {React.cloneElement(step.icon, {
                    className: `w-6 h-6 ${
                      activePage === step.id ? "text-blue-500" : "text-gray-400"
                    }`,
                  })}
                </div>
                <span
                  className={`${
                    activePage === step.id ? "text-black" : "text-gray-400"
                  } font-medium`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {activePage === 0 && (
          <div className="my-10 p-2 w-full">
            <p className="font-bold mb-4">General Settings</p>
            <div className="flex flex-col w-96">
              <label htmlFor="" className="font-medium">
                Please enter the label for the CTC Template{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="m-2 border p-2 border-gray-300 w-full rounded-md"
                placeholder="CTC Template Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-96">
              <label htmlFor="" className="font-medium">
                Select Template Type
                <span className="text-red-500">*</span>
              </label>
              <select
                name=""
                value={ctcType}
                onChange={(e) => setCTCType(e.target.value)}
                id=""
                className="m-2 border p-2 border-gray-300 w-full rounded-md"
              >
                <option value="">Select Type</option>
                <option value="ctc template">CTC Template</option>
              </select>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleCancel}
                className="bg-red-400 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTemplate}
                style={{ background: themeColor }}
                className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {activePage === 1 && (
          <div className="p-4 grid grid-cols-2">
            {taxStatFields.map((field) => (
              <div key={field.id} className="flex gap-2 flex-col my-2">
                <label className="block text-gray-700 font-medium">
                  {field.label}
                </label>
                {field.value_type === "boolean" && (
                  <div className="flex gap-4 items-center">
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        name={`boolean-${field.id}`}
                        value="true" // String "true"
                        checked={statData[field.id] === true} // Boolean check
                        onChange={(e) =>
                          handleStatChange(field.id, e, "boolean")
                        }
                      />
                      Yes
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        name={`boolean-${field.id}`}
                        value="false" // String "false"
                        checked={statData[field.id] === false} // Boolean check
                        onChange={(e) =>
                          handleStatChange(field.id, e, "boolean")
                        }
                      />
                      No
                    </label>
                  </div>
                )}
                {/* {field.value_type === "number" && (
                  <input
                    type="number"
                    value={statData[field.id]}
                    onChange={(e) => handleStatChange(field.id, e, "number")}
                    placeholder="Enter PF wage"
                    className="border w-full border-gray-500 p-2 rounded-md"
                  />
                )} */}
                {field.value_type === "string" && (
                  <input
                    type="text"
                    value={statData[field.id]}
                    onChange={(e) => handleStatChange(field.id, e, "string")}
                    placeholder="Enter text"
                    className="border w-full border-gray-500 p-2 rounded-md"
                  />
                )}
                {/* {field.value_type === "drop down" && (
                  <select
                    name=""
                    id=""
                    value={statData[field.id]}
                    onChange={(e) => handleStatChange(field.id, e, "string")}
                    className="border w-full border-gray-500 p-2 rounded-md"
                  >
                    <option value="">Select Template</option>
                    <option value="temp">Template</option>
                  </select>
                )} */}
              </div>
            ))}
            <div className="flex justify-center items-center mt-4">
              <button
                style={{ background: themeColor }}
                className="text-white p-2 rounded-md"
                onClick={handlePostTaxStatutory}
              >
                Save & Proceed
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center m-4 gap-2">
          {/* <button
            onClick={handleCancel}
            className="bg-red-400 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button> */}
          {/* {activePage !== 0 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Back
            </button>
          )}
          {activePage !== 2 ? (
            <button
              onClick={handleNext}
              style={{ background: themeColor }}
              className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleAddTemplate}
              style={{ background: themeColor }}
              className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Proceed
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

{
  /* {activePage === 1 && (
          <ComponentCTCTemplate
            onBack={handleBack}
            onNext={handleNext}
            tempId={templateId}
            selectedDeductions={selectedDeductions}
            selectedOptions={selectedOptions}
            setSelectedDeductions={setSelectedDeductions}
            setSelectedOptions={setSelectedOptions}
          />
        )} */
}
// {activePage === 2 && <Restrictions tempId={templateId} />}

export default CTCGeneralSettingEdit;
