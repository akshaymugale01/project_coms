import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import wave from "/man.jpg";
import BirthdayWishModal from "../containers/modals/BirthdayWishModal";
import AddBirthdayModal from "../containers/modals/AddBirthdayModal";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { getItemInLocalStorage } from "../utils/localStorage";
import { API_URL, deleteVibeUserBirthday, getVibeUserBirthday } from "../api";
import profile from "/profile.png";
import { Modal } from "antd";
import toast from "react-hot-toast";
const Birthday = () => {
  const [birthdayModal, setBirthdayModal] = useState(false);
  const [addBirthday, setAddBirthday] = useState(false);
  const [birthdayList, setBirthdayList] = useState([]);
  document.title = `Birthday - Vibe Connect`;
  const themeColor = useSelector((state) => state.theme.color);
  const [isLoadingBirthdayList, setIsLoadingBirthdayList] = useState(true);
  useEffect(() => {
    get_user_Birthday();
  }, []);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const get_user_Birthday = async () => {
    try {
      const response = await getVibeUserBirthday(user_id);
      if (response.success === true) {
        console.log(response);
        setBirthdayList(response.data);
        console.log(API_URL + response.data[0].profile_picture);
        setIsLoadingBirthdayList(false);
      }
    } catch (error) {
      setIsLoadingBirthdayList(false);
      console.error("Error:", error);
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    return `${year} ${month} ${day}`;
  };
  const [deleted, setDeleted] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idForDelete, setidForDelete] = useState("");
  function handleDeleteClick(id) {
    setidForDelete(id);
    console.log("qwerty");
    setIsModalDeleteOpen(true);
  }

  function confirmDelete() {
    setIsModalDeleteOpen(false);
    confirmDeleteBirthday(idForDelete);
    console.log("dfg")
  }
  function closeDeleteModal() {
    setIsModalDeleteOpen(false);
  }
  const confirmDeleteBirthday = async(BdId) => {
    console.log(BdId)
    try {
      const res = await deleteVibeUserBirthday(user_id, BdId);

      toast.success("Birthday deleted successfully.");
      get_user_Birthday();
    } catch (error) {
      console.error("Failed to delete Birthday.");
    }
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="my-5 flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Birthday</h2>
          <button
            onClick={() => setAddBirthday(true)}
            style={{ background: themeColor }}
            className="border-2 font-semibold text-white duration-150 transition-all  p-1 px-4 rounded-md  cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <div className="border border-gray-300 my-2" />
        <div className="flex gap-4 flex-wrap">
          {isLoadingBirthdayList ? (
            <div className="m-4 w-full flex justify-center">
              <span style={{ opacity: 0.6 }} className="text-center">
                Please wait...
              </span>
            </div>
          ) : birthdayList.length != 0 ? (
            birthdayList.map((birthday) => (
             
              <>
                <div
                  style={{ background: themeColor }}
                  className="  rounded-lg p-2 min-w-[425px] max-w-[425px]"
                  key={birthday.email}
                >
                  <div className="rounded-lg flex w-full">
                    <div className="flex-shrink-0">
                      <img
                        className="w-40 h-40 rounded-lg"
                        src={
                          birthday.profile_picture
                            ? `${API_URL}${birthday.profile_picture}`
                            : profile
                        }
                        alt={birthday.firstname}
                        style={{ color: "#fff" }}
                      />
                    </div>
                    <div className="flex flex-col justify-between w-full ml-4">
                      <div
                        className="flex flex-col gap-2 mt-2"
                        style={{ color: "white" }}
                      >
                        <div>
                          <span
                            style={{ textTransform: "uppercase" }}
                            className="font-customFont"
                          >
                            <b>
                              {birthday.firstname} {birthday.lastname}
                            </b>
                          </span>
                        </div>
                        <span>{birthday.phone_no}</span>
                        <div className="text-wrap">
                          <span>{birthday.email}</span>
                        </div>
                      </div>
                      <span className="flex justify-between items-center">
                        <span className="text-white font-medium">
                          {formatDate(birthday.date_of_birth)}
                        </span>
                        <FaTrashAlt
                          style={{ color: "#fff" }}
                          className="text-red-400"
                          onClick={(e) => {
                            // e.stopPropagation();
                            handleDeleteClick(birthday.id);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <Modal
                  isOpen={isModalDeleteOpen}
                  onRequestClose={closeDeleteModal}
                  contentLabel="Confirm Logout"
                  // style={modalStyleTemplateMeet}
                >
                  <div>

                 
                  <h4>Do you want to Delete?</h4>
                  <hr style={{ borderColor: "#fff" }} />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      style={{ color: "#fff" }}
                      onClick={() => confirmDelete(birthday.id)}
                      className="pr-3 pl-3 p-2 mr-2"
                    >
                      Yes
                    </button>
                    <button
                      style={{ color: "#fff" }}
                      onClick={closeDeleteModal}
                      className="pr-3 pl-3 p-2"
                    >
                      No
                    </button>
                  </div>
                  </div>
                </Modal>
                {/* update bday */}
                {/* <Modal
                  isOpen={isModalUpdateOpen}
                  onRequestClose={closeUpdateModal}
                  contentLabel="Schedule Modal"
                  style={customStylesSchedule}
                >
                  <button
                    className="close mb-4 ml-2"
                    onClick={closeUpdateModal}
                  >
                    &times;
                  </button>
                  <div class="pdEmply-main row">
                    <div>
                      <div style={{ display: "flex" }}>
                        <div class="pdEmply-left col-md-4">
                          <div
                            style={{ display: "block", justifyContent: "end" }}
                          >
                            <img
                              id="selectedEmpImage"
                              src={profileimg}
                              alt=""
                              style={{ padding: "20px" }}
                            />
                            <input
                              style={{
                                padding: "15px",
                                fontSize: "12px",
                                width: "100%",
                              }}
                              type="file"
                              onChange={onChangeProfileimg}
                              accept="image/*"
                            ></input>
                          </div>
                        </div>
                        <div class="pdEmply-right col-md-8 mt-3">
                          <div
                            class="col-md-6 "
                            style={{ marginBottom: "0rem" }}
                          >
                            <label
                              style={{
                                marginBottom: "0rem",
                                fontWeight: "normal",
                              }}
                            >
                              FIRST NAME
                            </label>
                            <label
                              style={{ color: "#f44336", marginBottom: "0rem" }}
                            >
                              {" "}
                              *{" "}
                            </label>
                            <input
                              style={{ backgroundColor: "#204660" }}
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                              type="text"
                            />
                          </div>
                          <div class="col-md-6">
                            <label
                              style={{
                                marginBottom: "0rem",
                                fontWeight: "normal",
                              }}
                            >
                              {" "}
                              LAST NAME
                            </label>
                            <label
                              style={{ color: "#f44336", marginBottom: "0rem" }}
                            >
                              {" "}
                              *{" "}
                            </label>
                            <input
                              style={{ backgroundColor: "#204660" }}
                              type="text"
                              value={secondname}
                              onChange={(e) => setSecondName(e.target.value)}
                            />
                          </div>
                          <div class="col-md-6 ">
                            <label
                              style={{
                                marginBottom: "0rem",
                                marginTop: "0.5rem",
                                fontWeight: "normal",
                              }}
                            >
                              EMAIL
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div class="col-md-6">
                            <label
                              style={{
                                marginBottom: "0rem",
                                marginTop: "0.5rem",
                                fontWeight: "normal",
                              }}
                            >
                              DATE OF BIRTH
                            </label>
                            <input
                              type="date"
                              value={dateofbirth}
                              onChange={(e) => setDateofBirth(e.target.value)}
                            />
                          </div>
                          <div class="col-md-6">
                            <label
                              style={{
                                marginBottom: "0rem",
                                marginTop: "0.5rem",
                                fontWeight: "normal",
                              }}
                            >
                              CONTACT NO.
                            </label>

                            <input
                              style={{ backgroundColor: "#204660" }}
                              type="tel"
                              value={contactno}
                              onChange={handleContactChange}
                            />
                          </div>
                          <div class="col-md-6"></div>
                          <div
                            class="col-md-4 mb-3 "
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <ToastContainer limit={1} />
                            <button
                              class="nextbtn2"
                              type="submit"
                              id="confirmEmployeeDetails"
                              onClick={EditBirthday}
                            >
                              {loading ? (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                  }}
                                >
                                  <ThreeDots
                                    color="#fff"
                                    height={25}
                                    width={50}
                                  />
                                </div>
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal> */}
              </>
            ))
          ) : (
           
                <p className="text-center w-full">
                  No Birthday
                  <br />
                </p>
           
          )}
        </div>
      </div>
      {isModalDeleteOpen && (
        <BirthdayWishModal
         confirmDelete={confirmDelete}
          onclose={closeDeleteModal}
        />
      )}
      {addBirthday && (
        <AddBirthdayModal
          onclose={() => setAddBirthday(false)}
          get_user_Birthday={get_user_Birthday}
        />
      )}
    </section>
  );
};

export default Birthday;
