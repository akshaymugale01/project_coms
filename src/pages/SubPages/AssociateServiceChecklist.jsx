import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { deleteAssociationList, getAssignedTo, getAssociationList, getSoftServices, postServiceAssociation } from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const AssociateServiceChecklist = () => {
  const [services, setServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([])
  const [added, setAdded] = useState(false)
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [formData, setFormData] = useState({
    assigned_to: [],
  });
  const { id } = useParams();
  const column = [
  {
    name: "Service Name",
    selector: (row) => row.service_name,
    sortable: true,
  },
  {
    name: "Assigned To",
    selector: (row) => row.user_name,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <FaTrash
          size={15}
          className="cursor-pointer"
          onClick={() =>
            handleDeleteAssociation(row.service_name, row.user_name) 
          }
        />
      );
    },
  },
];

  
  
  useEffect(() => {
    const fetchServicesList = async () => {
      // getting all the services
      const servicesListResp = await getSoftServices();
      const softServices = servicesListResp.data;
      const serviceList = softServices.map((service) => ({
        value: service.id,
        label: service.name,
      }));
      console.log("Service list",serviceList)
      setServices(serviceList);
    };
    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      console.log(assignedToList.data)
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label:`${ u.firstname} ${u.lastname}`,
      }));
      console.log("user list",user)
      setAssignedTo(user);
    };
    const fetchAssociationList = async() =>{
      const assoResp = await getAssociationList(id)
      console.log("getdata",assoResp.data.associated_with)
      setAssociation(assoResp.data.associated_with)
    }


    fetchServicesList();
    fetchAssignedTo();
    fetchAssociationList()
  }, [added]);

  var handleChangeSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, assigned_to: e.target.value });
  };
  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };

 
  const handleAddAssociate = async () => {
    const payload = {
      soft_service_ids: selectedOption.map((option) => option.value),
      activity: {
        checklist_id: id,
      },
      assigned_to: selectedUserOption.map((opt)=> opt.value),
    };
    try {
      toast.loading("Associating Checklist");
      const resp = await postServiceAssociation(payload);
      console.log(resp);
      toast.dismiss();
      setSelectedOption([])
      setSelectedUserOption([])
      // window.location.reload();
      toast.success("Checklist Associated");
      setAdded(true)
    } catch (error) {
      console.log(error);
      toast.dismiss()
    }
  };
  const handleDeleteAssociation = async (service_name, user_name) => {
    try {
     
      const service = services.find(service => service.label === service_name);
      
     
      const user = assignedTo.find(user => user.label === user_name);
  
      
      if (!service || !user) {
        throw new Error("Invalid service or user");
      }
  
      const service_id = service.value; 
      const assigned_to = user.value;   
  
     
      toast.loading("Deleting Association...");
      const deleteresp = await deleteAssociationList(id, assigned_to, service_id);
      console.log("delete resp", deleteresp);
      toast.dismiss();
  
      setAdded(true); 
      toast.success("Association Deleted");
    } catch (error) {
      console.error("Error deleting association:", error);
      toast.dismiss();
      toast.error("Failed to delete association");
    }
  };
  
  
  return (
    <section className="flex ">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <h2 className="text-lg font-medium border-b-2 border-gray-400 mb-2">
          Associate Checklist
        </h2>
        <div className="grid md:grid-cols-3 items-center gap-4">
          <div className="w-full z-20">
            {/* <label htmlFor="" className="font-medium my-2">
              Services
            </label> */}
            <Select
              isMulti
              onChange={handleChangeSelect}
              options={services}
              noOptionsMessage={() => "No Services Available"}
              //   maxMenuHeight={90}
              placeholder="Select Services"
            />
          </div>
          <div className="flex flex-col z-20">
            {/* <label className="font-medium my-2">Assign To</label> */}
            {/* <select
              value={formData.assigned_to}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-sm"
            >
              <option value="">Select Assign To</option>
              {assignedTo.map((assign) => (
                <option key={assign.id} value={assign.id}>
                  {assign.firstname} {assign.lastname}
                </option>
              ))}
                
            </select> */}
             <Select
              isMulti
              onChange={handleUserChangeSelect}
              options={assignedTo}
              noOptionsMessage={() => "No Users Available"}
              placeholder="Select Users"
            />
          </div>
          <div>
            <button
              className="border-2 border-black p-1 px-4 rounded-md"
              onClick={handleAddAssociate}
            >
              Create Activity
            </button>
          </div>
        </div>
        <div className="my-2">
          <Table columns={column} data={association} />
        </div>
      </div>
    </section>
  );
};

export default AssociateServiceChecklist;
