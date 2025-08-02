import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Table from "../../components/table/Table";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import { toast } from "react-toastify";
import {
  domainPrefix,
  getStaff,
  getPendingStaff,
  putStaffApproval,
} from "../../api";
import { dateFormat } from "../../utils/dateUtils";
import image from "/profile.png";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [FilteredApproval, setFilteredApproval] = useState([]);
  const [approvalStatusChanged, setApprovalStatusChanged] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  // Approval pagination states
  const [approvalCurrentPage, setApprovalCurrentPage] = useState(1);
  const [approvalRowsPerPage, setApprovalRowsPerPage] = useState(10);
  const [approvalTotalCount, setApprovalTotalCount] = useState(0);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaff(rowsPerPage, currentPage);

        const staffArray = res.data.staffs || [];
        const totalCount = res.data.total_count || staffArray.length; // fallback just in case

        setStaffs(staffArray);
        setTotalCount(totalCount); //This is key for pagination display

        //Filtering logic
        const filteredResult = !searchText.trim()
          ? staffArray
          : staffArray.filter((item) => {
              const fullName =
                `${item.firstname} ${item.lastname}`.toLowerCase();
              return (
                fullName.includes(searchText.toLowerCase()) ||
                item.unit_name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                item.mobile_no?.toLowerCase().includes(searchText.toLowerCase())
              );
            });

        setFilteredStaff(filteredResult);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    fetchStaff();
  }, [currentPage, rowsPerPage, searchText]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    if (!searchValue.trim()) {
      setFilteredStaff(staffs);
    } else {
      const filteredResult = staffs.filter((item) => {
        const fullName = `${item.firstname} ${item.lastname}`.toLowerCase();
        return (
          fullName.includes(searchValue) ||
          item.unit_name?.toLowerCase().includes(searchValue) ||
          item.mobile_no?.toLowerCase().includes(searchValue)
        );
      });
      setFilteredStaff(filteredResult);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await getPendingStaff();
      const staffArray = res.data.staffs || res.data || [];
      setFilteredApproval(staffArray);
      setApprovalTotalCount(staffArray.length);
    } catch (err) {
      toast.error("Failed to fetch pending staff");
      console.error(err);
    }
  };

  useEffect(() => {
    if (page === "approval") {
      const timer = setTimeout(() => {
        fetchPending();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [page, approvalStatusChanged]);

  // Reset pagination when switching tabs
  useEffect(() => {
    setCurrentPage(1);
    setApprovalCurrentPage(1);
  }, [page]);

  useEffect(() => {
    if (currentPage > Math.ceil(totalCount / rowsPerPage)) {
      setCurrentPage(1); // reset to valid page
    }
  }, [totalCount, currentPage, rowsPerPage]);

  const handleApproval = async (staffId, decision) => {
    try {
      await putStaffApproval(staffId, {
        status_type: decision ? "Approved" : "Rejected",
      });
      toast.success(decision ? "Approved" : "Rejected");

      setApprovalStatusChanged((prev) => !prev); // triggers useEffect
    } catch (error) {
      toast.error("Approval failed");
      console.error(error);
    }
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/staff-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-staff/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Profile",
      selector: (row) =>
        row.profile_picture?.url ? (
          <img
            src={domainPrefix + row.profile_picture.url}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() =>
              window.open(domainPrefix + row.profile_picture.url, "_blank")
            }
          />
        ) : (
          <img src={image} alt="Default" className="w-10 h-10 rounded-full" />
        ),
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile_no,
      sortable: true,
    },
    {
      name: "Work Type",
      selector: (row) => row.work_type,
      sortable: true,
    },
    {
      name: "Vendor name",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => dateFormat(row.valid_from),
      sortable: true,
    },
    {
      name: "Till",
      selector: (row) => dateFormat(row.valid_till),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status ? (
          <p className="text-green-400">Active</p>
        ) : (
          <p className="text-red-400">Inactive</p>
        ),
      sortable: true,
    },
  ];

  const approvalColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/staff-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile_no,
      sortable: true,
    },
    {
      name: "Work Type",
      selector: (row) => row.work_type,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => dateFormat(row.valid_from),
      sortable: true,
    },
    {
      name: "Till",
      selector: (row) => dateFormat(row.valid_till),
      sortable: true,
    },
    {
      name: "Approval Status",
      selector: (row) => (
        <div className="flex gap-2">
          <button
            className="text-white bg-green-400 rounded-full p-1"
            onClick={() => handleApproval(row.id, true)}
          >
            <FaCheck size={20} />{" "}
          </button>
          <button
            className="text-white bg-red-400 rounded-full p-1"
            onClick={() => handleApproval(row.id, false)}
          >
            <IoClose size={20} />{" "}
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <Passes />
        <div className="flex w-full m-2">
          <div className="flex w-full md:flex-row flex-col space-x-4 border-b border-gray-400">
            <h2
              className={`p-2 px-4 ${
                page === "all"
                  ? "text-blue-500 font-medium  shadow-custom-all-sides"
                  : "text-black"
              } rounded-t-md cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
              onClick={() => setPage("all")}
            >
              All
            </h2>
            <h2
              className={`p-2 ${
                page === "approval"
                  ? "text-blue-500 font-medium shadow-custom-all-sides"
                  : "text-black"
              } rounded-t-md cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
              onClick={() => setPage("approval")}
            >
              Approvals
            </h2>
          </div>
        </div>

        {page === "all" && (
          <div className="flex md:flex-row flex-col gap-5 justify-between my-2">
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md w-full px-2 placeholder:text-sm"
              placeholder="Search by name, unit, mobile"
            />
            <span className="flex gap-4">
              <Link
                to={"/admin/passes/add-staff"}
                style={{ background: "rgb(3 19 37)" }}
                className="border-2 font-semibold transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              >
                <PiPlusCircle size={20} />
                Add
              </Link>
            </span>
          </div>
        )}

        {page === "all" && (
          <Table 
            columns={columns} 
            data={filteredStaff}
            pagination={true}
            paginationServer={true}
            paginationPerPage={rowsPerPage}
            paginationTotalRows={totalCount}
            currentPage={currentPage}
            onChangePage={setCurrentPage}
            onChangeRowsPerPage={(newPerPage) => {
              setRowsPerPage(newPerPage);
              setCurrentPage(1);
            }}
          />
        )}

        {page === "approval" && (
          <Table 
            columns={approvalColumn} 
            data={FilteredApproval}
            pagination={true}
            paginationServer={false}
            paginationPerPage={approvalRowsPerPage}
            paginationTotalRows={approvalTotalCount}
            currentPage={approvalCurrentPage}
            onChangePage={setApprovalCurrentPage}
            onChangeRowsPerPage={(newPerPage) => {
              setApprovalRowsPerPage(newPerPage);
              setApprovalCurrentPage(1);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Staff;
