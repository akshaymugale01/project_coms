import React, { useEffect, useState } from "react";
import Detail from "../../../containers/Detail";
import {
  editComplaintsDetails,
  fetchSubCategories,
  getAssignedTo,
  getComplaintsDetails,
  updateComplaintsDetails,
} from "../../../api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
import FileInput from "../../../Buttons/FileInput";
import { select } from "@material-tailwind/react";
import { useSelector } from "react-redux";


const DetailsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticketinfo, setTicketInfo] = useState({});
  const [editTicketInfo, setEditTicketInfo] = useState({});
  const [assignedUser, setAssignedUser] = useState();
  const [categ, setCateg] = useState([]);
  const [units, setUnits] = useState([]);
  const [feat, setFeat] = useState("")
  const [formData, setFormData] = useState({
    category_type_id: "",
    // sub_category: "",
    sub_category_id: "",
    heading: "",
    text: "",
    assigned_to: "",
    // status: "",
    priority: "",
    issue_status: "",
    issue_type: "",
    comment: "",
    of_phase: "pms",
    complaint_id: id,
    root_cause: "",
    impact: "",
    corrective_action: "",
    proactive_reactive: "Reactive",
    correction: "",
    documents: [],
    assigned_to_id: "",
    issue_status_id:"",
    territory_manager_id:""
  });
  console.log(formData);
  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    if (storedFeatures) {
      setFeat(storedFeatures.map(feature => feature.feature_name));
    }
  };


  const categories = getItemInLocalStorage("categories");
  // console.log(categories , "Catss")
  const statuses = getItemInLocalStorage("STATUS");
  console.log(statuses)


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getComplaintsDetails(id);
        // Update state with fetched data
        setFormData({
          ...formData,
          category_type_id: response.data.category_type_id,
          sub_category_id: response.data.sub_category_id,
          heading: response.data.heading,
          assigned_to: response.data.assigned_to,
          assigned_to_id: response.data.assigned_to_id,
          issue_status: response.data.issue_status,
          priority: response.data.priority,
          text: response.data.text,
          issue_status_id: response.data.issue_status_id,
          territory_manager_id: response.data.territory_manager_id,
          // status: response.data.status,
          // category_type_id: response.data.category_type_id,
          // sub_category_id: response.data.sub_category_id,
          issue_type: response.data.issue_type,
          root_cause: response.data.root_cause,
          impact: response.data.impact,
          proactive_reactive: response.data.proactive_reactive,
          correction: response.data.correction,
          corrective_action: response.data.corrective_action,
          comment: response.data.comment,
          docs: response.data.documents,
         
        });
        console.log("check",response.data)
        setTicketInfo(response.data);
        setEditTicketInfo(response.data);
        fetchEditSubCategories(response.data.category_type_id);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    const fetchEditSubCategories = async (categoryId) => {
      try {
        const cat = await fetchSubCategories(categoryId);


        setUnits(
          cat.data.sub_categories.map((item) => ({
            name: item.name,
            id: item.id,
          }))
        );


        console.log("categories", cat);
      } catch (e) {
        console.log(e);
      }
    };


    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        setAssignedUser(response.data);
        setEditTicketInfo(response.data);
       
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };


    fetchDetails();
    fetchAssignedTo();
    // fetchEditSubCategories(formData.category_type_id);
  }, []);


  const handleTicketDetails = (e, name) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  /*
  const saveEditDetails = async () => {
    try {
      await editComplaintsDetails(formData);
      console.log("Edited Ticket Details:", formData);
      toast.success("Updated Successfully")
    } catch (error) {
      console.error("Error Saving in details update: ", error);
    }
  };


  */


  const saveEditDetails = async () => {
    try {
      const updatedData = {
        complaint: {
          category_type_id: formData.category_type_id,
          sub_category_id: formData.sub_category_id,
          issue_status: formData?.issue_status,
          issue_status_id : formData.issue_status_id,
          complaint_type: formData.issue_type,
          priority: formData.priority,
          assigned_to: formData.assigned_to_id,
          territory_manager_id: formData.territory_manager_id,
          root_cause: formData.root_cause,
          impact: formData.impact,
          corrective_action: formData.corrective_action,
          proactive_reactive: formData.proactive_reactive,
          correction: formData.correction,
        },
        complaint_log: {
          log_status: formData.issue_status,
          complaint_status_id: formData?.issue_status_id,
          priority: formData.priority,
          assigned_to: formData.assigned_to,
          comment: formData.comment,
          complaint_id: id,
          documents: formData.documents,
        },
        complaint_comment: {
          docs: formData.documents,
        },
      };


      toast.loading("Please Wait Submitting Details!");
     const resp = await editComplaintsDetails(updatedData);
      console.log("Edited Ticket Details:", resp);
      toast.dismiss();


      toast.success("Updated Successfully");
      navigate("/tickets");
    } catch (error) {
      console.error("Error Saving in details update: ", error);
    }
  };


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
        console.log("categories", cat);
      } catch (e) {
        console.log(e);
      }
    }


    if (
      e.target.type === "select-one" &&
      e.target.name === "category_type_id"
    ) {
      const categoryId = Number(e.target.value);
      console.log(categoryId);
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


  console.log(formData.category_type_id);
  console.log("SubCategory" + formData.sub_category_id);


  const ticketDetails = [
 
    { title: "Site Owner  :", description: ticketinfo.responsible_person },
    { title: "Ticket No.:", description: ticketinfo.ticket_number || "" },


    // {
    //   title: "Title :",
    //   description: <p>{formData.heading}</p>,
    // },


    { title: "Site  :", description: ticketinfo.site_name },
    { title: "Building Name  :", description: ticketinfo.building_name },
    { title: "Floor Name  :", description: ticketinfo.floor_name },
    { title: "Unit  :", description: ticketinfo.unit },
    { title: "Related To  :", description: ticketinfo.issue_related_to },


    // { title: " Current status  :", description: ticketinfo.issue_status },
    {
      title: "Status :",
      description: (
        <select
          value={formData.issue_status_id || ""}
          name="issue_status_id"
          onChange={(e) =>
            setFormData({ ...formData, issue_status_id: e.target.value })
          }
          // onChange={handleChange}
          className="border p-1 px-4 grid max-w-40 w-40 border-gray-500 rounded-md"
        >
          <option value="">Select Status</option>
          {statuses?.map((floor) => (
            <option value={floor.id} key={floor.id}>
              {floor.name}
            </option>
          ))}
        </select>
      ),
    },


    // { title: "Current Issue Type  :", description: ticketinfo.issue_type },
    {
      title: "Issue Type :",
      description: (
        <select
          name="issue_type"
          value={formData.issue_type || ""}
          onChange={(e) =>
            setFormData({ ...formData, issue_type: e.target.value })
          }
          className="border p-1 px-4 max-w-40 w-40 border-gray-400 rounded-md"
        >
          <option value="Request">Request</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
        </select>
      ),
    },
    // { title: " Current Priority :", description: ticketinfo.priority },
    {
      title: "Priority :",
      description: (
        <select
          name="priority"
          value={formData.priority || ""}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="border p-1 px-4 max-w-40 w-40 border-gray-400 rounded-md"
        >
          <option value="">Select Priority</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
          <option value="P5">P5</option>
        </select>
      ),
    },
    // { title: "Current Assigned To  :", description: ticketinfo.assigned_to },
    {
      title: "Assigned To:",
      description: (
        <select
          value={formData.assigned_to_id || ""}
          name="assigned_to_id"
          onChange={(e) =>
            setFormData({ ...formData, assigned_to_id: e.target.value })
          }
          className="border p-1 px-4 max-w-40 w-40 border-gray-500 rounded-md"
        >
          <option value="">Select Assign To</option>
          {assignedUser?.map((assign) => (
            <option key={assign.id} value={assign.id}>
              {assign.firstname} {assign.lastname}
            </option>
          ))}
        </select>
      ),
    },
    {
      title: "Approval Authority:",
      description: (
        <select
          value={formData.territory_manager_id || ""}
          name="territory_manager_id"
          onChange={(e) =>
            setFormData({ ...formData, territory_manager_id: e.target.value })
          }
          className="border p-1 px-4 max-w-40 w-40 border-gray-500 rounded-md"
        >
          <option value="">Select Approval Authority</option>
          {assignedUser?.map((assign) => (
            <option key={assign.id} value={assign.id}>
              {assign.firstname} {assign.lastname}
            </option>
          ))}
        </select>
      ),
    },


   


    {
      title: "Categories:",
      description: (
        <select
          id="two"
          value={formData.category_type_id}
          name="category_type_id"
          onChange={handleChange}
          className="border p-1 px-4 max-w-40 w-40 border-gray-500 rounded-md"
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option
              key={category.id}
           
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      title: " Sub Categories:",
      description: (
        <select
          id="five"
          value={formData.sub_category_id}
          name="sub_category_id"
          onChange={handleChange}
          className="border p-1 px-4 max-w-40 w-40 border-gray-500  rounded-md"
        >
          <option value="">Sub Category</option>
          {units?.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.name}
            </option>
          ))}
        </select>
      ),
    },
     {
      title: "Proactive/Reactive :",
      description: (
        <select
          name="proactive_reactive"
          value={formData.proactive_reactive}
          onChange={(e) =>
            setFormData({ ...formData, proactive_reactive: e.target.value })
          }
          className="border p-1 px-4 max-w-40 w-40 border-gray-400 rounded-md"
        >
          {/* <option value="Proactive">Proactive</option> */}


          <option value="">Select Option</option>
          <option value="Reactive">Reactive</option>
          <option value="Proactive">Proactive</option>
        </select>
      ),
    },
  ];


  const FileChange = async (event) => {
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


    // console.log("Fornat", formattedBase64Array);


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
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="grid ">
      <div className="flex flex-col justify-around gap-10 mb-10 my-2 ">
        <div className="">
          <Detail details={ticketDetails} heading={"Edit Ticket Details"} title={formData.heading} />
        </div>


        <div className="flex flex-col  flex-wrap gap-2">
          <h2
          style={{background:"rgb(19 27 32)"}}
          className="text-center w-screen  text-white font-semibold mt-5 text-lg p-2 px-4 ">
            Additional Info
          </h2>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Description :</p>
            <textarea
              name="text"
              // placeholder="heading"
              cols="15"
              rows="2"
              value={formData.text}
              disabled
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className="border p-1 px-4 border-gray-400 rounded-md"
            ></textarea>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Root Cause :</p>
            <textarea
              name="root_cause"
              // placeholder="heading"
              cols="15"
              rows="2"
              value={formData.root_cause}
              onChange={(e) =>
                setFormData({ ...formData, root_cause: e.target.value })
              }
              className="border p-1 px-4 border-gray-400 rounded-md"
            ></textarea>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Impact :</p>
            <textarea
              name="impact"
              // placeholder="heading"
              cols="15"
              rows="2"
              value={formData.impact}
              onChange={(e) =>
                setFormData({ ...formData, impact: e.target.value })
              }
              className="border p-1 px-4 border-gray-400 rounded-md"
            ></textarea>
          </div>


          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Corrective Action :</p>
            <textarea
              name="corrective_action"
              // placeholder="heading"
              cols="15"
              rows="2"
              value={formData.corrective_action}
              onChange={(e) =>
                setFormData({ ...formData, corrective_action: e.target.value })
              }
              className="border p-1 px-4 border-gray-400 rounded-md"
            ></textarea>
          </div>


          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Correction :</p>
            <textarea
              name="correction"
              // placeholder="heading"
              cols="15"
              rows="2"
              value={formData.correction}
              onChange={(e) =>
                setFormData({ ...formData, correction: e.target.value })
              }
              className="border p-1 px-4 border-gray-400 rounded-md"
            ></textarea>
          </div>


        <div className="px-4 flex flex-col gap-1 justify-center">
          <label htmlFor="description" className="font-semibold ">
            Comment:
          </label>
          <textarea
            name="text"
            value={formData.comment}
            className="border p-1 px-4 border-gray-400 rounded-md w-full"
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            />
            </div>
        </div>


        {/* <div className="p-1">
        <div className="p-4">
          <label htmlFor="description" className="font-medium ">Comments:</label>
          <textarea
             name="text"
            value={formData.heading }
            className="border p-1 px-2 border-gray-400 rounded-md w-full"
            onChange={e => setFormData({...formData, heading:e.target.value})}
          />
        </div>
      </div> */}
      </div>


      <FileInput
        type="file"
        name="documents"
        id="documents"
        onChange={FileChange}
        multiple
        className="ml-3 px-4 p-3 rounded-md text-white bg-black "
      />


      <div className=" m-10 w-full flex justify-center  ">
        <button
          onClick={saveEditDetails}
          className="bg-black px-4 font-medium rounded-md p-2 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};


export default DetailsEdit;




