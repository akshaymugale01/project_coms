import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAssignedTo,
  getAssociationList,
  getSoftServices,
  postServiceAssociation,
} from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const TOKEN = "e6fbf77f4fbb5a72c4150e495c961972f0f14059d8a6670f";

const AssociateServiceChecklist = () => {
  const [services, setServices] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [added, setAdded] = useState(false);

  // EDIT MODAL STATES
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState(null);

  const { id } = useParams();

  // ⭐ Fetch All Data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const servicesResp = await getSoftServices();
        const servicesList = servicesResp.data.map((s) => ({
          value: s.id,
          label: s.name,
        }));
        setServices(servicesList);

        const usersResp = await getAssignedTo();
        const usersList = usersResp.data.map((u) => ({
          value: u.id,
          label: `${u.firstname} ${u.lastname}`,
        }));
        setAssignedTo(usersList);

        const assocResp = await getAssociationList(id);

        const assocRows = assocResp.data.associated_with.map((row, index) => ({
          unique_id: `${row.service_id}-${index}`,
          ...row,
        }));

        setAssociation(assocRows);
      } catch (err) {
        console.error("Fetching error:", err);
      }
    };

    fetchAll();
    setAdded(false);
  }, [added]);

  // ⭐ Add New Association
  const handleAddAssociate = async () => {
    if (selectedOption.length === 0 || selectedUserOption.length === 0) {
      toast.error("Select both Service & User");
      return;
    }

    const payload = {
      soft_service_ids: selectedOption.map((o) => o.value),
      activity: { checklist_id: id },
      assigned_to: selectedUserOption.map((u) => u.value),
    };

    try {
      toast.loading("Adding...");
      await postServiceAssociation(payload);
      toast.dismiss();
      toast.success("Association Added!");
      setSelectedOption([]);
      setSelectedUserOption([]);
      setAdded(true);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to Add");
      console.error(err);
    }
  };

  // ⭐ Edit Action
  const handleEditAssociation = (row) => {
    const service = services.find((s) => s.value === row.service_id);
    const user = assignedTo.find((u) => u.value === row.user_id);

    setEditService(service || null);
    setEditUser(user || null);
    setEditData(row);

    setShowEditModal(true);
  };

  // ⭐ Update API Call
  const handleUpdate = async () => {
    if (!editService || !editUser) {
      toast.error("Please select both fields");
      return;
    }

    const payload = {
      soft_service_ids: [editService.value],
      activity: { checklist_id: id },
      assigned_to: [editUser.value],
    };

    try {
      toast.loading("Updating...");
      await postServiceAssociation(payload);
      toast.dismiss();
      toast.success("Updated Successfully!");

      setShowEditModal(false);
      setAdded(true);
    } catch (err) {
      toast.dismiss();
      toast.error("Update failed");
      console.error(err);
    }
  };

  // ⭐ DELETE Action (Fixed + Instant UI Update)
  const handleDeleteAssociation = async (row) => {
    try {
      const deleteUrl =
        `https://admin.vibecopilot.ai/activities/bulk_destroy.json` +
        `?checklist_id=${id}` +
        `&soft_service_id=${row.service_id}` +
        `&token=${TOKEN}`;

      toast.loading("Deleting...");

      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      const result = await response.json();

      toast.dismiss();
      toast.success(result.message || "Deleted Successfully!");

      // ⭐ INSTANT UI REMOVE (Fix)
      setAssociation((prev) =>
        prev.filter((item) => item.service_id !== row.service_id)
      );

    } catch (err) {
      toast.dismiss();
      toast.error("Delete failed");
      console.error(err);
    }
  };

  // ⭐ Edit Modal UI
  const EditModal = () => {
    if (!showEditModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Edit Association</h2>

          <label className="font-medium">Service</label>
          <Select
            value={editService}
            onChange={setEditService}
            options={services}
            className="mb-4"
          />

          <label className="font-medium">Assigned To</label>
          <Select
            value={editUser}
            onChange={setEditUser}
            options={assignedTo}
            className="mb-6"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ⭐ Table Columns
  const column = [
    {
      name: "Service Name",
      selector: (row) => row.service_name,
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
        <div className="flex items-center gap-4">

          <FaEdit
            size={18}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => handleEditAssociation(row)}
          />

          <FaTrash
            size={18}
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => handleDeleteAssociation(row)}
          />

        </div>
      ),
    },
  ];

  return (
    <section className="flex">
      <Navbar />

      <EditModal />

      <div className="p-4 w-full my-2 flex mx-3 flex-col">
        <h2 className="text-lg font-medium border-b-2 border-gray-400 mb-2">
          Associate Checklist
        </h2>

        <div className="grid md:grid-cols-3 items-center gap-4">
          <Select
            isMulti
            onChange={(v) => setSelectedOption(v)}
            options={services}
            placeholder="Select Services"
          />

          <Select
            isMulti
            onChange={(v) => setSelectedUserOption(v)}
            options={assignedTo}
            placeholder="Select Users"
          />

          <button
            className="border-2 border-black py-1 px-4 rounded hover:bg-black hover:text-white"
            onClick={handleAddAssociate}
          >
            Create Activity
          </button>
        </div>

        <div className="my-2">
          <Table columns={column} data={association} />
        </div>
      </div>
    </section>
  );
};

export default AssociateServiceChecklist;
