  // import React, { useState, useEffect } from "react";
  // import { getLedgers, getTaxRates } from "../../api/accountingApi";

  // const InvoiceModal = ({ invoice, onClose, onSave }) => {
  //   const [ledgers, setLedgers] = useState([]);
  //   const [taxRates, setTaxRates] = useState([]);
  //   const [formData, setFormData] = useState({
  //     invoice_date: new Date().toISOString().split("T")[0],
  //     due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  //       .toISOString()
  //       .split("T")[0],
  //     invoice_number: "",
  //     customer_name: "",
  //     customer_email: "",
  //     customer_address: "",
  //     unit_id: "",
  //     items: [
  //       { description: "", quantity: 1, unit_price: 0, tax_rate_id: "", amount: 0 },
  //     ],
  //     notes: "",
  //   });

  //   useEffect(() => {
  //     fetchLedgers();
  //     fetchTaxRates();
  //     if (invoice) {
  //       setFormData({
  //         invoice_date: invoice.invoice_date?.split("T")[0] || "",
  //         due_date: invoice.due_date?.split("T")[0] || "",
  //         invoice_number: invoice.invoice_number || "",
  //         customer_name: invoice.customer_name || "",
  //         customer_email: invoice.customer_email || "",
  //         customer_address: invoice.customer_address || "",
  //         unit_id: invoice.unit_id || "",
  //         items: invoice.items || [
  //           { description: "", quantity: 1, unit_price: 0, tax_rate_id: "", amount: 0 },
  //         ],
  //         notes: invoice.notes || "",
  //       });
  //     }
  //   }, [invoice]);

  //   const fetchLedgers = async () => {
  //     try {
  //       const response = await getLedgers();
  //       setLedgers(response.data.data || response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch ledgers", error);
  //     }
  //   };

  //   const fetchTaxRates = async () => {
  //     try {
  //       const response = await getTaxRates();
  //       setTaxRates(response.data.data || response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch tax rates", error);
  //     }
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleItemChange = (index, field, value) => {
  //     const newItems = [...formData.items];
  //     newItems[index][field] = value;
      
  //     // Calculate amount
  //     if (field === "quantity" || field === "unit_price" || field === "tax_rate_id") {
  //       const quantity = parseFloat(newItems[index].quantity || 0);
  //       const unitPrice = parseFloat(newItems[index].unit_price || 0);
  //       const taxRate = taxRates.find(t => t.id === newItems[index].tax_rate_id);
  //       const taxPercent = taxRate ? parseFloat(taxRate.rate) : 0;
        
  //       const subtotal = quantity * unitPrice;
  //       const taxAmount = subtotal * (taxPercent / 100);
  //       newItems[index].amount = subtotal + taxAmount;
  //     }
      
  //     setFormData((prev) => ({ ...prev, items: newItems }));
  //   };

  //   const addItem = () => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       items: [
  //         ...prev.items,
  //         { description: "", quantity: 1, unit_price: 0, tax_rate_id: "", amount: 0 },
  //       ],
  //     }));
  //   };

  //   const removeItem = (index) => {
  //     if (formData.items.length <= 1) return;
  //     const newItems = formData.items.filter((_, i) => i !== index);
  //     setFormData((prev) => ({ ...prev, items: newItems }));
  //   };

  //   const calculateTotal = () => {
  //     return formData.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSave(formData);
  //   };

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
  //       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 my-8">
  //         <div className="flex justify-between items-center mb-4">
  //           <h2 className="text-xl font-bold">
  //             {invoice ? "Edit Invoice" : "Create Invoice"}
  //           </h2>
  //           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
  //             ✕
  //           </button>
  //         </div>

  //         <form onSubmit={handleSubmit}>
  //           <div className="grid grid-cols-2 gap-4 mb-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Invoice Number *
  //               </label>
  //               <input
  //                 type="text"
  //                 name="invoice_number"
  //                 value={formData.invoice_number}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Invoice Date *
  //               </label>
  //               <input
  //                 type="date"
  //                 name="invoice_date"
  //                 value={formData.invoice_date}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Due Date *
  //               </label>
  //               <input
  //                 type="date"
  //                 name="due_date"
  //                 value={formData.due_date}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Unit ID*
  //               </label>
  //               <input
  //                 type="text"
  //                 name="unit_id"
  //                 value={formData.unit_id}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //           </div>

  //           <div className="grid grid-cols-1 gap-4 mb-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Customer Name *
  //               </label>
  //               <input
  //                 type="text"
  //                 name="customer_name"
  //                 value={formData.customer_name}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Customer Email
  //               </label>
  //               <input
  //                 type="email"
  //                 name="customer_email"
  //                 value={formData.customer_email}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Customer Address
  //               </label>
  //               <textarea
  //                 name="customer_address"
  //                 value={formData.customer_address}
  //                 onChange={handleChange}
  //                 rows="2"
  //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //           </div>

  //           <div className="mb-4">
  //             <div className="flex justify-between items-center mb-2">
  //               <h3 className="font-semibold">Invoice Items</h3>
  //               <button
  //                 type="button"
  //                 onClick={addItem}
  //                 className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
  //               >
  //                 + Add Item
  //               </button>
  //             </div>

  //             <div className="border rounded overflow-x-auto">
  //               <table className="min-w-full">
  //                 <thead className="bg-gray-50">
  //                   <tr>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Description
  //                     </th>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Qty
  //                     </th>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Unit Price
  //                     </th>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Tax Rate
  //                     </th>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Amount
  //                     </th>
  //                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
  //                       Action
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {formData.items.map((item, index) => (
  //                     <tr key={index} className="border-t">
  //                       <td className="px-4 py-2">
  //                         <input
  //                           type="text"
  //                           value={item.description}
  //                           onChange={(e) =>
  //                             handleItemChange(index, "description", e.target.value)
  //                           }
  //                           required
  //                           className="w-full px-2 py-1 border rounded text-sm"
  //                         />
  //                       </td>
  //                       <td className="px-4 py-2">
  //                         <input
  //                           type="number"
  //                           value={item.quantity}
  //                           onChange={(e) =>
  //                             handleItemChange(index, "quantity", e.target.value)
  //                           }
  //                           step="0.01"
  //                           min="0"
  //                           required
  //                           className="w-20 px-2 py-1 border rounded text-sm"
  //                         />
  //                       </td>
  //                       <td className="px-4 py-2">
  //                         <input
  //                           type="number"
  //                           value={item.unit_price}
  //                           onChange={(e) =>
  //                             handleItemChange(index, "unit_price", e.target.value)
  //                           }
  //                           step="0.01"
  //                           min="0"
  //                           required
  //                           className="w-24 px-2 py-1 border rounded text-sm"
  //                         />
  //                       </td>
  //                       <td className="px-4 py-2">
  //                         <select
  //                           value={item.tax_rate_id}
  //                           onChange={(e) =>
  //                             handleItemChange(index, "tax_rate_id", e.target.value)
  //                           }
  //                           className="w-32 px-2 py-1 border rounded text-sm"
  //                         >
  //                           <option value="">No Tax</option>
  //                           {taxRates.map((tax) => (
  //                             <option key={tax.id} value={tax.id}>
  //                               {tax.name} ({tax.rate}%)
  //                             </option>
  //                           ))}
  //                         </select>
  //                       </td>
  //                       <td className="px-4 py-2">
  //                         ${item.amount.toFixed(2)}
  //                       </td>
  //                       <td className="px-4 py-2">
  //                         {formData.items.length > 1 && (
  //                           <button
  //                             type="button"
  //                             onClick={() => removeItem(index)}
  //                             className="text-red-600 hover:text-red-900 text-sm"
  //                           >
  //                             Remove
  //                           </button>
  //                         )}
  //                       </td>
  //                     </tr>
  //                   ))}
  //                   <tr className="border-t bg-gray-50 font-semibold">
  //                     <td colSpan="4" className="px-4 py-2 text-right">
  //                       Total:
  //                     </td>
  //                     <td className="px-4 py-2" colSpan="2">
  //                       ${calculateTotal().toFixed(2)}
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //             </div>
  //           </div>

  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Notes
  //             </label>
  //             <textarea
  //               name="notes"
  //               value={formData.notes}
  //               onChange={handleChange}
  //               rows="3"
  //               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>

  //           <div className="flex justify-end gap-3">
  //             <button
  //               type="button"
  //               onClick={onClose}
  //               className="px-4 py-2 border rounded hover:bg-gray-50"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="submit"
  //               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //             >
  //               {invoice ? "Update" : "Create"}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  // export default InvoiceModal;
import React, { useState, useEffect } from "react";
import { getLedgers, getTaxRates, getBillingConfigurations } from "../../api/accountingApi";
import { getBuildings, getFloors, getUnits, getUnitDetails, getSetupUsersByUnit, getHsns, getSites } from "../../api/index";

const InvoiceModal = ({ invoice, onClose, onSave }) => {
  const [ledgers, setLedgers] = useState([]);
  const [taxRates, setTaxRates] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [siteInfo, setSiteInfo] = useState({});
  const [billingConfig, setBillingConfig] = useState({});
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [unitDetails, setUnitDetails] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("Billing Config:", billingConfig);

  const getDefaultItem = (sNo = 1) => {
    const defaultGstRate = billingConfig.default_gst_rate || "9";
    const enableIgst = billingConfig.enable_igst || false;
    const enableGstSplit = billingConfig.enable_gst_split !== false;

    return {
      s_no: sNo,
      service_description: "", 
      service_details: "",
      hsn_sac_code: "", 
      rate: "", 
      quantity: "1",
      taxable_value: "0.00", 
      cgst_rate: enableGstSplit && !enableIgst ? defaultGstRate : "0", 
      cgst_amount: "0.00", 
      sgst_rate: enableGstSplit && !enableIgst ? defaultGstRate : "0", 
      sgst_amount: "0.00", 
      igst_rate: enableIgst ? (parseFloat(defaultGstRate) * 2).toString() : "0",
      igst_amount: "0.00",
      total: "0.00"
    };
  };

  const [formData, setFormData] = useState({
    invoice_date: new Date().toISOString().split("T")[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    invoice_number: "",
    unit_no: "",
    customer_name: "",
    customer_email: "",
    customer_address: "",
    unit_id: "",
    items: [
      { 
        s_no: 1,
        service_description: "", 
        service_details: "",
        hsn_sac_code: "", 
        rate: "", 
        quantity: "1",
        taxable_value: "0.00", 
        cgst_rate: "9", 
        cgst_amount: "0.00", 
        sgst_rate: "9", 
        sgst_amount: "0.00", 
        igst_rate: "0",
        igst_amount: "0.00",
        total: "0.00" 
      },
    ],
    notes: "",
    bank_account: "",
    bank_ifsc: "",
    bank_aic: "",
    terms_conditions: "",
    gst_reverse_charge: "0",
    place_of_supply: "Club House",
    state: "Maharashtra",
    state_code: "27",
  });

  // GST configuration from billing config
  const enableIgst = billingConfig.enable_igst || false;
  const enableGstSplit = billingConfig.enable_gst_split !== false; // Default true
  const showCgstSgst = enableGstSplit && !enableIgst;
  const showIgst = enableIgst;

  const unitName = unitDetails?.name || unitDetails?.flat || unitDetails?.flat_no || "";
  const siteName = unitDetails?.site_name || unitDetails?.site?.name || "";
  const buildingName = unitDetails?.building_name || unitDetails?.building?.name || "";
  const floorName = unitDetails?.floor_name || unitDetails?.floor?.name || "";
  const unitAddressParts = [
    unitName && `Unit ${unitName}`,
    floorName && `Floor ${floorName}`,
    buildingName && `Building ${buildingName}`,
    siteName,
  ].filter(Boolean);
  const unitFullAddress = unitAddressParts.join(", ");

  // Data will be fetched from API dynamically

  // Service description options with details
  const serviceOptions = [
    { 
      value: "banquet_booking", 
      label: "Banquet Booking", 
      details: "Banquet hall booking services for events and functions",
      hsn_sac_code: "999599",
      gst_rate: "22%"
    },
    { 
      value: "guest_room_booking", 
      label: "Guest Room Booking", 
      details: "Room or unit accommodation services provided by Hotels, INN, Guest House, Club etc",
      hsn_sac_code: "996311",
      gst_rate: "below 7500/-12% & above or =7500/-18%"
    },
    { 
      value: "turf_booking", 
      label: "Turf Booking", 
      details: "Sports turf or ground booking services",
      hsn_sac_code: "999799",
      gst_rate: "18%"
    },
    { 
      value: "meeting_room_booking", 
      label: "Meeting Room Booking", 
      details: "Meeting room and conference facility booking services",
      hsn_sac_code: "999599",
      gst_rate: "18%"
    },
    { 
      value: "coworking_space_booking", 
      label: "Co-working Space Booking", 
      details: "Rental or leasing services involving own or leased non-residential property",
      hsn_sac_code: "997212",
      gst_rate: "18%"
    },
    { 
      value: "tenant_membership", 
      label: "Tenant Membership Charges", 
      details: "Membership charges for tenants including facility access",
      hsn_sac_code: "9995",
      gst_rate: "18%"
    },
    { 
      value: "event_charges", 
      label: "Event Charges", 
      details: "Events, Exhibitions, Conventions and trade shows organisation and assistance services",
      hsn_sac_code: "998596",
      gst_rate: "18%"
    },
    { 
      value: "guest_facility", 
      label: "Guest Facility Charges", 
      details: "Additional facility charges for guests including amenities and services",
      hsn_sac_code: "999599",
      gst_rate: "18%"
    }
  ];

  // Function to convert amount to words
  const convertAmountToWords = (amount) => {
    if (amount === 0) return "Zero Rupees";
    
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const convertLessThanThousand = (num) => {
      if (num === 0) return '';
      
      let words = '';
      
      if (num >= 100) {
        words += ones[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
      }
      
      if (num >= 20) {
        words += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      } else if (num >= 10) {
        words += teens[num - 10] + ' ';
        num = 0;
      }
      
      if (num > 0) {
        words += ones[num] + ' ';
      }
      
      return words.trim();
    };
    
    let amountInWords = '';
    let rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    
    // Convert rupees
    if (rupees > 0) {
      if (rupees >= 10000000) {
        amountInWords += convertLessThanThousand(Math.floor(rupees / 10000000)) + ' Crore ';
        rupees %= 10000000;
      }
      
      if (rupees >= 100000) {
        amountInWords += convertLessThanThousand(Math.floor(rupees / 100000)) + ' Lakh ';
        rupees %= 100000;
      }
      
      if (rupees >= 1000) {
        amountInWords += convertLessThanThousand(Math.floor(rupees / 1000)) + ' Thousand ';
        rupees %= 1000;
      }
      
      if (rupees > 0) {
        amountInWords += convertLessThanThousand(rupees) + ' ';
      }
      
      amountInWords += 'Rupees';
    }
    
    // Convert paise
    if (paise > 0) {
      if (amountInWords !== '') {
        amountInWords += ' and ';
      }
      amountInWords += convertLessThanThousand(paise) + ' Paise';
    }
    
    return amountInWords.trim() || 'Zero Rupees';
  };

  useEffect(() => {
    fetchLedgers();
    fetchTaxRates();
    fetchBuildings();
    fetchHsnCodes();
    fetchSiteInfo();
    fetchBillingConfig();
    
    if (invoice) {
      setFormData({
        invoice_date: invoice.invoice_date?.split("T")[0] || "",
        due_date: invoice.due_date?.split("T")[0] || "",
        invoice_number: invoice.invoice_number || "",
        unit_no: invoice.unit_no || "",
        customer_name: invoice.customer_name || "",
        customer_email: invoice.customer_email || "",
        customer_address: invoice.customer_address || "",
        unit_id: invoice.unit_id || "",
        items: (invoice.items || invoice.accounting_invoice_items || []).map((item, index) => ({
          s_no: item.s_no || index + 1,
          service_description: item.service_description || item.description || "", 
          service_details: item.service_details || "",
          hsn_sac_code: item.hsn_sac_code || "", 
          rate: item.rate?.toString() || item.unit_price?.toString() || "", 
          quantity: item.quantity?.toString() || "1",
          taxable_value: item.taxable_value?.toString() || item.amount?.toString() || "0.00", 
          cgst_rate: item.cgst_rate?.toString() || "9", 
          cgst_amount: item.cgst_amount?.toString() || "0.00", 
          sgst_rate: item.sgst_rate?.toString() || "9", 
          sgst_amount: item.sgst_amount?.toString() || "0.00", 
          igst_rate: item.igst_rate?.toString() || "0",
          igst_amount: item.igst_amount?.toString() || "0.00",
          total: item.total?.toString() || item.total_amount?.toString() || "0.00" 
        })),
        notes: invoice.notes || "",
        bank_account: invoice.bank_account || "",
        bank_ifsc: invoice.bank_ifsc || "",
        bank_aic: invoice.bank_aic || "",
        terms_conditions: invoice.terms_and_conditions || invoice.terms_conditions || "",
        gst_reverse_charge: invoice.gst_reverse_charge || "0",
        place_of_supply: invoice.place_of_supply || "Club House",
        state: invoice.state || "Maharashtra",
        state_code: invoice.state_code || "27",
      });
      
      // Set selected unit if editing existing invoice
      if (invoice.unit_id) {
        loadEditInvoiceData(invoice.unit_id);
      }
    }
  }, [invoice]);

  // Update form defaults when billing config is loaded
  useEffect(() => {
    if (billingConfig && Object.keys(billingConfig).length > 0 && !invoice) {
      const defaultItem = getDefaultItem(1);
      
      setFormData(prev => ({
        ...prev,
        bank_account: prev.bank_account || billingConfig.account_number || "",
        bank_ifsc: prev.bank_ifsc || billingConfig.ifsc_code || "",
        bank_aic: prev.bank_aic || billingConfig.bank_name || "",
        terms_conditions: prev.terms_conditions || billingConfig.terms_and_conditions || "",
        state: prev.state || billingConfig.state || "Maharashtra",
        state_code: prev.state_code || billingConfig.state_code || "27",
        place_of_supply: prev.place_of_supply || billingConfig.place_of_supply || "Club House",
        items: prev.items.length === 1 && !prev.items[0].service_description ? [defaultItem] : prev.items,
      }));
    }
  }, [billingConfig, invoice]);

  const loadEditInvoiceData = async (unitId) => {
    try {
      const unitResponse = await getUnitDetails(unitId);
      const unit = unitResponse.data;
      
      if (unit) {
        // Set building and fetch floors
        if (unit.floor?.building_id) {
          setSelectedBuilding(unit.floor.building_id);
          const floorsResponse = await getFloors(unit.floor.building_id);
          setFloors(floorsResponse.data || []);
        }
        
        // Set floor and fetch units
        if (unit.floor_id) {
          setSelectedFloor(unit.floor_id);
          const unitsResponse = await getUnits(unit.floor_id);
          setUnits(unitsResponse.data || []);
        }
        
        // Set selected unit
        setSelectedUnit(unitId);
        setUnitDetails(unit);
        setShowDetails(true);
      }
    } catch (error) {
      console.error("Failed to load unit data for editing", error);
    }
  };

  const fetchLedgers = async () => {
    try {
      const response = await getLedgers();
      setLedgers(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch ledgers", error);
    }
  };

  const fetchTaxRates = async () => {
    try {
      const response = await getTaxRates();
      setTaxRates(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch tax rates", error);
    }
  };

  const fetchHsnCodes = async () => {
    try {
      const response = await getHsns(1, 1000); // Fetch all HSN codes
      setHsnCodes(response.data.data || response.data.hsns || response.data || []);
    } catch (error) {
      console.error("Failed to fetch HSN codes", error);
    }
  };

  const fetchSiteInfo = async () => {
    try {
      const response = await getSites();
      const sites = response.data.sites || response.data || [];
      // Get the first/current site or you can filter by specific site_id
      if (sites.length > 0) {
        setSiteInfo(sites[0]); // Use first site or filter by user's current site
      }
    } catch (error) {
      console.error("Failed to fetch site info", error);
    }
  };

  const fetchBillingConfig = async () => {
    try {
      const response = await getBillingConfigurations();
      const configs = response.data.data || response.data || [];
      // console.log("Billing Configurations fetched:", configs);
      
        setBillingConfig(configs); // Use first config
      
    } catch (error) {
      console.error("Failed to fetch billing configuration", error);
    }
  };

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await getBuildings();
      setBuildings(response.data || []);
    } catch (error) {
      console.error("Failed to fetch buildings", error);
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
      // Backend returns all users in the unit when type="user"
      const response = await getSetupUsersByUnit("users", unitId);
      const list = response?.data?.data || response?.data || [];
      const normalized = Array.isArray(list)
        ? list.map((user) => ({
            ...user,
            unit_type: user.unit_type || user.type || "",
          }))
        : [];
      setUsers(normalized);
    } catch (error) {
      console.error("Failed to fetch users for unit", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          customer_address: selectedUser.address || selectedUser.permanent_address || ""
        }));
      }
    } else {
      // If "Select Customer" is chosen, clear the fields
      setFormData(prev => ({
        ...prev,
        customer_name: "",
        customer_email: "",
        customer_address: ""
      }));
    }
  };

  const handleServiceSelect = (index, value) => {
    const newItems = [...formData.items];
    const selectedService = serviceOptions.find(service => service.value === value);
    
    if (selectedService) {
      newItems[index].service_description = selectedService.label;
      newItems[index].service_details = selectedService.details;
      newItems[index].hsn_sac_code = selectedService.hsn_sac_code;
      
      // Auto-set GST rates based on service type
      if (selectedService.value === "guest_room_booking") {
        newItems[index].cgst_rate = "6";
        newItems[index].sgst_rate = "6";
      } else {
        newItems[index].cgst_rate = "9";
        newItems[index].sgst_rate = "9";
      }
      
      // Recalculate totals
      recalculateItemTotals(newItems[index]);
    } else {
      newItems[index].service_description = value;
      newItems[index].service_details = "";
      newItems[index].hsn_sac_code = "";
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    setSelectedFloor("");
    setSelectedUnit("");
    setShowDetails(false);
    setFloors([]);
    setUnits([]);
    setFormData(prev => ({ ...prev, unit_no: "", unit_id: "" }));
    
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
    setFormData(prev => ({ ...prev, unit_no: "", unit_id: "" }));
    
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
        setFormData(prev => ({ ...prev, unit_no: unit.name || unitId, unit_id: unitId }));
        await fetchUsersByUnit(unitId);
      }
    } else {
      setShowDetails(false);
      setUnitDetails({});
      setUsers([]);
      setFormData(prev => ({ ...prev, unit_no: "", unit_id: "", customer_name: "", customer_email: "", customer_address: "" }));
    }
  };

  // Function to recalculate item totals
  const recalculateItemTotals = (item) => {
    const taxableValue = parseFloat(item.taxable_value) || 0;
    
    const enableIgst = billingConfig.enable_igst || false;
    const enableGstSplit = billingConfig.enable_gst_split !== false;
    
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;
    
    if (enableIgst) {
      const igstRate = parseFloat(item.igst_rate) || 0;
      igstAmount = taxableValue * (igstRate / 100);
      item.cgst_rate = "0";
      item.sgst_rate = "0";
    } else if (enableGstSplit) {
      const cgstRate = parseFloat(item.cgst_rate) || 0;
      const sgstRate = parseFloat(item.sgst_rate) || 0;
      cgstAmount = taxableValue * (cgstRate / 100);
      sgstAmount = taxableValue * (sgstRate / 100);
      item.igst_rate = "0";
    }
    
    const total = taxableValue + cgstAmount + sgstAmount + igstAmount;
    
    item.cgst_amount = cgstAmount.toFixed(2);
    item.sgst_amount = sgstAmount.toFixed(2);
    item.igst_amount = igstAmount.toFixed(2);
    item.total = total.toFixed(2);
    
    return item;
  };

  // Function to calculate taxable value from rate and quantity
  const calculateTaxableValue = (item) => {
    const rate = parseFloat(item.rate) || 0;
    const quantity = parseFloat(item.quantity) || 1;
    const taxableValue = rate * quantity;
    
    item.taxable_value = taxableValue.toFixed(2);
    return item;
  };

  // Handle GST rate input and auto-distribute based on billing config
  const handleGstRateChange = (index, gstRate) => {
    const newItems = [...formData.items];
    const rate = parseFloat(gstRate) || 0;
    
    if (enableIgst) {
      // Use full rate as IGST
      newItems[index].igst_rate = rate.toString();
      newItems[index].cgst_rate = "0";
      newItems[index].sgst_rate = "0";
    } else if (enableGstSplit) {
      // Split rate equally between CGST and SGST
      const splitRate = (rate / 2).toFixed(2);
      newItems[index].cgst_rate = splitRate;
      newItems[index].sgst_rate = splitRate;
      newItems[index].igst_rate = "0";
    }
    
    recalculateItemTotals(newItems[index]);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    
    // Handle empty values
    if (value === "") {
      newItems[index][field] = "";
    } else {
      newItems[index][field] = value;
    }
    
    // If rate or quantity changes, calculate taxable value automatically
    if (field === "rate" || field === "quantity") {
      calculateTaxableValue(newItems[index]);
    }
    
    // Recalculate totals for any field that affects calculations
    if (["rate", "quantity", "taxable_value", "cgst_rate", "sgst_rate", "igst_rate"].includes(field)) {
      recalculateItemTotals(newItems[index]);
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newSNo = formData.items.length + 1;
    const newItem = getDefaultItem(newSNo);
    
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };


  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    
    // Recalculate serial numbers
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      s_no: idx + 1
    }));
    
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const calculateTotals = () => {
    const totals = formData.items.reduce((acc, item) => {
      acc.taxableValue += parseFloat(item.taxable_value || 0);
      acc.cgst += parseFloat(item.cgst_amount || 0);
      acc.sgst += parseFloat(item.sgst_amount || 0);
      acc.igst += parseFloat(item.igst_amount || 0);
      acc.total += parseFloat(item.total || 0);
      return acc;
    }, { taxableValue: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });

    return totals;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // No helper functions needed - using state directly

  // Preview functionality
  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const totals = calculateTotals();
  const amountInWords = convertAmountToWords(totals.total);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl p-6 my-4 max-h-[95vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {invoice ? "Edit Invoice" : "Create New Invoice"}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                    
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter invoice number"
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit ID*
                  </label>
                  <input
                    type="text"
                    name="unit_id"
                    value={formData.unit_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter unit ID"
                  />
                </div> */}
              </div>
            </div>

            {/* Unit Information */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Unit Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building / Floor / Unit *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Building */}
                    <select
                      value={selectedBuilding}
                      onChange={handleBuildingChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Building</option>
                      {buildings.map((building) => (
                        <option key={building.id} value={building.id}>
                          {building.name}
                        </option>
                      ))}
                    </select>

                    {/* Floor */}
                    <select
                      value={selectedFloor}
                      onChange={handleFloorChange}
                      required
                      disabled={!selectedBuilding || loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Floor</option>
                      {floors.map((floor) => (
                        <option key={floor.id} value={floor.id}>
                          {floor.name}
                        </option>
                      ))}
                    </select>

                    {/* Unit */}
                    <select
                      value={selectedUnit}
                      onChange={handleUnitChange}
                      required
                      disabled={!selectedFloor || loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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

                {/* Unit Details Section */}
                {showDetails && (
                  <div className="p-4 border-2 rounded-lg text-sm transition-all duration-300 border-indigo-300 bg-indigo-50">
                    <h3 className="font-semibold mb-3 text-lg text-indigo-800">
                      🏢 Unit Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <label className="block text-xs font-semibold mb-2 text-indigo-700">Name</label>
                        <div className="px-3 py-2 border rounded text-sm font-medium border-indigo-200 text-indigo-800">
                          {unitName || "-"}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <label className="block text-xs font-semibold mb-2 text-indigo-700">Site Name</label>
                        <div className="px-3 py-2 border rounded text-sm font-medium border-indigo-200 text-indigo-800">
                          {siteName || "-"}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <label className="block text-xs font-semibold mb-2 text-indigo-700">Building Name</label>
                        <div className="px-3 py-2 border rounded text-sm font-medium border-indigo-200 text-indigo-800">
                          {buildingName || "-"}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-sm md:col-span-2">
                        <label className="block text-xs font-semibold mb-2 text-indigo-700">Full Address</label>
                        <div className="px-3 py-2 border rounded text-sm font-medium border-indigo-200 text-indigo-800">
                          {unitFullAddress || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Customer {!selectedUnit && <span className="text-xs text-gray-500">(Select unit first)</span>}
                    </label>
                    <select
                      onChange={handleCustomerSelect}
                      disabled={!selectedUnit || loading || users.length === 0}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!selectedUnit ? "Select unit first" : users.length === 0 ? "No users found" : "Select Customer"}
                      </option>
                      {users.map((user) => {
                        const typeLabel = (user?.sites[0]?.units[0]?.ownership || user.type || "")
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase());
                        return (
                          <option key={user.id} value={user.id}>
                            {user.name || user.full_name}
                            {typeLabel ? ` - ${typeLabel}` : ""}
                            {user.email ? ` (${user.email})` : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Enter customer name"
                    />
                  </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="customer@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Address
                  </label>
                  <textarea
                    name="customer_address"
                    value={formData.customer_address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter complete customer address"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-xl text-gray-800">Invoice Items</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Item
                </button>
              </div>

              <div className="border border-gray-300 rounded-lg overflow-x-auto bg-white">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-12">
                        S.No
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r min-w-[150px]">
                        Service Description
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r min-w-[180px]">
                        Service Details
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[120px]">
                        HSN/SAC
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[130px]">
                        Rate (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[100px] ">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[150px]">
                        Taxable Value (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[100px]">
                        GST%
                      </th>
                      {showCgstSgst && (
                        <>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[110px]">
                            CGST Amt (₹)
                          </th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[110px]">
                            SGST Amt (₹)
                          </th>
                        </>
                      )}
                      {showIgst && (
                        <>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[110px]">
                            IGST Amt (₹)
                          </th>
                        </>
                      )}
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[120px]">
                        Total (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 min-w-[90px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {formData.items.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 border-r text-center font-medium text-gray-600">
                          {item.s_no}
                        </td>
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.service_description}
                            onChange={(e) =>
                              handleItemChange(index, "service_description", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Service description"
                            list="services"
                          />
                          <datalist id="services">
                            {serviceOptions.map((service) => (
                              <option key={service.value} value={service.label} />
                            ))}
                          </datalist>
                        </td>
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.service_details}
                            onChange={(e) =>
                              handleItemChange(index, "service_details", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Service details"
                          />
                        </td>
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            list={`hsn-list-${index}`}
                            value={item.hsn_sac_code}
                            onChange={(e) =>
                              handleItemChange(index, "hsn_sac_code", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center"
                            placeholder="Select or enter HSN/SAC"
                          />
                          <datalist id={`hsn-list-${index}`}>
                            {hsnCodes.map((hsn) => (
                              <option key={hsn.id} value={hsn.hsn_code || hsn.code}>
                                {hsn.description || hsn.name}
                              </option>
                            ))}
                          </datalist>
                        </td>
                        <td className="px-3 py-3 border-r">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) =>
                              handleItemChange(index, "rate", e.target.value)
                            }
                            step="0.01"
                            min="0"
                            className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-right"
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-3 py-3 border-r">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(index, "quantity", e.target.value)
                            }
                            step="1"
                            min="1"
                            className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-right"
                          />
                        </td>
                        <td className="px-3 py-3 border-r">
                          <input
                            type="number"
                            value={item.taxable_value}
                            onChange={(e) =>
                              handleItemChange(index, "taxable_value", e.target.value)
                            }
                            step="0.01"
                            min="0"
                            className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-right font-semibold bg-blue-50"
                            placeholder="0.00"
                          />
                        </td>
                        {/* Single GST% input that auto-distributes */}
                        <td className="px-3 py-3 border-r">
                          <input
                            type="number"
                            value={enableIgst ? item.igst_rate : (parseFloat(item.cgst_rate || 0) + parseFloat(item.sgst_rate || 0)).toFixed(2)}
                            onChange={(e) => handleGstRateChange(index, e.target.value)}
                            step="0.01"
                            min="0"
                            max="100"
                            className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-medium bg-yellow-50"
                            placeholder="GST%"
                          />
                        </td>
                        {showCgstSgst && (
                          <>
                            <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                              <div className="text-xs text-gray-500">C: {item.cgst_rate}%</div>
                              <div>₹{item.cgst_amount}</div>
                            </td>
                            <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                              <div className="text-xs text-gray-500">S: {item.sgst_rate}%</div>
                              <div>₹{item.sgst_amount}</div>
                            </td>
                          </>
                        )}
                        {showIgst && (
                          <>
                            <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                              <div className="text-xs text-gray-500">I: {item.igst_rate}%</div>
                              <div>₹{item.igst_amount}</div>
                            </td>
                          </>
                        )}
                        <td className="px-4 py-3 border-r text-center font-semibold text-blue-700 text-lg">
                          {item.total}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                      <td colSpan="6" className="px-4 py-4 text-right border-r text-gray-700 text-sm">
                        GRAND TOTAL:
                      </td>
                      <td className="px-4 py-4 text-center border-r text-green-700 text-lg">
                        {totals.taxableValue.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center border-r text-gray-700">
                        {enableIgst ? `${totals.igst.toFixed(2)}` : `${(totals.cgst + totals.sgst).toFixed(2)}`}
                      </td>
                      {showCgstSgst && (
                        <>
                          <td className="px-4 py-4 text-center border-r">
                            ₹{totals.cgst.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-center border-r">
                            ₹{totals.sgst.toFixed(2)}
                          </td>
                        </>
                      )}
                      {showIgst && (
                        <td className="px-4 py-4 text-center border-r">
                          ₹{totals.igst.toFixed(2)}
                        </td>
                      )}
                      <td className="px-4 py-4 text-center border-r text-green-700 text-xl">
                        {totals.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-6">Summary & Bank Details</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Amount in Words, Bank Details, Terms & Conditions */}
                <div className="space-y-6">
                  {/* Amount in Words Section */}
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Total Invoice amount in words
                    </label>
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-yellow-50 text-sm font-medium text-gray-800 min-h-12">
                      {amountInWords}
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm">
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      🏦 Bank Details
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank A/C:
                        </label>
                        <input
                          type="text"
                          name="bank_account"
                          value={formData.bank_account}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="Enter bank account number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank IFSC:
                        </label>
                        <input
                          type="text"
                          name="bank_ifsc"
                          value={formData.bank_ifsc}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="Enter IFSC code"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          name="bank_aic"
                          value={formData.bank_aic}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="Enter AIC code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm">
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      📝 Terms & Conditions
                    </label>
                    <textarea
                      name="terms_conditions"
                      value={formData.terms_conditions}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Enter terms and conditions for this invoice..."
                    />
                  </div>
                </div>

                {/* Right Column - Tax Summary and Additional Details */}
                <div className="space-y-6">
                  {/* Tax Summary - UPDATED TO MATCH SCREENSHOT */}
                  <div className="space-y-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 text-center border-b pb-2">Tax Summary</h4>
                    
                    {/* Total Amount before Tax */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">Total Amount before Tax:</span>
                      <span className="text-sm font-bold text-gray-900">₹{totals.taxableValue.toFixed(2)}</span>
                    </div>
                    
                    {/* Add: CGST */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Add: CGST</span>
                      <span className="text-sm text-gray-700">₹{totals.cgst.toFixed(2)}</span>
                    </div>
                    
                    {/* Add: SGST */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Add: SGST</span>
                      <span className="text-sm text-gray-700">₹{totals.sgst.toFixed(2)}</span>
                    </div>
                    
                    {/* Add: IGST */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Add: IGST</span>
                      <span className="text-sm text-gray-700">₹{totals.igst.toFixed(2)}</span>
                    </div>
                    
                    {/* Total Tax Amount */}
                    <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                      <span className="text-sm font-semibold text-gray-700">Total Tax Amount:</span>
                      <span className="text-sm font-bold text-blue-700">₹{(totals.cgst + totals.sgst + totals.igst).toFixed(2)}</span>
                    </div>
                    
                    {/* GST on Reverse Charge */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">GST on Reverse Charge:</span>
                      <input
                        type="text"
                        name="gst_reverse_charge"
                        value={formData.gst_reverse_charge}
                        onChange={handleChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                        placeholder="0"
                      />
                    </div>
                    
                    {/* Total Amount after Tax */}
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
                      <span className="text-lg font-bold text-gray-800">Total Amount after Tax:</span>
                      <span className="text-xl font-bold text-green-700">₹{totals.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Certification and JP Infra Venture - UPDATED */}
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm">
                    <div className="text-center">
                      <div className="text-center text-sm bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-gray-700 mb-2">Certified that the particulars given above are true and correct</div>
                        <div className="font-bold text-blue-800 text-lg">JP Infra Venture LLP</div>
                        
                        {/* Authorised Signatory directly below JP Infra Venture */}
                        <div className="mt-4">
                          <div className="border-t-2 border-gray-400 pt-2 mx-auto w-48">
                            <span className="text-xs font-semibold text-gray-700">Authorised Signatory</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Seal Section - Centered below both columns */}
              <div className="mt-6 text-center">
                <div className="bg-white rounded-lg p-4 border-2 border-gray-300 shadow-sm inline-block">
                  <div className="border-t-2 border-gray-400 pt-2 mx-auto w-32">
                    <span className="text-sm font-semibold text-gray-700">Common Seal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                📌 Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter any additional notes or comments..."
              />
            </div>

            {/* Enhanced Action Buttons with Preview */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-300">
              <div className="flex gap-3">
                {/* Enhanced Preview Button */}
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg border border-purple-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Invoice
                </button>

                {/* Quick Print Preview Button */}
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-4 py-3 text-purple-600 border-2 border-purple-400 rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-all duration-200 text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Quick Print Preview
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 px-8 py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-all duration-200 text-sm font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {invoice ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Enhanced Preview Modal - UPDATED TO MATCH SCREENSHOT 101% */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 my-4 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
                <p className="text-sm text-gray-600 mt-1">Review your invoice before saving</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button 
                  onClick={closePreview} 
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Enhanced Preview Content - EXACTLY MATCHING THE SCREENSHOT */}
            <div className="border border-gray-800 bg-white">
              {/* Company Header Section */}
              <div className="border-b border-gray-800">
                <div className="text-center py-4">
                  <h1 className="text-xl font-bold text-gray-900">{billingConfig.company_name || siteInfo.name || "JP Infra Venture LLP"}</h1>
                  <p className="text-xs text-gray-700 mt-1">
                    {billingConfig.address || siteInfo.address || "3rd Floor, 301, Viraj Tower, Near WEH, Metro Station, W.E.Highway, Andheri East, Mumbai -400093"}
                  </p>
                  <p className="text-xs text-gray-700 font-semibold">GST No- {billingConfig.gst_number || billingConfig.gst_no || siteInfo.gst_no || siteInfo.gst_number || ""}</p>
                </div>
              </div>

              {/* Tax Invoice Title */}
              <div className="bg-blue-100 border-b border-gray-800 py-2">
                <h2 className="text-center text-lg font-bold text-gray-900">Tax Invoice</h2>
              </div>

              {/* Invoice Details Section */}
              <div className="border-b border-gray-800">
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="border-r border-gray-800 p-2" style={{width: '50%'}}>
                        <strong>Invoice No:</strong> {formData.invoice_number || "AV/24-25/001"}
                      </td>
                      <td className="p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2"><strong>Invoice date:</strong> {formData.invoice_date || ""}</td>
                      <td className="border-t border-gray-800 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2">
                        <strong>Reverse Charge (Y/N):</strong> {formData.gst_reverse_charge === "1" ? "Y" : "N"}
                      </td>
                      <td className="border-t border-gray-800 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2">
                        <strong>State:</strong> {formData.state || "Maharashtra"}
                      </td>
                      <td className="border-t border-gray-800 p-2" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span><strong>Code</strong></span>
                        <span>{formData.state_code || "27"}</span>
                        <span><strong>Place of Supply:</strong> {formData.place_of_supply || "Club House"}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bill to Party Section */}
              <div className="bg-blue-100 border-b border-gray-800 py-1">
                <h3 className="text-center text-sm font-bold text-gray-900">Bill to Party</h3>
              </div>

              <div className="border-b border-gray-800">
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="border-r border-gray-800 p-2" style={{width: '50%'}}>
                        <strong>Name:</strong><br/>
                        {formData.customer_name || ""}
                      </td>
                      <td className="p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2">
                        <strong>Address:</strong> {formData.customer_address || "JP Aviva"}
                      </td>
                      <td className="border-t border-gray-800 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2"></td>
                      <td className="border-t border-gray-800 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2">
                        <strong>State:</strong> {formData.state || "Maharashtra"}
                      </td>
                      <td className="border-t border-gray-800 p-2" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span><strong>Code</strong></span>
                        <span>{formData.state_code || "27"}</span>
                        <span><strong>Mode of Payment: UPI No.:</strong></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Items Table */}
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">S. No</th>
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">Service Description</th>
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">HSN/SAC<br/>Code</th>
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">Rate</th>
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">Taxable<br/>Value</th>
                    <th className="border border-gray-800 p-1 font-bold" colSpan="2">CGST</th>
                    <th className="border border-gray-800 p-1 font-bold" colSpan="2">SGST</th>
                    <th className="border border-gray-800 p-1 font-bold" rowSpan="2">Total</th>
                  </tr>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-800 p-1 font-bold text-xs">Rate %</th>
                    <th className="border border-gray-800 p-1 font-bold text-xs">Amount</th>
                    <th className="border border-gray-800 p-1 font-bold text-xs">Rate %</th>
                    <th className="border border-gray-800 p-1 font-bold text-xs">Amount</th>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-1"></td>
                    <td className="border border-gray-800 p-1"></td>
                    <td className="border border-gray-800 p-1"></td>
                    <td className="border border-gray-800 p-1"></td>
                    <td className="border border-gray-800 p-1 text-center">-</td>
                    <td className="border border-gray-800 p-1 text-center">9%</td>
                    <td className="border border-gray-800 p-1 text-center">-</td>
                    <td className="border border-gray-800 p-1 text-center">9%</td>
                    <td className="border border-gray-800 p-1 text-center">-</td>
                    <td className="border border-gray-800 p-1 text-center">-</td>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-800 p-1 text-center">{item.s_no}</td>
                      <td className="border border-gray-800 p-1">{item.service_description || ""}</td>
                      <td className="border border-gray-800 p-1 text-center">{item.hsn_sac_code || ""}</td>
                      <td className="border border-gray-800 p-1 text-right">{parseFloat(item.rate || 0).toFixed(2)}</td>
                      <td className="border border-gray-800 p-1 text-right">{parseFloat(item.taxable_value || 0).toFixed(2)}</td>
                      <td className="border border-gray-800 p-1 text-center">{item.cgst_rate || "0"}%</td>
                      <td className="border border-gray-800 p-1 text-right">{parseFloat(item.cgst_amount || 0).toFixed(2)}</td>
                      <td className="border border-gray-800 p-1 text-center">{item.sgst_rate || "0"}%</td>
                      <td className="border border-gray-800 p-1 text-right">{parseFloat(item.sgst_amount || 0).toFixed(2)}</td>
                      <td className="border border-gray-800 p-1 text-right font-semibold">{parseFloat(item.total || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Section */}
              <div className="border-t border-gray-800">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="bg-blue-100">
                      <td className="border-r border-b border-gray-800 p-2 font-bold text-center" colSpan="2">Total</td>
                      <td className="border-b border-gray-800 p-2"></td>
                      <td className="border-b border-gray-800 p-2"></td>
                      <td className="border-b border-gray-800 p-2 text-right font-bold">{totals.taxableValue.toFixed(2)}</td>
                      <td className="border-l border-b border-gray-800 p-2"></td>
                      <td className="border-b border-gray-800 p-2 text-right font-bold">{totals.cgst.toFixed(2)}</td>
                      <td className="border-l border-b border-gray-800 p-2"></td>
                      <td className="border-b border-gray-800 p-2 text-right font-bold">{totals.sgst.toFixed(2)}</td>
                      <td className="border-l border-b border-gray-800 p-2 text-right font-bold">{totals.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="border-r border-b border-gray-800 p-2" style={{width: '50%'}}>
                        <strong>Total Invoice amount in words</strong><br/>
                        <span className="text-gray-700">{amountInWords || "Amount inwords"}</span>
                      </td>
                      <td className="border-b border-gray-800 p-2" style={{width: '50%'}}>
                        <table className="w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="p-1"><strong>Total Amount before Tax</strong></td>
                              <td className="p-1 text-right">{totals.taxableValue.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="p-1"><strong>Add: CGST</strong></td>
                              <td className="p-1 text-right">{totals.cgst.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="p-1"><strong>Add: SGST</strong></td>
                              <td className="p-1 text-right">{totals.sgst.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="p-1"><strong>Total Tax Amount</strong></td>
                              <td className="p-1 text-right">{(totals.cgst + totals.sgst + totals.igst).toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td className="p-1"><strong>Total Amount after Tax:</strong></td>
                              <td className="p-1 text-right font-bold">{totals.total.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bank Details and Signature Section */}
              <div className="border-t border-gray-800">
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="border-r border-gray-800 p-2" style={{width: '50%'}}>
                        <strong>Bank Details</strong><br/>
                        <strong>Bank A/C:</strong> {billingConfig.bank_account || formData.bank_account || ""}<br/>
                        <strong>Bank IFSC:</strong> {billingConfig.bank_ifsc || formData.bank_ifsc || ""}
                      </td>
                      <td className="p-2" style={{width: '50%'}} rowSpan="2">
                        <div className="text-right">
                          <p className="text-xs mb-2"><strong>GST on Reverse Charge</strong>: {formData.gst_reverse_charge === "1" ? "Yes" : "0"}</p>
                          <div className="text-xs text-center mt-4">
                            <p>Certified that the particulars given above are true and correct</p>
                            <p className="font-bold mt-2">{billingConfig.company_name || siteInfo.name || "JP Infra Venture LLP"}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r border-t border-gray-800 p-2">
                        <strong>Terms & conditions</strong><br/>
                        <span className="text-gray-700">{billingConfig.terms_and_conditions || formData.terms_conditions || ""}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Signature Section */}
              <div className="border-t border-gray-800">
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="border-r border-gray-800 p-4 text-center" style={{width: '50%'}}>
                        <div className="mt-8">
                          <strong>Common Seal</strong>
                        </div>
                      </td>
                      <td className="p-4 text-center" style={{width: '50%'}}>
                        <div className="mt-8">
                          <strong>Authorised signatory</strong>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons for Preview */}
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={closePreview}
                className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;