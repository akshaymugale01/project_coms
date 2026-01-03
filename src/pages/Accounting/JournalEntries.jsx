// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import {
//   getJournalEntries,
//   createJournalEntry,
//   updateJournalEntry,
//   deleteJournalEntry,
//   postJournalEntry,
//   cancelJournalEntry,
// } from "../../api/accountingApi";
// import JournalEntryModal from "./JournalEntryModal";

// const JournalEntries = () => {
//   const [journalEntries, setJournalEntries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   useEffect(() => {
//     fetchJournalEntries();
//   }, []);

//   const fetchJournalEntries = async () => {
//     setLoading(true);
//     try {
//       const response = await getJournalEntries();
//       setJournalEntries(response.data.data || response.data);
//     } catch (error) {
//       toast.error("Failed to fetch journal entries");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreate = () => {
//     setSelectedEntry(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (entry) => {
//     setSelectedEntry(entry);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this journal entry?"))
//       return;

//     try {
//       await deleteJournalEntry(id);
//       toast.success("Journal entry deleted successfully");
//       fetchJournalEntries();
//     } catch (error) {
//       toast.error("Failed to delete journal entry");
//       console.error(error);
//     }
//   };

//   const handlePost = async (id) => {
//     if (!window.confirm("Are you sure you want to post this journal entry?"))
//       return;

//     try {
//       await postJournalEntry(id);
//       toast.success("Journal entry posted successfully");
//       fetchJournalEntries();
//     } catch (error) {
//       toast.error("Failed to post journal entry");
//       console.error(error);
//     }
//   };

//   const handleCancel = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this journal entry?"))
//       return;

//     try {
//       await cancelJournalEntry(id);
//       toast.success("Journal entry cancelled successfully");
//       fetchJournalEntries();
//     } catch (error) {
//       toast.error("Failed to cancel journal entry");
//       console.error(error);
//     }
//   };

//   const handleSave = async (data) => {
//     try {
//       if (selectedEntry) {
//         await updateJournalEntry(selectedEntry.id, data);
//         toast.success("Journal entry updated successfully");
//       } else {
//         await createJournalEntry(data);
//         toast.success("Journal entry created successfully");
//       }
//       setIsModalOpen(false);
//       fetchJournalEntries();
//     } catch (error) {
//       toast.error("Failed to save journal entry");
//       console.error(error);
//     }
//   };

//   const filteredEntries = journalEntries.filter((entry) => {
//     const matchesSearch =
//       entry.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter ? entry.status === statusFilter : true;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Journal Entries</h1>
//         <button
//           onClick={handleCreate}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           + Add Journal Entry
//         </button>
//       </div>

//       <div className="mb-4 flex gap-4">
//         <input
//           type="text"
//           placeholder="Search journal entries..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 max-w-md px-4 py-2 border rounded"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Status</option>
//           <option value="draft">Draft</option>
//           <option value="posted">Posted</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reference
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredEntries.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No journal entries found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredEntries.map((entry) => (
//                   <tr key={entry.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap font-medium">
//                       {entry.reference}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {new Date(entry.entry_date).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {entry.description || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       ₹{parseFloat(entry.total_amount || 0).toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 rounded text-xs ₹{
//                           entry.status === "posted"
//                             ? "bg-green-100 text-green-800"
//                             : entry.status === "cancelled"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-yellow-100 text-yellow-800"
//                         }`}
//                       >
//                         {entry.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       {entry.status === "draft" && (
//                         <>
//                           <button
//                             onClick={() => handlePost(entry.id)}
//                             className="text-green-600 hover:text-green-900 mr-3"
//                           >
//                             Post
//                           </button>
//                           <button
//                             onClick={() => handleEdit(entry)}
//                             className="text-blue-600 hover:text-blue-900 mr-3"
//                           >
//                             Edit
//                           </button>
//                         </>
//                       )}
//                       {entry.status === "posted" && (
//                         <button
//                           onClick={() => handleCancel(entry.id)}
//                           className="text-orange-600 hover:text-orange-900 mr-3"
//                         >
//                           Cancel
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(entry.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {isModalOpen && (
//         <JournalEntryModal
//           entry={selectedEntry}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default JournalEntries;







import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  postJournalEntry,
  cancelJournalEntry,
} from "../../api/accountingApi";
import JournalEntryModal from "./JournalEntryModal";
import Navbar from "../../components/Navbar";

const JournalEntries = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    setLoading(true);
    try {
      const response = await getJournalEntries();
      setJournalEntries(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch journal entries");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedEntry(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (entry) => {
    try {
      const res = await getJournalEntry(entry.id);
      const full = res?.data?.data || res?.data || entry;
      setSelectedEntry(full);
      setIsModalOpen(true);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load journal entry details");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this journal entry?"))
      return;

    try {
      await deleteJournalEntry(id);
      toast.success("Journal entry deleted successfully");
      fetchJournalEntries();
    } catch (error) {
      toast.error("Failed to delete journal entry");
      console.error(error);
    }
  };

  const handlePost = async (id) => {
    if (!window.confirm("Are you sure you want to post this journal entry?"))
      return;

    try {
      await postJournalEntry(id);
      toast.success("Journal entry posted successfully");
      fetchJournalEntries();
    } catch (error) {
      toast.error("Failed to post journal entry");
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this journal entry?"))
      return;

    try {
      await cancelJournalEntry(id);
      toast.success("Journal entry cancelled successfully");
      fetchJournalEntries();
    } catch (error) {
      toast.error("Failed to cancel journal entry");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedEntry) {
        await updateJournalEntry(selectedEntry.id, data);
        toast.success("Journal entry updated successfully");
      } else {
        await createJournalEntry(data);
        toast.success("Journal entry created successfully");
      }
      setIsModalOpen(false);
      fetchJournalEntries();
    } catch (error) {
      toast.error("Failed to save journal entry");
      console.error(error);
    }
  };

  const filteredEntries = journalEntries.filter((entry) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesStatus = statusFilter ? entry.status === statusFilter : true;
    
    if (!term) return matchesStatus;
    
    const haystack = [
      entry.reference,
      entry.entry_number,
      entry.description,
      entry.narration,
      entry.entry_type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    
    return matchesStatus && haystack.includes(term);
  });

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Journal Entries</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Journal Entry
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search journal entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="posted">Posted</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No journal entries found
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {entry.reference || entry.entry_number || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(entry.entry_date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.description || entry.narration || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{(
                        parseFloat(
                          entry.total_amount ??
                            entry.total_debit ??
                            entry.total_credit ??
                            0
                        ) || 0
                      ).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ₹{
                          entry.status === "posted"
                            ? "bg-green-100 text-green-800"
                            : entry.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-medium">

                      {entry.status === "draft" && (
                        <>
                          <button
                            onClick={() => handlePost(entry.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Post
                          </button>

                          <button
                            onClick={() => handleEdit(entry)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                        </>
                      )}

                      {entry.status === "posted" && (
                        <button
                          onClick={() => handleCancel(entry.id)}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                        >
                          Cancel
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <JournalEntryModal
          entry={selectedEntry}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    </section>
  );
};

export default JournalEntries;
