import { useEffect, useState } from "react";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getMasters, getVendors, postGRN } from "../../api";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";

const AddGrn = () => {
  const themeColor = "rgb(3 19 37)";
  const [vendors, setVendors] = useState([]);
  const [invent, setinvent] = useState([]);
  const [inventories, setInventories] = useState([
    {
      item_id: "",
      expected_quantity: "",
      received_quantity: "",
      rejected_quantity: "",
      rate: "",
      csgt_rate: "",
      csgt_amt: "",
      sgst_rate: "",
      sgst_amt: "",
      igst_rate: "",
      igst_amt: "",
      tcs_rate: "",
      tcs_amt: "",
      tax_amt: "",
      inventory_amount: "",
      total_amount: "",
      grn_id: "",
      inventory_type: "",
      criticality: "",
      batches: [{ value: "" }],
    },
  ]);
  const handleAddInventory = () => {
    setInventories([
      ...inventories,
      {
        item_id: "",
        expected_quantity: "",
        received_quantity: "",
        rejected_quantity: "",
        rate: "",
        csgt_rate: "",
        csgt_amt: "",
        sgst_rate: "",
        sgst_amt: "",
        igst_rate: "",
        igst_amt: "",
        tcs_rate: "",
        tcs_amt: "",
        tax_amt: "",
        inventory_amount: "",
        total_amount: "",
        grn_id: "",
        inventory_type: "",
        criticality: "",
        batches: [{ value: "" }],
      },
    ]);
  };
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorResp = await getVendors();
        const payload = vendorResp?.data;
        const rows = Array.isArray(payload)
          ? payload
          : payload?.vendors || payload?.data || [];
        setVendors(rows);
      } catch (error) {
        console.log("Failed to fetch vendors", error);
        setVendors([]);
      }
    };

    fetchVendors();
  }, []);

  // Function to handle adding a new batch input field
  const handleInventoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInventories = [...inventories];
    updatedInventories[index][name] = value;
    setInventories(updatedInventories);
  };

  // Handle batch change
  const handleBatchChange = (invIndex, batchIndex, value) => {
    const updatedInventories = [...inventories];
    updatedInventories[invIndex].batches[batchIndex].value = value;
    setInventories(updatedInventories);
  };
  // Add new batch to a specific inventory
  const handleAddBatchField = (invIndex) => {
    const updatedInventories = [...inventories];
    updatedInventories[invIndex].batches.push({ value: "" });
    setInventories(updatedInventories);
  };

  // Remove batch
  const handleDeleteBatch = (invIndex, batchIndex) => {
    const updatedInventories = [...inventories];
    updatedInventories[invIndex].batches.splice(batchIndex, 1);
    setInventories(updatedInventories);
  };
  const [formData, setFormData] = useState({
    loi_detail_id: "",
    vendor_id: "",
    payment_mode: "",
    invoice_number: "",
    related_to: "",
    invoice_amount: "",
    invoice_date: "",
    posting_date: "",
    other_expenses: "",
    loading_expenses: "",
    adjustment_amount: "",
    notes: "",
    inventory_details: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDeleteInventory = (invIndex) => {
    const updatedInventories = inventories.filter(
      (_, index) => index !== invIndex
    );
    setInventories(updatedInventories);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = getItemInLocalStorage("UserId");
    const siteId = getItemInLocalStorage("SITEID");
    
    const grnData = {
      grn_detail: {
        site_id: siteId,
        created_by_id: userId,
        vendor_id: formData.vendor_id,
        payment_mode: formData.payment_mode,
        invoice_number: formData.invoice_number,
        related_to: formData.related_to,
        invoice_amount: formData.invoice_amount,
        invoice_date: formData.invoice_date,
        posting_date: formData.posting_date,
        other_expenses: formData.other_expenses,
        loading_expenses: formData.loading_expenses,
        adjustment_amount: formData.adjustment_amount,
        notes: formData.notes,
      },
      inventory_details: inventories.map((inventory) => ({
        item_id: inventory.inventory_type,
        expected_quantity: inventory.expected_quantity,
        received_quantity: inventory.received_quantity,
        approved_quantity: inventory.approved_quantity,
        rejected_quantity: inventory.rejected_quantity,
        rate: inventory.rate,
        csgt_rate: inventory.csgt_rate,
        csgt_amt: inventory.csgt_amt,
        sgst_rate: inventory.sgst_rate,
        sgst_amt: inventory.sgst_amt,
        igst_rate: inventory.igst_rate,
        igst_amt: inventory.igst_amt,
        tcs_rate: inventory.tcs_rate,
        tcs_amt: inventory.tcs_amt,
        tax_amt: inventory.tax_amt,
        inventory_amount: inventory.inventory_amount,
        total_amount: inventory.total_amount,
        inventory_type: inventory.inventory_type,
        criticality: inventory.criticality,
        batches: inventory.batches.map((b) => b.value).filter(Boolean),
      })),
    };

    try {
      const response = await postGRN(grnData);
      console.log("GRN submitted successfully:", response.data);

      toast.success("GRN submitted successfully");
      navigate(`/assets/stock-items`);
      // Reset form after successful submission
      setFormData({
        loi_detail_id: "",
        vendor_id: "",
        payment_mode: "",
        invoice_number: "",
        related_to: "",
        invoice_amount: "",
        invoice_date: "",
        posting_date: "",
        other_expenses: "",
        loading_expenses: "",
        adjustment_amount: "",
        notes: "",
        inventory_details: [],
      });

      setInventories([
        {
          item_id: "",
          expected_quantity: "",
          received_quantity: "",
          approved_quantity: "",
          rejected_quantity: "",
          rate: "",
          csgt_rate: "",
          csgt_amt: "",
          sgst_rate: "",
          sgst_amt: "",
          igst_rate: "",
          igst_amt: "",
          tcs_rate: "",
          tcs_amt: "",
          tax_amt: "",
          inventory_amount: "",
          total_amount: "",
          grn_id: "",
          inventory_type: "",
          criticality: "",
          batches: [{ value: "" }],
        },
      ]);
    } catch (error) {
      console.error("Error submitting GRN:", error);
      toast.error("Failed to submit GRN");
    }
  };
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const invResp = await getMasters(1, 100);
        const payload = invResp?.data;
        // Ensure payload is an array and map the required fields
        const rows = Array.isArray(payload)
          ? payload
          : payload?.data || payload?.inventories || [];

        const sortedInvData = rows.map((host) => ({
          id: host.id, // Use 'id' for the option value
          name: host.name, // Use 'name' for the option text
          type: host.inventory_type, // Include inventory type if needed
        }));

        setinvent(sortedInvData);

        console.log("Fetched Inventory:", sortedInvData);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setinvent([]);
      }
    };

    fetchInventory();
  }, []);
  const calculateTotalAmount = () => {
    return inventories
      .reduce((acc, curr) => {
        return acc + (parseFloat(curr.total_amount) || 0);
      }, 0)
      .toFixed(2);
  };


