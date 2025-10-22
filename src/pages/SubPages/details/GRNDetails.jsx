import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdPrint } from 'react-icons/io'
import { MdFeed } from 'react-icons/md'
import Table from '../../../components/table/Table'
import { getGRNDetails } from '../../../api'
import toast from 'react-hot-toast'

const GrnDetails = () => {
    const { id } = useParams();
    const [grnData, setGrnData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGRNDetails = async () => {
            try {
                setLoading(true);
                const response = await getGRNDetails(id);
                const data = response?.data?.grn_detail || response?.data;
                console.log("GRN Details:", data);
                setGrnData(data);
            } catch (error) {
                console.error("Error fetching GRN details:", error);
                toast.error("Failed to fetch GRN details");
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchGRNDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!grnData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">GRN not found</p>
            </div>
        );
    }

    const inventoryColumns = [
        { name: "Inventory", selector: (row) => row.inventory_name || row.Inventory, sortable: true },
        { name: "Expected Quantity", selector: (row) => row.expected_quantity || row.ExpectedQuantity, sortable: true },
        { name: "Received Quantity", selector: (row) => row.received_quantity || row.ReceivedQuantity, sortable: true },
        { name: "Unit", selector: (row) => row.unit || row.Unit, sortable: true },
        { name: "Rate", selector: (row) => row.rate || row.Rate, sortable: true },
        { name: "Approved Qty", selector: (row) => row.approved_qty || row.ApprovedQty, sortable: true },
        { name: "Rejected Qty", selector: (row) => row.rejected_qty || row.RejectedQty, sortable: true },
        { name: "CGST Rate", selector: (row) => row.cgst_rate || row.CGSTRate, sortable: true },
        { name: "CGST Amount", selector: (row) => row.cgst_amount || row.CGSTAmount, sortable: true },
        { name: "SGST Rate", selector: (row) => row.sgst_rate || row.SGSTRate, sortable: true },
        { name: "SGST Amount", selector: (row) => row.sgst_amount || row.SGSTAmount, sortable: true },
        { name: "IGST Rate", selector: (row) => row.igst_rate || row.IGSTRate, sortable: true },
        { name: "IGST Amount", selector: (row) => row.igst_amount || row.IGSTAmount, sortable: true },
        { name: "TCS Rate", selector: (row) => row.tcs_rate || row.TCSRate, sortable: true },
        { name: "TCS Amount", selector: (row) => row.tcs_amount || row.TCSAmount, sortable: true },
        { name: "Total Taxes", selector: (row) => row.total_taxes || row.TotalTaxes, sortable: true },
        { name: "Total Amount", selector: (row) => row.total_amount || row.TotalAmount, sortable: true },
    ];

    const inventoryData = grnData.grn_inventory_details || grnData.inventory_details || [];

  return (
    <section>
        <div className='flex flex-col md:flex-row md:justify-between my-5 w-full'>
            <h2 className="text-xl font-semibold mx-5">
                GRN DETAILS #{grnData.id || 'N/A'}
            </h2>
            <div className='flex mr-5 gap-2'>
                <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <MdFeed/>
                    Feeds
                </button> 
                <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <IoMdPrint />
                    Print
                </button>
            </div>
        </div>

        <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
            <h2 className="border-t text-lg py-5 border-black font-semibold text-center">
                GRN Information
            </h2>
            <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
                <div className="grid grid-cols-2 items-center">
                    <p>Invoice Number</p>
                    <p className="text-sm font-normal ">: {grnData.invoice_number || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Invoice Date</p>
                    <p className="text-sm font-normal ">: {grnData.invoice_date || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Vendor Name</p>
                    <p className="text-sm font-normal ">: {grnData.vendor_name || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Payment Mode</p>
                    <p className="text-sm font-normal ">: {grnData.payment_mode || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Related To</p>
                    <p className="text-sm font-normal ">: {grnData.related_to || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Invoice Amount</p>
                    <p className="text-sm font-normal ">: {grnData.invoice_amount || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Expenses</p>
                    <p className="text-sm font-normal ">: {grnData.expenses || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Status</p>
                    <p className="text-sm font-normal ">: {grnData.status || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Created At</p>
                    <p className="text-sm font-normal ">: {grnData.created_at || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Created By</p>
                    <p className="text-sm font-normal ">: {grnData.created_by_name || 'N/A'}</p>
                </div>
            </div>
            
            <div className='border-black border-t mt-5'>   
            </div>
            
            <h3 className="text-lg font-semibold my-3">Inventory Details</h3>
            <Table
                 columns={inventoryColumns}
                 data={inventoryData}
            />
        </div>

        <h2 className="text-md font-semibold my-3 mx-5">
            Attachments
        </h2>
        <div className='border-t py-5 mx-5 border-black'>
          <p className='text-md font-semibold'>Attachments</p>
          <p className='text-sm'>No attachments</p>
        </div>
    </section>
  )
}

export default GrnDetails
