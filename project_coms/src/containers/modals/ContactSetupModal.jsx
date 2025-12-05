import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  editGenericCategoryDetails,
  getGenericCategoryDetails,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const ContactSetupModal = ({ onClose, id }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const catResp = await getGenericCategoryDetails(id);
        console.log(catResp);
        setFormData({ ...formData, name: catResp.data.name });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  const themeColor = useSelector((state) => state.theme.color);
  const companyID = getItemInLocalStorage("COMPANYID");
  const siteId = getItemInLocalStorage("SITEID");

  const handleEditCategory = async () => {
    const editData = new FormData();
    editData.append("generic_info[name]", formData.name);
    editData.append("generic_info[company_id]", companyID);
    editData.append("generic_info[site_id]", siteId);
    editData.append("generic_info[info_type]", "contact");
    try {
      const res = await editGenericCategoryDetails(id, editData);
      onClose();
      toast.success("Category Edited Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalWrapper onclose={onClose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold flex items-center gap-2 text-center ">
          <BiEdit /> Edit Category{" "}
        </h1>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="col-span-2 flex flex-col gap-2">
            <p className="font-medium">Category : </p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              id=""
              className="border border-black rounded-md p-1"
            />
          </div>
        </div>
        <div className="flex w-full items-end">
          <button
            className="p-1 px-4 w-full rounded-md text-white"
            style={{ background: themeColor }}
            onClick={handleEditCategory}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ContactSetupModal;
