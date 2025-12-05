
import React, { useState, useEffect } from 'react';
import FileInputBox from '../../containers/Inputs/FileInputBox';
import { useSelector } from "react-redux";
import { postOtherBills } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getVendors } from "../../api";
import Navbar from '../../components/Navbar';
const AddBills = () => {
    const [suppliers, setSuppliers] = useState([]);
    const themeColor = useSelector((state) => state.theme.color);
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
                payment_tenure: "",
                description:"",
                other_bills_attachments:[]
              });
              useEffect(() => {
                const fetchSuppliers = async () => {
                  try {
                    const supplierResp = await getVendors(); // Call API to get suppliers
                    console.log(supplierResp);
                    setSuppliers(supplierResp.data); // Set the fetched suppliers in state
                  } catch (error) {
                    console.error("Error fetching suppliers:", error);
                    toast.error("Failed to load suppliers");
                  }
                };
            
                fetchSuppliers(); // Execute the function to fetch suppliers
              }, []);
              const handleChange = (e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              };
              const navigate = useNavigate()
          const handleNewBillSubmit = async() => {
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
                const billResp = await postOtherBills(sendData)
                toast.success("Bill Added Successfully")
                navigate("/admin/other-bills")
                console.log(billResp)
            } catch (error) {
                console.log(error)
            }
          };
          const handleFileChange = (files, fieldName) => {
    
            setFormData({
              ...formData,
              [fieldName]: files,
            });
            console.log(fieldName);
          };
    // Function to calculate tax amounts and total amount
    const calculateTaxes = () => {
        const baseAmount = parseFloat(amount) || 0;
        const expenses = parseFloat(additionalExpenses) || 0;

        // Calculate CGST, SGST, IGST, TCS amounts
        const cgstAmt = (baseAmount * (parseFloat(cgstRate) || 0)) / 100;
        const sgstAmt = (baseAmount * (parseFloat(sgstRate) || 0)) / 100;
        const igstAmt = (baseAmount * (parseFloat(igstRate) || 0)) / 100;
        const tcsAmt = (baseAmount * (parseFloat(tcsRate) || 0)) / 100;

        const totalTaxAmt = cgstAmt + sgstAmt + igstAmt + tcsAmt;

        // Calculate total amount including tax and expenses
        const totalAmt = baseAmount + expenses + totalTaxAmt;

        // Update state with calculated values
        setCgstAmount(cgstAmt);
        setSgstAmount(sgstAmt);
        setIgstAmount(igstAmt);
        setTcsAmount(tcsAmt);
        setTaxAmount(totalTaxAmt);
        setTotalAmount(totalAmt);
    };

    // Handle CGST change and auto-update SGST
    const handleCgstChange = (e) => {
        const value = e.target.value;
        setCgstRate(value);
        setSgstRate(value); // Automatically match SGST to CGST
        handleChange(e); // Also update formData
    };

    // Recalculate taxes whenever relevant values change
    useEffect(() => {
        calculateTaxes();
    }, [amount, additionalExpenses, cgstRate, sgstRate, igstRate, tcsRate]);

    return (
        <section>
            <div className=" flex  ">
                <Navbar/>
                <div className='md:mx-20 my-2 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg'>
                    <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white mb-4" style={{ background: themeColor }}>
                        NEW BILL
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
                                <div className='flex gap-2'>
                                <input type="number" value={cgstRate} onChange={handleCgstChange} placeholder="CGST Rate" className="border p-1 px-4 w-48 border-gray-500 rounded-md" />
                                <input type="number" value={cgstAmount} readOnly placeholder="CGST Amount" className="border p-1 px-3 border-gray-500 w-48 rounded-md" />
                                </div>
                            </div>
                            {/* <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">CGST Amount</label>
                                <input type="number" value={cgstAmount} readOnly placeholder="CGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div> */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">SGST Rate</label>
                                <div className='flex gap-2'>
                                <input type="number" value={sgstRate} onChange={(e) => setSgstRate(e.target.value)} placeholder="SGST Rate" readOnly className="border p-1 px-4 w-48  border-gray-500 rounded-md" />
                                <input type="number" value={sgstAmount} readOnly placeholder="SGST Amount" className="border p-1 px-2 border-gray-500 w-48 rounded-md" />
                                </div>
                            </div>
                            {/* <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">SGST Amount</label>
                                <input type="number" value={sgstAmount} readOnly placeholder="SGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div> */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">IGST Rate</label>
                                <div className='flex gap-2'>
                                <input type="number" value={igstRate} onChange={(e) => setIgstRate(e.target.value)} placeholder="IGST Rate" className="border p-1 px-4 w-48 border-gray-500 rounded-md" />
                                <input type="number" value={igstAmount} readOnly placeholder="IGST Amount" className="border p-1 px-2 border-gray-500 w-48 rounded-md" />
                                </div>
                            </div>
                            {/* <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">IGST Amount</label>
                                <input type="number" value={igstAmount} readOnly placeholder="IGST Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div> */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">TCS Rate</label>
                                <div className='flex gap-2'>
                                <input type="number" value={tcsRate} onChange={(e) => setTcsRate(e.target.value)} placeholder="TCS Rate" className="border p-1 px-4 w-48 border-gray-500 rounded-md" />
                                <input type="number" value={tcsAmount} readOnly placeholder="TCS Amount" className="border p-1 px-2 border-gray-500 w-48 rounded-md" />
                                </div>
                            </div>
                            {/* <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">TCS Amount</label>
                                <input type="number" value={tcsAmount} readOnly placeholder="TCS Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div> */}
                            {/* Tax and total amounts */}
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1"> Tax Amount</label>
                                <input type="number" value={taxAmount} readOnly placeholder="Total Tax Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold my-1">Total Amount</label>
                                <input type="number" value={totalAmount} readOnly placeholder="Total Amount" className="border p-1 px-4 border-gray-500 rounded-md" />
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="flex flex-col mt-2">
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
                    <div className="my-4">
                        {/* File Input for attachments */}
                        <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
                 ATTACHMENTS
                 </h2>
                 <FileInputBox  handleChange={(files) => handleFileChange(files, "other_bills_attachments")}
                fieldName={"other_bills_attachments"}
                isMulti={true} />   
                    
                    
                                   </div>
                    <div className="flex justify-center">
                        <button onClick={handleNewBillSubmit}  className="bg-black text-white p-2 px-4 rounded-md font-medium" style={{ background: themeColor }}>Submit</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddBills;
