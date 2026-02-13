import React, { useEffect, useState } from "react";
// import TicketSetupPage from "../SubPages/TicketSetupPage"; // Original import
import { BiEdit } from "react-icons/bi";
import Select from "react-select";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { FaClone, FaTrash } from "react-icons/fa";

import { RiContactsBook2Line } from "react-icons/ri";
import {
  deleteEscalationRule,
  getHelpDeskCategoriesSetup,
  getHelpDeskEscalationSetup,
  getSetupUsers,
  postHelpDeskEscalationSetup,
  postHelpDeskResolutionEscalationSetup,
} from "../../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const initialResolutionEscalationData = {
  E1: {
    users: [],
    p1: { days: "", hrs: "", min: "" },
    p2: { days: "", hrs: "", min: "" },
    p3: { days: "", hrs: "", min: "" },
    p4: { days: "", hrs: "", min: "" },
    p5: { days: "", hrs: "", min: "" },
  },
  E2: {
    users: [],
    p1: { days: "", hrs: "", min: "" },
    p2: { days: "", hrs: "", min: "" },
    p3: { days: "", hrs: "", min: "" },
    p4: { days: "", hrs: "", min: "" },
    p5: { days: "", hrs: "", min: "" },
  },
  E3: {
    users: [],
    p1: { days: "", hrs: "", min: "" },
    p2: { days: "", hrs: "", min: "" },
    p3: { days: "", hrs: "", min: "" },
    p4: { days: "", hrs: "", min: "" },
    p5: { days: "", hrs: "", min: "" },
  },
  E4: {
    users: [],
    p1: { days: "", hrs: "", min: "" },
    p2: { days: "", hrs: "", min: "" },
    p3: { days: "", hrs: "", min: "" },
    p4: { days: "", hrs: "", min: "" },
    p5: { days: "", hrs: "", min: "" },
  },
  E5: {
    users: [],
    p1: { days: "", hrs: "", min: "" },
    p2: { days: "", hrs: "", min: "" },
    p3: { days: "", hrs: "", min: "" },
    p4: { days: "", hrs: "", min: "" },
    p5: { days: "", hrs: "", min: "" },
  },
};

