import React, { useEffect, useRef, useState } from "react";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getIncidentCatDetails,
  getIncidentSubTags,
  getIncidentTags,
  postIncidents,
} from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AddIncident = () => {

  
  const themeColor = useSelector((state) => state.theme.color);
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
    supportRequired: false,
    factsStated: false,
    attachment: [],
    first_aid_provided_employee : true ,
    buildingName: "",
    
  });
  const datePickerRef = useRef(null);
  const currentDate = new Date();

  const handleIncidentDateChange = (date) => {
    setFormData({ ...formData, date_time: date });
  };
  const buildings = getItemInLocalStorage("Building");
  const [primaryCat, setPrimaryCat] = useState([]);
  const [secondaryCat, setSecondaryCat] = useState([]);
  const [incidentLevel, setIncidentLevel] = useState([]);
  useEffect(() => {
    const fetchIncidentsCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentCategory");
        setPrimaryCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncidentsSecondaryCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentSecondaryCategory");
        setSecondaryCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIncidentsLevel = async () => {
      try {
        const res = await getIncidentTags("IncidentLevel");
        setIncidentLevel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIncidentsCategory();
    fetchIncidentsSecondaryCategory();
    fetchIncidentsLevel();
  }, []);
  const [catName, setCatName] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const [primarySubCat, setSubPrimaryCat] = useState([]);
  const [primarySubSubCat, setSubSubPrimaryCat] = useState([]);
  const handleChangeIncident = async (e) => {
    console.log(e.target.selectedOptions)
  
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

    
    if (e.target.type === "select-one" && e.target.name === "primaryCategory") {
      console.log("sub cat");
      const selectedOptionId = e.target.selectedOptions[0].id;
      const catValue = (e.target.value);
      console.log(catValue,selectedOptionId)

      await fetchCategoryName(selectedOptionId);
      await fetchSubCategory(selectedOptionId);
      setFormData({ ...formData, primaryCategory: catValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "primarySubCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const SubCatValue = (e.target.value);
      await fetchSubCategoryName(selectedOptionId);
      await fetchSubSubCategory(selectedOptionId);

      setFormData({ ...formData, primarySubCategory: SubCatValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "primarySubSubCategory"
    ) {
      const subSubCatValue = (e.target.value);

      setFormData({ ...formData, primarySubSubCategory: subSubCatValue });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const [secondarySubCat, setSecondarySubCat] = useState([]);
  const [secondarySubSubCat, setSecondarySubSubCat] = useState([]);
  const [secCatName, setSecCatName] = useState("");
  const [secSubCatName, setSecSubCatName] = useState("");

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
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

    if (e.target.type === "select-one" && e.target.name === "buildingId") {
      const selectedBuildingId = e.target.value;
      const selectedBuildingName = e.target.selectedOptions[0].text;
      setFormData({ ...formData, buildingId: selectedBuildingId, buildingName: selectedBuildingName });
    }
    if (
      e.target.type === "select-one" &&
      e.target.name === "secondaryCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const secCatValue = (e.target.value);
      await fetchSecondarySubCategory(selectedOptionId);
      await fetchSecCategoryName(selectedOptionId);
      setFormData({ ...formData, secondaryCategory: secCatValue });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "secondarySubCategory"
    ) {
      const selectedOptionId = e.target.selectedOptions[0].id;
      const secSubCatValue = (e.target.value);
      await fetchSecondarySubSubCategory(selectedOptionId);
      await fetchSecSubCategoryName(selectedOptionId);
      setFormData({ ...formData, secondarySubCategory: secSubCatValue });

      
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate();

  const handleAddIncident = async () => {
    const postData = new FormData();
    console.log(formData)
    
    postData.append("incident[time_and_date]", formData.date_time);
    postData.append(
      "incident[primary_incident_category]",
      formData.primaryCategory
    );
    postData.append(
      "incident[primary_incident_sub_category]",
      formData.primarySubCategory 
    );
    // postData.append("incident[primary_incident_sub_sub_category]", formData.primarySubSubCategory);

    postData.append(
      "incident[secondary_incident_category]",
      formData.secondaryCategory 
    );
    
    postData.append(
      "incident[secondary_incident_sub_category]",
      formData.secondarySubCategory
    );
    postData.append(
      "incident[secondary_incident_sub_category]",
      formData.secondarySubCategory
    );
    // postData.append(
    //   // "incident[secondary_incident_sub_sub_category]",
    //   // formData.secondarySubSubCategory 
    // );
    postData.append(
      "incident[support_required]",
      formData.supportRequired 
    );
    postData.append(
      "incident[first_aid_provided_employee]",
      formData.first_aid_provided_employee 
    );
    postData.append(
      "incident[read_facts_states]",
      formData.factsStated 
    );
    postData.append("incident[building_id]", formData.buildingId);
    postData.append("incident[building_name]", formData.buildingName);
  
    postData.append("incident[incident_severity]", formData.severity);
    postData.append("incident[incident_level]", formData.level);
    
    postData.append("incident[probability]", formData.probability);
    postData.append("incident[description]", formData.description);
    postData.append("incident[created_by_id]", userId);

    formData.attachment.forEach((file, index) => {
      postData.append(`incident[attachments_attributes][][file]`, file);
    });
    
    try {
      if (!formData.supportRequired || !formData.factsStated) {
        toast.error("Please check the required checkboxes");
        return;
      }
    
      const res = await postIncidents(postData);
      toast.success("New incident added successfully");
      navigate("/admin/incidents");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="border flex flex-col my-2 md:mx-10 p-4 gap-4 rounded-md border-gray-300">
          <h2
            className="text-center text-lg  font-semibold p-2 bg-black rounded-md text-white"
          >
            Add Incidents
          </h2>
          <h2 className=" text-lg border-black border-b font-semibold ">
            DETAILS  
          </h2>
          <div className="flex  flex-col justify-around ">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-5 w-full">
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
                    <option key={building.id} id={building.id} value={building.id}>
                      {building.name}
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
                    <option value={cat.name } id={cat.id} key={cat.id}>
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
                  {primarySubCat.map((subCat) => (
                    <option value={subCat.name} id={subCat.id} key={subCat.id}>
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
                    <option value={subSubCat.name} id={subSubCat.id} key={subSubCat.id}>
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
                  {secondarySubCat.map((secSubCat) => (
                    <option value={secSubCat.name} id={secSubCat.id} key={secSubCat.id}>
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
                  <option value="">Select </option>
                  {secondarySubSubCat.map((secSubSubCat) => (
                    <option value={secSubSubCat.name} id={secSubSubCat.id} key={secSubSubCat.id}>
                      {secSubSubCat.name}
                    </option>
                  ))}
                </select>
              </div> */}
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
                    <option value={level.name} id={level.id} key={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
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
                    Frequent Almost/Certain{" "}
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="font-semibold text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChangeIncident}
                id=""
                cols="5"
                rows="3"
                placeholder="Accident near Main Gate"
                className="border p-2 border-gray-500 rounded-md"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2 rounded-md ">
            <div className=" mt-3 mb-10 ">
              <div className="flex items-center gap-6">
                <input
                  type="checkbox"
                  name="is_meter"
                  checked={formData.supportRequired === true}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supportRequired: !formData.supportRequired,
                    })
                  }
                  id="meterApplicable"
                />
                <label htmlFor="meterApplicable">Support required</label>
              </div>
              <div className="flex md:flex-row flex-col gap-2">
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    name="is_meter"
                    id="meterApplicable"
                    checked={formData.factsStated === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        factsStated: !formData.factsStated,
                      })
                    }
                  />
                  <label htmlFor="meterApplicable">
                    I have correctly stated all the facts related to the
                    incident
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4 rounded-md ">
            <h2 className=" text-lg border-black border-b font-semibold ">
              ATTACHMENTS
            </h2>
            <FileInputBox
                handleChange={(files) => handleFileChange(files, "attachment")}
                fieldName={"attachment"}
              />
          </div>
          <div className="flex justify-end gap-2 mb-20 my-3">
            <button className="font-semibold bg-gray-900 text-white  p-2 flex rounded-md items-center gap-2">
              <MdClose /> Cancel
            </button>
            <button
              className="font-semibold bg-indigo-800 text-white p-2 flex rounded-md items-center gap-2"
              onClick={handleAddIncident}
            >
              <FaCheck /> Create Incident
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddIncident;