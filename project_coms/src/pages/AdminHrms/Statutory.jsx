import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postEmployeeStatutoryInfo } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Statutory = ({ empId }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    pf: false,
    esic: false,
    esicNumber:"",
    pt: false,
    lwf: false,
    IT: false,
    gratuity: false,
    nps: false,
    taxRegime: "",
    decimalPoint: false,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleAddStatutory = async () => {
    const postData = new FormData();
    postData.append("pf_applicable", formData.pf);
    postData.append("esic_applicable", formData.esic);
    postData.append("pt_applicable", formData.pt);
    postData.append("lwf_applicable", formData.lwf);
    postData.append("it_applicable", formData.IT);
    postData.append("gratuity_applicable", formData.gratuity);
    postData.append("nps_applicable", formData.nps);
    postData.append("tax_regime", formData.taxRegime);
    postData.append("esic_number", formData.esicNumber);
    postData.append("decimal_rates_allowed", formData.decimalPoint);
    postData.append("employee", empId);
    try {
      await postEmployeeStatutoryInfo(postData);
      // navigate("/admin/hrms/employee-directory");
      navigate(`/hrms/employee-directory-Personal/${empId}`);
      toast.success("Employee onboarding completed successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-full p-6 bg-white rounded-lg ">
        <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
          Statutory
        </h2>
        <div>
          <div className="grid grid-cols-2 gap-4 gap-x-5">
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
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="pf"
                  className="mr-2"
                  checked={formData.pf === false}
                  onChange={() => setFormData({ ...formData, pf: false })}
                />
                <label>No</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                ESIC Applicable{" "}
                <span className="text-sm text-gray-400">
                  (if not,{" "}
                  <a
                    href="https://www.esic.in/EmployerPortal/ESICInsurancePortal/Portal_Loginnew.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    apply
                  </a>{" "}
                  )
                </span>
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="ESIC"
                  className="mr-2"
                  checked={formData.esic === true}
                  onChange={() => setFormData({ ...formData, esic: true })}
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="ESIC"
                  className="mr-2"
                  checked={formData.esic === false}
                  onChange={() => setFormData({ ...formData, esic: false })}
                />
                <label>No</label>
              </div>
            </div>
            {formData.esic && (
              <div>
                <label
                  htmlFor=""
                  className="block text-gray-700 mb-2 font-medium"
                >
                  ESIC Number
                </label>
                <input
                  type="text"
                  name="esicNumber"
                  value={formData.esicNumber}
                  onChange={handleChange}
                  id=""
                  className="border border-gray-400 rounded-md p-2 w-full"
                  maxLength={17}
                  placeholder="ESIC number"
                />
              </div>
            )}
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
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="PT"
                  className="mr-2"
                  checked={formData.pt === false}
                  onChange={() => setFormData({ ...formData, pt: false })}
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
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="LWF"
                  className="mr-2"
                  checked={formData.lwf === false}
                  onChange={() => setFormData({ ...formData, lwf: false })}
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
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="IT"
                  className="mr-2"
                  checked={formData.IT === false}
                  onChange={() => setFormData({ ...formData, IT: false })}
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
                  onChange={() => setFormData({ ...formData, gratuity: true })}
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="Gratuity"
                  className="mr-2"
                  checked={formData.gratuity === false}
                  onChange={() => setFormData({ ...formData, gratuity: false })}
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
                />
                <label className="mr-4">Yes</label>
                <input
                  type="radio"
                  name="NPS"
                  className="mr-2"
                  checked={formData.nps === false}
                  onChange={() => setFormData({ ...formData, nps: false })}
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
                />
                <label htmlFor="Decimal Rates Allowed-no">No</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Tax Regime
              </label>
              <div className="flex items-center">
                <select
                  id="New Regime"
                  name="taxRegime"
                  className="mr-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.taxRegime}
                  onChange={handleChange}
                >
                  <option value="">Select Tax Regime</option>
                  <option value="New Regime">New Regime</option>
                  <option value="Old Regime">Old Regime</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <button
              onClick={handleAddStatutory}
              className="p-2 rounded-md text-white font-medium"
              style={{ background: themeColor }}
            >
              Finish onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statutory;
