import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getAccountGroups,
  createAccountGroup,
  updateAccountGroup,
  deleteAccountGroup,
  seedDefaultAccountGroups,
} from "../../api/accountingApi";
import AccountGroupModal from "./AccountGroupModal";
import Navbar from "../../components/Navbar";

const AccountGroups = () => {
  const [accountGroups, setAccountGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAccountGroups();
  }, []);

  const fetchAccountGroups = async () => {
    setLoading(true);
    try {
      const response = await getAccountGroups();
      setAccountGroups(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch account groups");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedGroup(null);
    setIsModalOpen(true);
  };

  const handleEdit = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account group?"))
      return;

    try {
      await deleteAccountGroup(id);
      toast.success("Account group deleted successfully");
      fetchAccountGroups();
    } catch (error) {
      toast.error("Failed to delete account group");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedGroup) {
        await updateAccountGroup(selectedGroup.id, data);
        toast.success("Account group updated successfully");
      } else {
        await createAccountGroup(data);
        toast.success("Account group created successfully");
      }
      setIsModalOpen(false);
      fetchAccountGroups();
    } catch (error) {
      toast.error("Failed to save account group");
      console.error(error);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("This will seed default account groups. Continue?"))
      return;

    try {
      await seedDefaultAccountGroups();
      toast.success("Default account groups seeded successfully");
      fetchAccountGroups();
    } catch (error) {
      toast.error("Failed to seed default account groups");
      console.error(error);
    }
  };

  const filteredGroups = accountGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Account Groups</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSeedDefaults}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Seed Defaults
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Account Group
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search account groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No account groups found
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {group.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {group.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.group_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          group.nature === "debit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {group.nature}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {group.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(group)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(group.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AccountGroupModal
          group={selectedGroup}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    </section>
  );
};

export default AccountGroups;
