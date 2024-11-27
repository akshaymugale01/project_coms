import React, { useEffect, useState } from "react";
import Detail from "../../../../containers/Detail";
import { useSelector } from "react-redux";
import { getAMCDetails, getVendors, postAMC } from "../../../../api";
import FileInputBox from "../../../../containers/Inputs/FileInputBox";
import { Link, useParams } from "react-router-dom";
import Table from "../../../../components/table/Table";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const AMCDetails = () => {
  const today = new Date().toISOString().split("T")[0];
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = String(toDay.getMonth() + 1).padStart(2, "0");
  const day = String(toDay.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const { id } = useParams();
  const [vendors, setVendors] = useState([]);
  const [amcDetails, setAmcDetails] = useState([]);
  const [update, setUpdate] = useState(false);
  const initialFormData = {
    vendor_id: "",
    asset_id: id,
    start_date: formattedDate,
    end_date: formattedDate,
    frequency: "",
    terms: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  // console.log(formData)

  // vendor_id, :asset_id, :start_date, :end_date, :frequency},
  // terms: [multipart-files]}

  useEffect(() => {
    const fetchVendors = async () => {
      const vendorResp = await getVendors();
      setVendors(vendorResp.data);
    };
    const fetchAMCDetails = async () => {
      const amcResponse = await getAMCDetails(id);
      setAmcDetails(amcResponse.data);
      console.log(amcResponse);
    };
    fetchVendors();
    fetchAMCDetails();
    console.log(amcDetails.asset_name);
  }, [update]);

  const handlePostAMC = async () => {
    if (formData.start_date >= formData.end_date) {
      toast.error(" Start Date must be before End Date.");
      return;
    }
   

    if (!formData.vendor_id) {
      return toast.error("Please select supplier");
    }
    if (!formData.start_date || !formData.end_date) {
      return toast.error("Please select start and end date");
    }

    try {
      const dataToSend = new FormData();
      dataToSend.append("asset_amc[vendor_id]", formData.vendor_id);
      dataToSend.append("asset_amc[asset_id]", formData.asset_id);
      dataToSend.append("asset_amc[start_date]", formData.start_date);
      dataToSend.append("asset_amc[end_date]", formData.end_date);
      dataToSend.append("asset_amc[frequency]", formData.frequency);
      formData.terms.forEach((file) => dataToSend.append("terms[]", file));
      const res = await postAMC(dataToSend);
      console.log(res);
      setFormData(initialFormData);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setUpdate(true);
      toast.success("New AMC Added");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/asset/asset-amc/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/assets/edit-amc/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Vendor ",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
  ];

  return (
    <section>
      <div className="m-2">
        <div className="border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="border-b  text-xl border-black font-semibold">
            AMC Details
          </h2>

          <Table columns={columns} data={amcDetails} />
        </div>
        <div className="flex flex-col">
          <h2 className="border-b  text-xl border-black font-semibold">
            Add AMC
          </h2>
          <div className="grid md:grid-cols-3 gap-5 py-2">
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium">
                Vendor <span className="text-red-500">*</span>
              </label>
              <select
                name="vendor_id"
                id=""
                value={formData.vendor_id}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option value={vendor.id} key={vendor.id}>
                    {vendor.company_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md"
                // min={today}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md"
                // min={today}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium">
                Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Frequency</option>
                <option value="one Time">One Time</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half yearly">Half yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="border-b  text-xl border-black font-semibold my-2">
              Upload AMC Terms
            </h2>
            <FileInputBox
              handleChange={(event) => handleFileChange(event, "terms")}
            />
          </div>
          <div className="flex justify-center my-5">
            <button
              className="bg-black p-1 px-4 text-white rounded-md"
              onClick={handlePostAMC}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default AMCDetails;
