import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaPlus, FaPlusCircle, FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  getIncidentCatDetails,
  getIncidentDetails,
  getIncidentSubTags,
  getIncidentTags,
  updateIncidents,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
const EditIncident = () => {
  const [incident, setIncident] = useState([{ name: "", mobile: "" }]);
  const [checkbutton, setCheckbutton] = useState();
  const [medical, setMedical] = useState();
  const buildings = getItemInLocalStorage("Building");
  const [primaryCat, setPrimaryCat] = useState([]);
  const [secondaryCat, setSecondaryCat] = useState([]);
  const [incidentLevel, setIncidentLevel] = useState([]);
  const [incidentDamage, setIncidentDamage] = useState([]);
  const [rca, setRCA] = useState([]);
  const [investigation, setInvestigation] = useState([
    { name1: "", mobile1: "", designation: "" },
  ]);
  const [catName, setCatName] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const [primarySubCat, setSubPrimaryCat] = useState([]);
  const [primarySubSubCat, setSubSubPrimaryCat] = useState([]);
  const [secondarySubCat, setSecondarySubCat] = useState([]);
  const [secondarySubSubCat, setSecondarySubSubCat] = useState([]);
  const [secCatName, setSecCatName] = useState("");
  const [secSubCatName, setSecSubCatName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statuses, setStatuses] = useState([]);

  const [costs, setCosts] = useState({
    equipmentCost: "",
    productionLoss: "",
    treatmentCost: "",
    absenteeismCost: "",
    otherCost: "",
    totalCost: "0.00",
  });
  const [formData, setFormData] = useState({
    date_time: "",
    buildingId: "",
    primaryCategory: "",
    primarySubCategory: "",
    primarySubSubCategory: "",
    secondaryCategory: "",
    secondarySubCategory: "",
    secondarySubSubCategory: "",
    severity: "",
    level: "",
    probability: "",
    description: "",
    attachment: [],
    propertyDamage: false,
    insuranceCovered: false,
    Rca: "",
    primaryRootCauseCategory: "",
    insured_by: "",
    preventiveAction: "",
    correctiveAction: "",
    sent_medical_treatment: "",
    supportRequired: false,
    read_fact_state: false,
    first_aid_provided_employee: false,
    insurence: "",
    damage_category: "",
    first_aid_attendant: "",
    treatment_facility: "",
    attending_physician: "",
    investigation: [],
    costs: {},
    buildingStatus: "",
    statuses: "",
  });

  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const themeColor = useSelector((state) => state.theme.color);
  // const incidentId = getItemInLocalStorage("COMPANYID")
  const userId = getItemInLocalStorage("UserId");

  const handleAddInvestigationTeam = (event) => {
    event.preventDefault();
    setInvestigation([
      ...investigation,
      { name1: "", mobile1: "", designation: "" },
    ]);
  };

  const handleRemoveInvestigationTeam = (index) => {
    const newInvestigationTeams = [...investigation];
    newInvestigationTeams.splice(index, 1);
    setInvestigation(newInvestigationTeams);
  };

  const handleInvestigationTeamChange = (index, event) => {
    const { name, value } = event.target;
    const newInvestigationTeams = [...investigation];
    newInvestigationTeams[index][name] = value;
    setInvestigation(newInvestigationTeams);
  };

  const handleAddIncident = (event) => {
    event.preventDefault();
    setIncident([...incident, { name: "", mobile: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newIncident = [...incident];
    newIncident[index][name] = value;
    setIncident(newIncident);
  };

  const handleWitness = (index, event) => {
    const { name, value } = event.target;
    const newIncident = [...incident];
    if (name === "mobile") {
      newIncident[index]["mobile"] = value;
    } else {
      newIncident[index][name] = value;
    }
    setIncident(newIncident);
  };

  const handleRemoveIncident = (index) => {
    const newIncident = [...incident];
    newIncident.splice(index, 1);
    setIncident(newIncident);
  };

  const handleAddInvestigation = (event) => {
    event.preventDefault();
    setInvestigation([...investigation, { name1: "", mobile1: "" }]);
  };

  const handleInputChange1 = (index, event) => {
    const { name1, value } = event.target;
    const newInvestigation = [...investigation];
    newInvestigation[index][name1] = value;
    setInvestigation(newInvestigation);
  };

  const handleRemoveInvestigation = (index) => {
    const newInvestigation = [...investigation];
    newInvestigation.splice(index, 1);
    setInvestigation(newInvestigation);
  };

  const handleIncidentDateChange = (date) => {
    setFormData({ ...formData, date_time: date });
  };

  useEffect(() => {
    const fetchIncidentsCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentCategory");
        setPrimaryCat(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentsSecondaryCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentSecondaryCategory");
        setSecondaryCat(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentsLevel = async () => {
      try {
        const res = await getIncidentTags("IncidentLevel");
        setIncidentLevel(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentDamage = async () => {
      try {
        const res = await getIncidentTags("IncidentDamageCategory");
        setIncidentDamage(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentRCA = async () => {
      try {
        const res = await getIncidentTags("IncidentRCACategory");
        setRCA(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags("IncidentSubCategory", CategoryId);
        setSubPrimaryCat(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategoryName = async (SubCategoryId) => {
      try {
        const res = await getIncidentCatDetails(SubCategoryId);
        setSubCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSubSubCategory",
          CategoryId
        );
        setSubSubPrimaryCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecSubCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setSecSubCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setSecCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecondarySubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSecondarySubCategory",
          CategoryId
        );
        setSecondarySubCat(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentStatuses = async () => {
      try {
        const res = await getIncidentTags("IncidentStatus");
        setStatuses(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchSecondarySubSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSecondarySubSubCategory",
          CategoryId
        );
        setSecondarySubSubCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const selectIncidentStatuses = async () => {
      try {
        const res = await getIncidentTags("IncidentStatus");
        setStatuses(res.data);
        setSelectedStatus(res.data[0].name); // Set the selected status to the first status
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIncidentDetails = async () => {
      try {
        const primaryCategoryResp = await fetchIncidentsCategory();
        const secondaryCategoryResp = await fetchIncidentsSecondaryCategory();
        await fetchIncidentsLevel();
        await fetchIncidentDamage();
        await fetchIncidentRCA();
        fetchIncidentStatuses();
        await selectIncidentStatuses()
       
        const res = await getIncidentDetails(id);
        const data = res.data;

        setFormData({
          ...formData,
          date_time: data.time_and_date ? new Date(data.time_and_date) : null,
          buildingId: data.building_id,
          primaryCategory: data.primary_incident_category,
          primarySubCategory: data.primary_incident_sub_category,
          primarySubSubCategory: data.primary_incident_sub_sub_category,
          secondaryCategory: data.secondary_incident_category,
          secondarySubCategory: data.secondary_incident_sub_category,
          secondarySubSubCategory: data.secondary_incident_sub_sub_category,
          severity: data.severity,
          level: data.incident_level,
          probability: data.probability,
          description: data.description,
          supportRequired: data.support_required,
          factsStated: data.read_facts_states,
          attachment: data.attachment,
          read_fact_state: data.read_fact_state,
          insuranceCovered: data.insurance_covered,
          IncidentRCACategory: data.IncidentRCACategory,
          buildingStatus: data.status
        });

        console.log("Response Data: ", data);
        console.log("primaryCategoryResp", primaryCategoryResp);
        const primaryCategoryId = primaryCategoryResp.filter(
          (cat) => cat.name === data.primary_incident_category
        )[0].id;
        console.log("primaryCategoryId", primaryCategoryId);

        await fetchCategoryName(primaryCategoryId);
        const primarySubCategoryResp = await fetchSubCategory(
          primaryCategoryId
        );

        console.log("primarySubCategoryResp", primarySubCategoryResp);
        const primarySubCategoryId = primarySubCategoryResp.filter(
          (cat) => cat.name === data.primary_incident_sub_category
        )[0].id;

        fetchSubCategoryName(primarySubCategoryId);
        fetchSubSubCategory(primarySubCategoryId);

        console.log("secondaryCategoryResp", secondaryCategoryResp);
        const secondaryCategoryId = secondaryCategoryResp.filter(
          (cat) => cat.name === data.secondary_incident_category
        )[0].id;
        console.log("secondaryCategoryId", secondaryCategoryId);

        await fetchSecCategoryName(secondaryCategoryId);
        const secondarySubCategoryResp = await fetchSecondarySubCategory(
          secondaryCategoryId
        );
        console.log("secondarySubCategoryResp", secondarySubCategoryResp);
        const secondarySubCategoryId = secondarySubCategoryResp.filter(
          (subCat) => subCat.name === data.secondary_incident_sub_category
        )[0].id;
        console.log("secondarySubCategoryId", secondarySubCategoryId);
        fetchSecSubCategoryName(secondarySubCategoryId);
        fetchSecondarySubSubCategory(secondarySubCategoryId);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("FORM DATA", formData);
      }
    };

    

    fetchIncidentDetails();
  }, []);

  const handleChangeIncident = async (e) => {
    const fetchCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategoryName = async (SubCategoryId) => {
      try {
        const res = await getIncidentCatDetails(SubCategoryId);
        setSubCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags("IncidentSubCategory", CategoryId);
        setSubPrimaryCat(res.data);
        // console.log(primarySubCat);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSubSubCategory",
          CategoryId
        );
        setSubSubPrimaryCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.name === "buildingStatus") {
      setFormData({ ...formData, buildingStatus: e.target.value });
    }
    if (e.target.name === "propertyDamage") {
      setFormData({ ...formData, propertyDamage: e.target.value });
    }
    if (e.target.type === "select-one" && e.target.name === "primaryCategory") {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const catValue = e.target.selectedOptions[0].text;
      await fetchCategoryName(selectedOptionId);
      await fetchSubCategory(selectedOptionId);
      setFormData({ ...formData, primaryCategory: catValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "primarySubCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const subCatValue = e.target.selectedOptions[0].text;
      await fetchSubCategoryName(selectedOptionId);
      await fetchSubSubCategory(selectedOptionId);

      setFormData({ ...formData, primarySubCategory: subCatValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "primarySubSubCategory"
    ) {
      const subSubCatValue = e.target.selectedOptions[0].text;

      setFormData({ ...formData, primarySubSubCategory: subSubCatValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSecondaryCategoryChange = async (e) => {
    const fetchSecCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setSecCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecSubCategoryName = async (CategoryId) => {
      try {
        const res = await getIncidentCatDetails(CategoryId);
        setSecSubCatName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecondarySubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSecondarySubCategory",
          CategoryId
        );
        setSecondarySubCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSecondarySubSubCategory = async (CategoryId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSecondarySubSubCategory",
          CategoryId
        );
        setSecondarySubSubCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      e.target.type === "select-one" &&
      e.target.name === "secondaryCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const secCatValue = e.target.value;
      await fetchSecondarySubCategory(selectedOptionId);
      await fetchSecCategoryName(selectedOptionId);
      setFormData({ ...formData, secondaryCategory: secCatValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "secondarySubCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const secSubCatValue = e.target.value;
      await fetchSecondarySubSubCategory(selectedOptionId);
      await fetchSecSubCategoryName(selectedOptionId);
      setFormData({ ...formData, secondarySubCategory: secSubCatValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : parseFloat(value) || 0;
    const updatedCosts = {
      ...costs,
      [name]: numericValue,
    };
    const total =
      (parseFloat(updatedCosts.equipmentCost) || 0) +
      (parseFloat(updatedCosts.productionLoss) || 0) +
      (parseFloat(updatedCosts.treatmentCost) || 0) +
      (parseFloat(updatedCosts.absenteeismCost) || 0) +
      (parseFloat(updatedCosts.otherCost) || 0);

    setCosts({
      ...updatedCosts,
      totalCost: total.toFixed(2),
    });
  };

  const handleSave = async () => {
    const sendData = new FormData();

    sendData.append("incident[time_and_date]", formData.date_time);

    sendData.append("incident[insured_by_id]", userId);
    sendData.append(
      "incident[primary_incident_category]",
      formData.primaryCategory
    );
    sendData.append(
      "incident[primary_incident_sub_category]",
      formData.primarySubCategory
    );
    // sendData.append(
    //   "incident[primary_incident_sub_sub_category]",
    //   formData.primarySubSubCategory
    // );

    sendData.append(
      "incident[secondary_incident_category]",
      formData.secondaryCategory
    );

    sendData.append(
      "incident[secondary_incident_sub_category]",
      formData.secondarySubCategory
    );
    // sendData.append(
    //   "incident[secondary_incident_sub_sub_category]",
    //   formData.secondarySubSubCategory
    // );
    sendData.append("incident[support_required]", formData.supportRequired);
    sendData.append(
      "incident[first_aid_provided_employee]",
      formData.first_aid_provided_employee
    );
    sendData.append("incident[read_fact_state]", formData.read_fact_state);

    sendData.append("incident[insured_by]", formData.insured_by);
    sendData.append(
      "incident[property_damage_category]",
      formData.damage_category
    );

    sendData.append(
      "incident[damage_coverd_under_insurance]",
      formData.insuranceCovered
    );

    sendData.append(
      "incident[first_aid_attendant]",
      formData.first_aid_attendant
    );
    console.log(formData);
    console.log(costs);
    sendData.append(
      "incident[cost_of_incident_attributes][equipment_property_cost]",
      costs.equipmentCost
    );
    sendData.append(
      "incident[cost_of_incident_attributes][production_loss]",
      costs.productionLoss
    );
    sendData.append(
      "incident[cost_of_incident_attributes][treatment_cost]",
      costs.treatmentCost
    );
    sendData.append(
      "incident[cost_of_incident_attributes][absenteeism_cost]",
      costs.absenteeismCost
    );
    sendData.append(
      "incident[cost_of_incident_attributes][other_cost]",
      costs.otherCost
    );
    sendData.append(
      "incident[cost_of_incident_attributes][total_cost]",
      costs.totalCost
    );
    sendData.append("incident[status]", formData.buildingStatus);

    incident.forEach((incident1, index) => {
      sendData.append(
        `incident[witnesses_attributes][${index}][name]`,
        incident1.name
      );
      sendData.append(
        `incident[witnesses_attributes][${index}][mobile]`,
        incident1.mobile
      );
    });

    investigation.forEach((team, index) => {
      sendData.append(
        `incident[investigation_teams_attributes][${index}][name]`,
        team.name1
      );
      sendData.append(
        `incident[investigation_teams_attributes][${index}][mobile]`,
        team.mobile1
      );
      sendData.append(
        `incident[investigation_teams_attributes][${index}][designation]`,
        team.designation
      );
    });

    sendData.append(
      "incident[attending_physician]",
      formData.attending_physician
    );
    sendData.append("incident[preventive_action]", formData.preventiveAction);
    sendData.append("incident[corrective_action]", formData.correctiveAction);
    sendData.append(
      "incident[primary_root_cause_category]",
      formData.primaryRootCauseCategory
    );

    sendData.append(
      "incident[treatment_facility]",
      formData.treatment_facility
    );
    sendData.append("incident[incident_severity]", formData.severity);
    sendData.append("incident[sent_medical_treatment]", formData.sent_medical_treatment);
    sendData.append("incident[first_aid_attendant]", formData.first_aid_attendant);

    sendData.append("incident[rca]", formData.Rca);
    sendData.append("incident[property_damage]", formData.propertyDamage);
    sendData.append("incident[incident_level]", formData.level);
    sendData.append("incident[building_id]", formData.buildingId);
    sendData.append("incident[probability]", formData.probability);
    sendData.append("incident[description]", formData.description);
    sendData.append("incident[created_by_id]", userId);

    if (formData.attachment && Array.isArray(formData.attachment)) {
      formData.attachment.forEach((file, index) => {
        sendData.append(`incident[attachments_attributes][][file]`, file);
      });
    }
    try {
      if (
        !(
          formData.supportRequired === true && formData.read_fact_state === true
        )
      ) {
        toast.error(
          "Please check the support required and read fact state checkboxes before saving."
        );
        return;
      } else {
        // handleSave();
      }
      const res = await updateIncidents(id, sendData);
      toast.success("incident update successfully");
      navigate("/admin/incidents");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(buildings);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="border pb-2 flex flex-col my-2 md:mx-20 px-4  gap-4 rounded-md border-gray-400">
          <h2
            className="text-center text-lg my-2 font-semibold p-2 rounded-md text-white bg-gray-950"
          >
            Edit Incidents
          </h2>
          <h2 className="text-lg border-black border-b font-semibold">
            DETAILS
          </h2>
          <div className="flex flex-col justify-around ">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-5 w-full p-2">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold text-sm">
                  Time & Date
                </label>
                <DatePicker
                  selected={formData.date_time}
                  onChange={handleIncidentDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select end date & time"
                  ref={datePickerRef}
                  // minDate={currentDate}
                  className="border border-gray-400 rounded-md p-2 w-full "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Building
                </label>
                <select
                  name="buildingId"
                  value={formData.buildingId}
                  onChange={handleChangeIncident}
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                >
                  <option value="">Select Building</option>
                  {buildings?.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Incident Status
                </label>
                <select
                  name="buildingStatus"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.buildingStatus}
                  onChange={handleChangeIncident}
                >
                  <option value="">Select Incident Status</option>
                  {statuses.map((status) => (
                    <option value={status.name} key={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Incident Primary Category
                </label>
                <select
                  name="primaryCategory"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.primaryCategory}
                  onChange={handleChangeIncident}
                >
                  <option value="">Select Primary Category</option>
                  {primaryCat.map((cat) => (
                    <option value={cat.name} id={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Category For The{" "}
                  <span className="text-blue-500">{catName}</span> Incident
                </label>

                <select
                  name="primarySubCategory"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.primarySubCategory}
                  onChange={handleChangeIncident}
                >
                  <option value="">Select </option>
                  {primarySubCat.length > 0 &&
                    primarySubCat?.map((subCat) => (
                      <option
                        value={subCat.name}
                        id={subCat.id}
                        key={subCat.id}
                      >
                        {subCat.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* subCatName */}
              {/* <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Category For The{" "}
                  <span className="text-blue-500">{subCatName}</span> Incident
                </label>
                <select
                  name="primarySubSubCategory"
                  value={formData.primarySubSubCategory}
                  onChange={handleChangeIncident}
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                  {primarySubSubCat.map((subSubCat) => (
                    <option
                      value={subSubCat.name}
                      id={subSubCat.id}
                      key={subSubCat.id}
                    >
                      {subSubCat.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="flex flex-col">
                {/* secCatName */}
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Secondary Category
                </label>
                <select
                  name="secondaryCategory"
                  onChange={handleSecondaryCategoryChange}
                  id=""
                  value={formData.secondaryCategory}
                  className="border p-2 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                  {secondaryCat.map((secCat) => (
                    <option value={secCat.name} id={secCat.id} key={secCat.id}>
                      {secCat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Secondary for the{" "}
                  <span className="text-blue-500">{secCatName}</span> Category
                </label>
                <select
                  name="secondarySubCategory"
                  onChange={handleSecondaryCategoryChange}
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.secondarySubCategory}
                >
                  <option value="">Select </option>
                  {secondarySubCat.length > 0 &&
                    secondarySubCat?.map((secSubCat) => (
                      <option
                        value={secSubCat.name}
                        id={secSubCat.id}
                        key={secSubCat.id}
                      >
                        {secSubCat.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Select The Secondary for the{" "}
                  <span className="text-blue-500">{secSubCatName}</span>{" "}
                  Category
                </label>
                <select
                  name="secondarySubSubCategory"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.secondarySubSubCategory}
                  onChange={handleSecondaryCategoryChange}
                >
                  <option value="">Select</option>
                  {secondarySubSubCat.map((secSubSubCat) => (
                    <option
                      value={secSubSubCat.name}
                      id={secSubSubCat.id}
                      key={secSubSubCat.id}
                    >
                      {secSubSubCat.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Probability
                </label>
                <select
                  name="probability"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.probability}
                  onChange={handleChangeIncident}
                >
                  <option value="">Select Probability</option>
                  <option value="Rare">Rare </option>
                  <option value="Possible">Possible </option>
                  <option value="Likely">Likely </option>
                  <option value="Often">Often </option>
                  <option value="Frequent Almost/Certain">
                    Frequent Almost/Certain
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Incident level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChangeIncident}
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                >
                  <option value="">Select Level </option>
                  {incidentLevel.map((level) => (
                    <option value={level.name} key={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Has Any Property Damage Happened In The Incident?
                </label>
                <select
                  name="propertyDamage"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  value={formData.propertyDamage}
                  onChange={handleChangeIncident}
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              {formData.propertyDamage && (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Property Damage Category
                    </label>
                    <select
                      name="damage_category"
                      id=""
                      value={formData.damage_category}
                      onChange={handleChangeIncident}
                      className="border p-2 border-gray-500 rounded-md"
                    >
                      <option value="">Select </option>
                      {incidentDamage.map((damage) => (
                        <option
                          key={damage.id}
                          id={damage.id}
                          value={damage.name}
                        >
                          {damage.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Damage covered under insurance
                    </label>
                    <select
                      name="insuranceCovered"
                      value={formData.insuranceCovered}
                      onChange={handleChangeIncident}
                      id=""
                      className="border p-2 border-gray-500 rounded-md"
                    >
                      <option value="">Select </option>
                      <option value={true}>Yes </option>
                      <option value={false}>No </option>
                    </select>
                  </div>
                </>
              )}
              {formData.insuranceCovered && (
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold text-sm">
                    Insured by
                  </label>
                  <select
                    name="insured_by"
                    id="insured_by"
                    className="border p-2 border-gray-500 rounded-md"
                    value={formData.insured_by}
                    onChange={(e) =>
                      setFormData({ ...formData, insured_by: e.target.value })
                    }
                  >
                    <option value="">Select </option>
                    <option value="building_insurance">
                      Building insurance{" "}
                    </option>
                    <option value="private_individual">
                      Private/Individual{" "}
                    </option>
                    <option value="others">others </option>
                  </select>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Severity
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  onChange={handleChangeIncident}
                >
                  <option value="">Select Severity </option>
                  <option value="Insignificant">Insignificant </option>
                  <option value="Minor">Minor </option>
                  <option value="Moderate">Moderate </option>
                  <option value="Major">Major </option>
                  <option value="catasTrophic">catasTrophic </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  RCA
                </label>
                <input
                  onChange={handleChangeIncident}
                  type="text"
                  name="Rca"
                  id=""
                  className="border p-2 border-gray-500 rounded-md"
                  placeholder="Root cause analysis"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Primary root cause category
                </label>
                <select
                  name="primaryRootCauseCategory"
                  id=""
                  onChange={handleChangeIncident}
                  className="border p-2 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                  {rca.map((rca) => (
                    <option value={rca.name} key={rca.id}>
                      {rca.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  id=""
                  cols="5"
                  rows="2"
                  placeholder="Accident near Main Gate"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.description}
                  onChange={handleChangeIncident}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold text-sm">
                  Corrective action
                </label>
                <textarea
                  onChange={handleChangeIncident}
                  value={formData.correctiveAction}
                  name="correctiveAction"
                  id=""
                  cols="5"
                  rows="2"
                  placeholder="Accident near Main Gate"
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold text-sm">
                  Preventive action
                </label>
                <textarea
                  onChange={handleChangeIncident}
                  value={formData.preventiveAction}
                  name="preventiveAction"
                  id=""
                  cols="5"
                  rows="p"
                  placeholder="Accident near Main Gate"
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
            </div>
          </div>

          <h2 className="text-lg border-black border-b font-semibold ">
            ADD WITNESSES DETAILS
          </h2>
          <div>
            {incident.map((incident1, index) => (
              <div key={index}>
                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={incident1.name}
                      onChange={(event) => handleWitness(index, event)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Enter Mobile"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={incident1.mobile}
                      onChange={(event) => handleWitness(index, event)}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => handleRemoveIncident(index)}
                      className="text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="font-semibold border-2 border-black  p-1 flex items-center gap-2 rounded-md"
              onClick={handleAddIncident}
            >
              <FaPlusCircle /> Add More
            </button>
          </div>
        </div>
        <div className="border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
          <h2 className="text-lg border-black border-b font-semibold ">
            COST OF INCIDENT
          </h2>
          <div className="flex flex-col justify-around ">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-3 w-full">
              <div className="flex flex-col">
                <label
                  htmlFor="equipmentCost"
                  className="font-semibold text-sm"
                >
                  Equipment/Property Damaged Cost
                </label>
                <input
                  type="text"
                  name="equipmentCost"
                  placeholder="Equipment/Property Damaged Cost"
                  value={costs.equipmentCost}
                  onChange={handleChange}
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="productionLoss"
                  className="font-semibold text-sm"
                >
                  Production Loss
                </label>
                <input
                  type="text"
                  name="productionLoss"
                  placeholder="Production Loss"
                  value={costs.productionLoss}
                  onChange={handleChange}
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="treatmentCost"
                  className="font-semibold text-sm"
                >
                  Treatment Cost
                </label>
                <input
                  type="text"
                  name="treatmentCost"
                  placeholder="Treatment Cost"
                  value={costs.treatmentCost}
                  onChange={handleChange}
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="absenteeismCost"
                  className="font-semibold text-sm"
                >
                  Absenteeism Cost
                </label>
                <input
                  type="text"
                  name="absenteeismCost"
                  placeholder="Absenteeism Cost"
                  value={costs.absenteeismCost}
                  onChange={handleChange}
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="otherCost" className="font-semibold text-sm">
                  Other Cost
                </label>
                <input
                  type="text"
                  name="otherCost"
                  placeholder="Other Cost"
                  value={costs.otherCost}
                  onChange={handleChange}
                  className="border p-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="totalCost" className="font-semibold text-sm">
                  Total Cost
                </label>
                <input
                  type="text"
                  name="totalCost"
                  value={costs.totalCost}
                  readOnly
                  className=" p-2 border-gray-500 rounded-md outline-none bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
          <h2 className=" text-lg border-black border-b font-semibold ">
            FIRST AID PROVIDED
          </h2>
          <div className="grid  items-center gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="meterApplicable">
                Was First Aid provided by Employees ?{" "}
              </label>
              <input
                type="checkbox"
                name=""
                id="meterApplicable"
                onClick={() => {
                  setCheckbutton(!checkbutton);
                  setFormData({
                    ...formData,
                    first_aid_provided_employee: true,
                  });
                }}
              />
            </div>
            {checkbutton && (
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-sm">
                  Name of First Aid Attendants
                </label>
                <input
                  type="text"
                  placeholder="Name of First Aid Attendants"
                  className="border p-2 border-gray-500 rounded-md w-full"
                  value={formData.first_aid_attendant}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      first_aid_attendant: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className="border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
          <h2 className=" text-lg border-black border-b font-semibold ">
            MEDICAL TREATMENT
          </h2>
          <div className="grid  w-full  gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="meterApplicable">
                Sent for Medical Treatment{" "}
              </label>
              <input
                type="checkbox"
                name=""
                id="meterApplicable"
                checked={medical}
                onClick={(e) => {
                  setMedical(e.target.checked);
                  setFormData({
                    ...formData,
                    sent_medical_treatment: e.target.checked,
                  });
                }}
              />
            </div>
            {medical && (
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col ">
                  <label htmlFor="" className="text-sm font-medium">
                    Treatment Facility
                  </label>
                  <input
                    type="text"
                    placeholder=" Treatment Facility"
                    className="border p-2 border-gray-500 rounded-md w-full"
                    value={formData.treatment_facility}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        treatment_facility: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="" className="text-sm font-medium">
                    Attending Physician
                  </label>
                  <input
                    type="text"
                    placeholder=" Attending Physician"
                    className="border p-2 border-gray-500 rounded-md w-full"
                    value={formData.attending_physician}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attending_physician: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className=" border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg border-black border-b font-semibold ">
            ADD INVESTIGATION TEAM DETAILS
          </h2>
          <div>
            {investigation.map((team, index) => (
              <div key={index}>
                <div className="grid md:grid-cols-4 item-start gap-x-4 gap-y-4 mb-3 w-full">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={team.name1}
                      onChange={(event) =>
                        handleInvestigationTeamChange(index, event)
                      }
                      name="name1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Mobile
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Mobile"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={team.mobile1}
                      onChange={(event) =>
                        handleInvestigationTeamChange(index, event)
                      }
                      name="mobile1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold text-sm">
                      Designation
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Designation"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={team.designation}
                      onChange={(event) =>
                        handleInvestigationTeamChange(index, event)
                      }
                      name="designation"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveInvestigationTeam(index)}
                    className="text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="font-semibold border-2 border-black  p-1 flex items-center gap-2 rounded-md"
              onClick={handleAddInvestigationTeam}
            >
              <FaPlusCircle /> Add More
            </button>
          </div>
        </div>
        <div className="border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400">
          <div className=" ">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="supportRequired"
                id="supportRequired"
                checked={formData.supportRequired}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supportRequired: e.target.checked,
                  })
                }
              />
              <label htmlFor="supportRequired">Support required</label>
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  required
                  type="checkbox"
                  name="read_fact_state"
                  id="read_fact_state"
                  checked={formData.read_fact_state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      read_fact_state: e.target.checked,
                    })
                  }
                />
                <label htmlFor="read_facts_states">
                  I have correctly stated all the facts related to the incident
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
          <h2 className=" text-lg border-black border-b font-semibold ">
            ATTACHMENTS
          </h2>
          <input
            required
            type="file"
            multiple
            name="attachment"
            onChange={(e) =>
              setFormData({
                ...formData,
                attachment: Array.from(e.target.files),
              })
            }
          />
        </div>
        <div className="flex justify-end gap-2 mb-20 my-3 border-t p-1 md:mr-20">
          <button
            className="font-semibold bg-gray-800 text-white  p-2 px-4 flex gap-2 rounded-md items-center"
            onClick={() => navigate("/admin/incidents")}
          >
            <MdClose /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="font-semibold bg-indigo-800 text-white p-2 px-4 flex items-center gap-2 rounded-md"
          >
            <FaCheck /> Update Incident
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditIncident;