import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import {
  PiPlusCircle,
  PiPlusCircleBold,
  PiPlusCircleFill,
} from "react-icons/pi";
import OrganisationSetting from "../OrganisationSetting";
import { GrHelpBook } from "react-icons/gr";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  getAssociatedSiteDetails,
  getAssociatedSites,
  postAssociatedSites,
  putAssociatedSiteDetails,
} from "../../../api";
import toast from "react-hot-toast";
import { Switch } from "antd";
const AssociatedSites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    siteName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.site_name,
      sortable: true,
    },
    {
      name: "city",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "state",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status ? (
          <p className="text-green-400 font-medium">Active</p>
        ) : (
          <p className="text-red-400 font-medium">Inactive</p>
        ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          {/* <button
            onClick={() => handleDeleteDepartment(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button> */}
        </div>
      ),
    },
  ];
  const [siteDetails, setSiteDetails] = useState({
    siteName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    latitude: "",
    longitude: "",
    status: true
  });
  const [siteId, setSiteId] = useState("");
  const handleEditModal = async (siteID) => {
    setSiteId(siteID);
    setIsModalOpen(true);
    try {
      const res = await getAssociatedSiteDetails(siteID);
      setSiteDetails({
        ...siteDetails,
        siteName: res.site_name,
        address1: res.address_1,
        address2: res.address_2,
        city: res.city,
        state: res.state,
        country: res.country,
        latitude: res.latitude,
        longitude: res.longitude,
        pinCode: res.zip_code,
        status: res.status
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [associatedSites, setAssociatedSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const fetchAssociatedSites = async () => {
    try {
      const res = await getAssociatedSites(hrmsOrgId);
      setAssociatedSites(res);
      setFilteredSites(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAssociatedSites();
  }, []);

  const handleAddAssociatedSite = async () => {
    if (!formData.siteName) {
      toast.error("Site name is required");
      return;
    }
    if (!formData.address1) {
      toast.error("Address 1 is required");
      return;
    }
    if (!formData.city) {
      toast.error("City is required");
      return;
    }
    if (!formData.state) {
      toast.error("State is required");
      return;
    }
    if (!formData.pinCode) {
      toast.error("Pin code is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    const postData = new FormData();
    postData.append("site_name", formData.siteName);
    postData.append("address_1", formData.address1);
    postData.append("address_2", formData.address2);
    postData.append("city", formData.city);
    postData.append("state", formData.state);
    postData.append("zip_code", formData.pinCode);
    postData.append("country", formData.country);
    postData.append("latitude", formData.latitude);
    postData.append("longitude", formData.longitude);
    postData.append("status", true);
    postData.append("organization", hrmsOrgId);

    try {
      const res = await postAssociatedSites(postData);
      toast.success("Site created successfully");
      fetchAssociatedSites();
      setIsModalOpen1(false);
      setFormData({
        siteName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditChange = (e) => {
    setSiteDetails({ ...siteDetails, [e.target.name]: e.target.value });
  };

  const handleEditAssociatedSites = async () => {
    if (!siteDetails.siteName) {
      toast.error("Site name is required");
      return;
    }
    if (!siteDetails.address1) {
      toast.error("Address 1 is required");
      return;
    }
    if (!siteDetails.city) {
      toast.error("City is required");
      return;
    }
    if (!siteDetails.state) {
      toast.error("State is required");
      return;
    }
    if (!siteDetails.pinCode) {
      toast.error("Pin code is required");
      return;
    }
    if (!siteDetails.country) {
      toast.error("Country is required");
      return;
    }
    const editData = new FormData();
    editData.append("site_name", siteDetails.siteName);
    editData.append("address_1", siteDetails.address1);
    editData.append("address_2", siteDetails.address2);
    editData.append("city", siteDetails.city);
    editData.append("state", siteDetails.state);
    editData.append("zip_code", siteDetails.pinCode);
    editData.append("country", siteDetails.country);
    editData.append("latitude", siteDetails.latitude);
    editData.append("longitude", siteDetails.longitude);
    editData.append("status", siteDetails.status);
    editData.append("organization", hrmsOrgId);

    try {
      const res = await putAssociatedSiteDetails(siteId, editData);
      toast.success("Site updated successfully");
      fetchAssociatedSites();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-2 mt-5">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
            // value={searchText}
            // onChange={handleSearch}
          />
          <button
            onClick={() => setIsModalOpen1(true)}
            style={{ background: themeColor }}
            className="border-2 font-medium hover:text-white duration-150 transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={filteredSites} isPagination={true} />
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>

          <div>
            <p className="font-medium"> Department Settings Guidelines</p>
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can create departments such as a Sales, Marketing, HR,
                    Finance, Operations, etc. By adding departments, you will be
                    able to map the employees under specific departments from
                    the employee profile --{">"} employment ---{">"} Job
                    Information ---{">"} Position. This can further be mapped to
                    head of departments for direct reporting and workflow
                    approvals.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    An analytic view is displayed on the dashboard that gives
                    information on the no. Of employees mapped under specific
                    departments. Departments can also be used in filters across
                    modules.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>How do I create departments?</li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Click on{" "}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="  text-white py-1 px-4 rounded-lg"
                      style={{ background: themeColor }}
                    >
                      Add Department
                    </button>
                    ---{">"} Enter department name and select the head of the
                    department from the employee list.
                  </li>
                </ul>
              </li>

              <li>
                You can edit and disable the departments. But you cannot delete
                the departments that contains mapped employees.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-xl shadow-md w-[32rem]">
            <div className="flex justify-center border-b">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-center ">
                <BiEdit /> Edit Associated Sites
              </h2>
            </div>
            <div className="max-h-96 overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center gap-1 border-b py-2">
                  <label htmlFor="" className="font-medium">
                    Active/Inactive :
                  </label>
                  {/* <div className="flex items-center gap-2">

                 <p>Inactive</p> */}
                 <Switch checked={siteDetails.status} onChange={()=> setSiteDetails({...siteDetails, status: !siteDetails.status})}/>
                 {/* <p>Active</p> */}
                  {/* </div> */}

                </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="font-medium">
                  Site name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={siteDetails.siteName}
                  onChange={handleEditChange}
                  id=""
                  className="border border-gray-400 rounded-md p-2"
                  placeholder="Site name"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Address 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={siteDetails.address1}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Address 1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Address 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={siteDetails.address2}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Address 1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={siteDetails.city}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="City"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={siteDetails.state}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="State/Province"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Zip/Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={siteDetails.pinCode}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Zip/Pin Code"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={siteDetails.country}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Country"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={siteDetails.latitude}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Latitude"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={siteDetails.longitude}
                    onChange={handleEditChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Longitude"
                  />
                </div>
               
              </div>
            </div>
            <div className="flex justify-center gap-2 my-2 border-t p-1">
              <button
                onClick={handleEditAssociatedSites}
                className="bg-green-400 flex gap-2 items-center p-1 px-2 rounded-md text-white"
              >
                <FaCheck /> Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-400 flex gap-2 items-center p-1 px-2 rounded-md text-white"
              >
                <MdClose /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-xl w-[30rem]">
            <div className="flex justify-center border-b">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-center ">
                <PiPlusCircleFill /> Add Associated Sites
              </h2>
            </div>
            <div className="max-h-96 overflow-y-auto hide-scrollbar">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="font-medium">
                  Site name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  id=""
                  className="border border-gray-400 rounded-md p-2"
                  placeholder="Site name"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Address 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Address 1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Address 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address2"
                    onChange={handleChange}
                    value={formData.address2}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Address 1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="City"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="State/Province"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Zip/Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Zip/Pin Code"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Country"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Latitude"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    id=""
                    className="border border-gray-400 rounded-md p-2"
                    placeholder="Longitude"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 my-2 border-t p-1">
              <button
                onClick={handleAddAssociatedSite}
                className="bg-green-400 flex gap-2 items-center p-1 px-2 rounded-md text-white"
              >
                <FaCheck /> Save
              </button>
              <button
                onClick={() => setIsModalOpen1(false)}
                className="bg-red-400 flex gap-2 items-center p-1 px-2 rounded-md text-white"
              >
                <MdClose /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AssociatedSites;
