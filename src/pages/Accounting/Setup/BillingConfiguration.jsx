import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  getBillingConfigurations,
  createBillingConfiguration,
  updateBillingConfiguration,
  uploadBillingLogo,
  previewCamBills,
  generateCamBills,
} from '../../../api/accountingApi';
import { getSites } from '../../../api';

const BillingConfiguration = () => {
  const [loading, setLoading] = useState(false);
  const [logoSource, setLogoSource] = useState(null); // 'url' | 'upload' | null
  const [pendingLogoFile, setPendingLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [hasConfig, setHasConfig] = useState(false);
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState('');
  const [billingYear, setBillingYear] = useState(new Date().getFullYear());
  const [billingMonth, setBillingMonth] = useState(new Date().getMonth() + 1);
  const [billingPreview, setBillingPreview] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    company_logo: '',
    gst_number: '',
    pan_number: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    branch_name: '',
    terms_and_conditions: '',
    enable_gst_split: false,
    enable_igst: false
  });

  useEffect(() => {
    fetchBillingConfig();
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await getSites();
      const list = res?.data?.data || res?.data || [];
      setSites(Array.isArray(list) ? list : []);
      if (!siteId && Array.isArray(list) && list.length > 0) {
        const firstId = list[0]?.id || list[0]?.site_id || list[0]?.value;
        if (firstId) setSiteId(String(firstId));
      }
    } catch (err) {
      console.error('Failed to load sites for billing panel', err);
    }
  };

  const fetchBillingConfig = async () => {
    setLoading(true);
    try {
      const response = await getBillingConfigurations();
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setFormData(data[0]);
        setLogoSource(data[0].company_logo ? 'url' : null);
        setLogoPreview(data[0].company_logo || null);
        setHasConfig(true);
        setIsEditing(false);
      } else if (data && typeof data === 'object') {
        setFormData(data);
        setLogoSource(data.company_logo ? 'url' : null);
        setLogoPreview(data.company_logo || null);
        setHasConfig(true);
        setIsEditing(false);
      } else {
        setHasConfig(false);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching billing config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = formData.id
        ? await updateBillingConfiguration(formData.id, { billing_configuration: formData })
        : await createBillingConfiguration({ billing_configuration: formData });

      if (response.data.success) {
        let configId = formData.id;
        if (!configId) {
          configId =
            response.data?.data?.id ||
            response.data?.billing_configuration?.id ||
            response.data?.id ||
            null;
        }

        if (pendingLogoFile && configId) {
          try {
            const formDataToSend = new FormData();
            formDataToSend.append('logo', pendingLogoFile);
            const logoResponse = await uploadBillingLogo(configId, formDataToSend);
            const url = logoResponse?.data?.logo_url;
            if (url) {
              setFormData((prev) => ({
                ...prev,
                company_logo: url
              }));
              setLogoSource('upload');
              setLogoPreview(url);
            } else {
              toast.error('Logo upload succeeded but URL was not returned');
            }
          } catch (logoError) {
            console.error('Error uploading logo during save:', logoError);
            toast.error('Billing configuration saved, but logo upload failed');
          } finally {
            setPendingLogoFile(null);
          }
        }

        toast.success(response.data.message);
        fetchBillingConfig();
      }
    } catch (error) {
      console.error('Error saving billing config:', error);
      toast.error('Failed to save billing configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...formData,
      [name]: value
    };

    if (name === 'company_logo') {
      // If URL is provided, mark source as 'url'; if cleared, allow both again
      if (value && value.trim().length > 0) {
        setLogoSource('url');
      } else if (logoSource === 'url') {
        setLogoSource(null);
      }
    }

    setFormData(updated);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setPendingLogoFile(file);
    setLogoPreview(previewUrl);
    setLogoSource('upload');
  };

  const handlePreviewCamBills = async () => {
    if (!siteId) {
      toast.error('Please select a site for billing preview');
      return;
    }
    try {
      setLoading(true);
      const res = await previewCamBills({ year: billingYear, month: billingMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      const total = Array.isArray(rows)
        ? rows.reduce((sum, r) => sum + Number(r.total_amount || 0), 0)
        : 0;
      setBillingPreview({ count: Array.isArray(rows) ? rows.length : 0, total });
      if (!rows.length) {
        toast('No billable units found for this period');
      } else {
        toast.success('Preview ready');
      }
    } catch (err) {
      console.error('Failed to preview CAM bills from BillingConfiguration', err);
      toast.error('Preview failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCamBills = async () => {
    if (!siteId) {
      toast.error('Please select a site for bill generation');
      return;
    }
    try {
      setLoading(true);
      const res = await generateCamBills({ year: billingYear, month: billingMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      const count = Array.isArray(rows) ? rows.length : 0;
      toast.success(`Generated CAM bills for ${count} unit(s)`);
    } catch (err) {
      console.error('Failed to generate CAM bills from BillingConfiguration', err);
      toast.error('Generate failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Billing Configuration</h2>
          <p className="text-gray-600 mt-1">Configure Society details for invoice generation</p>
        </div>
        {hasConfig && (
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Society Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Society Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Society Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Society Logo URL
              </label>
              <input
                type="text"
                name="company_logo"
                value={formData.company_logo}
                onChange={handleChange}
                disabled={!isEditing || logoSource === 'upload'}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Upload Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={!isEditing || logoSource === 'url'}
                className="w-full text-sm text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
              {(logoPreview || formData.company_logo) && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Logo Preview</p>
                  <img
                    src={logoPreview || formData.company_logo}
                    alt="Society Logo"
                    className="h-12 object-contain border border-gray-200 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <input
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                placeholder="22AAAAA0000A1Z5"
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleChange}
                placeholder="AAAAA0000A"
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400001"
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch Name
              </label>
              <input
                type="text"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                placeholder="SBIN0000123"
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* GST / Tax Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">GST / Tax Settings</h3>
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="enable_gst_split"
                checked={!!formData.enable_gst_split}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    enable_gst_split: e.target.checked,
                  }))
                }
                disabled={!isEditing}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>
                <span className="font-medium text-gray-800">Enable GST Split (CGST + SGST)</span>
                <br />
                <span className="text-gray-600">
                  When enabled, applicable GST can be shown as separate CGST / SGST lines on invoices for
                  intra-state billing.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="enable_igst"
                checked={!!formData.enable_igst}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    enable_igst: e.target.checked,
                  }))
                }
                disabled={!isEditing}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>
                <span className="font-medium text-gray-800">Enable IGST for Inter‑State Billing</span>
                <br />
                <span className="text-gray-600">
                  When enabled, invoices to units in another state can use IGST instead of CGST/SGST according to
                  your tax rules.
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Terms & Conditions</h3>
          <textarea
            name="terms_and_conditions"
            value={formData.terms_and_conditions}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter billing terms and conditions..."
            disabled={!isEditing}
          />
        </div>

        {/* Billing Quick Actions (CAM Bills) */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Billing Quick Actions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Use this panel to quickly preview or generate CAM bills for a selected month. For detailed per-unit
            review, use the "Accounting Bills" tab.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select site</option>
                {sites.map((s) => {
                  const id = s.id || s.site_id || s.value;
                  const name = s.name || s.site_name || s.label || `Site ${id}`;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={billingYear}
                onChange={(e) => setBillingYear(Number(e.target.value) || new Date().getFullYear())}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select
                value={billingMonth}
                onChange={(e) => setBillingMonth(Number(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 flex-wrap md:justify-end">
              <button
                type="button"
                onClick={handlePreviewCamBills}
                className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm border border-gray-300 hover:bg-gray-200"
              >
                Preview Bills
              </button>
              <button
                type="button"
                onClick={handleGenerateCamBills}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Generate Bills
              </button>
            </div>
          </div>
          {billingPreview && (
            <div className="mt-4 text-sm text-gray-700">
              <p>
                Preview for <span className="font-medium">{billingMonth}/{billingYear}</span> –
                <span className="font-medium"> {billingPreview.count}</span> unit(s), total
                <span className="font-medium"> ₹{billingPreview.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </p>
            </div>
          )}
        </div> */}

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BillingConfiguration;
