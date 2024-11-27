import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAssignedTo,
  getAssociationList,
  getSiteAsset,
  getSoftServices,
  postAssetAssociation,
} from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const AssociateAssetChecklist = () => {
  const [assets, setAssets] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([]);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    assigned_to: [],
  });

  const column = [
    {
      name: "Asset Name",
      selector: (row) => row.asset_name,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.user_name,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchAssetsList = async () => {
      // getting all the services
      const assetListResp = await getSiteAsset();
      const asset = assetListResp.data.site_assets;
      //   console.log(servicesListResp);
      const assetList = asset.map((a) => ({
        value: a.id,
        label: a.name,
      }));
      setAssets(assetList);
    };
    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      console.log(assignedToList.data)
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label:`${ u.firstname} ${u.lastname}`,
      }));
      console.log(user)
      setAssignedTo(user);
    };

    const fetchAssociationList = async () => {
     try {
       const assoResp = await getAssociationList(id);
       
       const sortedData = assoResp.data.associated_with.sort((a,b)=> {
        return new Date(a.created_at) - new Date(b.created_at)
       })
       console.log(sortedData);
       setAssociation(sortedData);
     } catch (error) {
      console.log(error)
     }
    };

    fetchAssetsList();
    fetchAssignedTo();
    fetchAssociationList();
  }, [added]);

  var handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, assigned_to: e.target.value });
  };

  const handleAddAssociate = async () => {
    const payload = {
      asset_ids: selectedOption.map((option) => option.value),
    
      activity: {
        checklist_id: id,
      },
      assigned_to: selectedUserOption.map((opt)=> opt.value),
    };
    try {
      toast.loading("Associating Checklist");
      console.log(payload);
      const resp = await postAssetAssociation(payload);
      console.log(resp);
      toast.dismiss();
      // window.location.reload();
      toast.success("Checklist Associated");
      setAdded(true);
      setSelectedOption([])
      setSelectedUserOption([])
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }finally{
      setTimeout(() => {
        setAdded(false)
      }, 500);
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
              isClearable={false}
              closeMenuOnSelect={false}
              isMulti
              onChange={handleChangeSelect}
              options={assets}
              noOptionsMessage={() => "No Assets Available"}
              //   maxMenuHeight={90}
              placeholder="Select Assets"
             
            />
          </div>
          <div className="w-full z-20">
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
            closeMenuOnSelect={false}
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
        <div className="my-4">
          <Table columns={column} data={association} />
        </div>
      </div>
    </section>
  );
};

export default AssociateAssetChecklist;
