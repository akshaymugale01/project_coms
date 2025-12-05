import React, { useEffect, useState } from "react";
import { getDataChangeRequestDetails, getUserDetails } from "../../../api";
import { useSelector } from "react-redux";

const EditDataChangeRequest = ({ reqId, setIsDataChangeEditing }) => {
  const [formData, setFormData] = useState({});
  const [useCurrentData, setUseCurrentData] = useState({});
  const themeColor = useSelector((state) => state.theme.color);
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCheckboxChange = (fieldName) => {
    setUseCurrentData((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, useCurrentData });
  };
  const [apiData, setApiData] = useState(null);
  const fetchDataChangeRequestDetails = async () => {
    try {
      const res = await getDataChangeRequestDetails(reqId);

      setApiData(res);
      fetchUserDetails(res.employee);
    } catch (error) {
      console.log(error);
    }
  };
  const [employeeDetails, setEmployeeDetails] = useState({});
  const fetchUserDetails = async (id) => {
    try {
      const res = await getUserDetails(id);
      setEmployeeDetails(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataChangeRequestDetails();
  }, []);

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full mt-5">
      <div className=" bg-white rounded-lg  overflow-hidden">
        <div className="">
          <h1 className="text-xl font-semibold m-5 text-gray-800 border-b">
            Update Records
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Profile Section */}
          <div className=" shadow-custom-all-sides m-1 w-80 rounded-xl p-6">
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <div
                style={{ background: themeColor }}
                className="w-20 h-20 rounded-full bg-pink-300 flex items-center justify-center text-2xl font-semibold text-white"
              >
                {employeeDetails?.employee?.first_name
                  ?.charAt(0)
                  .toUpperCase() || ""}
                {employeeDetails?.employee?.last_name
                  ?.charAt(0)
                  .toUpperCase() || ""}
              </div>
              <div className="flex justify-center flex-col gap-2">
                <h2 className="text-xl ">
                  {employeeDetails?.employee?.first_name}{" "}
                  {employeeDetails?.employee?.last_name}
                </h2>
                <p className="text-gray-600 text-center">
                  {employeeDetails?.employment_info?.employee_code}
                </p>
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm text-center">
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="border-l px-2 border-gray-400 text-gray-500 text-base">
                {employeeDetails?.employee?.mobile}
              </p>
              <p className="border-l px-2 border-gray-400 text-gray-500 text-base text-wrap max-w-72">
                {employeeDetails?.employee?.email_id}
              </p>
              <p className="border-l px-2 border-gray-400 text-gray-500">
                {employeeDetails?.employment_info?.designation}
              </p>
              <p className="border-l px-2 border-gray-400 text-gray-500"></p>
              <p className="text-gray-600"></p>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-6">
            <p className="mb-4 text-gray-700">
              Dear {apiData.employee_full_name}, please complete the following
              data:
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <h2 className="font-semibold text-center">Current Value</h2>
                <h2 className="font-semibold text-center">Proposed Value</h2>
              </div>
              {apiData && (
                <div className="my-4">
                  <label
                    className="block text-gray-500 font-bold mb-2"
                    htmlFor={apiData.field_name}
                  >
                    {apiData?.field_name.replace("_", " ")}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      id={`current_${apiData.field_name}`}
                      value={apiData.current_value}
                      readOnly
                      className="w-full px-3 py-2 max-h-[41px] bg-gray-200 rounded-md"
                    />
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        id={apiData.field_name}
                        value={
                          formData[apiData.field_name] || apiData.proposed_value
                        }
                        onChange={(e) =>
                          handleInputChange(apiData.field_name, e.target.value)
                        }
                        placeholder={`New ${apiData.field_name.replace(
                          "_",
                          " "
                        )}`}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={useCurrentData[apiData.field_name] || false}
                          onChange={() =>
                            handleCheckboxChange(apiData.field_name)
                          }
                          className="form-checkbox h-4 w-4 text-orange-500"
                        />
                        <span className="ml-2 text-gray-700">
                          Use Current Data
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-2"></div>
                </div>
              )}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDataChangeEditing(false)}
                  type="button"
                  className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100 "
                >
                  Back
                </button>
                <button
                  type="submit"
                  style={{ background: themeColor }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDataChangeRequest;
