import React, { useEffect, useState } from "react";
import Selector from "../../containers/Selector";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import {
  getGenericCategory,
  getGenericCategoryDetails,
  getGenericSubCategory,
  postGenericCategory,
  postGenericSubCategory,
} from "../../api";
import ModalWrapper from "../../containers/modals/ModalWrapper";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import ContactSetupModal from "../../containers/modals/ContactSetupModal";

const BusinessSetup = () => {
  const [selectedFiled, setSelectedField] = useState("category");
  const [showData, setShowData] = useState(false);
  const [category, setCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [categories, setCategories] = useState([]);
  const [catModal, setCatModal] = useState(false);
  const [catId, setCatId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [catAdded, setCatAdded] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [subCategory, setSubCategory] = useState("");
  console.log(selectedCatId);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResp = await getGenericCategory();
      const filteredCategory = categoryResp.data.filter(
        (item) => item.info_type === "contact"
      );
      console.log(filteredCategory);
      setCategories(filteredCategory);

      // const flattened = filteredCategory.flatMap((category) =>
      //   category.generic_sub_infos.map((subCategory) => ({
      //     categoryId: category.id,
      //     categoryName: category.name,
      //     subCategoryId: subCategory.id,
      //     subCategoryName: subCategory.name,
      //   }))
      // );
      // setSubCategories(flattened);
      // console.log(flattened);
    };
    const fetchGenericSubCat = async () => {
      try {
        const subResp = await getGenericSubCategory();
        console.log(subResp);
        setSubCategories(subResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    fetchGenericSubCat();
  }, [catModal, catAdded]);
  const companyID = getItemInLocalStorage("COMPANYID");
  const siteId = getItemInLocalStorage("SITEID");
  const HandleAddCategory = async () => {
    if (!category) {
      return toast.error("Please Enter a Category");
    }
    const formData = new FormData();
    formData.append("generic_info[name]", category);
    formData.append("generic_info[company_id]", companyID);
    formData.append("generic_info[site_id]", siteId);
    formData.append("generic_info[info_type]", "contact");
    try {
      const res = await postGenericCategory(formData);
      setCatAdded(true);
      setCategory("");
      window.location.reload();
      toast.success("Category Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const HandleAddSubCategory = async () => {
    if (!subCategory) {
      return toast.error("Please Enter a Sub Category");
    }
    const formData = new FormData();
    formData.append("generic_sub_info[generic_info_id]", selectedCatId);
    formData.append("generic_sub_info[name]", subCategory);

    try {
      const res = await postGenericSubCategory(formData);
      setCatAdded(true);
      setSubCategory("");
      window.location.reload();
      toast.success("Sub Category Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const themeColor = useSelector((state) => state.theme.color);
  const handleCatModal = async (id) => {
    setCatModal(true);
    setCatId(id);
  };
  const categoryColumn = [
    { name: "Sr. no.", selector: (row, index) => index + 1, sortable: true },
    { name: "Category", selector: (row) => row.name, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button onClick={() => handleCatModal(row.id)}>
          <BiEdit size={15} />
        </button>
      ),
      sortable: true,
    },
  ];
  const subColumn = [
    { name: "Sr. no.", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Category",
      selector: (row) => row.generic_info_name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link to={``}>
          <BsEye size={15} />
        </Link>
      ),
      sortable: true,
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center gap-5 flex-col w-full">
          <h2
            style={{ background: themeColor }}
            className="bg-black p-2 text-white text-center rounded-md font-semibold text-lg my-2"
          >
            Setup Categories
          </h2>
          <div className="flex justify-center">
            <div className=" gap-5 bg-gray-100 flex p-2 items-center text-white text-lg rounded-full">
              <h2
                className={`${
                  selectedFiled === "category"
                    ? "bg-white text-blue-500 shadow-custom-all-sides"
                    : ""
                } px-3 rounded-full cursor-pointer font-medium text-black`}
                onClick={() => setSelectedField("category")}
              >
                Category
              </h2>
              <h2
                className={`${
                  selectedFiled === "subCategory"
                    ? "bg-white text-blue-500 shadow-custom-all-sides"
                    : ""
                } px-3 rounded-full cursor-pointer font-medium text-black`}
                onClick={() => setSelectedField("subCategory")}
              >
                Sub Category
              </h2>
            </div>
          </div>
          {selectedFiled === "category" && (
            <div className="flex flex-col justify-center mx-10 gap-2">
              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Category"
                  className="border border-black rounded-md p-1"
                />
                <button
                  style={{ background: themeColor }}
                  className="bg-black text-white px-2 rounded-md"
                  onClick={HandleAddCategory}
                >
                  Add Category
                </button>
              </div>
              <div className="mt-4 w-full">
                <Table columns={categoryColumn} data={categories} />
              </div>
            </div>
          )}
          {selectedFiled === "subCategory" && (
            <div className="flex flex-col justify-center md:mx-10 gap-2">
              <div className="flex md:flex-row flex-col justify-center gap-2">
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="border border-black rounded-md p-1"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name=""
                  id=""
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Enter Sub Category"
                  className="border border-black rounded-md p-1"
                />
                <button
                  style={{ background: themeColor }}
                  className="bg-black text-white px-2 rounded-md"
                  onClick={HandleAddSubCategory}
                >
                  Add Sub Category
                </button>
              </div>
              <div className="mt-4 w-full">
                <Table columns={subColumn} data={subCategories} />
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
      {catModal && (
        <ContactSetupModal id={catId} onClose={() => setCatModal(false)} />
      )}
    </section>
  );
};

export default BusinessSetup;
