import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlusCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { postBusinesscard } from "../api";
// import { postBusinesscard } from "../../api"; // adjust path if needed

const AddBusinesscardModal = ({ onClose }) => {
  const themeColor = useSelector((state) => state.theme.color);

  const [formData, setFormData] = useState({
    full_name: "",
    profession: "",
    contact_number: "",
    email_id: "",
    website_url: "",
    address: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

const validateForm = () => {
  if (!formData.full_name.trim()) {
    toast.error("Full name is required");
    return false;
  }

  if (!formData.contact_number.trim()) {
    toast.error("Contact number is required");
    return false;
  }

  if (!/^\d{10}$/.test(formData.contact_number)) {
    toast.error("Contact number must be exactly 10 digits");
    return false;
  }

  if (!formData.email_id.trim()) {
    toast.error("Email is required");
    return false;
  }

  // ✅ Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email_id)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  return true;
};



  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("business_card[full_name]", formData.full_name);
    payload.append("business_card[profession]", formData.profession);
    payload.append("business_card[contact_number]", formData.contact_number);
    payload.append("business_card[email_id]", formData.email_id);
    payload.append("business_card[website_url]", formData.website_url);
    payload.append("business_card[address]", formData.address);

    if (formData.profile_image) {
      payload.append(
        "business_card[profile_image]",
        formData.profile_image
      );
    }

    try {
      await postBusinesscard(payload);
      toast.success("Business card added successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add business card");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%] md:w-[50%] p-4 flex flex-col rounded-xl hide-scrollbar">
        <h2 className="text-xl font-semibold mb-2 flex gap-2 justify-center items-center border-b">
          <FaPlusCircle /> Add Business card
        </h2>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Full name</label>
            <input
              type="text"
              name="full_name"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Full name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Profession/Designation</label>
            <input
              type="text"
              name="profession"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Profession/Designation"
              value={formData.profession}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Contact number</label>
            <input
              type="text"
              name="contact_number"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Contact number"
              value={formData.contact_number}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Email id</label>
            <input
              type="email"
              name="email_id"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Email id"
              value={formData.email_id}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Website</label>
            <input
              type="text"
              name="website_url"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Website url"
              value={formData.website_url}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Profile image</label>
            <input
              type="file"
              name="profile_image"
              className="border-2 rounded-md border-double border-gray-600 p-1"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col col-span-2 gap-1">
            <label className="font-medium">Address</label>
            <input
              type="text"
              name="address"
              className="border-b border-gray-600 p-1 focus:outline-none"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2 my-2">
          <button
            className="p-1 rounded-md border-2 border-red-500 text-red-500 flex gap-2 items-center font-medium px-4"
            onClick={onClose}
          >
            <MdClose /> Close
          </button>

          <button
            style={{ background: themeColor }}
            className="p-1 rounded-md text-white flex gap-2 items-center font-medium px-4"
            onClick={handleSave}
          >
            <FaCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusinesscardModal;
