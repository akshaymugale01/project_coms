import { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useParams, Link } from 'react-router-dom'
import { getHsnDetails } from '../../api'
function SACHSNSetupDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const formatRate = (v) => {
        if (v === null || v === undefined || v === "") return "-";
        const n = Number(v);
        if (Number.isNaN(n)) return String(v);
        return `${n.toFixed(1)}%`;
    };
    const formatDateTime = (s) => {
        if (!s) return "-";
        try {
            const d = new Date(s);
            if (isNaN(d.getTime())) return "-";
            return d.toLocaleString(undefined, {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch { return "-"; }
    };
    const capitalize = (t) => (typeof t === 'string' && t.length ? t.charAt(0).toUpperCase() + t.slice(1) : t || "");

    const createdByName = useMemo(() => {
        if (!data) return "-";
        const n = data.created_by_name;
        if (n && typeof n === 'object') {
            const f = n.firstname || ""; const l = n.lastname || ""; return `${f} ${l}`.trim() || "-";
        }
        return n || data.created_by || "-";
    }, [data]);

    useEffect(() => {
        const load = async () => {
            setLoading(true); setError("");
            try {
                const res = await getHsnDetails(id);
                setData(res?.data || null);
            } catch (e) {
                console.error(e);
                setError('Failed to fetch HSN details');
            } finally { setLoading(false); }
        };
        if (id) load();
    }, [id]);
  return (
    <section className='flex'>
        <div className='hidden md:block'>
            <Navbar/>
        </div>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                SAC/HSN Setup Details
            </h2>
            <div className='flex justify-center'>
                            <div className="md:my-5 md:px-10 p-5 text-sm items-center font-medium grid  md:grid-cols-2 border-2 border-black w-4/5 rounded-md" >
                                {loading ? (
                                    <div className='col-span-2 text-center'>Loading…</div>
                                ) : error ? (
                                    <div className='col-span-2 text-center text-red-600'>{error}</div>
                                ) : !data ? (
                                    <div className='col-span-2 text-center'>No details found</div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 items-center ">
                                            <p>Type:</p>
                                            <p className="text-sm font-normal ">{capitalize(data.hsn_type)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>Category:</p>
                                            <p className="text-sm font-normal ">{data.category || '-'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>SAC/HSN Code: </p>
                                            <p className="text-sm font-normal ">{data.code || '-'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>CGST Rate:</p>
                                            <p className="text-sm font-normal ">{formatRate(data.cgst_rate)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>SGST Rate:</p>
                                            <p className="text-sm font-normal ">{formatRate(data.sgst_rate)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>IGST Rate:</p>
                                            <p className="text-sm font-normal ">{formatRate(data.igst_rate)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>Created On:</p>
                                            <p className="text-sm font-normal ">{formatDateTime(data.created_at)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>Updated On:</p>
                                            <p className="text-sm font-normal ">{formatDateTime(data.updated_at)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <p>Created By:</p>
                                            <p className="text-sm font-normal ">{createdByName}</p>
                                        </div>
                                        <div className="col-span-2 flex justify-center mt-4">
                                            <Link to={`/admin/add-sac-hsn-setup?id=${id}`} className='border border-black rounded-md px-4 py-1'>Edit</Link>
                                        </div>
                                    </>
                                )}
                            </div>
            </div>
        </div>
    </section>
  )
}

export default SACHSNSetupDetails