import React, { useState, useEffect } from "react";

const LedgerModal = ({ ledger, accountGroups, units, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    account_group_id: "",
    unit_id: "",
    code: "",
    opening_balance: 0,
    description: "",
  });

  useEffect(() => {
    if (ledger) {
      setFormData({
        name: ledger.name || "",
        account_group_id: ledger.account_group_id || "",
        unit_id: ledger.unit_id || "",
        code: ledger.code || "",
        opening_balance: ledger.opening_balance || 0,
        description: ledger.description || "",
      });
    }
  }, [ledger]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {ledger ? "Edit Ledger" : "Create Ledger"}
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
                Ledger/Vendor Name *
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
                Account Group *
              </label>
              <select
                name="account_group_id"
                value={formData.account_group_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Account Group</option>
                {accountGroups && accountGroups.map((group) => {
                  // Show parent groups normally
                  if (!group.parent_id) {
                    return (
                      <optgroup key={group.id} label={`${group.name} (${group.group_type})`}>
                        {accountGroups
                          .filter(g => g.parent_id === group.id)
                          .map(subGroup => (
                            <option key={subGroup.id} value={subGroup.id}>
                              &nbsp;&nbsp;→ {subGroup.name}
                            </option>
                          ))}
                      </optgroup>
                    );
                  }
                  return null;
                })}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select a sub-group to create ledgers under it
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit (Optional)
              </label>
              <select
                name="unit_id"
                value={formData.unit_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Unit (Organization-wide if blank)</option>
                {units && units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Assign to a specific department, branch, or project. Leave blank for organization-wide ledgers.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="number"
                name="opening_balance"
                value={formData.opening_balance}
                onChange={handleChange}
                step="0.01"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              {ledger ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LedgerModal;
