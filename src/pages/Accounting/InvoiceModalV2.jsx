import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getBuildings, getFloors, getUnits, getUnitDetails, getSetupUsersByUnit } from "../../api/index";
import { findInvoiceByNumber } from "../../api/accountingApi";

const InvoiceModalV2 = ({ invoice, onClose, onSave }) => {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [unitDetails, setUnitDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [invoiceSearchLoading, setInvoiceSearchLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    invoice_number: "",
    invoice_date: new Date().toISOString().split("T")[0],
    received_date: new Date().toISOString().split("T")[0],
    
    // Source Type
    source_type: "cam_bill", // "cam_bill" or "invoice"
    
    // Unit & Customer
    unit_id: "",
    customer_name: "",
    customer_email: "",
    gst_no: "",
    customer_address: "",
    
    // Amount
    amount: "",
    
    // Payment Details
    payment_mode: "cash", // "cash", "cheque", "online", "card"
    reference_number: "", // Transaction ID / Cheque No
    
    // Building & Status
    building_id: "",
    status: "received", // "pending", "received", "cancelled"
    
    // Notes
    notes: "",
  });

  useEffect(() => {
    fetchBuildings();
    if (invoice) {
      loadInvoiceData(invoice);
    }
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await getBuildings();
      setBuildings(response.data || []);
    } catch (error) {
      console.error("Failed to fetch buildings", error);
      toast.error("Failed to load buildings");
    } finally {
      setLoading(false);
    }
  };

  const fetchFloors = async (buildingId) => {
    try {
      setLoading(true);
      const response = await getFloors(buildingId);
      setFloors(response.data || []);
    } catch (error) {
      console.error("Failed to fetch floors", error);
      setFloors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnits = async (floorId) => {
    try {
      setLoading(true);
      const response = await getUnits(floorId);
      setUnits(response.data || []);
    } catch (error) {
      console.error("Failed to fetch units", error);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnitDetails = async (unitId) => {
    try {
      const response = await getUnitDetails(unitId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch unit details", error);
      return null;
    }
  };

  const fetchUsersByUnit = async (unitId) => {
    if (!unitId) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      const response = await getSetupUsersByUnit("users", unitId);
      const list = response?.data?.data || response?.data || [];
      const normalized = Array.isArray(list) ? list : [];
      setUsers(normalized);
    } catch (error) {
      console.error("Failed to fetch users for unit", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadInvoiceData = (inv) => {
    setFormData({
      invoice_number: inv.invoice_number || "",
      invoice_date: inv.invoice_date?.split("T")[0] || new Date().toISOString().split("T")[0],
      received_date: inv.received_date?.split("T")[0] || new Date().toISOString().split("T")[0],
      source_type: inv.source_type || "cam_bill",
      unit_id: inv.unit_id || "",
      customer_name: inv.customer_name || "",
      customer_email: inv.customer_email || "",
      gst_no: inv.gst_no || "",
      customer_address: inv.customer_address || "",
      amount: inv.amount?.toString() || "",
      payment_mode: inv.payment_mode || "cash",
      reference_number: inv.reference_number || "",
      building_id: inv.building_id || "",
      status: inv.status || "received",
      notes: inv.notes || "",
    });
  };

  const handleFindInvoice = async () => {
    const term = invoiceSearch.trim();
    if (!term) {
      toast.error("Please enter an invoice number");
      return;
    }
    try {
      setInvoiceSearchLoading(true);
      const res = await findInvoiceByNumber(term);
      const inv = res.data;
      if (!inv || !inv.unit) {
        toast.error("Invoice not found or has no unit");
        return;
      }
      
      const unit = inv.unit;
      const buildingId = unit.building_id ? String(unit.building_id) : '';
      const floorId = unit.floor_id ? String(unit.floor_id) : '';
      const unitId = unit.id ? String(unit.id) : '';

      setFormData((prev) => ({
        ...prev,
        building_id: buildingId || prev.building_id,
        invoice_number: inv.invoice_number || prev.invoice_number,
        amount: prev.amount || inv.balance_amount || inv.total_amount || prev.amount,
      }));
      
      // Set building and fetch floors
      if (buildingId) {
        setSelectedBuilding(buildingId);
        const floorsResponse = await getFloors(buildingId);
        setFloors(floorsResponse.data || []);
        
        // Set floor and fetch units
        if (floorId) {
          setSelectedFloor(floorId);
          const unitsResponse = await getUnits(floorId);
          setUnits(unitsResponse.data || []);
          
          // Set unit and fetch details
          if (unitId) {
            setSelectedUnit(unitId);
            const unitDetails = await fetchUnitDetails(unitId);
            if (unitDetails) {
              setUnitDetails(unitDetails);
              setShowDetails(true);
              setFormData(prev => ({ ...prev, unit_id: unitId }));
              await fetchUsersByUnit(unitId);
            }
          }
        }
      }
      
      toast.success("Invoice details loaded");
      setInvoiceSearch("");
    } catch (err) {
      console.error("Failed to find invoice by number", err);
      toast.error("Invoice not found");
    } finally {
      setInvoiceSearchLoading(false);
    }
  };

  const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    setSelectedFloor("");
    setSelectedUnit("");
    setShowDetails(false);
    setFloors([]);
    setUnits([]);
    setFormData(prev => ({ ...prev, building_id: buildingId, unit_id: "" }));
    
    if (buildingId) {
      await fetchFloors(buildingId);
    }
  };

  const handleFloorChange = async (e) => {
    const floorId = e.target.value;
    setSelectedFloor(floorId);
    setSelectedUnit("");
    setShowDetails(false);
    setUnits([]);
    setFormData(prev => ({ ...prev, unit_id: "" }));
    
    if (floorId) {
      await fetchUnits(floorId);
    }
  };

  const handleUnitChange = async (e) => {
    const unitId = e.target.value;
    setSelectedUnit(unitId);
    
    if (unitId) {
      const unit = await fetchUnitDetails(unitId);
      if (unit) {
        setUnitDetails(unit);
        setShowDetails(true);
        setFormData(prev => ({ ...prev, unit_id: unitId }));
        await fetchUsersByUnit(unitId);
      }
    } else {
      setShowDetails(false);
      setUnitDetails({});
      setUsers([]);
      setFormData(prev => ({ 
        ...prev, 
        unit_id: "", 
        customer_name: "", 
        customer_email: "", 
        gst_no: "", 
        customer_address: "" 
      }));
    }
  };

  const handleCustomerSelect = (e) => {
    const selectedUserId = e.target.value;
    if (selectedUserId) {
      const selectedUser = users.find(user => user.id.toString() === selectedUserId);
      if (selectedUser) {
        setFormData(prev => ({
          ...prev,
          customer_name: selectedUser.name || selectedUser.full_name || "",
          customer_email: selectedUser.email || "",
          gst_no: selectedUser.gst_number || selectedUser.gst_no || "",
          customer_address: selectedUser.address || selectedUser.permanent_address || ""
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        customer_name: "",
        customer_email: "",
        gst_no: "",
        customer_address: ""
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.invoice_number.trim()) {
      toast.error("Invoice number is required");
      return;
    }
    if (!formData.unit_id) {
      toast.error("Please select a unit");
      return;
    }
    if (!formData.amount) {
      toast.error("Amount is required");
      return;
    }
    
    onSave({
      accounting_invoice: formData
    });
  };

  const unitName = unitDetails?.name || unitDetails?.flat || unitDetails?.flat_no || "";
  const siteName = unitDetails?.site_name || unitDetails?.site?.name || "";
  const buildingName = unitDetails?.building_name || unitDetails?.building?.name || "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 my-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {invoice ? "Edit Accounting Invoice" : "Create Accounting Invoice"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Search Invoice Section */}
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="font-semibold text-lg text-blue-900 mb-4">🔍 Search Existing Invoice</h3>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter invoice number (e.g., FP-1001-01)"
                />
              </div>
              <button
                type="button"
                onClick={handleFindInvoice}
                disabled={invoiceSearchLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
              >
                {invoiceSearchLoading ? "Searching..." : "Find Invoice"}
              </button>
            </div>
          </div>

          {/* Source Type Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Source Type</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Type *
                </label>
                <select
                  name="source_type"
                  value={formData.source_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cam_bill">CAM Bill</option>
                  <option value="invoice">Invoice</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.source_type === "cam_bill" 
                    ? "This will generate Expense entry" 
                    : "This will generate Income entry"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  name="invoice_number"
                  value={formData.invoice_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., FP-1001-01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  name="invoice_date"
                  value={formData.invoice_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Received Date *
                </label>
                <input
                  type="date"
                  name="received_date"
                  value={formData.received_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Unit & Building Selection */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Unit Information</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Building *</label>
                <select
                  value={selectedBuilding}
                  onChange={handleBuildingChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Building</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor *</label>
                <select
                  value={selectedFloor}
                  onChange={handleFloorChange}
                  disabled={!selectedBuilding || loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Floor</option>
                  {floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <select
                  value={selectedUnit}
                  onChange={handleUnitChange}
                  disabled={!selectedFloor || loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Unit Details Display */}
            {showDetails && (
              <div className="p-4 border-2 border-indigo-300 rounded-lg bg-indigo-50">
                <p className="text-sm"><strong>Unit:</strong> {unitName}</p>
                <p className="text-sm"><strong>Building:</strong> {buildingName}</p>
                <p className="text-sm"><strong>Site:</strong> {siteName}</p>
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Customer Information</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Customer {!selectedUnit && "(Select unit first)"}
              </label>
              <select
                onChange={handleCustomerSelect}
                disabled={!selectedUnit || loading || users.length === 0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  {!selectedUnit ? "Select unit first" : users.length === 0 ? "No customers found" : "Select Customer"}
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.full_name} {user.email ? `(${user.email})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="customer@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST No
                </label>
                <input
                  type="text"
                  name="gst_no"
                  value={formData.gst_no}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter GST number"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Address
              </label>
              <textarea
                name="customer_address"
                value={formData.customer_address}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer address"
              />
            </div>
          </div>

          {/* Amount Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Amount</h3>
            <div className="max-w-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-600 mr-2">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <h3 className="font-semibold text-xl text-green-900 border-b border-green-200 pb-3 mb-4">💳 Payment Information</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Mode *
                </label>
                <select
                  name="payment_mode"
                  value={formData.payment_mode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="online">Online Transfer</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Number *
                </label>
                <input
                  type="text"
                  name="reference_number"
                  value={formData.reference_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={formData.payment_mode === "cheque" ? "Cheque No" : "Transaction ID / UTR"}
                />
              </div>
            </div>

            <p className="text-xs text-green-700 mt-3">
              {formData.payment_mode === "cheque" 
                ? "Enter cheque number for tracking"
                : formData.payment_mode === "online" || formData.payment_mode === "bank_transfer"
                ? "Enter transaction ID or UTR number"
                : "Enter payment reference number"}
            </p>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Additional Notes</h3>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional notes or remarks..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {invoice ? "Update Invoice" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModalV2;
