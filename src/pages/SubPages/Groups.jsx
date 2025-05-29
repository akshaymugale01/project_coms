import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import interview from "/01.jpg";
import pic1 from "/profile1.jpg";
import pic2 from "/profile2.jpg";
import pic3 from "/profile3.jpg";
import pic4 from "/profile4.jpg";
import building from "/building.jpg";
import owners from "/owners.jpg";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import CreateGroup from "./CreateGroup";
import { PiPlusCircle } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { getGroups , domainPrefix } from "../../api";
// import groupIcon from "/groupicon.jpg";
import { dateFormatSTD } from "../../utils/dateUtils";
function Groups() {
  const themeColor = useSelector((state) => state.theme.color);
  const [createModal, setCreateModal] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchGroups = async () => {
    try {
      const res = await getGroups();
      console.log(res.data);
      setGroupData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  function truncateWithEllipses(text, maxLength = 100) {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }
  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  const [showGroup, setShowGroup] = useState(false);
  const [groupId, setGroup] = useState("");
  const handleGroupDetailModal = async (id) => {
    setGroup(id);
    setShowGroup(true);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(groupData);
    } else {
      const filteredResult = groupData.filter((group) =>
        group.group_name
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())
      );
      setFilteredData(filteredResult);
    }
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <Communication />
        <div className="flex justify-between md:flex-row flex-col my-2 gap-3">
          <input
            type="text"
            placeholder="Search by group name"
            className="border p-2 w-full border-gray-300 rounded-lg "
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={() => setCreateModal(true)}
            style={{ background: themeColor }}
            className=" font-semibold text-white px-4 p-1 justify-center flex items-center gap-2 rounded-md"
          >
            <PiPlusCircle size={20} /> Create
          </button>
        </div>
        <div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* <div className="md:grid grid-cols-4 mx-3 gap-5 my-3"> */}
            {filteredData?.map((group) => (
              <Link
                to={`/admin/communication-group-details/${group?.id}`}
                key={group?.id}
              >
                <div className="flex flex-col justify-between my-3 w-96 max-h-96 min-h-96">
                  <div className="border flex flex-col justify-between border-gray-100 rounded-xl bg-blue-50 hover:bg-blue-100 min-h-96 shadow-custom-all-sides transition-all duration-200 ease-in-out">
                  {group.cover_image && group.cover_image.length > 0 && (
                       
                      <img
                        src={domainPrefix + group.cover_image[0].document}
                        className=" w-min-98 h-48 object-cover  rounded-md"
                        alt="forum-content"
                      />
                  )}
                    <div className="m-2">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-medium ">
                          {group?.group_name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {dateFormatSTD(group?.created_at)}
                        </p>
                      </div>

                      <div className="flex gap-5 items-center">
                        <div className="grid grid-cols-2">
                          <p className=" text-gray-500 text-center">
                            Members :
                          </p>
                          <h2 className="text-gray-500 text-center">
                            {group?.group_members?.length}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="">
                        <p className=" text-gray-500 text-sm px-2">
                          {truncateWithEllipses(group?.group_description)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between m-1">
                      <div className="flex items-center m-1">
                        {group.group_members
                          .slice(0, 5)
                          .map((member, index) => (
                            <div
                              key={index}
                              className="border rounded-md border-red-400"
                              // className={`w-10 h-10 flex items-center justify-center border ${
                              //   colors[index % colors.length]
                              // } text-gray-800 font-medium text-lg`}
                            >
                              <div
                                className={`w-10 h-10 flex items-center justify-center border border-red-400 rounded-md ${
                                  colors[index % colors.length]
                                } text-gray-800 font-medium text-lg`}
                              >
                                {member?.user_name
                                  ? member?.user_name[0].toUpperCase()
                                  : "?"}
                              </div>
                            </div>
                          ))}
                        {group?.group_members?.length > 5 && (
                          <div className="w-10 h-10 flex items-center justify-center border border-white bg-gray-200 text-gray-800 font-medium text-lg rounded-md">
                            +{group?.group_members?.length - 5}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* <Link
                          className="text-blue-600"
                          // onClick={() => handleGroupDetailModal(group.id)}
                          
                        >
                          <BiEdit size={18} />
                        </Link> */}
                        {/* <button className="text-red-600">
                          <FaTrash size={18} />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {createModal && <CreateGroup onclose={() => setCreateModal(false)} />}
    </section>
  );
}

export default Groups;
