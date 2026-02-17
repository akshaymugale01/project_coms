import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  deleteServiceAssociation,
  getAssignedTo,
  getAssociationList,
  getSoftServices,
  postServiceAssociation,
  updateActivity,
} from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { DNA } from "react-loader-spinner";

const AssociateServiceChecklist = () => {
  const [services, setServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([]);
  const [added, setAdded] = useState(false);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);


  // console.log("services", services);

  const { id } = useParams();

  const deleteService = async (row) => {
  const confirmDelete = window.confirm(
    "Please Confirm To Delete Service?"
  );
  if (!confirmDelete) return;

  try {
    toast.loading("Deleting Association...");

    // 🔥 Use direct ID from row
    await deleteServiceAssociation({
      checklist_id: id,
      soft_service_id: row.soft_service_id,
    });

    toast.dismiss();
    toast.success("Association Deleted");

    // 🔥 Refresh list from backend instead of filtering manually
    fetchAssociationList();

  } catch (err) {
    console.error("Delete failed:", err);
    toast.dismiss();
    toast.error("Failed to delete association");
  }
};
const fetchAssociationList = async () => {
  setListLoading(true);
  try {
    const assoResp = await getAssociationList(id);

    const sortedData = assoResp.data.associated_with.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    setAssociation(sortedData);
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch associated checklist data.");
  } finally {
    setListLoading(false);
  }
};

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
            onClick={() => deleteService(row)}
          >
            <BsTrash />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchServicesList = async () => {
      // getting all the services
      const servicesListResp = await getSoftServices();
      const softServices = servicesListResp.data.soft_services;
      // console.log("Soft Services:", softServices);
      const serviceList = softServices.map((service) => ({
        value: service.id,
        label: service.name,
      }));
      // console.log("Service list", serviceList);
      setServices(serviceList);
    };
    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      // console.log(assignedToList.data);
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label: `${u.firstname} ${u.lastname}`,
      }));
      // console.log("user list", user);
      setAssignedTo(user);
    };
    const fetchAssociationList = async () => {
      setListLoading(true);
      try {
        const assoResp = await getAssociationList(id);
        // console.log("getdata", assoResp.data.associated_with);
        const sortedData = assoResp.data.associated_with.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setAssociation(
          sortedData.map((item) => ({
            ...item,
            id: item.id || item.service_id,
          }))
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch associated checklist data.");
      } finally {
        setListLoading(false);
      }
    };

    fetchServicesList();
    fetchAssignedTo();
    fetchAssociationList();
  }, [added, id]);

  var handleChangeSelect = (selectedOption) => {
    // console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };

  // Filter out already associated services
  const associatedServiceIds = association
    .map((a) => {
      // Check all possible service ID fields
      const serviceId = a.service_id || a.soft_service_id || a.id;
      // console.log("Association item:", a, "Service ID:", serviceId);
      return serviceId;
    })
    .filter(Boolean); // Remove any undefined/null values

  // Also filter by service name as a fallback
  const associatedServiceNames = association
    .map((a) => a.service_name)
    .filter(Boolean);

  const availableServices = services.filter((service) => {
    const isAssociatedById = associatedServiceIds.includes(service.value);
    const isAssociatedByName = associatedServiceNames.includes(service.label);
    const shouldExclude = isAssociatedById || isAssociatedByName;

    console.log(`Service "${service.label}" (ID: ${service.value}):`, {
      isAssociatedById,
      isAssociatedByName,
      shouldExclude,
    });

    return !shouldExclude;
  });

  // console.log("Association data:", association);
  // console.log("Associated Service IDs:", associatedServiceIds);
  // console.log("Associated Service Names:", associatedServiceNames);
  // console.log("All Services:", services);
  // console.log("Available Services:", availableServices);

 const handleAddAssociate = async () => {
  if (!selectedOption.length) {
    toast.error("Please select at least one service.");
    return;
  }

  if (!selectedUserOption.length) {
    toast.error("Please assign at least one user.");
    return;
  }

  const payload = {
    soft_service_ids: selectedOption.map((option) => option.value),
    activity: {
      checklist_id: id,
      asset_id: id, // 🔥 ADD THIS IF id IS ASSET
    },
    assigned_to: selectedUserOption.map((opt) => opt.value),
  };

  try {
    setLoading(true);
    toast.loading("Associating Checklist");

    await postServiceAssociation(payload);

    toast.dismiss();
    toast.success("Checklist Associated");

    setSelectedOption([]);
    setSelectedUserOption([]);

    await fetchAssociationList();
  } catch (error) {
    console.error("Checklist creation failed:", error);
    toast.dismiss();
    toast.error("Failed to create checklist");
  } finally {
    setLoading(false);
  }
};

  const EditAssociationModal = ({
    show,
    onClose,
    associationData,
    services,
    assignedTo,
    onUpdate,
  }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
      if (associationData) {
        // Get the service ID from multiple possible fields
        const serviceId =
          associationData.service_id ||
          associationData.soft_service_id ||
          associationData.id;
        const serviceName = associationData.service_name;

        // console.log("EditModal - Association data:", associationData);
        console.log(
          "EditModal - Service ID:",
          serviceId,
          "Service Name:",
          serviceName
        );

        // Pre-fill selected services
        if (serviceName) {
          // If we have serviceId, use it; otherwise find the service by name
          if (serviceId) {
            setSelectedServices([
              {
                label: serviceName,
                value: serviceId,
              },
            ]);
          } else {
            // Find service by name in the services list
            const foundService = services.find((s) => s.label === serviceName);
            if (foundService) {
              // console.log("Found service by name:", foundService);
              setSelectedServices([
                {
                  label: foundService.label,
                  value: foundService.value,
                },
              ]);
            } else {
              console.log("Service not found by name:", serviceName);
              // setSelectedServices([]);
            }
          }
        } else {
          setSelectedServices([]);
        }

        // Pre-fill selected users
        setSelectedUsers(
          associationData.users_with_ids
            ? associationData.users_with_ids.map((user) => ({
                label: user.user_name,
                value: user.user_id,
              }))
            : []
        );
      }
    }, [associationData, services]);

    const checklist_id = associationData?.checklist_id || id;

    const validateForm = ({ soft_service_ids, assigned_to, checklist_id }) => {
      toast.dismiss();

      if (!soft_service_ids || soft_service_ids.length === 0) {
        toast.error("Please select at least one service.");
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

      return true;
    };

    const handleSubmit = async () => {
      const serviceIds = selectedServices.map((service) => service.value);
      const userIds = selectedUsers.map((user) => user.value);

      const payload = {
        soft_service_ids: serviceIds,
        assigned_to: userIds,
        checklist_id: checklist_id,
      };

      if (!validateForm(payload)) {
        return;
      }

      try {
        const update = await updateActivity(id, payload);
        // console.log("Update response:", update);
        toast.success("Association updated successfully.");
        onUpdate();
        onClose();
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
            <label className="font-semibold">Service</label>
            <Select
              isMulti
              options={services} // Use all services, not filtered ones
              value={selectedServices}
              onChange={setSelectedServices}
              placeholder="Select Services"
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
        <div className="grid md:grid-cols-3 items-center gap-4">
          <div className="w-full z-20">
            <Select
              isMulti
              onChange={handleChangeSelect}
              options={availableServices} // Use filtered services here
              noOptionsMessage={() => "No Services Available"}
              placeholder="Select Services"
              value={selectedOption}
              isDisabled={loading}
              isLoading={services.length === 0}
            />
            {availableServices.length === 0 && services.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                All services are already associated with this checklist
              </p>
            )}
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
            <Table columns={column} data={association} pagination={false} />
          )}
        </div>
      </div>
      <EditAssociationModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        associationData={editData}
        services={services}
        assignedTo={assignedTo}
        onUpdate={() => setAdded(true)} // triggers data refresh
      />
    </section>
  );
};

export default AssociateServiceChecklist;