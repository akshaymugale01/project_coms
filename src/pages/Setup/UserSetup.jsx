import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { getSetupUsers, getUserCount } from "../../api";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { getItemInLocalStorage } from "../../utils/localStorage";
import { BiEdit } from "react-icons/bi";
import { DNA } from "react-loader-spinner";

const UserSetup = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  // const themeColor = useSelector((state) => state.theme.color);

  // console.log("akshay", akshay);
  // const users = akshay.users || [];
  // console.log("Users:", users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Start loading
        const setupUsers = await getSetupUsers();
        const userCount = await getUserCount();
        setCount(userCount.data);
        const data = setupUsers.data || [];
        setUsers(data);

        setFilteredData(setupUsers.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchUsers();
  }, []);

  console.log("count", count);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(users);
    } else {
      const searchWords = searchValue.toLowerCase().split(" ").filter(Boolean);
      const filteredResults = users.filter((item) => {
        // Combine searchable fields into one string
        const searchable = [
          item.firstname,
          item.lastname,
          // item.unit_name,
          item.email,
          item.mobile,
          item.user_type,
          item.unit?.name || "",
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        // Check if every search word is present in the combined string
        return searchWords.every((word) => searchable.includes(word));
      });
      setFilteredData(filteredResults);
    }
  };

  // const totalUsers = users.length;
  // const appDownloadedCount = users.filter((user) => user.is_downloaded).length;
  // const appDownloadTenant = users.filter(
  //   (user) =>
  //     user.is_downloaded &&
  //     user.user_sites.some((site) => site.ownership === "tenant")
  // ).length;
  // const appDownloadOwner = users.filter(
  //   (user) =>
  //     user.is_downloaded &&
  //     user.user_sites.some((site) => site.ownership === "owner")
  // ).length;
  // const approvedUsers = users.filter(
  //   (user) => user.status === "approved"
  // ).length;
  // const pendingUsers = users.filter((user) => user.status === "pending").length;

  const userColumn = [
    {
      name: "View",
      cell: (row) => {
        console.log("row", row);
        return (
          <div className="flex items-center">
            <Link to={`/setup/users-details/${row.id}`}>
              <BsEye size={15} />
            </Link>
            <Link to={`/setup/users-edit-page/${row.id}`} className="ml-2">
              <BiEdit size={15} />
            </Link>
          </div>
        );
      },
    },
    { name: "First Name", selector: (row) => row.firstname, sortable: true },
    { name: "Last Name", selector: (row) => row.lastname, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile", selector: (row) => row.mobile || "NA", sortable: true },
    {
      name: "App Downloaded",
      selector: (row) => (row.is_downloaded ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Building-Floor-Unit",
      selector: (row) => row.full_unit_name,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) => {
        // Determine base user type
        let userType = "";
        if (row.user_type === "pms_admin") {
          userType = "Admin";
        } else if (row.user_type === "pms_occupant_admin") {
          userType = "Occupant Admin";
        } else if (row.user_type === "pms_technician") {
          userType = "Technician";
        } else if (row.user_type === "pms_occupant") {
          userType = "Occupant";
        } else if (row.user_type === "security_guard") {
          userType = "Security Guard";
        } else if (row.user_type === "employee") {
          userType = "Employee";
        } else if (row.user_type === "unit_resident" || row.user_type === "user") {
          userType = "Resident";
        } else if (row.user_type === "unit_owner") {
          userType = "Resident";
        } else {
          userType = "User";
        }

        // Get ownership info from user_sites if available
        const ownership = row.user_sites?.[0]?.ownership;
        const ownershipType = row.user_sites?.[0]?.ownership_type;

        // Add ownership suffix for residents
        if (userType === "Resident" || userType === "Occupant" || userType === "Occupant Admin") {
          if (ownership === "owner") {
            userType += ` - Owner${ownershipType === "primary" ? " (Primary)" : ownershipType === "secondary" ? " (Secondary)" : ""}`;
          } else if (ownership === "tenant") {
            userType += " - Tenant";
          }
        }

        return userType;
      },
      sortable: true,
      wrap: true,
    },
  ];

  console.log("Filtered Data:", users);

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col gap-4 overflow-hidden mb-5">
        <div className="mt-5 flex md:flex-row flex-col justify-between md:items-center gap-4">
          <input
            type="text"
            placeholder="Search Anything (Name, Email and Mobile) along with Spaces"
            className="p-2 w-full border border-gray-300 rounded-md placeholder:text-sm outline-none"
            value={searchText}
            onChange={handleSearch}
          />
          <Link
            to="/setup/users-setup/add-new-user"
            style={{ background: "rgb(19 27 32)" }}
            className="font-semibold p-2 px-4 rounded-md text-white flex items-center gap-2"
          >
            <PiPlusCircle size={20} /> Add
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-80 mt-10">
            <DNA
              visible={true}
              height={110}
              width={120}
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-xl font-bold">{count.total_user}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Total App Downloads</h2>
                <p className="text-xl font-bold">{count.total_downloads}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">
                  Total Users Device Register
                </h2>
                <p className="text-xl font-bold">
                  {count.total_user_downloads}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Tenant Register </h2>
                <p className="text-xl font-bold">
                  {count.total_owner_downloads}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Owner Register </h2>
                <p className="text-xl font-bold">
                  {count.total_tenant_downloads}
                </p>
              </div>
              {/* <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Approved Users</h2>
                <p className="text-xl font-bold">{approvedUsers}</p>
              </div> */}
              {/* <div className="bg-gray-100 p-4 rounded-md text-center shadow-md">
                <h2 className="text-lg font-semibold">Pending Users</h2>
                <p className="text-xl font-bold">{pendingUsers}</p>
              </div> */}
            </div>
            <Table columns={userColumn} data={filteredData}/>
          </>
        )}
      </div>
    </section>
  );
};

export default UserSetup;
