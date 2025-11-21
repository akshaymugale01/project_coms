import React, { useState, useEffect } from "react";
import { getLedgers } from "../../api/accountingApi";

const JournalEntryModal = ({ entry, onClose, onSave }) => {
  const [ledgers, setLedgers] = useState([]);
  const [formData, setFormData] = useState({
    entry_date: new Date().toISOString().split("T")[0],
    reference: "",
    description: "",
    entries: [
      { ledger_id: "", debit: 0, credit: 0, description: "" },
      { ledger_id: "", debit: 0, credit: 0, description: "" },
    ],
  });

  useEffect(() => {
    fetchLedgers();
    if (entry) {
      setFormData({
        entry_date: entry.entry_date?.split("T")[0] || "",
        reference: entry.reference || "",
        description: entry.description || "",
        entries: entry.entries || [
          { ledger_id: "", debit: 0, credit: 0, description: "" },
          { ledger_id: "", debit: 0, credit: 0, description: "" },
        ],
      });
    }
  }, [entry]);

  const fetchLedgers = async () => {
    try {
      const response = await getLedgers();
      setLedgers(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch ledgers", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...formData.entries];
    newEntries[index][field] = value;
    setFormData((prev) => ({ ...prev, entries: newEntries }));
  };

  const addEntry = () => {
    setFormData((prev) => ({
      ...prev,
      entries: [
        ...prev.entries,
        { ledger_id: "", debit: 0, credit: 0, description: "" },
      ],
    }));
  };

  const removeEntry = (index) => {
    if (formData.entries.length <= 2) return;
    const newEntries = formData.entries.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, entries: newEntries }));
  };

  const calculateTotals = () => {
    const totalDebit = formData.entries.reduce(
      (sum, entry) => sum + parseFloat(entry.debit || 0),
      0
    );
    const totalCredit = formData.entries.reduce(
      (sum, entry) => sum + parseFloat(entry.credit || 0),
      0
    );
    return { totalDebit, totalCredit, difference: totalDebit - totalCredit };
  };

  const { totalDebit, totalCredit, difference } = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Math.abs(difference) > 0.01) {
      alert("Debit and Credit must be equal!");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {entry ? "Edit Journal Entry" : "Create Journal Entry"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entry Date *
              </label>
              <input
                type="date"
                name="entry_date"
                value={formData.entry_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference *
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Journal Entry Lines</h3>
              <button
                type="button"
                onClick={addEntry}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Add Line
              </button>
            </div>

            <div className="border rounded overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Ledger
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Debit
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Credit
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.entries.map((entryLine, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <select
                          value={entryLine.ledger_id}
                          onChange={(e) =>
                            handleEntryChange(index, "ledger_id", e.target.value)
                          }
                          required
                          className="w-full px-2 py-1 border rounded text-sm"
                        >
                          <option value="">Select Ledger</option>
                          {ledgers.map((ledger) => (
                            <option key={ledger.id} value={ledger.id}>
                              {ledger.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={entryLine.description}
                          onChange={(e) =>
                            handleEntryChange(index, "description", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={entryLine.debit}
                          onChange={(e) =>
                            handleEntryChange(index, "debit", e.target.value)
                          }
                          step="0.01"
                          min="0"
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={entryLine.credit}
                          onChange={(e) =>
                            handleEntryChange(index, "credit", e.target.value)
                          }
                          step="0.01"
                          min="0"
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        {formData.entries.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeEntry(index)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td colSpan="2" className="px-4 py-2 text-right">
                      Totals:
                    </td>
                    <td className="px-4 py-2">₹{totalDebit.toFixed(2)}</td>
                    <td className="px-4 py-2">₹{totalCredit.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      {Math.abs(difference) > 0.01 && (
                        <span className="text-red-600 text-sm">
                          Diff: ₹{Math.abs(difference).toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {Math.abs(difference) > 0.01 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              Warning: Debit and Credit totals must be equal!
            </div>
          )}

          <div className="flex justify-end gap-3">
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
              disabled={Math.abs(difference) > 0.01}
            >
              {entry ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalEntryModal;
