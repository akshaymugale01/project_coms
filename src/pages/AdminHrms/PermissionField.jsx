import React, { useEffect, useState } from "react";
import UserDetailsList from "./UserDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { editEmployeePermission, getEmployeePermission } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const PermissionsField = () => {
  const [isEditing, setIsEditing] = useState(false);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [formData, setFormData] = useState({
    canSeeDirectory: false,
    familyInfoAccess: false,
    addressInfoAccess: false,
    basicInfoAccess: false,
    twoFactorAuth: false,
    phone: false,
    email: false,
    branchLocation: false,
    designation: false,
  });

  const [id, setId] = useState("");
  const handleSubmit = async () => {
    const postData = new FormData();
    postData.append("access_address_information", formData.addressInfoAccess);
    postData.append("access_basic_information", formData.basicInfoAccess);
    postData.append("web_portal_visible_branch", formData.branchLocation);
    postData.append("emp_see_web_portal", formData.canSeeDirectory);
    postData.append("web_portal_visible_designation", formData.designation);
    postData.append("web_portal_visible_email", formData.email);
    postData.append("access_family_information", formData.familyInfoAccess);
    postData.append("web_portal_visible_phone", formData.phone);
    postData.append("organization", hrmsOrgId);
    postData.append(
      "two_factor_authentication_applicable",
      formData.twoFactorAuth
    );
    try {
      const res = await editEmployeePermission(id, postData);
      setIsEditing(false);
      toast.success("Permission updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissionRes = await getEmployeePermission(hrmsOrgId);
      if (permissionRes.length > 0) {
        const permission = permissionRes[0]; // Access the first object in the array
        setId(permission.id);
        setFormData({
          ...formData,
          addressInfoAccess: permission.access_address_information || false,
          basicInfoAccess: permission.access_basic_information || false,
          branchLocation: permission.web_portal_visible_branch || false,
          canSeeDirectory: permission.emp_see_web_portal || false,
          designation: permission.web_portal_visible_designation || false,
          email: permission.web_portal_visible_email || false,
          familyInfoAccess: permission.access_family_information || false,
          phone: permission.web_portal_visible_phone || false,
          twoFactorAuth:
            permission.two_factor_authentication_applicable || false,
        });
      } else {
        console.log("No permission data found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="flex ml-20">
      <UserDetailsList />
      <div
        onSubmit={handleSubmit}
        className="p-6 w-2/3 bg-white m-1 rounded-md "
      >
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6">Employee Permission</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            )}
          </div>
          <label className="block text-gray-700 font-medium">
            Is two-factor authentication applicable for employees?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth === true}
                onChange={() =>
                  setFormData({ ...formData, twoFactorAuth: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth === false}
                onChange={() =>
                  setFormData({ ...formData, twoFactorAuth: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            What level of access do your employees have on their Basic
            Information?
          </label>
          <input
            type="radio"
            name="Basic"
            checked={formData.basicInfoAccess === false}
            onChange={() =>
              setFormData({ ...formData, basicInfoAccess: false })
            }
            className="mr-1"
            disabled={!isEditing}
          />
          &nbsp; Invisible&nbsp;&nbsp;
          <input
            type="radio"
            name="Basic"
            checked={formData.basicInfoAccess === true}
            onChange={() => setFormData({ ...formData, basicInfoAccess: true })}
            className="mr-1"
            disabled={!isEditing}
          />{" "}
          &nbsp;
          <label htmlFor="">View Only</label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            What level of access do your employees have on their Address
            Information?
          </label>
          <input
            type="radio"
            name="Address"
            checked={formData.addressInfoAccess === false}
            onChange={() =>
              setFormData({ ...formData, addressInfoAccess: false })
            }
            className="mr-1"
            disabled={!isEditing}
          />{" "}
          &nbsp; Invisible &nbsp;&nbsp;
          <input
            type="radio"
            name="Address"
            checked={formData.addressInfoAccess === true}
            onChange={() =>
              setFormData({ ...formData, addressInfoAccess: true })
            }
            className="mr-1"
            disabled={!isEditing}
          />{" "}
          &nbsp; View Only
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            What level of access do your employees have on their Family
            Information?
          </label>
          <input
            type="radio"
            name="Family"
            checked={formData.familyInfoAccess === false}
            onChange={() =>
              setFormData({ ...formData, familyInfoAccess: false })
            }
            className="mr-1"
            disabled={!isEditing}
          />
          &nbsp; Invisible &nbsp;&nbsp;
          <input
            type="radio"
            name="Family"
            checked={formData.familyInfoAccess === true}
            onChange={() =>
              setFormData({ ...formData, familyInfoAccess: true })
            }
            className="mr-1"
            disabled={!isEditing}
          />{" "}
          &nbsp; View Only
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Can employees see the Employee Directory in the employee web portal?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="canSeeDirectory"
                checked={formData.canSeeDirectory === true}
                onChange={() =>
                  setFormData({ ...formData, canSeeDirectory: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="canSeeDirectory"
                checked={formData.canSeeDirectory === false}
                onChange={() =>
                  setFormData({ ...formData, canSeeDirectory: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Which columns should be visible in the employee directory in the
            employee web portal?
          </label>
          <div className="flex flex-col">
            <label>
              <input
                type="checkbox"
                name="phone"
                checked={formData.phone}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    phone: !prevState.phone,
                  }))
                }
                className="mr-2"
                disabled={!isEditing}
              />
              Phone
            </label>
            <label>
              <input
                type="checkbox"
                name="email"
                checked={formData.email}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    email: !prevState.email,
                  }))
                }
                className="mr-2"
                disabled={!isEditing}
              />
              Email
            </label>
            <label>
              <input
                type="checkbox"
                name="branchLocation"
                checked={formData.branchLocation}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    branchLocation: !prevState.branchLocation,
                  }))
                }
                className="mr-2"
                disabled={!isEditing}
              />
              Branch Location
            </label>
            <label>
              <input
                type="checkbox"
                name="designation"
                checked={formData.designation}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    designation: !prevState.designation,
                  }))
                }
                className="mr-2"
                disabled={!isEditing}
              />
              Designation
            </label>
          </div>
        </div>
      </div>
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
                    You can add administrators and manage admin access rights
                    like IP restrictions, 2-factor authentication, etc{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also restrict access permission based on
                    departments, locations, etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can add and manage third party users and invite them to
                    join login to the Vibe Connect software. For e.g., External
                    auditor, external consultants, etc.{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                  You can view/edit/delete admin permissions at any time.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsField;
