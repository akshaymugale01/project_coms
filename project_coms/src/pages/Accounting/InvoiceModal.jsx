
import React, { useState, useEffect, useCallback } from "react";
import { getLedgers, getTaxRates } from "../../api/accountingApi";

const InvoiceModal = ({ invoice, onClose, onSave }) => {
  const [ledgers, setLedgers] = useState([]);
  const [taxRates, setTaxRates] = useState([]);
  const [selectedUnitType, setSelectedUnitType] = useState(""); // "flat" or "shop"
  const [selectedUnit, setSelectedUnit] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Add this state for filtered customers

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
    mode_of_payment: "", // Added Mode of Payment field
    payment_details: "", // Added Payment Details field
    cheque_number: "", // Added Cheque Number field
    bank_name: "", // Added Bank Name field
    upi_id: "", // Added UPI ID field
    transaction_id: "", // Added Transaction ID field
    card_last_digits: "", // Added Card Last Digits field
    items: [
      { 
        s_no: 1,
        service_description: "", 
        service_details: "",
        hsn_sac_code: "", 
        tax_rate: "",
        igst_tax: false, // Changed from no_tax to igst_tax
        amount: "", 
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
    bank_aic: "", // Added Bank AIC field
    terms_conditions: "", // Added Terms & Conditions field
    gst_reverse_charge: "0", // Added GST on Reverse Charge field
    place_of_supply: "Club House", // Added Place of Supply field
    state: "Maharashtra", // Added State field
    state_code: "27", // Added State Code field
    certification_date: new Date().toISOString().split("T")[0], // Added for certification date
  });

  // Mock data for flat and shop details - WITH CUSTOMER ID REFERENCE
  const flatOptions = [
    { id: "flat_101", name: "Flat 101", type: "flat", customerId: 1 },
    { id: "flat_102", name: "Flat 102", type: "flat", customerId: 2 },
    { id: "flat_103", name: "Flat 103", type: "flat", customerId: 3 },
    { id: "flat_201", name: "Flat 201", type: "flat", customerId: 4 },
    { id: "flat_202", name: "Flat 202", type: "flat", customerId: 5 },
    { id: "flat_301", name: "Flat 301", type: "flat", customerId: 6 },
    { id: "flat_302", name: "Flat 302", type: "flat", customerId: 7 },
  ];

  const shopOptions = [
    { id: "shop_g01", name: "Shop G01", type: "shop", customerId: 8 },
    { id: "shop_g02", name: "Shop G02", type: "shop", customerId: 9 },
    { id: "shop_g03", name: "Shop G03", type: "shop", customerId: 10 },
    { id: "shop_g04", name: "Shop G04", type: "shop", customerId: 11 },
    { id: "shop_f01", name: "Shop F01", type: "shop", customerId: 12 },
    { id: "shop_f02", name: "Shop F02", type: "shop", customerId: 13 },
    { id: "shop_f03", name: "Shop F03", type: "shop", customerId: 14 },
  ];

  // Mock customer data for dropdown - UPDATED WITH ALL CUSTOMERS
  const customerOptions = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", address: "123 Main St, City, State 12345" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", address: "456 Oak Ave, City, State 12345" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", address: "789 Pine Rd, City, State 12345" },
    { id: 4, name: "Sarah Wilson", email: "sarah.wilson@example.com", address: "321 Elm St, City, State 12345" },
    { id: 5, name: "David Brown", email: "david.brown@example.com", address: "654 Maple Dr, City, State 12345" },
    { id: 6, name: "Robert Taylor", email: "robert.taylor@example.com", address: "987 Cedar Ln, City, State 12345" },
    { id: 7, name: "Emily Davis", email: "emily.davis@example.com", address: "147 Birch Blvd, City, State 12345" },
    { id: 8, name: "ABC Retail", email: "contact@abcretail.com", address: "258 Commerce St, City, State 12345" },
    { id: 9, name: "XYZ Services", email: "info@xyzservices.com", address: "369 Service Rd, City, State 12345" },
    { id: 10, name: "Quick Food", email: "orders@quickfood.com", address: "741 Food Court, City, State 12345" },
    { id: 11, name: "Fashion Store", email: "info@fashionstore.com", address: "852 Style Ave, City, State 12345" },
    { id: 12, name: "Tech Solutions", email: "support@techsolutions.com", address: "963 Tech Park, City, State 12345" },
    { id: 13, name: "Book World", email: "sales@bookworld.com", address: "159 Library Lane, City, State 12345" },
    { id: 14, name: "Beauty Salon", email: "bookings@beautysalon.com", address: "753 Beauty Blvd, City, State 12345" },
  ];

  // Mode of Payment options
  const paymentModeOptions = [
    { value: "", label: "Select Payment Mode" },
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "upi", label: "UPI" },
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "online_payment", label: "Online Payment" },
    { value: "neft", label: "NEFT" },
    { value: "rtgs", label: "RTGS" },
    { value: "imps", label: "IMPS" },
  ];

  // Service description options with details
  const serviceOptions = [
    { 
      value: "banquet_booking", 
      label: "Banquet Booking", 
      details: "Banquet hall booking services for events and functions",
      hsn_sac_code: "999599",
      gst_rate: "18%"
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
const convertAmountToWords = useCallback((amount) => {
  if (amount === 0 || isNaN(amount)) return "Zero Rupees";
  
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
  let rupees = Math.floor(amount); // Changed from const to let
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
}, []);
  useEffect(() => {
    fetchLedgers();
    fetchTaxRates();
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
        mode_of_payment: invoice.mode_of_payment || "",
        payment_details: invoice.payment_details || "",
        cheque_number: invoice.cheque_number || "",
        bank_name: invoice.bank_name || "",
        upi_id: invoice.upi_id || "",
        transaction_id: invoice.transaction_id || "",
        card_last_digits: invoice.card_last_digits || "",
        items: invoice.items || [
          { 
            s_no: 1,
            service_description: "", 
            service_details: "",
            hsn_sac_code: "", 
            tax_rate: "",
            igst_tax: false, // Changed from no_tax to igst_tax
            amount: "", 
            cgst_rate: "9", 
            cgst_amount: "0.00", 
            sgst_rate: "9", 
            sgst_amount: "0.00", 
            igst_rate: "0",
            igst_amount: "0.00",
            total: "0.00" 
          },
        ],
        notes: invoice.notes || "",
        bank_account: invoice.bank_account || "",
        bank_ifsc: invoice.bank_ifsc || "",
        bank_aic: invoice.bank_aic || "",
        terms_conditions: invoice.terms_conditions || "",
        gst_reverse_charge: invoice.gst_reverse_charge || "0",
        place_of_supply: invoice.place_of_supply || "Club House",
        state: invoice.state || "Maharashtra",
        state_code: invoice.state_code || "27",
        certification_date: invoice.certification_date || new Date().toISOString().split("T")[0],
      });
      
      // Set selected unit if editing existing invoice
      if (invoice.unit_no) {
        const flat = flatOptions.find(f => f.id === invoice.unit_no);
        const shop = shopOptions.find(s => s.id === invoice.unit_no);
        if (flat) {
          setSelectedUnitType("flat");
          setSelectedUnit(invoice.unit_no);
          // Filter customers based on the unit
          const customerId = flat.customerId;
          const customer = customerOptions.find(c => c.id === customerId);
          if (customer) {
            setFilteredCustomers([customer]);
            setFormData(prev => ({
              ...prev,
              customer_name: customer.name,
              customer_email: customer.email,
              customer_address: customer.address
            }));
          }
        } else if (shop) {
          setSelectedUnitType("shop");
          setSelectedUnit(invoice.unit_no);
          // Filter customers based on the unit
          const customerId = shop.customerId;
          const customer = customerOptions.find(c => c.id === customerId);
          if (customer) {
            setFilteredCustomers([customer]);
            setFormData(prev => ({
              ...prev,
              customer_name: customer.name,
              customer_email: customer.email,
              customer_address: customer.address
            }));
          }
        }
      }
    }
  }, [invoice]);

  // Initialize filtered customers with all customers initially
  useEffect(() => {
    setFilteredCustomers(customerOptions);
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSelect = (e) => {
    const selectedCustomerId = e.target.value;
    if (selectedCustomerId) {
      const selectedCustomer = customerOptions.find(customer => customer.id.toString() === selectedCustomerId);
      if (selectedCustomer) {
        setFormData(prev => ({
          ...prev,
          customer_name: selectedCustomer.name,
          customer_email: selectedCustomer.email,
          customer_address: selectedCustomer.address
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
        newItems[index].tax_rate = "12";
        newItems[index].cgst_rate = "6";
        newItems[index].sgst_rate = "6";
        newItems[index].igst_rate = "0";
      } else {
        newItems[index].tax_rate = "18";
        newItems[index].cgst_rate = "9";
        newItems[index].sgst_rate = "9";
        newItems[index].igst_rate = "0";
      }
      
      // Recalculate totals
      const recalculatedItem = recalculateItemTotals(newItems[index]);
      newItems[index] = recalculatedItem;
    } else {
      newItems[index].service_description = value;
      newItems[index].service_details = "";
      newItems[index].hsn_sac_code = "";
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleUnitTypeChange = (e) => {
    const unitType = e.target.value;
    setSelectedUnitType(unitType);
    setSelectedUnit(""); // Reset unit selection when type changes
    setFormData(prev => ({ ...prev, unit_no: "" }));
    setFilteredCustomers(customerOptions); // Reset to all customers when unit type changes
    // Clear customer fields
    setFormData(prev => ({
      ...prev,
      customer_name: "",
      customer_email: "",
      customer_address: ""
    }));
  };

  const handleUnitChange = (e) => {
    const unitId = e.target.value;
    setSelectedUnit(unitId);
    
    if (unitId) {
      let customerId = null;
      
      if (selectedUnitType === "flat") {
        const flat = flatOptions.find(f => f.id === unitId);
        if (flat) {
          customerId = flat.customerId;
        }
      } else if (selectedUnitType === "shop") {
        const shop = shopOptions.find(s => s.id === unitId);
        if (shop) {
          customerId = shop.customerId;
        }
      }
      
      setFormData(prev => ({ ...prev, unit_no: unitId }));
      
      // Filter customers based on the selected unit
      if (customerId) {
        const customer = customerOptions.find(c => c.id === customerId);
        if (customer) {
          setFilteredCustomers([customer]);
          // Auto-fill customer details
          setFormData(prev => ({
            ...prev,
            customer_name: customer.name,
            customer_email: customer.email,
            customer_address: customer.address
          }));
        }
      } else {
        setFilteredCustomers(customerOptions);
      }
    } else {
      setFormData(prev => ({ ...prev, unit_no: "" }));
      setFilteredCustomers(customerOptions); // Reset to all customers when no unit selected
      // Clear customer fields
      setFormData(prev => ({
        ...prev,
        customer_name: "",
        customer_email: "",
        customer_address: ""
      }));
    }
  };

  // Function to recalculate item totals
  const recalculateItemTotals = useCallback((item) => {
    const amount = parseFloat(item.amount) || 0;
    
    const cgstRate = parseFloat(item.cgst_rate) || 0;
    const sgstRate = parseFloat(item.sgst_rate) || 0;
    const igstRate = parseFloat(item.igst_rate) || 0;
    
    const cgstAmount = amount * (cgstRate / 100);
    const sgstAmount = amount * (sgstRate / 100);
    const igstAmount = amount * (igstRate / 100);
    const total = amount + cgstAmount + sgstAmount + igstAmount;
    
    return {
      ...item,
      cgst_amount: cgstAmount.toFixed(2),
      sgst_amount: sgstAmount.toFixed(2),
      igst_amount: igstAmount.toFixed(2),
      total: total.toFixed(2)
    };
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    
    // Update the field value
    newItems[index][field] = value;
    
    // Handle "IGST Tax" checkbox - when checked, all tax goes to IGST
    if (field === "igst_tax") {
      const isIgstTax = value;
      newItems[index].igst_tax = isIgstTax;
      
      if (isIgstTax) {
        // When IGST Tax is checked: All tax goes to IGST
        const taxRate = parseFloat(newItems[index].tax_rate) || 0;
        newItems[index].igst_rate = taxRate.toFixed(2);
        newItems[index].cgst_rate = "0";
        newItems[index].sgst_rate = "0";
      } else {
        // When IGST Tax is unchecked: Split tax between CGST and SGST (half each)
        const taxRate = parseFloat(newItems[index].tax_rate) || 0;
        const splitRate = (taxRate / 2).toFixed(2);
        newItems[index].igst_rate = "0";
        newItems[index].cgst_rate = splitRate;
        newItems[index].sgst_rate = splitRate;
      }
      
      // Recalculate totals after changing tax rates
      const recalculatedItem = recalculateItemTotals(newItems[index]);
      newItems[index] = recalculatedItem;
    }
    
    // If tax rate changes, update the distribution based on IGST Tax checkbox
    if (field === "tax_rate") {
      const taxRate = parseFloat(value) || 0;
      
      if (newItems[index].igst_tax) {
        // If IGST Tax is checked, all tax goes to IGST
        newItems[index].igst_rate = taxRate.toFixed(2);
        newItems[index].cgst_rate = "0";
        newItems[index].sgst_rate = "0";
      } else {
        // If IGST Tax is not checked, split tax between CGST and SGST
        const splitRate = (taxRate / 2).toFixed(2);
        newItems[index].cgst_rate = splitRate;
        newItems[index].sgst_rate = splitRate;
        newItems[index].igst_rate = "0";
      }
      
      // Recalculate totals
      const recalculatedItem = recalculateItemTotals(newItems[index]);
      newItems[index] = recalculatedItem;
    }
    
    // If GST rates change manually, recalculate totals
    if (field === "cgst_rate" || field === "sgst_rate" || field === "igst_rate") {
      const recalculatedItem = recalculateItemTotals(newItems[index]);
      newItems[index] = recalculatedItem;
    }
    
    // If amount is changed directly
    if (field === "amount") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        // Recalculate totals based on the new amount
        const recalculatedItem = recalculateItemTotals({
          ...newItems[index],
          amount: numericValue
        });
        newItems[index] = recalculatedItem;
      } else if (value === "") {
        // If empty, set all values to 0
        newItems[index] = {
          ...newItems[index],
          amount: "",
          cgst_amount: "0.00",
          sgst_amount: "0.00",
          igst_amount: "0.00",
          total: "0.00"
        };
      }
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  // Fixed handler for Tax Rate field - SIMPLIFIED VERSION
  const handleTaxRateChange = (index, value) => {
    const newItems = [...formData.items];
    
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // Update the tax rate field directly
      newItems[index].tax_rate = value;
      
      const taxRate = parseFloat(value) || 0;
      
      // Update tax distribution based on IGST Tax checkbox
      if (newItems[index].igst_tax) {
        // If IGST Tax is checked, all tax goes to IGST
        newItems[index].igst_rate = taxRate.toFixed(2);
        newItems[index].cgst_rate = "0";
        newItems[index].sgst_rate = "0";
      } else {
        // If IGST Tax is not checked, split tax between CGST and SGST
        const splitRate = (taxRate / 2).toFixed(2);
        newItems[index].cgst_rate = splitRate;
        newItems[index].sgst_rate = splitRate;
        newItems[index].igst_rate = "0";
      }
      
      // Recalculate totals only if we have a valid number
      if (!isNaN(taxRate)) {
        const recalculatedItem = recalculateItemTotals(newItems[index]);
        newItems[index] = recalculatedItem;
      }
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  // Handle blur event for tax rate field - format the value
  const handleTaxRateBlur = (index) => {
    const newItems = [...formData.items];
    const value = newItems[index].tax_rate;
    
    if (value !== "") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        // Format to 2 decimal places
        const formattedValue = numericValue.toFixed(2);
        newItems[index].tax_rate = formattedValue;
        
        // Update distribution based on IGST Tax checkbox
        if (newItems[index].igst_tax) {
          newItems[index].igst_rate = formattedValue;
          newItems[index].cgst_rate = "0";
          newItems[index].sgst_rate = "0";
        } else {
          const splitRate = (numericValue / 2).toFixed(2);
          newItems[index].cgst_rate = splitRate;
          newItems[index].sgst_rate = splitRate;
          newItems[index].igst_rate = "0";
        }
        
        // Recalculate totals
        const recalculatedItem = recalculateItemTotals(newItems[index]);
        newItems[index] = recalculatedItem;
      } else {
        // If invalid, reset to empty
        newItems[index].tax_rate = "";
      }
    }
    
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newSNo = formData.items.length + 1;
    const newItem = { 
      s_no: newSNo,
      service_description: "", 
      service_details: "",
      hsn_sac_code: "", 
      tax_rate: "18",
      igst_tax: false,
      amount: "",
      cgst_rate: "9", 
      cgst_amount: "0.00", 
      sgst_rate: "9", 
      sgst_amount: "0.00", 
      igst_rate: "0",
      igst_amount: "0.00",
      total: "0.00" 
    };
    
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

  const calculateTotals = useCallback(() => {
    const totals = formData.items.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0;
      const cgst = parseFloat(item.cgst_amount) || 0;
      const sgst = parseFloat(item.sgst_amount) || 0;
      const igst = parseFloat(item.igst_amount) || 0;
      const total = parseFloat(item.total) || 0;
      
      // Handle infinite values safely
      acc.amount += isNaN(amount) ? 0 : amount;
      acc.cgst += isNaN(cgst) ? 0 : cgst;
      acc.sgst += isNaN(sgst) ? 0 : sgst;
      acc.igst += isNaN(igst) ? 0 : igst;
      acc.total += isNaN(total) ? 0 : total;
      
      return acc;
    }, { amount: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });

    return totals;
  }, [formData.items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getCurrentOptions = () => {
    if (selectedUnitType === "flat") {
      return flatOptions;
    } else if (selectedUnitType === "shop") {
      return shopOptions;
    }
    return [];
  };

  // Preview functionality
  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const totals = calculateTotals();
  const amountInWords = convertAmountToWords(totals.total);

  // Function to render payment details based on selected mode
  const renderPaymentDetails = () => {
    switch (formData.mode_of_payment) {
      case "cash":
        return (
          <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-green-800">Cash Payment</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Details
              </label>
              <input
                type="text"
                name="payment_details"
                value={formData.payment_details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter cash payment details (e.g., Received by, Amount in cash, etc.)"
              />
            </div>
          </div>
        );

      case "cheque":
        return (
          <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium text-blue-800">Cheque Payment</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cheque Number *
                </label>
                <input
                  type="text"
                  name="cheque_number"
                  value={formData.cheque_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter cheque number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter bank name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <input
                type="text"
                name="payment_details"
                value={formData.payment_details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter additional cheque details"
              />
            </div>
          </div>
        );

      case "upi":
        return (
          <div className="space-y-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium text-purple-800">UPI Payment</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID *
              </label>
              <input
                type="text"
                name="upi_id"
                value={formData.upi_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter UPI ID (e.g., username@bank)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter UPI transaction ID"
              />
            </div>
          </div>
        );

      case "credit_card":
      case "debit_card":
        return (
          <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-medium text-yellow-800">
                {formData.mode_of_payment === "credit_card" ? "Credit Card" : "Debit Card"} Payment
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Last 4 Digits *
                </label>
                <input
                  type="text"
                  name="card_last_digits"
                  value={formData.card_last_digits}
                  onChange={handleChange}
                  required
                  maxLength="4"
                  pattern="[0-9]{4}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Last 4 digits"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter transaction ID"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <input
                type="text"
                name="payment_details"
                value={formData.payment_details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter card payment details"
              />
            </div>
          </div>
        );

      case "bank_transfer":
      case "neft":
      case "rtgs":
      case "imps":
        const methodName = formData.mode_of_payment === "bank_transfer" ? "Bank Transfer" :
                         formData.mode_of_payment === "neft" ? "NEFT" :
                         formData.mode_of_payment === "rtgs" ? "RTGS" : "IMPS";
        
        return (
          <div className="space-y-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span className="font-medium text-indigo-800">{methodName}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID *
                </label>
                <input
                  type="text"
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter transaction ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter bank name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Details
              </label>
              <input
                type="text"
                name="payment_details"
                value={formData.payment_details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder={`Enter ${methodName.toLowerCase()} details`}
              />
            </div>
          </div>
        );

      case "online_payment":
        return (
          <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium text-red-800">Online Payment</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Gateway / Platform
              </label>
              <input
                type="text"
                name="payment_details"
                value={formData.payment_details}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter payment platform (e.g., PayPal, Razorpay, Stripe, etc.)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID *
              </label>
              <input
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter transaction ID"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl p-6 my-4 max-h-[95vh] overflow-y-auto">
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
                    // required
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

                <div>
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
                </div>
              </div>
            </div>

            {/* Unit Information */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Unit Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Type *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={selectedUnitType}
                      onChange={handleUnitTypeChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    >
                      <option value="">Select Unit Type</option>
                      <option value="flat">Flat</option>
                      <option value="shop">Shop</option>
                    </select>

                    <select
                      value={selectedUnit}
                      onChange={handleUnitChange}
                      required
                      disabled={!selectedUnitType}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedUnitType === "flat" ? "Select Flat" : 
                         selectedUnitType === "shop" ? "Select Shop" : 
                         "Select Unit Type First"}
                      </option>
                      {getCurrentOptions().map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-xl text-gray-800 border-b pb-3 mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Customer
                    </label>
                    <select
                      onChange={handleCustomerSelect}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      disabled={selectedUnit && filteredCustomers.length === 1} // Disable if only one customer is available
                    >
                      <option value="">Select Customer</option>
                      {filteredCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    {selectedUnit && filteredCustomers.length === 1 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Customer auto-selected based on unit selection
                      </p>
                    )}
                  </div>

                  <div>
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

                {/* Mode of Payment - ADDED BELOW CUSTOMER INFORMATION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode of Payment
                  </label>
                  <select
                    name="mode_of_payment"
                    value={formData.mode_of_payment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  >
                    {paymentModeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Details - DYNAMICALLY RENDERED BASED ON MODE */}
                {formData.mode_of_payment && renderPaymentDetails()}
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
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r min-w-[180px]">
                        Service Description
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r min-w-[220px]">
                        Service Details
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-20">
                        HSN/SAC
                      </th>
                      
                      {/* COLUMNS AS SHOWN IN SCREENSHOT */}
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-24">
                        Tax Rate
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-24">
                        IGST Tax
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[140px]">
                        Amount (₹)
                      </th>
                      
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-20">
                        CGST%
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-24">
                        CGST Amt (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-20">
                        SGST%
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-24">
                        SGST Amt (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-20">
                        IGST%
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r w-24">
                        IGST Amt (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 border-r min-w-[140px]">
                        Total (₹)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-24">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 border-r text-center font-medium text-gray-600">
                          {item.s_no}
                        </td>
                        <td className="px-4 py-3 border-r">
                          <select
                            value={item.service_description}
                            onChange={(e) => handleServiceSelect(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm mb-2"
                          >
                            <option value="">Select Service</option>
                            {serviceOptions.map((service) => (
                              <option key={service.value} value={service.value}>
                                {service.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={item.service_description}
                            onChange={(e) =>
                              handleItemChange(index, "service_description", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Or enter custom description"
                          />
                        </td>
                        <td className="px-4 py-3 border-r">
                          <textarea
                            value={item.service_details}
                            onChange={(e) =>
                              handleItemChange(index, "service_details", e.target.value)
                            }
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Service details and description"
                          />
                        </td>
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.hsn_sac_code}
                            onChange={(e) =>
                              handleItemChange(index, "hsn_sac_code", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center"
                            placeholder="HSN/SAC"
                          />
                        </td>
                        
                        {/* TAX RATE FIELD - FIXED */}
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.tax_rate}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleTaxRateChange(index, value);
                            }}
                            onBlur={() => handleTaxRateBlur(index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-medium bg-blue-50 text-gray-800"
                            placeholder="%"
                            style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#1f2937',
                              backgroundColor: '#f0f9ff',
                              minHeight: '38px'
                            }}
                          />
                        </td>
                        
                        {/* IGST TAX CHECKBOX - CHANGED FROM NO TAX */}
                        <td className="px-4 py-3 border-r">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={item.igst_tax}
                              onChange={(e) =>
                                handleItemChange(index, "igst_tax", e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-xs text-gray-600">
                              {item.igst_tax ? "IGST Only" : "CGST/SGST"}
                            </span>
                          </div>
                        </td>
                        
                        {/* AMOUNT FIELD - DIRECT ENTRY */}
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.amount}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow any input (including negative numbers and decimals)
                              if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                                handleItemChange(index, "amount", value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value !== "" && !isNaN(parseFloat(value))) {
                                const numericValue = parseFloat(value);
                                handleItemChange(index, "amount", numericValue.toFixed(2));
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-semibold bg-blue-50 text-gray-800"
                            placeholder="0.00"
                            style={{ 
                              minWidth: '120px',
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#1f2937',
                              backgroundColor: '#f0f9ff',
                              minHeight: '38px'
                            }}
                          />
                        </td>
                        
                        {/* CGST */}
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.cgst_rate}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                                handleItemChange(index, "cgst_rate", value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value !== "" && !isNaN(parseFloat(value))) {
                                const numericValue = parseFloat(value);
                                handleItemChange(index, "cgst_rate", numericValue.toFixed(2));
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-medium"
                            disabled={item.igst_tax}
                            style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: item.igst_tax ? '#9ca3af' : '#1f2937',
                              backgroundColor: item.igst_tax ? '#f3f4f6' : 'white',
                              minHeight: '38px'
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                          {item.cgst_amount}
                        </td>
                        {/* SGST */}
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.sgst_rate}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                                handleItemChange(index, "sgst_rate", value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value !== "" && !isNaN(parseFloat(value))) {
                                const numericValue = parseFloat(value);
                                handleItemChange(index, "sgst_rate", numericValue.toFixed(2));
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-medium"
                            disabled={item.igst_tax}
                            style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: item.igst_tax ? '#9ca3af' : '#1f2937',
                              backgroundColor: item.igst_tax ? '#f3f4f6' : 'white',
                              minHeight: '38px'
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                          {item.sgst_amount}
                        </td>
                        {/* IGST */}
                        <td className="px-4 py-3 border-r">
                          <input
                            type="text"
                            value={item.igst_rate}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                                handleItemChange(index, "igst_rate", value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value !== "" && !isNaN(parseFloat(value))) {
                                const numericValue = parseFloat(value);
                                handleItemChange(index, "igst_rate", numericValue.toFixed(2));
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-center font-medium"
                            disabled={!item.igst_tax}
                            style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: !item.igst_tax ? '#9ca3af' : '#1f2937',
                              backgroundColor: !item.igst_tax ? '#f3f4f6' : 'white',
                              minHeight: '38px'
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 border-r text-center font-semibold text-gray-700">
                          {item.igst_amount}
                        </td>
                        <td className="px-4 py-3 border-r text-center font-semibold text-blue-700 text-lg">
                          {item.total}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200 text-xs font-semibold w-full"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Total Row - Updated to reflect removed columns */}
                    <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                      <td colSpan="7" className="px-4 py-4 text-right border-r text-gray-700 text-sm">
                        GRAND TOTAL:
                      </td>
                      <td className="px-4 py-4 text-center border-r text-green-700 text-lg">
                        {totals.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center border-r" colSpan="2">
                        {totals.cgst.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center border-r" colSpan="2">
                        {totals.sgst.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center border-r" colSpan="2">
                        {totals.igst.toFixed(2)}
                      </td>
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
                  <div className="flex"> 
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm ml-auto w-full">
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      Terms & Conditions
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
                </div>

                {/* Right Column - Tax Summary and Additional Details */}
                <div className="space-y-6">
                  {/* Tax Summary - UPDATED TO MATCH SCREENSHOT */}
                  <div className="space-y-4 p-6 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 text-center border-b pb-2">Tax Summary</h4>
                    
                    {/* Total Amount before Tax */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">Total Amount before Tax:</span>
                      <span className="text-sm font-bold text-gray-900">₹{totals.amount.toFixed(2)}</span>
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
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                 Additional Notes
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

      {/* Enhanced Preview Modal - MATCHING EXCEL FORMAT WITH IGST */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl p-4 my-4 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
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

            {/* Preview Content - MATCHING EXCEL FORMAT WITH IGST */}
            <div className="border border-gray-300 rounded-lg p-0 bg-white font-sans text-sm">
              
              {/* Company Header - Matching Excel */}
              <div className="p-4 border-b border-gray-300">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">{billingConfig.company_name || siteInfo.name || "JP Infra Venture LLP"}</div>
                  <div className="text-sm mt-1">
                    {billingConfig.company_address || "3rd Floor, 301, Viraj Tower, Near WEH, Metro Station, W.E.Highway, Andheri East, Mumbai -400093"}
                  </div>
                  <div className="text-sm mt-2 font-semibold">GST No- {billingConfig.gst_number || ""}</div>
                </div>
              </div>

              {/* Tax Invoice Header */}
              <div className="p-4 border-b border-gray-300">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold mb-2">Tax Invoice</h1>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Invoice No:</span> {formData.invoice_number || "AV/25-26/001"}
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold">Invoice date:</span> {formData.invoice_date || ""}
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold">Reverse Charge (Y/N):</span> N
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="border border-gray-300 p-2 inline-block">
                      <div>
                        <span className="font-semibold"> Place of Supply:</span> {formData.place_of_supply || "Club House"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill to Party Section */}
              <div className="p-4 border-b border-gray-300">
                <h2 className="text-lg font-bold mb-3">Bill to Party</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Name:</span> {formData.customer_name || ""}
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold">Address:</span> {formData.customer_address || "JP Aviva"}
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold">Mode of Payment:</span> {formData.mode_of_payment ? paymentModeOptions.find(opt => opt.value === formData.mode_of_payment)?.label : "Not Specified"}
                    </div>
                    {/* Display Payment Details in Preview */}
                    {formData.mode_of_payment === "cheque" && formData.cheque_number && (
                      <div className="mb-1">
                        <span className="font-semibold">Cheque No:</span> {formData.cheque_number}
                        {formData.bank_name && ` | Bank: ${formData.bank_name}`}
                      </div>
                    )}
                    {formData.mode_of_payment === "upi" && formData.upi_id && (
                      <div className="mb-1">
                        <span className="font-semibold">UPI ID:</span> {formData.upi_id}
                      </div>
                    )}
                    {formData.transaction_id && (
                      <div className="mb-1">
                        <span className="font-semibold">Transaction ID:</span> {formData.transaction_id}
                      </div>
                    )}
                    {formData.card_last_digits && (
                      <div className="mb-1">
                        <span className="font-semibold">Card Last 4 Digits:</span> {formData.card_last_digits}
                      </div>
                    )}
                    {formData.payment_details && (
                      <div className="mb-1">
                        <span className="font-semibold">Payment Details:</span> {formData.payment_details}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="mb-1">
                      <span className="font-semibold">GST No:</span>
                    </div>
                    <div>
                      <span className="font-semibold">State:</span> {formData.state || "Maharashtra"} |
                      <span className="font-semibold"> Code:</span> {formData.state_code || "27"}
                      <br />
                      <span className="font-semibold"> Mode of Payment:</span> {formData.mode_of_payment || "Not Specified"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table - UPDATED WITHOUT QTY AND UNIT PRICE COLUMNS */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-center font-semibold w-12">S. No</th>
                      <th className="border border-gray-300 p-2 text-left font-semibold">Service Description</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold w-24">HSN/SAC Code</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold w-28">Amount</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold" colSpan="2">CGST</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold" colSpan="2">SGST</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold" colSpan="2">IGST</th>
                      <th className="border border-gray-300 p-2 text-center font-semibold w-28">Total</th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-1"></th>
                      <th className="border border-gray-300 p-1"></th>
                      <th className="border border-gray-300 p-1"></th>
                      <th className="border border-gray-300 p-1"></th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-16">Rate %</th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-20">Amount</th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-16">Rate %</th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-20">Amount</th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-16">Rate %</th>
                      <th className="border border-gray-300 p-1 text-xs font-medium w-20">Amount</th>
                      <th className="border border-gray-300 p-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 p-2 text-center">{item.s_no}</td>
                        <td className="border border-gray-300 p-2">
                          <div className="font-medium">{item.service_description || ""}</div>
                          {item.service_details && (
                            <div className="text-xs text-gray-600 mt-1">{item.service_details}</div>
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-center font-mono">{item.hsn_sac_code || ""}</td>
                        <td className="border border-gray-300 p-2 text-center font-semibold">₹{parseFloat(item.amount || 0).toFixed(2)}</td>
                        
                        {/* CGST Columns */}
                        <td className="border border-gray-300 p-2 text-center">{item.cgst_rate || "0"}%</td>
                        <td className="border border-gray-300 p-2 text-center">₹{parseFloat(item.cgst_amount || 0).toFixed(2)}</td>
                        
                        {/* SGST Columns */}
                        <td className="border border-gray-300 p-2 text-center">{item.sgst_rate || "0"}%</td>
                        <td className="border border-gray-300 p-2 text-center">₹{parseFloat(item.sgst_amount || 0).toFixed(2)}</td>
                        
                        {/* IGST Columns - ADDED NEXT TO SGST */}
                        <td className="border border-gray-300 p-2 text-center">{item.igst_rate || "0"}%</td>
                        <td className="border border-gray-300 p-2 text-center">₹{parseFloat(item.igst_amount || 0).toFixed(2)}</td>
                        
                        <td className="border border-gray-300 p-2 text-center font-bold">₹{parseFloat(item.total || 0).toFixed(2)}</td>
                      </tr>
                    ))}
                    
                    {/* Empty rows to match template - up to 11 rows total */}
                    {formData.items.length < 11 && 
                      Array.from({ length: 11 - formData.items.length }).map((_, index) => (
                        <tr key={`empty-${index}`} className="h-8">
                          <td className="border border-gray-300 p-1 text-center">{formData.items.length + index + 1}</td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1 text-center">0.00</td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1"></td>
                          <td className="border border-gray-300 p-1 text-center">0.00</td>
                        </tr>
                      ))
                    }

                    {/* Total Row - UPDATED WITHOUT QTY AND UNIT PRICE */}
                    <tr className="bg-gray-100 font-bold">
                      <td className="border border-gray-300 p-2 text-center" colSpan="3">Total</td>
                      <td className="border border-gray-300 p-2 text-center">₹{totals.amount.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2 text-center" colSpan="2"></td>
                      <td className="border border-gray-300 p-2 text-center" colSpan="2"></td>
                      <td className="border border-gray-300 p-2 text-center" colSpan="2"></td>
                      <td className="border border-gray-300 p-2 text-center">₹{totals.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary Section - UPDATED WITH NEW LAYOUT */}
              <div className="p-4 border-t border-gray-300">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Amount in Words */}
                    <div>
                      <div className="font-semibold mb-1">Total Invoice amount in words</div>
                      <div className="border border-gray-300 p-2 rounded bg-yellow-50 min-h-10 text-sm">
                        {amountInWords}
                      </div>
                    </div>
                    
                    {/* Bank Details */}
                    <div>
                      <div className="font-semibold mb-2">Bank Details</div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">Bank A/C:</span> {formData.bank_account || ""}
                        </div>
                        <div>
                          <span className="font-medium">Bank IFSC:</span> {formData.bank_ifsc || ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tax Summary WITH IGST */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Amount before Tax:</span>
                      <span className="font-semibold">₹{totals.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Add: CGST:</span>
                      <span className="font-semibold">₹{totals.cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Add: SGST:</span>
                      <span className="font-semibold">₹{totals.sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Add: IGST:</span>
                      <span className="font-semibold">₹{totals.igst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span>Total Tax Amount:</span>
                      <span className="font-semibold text-blue-700">₹{(totals.cgst + totals.sgst + totals.igst).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold">Total Amount after Tax:</span>
                      <span className="font-bold text-green-700">₹{totals.total.toFixed(2)}</span>
                    </div>
                    
                    {/* GST on Reverse Charge */}
                    <div className="flex justify-between mt-4">
                      <span>GST on Reverse Charge:</span>
                      <span>{formData.gst_reverse_charge || "0"}</span>
                    </div>
                  </div>
                </div>
                
                {/* Terms & Conditions, Common Seal, and JP Infra Venture Boxes - IN THE SAME ROW */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {/* Terms & Conditions Box - LEFT SIDE */}
                  <div className="border-2 border-gray-300 rounded bg-white h-48">
                    <div className="font-semibold p-2 text-sm border-b border-gray-300 bg-gray-50">Terms & conditions</div>
                    <div className="p-3 text-xs overflow-y-auto h-32">
                      {formData.terms_conditions || "No terms and conditions specified."}
                    </div>
                  </div>
                  
                  {/* Common Seal Box - MIDDLE */}
                  <div className="border-2 border-gray-300 p-3 rounded text-center bg-white h-48 flex flex-col justify-center items-center">
                    <div className="border-t-2 border-gray-400 pt-4 w-full">
                      <span className="text-sm font-semibold text-gray-700">Common Seal</span>
                    </div>
                  </div>
                  
                  {/* JP Infra Venture Box - RIGHT SIDE */}
                  <div className="border-2 border-gray-300 p-3 rounded text-center bg-blue-50 h-48 flex flex-col justify-center">
                    <div className="text-xs mb-2">
                      Certified that the particulars given above are true and correct
                    </div>
                    
                    <div className="font-bold text-blue-800 text-sm mt-2">JP Infra Venture LLP</div>
                    
                    {/* Authorised Signatory directly below JP Infra Venture */}
                    <div className="mt-4">
                      <div className="border-t-2 border-gray-400 pt-2 mx-auto w-40">
                        <span className="text-xs font-semibold text-gray-700">Authorised Signatory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Authorised Signatory - BELOW BOTH BOXES */}
              <div className="flex justify-end mt-4 pr-8">
                <div className="bg-white rounded-lg p-4 border-2 border-gray-300 shadow-sm inline-block">
                  {/* This space intentionally left blank to match the layout */}
                </div>
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