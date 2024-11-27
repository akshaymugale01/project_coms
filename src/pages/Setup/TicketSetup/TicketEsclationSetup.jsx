import React, { useEffect, useState } from "react";
// import TicketSetupPage from "../SubPages/TicketSetupPage";
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
    escalations: {
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
    },
  });
  const [responseEscalation, setResponseEscalation] = useState([]);
  const [resolutionEscalation, setResolutionEscalation] = useState([]);
  const [users, setUsers] = useState([]);

  const convertToMinutes = ({ days, hrs, min }) => {
    const daysInMinutes = parseInt(days) * 24 * 60 || 0;
    const hrsInMinutes = parseInt(hrs) * 60 || 0;
    const minutes = parseInt(min) || 0;
    return daysInMinutes + hrsInMinutes + minutes;
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
        const filteredUser = UsersResp.data.filter(
          (userAdmin) => userAdmin.user_type === "pms_admin"
        );
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
          (res) => res.esc_type === "response"
        );
        const FilteredResolution = escResp.data.complaint_workers.filter(
          (res) => res.esc_type === "resolution"
        );
        console.log(FilteredResolution);
        setResponseEscalation(FilteredResponse);
        setResolutionEscalation(FilteredResolution);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
    fetchEscalation();
    fetchSetupUsers();
  }, [resEscalationAdded]);

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
  console.log(selectedOptions);
  const columns = [
    {
      name: "Category Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Levels",
      selector: (row) => row.Levels,
      sortable: true,
    },
    {
      name: "Escalation To",
      selector: (row) => row.to,
      sortable: true,
    },
  ];
  const columns1 = [
    {
      name: "Category Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Levels",
      selector: (row) => row.Levels,
      sortable: true,
    },
    {
      name: "Escalation To",
      selector: (row) => row.to,
      sortable: true,
    },
    {
      name: "P1",
      selector: (row) => row.P1,
      sortable: true,
    },
    {
      name: "P2",
      selector: (row) => row.P2,
      sortable: true,
    },
    {
      name: "P3",
      selector: (row) => row.P3,
      sortable: true,
    },
    {
      name: "P4",
      selector: (row) => row.P4,
      sortable: true,
    },
    {
      name: "P5",
      selector: (row) => row.P5,
      sortable: true,
    },
  ];
  const data1 = [
    {
      type: "plumbing",
      Levels: "E1",
      to: "Deepak Gupta",
      P1: "0 day, 0 hour, 2 minute",
      P2: "0 day, 0 hour, 2 minute",
      P3: "0 day, 0 hour, 2 minute",
      P4: "0 day, 0 hour, 2 minute",
      P5: "0 day, 0 hour, 2 minute",
    },
    {
      type: "plumbing",
      Levels: "E2",
      to: "Deepak Gupta",
      P1: "0 day, 0 hour, 2 minute",
      P2: "0 day, 0 hour, 2 minute",
      P3: "0 day, 0 hour, 2 minute",
      P4: "0 day, 0 hour, 2 minute",
      P5: "0 day, 0 hour, 2 minute",
    },
    {
      type: "plumbing",
      Levels: "E3",
      to: "Deepak Gupta",
      P1: "0 day, 0 hour, 2 minute",
      P2: "0 day, 0 hour, 2 minute",
      P3: "0 day, 0 hour, 2 minute",
      P4: "0 day, 0 hour, 2 minute",
      P5: "0 day, 0 hour, 2 minute",
    },
    {
      type: "plumbing",
      Levels: "E4",
      to: "Deepak Gupta",
      P1: "0 day, 0 hour, 2 minute",
      P2: "0 day, 0 hour, 2 minute",
      P3: "0 day, 0 hour, 2 minute",
      P4: "0 day, 0 hour, 2 minute",
      P5: "0 day, 0 hour, 2 minute",
    },
    {
      type: "plumbing",
      Levels: "E5",
      to: "Deepak Gupta",
      P1: "0 day, 0 hour, 2 minute",
      P2: "0 day, 0 hour, 2 minute",
      P3: "0 day, 0 hour, 2 minute",
      P4: "0 day, 0 hour, 2 minute",
      P5: "0 day, 0 hour, 2 minute",
    },
  ];
  const data = [
    {
      type: "plumbing",
      Levels: "E1",
      to: "Deepak Gupta",
    },
    {
      type: "plumbing",
      Levels: "E2",
      to: "Deepak Gupta",
    },
    {
      type: "plumbing",
      Levels: "E3",
      to: "Deepak Gupta",
    },
    {
      type: "plumbing",
      Levels: "E4",
      to: "Deepak Gupta",
    },
    {
      type: "plumbing",
      Levels: "E5",
      to: "Deepak Gupta",
    },
  ];

  const formatTime = (minutes) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const minutesLeft = minutes % 60;
    return `${days} day, ${hours} hr, ${minutesLeft} min`;
  };

  const siteId = getItemInLocalStorage("SITEID");
  const handleSaveResponseEscalation = async () => {
    if (selectedOptions.categories.length === 0) {
      return toast.error("Please Provide Escalation Data");
    }
    toast.loading("Creating Response Escalation Please wait!");
    const formData = new FormData();
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "response");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");
    selectedOptions.categories.forEach((category) => {
      formData.append("category_ids[]", category.value);
    });
    Object.entries(selectedOptions.escalations).forEach(([level, users]) => {
      formData.append(`escalation_matrix[${level.toLowerCase()}][name]`, level);
      users.forEach((user, index) => {
        formData.append(
          `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
          user.value
        );
      });
    });

    try {
      const res = await postHelpDeskEscalationSetup(formData);
      setResEscalationAdded(true);
      toast.dismiss();
      toast.success("Response Escalation Created Successfully");
      setSelectedOptions((prevData) => ({
        ...prevData,
        categories: [],
        escalations: {
          E1: [],
          E2: [],
          E3: [],
          E4: [],
          E5: [],
        },
      }));
    } catch (error) {
      console.log(error);
      toast.dismiss();
    } finally {
      setTimeout(() => {
        setResEscalationAdded(false);
      }, 500);
    }
  };

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
  console.log(selectedResolutionOptions);

  const handlePChange = (value, level, pField, fieldType) => {
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

  const initialData = {
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

  const handleSaveResolutionEscalation = async () => {
    if (selectedOptions.categories.length === 0) {
      return toast.error("Please Provide Escalation Data");
    }
    toast.loading("Creating Response Escalation Please wait!");
    const formData = new FormData();
    formData.append("complaint_worker[society_id]", siteId);
    formData.append("complaint_worker[esc_type]", "resolution");
    formData.append("complaint_worker[of_phase]", "pms");
    formData.append("complaint_worker[of_atype]", "Pms::Site");
    selectedOptions.categories.forEach((category) => {
      formData.append("category_ids[]", category.value);
    });
    // Object.entries(selectedOptions.escalations).forEach(([level, users]) => {
    //   formData.append(`escalation_matrix[${level.toLowerCase()}][name]`, level);
    //   users.forEach((user, index) => {
    //     formData.append(
    //       `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
    //       user.value
    //     );
    //   });
    // });
    Object.entries(selectedResolutionOptions.escalations).forEach(
      ([level, data]) => {
        formData.append(
          `escalation_matrix[${level.toLowerCase()}][name]`,
          level
        );
        data.users.forEach((user) => {
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][escalate_to_users][]`,
            user.value
          );
        });
        ["p1", "p2", "p3", "p4", "p5"].forEach((pField) => {
          const totalMinutes = convertToMinutes(data[pField]);
          formData.append(
            `escalation_matrix[${level.toLowerCase()}][${pField}]`,
            totalMinutes
          );
        });
      }
    );

    try {
      const res = await postHelpDeskResolutionEscalationSetup(formData);
      setResEscalationAdded(true);
      toast.dismiss();
      toast.success("Resolution Escalation Created Successfully");
      setSelectedOptions((prevData) => ({
        ...prevData,
        categories: [],
      }));
      setSelectedResolutionOptions((prevData) => ({
        ...prevData,
        escalations: initialData,
      }));
    } catch (error) {
      console.log(error);
      toast.dismiss();
    } finally {
      setTimeout(() => {
        setResEscalationAdded(false);
      }, 500);
    }
  };

  const handleDelete = async (id) => {
    try {
      toast.loading("Deleting Escalation Rule Please wait!");
      const deleteResp = await deleteEscalationRule(id);
      toast.dismiss();
      setResEscalationAdded(true);
      toast.success("Escalation Rule Deleted SuccessFully");
    } catch (error) {
      console.log(error);
      toast.dismiss();
    } finally {
      setTimeout(() => {
        setResEscalationAdded(false);
      }, 500);
    }
  };
  return (
    <div className="w-full my-2 flex overflow-hidden flex-col">
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
          {/* <h2
          className={`p-1 ${
            page === "Cost Approval" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Cost Approval")}
        >
          Cost Approval
        </h2> */}
        </div>
      </div>
      <div>
        {page === "Response" && (
          <div className=" mt-2 px-2">
            <div className="flex flex-col my-2">
              <Select
                id="categories"
                isMulti
                value={selectedOptions.categories}
                onChange={(selected) => handleChange(selected, "categories")}
                options={categories}
                placeholder="Select Categories"
                // className="basic-multi-select w-64"
                // classNamePrefix="select"
              />

              <div className=" w-full my-2">
                <table className=" w-full border-collapse">
                  <thead style={{ background: themeColor }}>
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
                            value={selectedOptions[level]}
                            onChange={(selected) =>
                              handleChange(selected, "escalations", level)
                            }
                            options={users}
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
                    className="font-semibold hover:bg-black hover:text-white transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                    onClick={handleSaveResponseEscalation}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-3 ">
              <div className="text-center mt-1">
                <label
                  htmlFor=""
                  className="font-semibold"
                  style={{ fontSize: "20px" }}
                >
                  Filter
                </label>
              </div>

              <select
                name=""
                id=""
                className="border  rounded-md border-black w-64"
              >
                <option value="">Housekeeping</option>
                <option value="">Technical</option>
              </select>
              <button
                className=" font-semibold hover:bg-green-500 hover:text-white transition-all border-green-500 px-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Apply
              </button>
              <button
                className=" font-semibold  hover:text-white transition-all  px-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Reset
              </button>
            </div> */}
            <div className="w-full">
              <div>
                {responseEscalation.map((category, index) => (
                  <div key={index} className="category-table">
                    <div className="flex gap-2 justify-between w-full border-b border-gray-300">
                      <p className="font-semibold ">Rule {index + 1} </p>
                      <div className="flex gap-2 items-center">
                        <button onClick={openModal}>
                          <BiEdit />
                        </button>
                        <button onClick={openModal1}>
                          <FaClone />
                        </button>
                        <button onClick={() => handleDelete(category.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <table className="table-auto w-full border-collapse border border-gray-200 my-4 rounded-md overflow-x-auto">
                      <thead
                        style={{ background: themeColor }}
                        className="bg-gray-100 rounded-md"
                      >
                        <tr>
                          <th
                            className="border border-gray-200 px-4 py-2 text-white"
                            style={{ width: "20%" }}
                          >
                            Category
                          </th>
                          <th
                            className="border border-gray-200 px-4 py-2 text-white"
                            style={{ width: "30%" }}
                          >
                            Levels
                          </th>
                          <th
                            className="border border-gray-200 px-4 py-2 text-white"
                            style={{ width: "50%" }}
                          >
                            Escalation To
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
                                style={{ width: "20%" }}
                              >
                                {category.category.name}
                              </td>
                            )}
                            <td
                              className="border border-gray-200 px-4 py-2 text-center font-medium"
                              style={{ width: "30%" }}
                            >
                              {level.name}
                            </td>
                            <td
                              className="border border-gray-200 px-4 py-2 text-sm"
                              style={{ width: "50%" }}
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
        {showModal1 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-96">
              {/* <h1>Clone Data</h1> */}
              <h2 className="text-xl text-center font-semibold mb-4">
                Clone Data
              </h2>
              <div className="grid grid-cols-1">
                <div className="grid gap-2 w-full">
                  <label htmlFor="">Regions</label>
                  <select name="" id="" className="border p-2 ">
                    <option value="">Pune</option>
                    <option value="">kolkata</option>
                  </select>
                </div>
                <div className="grid gap-2 mt-2 w-full">
                  <label htmlFor="">Zones</label>
                  <select name="" id="" className="border p-2 ">
                    <option value="">west zone</option>
                    <option value="">East</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background: themeColor }}
                >
                  Clone
                </button>
                <button
                  onClick={closeModal1}
                  className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background: themeColor }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-2/3">
              <div className="flex  flex-col gap-2">
                <div>
                  <h1 className="font-semibold mb-2 text-center">Edit</h1>
                  <Select
                    id="categories"
                    isMulti
                    value={selectedOptions}
                    onChange={(selected) =>
                      handleChange(selected, "categories")
                    }
                    options={categories}
                    className="basic-multi-select w-64"
                    classNamePrefix="select"
                  />
                </div>

                {/* <select name="" id=""  className="border p-2 rounded-md border-black w-60 absolute right-0 "></select> */}

                <div className=" w-full  mb-2">
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
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          E1
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <select
                            name=""
                            id=""
                            className="border p-2 rounded-md border-black w-full"
                          >
                            <option value="">Rohit</option>{" "}
                            <option value="">Ramesh</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          E2
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <select
                            name=""
                            id=""
                            className="border p-2 rounded-md border-black w-full"
                          >
                            <option value="">Rohit</option>{" "}
                            <option value="">Ramesh</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          E3
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <select
                            name=""
                            id=""
                            className="border p-2 rounded-md border-black w-full"
                          >
                            <option value="">Rohit</option>{" "}
                            <option value="">Ramesh</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          E4
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <select
                            name=""
                            id=""
                            className="border p-2 rounded-md border-black w-full"
                          >
                            <option value="">Rohit</option>{" "}
                            <option value="">Ramesh</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          E5
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <select
                            name=""
                            id=""
                            className="border p-2 rounded-md border-black w-full"
                          >
                            <option value="">Rohit</option>{" "}
                            <option value="">Ramesh</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  &nbsp;
                  <div className="flex gap-2 justify-center">
                    <button
                      className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                      style={{ background: themeColor, height: "1cm" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={closeModal}
                      className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                      style={{ background: themeColor, height: "1cm" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {page === "Resolution" && (
          <div className=" m-2">
            <div className=" flex flex-col  my-2 ">
              <Select
                isMulti
                noOptionsMessage={() => "Categories not available..."}
                onChange={(selected) => handleChange(selected, "categories")}
                options={categories}
                value={selectedOptions.categories}
                // classNamePrefix="select"
                placeholder="Select Categories"
              />
              <div className=" w-full overflow-auto ">
                <table className="border-collapse rounded-sm w-full my-2 ">
                  <thead style={{ background: themeColor }}>
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
                        <td className="border border-gray-300 px-4 py-2">
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
                          />
                        </td>
                        {["p1", "p2", "p3", "p4", "p5"].map((pField) => (
                          <td
                            key={pField}
                            className="border border-gray-300 px-4 py-2"
                          >
                            <div className="flex gap-2">
                              <input
                                type="text"
                                className="w-12 h-30 border border-gray-300 rounded-sm px-2 py-1 placeholder:text-sm"
                                placeholder="Days"
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
                                    "days"
                                  )
                                }
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
                              <input
                                type="text"
                                className="w-12 h-30 border border-gray-300 rounded-sm px-2 py-1 placeholder:text-sm"
                                placeholder="Hrs"
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
                                    "hrs"
                                  )
                                }
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
                              <input
                                type="text"
                                className="w-12 h-30 border border-gray-300 rounded-sm px-2 py-1 placeholder:text-sm"
                                placeholder="Min"
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
                                    "min"
                                  )
                                }
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
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             
              <div className="flex justify-center my-2">
                <button
                  className=" font-semibold hover:bg-black hover:text-white transition-all px-4 p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background: themeColor }}
                  onClick={handleSaveResolutionEscalation}
                >
                  Submit
                </button>
              </div>
            </div>

            {showModal3 && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg w-2/4">
                  <h2 className="text-xl text-center font-semibold mb-4">
                    Edit
                  </h2>
                  <div className=" flex flex-col gap-2 font-medium">
                    <div>
                      <select
                        name=""
                        id=""
                        className="border p-2 rounded-md border-black w-64 h-10 "
                      >
                        <option value="">Select</option>
                        <option value="">pantry</option>
                        <option value="">Housekeeping</option>
                        <option value="">others</option>
                      </select>
                    </div>
                    <div>
                      <table className="border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              Levels
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              Escalation To
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              P1
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              P2
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              P3
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              P4
                            </th>
                            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
                              P5
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">
                              E1
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <Select
                                // id={`select-${level}`}
                                isMulti
                                value={selectedOptions}
                                onChange={(selected) =>
                                  handleChange(selected, "escalations", e1)
                                }
                                options={users}
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">
                              E2
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <select
                                name=""
                                id=""
                                className="border p-2 rounded-md border-black w-48"
                              >
                                <option value="">Mittu</option>
                                <option value="">Panda</option>
                              </select>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>

                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">
                              E3
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <select
                                name=""
                                id=""
                                className="border p-2 rounded-md border-black w-48"
                              >
                                <option value="">Mittu</option>
                                <option value="">Panda</option>
                              </select>
                            </td>

                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">
                              E4
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <select
                                name=""
                                id=""
                                className="border p-2 rounded-md border-black w-48"
                              >
                                <option value="">Mittu</option>
                                <option value="">Panda</option>
                              </select>
                            </td>

                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">
                              E5
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <select
                                name=""
                                id=""
                                className="border p-2 rounded-md border-black w-48"
                              >
                                {" "}
                                <option value="">Mittu</option>
                                <option value="">Panda</option>
                              </select>
                            </td>

                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="w-12 h-30 border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
                                  placeholder="Days"
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
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                        style={{ background: themeColor }}
                      >
                        Update
                      </button>
                      <button
                        onClick={closeModal3}
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
            {/* <div className="border-b " /> */}
            {/* <div className="flex gap-3">
              <div className="text-center mt-1">
                <label htmlFor="" className="font-semibold">
                  Filter
                </label>
              </div>

              <select
                name=""
                id=""
                className="border p-1 rounded-md border-black w-64"
              >
                <option value="">Housekeeping</option>
                <option value="">Technical</option>
              </select>
              <button
                className="font-semibold hover:bg-green-500 hover:text-white transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Apply
              </button>
              <button
                className="font-semibold hover:bg-blue-500 hover:text-white transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Reset
              </button>
            </div> */}
            <div className="overflow-x-scroll w-full">
              <div>
                {resolutionEscalation.map((category, index) => (
                  <div key={index} className="category-table">
                    <div className="flex gap-2 justify-between w-full border-b birder-gray-300">
                      <p className="font-semibold ">Rule {index + 1}</p>
                      <div className="flex gap-4 items-center px-4">
                        <button onClick={openModal}>
                          <BiEdit />
                        </button>
                        <button onClick={openModal1}>
                          <FaClone />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      {/* <MdHelp/> */}
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
                            P1
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P2
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P3
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P4
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-sm  text-white">
                            P5
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
                            <td className="border border-gray-200 px-4 py-2 text-center text-sm font-medium">
                              {formatTime(level.p1)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center text-sm font-medium">
                              {formatTime(level.p2)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center text-sm font-medium">
                              {formatTime(level.p3)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center text-sm font-medium">
                              {formatTime(level.p4)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center text-sm font-medium">
                              {formatTime(level.p5)}
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
      </div>
    </div>
  );
};

export default TicketEscalationSetup;
