import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { RiDeleteBinLine } from "react-icons/ri";
import PropertyDamageCategorySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/PropertyCategorySetupModal";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { getIncidentTags, postIncidentTags } from "../../../api";
import toast from "react-hot-toast";

const PropertyDamageCategorySetup = () => {
  const [modal, showModal] = useState(false);
  const column = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "action",

      cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => showModal(true)} className="text-blue-500">
            <BiEdit size={15} />
          </button>

          <button className="text-red-500">
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const [addDamage, setAddDamage] = useState(false);
  const [damageCategory, setDamageCategory] = useState("");
  const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddDamage = async () => {
    const payload = {
      name: damageCategory,
      active: true,
      // "parent_id": null,
      tag_type: "IncidentDamageCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Property Damage Category Created successfully!");
      fetchIncidentDamageCategory();
      setDamageCategory("");
      setAddDamage(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const fetchIncidentDamageCategory = async () => {
    try {
      const res = await getIncidentTags("IncidentDamageCategory");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIncidentDamageCategory();
  }, []);
  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-end">
          {addDamage && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Category"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={damageCategory}
                onChange={(e) => setDamageCategory(e.target.value)}
              />
              <button
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddDamage}
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddDamage(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
          {!addDamage && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddDamage(true)}
            >
              <PiPlusCircle /> Add
            </button>
          )}
        </div>
        <div>
          <Table columns={column} data={categories} isPagination={true} />
        </div>
      </div>
      {modal && (
        <PropertyDamageCategorySetupModal onclose={() => showModal(false)} />
      )}
    </section>
  );
};

export default PropertyDamageCategorySetup;