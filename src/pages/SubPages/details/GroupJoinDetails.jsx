import React, { useState, useRef, useEffect } from "react";
import interview from "/01.jpg";
import Navbar from "../../../components/Navbar";
import pic1 from "/profile1.jpg";
import pic2 from "/profile2.jpg";
import pic3 from "/profile3.jpg";
import pic4 from "/profile4.jpg";
import owners from "/owners.jpg";
import { BsThreeDots } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { PiPlus, PiPlusCircleBold } from "react-icons/pi";
function GroupJoinDetails() {
  const [page, setPage] = useState("empolyeeEvent");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center my-2">
          <div className="border-2 border-grey-200 rounded-md w-full">
            <div className="md:grid grid-cols my-5 ">
              <div className="flex flex-col">
                <div className="flex md:flex-row flex-col justify-between gap-y-3 mx-5">
                  <div className="flex gap-2">
                    <img
                      src={owners}
                      className="rounded-full w-28 h-28 object-cover"
                      alt="forum-profile"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">Owners</h2>
                      <p className="font-normal ">50 Members</p>
                      <p className="font-normal text-gray-500">
                        The Owners Group is a dedicated community for all
                        property owners within the building or complex. This
                        group serves as a platform to discuss ownership matters,
                        share important updates, address maintenance issues, and
                        collaborate on decisions that impact our shared spaces.
                      </p>
                    </div>
                  </div>

                  <div className="w-72">
                    <button className="border-2 border-black p-1 px-3 rounded-md w-full flex items-center gap-2">
                      <PiPlusCircleBold /> Add Member
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center my-8 mx-5">
                  <div className="relative">
                    <img src={pic1} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-4">
                    <img src={pic2} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-8">
                    <img src={pic3} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-12">
                    <img src={pic4} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="mt-2 md:relative right-10">
                    <h2 className="font-semibold md:inline-block block ">
                      Carolyn Ortiz, Frances Guerrero, and 20 joined group
                    </h2>
                  </div>
                </div>
                <div className="border-t border-gray-400 ">
                  {/* <div className="mt-5 flex flex-wrap justify-around">
                    <h2
                      className={`p-1 ${
                        page === "empolyeePolls" &&
                        "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("empolyeePolls")}
                    >
                      Discussion
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "xyz" &&
                        "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("xyz")}
                    >
                      Post
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "abc" &&
                        "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("abc")}
                    >
                      People
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "qrs" &&
                        "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("qrs")}
                    >
                      About
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "Media" &&
                        "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("Media")}
                    >
                      Media
                    </h2>
                  </div> */}
                  <div className="p-2">
                    <h2 className="font-medium border-b">Members List</h2>
                    <div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default GroupJoinDetails;
