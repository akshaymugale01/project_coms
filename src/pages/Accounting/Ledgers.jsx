import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getLedgers,
  createLedger,
  updateLedger,
  deleteLedger,
  seedDefaultLedgers,
  getLedgersByGroup,
  getLedgerBalanceSheet,
} from "../../api/accountingApi";
import { getAccountGroups } from "../../api/accountingApi";
import { getAllUnits } from "../../api";
import LedgerModal from "./LedgerModal";
import LedgerBalanceSheet from "./LedgerBalanceSheet";
import Navbar from "../../components/Navbar";

const Ledgers = () => {
  const [ledgers, setLedgers] = useState([]);
  const [accountGroups, setAccountGroups] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGroupId, setFilterGroupId] = useState("");
  const [filterUnitId, setFilterUnitId] = useState("");
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);

  useEffect(() => {
    fetchLedgers();
    fetchAccountGroups();
    fetchUnits();
  }, []);

  const fetchLedgers = async () => {
    setLoading(true);
    try {
      const response = await getLedgers();
      setLedgers(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch ledgers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountGroups = async () => {
    try {
      const response = await getAccountGroups();
      setAccountGroups(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch account groups", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await getAllUnits();
      setUnits(response.data || []);
    } catch (error) {
      console.error("Failed to fetch units", error);
      setUnits([]);
    }
  };

  const handleFilterByGroup = async (groupId) => {
    setFilterGroupId(groupId);
    if (!groupId) {
      fetchLedgers();
      return;
    }

    setLoading(true);
    try {
      const response = await getLedgersByGroup(groupId);
      setLedgers(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to filter ledgers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedLedger(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ledger) => {
    setSelectedLedger(ledger);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ledger?"))
      return;

    try {
      await deleteLedger(id);
      toast.success("Ledger deleted successfully");
      fetchLedgers();
    } catch (error) {
      toast.error("Failed to delete ledger");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedLedger) {
        await updateLedger(selectedLedger.id, data);
        toast.success("Ledger updated successfully");
      } else {
        await createLedger(data);
        toast.success("Ledger created successfully");
      }
      setIsModalOpen(false);
      fetchLedgers();
    } catch (error) {
      toast.error("Failed to save ledger");
      console.error(error);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("This will seed default ledgers. Continue?")) return;

    try {
      await seedDefaultLedgers();
      toast.success("Default ledgers seeded successfully");
      fetchLedgers();
    } catch (error) {
      toast.error("Failed to seed default ledgers");
      console.error(error);
    }
  };

  const handleViewBalanceSheet = async (ledger) => {
    try {
      const response = await getLedgerBalanceSheet(ledger.id);
      setBalanceSheetData({ ledger, data: response.data });
      setShowBalanceSheet(true);
    } catch (error) {
      toast.error("Failed to fetch balance sheet");
      console.error(error);
    }
  };

  const filteredLedgers = ledgers.filter((ledger) => {
    const matchesSearch = (ledger.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesUnit = !filterUnitId || ledger.unit_id === parseInt(filterUnitId);
    return matchesSearch && matchesUnit;
  });

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ledgers</h1>
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
            + Add Ledger
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search ledgers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded"
        />
        <select
          value={filterGroupId}
          onChange={(e) => handleFilterByGroup(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Groups</option>
          {accountGroups && accountGroups
            .filter(g => !g.parent_id)  // Only show primary groups as optgroup
            .map((primaryGroup) => (
              <optgroup key={primaryGroup.id} label={`${primaryGroup.name} (${primaryGroup.group_type})`}>
                {/* Show sub-groups under each primary group */}
                {accountGroups
                  .filter(g => g.parent_id === primaryGroup.id)
                  .map(subGroup => (
                    <option key={subGroup.id} value={subGroup.id}>
                      &nbsp;&nbsp;↳ {subGroup.name}
                    </option>
                  ))}
              </optgroup>
            ))}
        </select>
        <select
          value={filterUnitId}
          onChange={(e) => setFilterUnitId(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Units</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
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
                  Account Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opening Balance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLedgers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No ledgers found
                  </td>
                </tr>
              ) : (
                filteredLedgers.map((ledger) => (
                  <tr key={ledger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {ledger.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ledger.account_group?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ledger.unit?.name || <span className="text-gray-400 text-xs">Organization-wide</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ledger.code || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     ₹{parseFloat(ledger.opening_balance || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewBalanceSheet(ledger)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Balance Sheet
                      </button>
                      <button
                        onClick={() => handleEdit(ledger)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ledger.id)}
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
        <LedgerModal
          ledger={selectedLedger}
          accountGroups={accountGroups}
          units={units}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {showBalanceSheet && balanceSheetData && (
        <LedgerBalanceSheet
          data={balanceSheetData}
          onClose={() => setShowBalanceSheet(false)}
        />
      )}
    </div>
    </section>
  );
};

export default Ledgers;
