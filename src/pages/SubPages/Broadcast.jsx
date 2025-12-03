import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getBroadCast, updateBroadcastEnableStatus } from "../../api";
import Table from "../../components/table/Table";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner"; 

const Broadcast = () => {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [broadcast, setBroadcast] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const themeColor = "rgb(3 19 37)";

  useEffect(() => {
    const userType = getItemInLocalStorage("USERTYPE");
    setUser(userType);

    const fetchBroadCast = async () => {
      try {
        const broadcastResp = await getBroadCast();
        
        // Refined mapping to ensure 'enabled' is a boolean for the toggle
        const sortedBroadcast = broadcastResp.data
          .map((item) => ({
            ...item,
            // Convert any truthy/falsy value from API to a proper boolean
            enabled: !!item.enabled 
          }))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setFilteredData(sortedBroadcast);
        setBroadcast(sortedBroadcast);
      } catch (error) {
        console.error("Error fetching broadcasts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchBroadCast();
  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleToggle = async (id) => {
    const item = broadcast.find((b) => b.id === id);
    if (!item) return;

    const previousStatus = item.enabled;
    const newStatus = !previousStatus;

    const updateLocal = (status) => {
      setBroadcast((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, enabled: status } : b
        )
      );

      setFilteredData((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, enabled: status } : b
        )
      );
    };

    // Update UI instantly
    updateLocal(newStatus);

    try {
      // API call to update the status
      await updateBroadcastEnableStatus(id, newStatus);
      toast.success(newStatus ? "Broadcast Enabled" : "Broadcast Disabled");
    } catch (err) {
      toast.error("Failed to update");console.log("API CALL FUNCTION =>", updateBroadcastEnableStatus.toString());


      updateLocal(previousStatus); // revert on failure
    }
  };


  const column = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/communication/broadcast/broadcast-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/communication/broadcast/edit-broadcast/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
      sortable: true,
    },
    { name: "Title", selector: (row) => row.notice_title, sortable: true },
    { name: "Created By", selector: (row) => row.created_by, sortable: true },
    {
      name: "Expiry Date",
      selector: (row) => dateFormat(row.expiry_date),
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },

    {
      name: "Enable / Disable",
      cell: (row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={row.enabled}
            onChange={() => handleToggle(row.id)}
          />

          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-all"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-all"></div>
        </label>
      ),
      sortable: false,
    }
  ];

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    setFilteredData(
      broadcast.filter((item) =>
        item.notice_title.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <Communication />

        <div className="grid grid-cols-11 my-2 gap-2">
          <input
            type="text"
            placeholder="Search by title"
            className="border p-2 border-gray-300 rounded-lg col-span-10"
            value={searchText}
            onChange={handleSearch}
          />

          {user === "pms_admin" && (
            <Link
              to={"/communication/broadcast/create-broadcast"}
              style={{ background: themeColor }}
              className="rounded-md flex justify-center font-semibold items-center gap-2 p-2 text-white"
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10 h-60">
            <DNA visible={true} height={120} width={130} />
          </div>
        ) : (
          <Table columns={column} data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default Broadcast;









// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { ImEye } from "react-icons/im";
// import { Link } from "react-router-dom";
// import { getItemInLocalStorage } from "../../utils/localStorage";
// import { getBroadCast } from "../../api";
// import Table from "../../components/table/Table";
// import { useSelector } from "react-redux";
// import { BsEye } from "react-icons/bs";
// import Navbar from "../../components/Navbar";
// import Communication from "../Communication";
// import { BiEdit } from "react-icons/bi";

// const Broadcast = () => {
//   const [searchText, setSearchText] = useState("");
//   const [user, setUser] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [broadcast, setBroadcast] = useState([]);
//   const themeColor = "rgb(3 19 37)";
//   useEffect(() => {
//     const userType = getItemInLocalStorage("USERTYPE");
//     setUser(userType);
//     const fetchBroadCast = async () => {
//       const broadcastResp = await getBroadCast();
//       console.log("BroadCAst",broadcastResp)
//       const sortedBroadcast = broadcastResp.data.sort((a, b) => {
//         return new Date(b.created_at) - new Date(a.created_at);
//       });
//       setFilteredData(sortedBroadcast);
//       setBroadcast(sortedBroadcast);
//       console.log(broadcastResp);
//     };
//     fetchBroadCast();
//   }, []);
//   const dateFormat = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const column = [
//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="flex items-center gap-4">
//           <Link to={`/communication/broadcast/broadcast-details/${row.id}`}>
//             <BsEye size={15} />
//           </Link>
//           <Link to={`/communication/broadcast/edit-broadcast/${row.id}`}>
//             <BiEdit size={15} />
//           </Link>
//         </div>
//       ),
//       sortable: true,
//     },
//     { name: "Title", selector: (row) => row.notice_title, sortable: true },
//     // {
//     //   name: "Type",
//     //   selector: (row) => row.type,
//     //   sortable: true,
//     // },
//     // {
//     //   name: "Notice Description",
//     //   selector: (row) => row.notice_discription,
//     //   sortable: true,
//     // },
//     { name: "Created By", selector: (row) => row.created_by, sortable: true },
//     {
//       name: "Expiry Date",
//       selector: (row) => dateFormat(row.expiry_date),
//       sortable: true,
//     },
//     {
//       name: "Created On",
//       selector: (row) => dateFormat(row.created_at),
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//     },
    
//   ];

//   const handleSearch = (event) => {
//     const searchValue = event.target.value;
//     setSearchText(searchValue);
//     const filteredResults = broadcast.filter((item) =>
//       item.notice_title.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredData(filteredResults);
//   };

//   return (
//     <div className="flex">
//       <Navbar />
//       <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
//         <Communication />
//         <div className="grid grid-cols-11 my-2 gap-2">
//           {/* <div className="flex justify-between items-center sm:flex-row flex-col my-2"> */}
//           <input
//             type="text"
//             placeholder="Search by title"
//             className="border p-2 border-gray-300 rounded-lg col-span-10"
//             value={searchText}
//             onChange={handleSearch}
//           />
//           {user === "pms_admin" && (
//             <Link
//               to={"/communication/broadcast/create-broadcast"}
//               style={{ background: themeColor }}
//               className="rounded-md flex justify-center font-semibold items-center gap-2 p-2 text-white"
//             >
//               <IoAddCircleOutline size={20} />
//               Add
//             </Link>
//           )}
//         </div>
//         <Table columns={column} data={filteredData} />
//       </div>
//     </div>
//   );
// };

// export default Broadcast;
