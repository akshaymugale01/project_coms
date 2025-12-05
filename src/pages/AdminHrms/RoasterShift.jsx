import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import AddRosterShift from "./Modals/AddRosterShift";
import { useSelector } from "react-redux";
import { deleteRosterShift, getRosterShift } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { dateTimeFormat } from "../../utils/dateUtils";
import toast from "react-hot-toast";
import EditRosterShiftModal from "./Modals/EditRosterShiftModal";

const RosterShift = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [shiftId, setShiftId] = useState("");
  const columns = [
    {
      name: "Shift Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Starts From",
      selector: (row) => row.start_time,
      sortable: true,
    },
    {
      name: "Ends At",
      selector: (row) => row.end_time,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => dateTimeFormat(row.created_at),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => dateTimeFormat(row.updated_at),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button
            onClick={() => handleDeleteShift(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteShift = async (shiftId) => {
    try {
      await deleteRosterShift(shiftId);
      fetchRosterShifts();
      toast.success("Roaster shift deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModal = (id) => {
    setShiftId(id);
    setIsModalOpen1(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseEditModal = () => {
    setIsModalOpen1(false);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const fetchRosterShifts = async () => {
    try {
      const res = await getRosterShift(hrmsOrgId);
      setFilteredShifts(res);
      setShifts(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRosterShifts();
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredShifts(shifts);
    } else {
      const filteredResults = shifts.filter((shift) =>
        shift.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredShifts(filteredResults);
    }
  };
  return (
    <section className="flex ml-20">
      <AdminHRMS />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Search by shift name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={handleModalToggle}
            style={{ background: themeColor }}
            className="border-2 font-semibold  text-white duration-150 transition-all  p-2 rounded-md k cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={filteredShifts} isPagination={true} />
      </div>

      {isModalOpen && (
        <AddRosterShift
          handleCloseModal={handleCloseModal}
          fetchRosterShifts={fetchRosterShifts}
        />
      )}
      {isModalOpen1 && (
        <EditRosterShiftModal
          handleCloseModal={handleCloseEditModal}
          fetchRosterShifts={fetchRosterShifts}
          shiftId={shiftId}
        />
      )}
    </section>
  );
};

export default RosterShift;
