import React, { useEffect, useState } from "react";
import UserDetailsList from "./UserDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  editNewsEmployeePermission,
  getNewsEmployeePermission,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const NewsFeedPermission = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shareWithCompany: false,
    shareWithLocation: false,
    shareWithOtherLocation: false,
    shareWithSpecificPeople: false,
  });
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [id, setId] = useState("");
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchPermission = async () => {
    try {
      const permissionRes = await getNewsEmployeePermission(hrmsOrgId);
      if (permissionRes.length > 0) {
        const permission = permissionRes[0]; // Access the first object in the array
        setId(permission.id);
        setFormData({
          ...formData,
          shareWithCompany: permission.share_update_company || false,
          shareWithLocation: permission.share_update_location || false,
          shareWithOtherLocation:
            permission.share_update_other_location || false,
          shareWithSpecificPeople:
            permission.share_update_specific_people_company || false,
        });
      } else {
        console.log("No permission data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  const handleEditNewsPermission = async () => {
    const postData = new FormData();
    postData.append("share_update_company", formData.shareWithCompany);
    postData.append("share_update_location", formData.shareWithLocation);
    postData.append("organization", hrmsOrgId);
    postData.append(
      "share_update_other_location",
      formData.shareWithOtherLocation
    );
    postData.append(
      "share_update_specific_people_company",
      formData.shareWithSpecificPeople
    );
    try {
      const res = await editNewsEmployeePermission(id, postData);
      setIsEditing(false);
      toast.success("Permission updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-5 ml-20">
      <UserDetailsList />
      <div className="p-6 bg-white w-full rounded-md ">
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6">
              Employee News Feed Permission
            </h2>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleEditNewsPermission}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            )}
          </div>
          <label className="block text-gray-700 font-medium">
            Can employees share updates with people in their Company?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="shareWithCompany"
                checked={formData.shareWithCompany === true}
                onChange={() =>
                  setFormData({ ...formData, shareWithCompany: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shareWithCompany"
                checked={formData.shareWithCompany === false}
                onChange={() =>
                  setFormData({ ...formData, shareWithCompany: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Can employees share updates with people in their Location?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="shareWithLocation"
                checked={formData.shareWithLocation === true}
                onChange={() =>
                  setFormData({ ...formData, shareWithLocation: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shareWithLocation"
                checked={formData.shareWithLocation === false}
                onChange={() =>
                  setFormData({ ...formData, shareWithLocation: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Can employees share updates with people in other Locations?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="shareWithOtherLocation"
                checked={formData.shareWithOtherLocation === true}
                onChange={() =>
                  setFormData({ ...formData, shareWithOtherLocation: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shareWithOtherLocation"
                checked={formData.shareWithOtherLocation === false}
                onChange={() =>
                  setFormData({ ...formData, shareWithOtherLocation: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Can employees share updates with specific people in their Company?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="shareWithSpecificPeople"
                value="Yes"
                checked={formData.shareWithSpecificPeople === true}
                onChange={() =>
                  setFormData({ ...formData, shareWithSpecificPeople: true })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shareWithSpecificPeople"
                checked={formData.shareWithSpecificPeople === false}
                onChange={() =>
                  setFormData({ ...formData, shareWithSpecificPeople: false })
                }
                className="mr-1"
                disabled={!isEditing}
              />
              No
            </label>
          </div>
        </div>
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col mt-4 mr-2 bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
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
                    join login to the My Citi Life software. For e.g., External
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

export default NewsFeedPermission;
