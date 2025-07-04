import React, { useEffect, useState } from "react";
// import TicketSetupPage from "../SubPages/TicketSetupPage";
import { useSelector } from "react-redux";
// import Table from "../../../components/table/Table";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { FaAddressBook, FaTrash } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
// import FileInputBox from "../../../containers/Inputs/FileInputBox";

// import { getItemInLocalStorage } from "../../../utils/localStorage";
// import TicketCategoryPage from "../Setup/TicketSetup/TicketCategoryPage";
import Table from "../../components/table/Table";
import {
  deleteHelpDeskCategorySetup,
  destroyFitoutCategory,
  domainPrefix,
  editHelpDeskCategoriesSetupDetails,
  getFitOutCategoriesSetup,
  getFitoutCategoriesSetupDetails,
  getFitoutSubCategoriesSetup,
  getFitoutSubCategoriesSetupDetails,
  getSetupUsers,
  putFitoutCategoriesSetup,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FitoutCategory from "./FitoutCategory";
import TicketSubCategory from "../Setup/TicketSetup/TicketSubCategory";
import SubCatPage from "./SubCatPage";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [page, setPage] = useState("Category");
  const [engineers, setEngineers] = useState([]);

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [showCategoryPage, setShowCategoryPage] = useState(false);
  const [showSubCategoryPage, setShowSubCategoryPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [isCatEditModalOpen, setIsCatEditModalOpen] = useState(false);
  const [isSubCatEditModalOpen, setIsSubCatEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    minTat: "",
    engineer: "",
  });

  const handleToggleCategoryPage = () => {
    setShowCategoryPage((prevState) => !prevState);
  };
  const handleToggleCategoryPage1 = () => {
    setShowSubCategoryPage((prevState) => !prevState);
  };
  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const deleteFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleFaqChange = (index, type, value) => {
    const newFaqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, [type]: value };
      }
      return faq;
    });
    setFaqs(newFaqs);
  };
  const [isOpen, setIsOpen] = useState({
    building: false,
    wing: false,
    zone: false,
    floor: false,
    room: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    building: [],
    wing: [],
    zone: [],
    floor: [],
    room: [],
  });

  const options = {
    building: [
      "HDFC Ergo Bhandup",
      "Test Building 111",
      "Tower 101",
      "Sarova Nirvana",
      "Jeevandeep",
      "Test Twin Tower",
      "Decker Bldg",
      "PMT Wing",
    ],
    wing: [
      "Wing 1 - HDFC Ergo Bhandup",
      "Test Building 1111 - Test Building 111",
      "Wing 2 - HDFC Ergo Bhandup",
    ],
    floor: [
      "Floor 1 - Area 1 - Wing 1 - HDFC Ergo Bhandup",
      "Floor 2 - Area 1 - Wing 1 - HDFC Ergo Bhandup",
    ],
    zone: [
      "Area 1 - Wing 1 - HDFC Ergo Bhandup",
      "Area 1 - Wing 2 - HDFC Ergo Bhandup",
    ],
    room: ["Room 1", "Room 2", "Room 3", "Room 4"],
  };

  const toggleSelect = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleOptionChange = (section, value) => {
    if (selectedOptions[section].includes(value)) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [section]: prevState[section].filter((option) => option !== value),
      }));
    } else {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [section]: [...prevState[section], value],
      }));
    }
  };
  const [catAdded, setCatAdded] = useState(true);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const catResp = await getFitOutCategoriesSetup();
        setCategories(catResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategory = async () => {
      try {
        const subCatResp = await getFitoutSubCategoriesSetup();
        console.log("subcat", subCatResp);
        const sortedSubCat = subCatResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setSubCategories(sortedSubCat);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
    fetchSubCategory();
  }, [catAdded]);

  const handleCatDelete = async (id) => {
    try {
      await destroyFitoutCategory(id); // Call the DELETE API
      setCatAdded(true);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    } finally {
      setTimeout(() => {
        setCatAdded(false);
      }, 500);
    }
  };

  useEffect(() => {
    const fetchSetupUser = async () => {
      try {
        const userResp = await getSetupUsers();
        const filteredTechnician = userResp.data.filter(
          (tech) => tech.user_type === "pms_technician"
        );

        setEngineers(filteredTechnician);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSetupUser();
  }, []);

  // console.log("res", engineers);
  // const handleSubCatDelete = async (id) => {
  //   const formData = new FormData();
  //   formData.append("helpdesk_category[active]", 0);
  //   formData.append("id", id);
  //   try {
  //     const res = deleteHelpDeskSubcategorySetup(formData);
  //     setCatAdded(true);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setTimeout(() => {
  //       setCatAdded(false);
  //     }, 500);
  //   }
  // };

  console.log("formData", formData);
  const CatColumns = [
    {
      name: "Sr.no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Category Type",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "File",
      cell: (row) =>
        row.attachfile && row.attachfile.document_url ? (
          <div className="flex flex-col gap-1">
            <a
              href={domainPrefix + row.attachfile.document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View
            </a>
            <a
              href={domainPrefix + row.attachfile.document_url}
              download
              className="text-green-600 underline"
            >
              Download
            </a>
          </div>
        ) : (
          "No File"
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* <button onClick={() => openCatEditModal(row.id)}>
            <BiEdit size={15} />
          </button> */}
          <button onClick={() => handleCatDelete(row.id)}>
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  // console.log("cat ", CatColumns);

  //custom style

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [catId, setCatId] = useState(null);
  const [subCatId, setSubCatId] = useState(null);
  const openCatEditModal = async (id) => {
    const fetchCatDetails = await getFitoutCategoriesSetupDetails(id);
    setCatId(id);
    setFormData({
      ...formData,
      category: fetchCatDetails.data.name,
      minTat: fetchCatDetails.data.tat,
      engineer: fetchCatDetails.data.assigned_id || "",
    });
    setIsCatEditModalOpen(true);
  };
  const openSubCatEditModal = async (id) => {
    const fetchCatDetails = await getFitoutSubCategoriesSetupDetails(id);
    console.log("fetch", fetchCatDetails);
    setSubCatId(id);
    // setFormData({
    //   ...formData,
    //   category: fetchCatDetails.data.name,
    //   minTat: fetchCatDetails.data.tat,

    // });
    setIsCatEditModalOpen(true);
  };

  const closeModal1 = () => setIsModalOpen1(false);

  const subCatColumns = [
    {
      name: "Sr.no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Category Type",
      selector: (row) => row.fitout_category_name,
      sortable: true,
    },
    {
      name: "Sub Category Type",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Building",
    //   selector: (row) => row.Building,
    //   sortable: true,
    // },

    // {
    //   name: "Wing",
    //   selector: (row) => row.Vendor_Email,
    //   sortable: true,
    // },

    // {
    //   name: "Zone",
    //   selector: (row) => row.Icon,
    //   sortable: true,
    // },
    // {
    //   name: "Floor",
    //   selector: (row) => row.Icon,
    //   sortable: true,
    // },
    // {
    //   name: "Room",
    //   selector: (row) => row.Icon,
    //   sortable: true,
    // },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <button onClick={() => openSubCatEditModal(row.id)}>
    //         <BiEdit size={15} />
    //       </button>
    //        <button>
    //         <FaTrash size={15} />
    //       </button> 
    //     </div>
    //   ),
    // },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const validated = value.replace(/[^a-zA-Z]/g, "");
      setFormData({ ...formData, [name]: validated });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const siteId = getItemInLocalStorage("SITEID");
  const handleEditCategory = async () => {
    const sendData = new FormData();
    sendData.append("fit_out_setup_category[society_id]", siteId);
    sendData.append("fit_out_setup_category[of_phase]", "pms");
    sendData.append("fit_out_setup_category[name]", formData.category);
    sendData.append("fit_out_setup_category[assigned_id]", formData.engineer);

    try {
      const resp = await putFitoutCategoriesSetup(catId, sendData);
      // console.log(resp);
      toast.success("Category Updated Successfully");
      setIsCatEditModalOpen(false);
      setCatAdded(Date.now());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <div className="flex w-full">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Category" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Category")}
          >
            Category
          </h2>
          {/* <h2
            className={`p-1 ${
              page === "Sub Category" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Sub Category")}
          >
            Sub Category
          </h2> */}
        </div>
      </div>

      <div>
        {page === "Category" && (
          <div>
            <div className="flex justify-end">
              <button
                style={{ background: themeColor }}
                onClick={handleToggleCategoryPage}
                className="p-2 my-2 bg-blue-500 text-white rounded-md"
              >
                Add Category
              </button>
            </div>
            {showCategoryPage && (
              <FitoutCategory
                handleToggleCategoryPage={handleToggleCategoryPage}
                setCatAdded={setCatAdded}
              />
            )}

            <DataTable
              responsive
              columns={CatColumns}
              data={categories}
              isPagination={true}
              pagination
              paginationPerPage={9}
            />
          </div>
        )}
        {page === "Sub Category" && (
          <div>
            <div className="flex justify-end">
              <button
                style={{ background: themeColor }}
                onClick={handleToggleCategoryPage1}
                className="p-2 my-2 bg-blue-500 text-white rounded-md"
              >
                Add SubCategory
              </button>
            </div>
            {showSubCategoryPage && (
              <SubCatPage
                handleToggleCategoryPage1={handleToggleCategoryPage1}
                setCAtAdded={setCatAdded}
              />
            )}
            <DataTable
              responsive
              //   selectableRows
              columns={subCatColumns}
              data={subCategories}
              isPagination={true}
              pagination
              paginationPerPage={9}
            />
          </div>
        )}

        {isModalOpen1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeModal1}
            ></div>
            <div className="bg-white h-96 overflow-y-auto rounded-lg shadow-lg p-4 relative z-10 w-2/3">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal1}
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Sub Category</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="form-group">
                  <label className="block mb-2">Select Category</label>
                  <select
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Enter Category"
                  >
                    <option value="">HouseKeeping</option>
                    <option value="">Washroom cleaning</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="block mb-2">Sub Category</label>
                  <input className="border p-2 w-full"></input>
                </div>

                <form className="">
                  {Object.keys(options).map((section) => (
                    <div key={section} className="form-section">
                      <div className="flex flex-col">
                        <span>
                          <div></div>
                          <input type="checkbox" />
                          &nbsp; &nbsp;<label htmlFor="">{section}</label>
                          <br />
                        </span>
                        <span className="flex flex-col">
                          <div className="relative">
                            <input
                              type="text"
                              readOnly
                              value={selectedOptions[section].join(", ")}
                              onClick={() => toggleSelect(section)}
                              className="cursor-pointer p-2 border mt-2 border-gray-300 rounded-md w-full"
                            />
                            &nbsp;
                            {isOpen[section] && (
                              <div className="absolute top-full z-10 mt-2 w-full rounded-md shadow-lg bg-white border border-gray-300">
                                {options[section].map((option) => (
                                  <label key={option} className="block p-2">
                                    <input
                                      type="checkbox"
                                      value={option}
                                      checked={selectedOptions[
                                        section
                                      ].includes(option)}
                                      onChange={() =>
                                        handleOptionChange(section, option)
                                      }
                                      className="mr-2"
                                    />
                                    {option}
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    type="submit"
                    style={{ background: themeColor, height: "1cm" }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {isCatEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsCatEditModalOpen(false)}
            ></div>
            <div className="bg-white overflow-y-auto rounded-lg shadow-lg p-4 relative z-10">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsCatEditModalOpen(false)}
              >
                <FaTimes size={20} />
              </button>
              <h2 className=" font-semibold mb-4">Edit Category</h2>
              <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="form-group">
                    <label className="block mb-2">Enter Category</label>
                    <input
                      type="text"
                      className="border p-2 w-full"
                      placeholder="Enter Category"
                      value={formData.category}
                      name="category"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="block mb-2">Select Engineer</label>
                    <select
                      className="border p-2 w-full"
                      name="engineer"
                      value={formData.engineer}
                      onChange={handleChange}
                    >
                      <option value="">Select Engineer</option>
                      {engineers.map((engineer) => (
                        <option value={engineer.id} key={engineer.id}>
                          {engineer.firstname}
                          {engineer.lastname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block mb-2">Response Time (min)</label>
                    <input
                      type="number"
                      className="border p-2 w-full"
                      placeholder="Response Time"
                      value={formData.minTat}
                      onChange={handleChange}
                      name="minTat"
                    />
                  </div>
                </div>

                <div className="flex justify-center ">
                  <button
                    style={{ background: themeColor }}
                    className=" text-white px-4 py-2 rounded-md "
                    onClick={handleEditCategory}
                  >
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
