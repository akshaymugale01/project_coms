import { useState } from "react";
import { Switch } from "antd";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import AddLocationModal from "./AddLocationModal";

function AttendanceRegularization({
  handleNextStep,
  handleCancel,
  handleBack,
}) {
  const [ipRestriction, setIpRestriction] = useState(false);
  const [mobileRestriction, setMobileRestriction] = useState(true);
  const [locationType, setLocationType] = useState("template");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [canRegularize, setCanRegularize] = useState(true);
  const [daysLimit, setDaysLimit] = useState("");
  const [supervisorApproval, setSupervisorApproval] = useState(true);
  const [adminNotification, setAdminNotification] = useState(true);
  const [supervisorNotification, setSupervisorNotification] = useState(true);
  const [canSupervisorRegularize, setCanSupervisorRegularize] = useState(true);
  const [adminNotificationForSupervisor, setAdminNotificationForSupervisor] =
    useState(true);
  const [
    employeeNotificationForSupervisor,
    setEmployeeNotificationForSupervisor,
  ] = useState(true);
  const [canAdminRegularize, setCanAdminRegularize] = useState(true);
  const [supervisorNotificationForAdmin, setSupervisorNotificationForAdmin] =
    useState(false);
  const [employeeNotificationForAdmin, setEmployeeNotificationForAdmin] =
    useState(false);
  const themeColor = useSelector((state) => state.theme.color);

  const [weeklyNotification, setWeeklyNotification] = useState("both");
  const [monthlyNotification, setMonthlyNotification] = useState("both");
  const [weeklyRecipients, setWeeklyRecipients] = useState({
    admin: false,
    supervisor: false,
    employees: true,
  });
  const [monthlyRecipients, setMonthlyRecipients] = useState({
    admin: false,
    supervisor: false,
    employees: true,
  });

  const [notificationSetting, setNotificationSetting] = useState("grace");
  const [gracePeriod, setGracePeriod] = useState("30");
  const [recipients, setRecipients] = useState({
    admin: true,
    supervisor: true,
    employees: true,
  });

  const handleRecipientChange = (recipient) => {
    setRecipients((prev) => ({ ...prev, [recipient]: !prev[recipient] }));
  };

  const handleWeeklyRecipientChange = (recipient) => {
    setWeeklyRecipients((prev) => ({ ...prev, [recipient]: !prev[recipient] }));
  };

  const handleMonthlyRecipientChange = (recipient) => {
    setMonthlyRecipients((prev) => ({
      ...prev,
      [recipient]: !prev[recipient],
    }));
  };

  const columns = [
    {
      name: "Location Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Latitude",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Longitude",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Radius",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button>
            <BiEdit size={15} />
          </button>
          <button className="text-red-400">
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: 72.837005,
      Location: "BPCGoregaon",
      City: 19.159133,
      State: 75,
    },
  ];

  const [ipAddresses, setIpAddresses] = useState([""]);

  const handleAddIP = () => {
    setIpAddresses([...ipAddresses, ""]);
  };

  const handleIPChange = (index, value) => {
    const updatedIPs = ipAddresses.map((ip, i) => (i === index ? value : ip));
    setIpAddresses(updatedIPs);
  };

  const handleDeleteIP = (index) => {
    const updatedIPs = ipAddresses.filter((_, i) => i !== index);
    setIpAddresses(updatedIPs);
  };

  return (
    <div className="w-full p-2 mb-5 ">
      <div className="space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="ip-restriction" className="text-sm font-medium">
              Would you like to restrict the IP address that the employee can
              check-in/check-out?
            </label>
            <Switch
              id="ip-restriction"
              checked={ipRestriction}
              onChange={() => setIpRestriction(!ipRestriction)}
            />
          </div>

          {ipRestriction && (
            <div className="bg-white p-4 rounded-md flex flex-col gap-2 border space-y-4">
              <h2 className="text-lg font-semibold">IP Configurations</h2>
              <p className="text-sm text-gray-600">
                Please enter the all IP addresses that the employee can log in
                from to check-in/check-out
              </p>
              {ipAddresses.map((ip, index) => (
                <div key={index} className="flex items-center w-full space-x-2">
                  <input
                    type="text"
                    placeholder="Allowed IP Address"
                    value={ip}
                    onChange={(e) => handleIPChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md"
                  />
                  <button
                    onClick={() => handleDeleteIP(index)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div>
                <button
                  variant="secondary"
                  onClick={handleAddIP}
                  style={{ background: themeColor }}
                  className="bg-orange-400 text-white hover:bg-orange-500 p-2 rounded-md"
                >
                  Add another IP Address
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="mobile-restriction" className="text-sm font-medium">
              Would you like to restrict locations from which employee can mark
              check in/check out using Mobile?
            </label>
            <Switch
              id="mobile-restriction"
              checked={mobileRestriction}
              // onCheckedChange={}
              onChange={() => setMobileRestriction(!mobileRestriction)}
            />
          </div>

          {mobileRestriction && (
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium mb-2">
                  How would you like to assign Locations for each employee?
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="template"
                      name="locationType"
                      value="template"
                      checked={locationType === "template"}
                      onChange={(e) => setLocationType(e.target.value)}
                    />
                    <label htmlFor="template">Template Wise</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="employee"
                      name="locationType"
                      value="employee"
                      checked={locationType === "employee"}
                      onChange={(e) => setLocationType(e.target.value)}
                    />
                    <label htmlFor="employee">Employee Wise</label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2 border border-gray-300 rounded-md ">
                <div className="flex justify-between my-2">
                  <h2 className="text-lg font-semibold ">
                    Location Restrictions
                  </h2>
                  <button
                    variant="secondary"
                    style={{ background: themeColor }}
                    className=" bg-orange-400 text-white hover:bg-orange-500 p-1 px-2 rounded-md"
                    onClick={() => setShowLocationModal(true)}
                  >
                    Add Location
                  </button>
                </div>
                <Table columns={columns} data={data} />
              </div>
            </div>
          )}
        </div>

        <div className="">
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">
              Can employees regularize their own attendance entries?
            </p>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  checked={canRegularize}
                  onChange={() => setCanRegularize(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={!canRegularize}
                  onChange={() => setCanRegularize(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {canRegularize && (
            <div className="border border-gray-300 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                Employee Regularization Settings
              </h2>

              <div className="mb-4">
                <label className="block mb-2">
                  Within how many days can the employee apply for regularization
                  from the date of occurrence? (Leave blank for no limit)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={daysLimit}
                  onChange={(e) => setDaysLimit(e.target.value)}
                  placeholder="Enter number of days"
                />
              </div>

              <div className="mb-4">
                <p className="mb-2">
                  Does the employee's supervisor need to approve every
                  regularization request?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      checked={supervisorApproval}
                      onChange={() => setSupervisorApproval(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={!supervisorApproval}
                      onChange={() => setSupervisorApproval(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2">
                  Should the admin receive a notification every time an employee
                  regularizes?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      checked={adminNotification}
                      onChange={() => setAdminNotification(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={!adminNotification}
                      onChange={() => setAdminNotification(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">
                  Should the supervisor receive a notification every time an
                  employee regularizes?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      checked={supervisorNotification}
                      onChange={() => setSupervisorNotification(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={!supervisorNotification}
                      onChange={() => setSupervisorNotification(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="">
          <div>
            <p className="text-lg font-semibold mb-2">
              Can supervisors regularize their subordinate's attendance entries?
            </p>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  checked={canSupervisorRegularize}
                  onChange={() => setCanSupervisorRegularize(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={!canSupervisorRegularize}
                  onChange={() => setCanSupervisorRegularize(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {canSupervisorRegularize && (
            <div className="border-gray-300 border my-2 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold mb-4">
                Supervisor Regularization Settings
              </h2>

              <div>
                <p className="mb-2">
                  Should the admin receive a notification every time a
                  supervisor regularizes on behalf of an employee?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      checked={adminNotificationForSupervisor}
                      onChange={() => setAdminNotificationForSupervisor(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={!adminNotificationForSupervisor}
                      onChange={() => setAdminNotificationForSupervisor(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">
                  Should the employee receive a notification every time a
                  supervisor regularizes on behalf of employee?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      checked={employeeNotificationForSupervisor}
                      onChange={() =>
                        setEmployeeNotificationForSupervisor(true)
                      }
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={!employeeNotificationForSupervisor}
                      onChange={() =>
                        setEmployeeNotificationForSupervisor(false)
                      }
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-lg font-semibold mb-2">
              Can the admin edit regularize attendance entries?
            </p>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  checked={canAdminRegularize}
                  onChange={() => setCanAdminRegularize(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={!canAdminRegularize}
                  onChange={() => setCanAdminRegularize(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {canAdminRegularize && (
            <div className="border-gray-300 border p-6 my-2 rounded-lg space-y-4">
              <h2 className="text-xl font-bold mb-4">
                Admin Regularization Settings
              </h2>

              <div>
                <p className="mb-2">
                  Should the supervisor receive a notification every time an
                  admin regularizes on behalf of employee?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={supervisorNotificationForAdmin}
                      onChange={() => setSupervisorNotificationForAdmin(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-red-500"
                      checked={!supervisorNotificationForAdmin}
                      onChange={() => setSupervisorNotificationForAdmin(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">
                  Should the employee receive a notification every time an admin
                  regularizes on behalf of employee?
                </p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={employeeNotificationForAdmin}
                      onChange={() => setEmployeeNotificationForAdmin(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-red-500"
                      checked={!employeeNotificationForAdmin}
                      onChange={() => setEmployeeNotificationForAdmin(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Should weekly email notification for missing check in/check out be
              sent?
            </h2>
            <p className="text-sm text-gray-600">
              Note: Email notification will be sent out every week on Monday.
            </p>
            <div className="space-y-2">
              {[
                { value: "none", label: "Don't notify" },
                {
                  value: "checkout",
                  label:
                    "Send notification when only check out is missing on a working day",
                },
                {
                  value: "both",
                  label:
                    "Send notification when both check in and check out are missing on a working day",
                },
                {
                  value: "either",
                  label:
                    "Send notification when either check out is missing or there is no entry on a working day",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={weeklyNotification === option.value}
                    onChange={() => setWeeklyNotification(option.value)}
                    className={`form-radio ${
                      option.value === "both"
                        ? "text-orange-500"
                        : "text-blue-600"
                    }`}
                  />
                  <span
                  // className={option.value === "both" ? "text-blue-500" : ""}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {weeklyNotification !== "none" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Who should receive weekly email notification for missing check
                in/check out?
              </h2>
              <div className="space-y-2">
                {["Admin", "Supervisor", "Employees"].map((recipient) => (
                  <label
                    key={recipient}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={weeklyRecipients[recipient.toLowerCase()]}
                      onChange={() =>
                        handleWeeklyRecipientChange(recipient.toLowerCase())
                      }
                      // className={`form-checkbox ${
                      //   recipient === "Employees"
                      //     ? "text-orange-500"
                      //     : "text-blue-600"
                      // }`}
                    />
                    <span
                    // className={
                    //   recipient === "Employees" ? "text-orange-500" : ""
                    // }
                    >
                      {recipient}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 mt-5">
            <h2 className="text-lg font-semibold">
              Should monthly email notification for missing check in/check out
              be sent?
            </h2>
            <p className="text-sm text-gray-600">
              Note: Email notification will be sent out on 1st day of a new
              attendance cycle.
            </p>
            <div className="space-y-2">
              {[
                { value: "none", label: "Don't notify" },
                {
                  value: "checkout",
                  label:
                    "Send notification when only check out is missing on a working day",
                },
                {
                  value: "both",
                  label:
                    "Send notification when both check in and check out are missing on a working day",
                },
                {
                  value: "either",
                  label:
                    "Send notification when either check out is missing or there is no entry on a working day",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={monthlyNotification === option.value}
                    onChange={() => setMonthlyNotification(option.value)}
                    // className={`form-radio ${
                    //   option.value === "both"
                    //     ? "text-orange-500"
                    //     : "text-blue-600"
                    // }`}
                  />
                  <span
                  // className={option.value === "both" ? "text-orange-500" : ""}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {monthlyNotification !== "none" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Who should receive monthly email notification for missing check
                in/check out?
              </h2>
              <div className="space-y-2">
                {["Admin", "Supervisor", "Employees"].map((recipient) => (
                  <label
                    key={recipient}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={monthlyRecipients[recipient.toLowerCase()]}
                      onChange={() =>
                        handleMonthlyRecipientChange(recipient.toLowerCase())
                      }
                      // className={`form-checkbox ${
                      //   recipient === "Employees"
                      //     ? "text-orange-500"
                      //     : "text-blue-600"
                      // }`}
                    />
                    <span
                    // className={
                    //   recipient === "Employees" ? "text-orange-500" : ""
                    // }
                    >
                      {recipient}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Should daily email notification for employees who have not checked
              in today be sent?
            </h2>
            <p className="text-sm text-gray-600">
              Note: Email notification will be sent out every day maximum two
              times if the employee has not checked in for the day.
            </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="none"
                  checked={notificationSetting === "none"}
                  onChange={() => setNotificationSetting("none")}
                  className="form-radio text-blue-600"
                />
                <span>Don't notify</span>
              </label>
              <label className="flex items-start space-x-2">
                <input
                  type="radio"
                  value="grace"
                  checked={notificationSetting === "grace"}
                  onChange={() => setNotificationSetting("grace")}
                  // className="form-radio text-orange-500 mt-1"
                />
                <span
                //  className="text-orange-500"
                >
                  Notify once after the shift grace period. Shift grace period
                  starts from the shift start time & extends till the duration
                  mentioned below
                </span>
              </label>
            </div>
          </div>

          {notificationSetting === "grace" && (
            <>
              <div className="flex flex-col gap-2 my-5 w-72">
                <label
                  htmlFor="gracePeriod"
                  className="block text-sm font-medium text-gray-700"
                >
                  What is the shift grace period in minutes?
                </label>
                <select
                  id="gracePeriod"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300  sm:text-sm rounded-md"
                >
                  {[15, 30, 45, 60].map((minutes) => (
                    <option key={minutes} value={minutes.toString()}>
                      {minutes}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  Who should receive weekly email notification for missing check
                  in/check out?
                </h2>
                <div className="space-y-2">
                  {["Admin", "Supervisor", "Employees"].map((recipient) => (
                    <label
                      key={recipient}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={recipients[recipient.toLowerCase()]}
                        onChange={() =>
                          handleRecipientChange(recipient.toLowerCase())
                        }
                        // className="form-checkbox text-orange-500"
                      />
                      <span
                      //  className="text-orange-500"
                      >
                        {recipient}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
              onClick={handleBack}
              disabled={false} // Disable back button on first step if needed
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleNextStep}
            >
              Save & Proceed
            </button>
          </div>
        </div>
      </div>
      {showLocationModal && (
        <AddLocationModal onClose={() => setShowLocationModal(false)} />
      )}
    </div>
  );
}

export default AttendanceRegularization;
