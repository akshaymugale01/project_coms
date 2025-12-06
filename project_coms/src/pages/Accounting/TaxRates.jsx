import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getTaxRates,
  createTaxRate,
  updateTaxRate,
  deleteTaxRate,
  seedDefaultTaxRates,
  getActiveTaxRates,
} from "../../api/accountingApi";
import TaxRateModal from "./TaxRateModal";

const TaxRates = () => {
  const [taxRates, setTaxRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaxRate, setSelectedTaxRate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  useEffect(() => {
    fetchTaxRates();
  }, []);

  const fetchTaxRates = async () => {
    setLoading(true);
    try {
      const response = showActiveOnly
        ? await getActiveTaxRates()
        : await getTaxRates();
      setTaxRates(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch tax rates");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxRates();
  }, [showActiveOnly]);

  const handleCreate = () => {
    setSelectedTaxRate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (taxRate) => {
    setSelectedTaxRate(taxRate);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tax rate?"))
      return;

    try {
      await deleteTaxRate(id);
      toast.success("Tax rate deleted successfully");
      fetchTaxRates();
    } catch (error) {
      toast.error("Failed to delete tax rate");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedTaxRate) {
        await updateTaxRate(selectedTaxRate.id, data);
        toast.success("Tax rate updated successfully");
      } else {
        await createTaxRate(data);
        toast.success("Tax rate created successfully");
      }
      setIsModalOpen(false);
      fetchTaxRates();
    } catch (error) {
      toast.error("Failed to save tax rate");
      console.error(error);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("This will seed default tax rates. Continue?"))
      return;

    try {
      await seedDefaultTaxRates();
      toast.success("Default tax rates seeded successfully");
      fetchTaxRates();
    } catch (error) {
      toast.error("Failed to seed default tax rates");
      console.error(error);
    }
  };

  const filteredTaxRates = taxRates.filter((rate) =>
    rate.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tax Rates</h1>
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
            + Add Tax Rate
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search tax rates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={(e) => setShowActiveOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Active Only</span>
        </label>
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
                  Rate (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
              {filteredTaxRates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No tax rates found
                  </td>
                </tr>
              ) : (
                filteredTaxRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {rate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rate.rate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {rate.tax_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ₹{
                          rate.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rate.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {rate.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(rate)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rate.id)}
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
        <TaxRateModal
          taxRate={selectedTaxRate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TaxRates;
