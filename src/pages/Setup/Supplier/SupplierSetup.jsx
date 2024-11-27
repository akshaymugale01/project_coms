import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Table from "../../../components/table/Table";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import {
  deleteVendorCategory,
  deleteVendorType,
  getVendorCategory,
  getVendorsType,
} from "../../../api";
import { useSelector } from "react-redux";
import SupplierModal from "./SupplierModal";
import EditSupplierModal from "./EditSupplierModal";
import toast from "react-hot-toast";

const SupplierSetup = () => {
  const [page, setPage] = useState("type");
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [added, setAdded] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [catId, setCatId] = useState("");
  const [typeId, setTypeId] = useState("");

  const typeColumn = [
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditTypeModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button onClick={() => handleDeleteType(row.id)}>
            <BiTrash size={15} />
          </button>
        </div>
      ),
    },
  ];
  const catColumn = [
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "category",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditCategoryModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button onClick={() => handleDeleteCategory(row.id)}>
            <BiTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const fetchType = async () => {
    try {
      const typeRes = await getVendorsType();
      setTypes(typeRes.data.suppliers);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const catResp = await getVendorCategory();
      setCategories(catResp.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchType();
    fetchCategory();
  }, [added]);
  const themeColor = useSelector((state) => state.theme.color);
  const handleEditTypeModal = (id) => {
    setTypeId(id);
    setEditModal(true);
  };
  const handleEditCategoryModal = (id) => {
    setCatId(id);
    setEditModal(true);
  };
  const handleDeleteType = async (id) => {
    try {
      const deleteRes = await deleteVendorType(id);
      // if (deleteRes.success) {
      //   toast.success("Supplier Type Delete Successfully");
      //   setAdded(true)
      // }
      toast.success("Supplier Type Delete Successfully");
        setAdded(true)
    } catch (error) {
      console.log(error);
    }
    finally{
      setTimeout(() => {
        setAdded(false)
      }, 500);
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      const deleteRes = await deleteVendorCategory(id);
      // if (deleteRes.success) {
        toast.success("Supplier Category Delete Successfully");
        setAdded(true)
      // }
    } catch (error) {
      console.log(error);
    }
    finally{
      setTimeout(() => {
        setAdded(false)
      }, 500);
    }
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 mb-5 flex-col overflow-hidden">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "type" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("type")}
          >
            Supplier Type
          </h2>
          <h2
            className={`p-1 ${
              page === "category" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("category")}
          >
            Supplier Category
          </h2>
        </div>
        <div className="mt-5 flex justify-between items-center gap-4 my-2">
          <div className="flex gap-2">
            <Link className="font-medium" to={"/setup"}>
              Setup
            </Link>
            <p className="font-medium">{">"}</p>
            <Link className="font-medium" to={"/setup/supplier-setup"}>
              Supplier Setup
            </Link>
          </div>

          {page === "type" ? (
            <button
              onClick={() => setAddModal(true)}
              style={{ background: themeColor }}
              className="border-2 font-semibold   duration-300 ease-in-out transition-all p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add Type
            </button>
          ) : (
            <button
              onClick={() => setAddModal(true)}
              style={{ background: themeColor }}
              className="border-2 font-semibold   duration-300 ease-in-out transition-all  p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add Category
            </button>
          )}
        </div>

        {page === "type" && <Table columns={typeColumn} data={types} />}
        {page === "category" && <Table columns={catColumn} data={categories} />}
      </div>
      {addModal && (
        <SupplierModal
          page={page}
          onclose={() => setAddModal(false)}
          setAdded={setAdded}
        />
      )}
      {editModal && (
        <EditSupplierModal
          page={page}
          onclose={() => setEditModal(false)}
          setAdded={setAdded}
          catId={catId}
          typeId={typeId}
        />
      )}
    </section>
  );
};

export default SupplierSetup;