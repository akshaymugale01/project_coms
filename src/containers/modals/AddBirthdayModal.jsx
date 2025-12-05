import React, { useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import image from "/profile.png";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { createVibeUserBirthday } from "../../api";
import toast from "react-hot-toast";
const AddBirthdayModal = ({ onclose, get_user_Birthday }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [secondname, setSecondName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [dateofbirth, setDateofBirth] = useState("");
  // const handleImageChange = (event) => {
  //   setImageFile(event.target.files[0]);
  // };
  const handleImageChange = (event) => {
    const profileimg = event.target.files[0];

    setImageFile(profileimg);
    // alert(profileimg);

    const formData = new FormData();
    formData.append("profileImage", profileimg);
  };
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const themeColor = useSelector((state) => state.theme.color);
  const [validEmail, setValidEmail] = useState(true);
  const updateEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(value);
    setValidEmail(isValidEmail);
  };
  const handleContactChange = (e) => {
    const value = e.target.value;

    // Only update state if the value has 10 or fewer characters and is a number
    if (value.length <= 10 && (value === "" || /^\d+$/.test(value))) {
      setContactNo(value);
    }
  };

  const user_id = getItemInLocalStorage("VIBEUSERID");
  const Create_Birthday = async () => {
    if (!firstname.trim() || !secondname.trim() || !dateofbirth) {
      toast.warning("Please fill in all required fields .");
      return;
    }

    if (email && !validEmail) {
      toast.warning("Provide a valid email.");
      return;
    }

    const formData = new FormData();
    var trimmedFirstname = firstname.trim();
    formData.append("firstname", trimmedFirstname);
    formData.append("lastname", secondname);
    formData.append("date_of_birth", dateofbirth);
    formData.append("email", email);
    formData.append("phone_no", contactno);
    formData.append("profile_picture", imageFile);
    formData.append("user_id", user_id);

    try {
      const res = await createVibeUserBirthday(formData);
      if (res.success) {
        setFirstName("");
        setSecondName("");
        setDateofBirth("");
        setEmail("");
        setContactNo("");

        onclose();
        get_user_Birthday();
        toast.success("Birthday created successfully!");
      }
    } catch (error) {
      toast.error("Please Check Your Internet , Try again ");
    }
  };
  return (
    <ModalWrapper onclose={onclose} style={{ background: themeColor }}>
      <div className=" z-10">
        <h1 className="font-semibold border-b border-gray-300 text-xl text-white">
          Create Birthday
        </h1>
        <div className="flex gap-4">
          <div className="flex  justify-center">
            <div
              onClick={handleImageClick}
              className="cursor-pointer flex justify-center flex-col items-center "
            >
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded"
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                />
              ) : (
                <img
                  src={image}
                  alt="Default"
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                />
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <h2 className="font-medium text-white">Choose Image</h2>
            </div>
          </div>
          <div className="flex flex-col">
            <form action="" className="grid grid-cols-2 mt-2 gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-sm font-bold text-white">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-sm font-bold text-white">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={secondname}
                  onChange={(e) => setSecondName(e.target.value)}
                  placeholder="Enter Last Name"
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-bold text-white">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  value={dateofbirth}
                  onChange={(e) => setDateofBirth(e.target.value)}
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-bold text-white">
                  Contact No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Contact Number"
                  className="border rounded-md border-gray-500 p-1 px-2"
                  value={contactno}
                  onChange={handleContactChange}
                />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label htmlFor="" className="text-sm font-bold text-white">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={updateEmail}
                  placeholder="Enter Email"
                  className="border rounded-md border-gray-500 p-1 px-2"
                  required
                />
              </div>
            </form>
            <button
              onClick={Create_Birthday}
              className="bg-black p-2 px-4 text-white rounded-md my-5"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddBirthdayModal;
