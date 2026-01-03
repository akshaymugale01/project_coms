import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getIncomeEntries, createIncomeEntry, calculateIncomeTotal, getInvoicesByUnit, calculateInterest, findInvoiceByNumber } from '../../../api/accountingApi';
import { getBuildings, getAllFloors, getAllUnits } from '../../../api';
import { FaPlus, FaEye } from 'react-icons/fa';

const IncomeTracking = () => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);
    const [entryMode, setEntryMode] = useState('manual'); // 'manual' | 'auto'
    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [units, setUnits] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState('');
    const [availableInvoices, setAvailableInvoices] = useState([]);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
    const [interestConfig, setInterestConfig] = useState(null);
    const [interestPreview, setInterestPreview] = useState(null);
    const [interestRate, setInterestRate] = useState(18);
    const [interestMethod, setInterestMethod] = useState('daily'); // 'daily' | 'monthly' | 'compound'
    const [interestGraceDays, setInterestGraceDays] = useState(0);
    const [invoiceSearch, setInvoiceSearch] = useState('');
    const [invoiceSearchLoading, setInvoiceSearchLoading] = useState(false);
    const [selectedInvoiceDropdownId, setSelectedInvoiceDropdownId] = useState('');
  const [backendTotal, setBackendTotal] = useState(0); // Backend-calculated total
  const [backendStats, setBackendStats] = useState(null); // Stats from backend
  const [filters, setFilters] = useState({
    from_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0],
    status: '',
    source_type: ''
  });
  const [formData, setFormData] = useState({
    source_type: 'CamBill',
    source_id: '',
    unit_id: '',
    amount: '',
    invoice_number: '',
    received_date: new Date().toISOString().split('T')[0],
    payment_mode: 'online',
    reference_number: '',
    status: 'received',
    notes: ''
  });

  useEffect(() => {
    fetchIncomeEntries();
  }, [filters]);

  useEffect(() => {
    // Load interest config saved from InterestConfiguration screen
    try {
      const saved = window.localStorage.getItem('interest_configuration');
      if (saved) {
        const parsed = JSON.parse(saved);
        setInterestConfig(parsed);
        if (parsed.interest_rate) setInterestRate(parsed.interest_rate);
        if (parsed.calculation_method) setInterestMethod(parsed.calculation_method);
        if (parsed.grace_period_days != null) setInterestGraceDays(parsed.grace_period_days);
      }
    } catch (err) {
      console.error('Failed to load interest configuration in IncomeTracking', err);
    }
  }, []);

  useEffect(() => {
    // Load building/floor/unit hierarchies for the current site
    const loadHierarchy = async () => {
      try {
        const [bRes, fRes, uRes] = await Promise.all([
          getBuildings(),
          getAllFloors(),
          getAllUnits(),
        ]);
        setBuildings(bRes.data || []);
        setFloors(fRes.data || []);
        setUnits(uRes.data || []);
      } catch (err) {
        console.error('Failed to load building/floor/unit hierarchy', err);
      }
    };
    loadHierarchy();
  }, []);

  const fetchIncomeEntries = async () => {
    setLoading(true);
    try {
      const response = await getIncomeEntries(filters);
      setIncomeEntries(response.data);
      
      // Fetch backend total
      const totalRes = await calculateIncomeTotal(filters);
      setBackendTotal(totalRes?.data?.total || 0);
      setBackendStats(totalRes?.data);
    } catch (error) {
      console.error('Error fetching income entries:', error);
      toast.error('Failed to fetch income entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate invoice number
    if (!formData.invoice_number || formData.invoice_number.trim() === '') {
      toast.error('Invoice Number is mandatory');
      return;
    }

    setLoading(true);
    try {
      const response = await createIncomeEntry({
        income_entry: formData,
        create_journal_entry: true
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setShowModal(false);
        resetForm();
        fetchIncomeEntries();
      }
    } catch (error) {
      console.error('Error creating income entry:', error);
      toast.error('Failed to create income entry');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      source_type: 'CamBill',
      source_id: '',
      unit_id: '',
      amount: '',
      invoice_number: '',
      received_date: new Date().toISOString().split('T')[0],
      payment_mode: 'online',
      reference_number: '',
      status: 'received',
      notes: ''
    });
    setEntryMode('manual');
    setSelectedUnitId('');
    setAvailableInvoices([]);
    setSelectedInvoiceIds([]);
    setInterestPreview(null);
  };

  const loadUnits = async () => {
    try {
      const res = await getAllUnits();
      setUnits(res.data || []);
    } catch (err) {
      console.error('Failed to load units', err);
    }
  };

  const loadInvoicesForUnit = async () => {
    if (!selectedUnitId) {
      toast.error('Please select a unit first');
      return;
    }
    try {
      setLoading(true);
      const res = await getInvoicesByUnit(selectedUnitId);
      setAvailableInvoices(res.data || []);
      setSelectedInvoiceIds([]);
      setInterestPreview(null);
      setSelectedInvoiceDropdownId('');
    } catch (err) {
      console.error('Failed to load invoices for unit', err);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const toggleInvoiceSelection = (invoiceId) => {
    setSelectedInvoiceIds((prev) => {
      const next = prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId];

      // If exactly one invoice is selected, auto-fill its invoice number
      if (next.length === 1) {
        const selected = availableInvoices.find((inv) => inv.id === next[0]);
        if (selected && selected.invoice_number) {
          setFormData((prevForm) => ({
            ...prevForm,
            invoice_number: selected.invoice_number,
          }));
        }
      }

      return next;
    });
  };

  const calculateInterestForSelection = async () => {
    const selectedInvoicesData = availableInvoices.filter((inv) => selectedInvoiceIds.includes(inv.id));
    if (selectedInvoicesData.length === 0) {
      toast.error('Please select at least one invoice');
      return;
    }

    const principal = selectedInvoicesData.reduce(
      (sum, inv) => sum + Number(inv.balance_amount || 0),
      0
    );
    const maxDaysOverdue = selectedInvoicesData.reduce(
      (max, inv) => Math.max(max, inv.days_overdue || 0),
      0
    );

    try {
      const res = await calculateInterest({
        principal,
        rate: interestRate || (interestConfig && interestConfig.interest_rate) || 18,
        days: maxDaysOverdue || 30,
        grace_period_days:
          interestGraceDays != null
            ? interestGraceDays
            : (interestConfig && interestConfig.grace_period_days) || 0,
        calculation_method: interestMethod || (interestConfig && interestConfig.calculation_method) || 'daily',
      });
      setInterestPreview({
        principal,
        invoices: selectedInvoicesData,
        backend: res.data,
      });

      // Pre-fill amount with total payable for convenience
      if (res.data && res.data.total_payable) {
        setFormData((prev) => ({
          ...prev,
          amount: res.data.total_payable,
        }));
      }
    } catch (err) {
      console.error('Failed to calculate interest for selection', err);
      toast.error('Failed to calculate interest');
    }
  };

  const saveInterestConfig = () => {
    const config = {
      interest_rate: interestRate,
      calculation_method: interestMethod,
      grace_period_days: interestGraceDays,
    };
    try {
      window.localStorage.setItem('interest_configuration', JSON.stringify(config));
      setInterestConfig(config);
      toast.success('Interest settings saved');
    } catch (err) {
      console.error('Failed to save interest configuration', err);
      toast.error('Failed to save interest settings');
    }
  };

  const handleInvoiceDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedInvoiceDropdownId(value);
    if (!value) {
      setSelectedInvoiceIds([]);
      return;
    }
    const idNum = Number(value);
    if (!Number.isNaN(idNum)) {
      setSelectedInvoiceIds([idNum]);

      const selected = availableInvoices.find((inv) => inv.id === idNum);
      if (selected && selected.invoice_number) {
        setFormData((prev) => ({
          ...prev,
          invoice_number: selected.invoice_number,
        }));
      }
    }
  };

  const handleFindInvoice = async () => {
    const term = invoiceSearch.trim();
    if (!term) {
      toast.error('Please enter an invoice number');
      return;
    }
    try {
      setInvoiceSearchLoading(true);
      const res = await findInvoiceByNumber(term);
      const inv = res.data;
      if (!inv || !inv.unit) {
        toast.error('Invoice not found or has no unit');
        return;
      }
      const unit = inv.unit;
      const buildingId = unit.building_id ? String(unit.building_id) : '';
      const floorId = unit.floor_id ? String(unit.floor_id) : '';
      const unitId = unit.id ? String(unit.id) : '';

      setFormData((prev) => ({
        ...prev,
        building_id: buildingId || prev.building_id,
        floor_id: floorId || prev.floor_id,
        unit_id: unitId || prev.unit_id,
        invoice_number: inv.invoice_number || prev.invoice_number,
        amount:
          prev.amount || inv.balance_amount || inv.total_amount || prev.amount,
      }));
      setSelectedUnitId(unitId);
      toast.success('Invoice details loaded');
    } catch (err) {
      console.error('Failed to find invoice by number', err);
      toast.error('Invoice not found');
    } finally {
      setInvoiceSearchLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Income Tracking</h2>
        <p className="text-gray-600 mt-1">Track all income received from various sources</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Total Income (Selected Period)</p>
          <p className="text-2xl font-bold text-green-600">₹{backendTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Total Entries</p>
          <p className="text-2xl font-bold text-blue-600">{backendStats?.count || incomeEntries.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-600 text-sm">Pending Entries</p>
          <p className="text-2xl font-bold text-orange-600">
            {incomeEntries.filter(e => e.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={filters.from_date}
              onChange={(e) => setFilters({ ...filters, from_date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={filters.to_date}
              onChange={(e) => setFilters({ ...filters, to_date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
            <select
              value={filters.source_type}
              onChange={(e) => setFilters({ ...filters, source_type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="CamBill">CAM Bill</option>
              <option value="AccountingInvoice">Invoice</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Income Entries</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Income Entry
        </button>
      </div>

      {/* Income Entries Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : incomeEntries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No income entries found
                  </td>
                </tr>
              ) : (
                incomeEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.received_date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.invoice_number || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.source_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.unit?.name || entry.unit?.unit_number || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ₹{parseFloat(entry.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">
                      {entry.payment_mode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.status === 'received' ? 'bg-green-100 text-green-800' :
                        entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        type="button"
                        onClick={() => setViewEntry(entry)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Income Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-[70rem] w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Income Entry</h3>

              {/* Mode toggle */}
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Mode:</span>
                <button
                  type="button"
                  onClick={() => setEntryMode('manual')}
                  className={`px-3 py-1 rounded-lg text-sm border ${
                    entryMode === 'manual'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Manual
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setEntryMode('auto');
                    if (units.length === 0) {
                      await loadUnits();
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-sm border ${
                    entryMode === 'auto'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Auto from Invoices
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {entryMode === 'auto' && (
                    <div className="col-span-2 flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Search Invoice by Number
                        </label>
                        <input
                          type="text"
                          value={invoiceSearch}
                          onChange={(e) => setInvoiceSearch(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Enter invoice number (e.g. FP-1001-01)"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleFindInvoice}
                        disabled={invoiceSearchLoading}
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 disabled:bg-gray-400"
                      >
                        {invoiceSearchLoading ? 'Searching...' : 'Find Invoice'}
                      </button>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                    <select
                      value={formData.source_type}
                      onChange={(e) => setFormData({ ...formData, source_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    >
                      <option value="CamBill">CAM Bill</option>
                      <option value="AccountingInvoice">Invoice</option>
                    </select>
                  </div>
                  {/* Building / Floor / Unit hierarchy for this site */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <select
                      value={formData.building_id || ''}
                      onChange={(e) => {
                        const buildingId = e.target.value;
                        setFormData({ ...formData, building_id: buildingId, floor_id: '', unit_id: '' });
                        setSelectedUnitId('');
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select Building</option>
                      {buildings.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <select
                      value={formData.floor_id || ''}
                      onChange={(e) => {
                        const floorId = e.target.value;
                        setFormData({ ...formData, floor_id: floorId, unit_id: '' });
                        setSelectedUnitId('');
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select Floor</option>
                      {floors
                        .filter((f) => !formData.building_id || f.building_id === Number(formData.building_id))
                        .map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={formData.unit_id || ''}
                      onChange={(e) => {
                        const unitId = e.target.value;
                        const unit = units.find((u) => u.id === Number(unitId));
                        setFormData({
                          ...formData,
                          unit_id: unitId,
                          invoice_number: unit && unit.invoice_number ? unit.invoice_number : formData.invoice_number,
                        });
                        setSelectedUnitId(unitId);
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select Unit</option>
                      {units
                        .filter((u) =>
                          (!formData.building_id || u.building_id === Number(formData.building_id)) &&
                          (!formData.floor_id || u.floor_id === Number(formData.floor_id))
                        )
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {entryMode === 'auto' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <select
                        value={selectedUnitId}
                        onChange={(e) => setSelectedUnitId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">Select Unit</option>
                        {units.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name || u.unit_number || `Unit #${u.id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number <span className='text-red-800 font-bold'>*</span></label>
                    <input
                      type="text"
                      value={formData.invoice_number}
                      onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Received Date *</label>
                    <input
                      type="date"
                      value={formData.received_date}
                      onChange={(e) => setFormData({ ...formData, received_date: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode *</label>
                    <select
                      value={formData.payment_mode}
                      onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="online">Online</option>
                      <option value="neft">NEFT</option>
                      <option value="rtgs">RTGS</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    >
                      <option value="received">Received</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                    <input
                      type="text"
                      value={formData.reference_number}
                      onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Transaction ID / Cheque No"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {entryMode === 'auto' && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-xs bg-gray-50 p-3 rounded-lg border">
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Interest Type</label>
                        <select
                          value={interestMethod}
                          onChange={(e) => setInterestMethod(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1"
                        >
                          <option value="daily">Daily (Simple)</option>
                          <option value="monthly">Monthly (Simple)</option>
                          <option value="compound">Compound (Monthly)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Interest Rate (% p.a.)</label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Grace Period (days)</label>
                        <input
                          type="number"
                          value={interestGraceDays}
                          onChange={(e) => setInterestGraceDays(Number(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded-lg px-2 py-1"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-1 text-xs">
                      <button
                        type="button"
                        onClick={saveInterestConfig}
                        className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        Save as Default Interest Config
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-700">Outstanding Invoices for Selected Unit</h4>
                      <button
                        type="button"
                        onClick={loadInvoicesForUnit}
                        className="px-3 py-1 text-xs bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                      >
                        Refresh Invoices
                      </button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      {/* {availableInvoices.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-xs border-b border-gray-200">
                          <span className="font-medium text-gray-700">Invoice Dropdown:</span>
                          <select
                            value={selectedInvoiceDropdownId}
                            onChange={handleInvoiceDropdownChange}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
                          >
                            <option value="">-- Select Invoice --</option>

                            {availableInvoices.map((inv) => (
                              <option key={inv.id} value={inv.id}>
                                {inv.invoice_number} - ₹
                                {(inv.total_amount || 0).toLocaleString('en-IN', {
                                  minimumFractionDigits: 2,
                                })}
                              </option>
                            ))}
                          </select>
                        </div>
                      )} */}
                      <div className="max-h-56 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium text-gray-500">Select</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-500">Invoice</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-500">Date</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-500">Due Date</th>
                              <th className="px-3 py-2 text-right font-medium text-gray-500">Total</th>
                              <th className="px-3 py-2 text-right font-medium text-gray-500">Balance</th>
                              <th className="px-3 py-2 text-right font-medium text-gray-500">Days Overdue</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {availableInvoices.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="px-3 py-4 text-center text-gray-500 text-xs">
                                  No invoices found. Select a unit and refresh.
                                </td>
                              </tr>
                            ) : (
                              availableInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                  <td className="px-3 py-2">
                                    <input
                                      type="checkbox"
                                      checked={selectedInvoiceIds.includes(inv.id)}
                                      onChange={() => toggleInvoiceSelection(inv.id)}
                                    />
                                  </td>
                                  <td className="px-3 py-2">{inv.invoice_number}</td>
                                  <td className="px-3 py-2">{inv.invoice_date}</td>
                                  <td className="px-3 py-2">{inv.due_date}</td>
                                  <td className="px-3 py-2 text-right">
                                    ₹{(inv.total_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-3 py-2 text-right">
                                    ₹{(inv.balance_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-3 py-2 text-right">{inv.days_overdue || 0}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <button
                        type="button"
                        onClick={calculateInterestForSelection}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                      >
                        Calculate Interest on Selection
                      </button>
                      {interestPreview && (
                        <div className="text-xs text-gray-700 text-right">
                          <div>
                            Principal (Balance): ₹{interestPreview.principal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                          <div>
                            Interest: ₹{interestPreview.backend.interest.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="font-semibold">
                            Total Suggestion: ₹{interestPreview.backend.total_payable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* View Income Entry Modal */}
      {viewEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Income Entry Details</h3>
                <button
                  type="button"
                  onClick={() => setViewEntry(null)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {viewEntry.received_date
                      ? new Date(viewEntry.received_date).toLocaleDateString('en-IN')
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Invoice Number</p>
                  <p className="font-medium text-gray-900">{viewEntry.invoice_number || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Source Type</p>
                  <p className="font-medium text-gray-900">{viewEntry.source_type || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Unit</p>
                  <p className="font-medium text-gray-900">
                    {viewEntry.unit?.name || viewEntry.unit?.unit_number || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium text-green-700">
                    ₹
                    {parseFloat(viewEntry.amount || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Mode</p>
                  <p className="font-medium text-gray-900">{viewEntry.payment_mode || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">{viewEntry.status || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Reference Number</p>
                  <p className="font-medium text-gray-900">{viewEntry.reference_number || '-'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500">Notes</p>
                  <p className="font-medium text-gray-900 whitespace-pre-wrap">
                    {viewEntry.notes || '-'}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewEntry(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTracking;
