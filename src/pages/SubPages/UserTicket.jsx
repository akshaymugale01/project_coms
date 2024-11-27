import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  fetchSubCategories,
  getComplaints,
  getIssueType,
  getLogin,
  getUnits,
  getfloorsType,
  postComplaintsDetails,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
// import axios from "axios";
import toast from "react-hot-toast";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import { useSelector } from "react-redux";

const UserTicket = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [disSubmit, setDisSubmit] = useState(false);
  const unitRR = getItemInLocalStorage("UNITID");
  const siteID = getItemInLocalStorage("SITEID");
  const [formData, setFormData] = useState({
    category_type_id: "",
    sub_category_id: "",
    text: "",
    heading: "",
    of_phase: "pms",
    site_id: siteID,
    documents: [],
    issue_type_id: "",
    complaint_type: "",
    unit_id: unitRR,
  });

  console.log(formData);
  // console.log(attachments);

  const user = getItemInLocalStorage("user");
  console.log("User", user.unit_name);

  const categories = getItemInLocalStorage("categories");
  // console.log("categories-- ", categories);

  // setSelectedSiteId(siteID)
  console.log("site--", siteID);

  const userName = localStorage.getItem("Name");
  const formattedUserName = userName ? userName.replace(/"/g, "") : "";
  const lastName = localStorage.getItem("LASTNAME");
  const formattedLastName = lastName ? lastName.replace(/"/g, "") : "";

  // const siteID = getItemInLocalStorage("SITEID")
  // setSelectedSiteId(siteID)

  // const complaitType = getItemInLocalStorage("complaintType")
  // console.log("complaintType", complaitType)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSubCategories(14);
      // console.log("subCategories:", response);
    };

    const fechIssueType = async () => {
      const issue = await getIssueType();
      // console.log("Issue", issue.data)
    };
    fetchData();
    fechIssueType();
  }, []);

  const handleChange = async (e) => {
    async function fetchSubCategory(categoryId) {
      try {
        const cat = await fetchSubCategories(categoryId);
        setUnits(
          cat.data.sub_categories.map((item) => ({
            name: item.name,
            id: item.id,
          }))
        );
        // console.log(cat);
      } catch (e) {
        console.log(e);
      }
    }

    if (e.target.type === "select-one" && e.target.name === "categories") {
      const categoryId = Number(e.target.value);
      await fetchSubCategory(categoryId);
      setFormData({
        ...formData,
        category_type_id: categoryId,
        sub_category_id: "",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64 = await convertFileToBase64(file);
      base64Array.push(base64);
    }
    console.log("Array base64-", base64Array);
    const formattedBase64Array = base64Array.map((base64) => {
      return base64.split(",")[1];
    });

    console.log("Fornat", formattedBase64Array);

    setFormData({
      ...formData,
      documents: formattedBase64Array,
    });
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.heading || !formData.category_type_id) {
        return toast.error("All Fields Required");
      }

      setDisSubmit(true);
      toast.loading("Submitting request Please Wait!");

      const response = await postComplaintsDetails(formData);
      console.log("Complaint submitted successfully:", response);
      setFormData({
        category_type_id: "",
        sub_category_id: "",
        text: "",
        heading: "",
        of_phase: "pms",
        site_id: selectedSiteId,
        documents: [],
        issue_type_id: "",
        complaint_type: "",
        building_name: "",
        floor_name: "",
        unit_id: "",
      });

      toast.dismiss();

      toast.success("Complaint sent successfully");
      navigate("/mytickets");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  const handleReset = () => {
    setDescription("");
    setAttachments([]);
    setSelectedCategory("");
    setSelectedSubCategory("");
  };
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col  md:flex-row">
      <div className="fixed hidden sm:block  left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center items-center my-5 overflow-x-auto w-full  sm:w-full">
        <form
          className="border p-2 sm:p-0  border-gray-300 rounded-lg md:p-8 w-full max-w-[60rem]"
          onSubmit={handleSubmit}
        >
          <h2 style={{background: themeColor}} className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
            New Ticket
          </h2>
          {/* Requestor Details or Requestor Deatils (typo?) */}
          <Collapsible
            readOnly
            trigger={
              <CustomTrigger isOpen={isOpen}>Requestor Details:</CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-300 my-4 p-2 rounded-md font-bold "
          >
            <div className="grid grid-cols-2 bg-gray-300 p-2 rounded-md gap-5 pb-4">
              <p className="font-medium">
                Name: {formattedUserName} {formattedLastName}{" "}
              </p>
              <p className="font-medium">Unit: {user.unit_name} </p>
            </div>
          </Collapsible>
          <div className="flex flex-col my-5 justify-around w-full gap-4">
            {/* Related To :*/}
            <div className="flex flex-col md:flex-row justify-between sm:items-center gap-5">
              <div className="sm:flex grid grid-cols-2 gap-3 items-center">
                <label htmlFor="" className="font-semibold">
                  Related To:
                </label>
                <select
                  id="issueType"
                  value={formData.issue_type_id}
                  name="issue_type_id"
                  onChange={(e) =>
                    setFormData({ ...formData, issue_type_id: e.target.value })
                  }
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Area</option>
                  <option value="Apartment">Apartment</option>
                  {/* <option value="Shop">Shop</option> */}
                  <option value="Common Area">Common Area</option>
                </select>
              </div>

              <div className="sm:flex grid grid-cols-2 gap-3 items-center">
                <label htmlFor="" className="font-semibold">
                  Type of:
                </label>
                <select
                  id="complaintType"
                  value={formData.complaint_type}
                  name="complaint_type"
                  onChange={(e) =>
                    setFormData({ ...formData, complaint_type: e.target.value })
                  }
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Issue Type</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Request">Request</option>
                </select>
              </div>

              {/* Type Area */}
              {/* <div>
            <label htmlFor="">
              related to :
            </label>
            <select 
            name="issue_type_id" id=""
            value={formData.issue_type_id}
            onChange={e => setFormData({...formData, issue_type_id:e.target.value })}
            >

            </select>
</div> */}
              {/* <div className="flex flex-col sm:flex-row sm:gap-0 gap-3 justify-around w-full"> */}
              <div className="sm:flex grid grid-cols-2 gap-3 items-center">
                <label className="font-semibold">Categories:</label>
                <select
                  id="two"
                  value={formData.catogories}
                  name="categories"
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option
                      key={category.id}
                      onClick={() => console.log("checking-category")}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="flex gap-3 items-center">
                <label htmlFor="" className="font-semibold">
                  Sub Category:
                </label>
                <select
                  id="five"
                  value={formData.subCategories}
                  name="sub_category_id"
                  onChange={handleChange}
                  className="border p-2 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Sub Category</option>
                  {units?.map(floor => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div> */}
            {/* </div> */}
            <div className="flex flex-col justify-around">
              <label htmlFor="" className="font-semibold">
                Title:
              </label>
              <textarea
                name="heading"
                placeholder="Enter Title"
                cols="15"
                rows="1"
                value={formData.heading}
                onChange={handleChange}
                className="border p-2 rounded-md border-black"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col my-5 gap-1 ">
            <label htmlFor="" className="font-bold">
              Description:
            </label>
            <textarea
              name="text"
              placeholder=" Describe your concern!"
              id=""
              cols="80"
              rows="5"
              className="border p-2 border-black rounded-md"
              value={formData.text}
              onChange={handleChange}
            />
          </div>
          <div className="my-10 sm:my-5">
          <input
            type="file"
            name="documents"
            id="documents"
            onChange={handleFileChange}
            multiple
            className="file:bg-black file:text-white file:rounded-full file:p-2 file:px-4 file:font-semibold bg-gray-300 p-2 rounded-full"
          />
         </div>
          <div className="flex gap-5 justify-center items-center my-4">
            <button
              type="submit"
              className={`text-white hover:bg-gray-700 font-semibold text-xl py-2 px-4 rounded ${
                disSubmit ? "bg-gray-600" : "bg-black"
              }`}
              // disabled={disSubmit}
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-400 text-black hover:bg-black hover:text-white font-semibold text-xl py-2 px-4 rounded"
              onClick={handleReset}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserTicket;
