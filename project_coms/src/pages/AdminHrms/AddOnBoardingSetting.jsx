import React, { useEffect, useState } from "react";
import WorkflowDetailsList from "./WorkFlowDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  editOnBoardingGeneralSetting,
  getOnBoardingGeneralSetting,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const AddOnboardingSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };

  const [formData, setFormData] = useState({
    letterGeneration: false,
    welcomeMessage: false,
    firstDayInfo: false,
    resources: false,
    onboardingChecklists: false,
    selfOnboarding: false,
    onboardingTabDisplayDays: "",
    canAccessBeforeJoining: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      canAccessBeforeJoining,
      onboardingTabDisplayDays,
      selfOnboarding,
      onboardingChecklists,
      resources,
      firstDayInfo,
      welcomeMessage,
      letterGeneration,
    });
  };
  const [id, setId] = useState("");
  const fetchGeneralSetting = async () => {
    try {
      const res = await getOnBoardingGeneralSetting(hrmsOrgId);
      if (res.length > 0) {
        const setting = res[0]; // Access the first object in the array
        setId(setting.id);
        setFormData({
          ...formData,
          canAccessBeforeJoining: setting.access_portal_before_joining,
          firstDayInfo: setting.first_day_information_activated,
          letterGeneration: setting.letter_generation_on_onboarding,
          onboardingChecklists: setting.onboarding_checklists_activated,
          onboardingTabDisplayDays: setting.onboarding_tab_display_duration,
          resources: setting.resources_activated,
          selfOnboarding: setting.self_onboarding_activated,
          welcomeMessage: setting.welcome_message_activated,
        });
      } else {
        console.log("No setting data found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGeneralSetting();
  }, []);

  const handleEditNewsPermission = async () => {
    const postData = new FormData();
    postData.append(
      "access_portal_before_joining",
      formData.canAccessBeforeJoining
    );
    postData.append(
      "onboarding_tab_display_duration",
      formData.onboardingTabDisplayDays
    );
    postData.append("self_onboarding_activated", formData.selfOnboarding);
    postData.append(
      "onboarding_checklists_activated",
      formData.onboardingChecklists
    );
    postData.append("resources_activated", formData.resources);
    postData.append("first_day_information_activated", formData.firstDayInfo);
    postData.append("welcome_message_activated", formData.welcomeMessage);
    postData.append(
      "letter_generation_on_onboarding",
      formData.letterGeneration
    );
    postData.append("organization", hrmsOrgId);
    try {
      const res = await editOnBoardingGeneralSetting(id, postData);
      setIsEditing(false);
      toast.success("General settings updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex ml-20">
      <WorkflowDetailsList />
      <div className="mt-5 w-2/3 p-6 bg-white rounded-lg ">
        {/* <h2 className="text-2xl font-bold mb-6">General Settings</h2> */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">General Settings</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Until Approved, can employee access Employee Portal before the
              joining date?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="accessYes"
                name="canAccessBeforeJoining"
                checked={formData.canAccessBeforeJoining === true}
                onChange={() =>
                  setFormData({ ...formData, canAccessBeforeJoining: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="accessYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="accessNo"
                name="canAccessBeforeJoining"
                checked={formData.canAccessBeforeJoining === false}
                onChange={() =>
                  setFormData({ ...formData, canAccessBeforeJoining: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="accessNo">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="onboardingTabDisplayDays"
            >
              For how long would you like to display the onboarding tab for the
              employee after the date of joining upon successful onboarding
              completion (upto 180 days)
            </label>
            <input
              id="onboardingTabDisplayDays"
              type="number"
              value={formData.onboardingTabDisplayDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  onboardingTabDisplayDays: e.target.value,
                })
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                !isEditing ? "bg-gray-200" : ""
              }`}
              readOnly={!isEditing}
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Do you want to activate Self-Onboarding?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="selfOnboardingYes"
                name="selfOnboarding"
                checked={formData.selfOnboarding === true}
                onChange={() =>
                  setFormData({ ...formData, selfOnboarding: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="selfOnboardingYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="selfOnboardingNo"
                name="selfOnboarding"
                checked={formData.selfOnboarding === false}
                onChange={() =>
                  setFormData({ ...formData, selfOnboarding: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="selfOnboardingNo">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Activate Onboarding Checklists?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="onboardingChecklistsYes"
                name="onboardingChecklists"
                checked={formData.onboardingChecklists === true}
                onChange={() =>
                  setFormData({ ...formData, onboardingChecklists: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="onboardingChecklistsYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="onboardingChecklistsNo"
                name="onboardingChecklists"
                checked={formData.onboardingChecklists === false}
                onChange={() =>
                  setFormData({ ...formData, onboardingChecklists: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="onboardingChecklistsNo">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Activate Resources?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="resourcesYes"
                name="resources"
                checked={formData.resources === true}
                onChange={() => setFormData({ ...formData, resources: true })}
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="resourcesYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="resourcesNo"
                name="resources"
                checked={formData.resources === false}
                onChange={() => setFormData({ ...formData, resources: false })}
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="resourcesNo">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Activate First Day Information
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="firstDayInfoYes"
                name="firstDayInfo"
                checked={formData.firstDayInfo === true}
                onChange={() =>
                  setFormData({ ...formData, firstDayInfo: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="firstDayInfoYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="firstDayInfoNo"
                name="firstDayInfo"
                checked={formData.firstDayInfo === false}
                onChange={() =>
                  setFormData({ ...formData, firstDayInfo: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="firstDayInfoNo">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Activate Welcome Message
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="welcomeMessageYes"
                name="welcomeMessage"
                checked={formData.welcomeMessage === true}
                onChange={() =>
                  setFormData({ ...formData, welcomeMessage: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="welcomeMessageYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="welcomeMessageNo"
                name="welcomeMessage"
                checked={formData.welcomeMessage === false}
                onChange={() =>
                  setFormData({ ...formData, welcomeMessage: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="welcomeMessageNo">No</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Do you want to activate letter generation at time of onboarding?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="letterGenerationYes"
                name="letterGeneration"
                checked={formData.letterGeneration === true}
                onChange={() =>
                  setFormData({ ...formData, letterGeneration: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="letterGenerationYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="letterGenerationNo"
                name="letterGeneration"
                checked={formData.letterGeneration === false}
                onChange={() =>
                  setFormData({ ...formData, letterGeneration: false })
                }
                className="mr-2"
                disabled={!isEditing}
              />
              <label htmlFor="letterGenerationNo">No</label>
            </div>
          </div>
        </form>
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
                    Onboarding settings allow you to configure your new employee
                    self-onboarding process, customize the welcome email and
                    allocate onboarding tasks to respective stakeholders. For
                    e.g., allocating tasks to new joinee like submission of
                    documents to the HR, etc, allocating tasks to stakeholders
                    (IT/HR/Admin) like issuing laptop, ID cards, employee
                    induction, etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can edit the tasks and categories as and when needed.
                    You can delete tasks and categories only if not assigned.{" "}
                  </li>
                </ul>
              </li>
              {/* <li>
                  <ul style={listItemStyle}>
                    <li>
You can add and manage third party users and invite them to join login to the My Citi Life software. For e.g., External auditor, external consultants, etc.                    </li>
                  </ul>
                </li> */}

              <li>
                <p>
                  <a href="#" className="text-blue-400">
                    Click Here{" "}
                  </a>
                  for detailed information.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnboardingSetting;
