import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { editFixedAllowanceDetails, getFixedAllowanceDetails } from "../../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const EditFixedAllowanceModal = ({ EditId, closeModal, fetchFixedAllowance }) => {
  const [formData, setFormData] = useState({
    isExemption: false,
    allowanceType: "",
    customLabel: "",
    attendanceEffect: false,
    affectPF: false,
    affectESIC: false,
    affectLWF: false,
    affectPT: false,
    affectIT: false,
    exemptionLimit: "",
    taxRegimes: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (formData.allowanceType) {
      setFormData((prevData) => ({
        ...prevData,
        customLabel: formData.allowanceType,
      }));
    }
  }, [formData.allowanceType]);
  useEffect(() => {
    const fetchFixedAllowance = async () => {
      try {
        const res = await getFixedAllowanceDetails(EditId);
        setFormData({
          ...formData,
          //   isExemption: res.allowance_type,
          customLabel: res.custom_label,
          attendanceEffect: res.affect_attendance,
          affectPF: res.affect_provident_fund,
          affectESIC: res.affect_esic,
          affectLWF: res.affect_lwf,
          //   affectPF: res.affect_professional_tax,
          affectIT: res.affect_income_tax,
          taxRegimes: res.tax_regime,
          affectPT: res.affect_professional_tax,
          allowanceType: res.allowance_type,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchFixedAllowance();
  }, []);

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  const handleEditFixedAllowance = async () => {
    console.log("jght");
    const { allowanceType, customLabel } = formData;

    if (!allowanceType) {
      toast.error("Please select an allowance type.");
      return;
    }

    if (!customLabel) {
      toast.error("Please enter a custom label.");
      return;
    }
    const postData = new FormData();
    postData.append("allowance_type", formData.allowanceType);
    postData.append("custom_label", formData.customLabel);
    postData.append("affect_attendance", formData.attendanceEffect);
    postData.append("affect_provident_fund", formData.affectPF);
    postData.append("affect_esic", formData.affectESIC);
    postData.append("affect_lwf", formData.affectLWF);
    postData.append("affect_professional_tax", formData.affectPT);
    postData.append("affect_income_tax", formData.affectIT);
    postData.append("tax_regime", formData.taxRegimes);
    postData.append("organization", hrmsOrgId);

    try {
      const res = await editFixedAllowanceDetails(EditId,postData);
      closeModal()
      toast.success("Fixed Allowance added successfully");
      fetchFixedAllowance();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-black bg-opacity-50">
      <div className="max-h-[100%] bg-white p-8 w-2/3 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold border-b mb-2">Add New Allowance</h2>
        <div>
          <div className="grid md:grid-cols-2 gap-5 my-5 max-h-96 overflow-y-auto p-1">
            <div className="grid gap-2 items-center w-full">
              <label className="block mb-1 font-semibold">
                Select Allowance Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.allowanceType}
                onChange={handleChange}
                name="allowanceType"
              >
                <option value="">Select an Allowance</option>
                <option value="DA">DA</option>
                <option value="Conveyance">Conveyance</option>
                <option value="LTA">LTA</option>
                <option value="Medical">Medical</option>
                <option value="Hostel">Hostel</option>
                <option value="Education">Education</option>
                <option value="Statutory Bonus">Statutory Bonus</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block mb-1 font-semibold">
                Custom Label<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.customLabel}
                name="customLabel"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Custom Label"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Do you want attendance to affect the eligibility?
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="attendanceEffect"
                  checked={formData.attendanceEffect === true}
                  onChange={() =>
                    setFormData({ ...formData, attendanceEffect: true })
                  }
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="attendanceEffect"
                  checked={formData.attendanceEffect === false}
                  onChange={() =>
                    setFormData({ ...formData, attendanceEffect: false })
                  }
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance affect Provident Fund?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="affectPF"
                  checked={formData.affectPF === true}
                  onChange={() => setFormData({ ...formData, affectPF: true })}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="affectPF"
                  checked={formData.affectPF === false}
                  onChange={() => setFormData({ ...formData, affectPF: false })}
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance affect ESIC?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="affectESIC"
                  checked={formData.affectESIC === true}
                  onChange={() =>
                    setFormData({ ...formData, affectESIC: true })
                  }
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="affectESIC"
                  checked={formData.affectESIC === false}
                  onChange={() =>
                    setFormData({ ...formData, affectESIC: false })
                  }
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance affect LWF?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="affectLWF"
                  checked={formData.affectLWF === true}
                  onChange={() => setFormData({ ...formData, affectLWF: true })}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="affectLWF"
                  checked={formData.affectLWF === false}
                  onChange={() =>
                    setFormData({ ...formData, affectLWF: false })
                  }
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance affect Professional Tax?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="affectPT"
                  checked={formData.affectPT === true}
                  onChange={() => setFormData({ ...formData, affectPT: true })}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="affectPT"
                  checked={formData.affectPT === false}
                  onChange={() => setFormData({ ...formData, affectPT: false })}
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance affect Income Tax?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="affectIT"
                  checked={formData.affectIT === true}
                  onChange={() => setFormData({ ...formData, affectIT: true })}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="affectIT"
                  checked={formData.affectIT === false}
                  onChange={() => setFormData({ ...formData, affectIT: false })}
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Does this allowance have any Exemption?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={formData.isExemption === true}
                  onChange={() =>
                    setFormData({ ...formData, isExemption: true })
                  }
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  checked={formData.isExemption === false}
                  onChange={() =>
                    setFormData({ ...formData, isExemption: false })
                  }
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
            {formData.isExemption && (
              <div className="grid gap-2 items-center w-full">
                <label className="block mb-2 font-semibold">
                  Enter Monthly Tax Exemption Limit
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border rounded-md border-gray-400 p-2"
                  placeholder="Exemption Amount"
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
                />
              </div>
            )}
            <div className="grid gap-2 items-center w-full">
              <label className="block mb-2 font-semibold">
                For which Tax Regimes will the Income Tax be calculated?
              </label>
              <select
                name="taxRegimes"
                value={formData.taxRegimes}
                onChange={handleChange}
                id=""
                className="border rounded-md border-gray-400 p-2"
              >
                <option value="">Select tax regime</option>
                <option value="Old Regime">Old Regime</option>
                <option value="New Regime">New Regime</option>
              </select>
              {/* <Select
              value={selectedOption}
              onChange={handleChangeTaxRegime}
              options={options}
              placeholder="Select regime"
              className="w-full"
              isClearable
              isMulti
              menuPlacement="top"
            /> */}
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
                onClick={handleEditFixedAllowance}
              className="border-2 font-semibold hover:bg-green-400 hover:text-green-500 hover:bg-opacity-30 flex items-center gap-2  duration-150 transition-all border-green-400 rounded-full p-1 px-3 text-green-400"
            >
              <FaCheck /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFixedAllowanceModal;
