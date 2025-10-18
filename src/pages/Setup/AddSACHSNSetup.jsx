import { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { editHsn, getHsnDetails, postHsn } from '../../api'
import toast from 'react-hot-toast'
import { getItemInLocalStorage } from '../../utils/localStorage'

function AddSACHSNSetup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('id'); // when present, page works in edit mode

    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        hsn_type: '', // 'product' | 'service'
        category: '',
        code: '',
        cgst_rate: '',
        sgst_rate: '',
        igst_rate: '',
        active: true,
    });

    const userId = useMemo(() => getItemInLocalStorage('UserId') || getItemInLocalStorage('USER_ID') || '', []);
    const companyId = useMemo(() => getItemInLocalStorage('COMPANYID') || '', []);

    useEffect(() => {
        const loadDetails = async () => {
            if (!editId) return;
            try {
                const res = await getHsnDetails(editId);
                const d = res?.data || {};
                setForm({
                    hsn_type: d.hsn_type || '',
                    category: d.category || '',
                    code: d.code || '',
                    cgst_rate: d.cgst_rate?.toString?.() || '',
                    sgst_rate: d.sgst_rate?.toString?.() || '',
                    igst_rate: d.igst_rate?.toString?.() || '',
                    active: d.active !== undefined ? Boolean(d.active) : true,
                });
            } catch (error) {
                console.error(error);
                toast.error('Failed to load HSN details');
            }
        };
        loadDetails();
    }, [editId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validate = () => {
        if (!form.hsn_type) return 'Please select Type';
        if (!form.category?.trim()) return 'Please enter Category';
        if (!form.code?.trim()) return 'Please enter SAC/HSN code';
        // Optional: number validation for tax rates
        const toNum = (v) => (v === '' || v === null || v === undefined ? null : Number(v));
        const nums = ['cgst_rate', 'sgst_rate', 'igst_rate'].map((k) => ({ k, v: toNum(form[k]) }));
        for (const { k, v } of nums) {
            if (v !== null && (Number.isNaN(v) || v < 0)) return `Invalid ${k.replace('_', ' ').toUpperCase()}`;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) return toast.error(err);
        setSubmitting(true);
        try {
            const payload = {
                hsn: {
                    hsn_type: form.hsn_type,
                    category: form.category,
                    code: form.code,
                    cgst_rate: form.cgst_rate === '' ? null : Number(form.cgst_rate),
                    sgst_rate: form.sgst_rate === '' ? null : Number(form.sgst_rate),
                    igst_rate: form.igst_rate === '' ? null : Number(form.igst_rate),
                    active: form.active,
                    created_by: userId || undefined,
                    updated_by: userId || undefined,
                    company_id: companyId || undefined,
                },
            };

            if (editId) {
                await editHsn(editId, payload);
                toast.success('HSN updated successfully');
            } else {
                await postHsn(payload);
                toast.success('HSN created successfully');
            }
            navigate('/admin/sac-hsn-setup');
        } catch (error) {
            console.error(error);
            const msg = error?.response?.data?.error || 'Failed to save HSN';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

  return (
        <section className='flex'>
        <div className='hidden md:block'>
            <Navbar/>
        </div>
                <div className="w-full flex  flex-col overflow-hidden">
                        <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                                {editId ? 'Edit' : 'Add'} SAC/HSN Setup
                        </h2>
                        <div className='flex justify-center'>
                                <form onSubmit={handleSubmit} className='border border-gray-400 p-5 px-10 rounded-lg w-4/5'>
                                        <div className='md:grid grid-cols-3 gap-5 my-3'>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                Type 
                                                        </label>
                                                        <select name="hsn_type" value={form.hsn_type} onChange={handleChange} className="border p-1 px-4 border-gray-500 rounded-md">
                                                                <option value="">Select Type </option>
                                                                <option value="product">Product</option>
                                                                <option value="service">Service</option>
                                                        </select>
                                                </div>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                Category 
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name='category'
                                                            value={form.category}
                                                            onChange={handleChange}
                                                            placeholder="Enter Category "
                                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                                        />
                                                </div>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                SAC/HSN code 
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name='code'
                                                            value={form.code}
                                                            onChange={handleChange}
                                                            placeholder="Enter SAC/HSN code "
                                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                                        />
                                                </div>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                CGST Rate
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name='cgst_rate'
                                                            value={form.cgst_rate}
                                                            onChange={handleChange}
                                                            placeholder="Enter CGST Rate"
                                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                                        />
                                                </div>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                SGST Rate
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name='sgst_rate'
                                                            value={form.sgst_rate}
                                                            onChange={handleChange}
                                                            placeholder="Enter SGST Rate"
                                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                                     />
                                                </div>
                                                <div className="flex flex-col ">
                                                        <label className="font-semibold my-2">
                                                                IGST Rate
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            name='igst_rate'
                                                            value={form.igst_rate}
                                                            onChange={handleChange}
                                                            placeholder="Enter IGST Rate"
                                                            className="border p-1 px-4 border-gray-500 rounded-md"
                                                        />
                                                </div>
                                                <div className="flex items-center gap-2 mt-7">
                                                    <input id='active' name='active' type="checkbox" checked={form.active} onChange={handleChange} />
                                                    <label htmlFor='active' className="font-semibold">Active</label>
                                                </div>
                                        </div>
                                        <div className="sm:flex justify-center grid gap-2 my-5 ">
                                                <button disabled={submitting} type='submit' className="bg-black disabled:opacity-60 text-white p-2 px-4 rounded-md font-medium">
                                                        {submitting ? (editId ? 'Updating...' : 'Submitting...') : (editId ? 'Update' : 'Submit')}
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
    </section>
  )
}

export default AddSACHSNSetup