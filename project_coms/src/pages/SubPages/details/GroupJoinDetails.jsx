import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import owners from "/owners.jpg";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import {
  getGroupsDetails,
  deleteGroup,
  domainPrefix,
} from "../../../api/index";
import Table from "../../../components/table/Table";
import MultiSelect from "../../AdminHrms/Components/MultiSelect";
import { BiEdit, BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import EditGroupDetails from "../EditGroupDetails";

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
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // const fetchGroupDetails = async () => {
  //   try {
  //     const res = await getGroupsDetails(id);
  //     setDetails(res.data);
  //     console.log(res.data.group_members);
  //     setFilteredMembers(res.data.group_members);
  //     setMembers(res.data.group_members);
  //   } catch (error) {
  //     console.log(res);
  //   }
  // };
  const fetchGroupDetails = async () => {
    try {
      const res = await getGroupsDetails(id);
      setDetails(res.data);
      console.log(res.data.group_members);
      setFilteredMembers(res.data.group_members);
      setMembers(res.data.group_members);
    } catch (error) {
      console.log("Error fetching group details:", error); // Fix here
    }
  };
  useEffect(() => {
    fetchGroupDetails();
  }, []);
  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];

  const columns = [
    // {
    //   name: "View",
    //   selector: (row) => (
    //     <div>
    //       <Link to={`/admin/employee-directory-Employment/${row.record_id}`}>
    //         <BsEye />
    //       </Link>
    //     </div>
    //   ),
    // },
    {
      name: "Id",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
  ];

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim === "") {
      setFilteredMembers(members);
    } else {
      const filteredResult = members.filter((member) =>
        member.user_name
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())
      );
      setFilteredMembers(filteredResult);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await deleteGroup(id);
      // setGroups((prevForums) => prevForums.filter((item) => item.id !== id));
      toast.success("Forum deleted successfully");
      navigate("/communication/groups");
    } catch (error) {
      console.error("Error deleting the post:", error);
      toast.error("Failed to delete the post. Please try again.");
    }
  };

  const [editGroup, setEditGroup] = useState(false);
  //  console.log(domainPrefix + details.cover_image[0].document)
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
                    {details.cover_image && details.cover_image.length > 0 && (
                      <img
                        src={domainPrefix + details.cover_image[0].document}
                        // src={owners}
                        className="rounded-full w-28 h-28 object-cover"
                        alt="forum-profile"
                      />
                    )}
                    <div className="flex flex-col gap-3">
                      <h2 className="font-semibold text-lg">
                        {details.group_name}
                      </h2>
                      <p className="font-normal ">
                        {details?.group_members?.length} Members
                      </p>
                      <p className="font-normal text-gray-500">
                        {details.group_description}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex flex-col w-96 ">
                    <MultiSelect
                      options={members}
                      // title={"Select members"}
                      handleSelect={handleSelectEdit}
                      // handleSelectAll={handleSelectAll}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      setOptions={setMembers}
                      searchOptions={filteredMembers}
                      compTitle="Select Group Members"
                    />
                  </div> */}

                  <div className="">
                    <button className="mx-2" onClick={() => setEditGroup(true)}>
                      <BiEdit size={20} />
                    </button>
                    <button className="mx-2" onClick={() => handleDelete(id)}>
                      <BiTrash size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center m-1">
                  {details?.group_members?.slice(0, 5)?.map((member, index) => (
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
                        {member.user_name
                          ? member.user_name[0].toUpperCase()
                          : "?"}
                      </div>
                    </div>
                  ))}
                  {details?.group_members?.length > 5 && (
                    <div className="w-10 h-10 flex items-center justify-center border border-white bg-gray-200 text-gray-800 font-medium text-lg rounded-md">
                      +{details.group_members.length - 5}
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-400 ">
                  <div className="p-2">
                    <h2 className="font-medium border-b">Members List</h2>
                    <div className="my-2 ">
                      <input
                        type="text"
                        name=""
                        value={searchText}
                        id=""
                        className="border border-gray-400 rounded-md p-2 w-full "
                        placeholder="Search by name"
                        onChange={handleSearch}
                      />
                    </div>
                    <Table
                      columns={columns}
                      data={filteredMembers}
                      isPagination={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {editGroup && (
          <EditGroupDetails
            onclose={() => setEditGroup(false)}
            fetchGroupDetails={fetchGroupDetails}
          />
        )}
      </div>
    </section>
  );
}
export default GroupJoinDetails;
