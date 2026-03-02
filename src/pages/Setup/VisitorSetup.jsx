import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AddVisitorSetupModal from "../../containers/modals/AddVisitorSetupModal";
import EditVisitorSetupModal from "../../containers/modals/EditVisitorSetupModal";
import {
  getStaffCategory,
  deleteStaffCategory,
  getVisitorCategories,
  deleteVisitorCategory,
  getVisitorSubCategories,
  deleteVisitorSubCategory,
} from "../../api";
import toast from "react-hot-toast";
import VehicleParkingSetup from "./VehicleParkingSetupModal/VehicleParkingSetup";
import { domainPrefix } from "../../api";

function VisitorSetup() {
  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("visitor");
  const [categories, setCategories] = useState([]);
  const [visitorCategoriesList, setVisitorCategoriesList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [visitorSetupModal, setVisitorSetupModal] = useState(false);
  const [editVisitorSetupModal, setEditVisitorSetupModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [added, setAdded] = useState(false);

  /* ================= FETCH DATA ================= */


  const fetchData = async () => {
    try {
      let res;
      let data = [];

      if (page === "visitor") {
        res = await getStaffCategory();
        data =
          res?.data?.visitor_staff_categories ||
          res?.data?.staff_categories ||
          [];
      }

      if (page === "visitorCategories") {
        res = await getVisitorCategories(1, 1000);
        data = res?.data?.visitor_categories || res?.data || [];
      }
      if (page === "visitorSubCategories") {
        res = await getVisitorSubCategories(1, 1000);

        data =
          res?.data?.visitor_sub_categories ||
          res?.data?.data?.visitor_sub_categories ||
          res?.data ||
          [];

        const catRes = await getVisitorCategories(1, 1000);
        const categoryList =
          catRes?.data?.visitor_categories || catRes?.data || [];

        setVisitorCategoriesList(categoryList);
      }

      setCategories(data);
      setFilteredData(data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    if (page !== "vehicleParking") {
      fetchData();
    }
  }, [page, added]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      if (page === "visitor") {
        await deleteStaffCategory(id);
        toast.success("Staff Category Deleted");
      }

      if (page === "visitorCategories") {
        await deleteVisitorCategory(id);
        toast.success("Visitor Category Deleted");
      }

      if (page === "visitorSubCategories") {
        await deleteVisitorSubCategory(id);
        toast.success("Visitor Sub Category Deleted");
      }

      setAdded((prev) => !prev);
    } catch {
      toast.error("Delete Failed");
    }
  };
  const renderIcon = (row) => {
    if (!row.icon) {
      return <span className="text-gray-400 text-xs">No Icon</span>;
    }

    const iconSrc = `${domainPrefix}${row.icon}?t=${row.updated_at ? new Date(row.updated_at).getTime() : Date.now()}`;

    return (
      <img
        src={iconSrc}
        alt="icon"
        className="w-8 h-8 object-contain rounded"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    );
  };
  /* ================= SEARCH ================= */

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setFilteredData(categories);
    } else {
      const filtered = categories.filter((item) =>
        item.name?.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };


  const handleEdit = (row) => {
    setSelectedItem(row);
    setEditVisitorSetupModal(true);
  };


  const actionButtons = (row) => (
    <div className="flex gap-3">
      <button onClick={() => handleEdit(row)} style={{ color: themeColor }}>
        <BiEdit size={18} />
      </button>
      <button onClick={() => handleDelete(row.id)} className="text-red-500">
        <RiDeleteBin5Line size={18} />
      </button>
    </div>
  );


  const staffColumn = [
    { name: "Sr No", selector: (row, i) => i + 1, width: "200px" },
    { name: "Name", selector: (row) => row.name },
    { name: "Staff Count", selector: (row) => row.staffs_count },
    {
      name: "Action",
      selector: (row) => actionButtons(row),
    },
  ];

  const categoryColumn = [
    { name: "Sr No", selector: (row, i) => i + 1, width: "80px" },
    { name: "Name", selector: (row) => row.name },
    { name: "Code", selector: (row) => row.code },
    { name: "Icon", selector: (row) => renderIcon(row) },

    {
      name: "Action",
      selector: (row) => actionButtons(row),
    },
  ];

  const subCategoryColumn = [
    { name: "Sr No", selector: (row, i) => i + 1, width: "100px" },
    { name: "Sub Category", selector: (row) => row.name },
    {
      name: "Parent Category",
      selector: (row) => {
        if (row.visitor_category?.name) {
          return row.visitor_category.name;
        }
        if (row.visitor_category_id) {
          const matched = visitorCategoriesList.find(
            (cat) => cat.id === row.visitor_category_id
          );
          return matched?.name || "—";
        }

        return "—";
      },
    },
    {
      name: "Icon",
      selector: (row) => {
        if (!row.iconv2) return <span className="text-gray-400 text-xs">No Icon</span>;
        const subIconSrc = `${domainPrefix}${row.iconv2}?t=${row.updated_at ? new Date(row.updated_at).getTime() : Date.now()}`;
        return (
          <img
            src={subIconSrc}
            alt="icon"
            className="w-8 h-8 object-contain rounded"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        );
      },
    },
    {
      name: "Action",
      selector: (row) => actionButtons(row),
    },
  ];

  const getColumns = () => {
    if (page === "visitor") return staffColumn;
    if (page === "visitorCategories") return categoryColumn;
    if (page === "visitorSubCategories") return subCategoryColumn;
    return staffColumn;
  };

  const getTabLabel = (key) => {
    const labels = {
      visitor: "Staff Categories",
      vehicleParking: "Parking Slot",
      visitorCategories: "Visitor Categories",
      visitorSubCategories: "Visitor Sub Category",
    };
    return labels[key] || key;
  };

  const tabs = [
    "visitor",
    "vehicleParking",
    "visitorCategories",
    "visitorSubCategories",
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full mx-3">
        {/* Tabs */}
        <div className="flex gap-2 border-b p-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setPage(tab);
                setSearchText("");
              }}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${page === tab
                ? "text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              style={page === tab ? { background: themeColor } : {}}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Parking Slot */}
        {page === "vehicleParking" && <VehicleParkingSetup />}

        {/* Other Pages */}
        {page !== "vehicleParking" && (
          <>
            <div className="flex justify-between my-3">
              <input
                type="text"
                placeholder="Search Here..."
                value={searchText}
                onChange={handleSearch}
                className="border p-2 w-96 rounded"
              />
              <button
                style={{ background: themeColor }}
                className="text-white px-4 py-1 rounded flex items-center gap-2"
                onClick={() => setVisitorSetupModal(true)}
              >
                <IoAddCircleOutline size={20} /> Add
              </button>
            </div>

            <Table columns={getColumns()} data={filteredData} isPagination />
          </>
        )}

        {/* Add Modal */}
        {visitorSetupModal && (
          <AddVisitorSetupModal
            page={page}
            setAdded={setAdded}
            onclose={() => setVisitorSetupModal(false)}
          />
        )}

        {/* Edit Modal */}
        {editVisitorSetupModal && selectedItem && (
          <EditVisitorSetupModal
            page={page}
            item={selectedItem}
            setAdded={setAdded}
            onclose={() => {
              setEditVisitorSetupModal(false);
              setSelectedItem(null);
            }}
          />
        )}
      </div>
    </section>
  );
}

export default VisitorSetup;
