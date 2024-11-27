import React, { useState, useEffect } from 'react';
import FileInputBox from '../../../containers/Inputs/FileInputBox';
import { useSelector } from 'react-redux';
import { editOtherBillsDetails, getOtherBillsDetails } from '../../../api'; 

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {  getVendors } from '../../../api';
import { FaRegFileAlt } from 'react-icons/fa';

const domainPrefix = "https://admin.vibecopilot.ai";
const isImage = (filePath) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
  return imageExtensions.includes(extension);
};

const getFileName = (filePath) => {
  return filePath.split("/").pop().split("?")[0];
};
const EditOtherBills = () => {
    const [suppliers, setSuppliers] = useState([]);
   
    const [amount, setAmount] = useState("");
    const [additionalExpenses, setAdditionalExpenses] = useState("");
    const [cgstRate, setCgstRate] = useState("");
    const [sgstRate, setSgstRate] = useState("");
    const [igstRate, setIgstRate] = useState("");
    const [tcsRate, setTcsRate] = useState("");
    const [cgstAmount, setCgstAmount] = useState("");
    const [sgstAmount, setSgstAmount] = useState("");
    const [igstAmount, setIgstAmount] = useState("");
    const [tcsAmount, setTcsAmount] = useState("");
    const [taxAmount, setTaxAmount] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [formData, setFormData] = useState({
        vendor_id: "",
        bill_date: "",
        invoice_number: "",
        related_to: "",
        tds_percentage: "",
        retention_percentage: "",
        deduction_remarks: "",
        deduction_amount: "",
        additional_expenses: "",
        payment_tenure: "",
        cgst_rate: "",
        cgst_amount: "",
        sgst_rate: "",
        sgst_amount: "",
        igst_rate: "",
        igst_amount: "",
        tcs_rate: "",
        tcs_amount: "",
        tax_amount: "",
        total_amount: "",
        description: "",
        other_bills_attachments: []
    });
    const handleFileChange = (files, fieldName) => {
    
        setFormData({
          ...formData,
          [fieldName]: files,
        });
        console.log(fieldName);
      };
    const themeColor = useSelector((state) => state.theme.color);
    const navigate = useNavigate();
    const { id } = useParams(); // Get bill ID from the URL

    // Fetch bill details by ID and set them in formData
    useEffect(() => {
        const fetchBillDetails = async () => {
            try {
                const response = await getOtherBillsDetails(id); // Fetch bill details by ID
                const billData = response.data;
                setFormData(billData);
                console.log('Fetched Bill Data:', billData);
                
                setAmount(billData.deduction_amount || ""); 
                setAdditionalExpenses(billData.additional_expenses || "");
                setCgstRate(billData.cgst_rate || "");
                
                setSgstRate(billData.sgst_rate || "");
                setIgstRate(billData.igst_rate || "");
                setTcsRate(billData.tcs_rate || "");
            } catch (error) {
                console.error('Error fetching bill details:', error);
                toast.error('Failed to load bill details');
            }
        };

        fetchBillDetails();
    }, [id]);

    // Fetch suppliers
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const supplierResp = await getVendors();
                setSuppliers(supplierResp.data);
                console.log('Fetched supply Data:', supplierResp);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                toast.error('Failed to load suppliers');
            }
        };

        fetchSuppliers();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle CGST change and auto-update SGST
    const handleCgstChange = (e) => {
        const value = e.target.value;
        setCgstRate(value);
        setSgstRate(value); // Automatically match SGST to CGST
        handleChange(e); // Also update formData
    };

    // Function to calculate tax amounts and total amount
    const calculateTaxes = () => {
        const baseAmount = parseFloat(amount) || 0;
        const expenses = parseFloat(additionalExpenses) || 0;

        const cgstAmt = (baseAmount * (parseFloat(cgstRate) || 0)) / 100;
        const sgstAmt = (baseAmount * (parseFloat(sgstRate) || 0)) / 100;
        const igstAmt = (baseAmount * (parseFloat(igstRate) || 0)) / 100;
        const tcsAmt = (baseAmount * (parseFloat(tcsRate) || 0)) / 100;

        const totalTaxAmt = cgstAmt + sgstAmt + igstAmt + tcsAmt;

        const totalAmt = baseAmount + expenses + totalTaxAmt;

        setCgstAmount(cgstAmt);
        setSgstAmount(sgstAmt);
        setIgstAmount(igstAmt);
        setTcsAmount(tcsAmt);
        setTaxAmount(totalTaxAmt);
        setTotalAmount(totalAmt);
    };

    // Recalculate taxes whenever relevant values change
    useEffect(() => {
        calculateTaxes();
    }, [amount, additionalExpenses, cgstRate, sgstRate, igstRate, tcsRate]);

    // Handle form submission
    const handleEditBillSubmit = async () => {
        const sendData = new FormData();
        sendData.append("other_bill[vendor_id]", formData.vendor_id);
        sendData.append("other_bill[bill_date]", formData.bill_date);
        sendData.append("other_bill[invoice_number]", formData.invoice_number);
        sendData.append("other_bill[related_to]", formData.related_to);
        sendData.append("other_bill[tds_percentage]", formData.tds_percentage);
        sendData.append("other_bill[retention_percentage]", formData.retention_percentage);
        sendData.append("other_bill[deduction_remarks]", formData.deduction_remarks);
        sendData.append("other_bill[deduction_amount]", amount);
        sendData.append("other_bill[additional_expenses]", additionalExpenses);
        sendData.append("other_bill[payment_tenure]", formData.payment_tenure);
        sendData.append("other_bill[cgst_rate]", cgstRate);
        sendData.append("other_bill[cgst_amount]", cgstAmount);
        sendData.append("other_bill[sgst_rate]", sgstRate);
        sendData.append("other_bill[sgst_amount]", sgstAmount);
        sendData.append("other_bill[igst_rate]", igstRate);
        sendData.append("other_bill[igst_amount]", igstAmount);
        sendData.append("other_bill[tcs_rate]", tcsRate);
        sendData.append("other_bill[tcs_amount]", tcsAmount);
        sendData.append("other_bill[tax_amount]", taxAmount);
        sendData.append("other_bill[total_amount]", totalAmount);
        sendData.append("other_bill[description]", formData.description);

        formData.other_bills_attachments.forEach((file) => {
            sendData.append("attachfiles[]", file)
        });

        try {
            await editOtherBillsDetails(id, sendData);
            toast.success("Bill updated successfully");
            navigate("/admin/other-bills");
        } catch (error) {
            console.error("Error updating bill:", error);
            toast.error("Failed to update bill");
        }
    };

    return (
        <section>
            <div className="w-full flex flex-col overflow-hidden">
                <div className="md:mx-20 my-2 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg">
                    <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white mb-4" style={{ background: themeColor }}>
                        EDIT BILL
                    </h2>
                    <h2 className="border-b text-center text-xl border-black mb-6 font-bold">BASIC DETAILS</h2>
                    <div className="flex sm:flex-row flex-col justify-around items-center">
                        <div className="grid md:grid-cols-3 gap-x-4 gap-2 w-full">
                            {/* Inputs for Bill details */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Supplier</label>
                                <select
            className="border p-1 px-4 border-gray-500 rounded-md"
            id="supplier"
            value={formData.vendor_id} // Selected supplier value
            name="vendor_id" // Name corresponding to form data state
            onChange={handleChange} // Handle change in selection
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option value={supplier.id} key={supplier.id}>
                {supplier.company_name}
              </option>
            ))}
          </select>
                            </div>
                            {/* Additional form fields */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Bill Date</label>
                                <input type="date" name="bill_date" value={formData.bill_date} onChange={handleChange} className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Invoice Number</label>
                                <input type="text" name="invoice_number" value={formData.invoice_number} onChange={handleChange} placeholder="Enter Invoice" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            {/* More inputs */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Related To</label>
                                <input type="text" name="related_to" value={formData.related_to} onChange={handleChange} placeholder="Related To" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">TDS(%)</label>
                                <input type="text" name="tds_percentage" value={formData.tds_percentage} onChange={handleChange} placeholder="TDS(%)" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Retention(%)</label>
                                <input type="text" name="retention_percentage" value={formData.retention_percentage} onChange={handleChange} placeholder="Retention(%)" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Deduction </label>
                                <input type="text" placeholder='Deduction' className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Deduction Remarks</label>
                                <input type="text" name="deduction_remarks" value={formData.deduction_remarks} onChange={handleChange} placeholder="Deduction Remarks" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Amount</label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Payment Tenure(in days)</label>
                                <input type="text" name="payment_tenure" value={formData.payment_tenure} onChange={handleChange} placeholder="Payment Tenure " className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Additional Expenses</label>
                                <input type="number" value={additionalExpenses} onChange={(e) => setAdditionalExpenses(e.target.value)} placeholder="Additional Expenses" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            {/* Tax rate and amount inputs */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">CGST Rate</label>
                                <input type="number" value={cgstRate} onChange={handleCgstChange} placeholder="CGST Rate" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">CGST Amount</label>
                                <input type="number" value={cgstAmount} readOnly placeholder="CGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">SGST Rate</label>
                                <input type="number" value={sgstRate} onChange={(e) => setSgstRate(e.target.value)} placeholder="SGST Rate" readOnly className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">SGST Amount</label>
                                <input type="number" value={sgstAmount} readOnly placeholder="SGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">IGST Rate</label>
                                <input type="number" value={igstRate} onChange={(e) => setIgstRate(e.target.value)} placeholder="IGST Rate" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">IGST Amount</label>
                                <input type="number" value={igstAmount} readOnly placeholder="IGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">TCS Rate</label>
                                <input type="number" value={tcsRate} onChange={(e) => setTcsRate(e.target.value)} placeholder="TCS Rate" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">TCS Amount</label>
                                <input type="number" value={tcsAmount} readOnly placeholder="TCS Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            {/* Tax and total amounts */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1"> Tax Amount</label>
                                <input type="number" value={taxAmount} readOnly placeholder="Total Tax Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Total Amount</label>
                                <input type="number" value={totalAmount} readOnly placeholder="Total Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                               Description
                            </label>
                             <textarea
                              name="description"
                               value={formData.description}
                               onChange={handleChange}
                              id="description"
                              cols="1"
                              rows="3"
                              placeholder='Description'
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h2 className="border-b text-center text-xl border-black mb-6 font-bold">ATTACHMENTS</h2>
                        {/* <div className="flex gap-4 flex-wrap my-4 items-center text-center">
        {formData.other_bills_attachments && formData.other_bills_attachments.length > 0 ? (
          formData.other_bills_attachments.map((doc, index) => (
            <div key={doc.id} className="">
              {isImage(domainPrefix + doc.document) ? (
                <img
                  src={domainPrefix + doc.document}
                  alt={`Attachment ${index + 1}`}
                  className="w-40 h-28 object-cover rounded-md cursor-pointer"
                  onClick={() => window.open(domainPrefix + doc.document, "_blank")}
                />
              ) : (
                <a
                  href={domainPrefix + doc.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-all duration-300 text-center flex flex-col items-center"
                >
                  <FaRegFileAlt size={50} />
                  {getFileName(doc.document)}
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center w-full">No Attachments</p>
        )}
      </div> */}
                       <FileInputBox  handleChange={(files) => handleFileChange(files, "other_bills_attachments")}
                fieldName={"other_bills_attachments"}
                isMulti={true} />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleEditBillSubmit} className="bg-black text-white p-2 px-4 rounded-md font-medium">Update</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditOtherBills;
