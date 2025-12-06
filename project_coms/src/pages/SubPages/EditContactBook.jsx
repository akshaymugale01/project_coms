import React, { useEffect, useRef, useState } from "react";
import image from "/profile.png";
import Navbar from "../../components/Navbar";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";
import {
  getDependentGenericSubCategory,
  getGenericCategory,
  postContactBook,
  getContactBookDetails,
  editContactBook,
  domainPrefix,
} from "../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "../../Buttons/Switch";
const EditContactBook = () => {
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [logo, setLogo] = useState("");
  const [logoId, setLogoId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    companyName: "",
    contactPersonName: "",
    mobileNumber: "",
    landLine: "",
    primaryEmail: "",
    secondaryEmail: "",
    website: "",
    keyOffering: "",
    address: "",
    description: "",
    profile: "",
    status: false,
    attachments: [],
  });
  console.log(formData);
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setLogo(URL.createObjectURL(file));
  };
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsResp = await getContactBookDetails(id);
        const data = detailsResp.data;
        setFormData({
          ...formData,
          address: data.address,
          categoryId: data.generic_info_id,
          mobileNumber: data.mobile,
          landLine: data.landline_no,
          primaryEmail: data.primary_email,
          secondaryEmail: data.secondary_email,
          website: data.website,
          keyOffering: data.key_offering,
          description: data.description,
          profile: data.profile,
          status: data.status,
          companyName: data.company_name,
          contactPersonName: data.contact_person_name,
          subCategoryId: data.generic_sub_info_id,
          attachments: data.attachments || [],
        });
        if (data.logo && data.logo.length > 0) {
          setLogo(`${domainPrefix}${data.logo[0].document}`);
          setLogoId(data.logo[0].id);
        }
        fetchSubCategory(data.generic_info_id);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchContactCategory = async () => {
      try {
        const contactResp = await getGenericCategory();
        const filteredCategory = contactResp.data.filter(
          (cate) => cate.info_type === "contact"
        );
        console.log(filteredCategory);
        setCategories(filteredCategory);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSubCategory = async (catId) => {
      try {
        const subCatResp = await getDependentGenericSubCategory(catId);
        setSubCategories(
          subCatResp.data.map((subCat) => ({
            name: subCat.name,
            id: subCat.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
    fetchContactCategory();
  }, []);
  const navigate = useNavigate();
  const siteId = getItemInLocalStorage("SITEID");
  const handleEditContact = async () => {
    if (formData.companyName === "") {
      return toast.error("Please Provide Company name");
    }
    const sendData = new FormData();
    sendData.append("contact_book[company_name]", formData.companyName);
    sendData.append(
      "contact_book[contact_person_name]",
      formData.contactPersonName
    );
    sendData.append("contact_book[mobile]", formData.mobileNumber);
    sendData.append("contact_book[site_id]", siteId);
    sendData.append("contact_book[landline_no]", formData.landLine);
    sendData.append("contact_book[primary_email]", formData.primaryEmail);
    sendData.append("contact_book[secondary_email]", formData.secondaryEmail);
    sendData.append("contact_book[website]", formData.website);
    sendData.append("contact_book[address]", formData.address);
    sendData.append("contact_book[generic_info_id]", formData.categoryId);
    sendData.append(
      "contact_book[generic_sub_info_id]",
      formData.subCategoryId
    );
    sendData.append("contact_book[key_offering]", formData.keyOffering);
    sendData.append("contact_book[description]", formData.description);
    sendData.append("contact_book[profile]", formData.profile);
    sendData.append("contact_book[status]", formData.status);
    if (imageFile) {
      sendData.append("contact_book[logo][document]", imageFile);
    }

    if (logoId) {
      sendData.append("contact_book[logo][id]", logoId);
    }
    formData.attachments.forEach((file) => {
      sendData.append("attachfiles[]", file);
    });
    for (let pair of sendData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const res = await editContactBook(id, sendData);

      navigate(`/business/details/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const fetchSubCategory = async (catId) => {
      try {
        const subCatResp = await getDependentGenericSubCategory(catId);
        setSubCategories(
          subCatResp.data.map((subCat) => ({
            name: subCat.name,
            id: subCat.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.type === "select-one" && e.target.name === "categoryId") {
      const catId = Number(e.target.value);
      await fetchSubCategory(catId);
      setFormData({
        ...formData,
        categoryId: catId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex flex-col w-full gap-4 p-2">
          <h2
            style={{ background: themeColor }}
            className="text-center text-white font-semibold p-2 rounded-md text-lg "
          >
            Add Business Contact
          </h2>
          <div
            onClick={handleImageClick}
            className="cursor-pointer flex justify-center flex-col items-center my-4"
          >
            {logo ? (
              <img
                src={logo}
                alt="Uploaded"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            ) : (
              <img
                src={image}
                alt="Default"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              accept="image/*" // Accept only images
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <h2 className="font-medium">Company Logo</h2>
          </div>
          <div className="grid md:grid-cols-3 item-start gap-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold my-1">
                Company Name :
              </label>
              <input
                type="text"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleChange}
                name="companyName"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Contact Person Name :
              </label>
              <input
                type="text"
                placeholder="Enter Contact Person "
                value={formData.contactPersonName}
                onChange={handleChange}
                name="contactPersonName"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Mobile Number :
              </label>
              <input
                type="text"
                placeholder="Enter Mobile No. "
                value={formData.mobileNumber}
                onChange={handleChange}
                name="mobileNumber"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Landline :
              </label>
              <input
                type="text"
                placeholder="Enter Landline No. "
                value={formData.landLine}
                onChange={handleChange}
                name="landLine"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Primary Email :
              </label>
              <input
                type="text"
                placeholder="Enter Primary Email. "
                value={formData.primaryEmail}
                onChange={handleChange}
                name="primaryEmail"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Secondary Email :
              </label>
              <input
                type="email"
                placeholder="Enter Secondary Email. "
                value={formData.secondaryEmail}
                onChange={handleChange}
                name="secondaryEmail"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Website :
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={handleChange}
                name="website"
                placeholder="Enter Website url "
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Category :
              </label>
              <select
                name="categoryId"
                id=""
                value={formData.categoryId}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Sub Category :
              </label>
              <select
                name="subCategoryId"
                id=""
                value={formData.subCategoryId}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((subCat) => (
                  <option value={subCat.id} key={subCat.id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-1">
                Key Offering :
              </label>
              <input
                type="text"
                value={formData.keyOffering}
                name="keyOffering"
                onChange={handleChange}
                placeholder="Enter key Offering "
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2  ">
                <p className="font-semibold my-1">Inactive</p>
                <Switch
                  checked={formData.status}
                  onChange={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      status: !prevState.status,
                    }))
                  }
                />
                <p className="font-semibold my-1">Active</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="font-medium">
              Address :
            </label>
            <textarea
              name="address"
              id=""
              value={formData.address}
              onChange={handleChange}
              // cols="45"
              rows="3"
              className="border border-black rounded-md p-2"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Description :
              </label>
              <textarea
                name="description"
                id=""
                cols="10"
                rows="3"
                onChange={handleChange}
                value={formData.description}
                className="border border-black rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Profile :
              </label>
              <textarea
                name="profile"
                id=""
                cols="10"
                rows="3"
                value={formData.profile}
                onChange={handleChange}
                className="border border-black rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col items-start justify-start">
            <label htmlFor="" className="font-semibold ">
              Attachments :
            </label>
            <FileInputBox
              handleChange={(files) => handleFileChange(files, "attachments")}
              fieldName={"attachments"}
              isMulti={true}
            />
          </div>
          <div className="my-10 flex justify-center">
            <button
              className="bg-black text-white p-2 text-lg rounded-md px-8 font-medium"
              onClick={handleEditContact}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContactBook;
