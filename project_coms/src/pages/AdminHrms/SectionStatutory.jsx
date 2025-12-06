import React, { useState, useRef, useEffect } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editEmployeeStatutoryInfo,
  getEmployeeStatutoryInfoDetails,
  postEmployeeStatutoryInfo,
} from "../../api";
import { BiEdit } from "react-icons/bi";
import { dateTimeFormat } from "../../utils/dateUtils";

const SectionStatutory = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    pf: false,
    esic: false,
    pt: false,
    lwf: false,
    IT: false,
    gratuity: false,
    nps: false,
    taxRegime: "",
    decimalPoint: false,
    id: "",
    updatedAt: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchStatutoryDetails = async () => {
    try {
      const res = await getEmployeeStatutoryInfoDetails(id);
      const data = res[0];
      setFormData({
        ...formData,
        pf: data?.pf_applicable || false,
        decimalPoint: data?.decimal_rates_allowed || false,
        esic: data?.esic_applicable || false,
        gratuity: data?.gratuity_applicable || false,
        IT: data?.it_applicable || false,
        lwf: data?.lwf_applicable || false,
        nps: data?.nps_applicable || false,
        pt: data?.pt_applicable || false,
        taxRegime: data?.tax_regime,
        id: data?.id,
        updatedAt: data?.updated_date,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStatutoryDetails();
  }, []);

  const handleEditStatutory = async () => {
    const postData = new FormData();
    postData.append("pf_applicable", formData.pf);
    postData.append("decimal_rates_allowed", formData.decimalPoint);
    postData.append("esic_applicable", formData.esic);
    postData.append("gratuity_applicable", formData.gratuity);
    postData.append("it_applicable", formData.IT);
    postData.append("lwf_applicable", formData.lwf);
    postData.append("nps_applicable", formData.nps);
    postData.append("pt_applicable", formData.pt);
    postData.append("tax_regime", formData.taxRegime);
    postData.append("employee", id);
    try {
      if (formData.id) {
        await editEmployeeStatutoryInfo(formData.id, postData);
        setIsEditing(false);
        fetchStatutoryDetails();
      } else {
        await postEmployeeStatutoryInfo(postData);
        setIsEditing(false);
        fetchStatutoryDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />
      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>
        <div className=" w-full p-2 px-5 rounded-md">
          {/* <Collapsible
            readOnly
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-xl font-semibold ">Statutory</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold "
          > */}
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="border-2 rounded-full p-1 transition-all duration-150 hover:bg-opacity-30 border-green-400  px-4 text-green-400 hover:bg-green-300 font-semibold  "
                  onClick={handleEditStatutory}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="border-2 rounded-full p-1 border-red-400  px-4 text-red-400  hover:bg-opacity-30 hover:bg-red-300 font-semibold  "
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-blue-500 flex gap-4 items-center text-white  hover:bg-gray-700 font-semibold py-2 px-6 rounded-full"
                onClick={() => setIsEditing(true)}
              >
                <BiEdit /> Edit
              </button>
            )}
          </div>
          <h2 className="text-2xl font-semibold mb-6">
            Statutory Setting Information
          </h2>
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  PF Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="pf"
                    className="mr-2"
                    checked={formData.pf === true}
                    onChange={() => setFormData({ ...formData, pf: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="pf"
                    className="mr-2"
                    checked={formData.pf === false}
                    onChange={() => setFormData({ ...formData, pf: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  ESIC Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="ESIC"
                    className="mr-2"
                    checked={formData.esic === true}
                    onChange={() => setFormData({ ...formData, esic: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="ESIC"
                    className="mr-2"
                    checked={formData.esic === false}
                    onChange={() => setFormData({ ...formData, esic: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  PT Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="PT"
                    className="mr-2"
                    checked={formData.pt === true}
                    onChange={() => setFormData({ ...formData, pt: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="PT"
                    className="mr-2"
                    checked={formData.pt === false}
                    onChange={() => setFormData({ ...formData, pt: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  LWF Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="LWF"
                    className="mr-2"
                    checked={formData.lwf === true}
                    onChange={() => setFormData({ ...formData, lwf: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="LWF"
                    className="mr-2"
                    checked={formData.lwf === false}
                    onChange={() => setFormData({ ...formData, lwf: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  IT Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="IT"
                    className="mr-2"
                    checked={formData.IT === true}
                    onChange={() => setFormData({ ...formData, IT: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="IT"
                    className="mr-2"
                    checked={formData.IT === false}
                    onChange={() => setFormData({ ...formData, IT: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Gratuity Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="Gratuity"
                    className="mr-2"
                    checked={formData.gratuity === true}
                    onChange={() =>
                      setFormData({ ...formData, gratuity: true })
                    }
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="Gratuity"
                    className="mr-2"
                    checked={formData.gratuity === false}
                    onChange={() =>
                      setFormData({ ...formData, gratuity: false })
                    }
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  NPS Applicable
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="NPS"
                    className="mr-2"
                    checked={formData.nps === true}
                    onChange={() => setFormData({ ...formData, nps: true })}
                    disabled={!isEditing}
                  />
                  <label className="mr-4">Yes</label>
                  <input
                    type="radio"
                    name="NPS"
                    className="mr-2"
                    checked={formData.nps === false}
                    onChange={() => setFormData({ ...formData, nps: false })}
                    disabled={!isEditing}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Decimal Rates Allowed
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="Decimal Rates Allowed-yes"
                    name="Decimal Rates Allowed"
                    checked={formData.decimalPoint === true}
                    onChange={() =>
                      setFormData({ ...formData, decimalPoint: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="Decimal Rates Allowed-yes" className="mr-4">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="Decimal Rates Allowed-no"
                    name="Decimal Rates Allowed"
                    checked={formData.decimalPoint === false}
                    onChange={() =>
                      setFormData({ ...formData, decimalPoint: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="Decimal Rates Allowed-no">No</label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Tax Regime
                </label>
                <div className="flex items-center">
                  <select
                    id="New Regime"
                    name="taxRegime"
                    // className="mr-2 w-full px-3 py-2 border border-gray-300  rounded-md"
                    className={`mt-1 p-2 w-full border rounded-md ${
                      !isEditing ? "bg-gray-200" : ""
                    }`}
                    value={formData.taxRegime}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Tax Regime</option>
                    <option value="New Regime">New Regime</option>
                    <option value="Old Regime">Old Regime</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700  font-medium">
                  Tax Regime Updated at
                </label>
                <input
                  type="text"
                  className={`mt-1 p-2 w-full border rounded-md ${
                    !isEditing ? "bg-gray-200 text-gray-500" : ""
                  }`}
                  readOnly
                  value={dateTimeFormat(formData.updatedAt)}
                />
              </div>
            </div>
          </div>
          {/* </Collapsible> */}
        </div>
      </div>
    </div>
  );
};

export default SectionStatutory;
