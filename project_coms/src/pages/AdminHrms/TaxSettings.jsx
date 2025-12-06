import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";

const TaxSettings = () => {
  const [formData, setFormData] = useState({
    panNumber: "AAKCB0822E",
    incomeTaxAct: "Yes",
    form16Month: "",
    headOfficeAddress: "",
    place: "",
    signatoryName: "Maahek Nair",
    signatoryDesignation: "Founder",
    signatoryFatherName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex gap-2 ml-20">
      {" "}
      <PayrollSettingDetailsList />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* <PayrollSettingDetailsList/> */}
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Tax Settings</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700">
                What PAN number have you registered your Company with?
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Is your company registered under the Income Tax Act?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="incomeTaxAct"
                    value="Yes"
                    checked={formData.incomeTaxAct === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="incomeTaxAct"
                    value="No"
                    checked={formData.incomeTaxAct === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700">
                What month do you issue Form 16s to employees?
              </label>
              <select
                name="form16Month"
                value={formData.form16Month}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">
                Please list your head office address
              </label>
              <input
                type="text"
                name="headOfficeAddress"
                value={formData.headOfficeAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                What is the full name of your Company's Authorized Signatory?
              </label>
              <input
                type="text"
                name="signatoryName"
                value={formData.signatoryName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                What is the designation of your Company's Authorized Signatory?
              </label>
              <input
                type="text"
                name="signatoryDesignation"
                value={formData.signatoryDesignation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                What is the Father's Full Name of your Company's Authorized
                Signatory?
              </label>
              <input
                type="text"
                name="signatoryFatherName"
                value={formData.signatoryFatherName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaxSettings;
