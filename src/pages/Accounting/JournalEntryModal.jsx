import React, { useState, useEffect } from "react";
import { getLedgers } from "../../api/accountingApi";

const JournalEntryModal = ({ entry, onClose, onSave }) => {
  const [ledgers, setLedgers] = useState([]);

  // ✅ Correct payload structure
  const [formData, setFormData] = useState({
    entry_date: new Date().toISOString().split("T")[0],
    // reference: "",
    invoice_number: "",
    invoice_date: "",
    expense_month: "",
    expense_year: "",
    description: "",
    journal_lines: [
      { ledger_id: "", debit: 0, credit: 0 },
      { ledger_id: "", debit: 0, credit: 0 },
    ],
  });

  useEffect(() => {
    fetchLedgers();

    // If editing → load entry
    if (entry) {
      console.log("[JournalEntryModal] Raw entry received:", entry);
      // Support multiple possible API shapes including Rails JournalEntry#entry_lines
      const rawLines =
        entry.entry_lines ||
        entry.journal_entry_lines ||
        entry.entries ||
        entry.lines ||
        [];
      const normalizedLines = rawLines.length
        ? rawLines.map((l) => {
            // Handle API format with entry_side and amount
            let debitValue = 0;
            let creditValue = 0;
            
            if (l.entry_side === "debit") {
              debitValue = l.amount ?? 0;
            } else if (l.entry_side === "credit") {
              creditValue = l.amount ?? 0;
            } else {
              // Fallback for other formats
              debitValue = l.debit ?? l.amount_debit ?? l.debit_amount ?? 0;
              creditValue = l.credit ?? l.amount_credit ?? l.credit_amount ?? 0;
            }
            
            console.log('[JournalEntryModal] Line data:', { l, debitValue, creditValue });
            return {
              id: l.id, // Preserve ID for updates
              ledger_id: String(l.ledger_id || l.ledger?.id || l.ledger?.ledger_id || ""),
              debit: Number(debitValue) || 0,
              credit: Number(creditValue) || 0,
            };
          })
        : [
            { ledger_id: "", debit: 0, credit: 0 },
            { ledger_id: "", debit: 0, credit: 0 },
          ];
      setFormData({
        entry_date:
          entry.entry_date?.split("T")[0] ||
          entry.date?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        // reference: entry.reference || entry.entry_number || "",
        invoice_number: entry.invoice_number || "",
        invoice_date: entry.invoice_date ? entry.invoice_date.split("T")[0] : "",
        expense_month: entry.expense_month ? String(entry.expense_month) : "",
        expense_year: entry.expense_year ? String(entry.expense_year) : "",
        description: entry.description || entry.narration || "",
        journal_lines: normalizedLines,
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

  // ✅ Ledger row update
  const handleEntryChange = (index, field, value) => {
    const lines = formData.journal_lines || [];
    const newLines = [...lines];
    // Keep as string if not empty, convert to number for calculations
    newLines[index][field] = value === "" ? "" : value;
    setFormData((prev) => ({ ...prev, journal_lines: newLines }));
  };

  const addEntry = () => {
    setFormData((prev) => ({
      ...prev,
      journal_lines: [
        ...(prev.journal_lines || []),
        { ledger_id: "", debit: 0, credit: 0 },
      ],
    }));
  };

  const removeEntry = (index) => {
    const lines = formData.journal_lines || [];
    if (lines.filter(l => !l._destroy).length <= 2) return;

    const line = lines[index];
    // If line has an ID, mark for deletion; otherwise just remove from array
    if (line.id) {
      const newLines = [...lines];
      newLines[index] = { ...line, _destroy: true };
      setFormData((prev) => ({ ...prev, journal_lines: newLines }));
    } else {
      const newLines = lines.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, journal_lines: newLines }));
    }
  };

  // ✅ Calculate totals
  const calculateTotals = () => {
    // Support both 'journal_lines' and 'entries' field names
    const lines = formData.journal_lines || formData.entries || [];
    
    const totalDebit = lines.reduce(
      (sum, line) => sum + (parseFloat(line?.debit) || 0),
      0
    );

    const totalCredit = lines.reduce(
      (sum, line) => sum + (parseFloat(line?.credit) || 0),
      0
    );

    return { totalDebit, totalCredit, difference: totalDebit - totalCredit };
  };

  const { totalDebit, totalCredit, difference } = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Must be balanced
    if (Math.abs(difference) > 0.01) {
      alert("Debit and Credit must be equal!");
      return;
    }

    // Shape payload for backend: { journal_entry: { entry_date, reference, description, lines: [...] } }
    const payload = {
      journal_entry: {
        entry_date: formData.entry_date,
        // reference: formData.reference,
        invoice_number: formData.invoice_number,
        invoice_date: formData.invoice_date,
        expense_month: formData.expense_month,
        expense_year: formData.expense_year,
        description: formData.description,
        entry_lines_attributes: (formData.journal_lines || []).map((l) => {
          const line = {
            ledger_id: l.ledger_id,
            debit: Number(l.debit || 0),
            credit: Number(l.credit || 0),
          };
          // Include ID for updates
          if (l.id) line.id = l.id;
          // Include _destroy for deletions
          if (l._destroy) line._destroy = true;
          return line;
        }),
      },
    };
    console.log("[JournalEntryModal] Save payload:", payload);
    onSave(payload);
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
          {/* Top fields */}
          <div className="grid grid-cols-1 gap-4 mb-4">
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
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference *
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div> */}
          </div>

          {/* Invoice fields */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                name="invoice_number"
                value={formData.invoice_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                name="invoice_date"
                value={formData.invoice_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expense Month
              </label>
              <select
                name="expense_month"
                value={formData.expense_month}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expense Year
              </label>
              <select
                name="expense_year"
                value={formData.expense_year}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Journal Lines */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Journal Entry Lines</h3>
              <button
                type="button"
                onClick={addEntry}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded"
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
                  {formData.journal_lines.filter(line => !line._destroy).map((line, index) => {
                    // Get the actual index in the full array
                    const actualIndex = formData.journal_lines.indexOf(line);
                    return (
                    <tr key={line.id || index} className="border-t">
                      <td className="px-4 py-2">
                        <select
                          value={line.ledger_id}
                          onChange={(e) =>
                            handleEntryChange(actualIndex, "ledger_id", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded"
                          required
                        >
                          <option value="">Select Ledger/Vendor</option>
                          {ledgers.map((ledger) => (
                            <option key={ledger.id} value={ledger.id}>
                              {ledger.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={line.debit === 0 ? "" : line.debit}
                          onChange={(e) =>
                            handleEntryChange(actualIndex, "debit", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </td>

                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={line.credit === 0 ? "" : line.credit}
                          onChange={(e) =>
                            handleEntryChange(actualIndex, "credit", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </td>

                      <td className="px-4 py-2">
                        {formData.journal_lines.filter(l => !l._destroy).length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeEntry(actualIndex)}
                            className="text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                  })}

                  {/* Totals Row */}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="px-4 py-2 text-right">
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

          {/* Warning */}
          {Math.abs(difference) > 0.01 && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
              Debit and Credit totals must be equal!
            </div>
          )}

          {/* Submit buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={Math.abs(difference) > 0.01}
              className="px-4 py-2 bg-blue-600 text-white rounded"
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