const TicketEscalationSetup = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [catAdded, setAdded] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);
  const openModal3 = () => setShowModal3(true);
  const closeModal3 = () => setShowModal3(false);

  const [editingRule, setEditingRule] = useState(null);
  const [cloningRule, setCloningRule] = useState(null);
  const [editingResolutionRule, setEditingResolutionRule] = useState(null);

  const [editResponseData, setEditResponseData] = useState({
    id: null,
    category: null,
    escalations: {},
  });
  const [editResolutionData, setEditResolutionData] = useState({
    id: null,
    category: null,
    escalations: initialResolutionEscalationData,
  });

  const [page, setPage] = useState("Response");
  const themeColor = useSelector((state) => state.theme.color);
  const [categories, setCategories] = useState([]);
  const [resEscalationAdded, setResEscalationAdded] = useState(false);
  const [resolutionEscalationAdded, setResolutionEscalationAdded] =
    useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    categories: [],
    escalations: {
      E1: [],
      E2: [],
      E3: [],
      E4: [],
      E5: [],
    },
  });
  const [selectedResolutionOptions, setSelectedResolutionOptions] = useState({
    escalations: initialResolutionEscalationData,
  });
  const [responseEscalation, setResponseEscalation] = useState([]);
  const [resolutionEscalation, setResolutionEscalation] = useState([]);
  const [users, setUsers] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");

  /**
   * @param {object} time - {days, hrs, min}
   * @returns {number} Total minutes.
   */
  const convertToMinutes = ({ days, hrs, min }) => {
    const d = parseInt(days) || 0;
    const h = parseInt(hrs) || 0;
    const m = parseInt(min) || 0;
    return d * 24 * 60 + h * 60 + m;
  };

  /**
   * Converts total minutes to a formatted string.
   * @param {number} totalMinutes - Total minutes.
   * @returns {string} Formatted time string.
   */
  const formatTime = (totalMinutes) => {
    const minutes = parseInt(totalMinutes) || 0;
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const minutesLeft = minutes % 60;
    return `${days} day, ${hours} hr, ${minutesLeft} min`;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const catResp = await getHelpDeskCategoriesSetup();
        const transformedCategory = catResp.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(transformedCategory);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSetupUsers = async () => {
      try {
        const UsersResp = await getSetupUsers();
        const filteredUser = UsersResp.data;
        const transformedUsers = filteredUser.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEscalation = async () => {
      try {
        const escResp = await getHelpDeskEscalationSetup();
        const FilteredResponse = escResp.data.complaint_workers.filter(
          (res) => res.esc_type === "response",
        );
        const FilteredResolution = escResp.data.complaint_workers.filter(
          (res) => res.esc_type === "resolution",
        );
        setResponseEscalation(FilteredResponse);
        setResolutionEscalation(FilteredResolution);
      } catch (error) {
        console.log(error);
      }
    };

    if (resEscalationAdded || resolutionEscalationAdded) {
      fetchEscalation();
      setResEscalationAdded(false);
      setResolutionEscalationAdded(false);
    }

    fetchAllCategories();
    fetchEscalation();
    fetchSetupUsers();
  }, [resEscalationAdded, resolutionEscalationAdded]);

  const openEditModal = (rule) => {
    setEditingRule(rule);

    const initialEscalations = {
      E1: [],
      E2: [],
      E3: [],
      E4: [],
      E5: [],
    };

    rule.escalations.forEach((level) => {
      const userIds = level.escalate_to_users_ids || [];
      const userNames = level.escalate_to_users_names || [];

      initialEscalations[level.name] = userIds.map((id, index) => {
        const globalUser = users.find((u) => u.value === id);

        return {
          value: id,
          label:
            userNames[index] ||
            (globalUser ? globalUser.label : `User ID ${id}`),
        };
      });
    });

    setEditResponseData({
      id: rule.id,
      category: {
        value: rule.category?.id,
        label: rule.category?.name,
      },
      escalations: initialEscalations,
    });
    setShowModal(true);
  };

  const closeEditModal = () => setEditingRule(null);
  const openCloneModal = (rule) => setCloningRule(rule);
  const closeCloneModal = () => setCloningRule(null);

  const openResolutionEditModal = (rule) => {
    setEditingResolutionRule(rule);
    const initialEscalations = JSON.parse(
      JSON.stringify(initialResolutionEscalationData),
    );

    rule.escalations.forEach((level) => {
      const levelName = level.name;

      const userIds = level.escalate_to_users_ids || [];
      const userNames = level.escalate_to_users_names || [];

      const levelUsers =
        userIds.map((id, index) => {
          const globalUser = users.find((u) => u.value === id);

          return {
            value: id,
            label:
              userNames[index] ||
              (globalUser ? globalUser.label : `User ID ${id}`),
          };
        }) || [];

      const timeFields = {};
      ["p1", "p2", "p3", "p4", "p5"].forEach((pField) => {
        const totalMinutes = level[pField] || 0;
        const days = Math.floor(totalMinutes / (24 * 60));
        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        const min = totalMinutes % 60;
        timeFields[pField] = {
          days: String(days),
          hrs: String(hours),
          min: String(min),
        };
      });

      initialEscalations[levelName] = {
        users: levelUsers,
        ...timeFields,
      };
    });

    setEditResolutionData({
      id: rule.id,
      category: { value: rule.category?.id, label: rule.category?.name },
      escalations: initialEscalations,
    });
  };
  const closeResolutionEditModal = () => setEditingResolutionRule(null);

  const handleChange = (selected, type, level = null) => {
    if (type === "categories") {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        categories: selected,
      }));
    } else if (type === "escalations" && level) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        escalations: {
          ...prevOptions.escalations,
          [level]: selected,
        },
      }));
    }
  };

  // Handler for Resolution Escalation form (Escalation Users select)
  const handleUserChange = (selected, level) => {
    setSelectedResolutionOptions((prev) => ({
      ...prev,
      escalations: {
        ...prev.escalations,
        [level]: {
          ...prev.escalations[level],
          users: selected,
        },
      },
    }));
  };

  // Handler for Resolution Escalation form (P1-P5 time inputs)
  const handlePChange = (value, level, pField, fieldType) => {
    // Only allow numeric input
    if (value && !/^\d*$/.test(value)) return;

    setSelectedResolutionOptions((prevState) => ({
      ...prevState,
      escalations: {
        ...prevState.escalations,
        [level]: {
          ...prevState.escalations[level],
          [pField]: {
            ...prevState.escalations[level][pField],
            [fieldType]: value,
          },
        },
      },
    }));
  };

  // --- Change Handlers for Edit Modals ---

  // Handler for Response Escalation Edit Modal select inputs (Users only)
  const handleEditResponseUserChange = (selected, level) => {
    setEditResponseData((prev) => ({
      ...prev,
      escalations: {
        ...prev.escalations,
        [level]: selected,
      },
    }));
  };

  // Handler for Resolution Escalation Edit Modal (Escalation Users select)
  const handleEditResolutionUserChange = (selected, level) => {
    setEditResolutionData((prev) => ({
      ...prev,
      escalations: {
        ...prev.escalations,
        [level]: {
          ...prev.escalations[level],
          users: selected,
        },
      },
    }));
  };

  // Handler for Resolution Escalation Edit Modal (P1-P5 time inputs)
  const handleEditResolutionTimeChange = (value, level, pField, fieldType) => {
    // Only allow numeric input
    if (value && !/^\d*$/.test(value)) return;

    setEditResolutionData((prevState) => ({
      ...prevState,
      escalations: {
        ...prevState.escalations,
        [level]: {
          ...prevState.escalations[level],
          [pField]: {
            ...prevState.escalations[level][pField],
            [fieldType]: value,
          },
        },
      },
    }));
  };

  // --- API Call Handlers (Create/Update/Delete) ---

  const handleSaveResponseEscalation = async () => {
    if (selectedOptions.categories.length === 0) {
      return toast.error("Please select at least one Category");
    }
    toast.loading("Creating Response Escalation. Please wait!");
    const formData = new FormData();
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "response");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");

    selectedOptions.categories.forEach((category) => {
      formData.append("category_ids[]", category.value);
    });

    Object.entries(selectedOptions.escalations).forEach(([level, users]) => {
      if (users.length > 0) {
        // Only send levels that have users selected
        formData.append(
          `escalation_matrix[${level.toLowerCase()}][name]`,
          level,
        );
        users.forEach((user) => {
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
            user.value,
          );
        });
      }
    });

    try {
      await postHelpDeskEscalationSetup(formData);
      setResEscalationAdded(true);
      toast.dismiss();
      toast.success("Response Escalation Created Successfully");
      // Reset form options
      setSelectedOptions({
        categories: [],
        escalations: { E1: [], E2: [], E3: [], E4: [], E5: [] },
      });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to create Response Escalation.");
    }
  };

  const handleUpdateResponseEscalation = async () => {
    if (!editResponseData.id)
      return toast.error("Rule ID not found for update.");
    toast.loading("Updating Response Escalation. Please wait!");

    const formData = new FormData();
    formData.append("id", editResponseData.id); // Crucial for update
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "response");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");

    // Only one category is supported in the current edit flow.
    formData.append("category_ids[]", editResponseData.category.value);

    Object.entries(editResponseData.escalations).forEach(([level, users]) => {
      if (users && users.length > 0) {
        formData.append(
          `escalation_matrix[${level.toLowerCase()}][name]`,
          level,
        );
        users.forEach((user) => {
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
            user.value,
          );
        });
      }
    });

    try {
      // Assuming postHelpDeskEscalationSetup handles PUT/PATCH when ID is present
      await postHelpDeskEscalationSetup(formData);
      setResEscalationAdded(true);
      closeEditModal();
      toast.dismiss();
      toast.success("Response Escalation Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to update Response Escalation.");
    }
  };

  const handleSaveResolutionEscalation = async () => {
    if (selectedOptions.categories.length === 0) {
      return toast.error("Please select at least one Category");
    }
    toast.loading("Creating Resolution Escalation. Please wait!");
    const formData = new FormData();
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "resolution");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");

    selectedOptions.categories.forEach((category) => {
      formData.append("category_ids[]", category.value);
    });

    Object.entries(selectedResolutionOptions.escalations).forEach(
      ([level, data]) => {
        // Check if there's any user or time setting for this level
        const hasUsers = data.users.length > 0;
        const hasTime = ["p1", "p2", "p3", "p4", "p5"].some(
          (pField) => convertToMinutes(data[pField]) > 0,
        );

        if (hasUsers || hasTime) {
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][name]`,
            level,
          );

          data.users.forEach((user) => {
            formData.append(
              `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
              user.value,
            );
          });

          ["p1", "p2", "p3", "p4", "p5"].forEach((pField) => {
            const totalMinutes = convertToMinutes(data[pField]);
            formData.append(
              `escalation_matrix[${level.toLowerCase()}][${pField}]`,
              totalMinutes,
            );
          });
        }
      },
    );

    try {
      await postHelpDeskResolutionEscalationSetup(formData);
      setResolutionEscalationAdded(true);
      toast.dismiss();
      toast.success("Resolution Escalation Created Successfully");
      // Reset form options
      setSelectedOptions((prevData) => ({
        ...prevData,
        categories: [],
      }));
      setSelectedResolutionOptions({
        escalations: initialResolutionEscalationData,
      });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to create Resolution Escalation.");
    }
  };

  const handleUpdateResolutionEscalation = async () => {
    if (!editResolutionData.id)
      return toast.error("Rule ID not found for update.");
    toast.loading("Updating Resolution Escalation. Please wait!");

    const formData = new FormData();
    formData.append("id", editResolutionData.id); // Crucial for update
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "resolution");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");

    // Only one category is supported in the current edit flow.
    formData.append("category_ids[]", editResolutionData.category.value);

    Object.entries(editResolutionData.escalations).forEach(([level, data]) => {
      // Check if there's any user or time setting for this level
      const hasUsers = data.users.length > 0;
      const hasTime = ["p1", "p2", "p3", "p4", "p5"].some(
        (pField) => convertToMinutes(data[pField]) > 0,
      );

      if (hasUsers || hasTime) {
        formData.append(
          `escalation_matrix[${level.toLowerCase()}][name]`,
          level,
        );

        data.users.forEach((user) => {
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
            user.value,
          );
        });

        ["p1", "p2", "p3", "p4", "p5"].forEach((pField) => {
          const totalMinutes = convertToMinutes(data[pField]);
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][${pField}]`,
            totalMinutes,
          );
        });
      }
    });

    try {
      // Assuming postHelpDeskResolutionEscalationSetup handles PUT/PATCH when ID is present
      await postHelpDeskResolutionEscalationSetup(formData);
      setResolutionEscalationAdded(true);
      closeResolutionEditModal();
      toast.dismiss();
      toast.success("Resolution Escalation Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to update Resolution Escalation.");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this escalation rule?")
    ) {
      return;
    }
    try {
      toast.loading("Deleting Escalation Rule. Please wait!");
      await deleteEscalationRule(id);
      toast.dismiss();
      setResEscalationAdded(true); // Trigger re-fetch
      toast.success("Escalation Rule Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to delete Escalation Rule.");
    }
  };

  // --- JSX Rendering ---

  return (
    <div className="w-full my-2 flex overflow-hidden flex-col">
      {/* Tab Switcher */}
      <div className="flex w-full">
        <div className=" flex gap-2 p-1 pb-0 border-b border-gray-300 w-full">
          <h2
            className={`p-1 ${
              page === "Response" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Response")}
          >
            Response Escalation
          </h2>
          <h2
            className={`p-1 ${
              page === "Resolution" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Resolution")}
          >
            Resolution Escalation
          </h2>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {/* === Response Escalation Tab === */}
        {page === "Response" && (
          <div className=" mt-2 px-2">
            {/* --- Response Escalation Setup Form (Create) --- */}
            <div className="flex flex-col my-2">
              <Select
                id="categories"
                isMulti
                value={selectedOptions.categories}
                onChange={(selected) => handleChange(selected, "categories")}
                options={categories}
                placeholder="Select Categories"
              />

              <div className=" w-full my-2">
                <table className=" w-full border-collapse">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="border border-gray-300  px-4 py-2 text-white">
                        Levels
                      </th>
                      <th className="border border-gray-300  px-4 py-2 text-white">
                        Escalation To
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {["E1", "E2", "E3", "E4", "E5"].map((level) => (
                      <tr key={level}>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {level}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Select
                            id={`select-${level}`}
                            isMulti
                            value={selectedOptions.escalations[level]}
                            onChange={(selected) =>
                              handleChange(selected, "escalations", level)
                            }
                            options={users}
                            placeholder="Select Users"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                &nbsp;
                <div className="flex justify-center">
                  <button
                    className="font-semibold bg-black hover:text-white transition-all py-2 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    onClick={handleSaveResponseEscalation}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* --- Response Escalation List --- */}
            <div className="w-full">
              <div>
                {responseEscalation.map((category, index) => (
                  <div
                    key={category.id || index}
                    className="category-table my-4 border p-2 rounded-md shadow-sm"
                  >
                    <div className="flex gap-2 justify-between w-full border-b border-gray-300 pb-2 mb-2">
                      <p className="font-semibold ">
                        Rule {index + 1} - Category:{" "}
                        {category.category?.name || "N/A"}
                      </p>
                      <div className="flex gap-2 items-center text-xl">
                        <button
                          onClick={() => openEditModal(category)}
                          title="Edit Rule"
                        >
                          <BiEdit />
                        </button>
                        <button
                          onClick={() => openCloneModal(category)}
                          title="Clone Rule"
                        >
                          <FaClone />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          title="Delete Rule"
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <table className="table-auto w-full border-collapse border border-gray-200 rounded-md overflow-x-auto">
                      <thead className="bg-gray-900 rounded-md">
                        <tr>
                          <th
                            className="border border-gray-200 px-4 py-2 text-white"
                            style={{ width: "30%" }}
                          >
                            Levels
                          </th>
                          <th
                            className="border border-gray-200 px-4 py-2 text-white"
                            style={{ width: "70%" }}
                          >
                            Escalation To
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.escalations.map((level, levelIndex) => (
                          <tr key={levelIndex}>
                            <td
                              className="border border-gray-200 px-4 py-2 text-center font-medium"
                              style={{ width: "30%" }}
                            >
                              {level.name}
                            </td>
                            <td
                              className="border border-gray-200 px-4 py-2 text-sm"
                              style={{ width: "70%" }}
                            >
                              {Array.isArray(level.escalate_to_users_names)
                                ? level.escalate_to_users_names.join(", ")
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === Resolution Escalation Tab === */}
        {page === "Resolution" && (
          <div className=" m-2">
            {/* --- Resolution Escalation Setup Form (Create) --- */}
            <div className=" flex flex-col my-2 ">
              <Select
                isMulti
                noOptionsMessage={() => "Categories not available..."}
                onChange={(selected) => handleChange(selected, "categories")}
                options={categories}
                value={selectedOptions.categories}
                placeholder="Select Categories"
              />
              <div className=" w-full overflow-auto ">
                <table className="border-collapse rounded-sm w-full my-2 ">
                  <thead className="bg-gray-900">
                    <tr>
                      {[
                        "Levels",
                        "Escalation To",
                        "P1",
                        "P2",
                        "P3",
                        "P4",
                        "P5",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="border border-gray-300 text-white px-4 py-2"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {["E1", "E2", "E3", "E4", "E5"].map((level) => (
                      <tr key={level}>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {level}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 min-w-60">
                          <Select
                            isMulti
                            value={
                              selectedResolutionOptions.escalations[level].users
                            }
                            onChange={(selected) =>
                              handleUserChange(selected, level)
                            }
                            options={users}
                            placeholder="Select Users"
                          />
                        </td>
                        {["p1", "p2", "p3", "p4", "p5"].map((pField) => (
                          <td
                            key={pField}
                            className="border border-gray-300 px-2 py-2"
                          >
                            <div className="flex gap-1 justify-center">
                              <input
                                type="text"
                                className="w-12 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                placeholder="D"
                                value={
                                  selectedResolutionOptions.escalations[level][
                                    pField
                                  ]?.days || ""
                                }
                                onChange={(e) =>
                                  handlePChange(
                                    e.target.value,
                                    level,
                                    pField,
                                    "days",
                                  )
                                }
                                pattern="[0-9]*"
                              />
                              <input
                                type="text"
                                className="w-12 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                placeholder="H"
                                pattern="[0-9]*"
                                value={
                                  selectedResolutionOptions.escalations[level][
                                    pField
                                  ]?.hrs || ""
                                }
                                onChange={(e) =>
                                  handlePChange(
                                    e.target.value,
                                    level,
                                    pField,
                                    "hrs",
                                  )
                                }
                              />
                              <input
                                type="text"
                                className="w-12 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                placeholder="M"
                                pattern="[0-9]*"
                                value={
                                  selectedResolutionOptions.escalations[level][
                                    pField
                                  ]?.min || ""
                                }
                                onChange={(e) =>
                                  handlePChange(
                                    e.target.value,
                                    level,
                                    pField,
                                    "min",
                                  )
                                }
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center my-2">
                <button
                  className=" font-semibold bg-black hover:text-white transition-all px-4 p-2 mt-3 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  onClick={handleSaveResolutionEscalation}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* --- Resolution Escalation List --- */}
            <div className="overflow-x-scroll w-full">
              <div>
                {resolutionEscalation.map((category, index) => (
                  <div
                    key={category.id || index}
                    className="category-table my-4 border p-2 rounded-md shadow-sm"
                  >
                    <div className="flex gap-2 justify-between w-full border-b birder-gray-300 pb-2 mb-2">
                      <p className="font-semibold ">
                        Rule {index + 1} - Category:{" "}
                        {category.category?.name || "N/A"}
                      </p>
                      <div className="flex gap-4 items-center px-4 text-xl">
                        <button
                          onClick={() => openResolutionEditModal(category)}
                          title="Edit Rule"
                        >
                          <BiEdit />
                        </button>
                        <button
                          onClick={() => openCloneModal(category)}
                          title="Clone Rule"
                        >
                          <FaClone />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-500"
                          title="Delete Rule"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <table className="table-auto w-full border-collapse border border-gray-200 my-4 rounded-md overflow-x-auto ">
                      <thead
                        style={{ background: themeColor }}
                        className="bg-gray-100 rounded-md"
                      >
                        <tr>
                          <th className="border border-gray-200 px-4 py-2 text-sm text-white">
                            Category
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            Levels
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            Escalation To
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P1 (D/H/M)
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P2 (D/H/M)
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P3 (D/H/M)
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P4 (D/H/M)
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P5 (D/H/M)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.escalations.map((level, levelIndex) => (
                          <tr key={levelIndex}>
                            {levelIndex === 0 && (
                              <td
                                className="border border-gray-200 py-2 text-center font-medium"
                                rowSpan={category.escalations.length}
                                style={{ minWidth: "150px" }} // Adjusted for better viewing
                              >
                                {category.category.name}
                              </td>
                            )}
                            <td className="border border-gray-200 px-4 py-2 text-center font-medium">
                              {level.name}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 font-medium text-center text-sm">
                              {Array.isArray(level.escalate_to_users_names)
                                ? level.escalate_to_users_names.join(" , ")
                                : "N/A"}
                            </td>
                            {/* Displaying time for P1-P5 */}
                            {["p1", "p2", "p3", "p4", "p5"].map((pField) => (
                              <td
                                key={pField}
                                className="border border-gray-200 px-4 py-2 text-center text-xs font-medium min-w-36"
                              >
                                {formatTime(level[pField])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Response/Resolution Clone Modal (showModal1) --- */}
      {cloningRule && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-xl text-center font-semibold mb-4">
              Clone Rule - Category: {cloningRule.category?.name || "N/A"}
            </h2>
            <div className="grid grid-cols-1">
              {/* These selectors are static placeholders. In a real app, they'd control where the rule is cloned to. */}
              <div className="grid gap-2 w-full">
                <label htmlFor="clone-region">Regions</label>
                <select id="clone-region" name="" className="border p-2 ">
                  <option value="">Pune</option>
                  <option value="">kolkata</option>
                </select>
              </div>
              <div className="grid gap-2 mt-2 w-full">
                <label htmlFor="clone-zone">Zones</label>
                <select id="clone-zone" name="" className="border p-2 ">
                  <option value="">west zone</option>
                  <option value="">East</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
                // NOTE: Add actual cloning logic here
              >
                Clone
              </button>
              <button
                onClick={closeCloneModal}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Response Escalation Edit Modal (showModal) --- */}
      {editingRule && editingRule.esc_type === "response" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-2/3 max-w-xl">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold mb-2 text-center">
                Edit Response Escalation:{" "}
                {editResponseData.category?.label || "N/A"}
              </h1>

              <Select
                id="edit-category"
                value={editResponseData.category} // Display the current category
                onChange={(selected) =>
                  console.log(
                    "Category change not implemented for edit:",
                    selected,
                  )
                }
                options={categories}
                className="basic-multi-select w-full mb-4"
                classNamePrefix="select"
                placeholder="Select Categories"
                isDisabled={true} // Usually, category is fixed when editing a rule
              />

              <div className=" w-full mb-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                        Levels
                      </th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                        Escalation To
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Iterate over E1-E5 levels, using editResponseData for state */}
                    {["E1", "E2", "E3", "E4", "E5"].map((levelName) => (
                      <tr key={levelName}>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {levelName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <Select
                            isMulti
                            value={editResponseData.escalations[levelName]}
                            options={users}
                            onChange={(selected) =>
                              handleEditResponseUserChange(selected, levelName)
                            }
                            placeholder="Select Users" // Added placeholder as requested
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                &nbsp;
                <div className="flex gap-2 justify-center">
                  <button
                    className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                    onClick={handleUpdateResponseEscalation} // New Update Logic
                  >
                    Update
                  </button>
                  <button
                    onClick={closeEditModal}
                    className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Resolution Escalation Edit Modal (showModal3) --- */}
      {editingResolutionRule &&
        editingResolutionRule.esc_type === "resolution" && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-2/4 max-w-3xl">
              <h2 className="text-xl text-center font-semibold mb-4">
                Edit Resolution Escalation:{" "}
                {editResolutionData.category?.label || "N/A"}
              </h2>
              <div className=" flex flex-col gap-2 font-medium overflow-x-auto">
                <Select
                  value={editResolutionData.category}
                  options={categories}
                  className="basic-single-select w-64 mb-4"
                  placeholder="Select Category"
                  isDisabled={true} // Category is fixed when editing a rule
                />

                <div>
                  <table className="border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-white">
                          Levels
                        </th>
                        <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-white">
                          Escalation To
                        </th>
                        {["P1", "P2", "P3", "P4", "P5"].map((p) => (
                          <th
                            key={p}
                            className="border border-gray-300 bg-gray-100 px-4 py-2 text-white"
                          >
                            {p} (D/H/M)
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Iterate over E1-E5 levels, using editResolutionData for state */}
                      {["E1", "E2", "E3", "E4", "E5"].map((levelName) => (
                        <tr key={levelName}>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {levelName}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 min-w-48">
                            <Select
                              isMulti
                              value={
                                editResolutionData.escalations[levelName]
                                  ?.users || []
                              }
                              onChange={(selected) =>
                                handleEditResolutionUserChange(
                                  selected,
                                  levelName,
                                )
                              }
                              options={users}
                              placeholder="Select Users" // Added placeholder
                            />
                          </td>
                          {/* P1-P5 inputs for editing */}
                          {["p1", "p2", "p3", "p4", "p5"].map((pField) => {
                            const timeData = editResolutionData.escalations[
                              levelName
                            ]?.[pField] || { days: "", hrs: "", min: "" };

                            return (
                              <td
                                key={pField}
                                className="border border-gray-300 px-2 py-2"
                              >
                                <div className="flex gap-1 justify-center">
                                  <input
                                    type="text"
                                    className="w-10 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                    placeholder="D"
                                    value={timeData.days}
                                    onChange={(e) =>
                                      handleEditResolutionTimeChange(
                                        e.target.value,
                                        levelName,
                                        pField,
                                        "days",
                                      )
                                    }
                                    pattern="[0-9]*"
                                  />
                                  <input
                                    type="text"
                                    className="w-10 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                    placeholder="H"
                                    value={timeData.hrs}
                                    onChange={(e) =>
                                      handleEditResolutionTimeChange(
                                        e.target.value,
                                        levelName,
                                        pField,
                                        "hrs",
                                      )
                                    }
                                    pattern="[0-9]*"
                                  />
                                  <input
                                    type="text"
                                    className="w-10 border border-gray-300 rounded-sm px-1 py-1 text-sm text-center"
                                    placeholder="M"
                                    value={timeData.min}
                                    onChange={(e) =>
                                      handleEditResolutionTimeChange(
                                        e.target.value,
                                        levelName,
                                        pField,
                                        "min",
                                      )
                                    }
                                    pattern="[0-9]*"
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2 justify-center mt-4">
                  <button
                    className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                    onClick={handleUpdateResolutionEscalation} // New Update Logic
                  >
                    Update
                  </button>
                  <button
                    onClick={closeResolutionEditModal}
                    className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TicketEscalationSetup;
