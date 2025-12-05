import React, { useEffect, useState } from "react";
import {
  getAssociatedSites,
  getMyOrganizationLocations,
  getMyOrgDepartments,
  getReportingSupervisors,
  postEmployeeJobInfo,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Select from "react-select";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const AddJobInfo = ({ closeModal1, fetchJobInfo }) => {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    startDate: "",
    endDate: "",
    designation: "",
    comment: "",
  });
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchLocation = async () => {
    try {
      const res = await getMyOrganizationLocations(hrmsOrgId);
      setLocations(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDepartments = async () => {
    try {
      const res = await getMyOrgDepartments(hrmsOrgId);
      setDepartments(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssociatedSites = async () => {
    try {
      const res = await getAssociatedSites(hrmsOrgId);
      const ActiveSites = res.filter((site)=> site.status)
      const allSites = ActiveSites.map((site) => ({
        value: site.id,
        label: site.site_name,
      }));
      setSites(allSites);
    } catch (error) {
      console.log(error);
    }
  };
  const [reportSupervisors, setReportSupervisor] = useState([]);
  const fetchReportingSupervisor = async () => {
    try {
      const res = await getReportingSupervisors(hrmsOrgId);

      setReportSupervisor(supervisors);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDepartmentChange = async (e) => {
    const fetchReportingSupervisors = async (deptId) => {
      const reportingSupervisors = await getReportingSupervisors(
        deptId,
        hrmsOrgId
      );
      console.log(reportingSupervisors);

      // Extract supervisors from the nested structure
      const supervisors = reportingSupervisors.flatMap((department) =>
        department.reporting_supervisor.map((supervisor) => ({
          value: supervisor.id,
          label: supervisor.full_name,
        }))
      );

      setReportSupervisor(supervisors);
    };

    if (e.target.type === "select-one" && e.target.name === "department") {
      const departmentId = Number(e.target.value);
      await fetchReportingSupervisors(departmentId);

      setFormData({
        ...formData,
        department: departmentId,
      });
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchDepartments();
    fetchAssociatedSites();
  }, []);
  const [selectedOption, setSelectedOption] = useState({});
  const handleAssociatedSiteChange = (option) => {
    setSelectedOption(option);
  };
  const [selectedSupervisorOption, setSelectedSupervisorOption] = useState({});
  const handleSupervisorChange = (option) => {
    setSelectedSupervisorOption(option);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { id } = useParams();

  const handleAddJobInfo = async () => {
    const postData = new FormData();
    postData.append("employee", id);
    postData.append("start_date", formData.startDate);
    postData.append("organization", hrmsOrgId);
    postData.append("reporting_supervisor", selectedSupervisorOption.value);
    postData.append("department", formData.department);
    postData.append("associated_organization", selectedOption.value);
    postData.append("comment", formData.comment);
    postData.append("designation", formData.designation);
    try {
      const res = await postEmployeeJobInfo(postData);
      toast.success("Job INFO updated successfully")
      fetchJobInfo()
      closeModal1()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div className="max-h-screen bg-white p-2 px-3 w-[32rem] rounded-lg shadow-lg overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold mb-4">Job Information</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Effective From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="mt-1 p-2  border rounded-md"
                value={formData.startDate}
                onChange={handleChange}
                name="startDate"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Associate site <span className="text-red-500">*</span>
              </label>
              {/* <select className="mt-1 p-2 text-black border w-full rounded-md">
                <option value="">Select Site</option>
                {sites.map((site) => (
                  <option value={site.id} key={site.id}>
                   {site.site_name}
                  </option>
                ))}
              </select> */}
              <Select
                options={sites}
                onChange={handleAssociatedSiteChange}
                noOptionsMessage={() => "Select site"}
                maxMenuHeight={200}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                className=" p-2 text-black border rounded-md w-full"
                value={formData.department}
                onChange={handleDepartmentChange}
                name="department"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option value={department.id} key={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting supervisor{" "}
              </label>
              <Select
                options={reportSupervisors}
                onChange={handleSupervisorChange}
                noOptionsMessage={() => "Select Supervisor"}
                maxMenuHeight={150}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 p-2  border rounded-md w-full"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
                name="designation"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Comment{" "}
              </label>
              <input
                type="text"
                className="mt-1 p-2  border rounded-md w-full"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                name="comment"
              />
            </div>
          </div>
          <div className="flex my-2 justify-center gap-2">
            <button
              type="button"
              onClick={closeModal1}
              className="border-2 border-red-400 rounded-full text-red-400 px-4 p-1 flex items-center gap-2"
            >
              <MdClose /> Cancel
            </button>
            <button
              onClick={handleAddJobInfo}
              type="submit"
              className=" bg-green-400 rounded-full p-1 px-4 text-white flex items-center gap-2"
            >
              <FaCheck /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobInfo;