return (
    <section>
        <div className=" flex  ">
            <Navbar />
            <div className="md:mx-20 my-2 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg w-full">
                <h2
                    className="text-center text-xl font-bold p-2 bg-black rounded-full text-white mb-4"
                    style={{ background: themeColor }}
                >
                    NEW GRN
                </h2>
                <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
                    <h2 className="text-lg border-black font-semibold text-center">
                        GRN DETAILS
                    </h2>
                    <div className="flex sm:flex-row flex-col justify-around items-center">
                        <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Purchase Order :
                                </label>
                                <select
                                    name=""
                                    id=""
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                >
                                    <option value="">Select Purchase Order</option>
                                    <option value="">10019 - 4500000235</option>
                                    <option value="">10020 - 4500000235</option>
                                    <option value="">10020 - 4500000235</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold ">
                                    Supplier :
                                </label>
                                <select
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                    value={formData.vendor_id}
                                    onChange={handleChange}
                                    name="vendor_id"
                                >
                                    <option value="">Select Supplier</option>
                                    {vendors?.map((vendor) => (
                                        <option value={vendor.id} key={vendor.id}>
                                            {vendor.vendor_name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => navigate("/suppliers/add-supplier")}
                                    aria-label="Add new supplier"
                                    className="mt-2 text-blue-600 underline hover:text-blue-800 cursor-pointer flex items-start"
                                >
                                    + Add New Supplier
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold ">
                                    Payment Mode
                                </label>
                                <select
                                    name="payment_mode"
                                    id=""
                                    value={formData.payment_mode}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                >
                                    <option value="">Select Payment Mode</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="RTGS">RTGS</option>
                                    <option value="NFTS">NFTS</option>
                                    <option value="Internet Banking">Internet Banking</option>
                                    <option value="UPI">UPI</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    name="invoice_number"
                                    placeholder="Enter Number"
                                    value={formData.invoice_number}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Related To
                                </label>
                                <input
                                    type="text"
                                    name="related_to"
                                    placeholder="Enter Text"
                                    value={formData.related_to}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Invoice Amount
                                </label>
                                <input
                                    type="text"
                                    name="invoice_amount"
                                    placeholder="Enter Number"
                                    value={formData.invoice_amount}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Invoice Date
                                </label>
                                <input
                                    type="date"
                                    name="invoice_date"
                                    placeholder="Enter Date"
                                    value={formData.invoice_date}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Posting Date
                                </label>
                                <input
                                    type="date"
                                    name="posting_date"
                                    placeholder="Enter Date"
                                    value={formData.posting_date}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Other Expense
                                </label>
                                <input
                                    type="text"
                                    name="other_expenses"
                                    placeholder="Other Expense"
                                    value={formData.other_expenses}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Loading Expense
                                </label>
                                <input
                                    type="text"
                                    name="loading_expenses"
                                    placeholder="Enter Number"
                                    value={formData.loading_expenses}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Adjustment Amount
                                </label>
                                <input
                                    type="text"
                                    name="adjustment_amount"
                                    placeholder="Enter Number"
                                    value={formData.adjustment_amount}
                                    onChange={handleChange}
                                    className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            id=""
                            cols="5"
                            rows="3"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Notes"
                            className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                </div>
                <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
                    <h2 className=" text-lg border-black font-semibold text-center">
                        INVENTORY DETAILS
                    </h2>
                    <div className="">
                        {inventories.map((inventory, invIndex) => (
                            <div key={invIndex} className="mb-8">
                                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Inventory Type</label>
                                        <select
                                            type="text"
                                            name="inventory_type"
                                            value={inventory.inventory_type || ""}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                        >
                                            <option value="">Select Inventory</option>
                                            {/* Map over the fetched inventory data */}
                                            {invent.map((supplier) => (
                                                <option value={supplier.id} key={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <div className="flex flex-col">
                <label className="font-semibold">Item</label>
                <select
                    type="text"
                    name="item_id"
                    value={inventory.item_id}
                    className="border p-1 px-4 border-gray-500 rounded-md"

                    onChange={(e) => handleInventoryChange(invIndex, e)}
                >
                    <option value="">Select Item</option>
                    {invent.map((supplier) => (
                    <option value={supplier.id} key={supplier.id}>
                        {supplier.name}
                    </option>
                ))}

                </select></div> */}
                                    <div className="flex flex-col ">
                                        <label htmlFor="" className="font-semibold ">
                                            Expected Quantity
                                        </label>
                                        <input
                                            type="text"
                                            name="expected_quantity"
                                            placeholder="Expected Quantity"
                                            value={inventory.expected_quantity}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold ">
                                            Received Quantity
                                        </label>
                                        <input
                                            type="text"
                                            name="received_quantity"
                                            placeholder="Received Quantity"
                                            value={inventory.received_quantity}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Approved Quantity
                                        </label>
                                        <input
                                            type="text"
                                            name="approved_quantity"
                                            placeholder="Approved Quantity"
                                            value={inventory.approved_quantity}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Rejected Quantity
                                        </label>
                                        <input
                                            type="text"
                                            name="rejected_quantity"
                                            placeholder="Rejected Quantity"
                                            value={inventory.rejected_quantity}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Rate
                                        </label>
                                        <input
                                            type="text"
                                            name="rate"
                                            placeholder="9300.0"
                                            value={inventory.rate}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            CGST Rate
                                        </label>
                                        <input
                                            type="text"
                                            name="csgt_rate"
                                            placeholder="Enter Number"
                                            value={inventory.csgt_rate}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            CGST Amount
                                        </label>
                                        <input
                                            type="text"
                                            name="csgt_amt"
                                            placeholder="0.00"
                                            value={inventory.csgt_amt}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            SGST Rate
                                        </label>
                                        <input
                                            type="text"
                                            name="sgst_rate"
                                            placeholder="Enter Number"
                                            value={inventory.sgst_rate}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            SGST Amount
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            name="sgst_amt"
                                            value={inventory.sgst_amt}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            IGST Rate
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Number"
                                            name="igst_rate"
                                            value={inventory.igst_rate}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            IGST Amount
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            name="igst_amt"
                                            value={inventory.igst_amt}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            TCS Rate
                                        </label>
                                        <input
                                            type="text"
                                            name="tcs_rate"
                                            placeholder="0"
                                            value={inventory.tcs_rate}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            TCS Amount
                                        </label>
                                        <input
                                            type="text"
                                            name="tcs_amt"
                                            placeholder="0.00"
                                            value={inventory.tcs_amt}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Total Taxes
                                        </label>
                                        <input
                                            type="text"
                                            name="tax_amt"
                                            placeholder="0"
                                            value={inventory.tax_amt}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            name="inventory_amount"
                                            placeholder="0.00"
                                            value={inventory.inventory_amount}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">
                                            Total Amount
                                        </label>
                                        <input
                                            type="text"
                                            name="total_amount"
                                            placeholder="0"
                                            value={inventory.total_amount}
                                            onChange={(e) => handleInventoryChange(invIndex, e)}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                        />
                                    </div>
                                </div>
                                {inventory.batches.map((batch, batchIndex) => (
                                    <div key={batchIndex} className="my-2">
                                        <input
                                            type="text"
                                            placeholder="Enter Batch No."
                                            value={batch.value}
                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                            onChange={(e) =>
                                                handleBatchChange(
                                                    invIndex,
                                                    batchIndex,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() => handleDeleteBatch(invIndex, batchIndex)}
                                            className="ml-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="text-white p-1 text-lg w-32 rounded-md"
                                    style={{ background: themeColor }}
                                    onClick={() => handleAddBatchField(invIndex)}
                                >
                                    Add Batch
                                </button>
                                <button
                                    type="button"
                                    className="text-white p-1 text-lg w-64 ml-2 rounded-md"
                                    style={{ background: themeColor }}
                                    onClick={() => handleDeleteInventory(invIndex)}
                                >
                                    Delete Inventory
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="text-white p-1 text-lg w-32 rounded-md"
                        style={{ background: themeColor }}
                        onClick={handleAddInventory}
                    >
                        Add Inventory
                    </button>
                </div>

                <div className="my-3 mx-5">
                    <h2 className=" text-lg border-black font-semibold text-start my-5">
                        ATTACHMENTS*
                    </h2>
                    <FileInputBox />
                </div>
                <div>
                    <div className="my-3 mx-5 text-end">
                        <button
                            className="bg-black text-white p-2 text-small rounded-md "
                            style={{ background: themeColor }}
                        >
                            Total Amount: ₹ {calculateTotalAmount()}
                        </button>
                    </div>
                    <div className="my-10 mx-5 text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-black text-white px-8  py-2 text-small rounded-md "
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};

export default AddGrn;
