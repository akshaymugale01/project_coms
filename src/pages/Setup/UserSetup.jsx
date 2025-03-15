import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { getSetupUsers, sendMailToUsers } from "../../api";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";

const UserSetup = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const setupUsers = await getSetupUsers();
        setUsers(setupUsers.data);
        setFilteredData(setupUsers.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    
    if (searchValue.trim() === "") {
      setFilteredData(users);
    } else {
      const filteredResults = users.filter(
        (item) =>
          (item.firstname && item.firstname.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.lastname && item.lastname.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.unit_name && item.unit_name.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredData(filteredResults);
    }
  };

  const totalUsers = users.length;
  const appDownloadedCount = users.filter(user => user.is_downloaded).length;
  const approvedUsers = users.filter(user => user.status === "approved").length;
  const pendingUsers = users.filter(user => user.status === "pending").length;

  const userColumn = [
    {
      name: "View",
      cell: (row) => (
        <Link to={`/setup/users-details/${row.id}`}>
          <BsEye size={15} />
        </Link>
      ),
    },
    { name: "First Name", selector: (row) => row.firstname, sortable: true },
    { name: "Last Name", selector: (row) => row.lastname, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile", selector: (row) => row.mobile || "NA", sortable: true },
    { name: "App Downloaded", selector: (row) => row.is_downloaded ? "Yes" : "No", sortable: true },
    { name: "Unit", selector: (row) => row.unit?.name || "NA", sortable: true },
    { 
      name: "Type", 
      selector: (row) => row.user_type === "pms_admin" ? "Admin" :
        row.user_type === "pms_occupant_admin" ? "Unit Owner" :
        row.user_type === "pms_technician" ? "Technician" : row.user_sites[0].ownership || "NA",
      sortable: true,
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col gap-4 overflow-hidden mb-5">
        <div className="mt-5 flex md:flex-row flex-col justify-between md:items-center gap-4">
          <input
            type="text"
            placeholder="Search By Name or Unit"
            className="p-2 md:w-96 border border-gray-300 rounded-md placeholder:text-sm outline-none"
            value={searchText}
            onChange={handleSearch}
          />
          <Link
            to="/setup/users-setup/add-new-user"
            style={{ background: "rgb(19 27 32)" }}
            className="font-semibold p-1 px-4 rounded-md text-white flex items-center gap-2"
          >
            <PiPlusCircle size={20} /> Add User
          </Link>
        </div>
        
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
            <h2 className="text-lg font-semibold">App Downloaded</h2>
            <p className="text-xl font-bold">{appDownloadedCount}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
            <h2 className="text-lg font-semibold">Approved Users</h2>
            <p className="text-xl font-bold">{approvedUsers}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
            <h2 className="text-lg font-semibold">Pending Users</h2>
            <p className="text-xl font-bold">{pendingUsers}</p>
          </div>
        </div>
        
        <Table columns={userColumn} data={filteredData} />
      </div>
    </section>
  );
};

export default UserSetup;
