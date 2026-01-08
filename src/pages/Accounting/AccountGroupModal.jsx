import React, { useState, useEffect } from "react";

const AccountGroupModal = ({ group, allGroups = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    group_type: "asset",
    parent_id: "",
    description: "",
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        code: group.code || "",
        group_type: group.group_type || "asset",
        parent_id: group.parent_id || "",
        description: group.description || "",
      });
    }
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      account_group: {
        name: formData.name,
        code: formData.code,
        group_type: formData.group_type,
        parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
        description: formData.description,
      }
    };
    onSave(dataToSend);
  };

  // Get primary groups (only groups with no parent)
  const primaryGroups = allGroups && allGroups.filter(g => !g.parent_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {group ? "Edit Account Group" : "Create Account Group"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                placeholder="e.g., ASSET-001"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Type *
              </label>
              <select
                name="group_type"
                value={formData.group_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
                <option value="equity">Equity</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Group (Optional)
              </label>
              <select
                name="parent_id"
                value={formData.parent_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Create as Primary Group</option>
                {primaryGroups && primaryGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.group_type})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for primary groups, select a group to make this a sub-group
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {group ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountGroupModal;
