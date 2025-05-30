import React, { useEffect, useState } from "react";
import ModalWrapper from "../../../containers/modals/ModalWrapper";
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ColorPicker } from "antd";
import { editFitOutStatus, editHelpDeskStatusDetailsSetup, getFitOutStatus, getHelpDeskStatusDetailsSetup } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";

const   EditStatusModal = ({ onClose, id, setStatusAdded }) => {
  const token = getItemInLocalStorage("token")
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    status: "",
    fixedState: "",
    color: "",
    order: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchStatusDetails = async () => {
      try {
        // const token = getItemInLocalStorage("token")
        const detailsResp = await getFitOutStatus(id);
        const detail = detailsResp.data;
        setFormData({ 
          status: detail.name || "",
          color: detail.color_code || "",
          fixedState: detail.fixed_state || "",
          order: detail.position || "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load status data");
      }
    };
  
    if (id) {
      fetchStatusDetails();
    }
  }, [id]); 
  
  const siteID = getItemInLocalStorage("SITEID");
  const handleEditStatus = async()=>{
    const postStatus = new FormData();
    postStatus.append("fitout_status[of_phase]", "pms");
    postStatus.append("fitout_status[society_id]", siteID);
    postStatus.append("fitout_status[name]", formData.status);
    postStatus.append("fitout_status[fixed_state]", formData.fixedState);
    postStatus.append("fitout_status[color_code]", formData.color);
    postStatus.append("fitout_status[position]", formData.order);
    try {
      const resp = await editFitOutStatus(id, postStatus)
      
      setStatusAdded(true);
      toast.success("Status Updated Successfully");
      setFormData({
        ...formData,
        color: "",
        status: "",
        fixedState: "",
        order: "",
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setStatusAdded(false);
      }, 500);
    }
  }
  console.log(formData)
  return (
    <ModalWrapper onclose={onClose}>
      <div>
        <h2 className="font-medium text-xl flex items-center gap-4 border-b border-gray-300">
          <BiEditAlt /> Edit Status
        </h2>
        <div className="m-2">
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <input
              type="text"
              placeholder="Enter status"
              className="border p-2 rounded-md border-gray-300"
              value={formData.status}
              onChange={handleChange}
              name="status"
            />
            <select
              name="fixedState"
              onChange={handleChange}
              value={formData.fixedState}
              id=""
              className="border p-2 rounded-md border-gray-300"
            >
              <option value="">Select Fixed State</option>
              <option value="closed">Closed</option>
              <option value="open">Open</option>
              <option value="complete">Complete</option>
            </select>

            <ColorPicker
              value={formData.color}
              onChange={(color) =>
                setFormData({ ...formData, color: color.toHexString() })
              }
              size="large"
            />

            <input
              type="number"
              placeholder="Enter order"
              className="border p-2 rounded-md border-gray-300"
              value={formData.order}
              onChange={handleChange}
              name="order"
            />
          </div>
          <button
            className=" font-medium hover:text-white transition-all w-full p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
            style={{ background: "rgb(3 19 37)" }}
            onClick={handleEditStatus}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditStatusModal;
