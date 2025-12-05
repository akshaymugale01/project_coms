import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import profileImage from "/prof.jpg";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import { postOutSiderInvite, updateProjectAssigned } from "../../../../api";
import toast from "react-hot-toast";
import { setTrue,toggle } from "../../../../features/Project/Added";
import { useDispatch } from "react-redux";
const AssignUser = ({ onclose, assignTo, users, id }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const dispatch = useDispatch();
  const [assignedUsers, setAssignedUsers] = useState(assignTo);
  const [assignFrom, setAssignFrom] = useState("inside");
  const [inviteOutsider, setInviteOutsider] = useState("");
  const handleCheckboxChange = (user) => {
    setAssignedUsers((prevAssigned) => {
      if (prevAssigned.some((assigned) => assigned.user_id === user.user_id)) {
        console.log("if");
        return prevAssigned.filter((assigned) => assigned.user_id !== user.user_id);
      } else {
        console.log("else");
        return [...prevAssigned, user];
      }
    });
  };

const user_id = getItemInLocalStorage("VIBEUSERID")
  const handleSaveAssignments = () => {
    if (assignedUsers.length === 0) {
        toast.error("Please select Member")
    }
    const userIds = assignedUsers.map(user => user.user_id);
    UpdateUserAssignToBoard(userIds);
  };
  
  const UpdateUserAssignToBoard = async (idList) => {
    const formData = new FormData();
    formData.append("board_id", id);
    formData.append("user_id", user_id); 
  
    const assignToValues = idList.join(","); 
    formData.append("assign_to", assignToValues);
  
    try {
      const response = await updateProjectAssigned(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
       toast.success("New member added successfully")
       onclose()
      //  window.location.reload()
      dispatch(toggle())
      } else {
        console.log("Unable to update");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding member, please try again later")
    }
  };

  console.log("Assigned Users:", assignedUsers);
  const [searchText, setSearchText] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(users)
console.log(users)
useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  
    if (searchValue.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filteredResult = users.filter((item) => {
        const firstName = item.firstname ? item.firstname.toLowerCase() : "";
        const lastName = item.lastname ? item.lastname.toLowerCase() : "";
        const fullName = `${firstName} ${lastName}`;
  
        return fullName.includes(searchValue.toLowerCase());
      });
      setFilteredUsers(filteredResult);
    }
  };

  const handleAddEmail = () => {
    // Validate the email before adding it to the list
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteOutsider)) {
      createLead();
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const createLead = async() => {
    console.log("inviteOutsider:", inviteOutsider);
    const formData = new FormData();
    formData.append("added_by", user_id);
    formData.append("user_id", user_id);
    //  const idString = idList.join(',');
    formData.append("email ", inviteOutsider);
   
    await  postOutSiderInvite(formData)
      .then((response) => {
        if (response.success) {
          

          //  window.location.reload();
          if (response.status === 123) {
            return toast.error(response.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
          toast.success("Invite Send Successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          onclose()
        } else {
          if (response.status === 122) {
            return toast.error(response.message, {
              position: "top-center",
              autoClose: 2000,
            });
          }
          console.log("unsuccess");
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  
  

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-5 rounded-xl w-80">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onclose}
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-gray-600 font-semibold text-lg">
            Add Project Member
          </h2>

          <div className="relative flex gap-2 my-2 border-b">
            <h2
              className={`flex-1 p-3 text-center cursor-pointer ${
                assignFrom === "inside" ? "text-violet-700" : ""
              }`}
              onClick={() => setAssignFrom("inside")}
            >
              Insider
            </h2>
            <h2
              className={`flex-1 p-3 text-center cursor-pointer ${
                assignFrom === "outside" ? "text-violet-700" : ""
              }`}
              onClick={() => setAssignFrom("outside")}
            >
              Outsider
            </h2>
            <div
              className={`absolute bottom-0 left-0 w-1/2 h-[1px] bg-violet-700 transition-transform duration-300 ease-in-out ${
                assignFrom === "inside"
                  ? "transform translate-x-0"
                  : "transform translate-x-full"
              }`}
            />
          </div>

          <div className="flex gap-2 mt-2 overflow-auto">
            {assignTo.length > 0 &&
              assignTo.map((user, index) => (
                <img
                  key={index}
                  src={
                    user.profile_picture
                      ? "https://vibecopilot.ai/api/media/" +
                        user.profile_picture
                      : profileImage
                  }
                  className="w-9 h-9 mt-1 rounded-full"
                  alt="Profile"
                />
              ))}
          </div>

          {assignFrom === "inside" && (
            <>
              <input
                type="text"
                placeholder="Search user"
                value={searchText}
                onChange={handleSearch}
                className="border p-1 border-gray-300 rounded-md w-full my-5 placeholder:text-sm outline-none"
              />
              <div className="overflow-y-scroll h-40 xl:60 ">
                {filteredUsers?.map((user, index) => (
                  <div className="flex justify-between my-2" key={index}>
                    <div className="flex gap-2">
                      <img
                        src={
                          user.profile_picture
                            ? "https://vibecopilot.ai/api/media/" +
                              user.profile_picture
                            : profileImage
                        }
                        className="w-9 h-9 mt-1 rounded-full"
                        alt="Profile"
                      />
                      <h2 className="flex items-center">{`${user.firstname} ${user.lastname}`}</h2>
                    </div>
                    <p>
                      {assignedUsers.some(
                        (assigned) => assigned.id === user.id
                      )}
                    </p>
                    <input
                      type="checkbox"
                      checked={assignedUsers.some(
                        (assigned) => assigned.user_id === user.user_id
                      )}
                      id={index}
                      onChange={() => handleCheckboxChange(user)}
                      className="mr-2"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {assignFrom === "outside" && (
            <div className="my-5">
              <div>
                <input
                  type="email"
                  name=""
                  id=""
                  value={inviteOutsider}
                  onChange={(e) => setInviteOutsider(e.target.value)}
                  required
                  className="border border-gray-300 p-1 px-2 outline-none w-full rounded-full placeholder:text-sm"
                  placeholder="user@example.com"
                />
              </div>
            </div>
          )}
          <div className="border-t border-inherit my-5"></div>
          <div className="flex justify-center w-full">
            {assignFrom === "inside" && (
              <button
                style={{ background: themeColor }}
                className="border-2 rounded-md p-1 px-4 text-white w-full"
                  onClick={handleSaveAssignments}
              >
                Add
              </button>
            )}
            {assignFrom === "outside" && (
              <button
                style={{ background: themeColor }}
                className="border-2 rounded-md p-1 px-4 text-white w-full"
                  onClick={handleAddEmail}
              >
                Invite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUser;
