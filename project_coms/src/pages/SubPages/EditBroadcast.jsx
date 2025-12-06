import React, { useEffect, useRef, useState } from "react";
import FileInput from "../../Buttons/FileInput";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import { editBroadcastDetails, getAssignedTo, getBroadcastDetails, postBroadCast } from "../../api";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
const EditBroadcast = () => {
  const [share, setShare] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const siteId = getItemInLocalStorage("SITEID");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    site_id: siteId,
    notice_title: "",
    notice_discription: "",
    expiry_date: "",
    user_ids: "",
    notice_image: [],
  });
  console.log(formData);
  const datePickerRef = useRef(null);
  const currentDate = new Date();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpiryDateChange = (date) => {
    setFormData({ ...formData, expiry_date: date });
  };
  const { id } = useParams();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };
    const fetchBroadcastDetails = async () => {
      try {
        const res = await getBroadcastDetails(id);
        const response = res.data;
        setFormData({
          ...formData,
          notice_title: response.notice_title,
          notice_discription: response.notice_discription,
          expiry_date: response.expiry_date
            ? new Date(response.expiry_date)
            : null,
          // user_ids:
          notice_image: response.notice_image,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBroadcastDetails();
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const userIdsString = selectedIds.join(",");
    setFormData({ ...formData, user_ids: userIdsString });
  };


  const handleEditBroadCast = async () => {
    if (formData.notice_title === "" || formData.expiry_date === "") {
      return toast.error("Please Enter Title & Expiry Date");
    }
    try {
      toast.loading("Updating Broadcast Please Wait!");
      const formDataSend = new FormData();

      formDataSend.append("notice[site_id", formData.site_id);
      formDataSend.append("notice[notice_title]", formData.notice_title);
      formDataSend.append(
        "notice[notice_discription]",
        formData.notice_discription
      );
      formDataSend.append("notice[expiry_date]", formData.expiry_date);
      formDataSend.append("notice[user_ids]", formData.user_ids);

      formData.notice_image.forEach((file) => {
        formDataSend.append("attachfiles[]", file);
      });

      const response = await editBroadcastDetails(id,formDataSend);
      toast.success("Broadcast Created Successfully");
      navigate("/communication/broadcast");
      console.log("Response:", response.data);
      toast.dismiss();
    } catch (error) {
      console.log(error);

      toast.dismiss();
    }
  };
  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="md:mx-20 my-5 mb-10 md:border md:p-2 md:px-2 rounded-lg w-full">
            <h2
              style={{ background: themeColor }}
              className="text-center text-xl font-bold p-2 mb-2  rounded-md text-white"
            >
              Edit Broadcast
            </h2>
            <h2 className="border-b text-xl border-gray-400 mb-6 font-medium">
              Communication Info
            </h2>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Title :
                </label>
                <input
                  type="text"
                  name="notice_title"
                  value={formData.notice_title}
                  onChange={handleChange}
                  placeholder="Enter Title"
                  id=""
                  className="border p-2 rounded-md border-gray-400 placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Description :
                </label>
                <textarea
                  name="notice_discription"
                  value={formData.notice_discription}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Description"
                  rows="3"
                  className="border p-2 rounded-md border-gray-400 placeholder:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 items-end gap-4">
                {/* <div className="flex justify-between  flex-col gap-2"> */}
                <div className="flex flex-col">
                  <p className="font-medium">Expire on</p>
                  <ReactDatePicker
                    selected={formData.expiry_date}
                    onChange={handleExpiryDateChange}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy h:mm aa"
                    placeholderText="Select Date & Time"
                    ref={datePickerRef}
                    // minDate={currentDate}
                    className="border border-gray-400 w-full p-2 rounded-md"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="" id="imp" />
                  <label htmlFor="imp">Mark as Important</label>
                </div>
              </div>

              <div className="">
                <h2 className="border-b t border-black my-5 text-lg font-semibold">
                  Share With
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-row gap-2 w-full font-semibold p-2 ">
                    <h2
                      className={`p-1 ${
                        share === "all" && "bg-black text-white"
                      } rounded-full px-6 cursor-pointer border-2 border-black`}
                      onClick={() => setShare("all")}
                    >
                      All
                    </h2>
                    <h2
                      className={`p-1 ${
                        share === "individual" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                      onClick={() => setShare("individual")}
                    >
                      Individuals
                    </h2>
                    <h2
                      className={`p-1 ${
                        share === "groups" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                      onClick={() => setShare("groups")}
                    >
                      Groups
                    </h2>
                  </div>
                  <div className="my-2 flex w-full">
                    {share === "individual" && (
                      // <Select
                      //   options={users}
                      //   placeholder="Select User"
                      //   value={formData.user_ids}

                      //   onChange={(selectedOption) =>
                      //     setFormData({ ...formData, user_ids: selectedOption })
                      //   }
                      //   isMulti
                      //   className="w-full"
                      // />
                      <Select
                        options={users}
                        closeMenuOnSelect={false}
                        placeholder="Select User"
                        value={users.filter((user) =>
                          formData.user_ids.includes(user.value)
                        )}
                        onChange={handleSelectChange}
                        isMulti
                        className="w-full"
                      />
                    )}
                    {share === "groups" && <p>list of groups</p>}
                  </div>
                </div>
                <div className="my-5">
                  <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
                    Attachments
                  </h2>

                  <FileInputBox
                    fieldName={"notice_image"}
                    isMulti={true}
                    handleChange={(files) =>
                      handleFileChange(files, "notice_image")
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10 my-5">
                <button
                  style={{ background: themeColor }}
                  onClick={handleEditBroadCast}
                  className="px-4 text-white p-2 rounded-md  flex items-center gap-2"
                >
                  <FaCheck /> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditBroadcast;
