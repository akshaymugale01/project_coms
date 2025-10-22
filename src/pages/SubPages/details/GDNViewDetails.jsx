import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../../components/table/Table';
import { getGDNDetails } from '../../../api';
import toast from 'react-hot-toast';

const GdnViewDetails = () => {
    const { id } = useParams();
    const [gdnData, setGdnData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGDNDetails = async () => {
            try {
                setLoading(true);
                const response = await getGDNDetails(id);
                const data = response?.data?.gdn_detail || response?.data;
                console.log("GDN Details:", data);
                setGdnData(data);
            } catch (error) {
                console.error("Error fetching GDN details:", error);
                toast.error("Failed to fetch GDN details");
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchGDNDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!gdnData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">GDN not found</p>
            </div>
        );
    }

    const column = [
        { name: "Inventory", selector: (row) => row.inventory_name || row.Inventory, sortable: true },
        { name: "Current Stock", selector: (row) => row.current_stock || row.CurrentStock, sortable: true },
        { name: "Quantity", selector: (row) => row.quantity || row.Quantity, sortable: true },
        { name: "Purpose", selector: (row) => row.purpose_name || row.Purpose, sortable: true },
        { name: "Comments", selector: (row) => row.comments || row.Reason, sortable: true },
        { name: "Hand Over To", selector: (row) => row.handover_to_name || row.HandOverTo, sortable: true },
      ];
      
    const data = gdnData.gdn_inventory_details || gdnData.inventory_details || [];
    
    const getStatusColor = (status) => {
        if (!status || typeof status !== 'string') {
            return 'bg-gray-400';
        }
        switch(status.toLowerCase()) {
            case 'pending': return 'bg-orange-400';
            case 'approved': return 'bg-green-400';
            case 'dispatched': return 'bg-green-400';
            case 'rejected': return 'bg-red-400';
            case 'cancelled': return 'bg-red-400';
            default: return 'bg-gray-400';
        }
    };
    
  return (
    <section>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
            <h2 className="text-xl font-semibold mx-5 my-5">
                GDN #{gdnData.id || 'N/A'}
            </h2>
            <div className='flex gap-3 item-center my-3 mx-5 flex-wrap'>
                <p className='text-sm font-bold'>Status:</p>
                <button className={`${getStatusColor(gdnData.status)} px-2 py-1 rounded-md text-white text-sm`}>
                    {gdnData.status || 'Pending'}
                </button>
            </div>
            <div className='border-2 border-gray-400 mx-5'>
                <h2 className="text-xl font-semibold mx-5 my-5">
                    GDN DETAILS
                </h2>
                <div className='border-2 border-gray-400 mx-5 my-5'>
                    <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
                        <div className="grid grid-cols-2 items-center">
                            <p>GDN Date</p>
                            <p className="text-sm font-normal ">: {gdnData.gdn_date || 'N/A'}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Description</p>
                            <p className="text-sm font-normal ">: {gdnData.description || 'N/A'}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Created By</p>
                            <p className="text-sm font-normal ">: {gdnData.created_by_name || 'N/A'}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Created At</p>
                            <p className="text-sm font-normal ">: {gdnData.created_at || 'N/A'}</p>
                        </div>
                    </div>
                </div> 
                <div className='border my-5 mx-5 border-gray-200'></div>
            </div>
            <div className='mx-5 my-5'>
                <h3 className="text-lg font-semibold mb-3">Inventory Details</h3>
                <Table
                  columns={column}
                  data={data}
                  isPagination={true}
                />
            </div>
        </div>
    </section>
  )
}

export default GdnViewDetails
