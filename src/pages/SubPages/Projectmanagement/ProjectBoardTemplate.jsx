import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVibeBoardTemplate } from "../../../api";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { PiPlus } from "react-icons/pi";

const ProjectBoardTemplate = ({
  closeProjectModal,
  isOpen,
  board_id_for_Temp,
  Update_board_template,
  selectedimage,
  setselectedimage,
  goToProject,
  selectedTemplateId,
  setSelectedTemplateId,
}) => {
  const [template, setTemplate] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState({});
  const isCategoryMenuOpen = (category) => !!categoryMenuOpen[category];
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (isOpen) {
      GetTemplate();
    }
  }, [isOpen]);
  const userId = getItemInLocalStorage("VIBEUSERID");
  const GetTemplate = async () => {
    try {
      const jsonData = await getVibeBoardTemplate(userId);
      if (jsonData.success) {
        console.log(jsonData.data);
        setTemplate(jsonData.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to toggle the open/close state of a category menu
  const toggleCategoryMenu = (category) => {
    setCategoryMenuOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10">
      <div
        style={{ background: themeColor }}
        className="md:w-auto w-full p-4 md:px-10 flex flex-col rounded-md overflow-auto max-h-[100%] hide-scrollbar"
      >
        <button
          className="place-self-end p-1 rounded-full bg-white"
          onClick={closeProjectModal}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className="temp_boardmain" style={{ color: "#fff" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "sticky",
              top: "0",
              zIndex: "10",
              //   backgroundColor: "#133953",
            }}
          >
            <div
              style={{
                width: "24%",
                position: "sticky",
                top: "0",
                zIndex: "10",
                // backgroundColor: "#133953",
              }}
            >
              <div className="mt-2" style={{ fontSize: 18, marginBottom: 20 }}>
                <b>All Templates</b>
              </div>
              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  display: "block",
                  height: 480,
                }}
              >
                {template
                  .filter((temp) =>
                    temp.templates.some((templateItem) =>
                      templateItem.template_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                  )
                  .map((temp) => (
                    <div key={temp.category}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          marginBottom: 4,
                          padding: "4px 4px",
                          borderRadius: 6,
                          marginRight: 2,
                        }}
                        onClick={() => toggleCategoryMenu(temp.category)}
                        className="temp-category"
                      >
                        <span
                          style={{
                            color: "#cdcdcd",
                            textTransform: "uppercase",
                            fontSize: 16,
                          }}
                        >
                          {temp.category}
                        </span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 12,
                            marginRight: 5,
                            color: "#cdcdcd",
                          }}
                        >
                          {isCategoryMenuOpen(temp.category) ? "▼" : "▶"}
                        </span>
                      </div>
                      {isCategoryMenuOpen(temp.category) && (
                        <ul
                          className="nav nav-pills nav-sidebar flex-column "
                          role="menu"
                          data-accordion="false"
                          style={{
                            fontSize: 16,
                            overflowY: "scroll",
                            overflowX: "hidden",
                            display: "block",
                          }}
                        >
                          {temp.templates
                            .filter((templateItem) =>
                              templateItem.template_name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
                            .map((templateItem) => (
                              <li className="" key={templateItem.id}>
                                <a
                                  onClick={() => {
                                    setSelectedTemplateId(templateItem.id);
                                    setselectedimage(
                                      templateItem.attachments[0]
                                        ? templateItem.attachments[0].attachment
                                        : null
                                    );
                                  }}
                                >
                                  <p
                                    className="cursor-pointer my-2 temp-category"
                                    style={{
                                      fontSize: 14,
                                      color:
                                        templateItem.id === selectedTemplateId
                                          ? "#10DF95"
                                          : "#fff",
                                      marginBottom: 0,
                                      overflow: "auto",
                                      whiteSpace: "normal",
                                      wordWrap: "break-word",
                                      // margin: "1px 0",
                                      padding: "0px 2px ",
                                      borderRadius: 4,
                                    }}
                                  >
                                    {templateItem.template_name}
                                  </p>
                                </a>
                              </li>
                            ))}
                          <hr
                            style={{
                              padding: 0,
                              margin: 1,
                              border: "0.5px solid #245272",
                            }}
                          />
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="my-2" style={{ width: "76%" }}>
              <div>
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <FaSearch className="text-gray-400" />
                    <input
                      type="text"
                      className="bg-transparent outline-none  "
                      spellCheck="true"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search..."
                    />
                  </div>
                  <span
                    className="bg-white text-black flex items-center font-medium  p-1 gap-2 px-2 rounded-md"
                    onClick={() => goToProject(board_id_for_Temp)}
                  >
                    <PiPlus />
                    <p className="text-sm">Create blank board</p>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mx-2">
                <div className="col-span-2">
                  <span style={{ fontSize: 22 }}>Team management</span>
                  <br></br>
                  <span
                    style={{ fontSize: 14, color: "#cdcdcd" }}
                    className="w-40"
                  >
                    Simple task management for teams - create, organize, and
                    track your team's tasks
                  </span>
                </div>
                <div className="flex justify-end ">
                  <button
                    style={{
                      borderRadius: 50,
                      color: "white",
                    }}
                    onClick={() => {
                      Update_board_template();
                    }}
                  >
                    <h6>
                      <p className="bg-white text-black p-1 rounded-md font-medium px-2 text-sm">
                        Use this template
                      </p>
                    </h6>
                  </button>
                </div>
              </div>
              <div className="p-2">
                <img
                  src={
                    selectedimage
                      ? "https://vibecopilot.ai/api/media" + "/" + selectedimage
                      : ""
                  }
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBoardTemplate;
