import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import wave from "/wave.png";
import BirthdayWishModal from "../../containers/modals/BirthdayWishModal";
import AddBirthdayModal from "../../containers/modals/AddBirthdayModal";

const EmployeeBirthday = () => {
    const [birthdayModal, setBirthdayModal] = useState(false)
    const [addBirthday, setAddBirthday] = useState(false)
  document.title = `Birthday - My Citi Life`;

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="my-5 flex justify-between items-center">
          <h2 className="font-semibold text-xl">Birthday</h2>
          <button
            onClick={()=>setAddBirthday(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <div className="border border-gray-500 my-2" />
        <div className="w-56 rounded-md shadow-custom-all-sides h-80 mx-4 cursor-pointer" onClick={()=>setBirthdayModal(true)}>
          <img src={wave} alt="" className="w-56 h-40 rounded-t-md" />
          <div className="flex flex-col p-2 gap-1">
            <div className="grid grid-cols-2">
              <p className="font-medium">Name :</p>
              <p>Kunal</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">DOB :</p>
              <p>05/10/1998</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Mobile No. :</p>
              <p>9930337983</p>
            </div>
            <div className="flex justify-center items-end mt-5">
              <p>kunal.sah@vibecopilot.ai</p>
            </div>
          </div>
        </div>
      </div>
      {birthdayModal && <BirthdayWishModal email={"kunal.sah@vibecopilot.ai"} onclose={()=> setBirthdayModal(false)} />}
      {addBirthday && <AddBirthdayModal onclose={()=>setAddBirthday(false)} />}
    </section>
  );
};

export default EmployeeBirthday;
