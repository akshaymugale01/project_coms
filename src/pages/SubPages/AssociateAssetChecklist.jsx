import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAssignedTo,
  getAssociationList,
  getSiteAsset,
  getSoftServices,
  postAssetAssociation,
  getAssetGroups,
  getAssetSubGroups,
  getGenericGroupAssetChecklist,
  getGenericSubGroupAssetChecklist,
  deleteAssetAssociation,
  updateActivity,
} from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import { PenSquareIcon, Trash } from "lucide-react";
import { BsPencil, BsPencilSquare, BsTrash } from "react-icons/bs";

const AssociateAssetChecklist = () => {
  const [assets, setAssets] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([]);
  const [added, setAdded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    assigned_to: [],
  });
  const [checklistType, setChecklistType] = useState("individual");
  const handleChecklistTypeChange = (e) => {
    setChecklistType(e.target.value); // Update the checklist type state based on the selected value
  };
  const [groupId, setGroupId] = useState("");
  const [subgroupId, setSubgroupId] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  useEffect(() => {
    const fetchChecklistGroup = async () => {
      try {
        const ChecklistGroupsResp = await getAssetGroups();
        setGroups(ChecklistGroupsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChecklistGroup();
  }, []);

  useEffect(() => {
    if (groupId) {
      const fetchSubGroup = async () => {
        try {
          const subCatResp = await getAssetSubGroups(groupId);
          setSubgroups(
            subCatResp.map((subCat) => ({
              label: subCat.name, // label for react-select
              value: subCat.id, // value for react-select
            }))
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchSubGroup();
    }
  }, [groupId]);

  // console.log("id:", id);

  const deleteActivity = async (activity) => {
    const confirmDelete = window.confirm("Please Confirm To Delete Activity?");
    if (!confirmDelete) return;

    const { asset_id } = activity;

    // console.log("activity:", activity);
    const checklist_id = id;
    console.log("checklist_id:", checklist_id);
    console.log("asset_id:", asset_id);

    try {
      const resp = await deleteAssetAssociation({
        checklist_id,
        asset_id,
      });
      console.log("Deleted successfully!", resp);
      toast.success("Deleted successfully!");
      setAssociation((prev) => prev.filter((a) => a.id !== activity.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete.");
    }
  };
  const column = [
    {
      name: "Asset Name",
      selector: (row) => row.asset_name,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_to,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              setEditData(row);
              setShowEditModal(true);
            }}
          >
            <BsPencilSquare className="text-black" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteActivity(row)}
          >
            <BsTrash />
          </button>
        </div>
      ),
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
      // console.log(assignedToList.data);
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label: `${u.firstname} ${u.lastname}`,
      }));
      // console.log(user);
      setAssignedTo(user);
    };

    const fetchAssociationList = async () => {
      setListLoading(true);
      try {
        const assoResp = await getAssociationList(id);
        const sortedData = assoResp.data.associated_with.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setAssociation(
          sortedData.map((item) => ({
            ...item,
            id: item.id || item.asset_id,
          }))
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch associated checklist data.");
      } finally {
        setListLoading(false);
      }
    };

    fetchAssetsList();
    fetchAssignedTo();
    fetchAssociationList();
  }, [added]);

  console.log("Assiciation - Response", association);

    const associatedAssetIds = association.map((a) => a.asset_id);
    const availableAssets = assets.filter(
      (asset) => !associatedAssetIds.includes(asset.value)
    );
    
  var handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, assigned_to: e.target.value });
  };
  const navigate = useNavigate();

  const handleAddAssociate = async () => {
    const payload = {
      asset_ids: selectedOption.map((option) => option.value),

      activity: {
        checklist_id: id,
      },
      assigned_to: selectedUserOption.map((opt) => opt.value),
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

      setAssets([]);
      setSelectedOption([]);
      setSelectedUserOption([]);
    } catch (error) {
      console.error("Checklist creation failed:", error);
      toast.dismiss();
      toast.error("Failed to create checklist", {
        duration: 4000,
        icon: "❌",
        // Delay the tip to ensure it shows regardless of toast dismissal behavior
        onClose: () => {
          setTimeout(() => {
            toast(
              "💡 Tip: Association name, asset, and checklist must be unique for that time",
              {
                icon: "💡",
                duration: 6000,
              }
            );
          }, 100); // small delay to ensure UI stack is clear
        },
      });
    } finally {
      setTimeout(() => {
        setAdded(false);
      }, 500);
    }
  };

  const EditAssociationModal = ({
    show,
    onClose,
    associationData,
    assets,
    assignedTo,
    onUpdate,
  }) => {
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { id } = useParams();
    console.log("iddd", id);

    useEffect(() => {
      if (associationData) {
        // Pre-fill selected assets and users based on associationData
        setSelectedAssets(
          associationData.asset_id
            ? [
                {
                  label: associationData.asset_name,
                  value: associationData.asset_id,
                },
              ]
            : []
        );
        setSelectedUsers(
          associationData.users_with_ids
            ? associationData.users_with_ids.map((user) => ({
                label: user.user_name,
                value: user.user_id,
              }))
            : []
        );
      }
    }, [associationData]);

    const checklist_id = associationData?.checklist_id || id; // Use checklist_id from associationData or fallback to id

    const validateForm = ({ asset_ids, assigned_to, checklist_id }) => {
      toast.dismiss(); // Clear previous toasts

      if (!asset_ids || asset_ids.length === 0) {
        toast.error("Please select at least one asset.");
        return false;
      }

      if (!assigned_to || assigned_to.length === 0) {
        toast.error("Please assign to at least one user.");
        return false;
      }

      if (!checklist_id) {
        toast.error("Checklist ID is missing.");
        return false;
      }

      return true; // If everything passes
    };

    const handleSubmit = async () => {
      const assetIds = selectedAssets.map((asset) => asset.value);
      const userIds = selectedUsers.map((user) => user.value);

      const payload = {
        asset_ids: assetIds,
        assigned_to: userIds,
        checklist_id: checklist_id, // Use checklist_id from associationData
      };

      if (!validateForm(payload)) {
        return;
      }

      try {
        const update = await updateActivity(id, payload);
        console.log("Update response:", update);
        toast.success("Association updated successfully.");
        onUpdate(); // Trigger data refresh
        onClose(); // Close the modal
      } catch (err) {
        console.error("Failed to update association:", err);
        toast.error("Failed to update association.");
      }
    };

    if (!show) return null;

  

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[400px]">
          <h2 className="text-lg font-semibold mb-4">Edit Association</h2>
          <div className="mb-4">
            <label className="font-semibold">Asset</label>
            <Select
              isMulti
              options={assets}
              value={selectedAssets}
              onChange={setSelectedAssets}
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold">Assigned To</label>
            <Select
              isMulti
              options={assignedTo}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
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
        <div className="flex flex-col">
          <label className=" font-semibold">Checklist Type</label>
          <div className="flex items-center space-x-4">
            <label className="font-semibold">
              <input
                type="radio"
                name="checklistType"
                value="individual"
                checked={checklistType === "individual"}
                onChange={handleChecklistTypeChange}
              />{" "}
              Individual
            </label>
            <label className="font-semibold">
              <input
                type="radio"
                name="checklistType"
                value="assetGroup"
                checked={checklistType === "assetGroup"}
                onChange={handleChecklistTypeChange}
              />{" "}
              Asset Group
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-3 items-center gap-2">
          {checklistType === "individual" ? (
            <div className="flex flex-col z-20">
              <label className="font-semibold">Asset </label>
              <Select
                isClearable={false}
                closeMenuOnSelect={false}
                isMulti
                onChange={handleChangeSelect}
                options={availableAssets} // Use filtered assets here
                noOptionsMessage={() => "No Assets Available"}
                placeholder="Select Assets"
                value={selectedOption}
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="font-semibold">Group *</label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                >
                  <option>Select Group</option>
                  {groups.map((group) => (
                    <option value={group.id} key={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col z-50">
                <label className="font-semibold">Subgroup</label>
                <Select
                  isMulti
                  isSearchable
                  placeholder="Select Subgroup"
                  options={subgroups}
                  value={subgroupId}
                  onChange={(selected) => setSubgroupId(selected)}
                />
              </div>
            </>
          )}
          {/* <div className="w-full z-20"> */}
          {/* <label htmlFor="" className="font-medium my-2">
              Services
            </label> */}
          {/* <Select
              isClearable={false}
              closeMenuOnSelect={false}
              isMulti
              onChange={handleChangeSelect}
              options={assets}
              noOptionsMessage={() => "No Assets Available"}
              //   maxMenuHeight={90}
              placeholder="Select Assets"
             
            /> */}
          {/* </div> */}
          <div className="w-full flex flex-col z-20">
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
            <label htmlFor="" className="font-semibold">
              Assign to
            </label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              onChange={handleUserChangeSelect}
              options={assignedTo}
              noOptionsMessage={() => "No Users Available"}
              placeholder="Select Users"
              value={selectedUserOption}
            />
          </div>
          <div>
            <button
              className="border-2 border-black mt-6 p-1 px-4 rounded-md"
              onClick={handleAddAssociate}
              disabled={loading}
            >
              {loading ? "Processing..." : "Create Activity"}
            </button>
            {loading && (
              <DNA
                visible={true}
                height={40}
                width={40}
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
              />
            )}
          </div>
        </div>
        <div className="my-4">
          {listLoading ? (
            <div className="flex justify-center items-center h-32">
              <DNA
                visible={true}
                height={60}
                width={60}
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <Table columns={column} data={association} />
          )}
        </div>
      </div>
      <EditAssociationModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        associationData={editData}
        assets={assets}
        assignedTo={assignedTo}
        onUpdate={() => setAdded(true)} // triggers data refresh
      />
    </section>
  );
};

export default AssociateAssetChecklist;
