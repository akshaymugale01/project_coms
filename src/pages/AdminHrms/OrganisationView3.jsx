import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import OrganizationTree from "./OrganisationTree";
import Table from "../../components/table/Table";

const OrganisationView3 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    effectiveFrom: "",
    branchLocation: "",
    department: "",
    designation: "",
    reportingSupervisor: "",
    comment: ""
  });

  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => openModal(row)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Reporting Supervisor",
      selector: (row) => row.Label,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "Mittu Panda",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ];

  const openModal = (row) => {
    setFormData({
      effectiveFrom: row.effectiveFrom || "",
      branchLocation: row.branchLocation || "",
      department: row.department || "",
      designation: row.designation || "",
      reportingSupervisor: row.reportingSupervisor || "",
      comment: row.comment || ""
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    closeModal();
  };

  return (
    <section className="flex">
      <OrganizationTree />
      <div className="w-full flex m-3 flex-col overflow-hidden">
      <p className="mb-5 mt-2 font-semibold">

      

Assign Missing Reporting Supervisor</p>
        <div className="flex justify-between my-5">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2>Job Information</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Effective From:
                <input
                  type="date"
                  name="effectiveFrom"
                  value={formData.effectiveFrom}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Branch Location:
                <input
                  type="text"
                  name="branchLocation"
                  value={formData.branchLocation}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Department:
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Designation:
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Reporting Supervisor:
                <input
                  type="text"
                  name="reportingSupervisor"
                  value={formData.reportingSupervisor}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Comment:
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
              </label>
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Save
                </button>
                <button type="button" onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrganisationView3;
