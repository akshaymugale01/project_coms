import React, { useState } from "react";
import { BiEdit, BiEditAlt } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { Switch } from "../../../../Buttons";
import { FaQrcode, FaRegFileAlt } from "react-icons/fa";
import AssetQrCode from "./AssetQrCode";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import {
  domainPrefix,
  getAssetparamsDetails,
  postAssetparams,
} from "../../../../api";
import toast from "react-hot-toast";
import Table from "../../../../components/table/Table";
import { SendDateFormat } from "../../../../utils/dateUtils";
import EditAssetParams from "./EditAssetParams";
const initialFormData = {
  name: "",
  order: "",
  digit: "",
  below: "",
  above: "",
  dashboard_view: false,
  consumption_view: false,
};

const Assetinfo = ({ assetData }) => {
  const { id } = useParams();
  const [assetBreakdown, setAssetBreakdown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    digit: "",
    dashboard_view: false,
    consumption_view: false,
    asset_id: id,
    alert_below: "",
    alert_above: "",
    min_val: "",
    max_val: "",
    check_prev: false,
    unit_type:"",
    multiplier_factor:"",
  });

  const {
    floor_name,
    building_name,
    longitude,
    name,
    latitude,
    asset_number,
    equipemnt_id,
    unit_name,
    serial_number,
    model_number,
    purchased_on,
    purchase_cost,
    warranty_expiry,
    critical,
    breakdown,
    is_meter,
    active,
    remarks,
    created_at,
    updated_at,
    description,
    capacity,
    warranty_start,
    asset_params,
    installation,
    group_name,
    sub_group_name,
    uom,
  } = assetData;
  const [qrCode, setQrCode] = useState(false);
  const [paramsId, setParamsId] = useState("");
  const [page, setPage] = useState("consumption");
  console.log(assetData);

  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleToggle = () => {
    setAssetBreakdown(!breakdown);
  };

  const [editParams, setEditParams] = useState(false);

  const handleEditParameter = async (id) => {
    setEditParams(true);
    setParamsId(id);
  };

  const assetParmsColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditParameter(row.id)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    { name: "Name", selector: (row) => row.name },
    { name: "Sequence", selector: (row) => row.order },
    { name: "Unit Type", selector: (row) => row.unit_type },
    { name: "Charactor Limit", selector: (row) => row.digit },
    { name: "Alert Below", selector: (row) => row.alert_below },
    { name: "Alert Above", selector: (row) => row.alert_above },
    { name: "Min", selector: (row) => row.min_val },
    { name: "Max", selector: (row) => row.max_val },
    { name: "Multiplier Factor", selector: (row) => row.multiplier_factor },
    {
      name: "Dashboard view",
      selector: (row) => (row.dashboard_view ? "Yes" : "No"),
    },
    {
      name: "Consumption view",
      selector: (row) => (row.consumption_view ? "Yes" : "No"),
    },
    {
      name: "Check prev Readings",
      selector: (row) => (row.check_prev ? "Yes" : "No"),
    },
    {
      name: "created on",
      selector: (row) => dateFormat(row.created_at),
    },
    {
      name: "Updated on",
      selector: (row) => dateFormat(row.updated_at),
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
    cells: {
      style: {
        fontWeight: "bold",
        fontSize: "10px",
        textAlign: "center",
      },
    },
  };

  const handleAssetParamsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddConsumptionMeasure = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Adding Asset params Please wait!");
      const response = await postAssetparams(formData);
      console.log("Asset Created successfully:", response);
      // setFormData({});
      toast.dismiss();
      toast.success("Asset Params added successfully");
      // setFormData(initialAddAssetFormData);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error Creating Asset!");
    }
  };

  // const domainPrefix = "https://admin.vibecopilot.ai";

  return (
    <section>
      <div className="m-2">
        <div className="border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400">
          <div className=" flex sm:flex-row flex-col gap-5 justify-between ">
            {/* <button className="border-2 px-4 p-1 rounded-full text-blue-500 flex gap-2 items-center hover:bg-blue-500 hover:text-white border-blue-500 justify-center transition-all duration-500">
              <CgAdd />
              Add PPM
            </button> */}
            <div className="flex items-center gap-2 ">
              {/* modify switch */}
              {/* <p>Breakdown</p>
              <Switch checked={!breakdown} onChange={handleToggle} />
              <p>In use</p> */}
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <button
                className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full hover:bg-black hover:text-white transition-all duration-500"
                onClick={() => setQrCode(true)}
              >
                <FaQrcode /> QR Code
              </button>
              <Link
                to={`/assets/edit-asset/${id}`}
                className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full  hover:bg-black hover:text-white transition-all duration-500"
              >
                <BiEditAlt />
                Edit Details
              </Link>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Location Details
            </h2>
            <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
              {/* <div className="grid grid-cols-2 items-center">
                <p>Site :</p>
                <p className="text-sm font-normal "></p>
              </div> */}
              <div className="grid grid-cols-2">
                <p>Building : </p>
                <p className="text-sm font-normal">{building_name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Floor : </p>
                <p className="text-sm font-normal">{floor_name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Unit : </p>
                <p className="text-sm font-normal">{unit_name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Latitude : </p>
                <p className="text-sm font-normal">{latitude}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Longitude : </p>
                <p className="text-sm font-normal">{longitude}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b text-xl border-black font-semibold">
              Asset Information
            </h2>
            <div className="my-5 md:px-10 items-center font-medium grid gap-5 md:grid-cols-3 text-sm">
              {/* <div className="grid grid-cols-2 items-center">
                <p>Client Name :</p>
                <p className="text-sm font-normal"></p>
              </div> */}
              <div className="grid grid-cols-2 items-center">
                <p>Asset Name : </p>
                <p className="text-sm font-normal">{name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Asset Number : </p>
                <p className="text-sm font-normal"> {asset_number}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Equipment Id : </p>
                <p className="text-sm font-normal"> {equipemnt_id}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Model Number : </p>
                <p className="text-sm font-normal"> {model_number}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Serial Number :</p>
                <p className="text-sm font-normal"> {serial_number}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Purchased on : </p>
                <p className="text-sm font-normal">{purchased_on}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Date Of Installation : </p>
                <p className="text-sm font-normal">{installation}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Breakdown : </p>
                <p className="text-sm font-normal">
                  {breakdown ? "Yes" : "No"}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <p>Capacity : </p>
                <p className="text-sm font-normal">{capacity}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>UOM : </p>
                <p className="text-sm font-normal">{uom}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Purchase Cost : </p>
                <p className="text-sm font-normal">{purchase_cost}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Group : </p>
                <p className="text-sm font-normal">{group_name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Subgroup : </p>
                <p className="text-sm font-normal">{sub_group_name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Critical : </p>
                <p className="text-sm font-normal">{critical ? "Yes" : "No"}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Meter Applicable : </p>
                <p className="text-sm font-normal">{is_meter ? "Yes" : "No"}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Created On : </p>
                <p className="text-sm font-normal">{dateFormat(created_at)}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Updated On : </p>
                <p className="text-sm font-normal">{dateFormat(updated_at)}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Additional Info
            </h2>
            <div className="flex  flex-col my-2 gap-2">
              <p className="font-medium">Comments : </p>
              <div className="bg-gray-400 p-1 text-white rounded-md">
                {remarks ? (
                  <div>
                    {remarks === "null" ? (
                      <h2>No Comments</h2>
                    ) : (
                      <h2>{remarks}</h2>
                    )}
                  </div>
                ) : (
                  <div className="text-center w-full">No Comments</div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Description : </p>
              <div className="bg-gray-400 p-1 text-white rounded-md">
                {description ? (
                  <div>
                    {description === "null" ? (
                      <h2>No Description</h2>
                    ) : (
                      <h2>{description}</h2>
                    )}
                  </div>
                ) : (
                  <div className="text-center w-full">No Description</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Warranty Details
            </h2>
            <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-3 w-full">
              <div className="grid grid-cols-2 items-center">
                <p>Warranty Start Date :</p>
                <p className="text-sm">{warranty_start} </p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Expiry Date : </p>
                <p className="text-sm">{warranty_expiry}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Attachments
            </h2>
            <div className="flex md:flex-row flex-col justify-between gap-2 w-full">
              <div className="bg-gray-100 p-1 rounded-md my-2 px-2 w-96">
                <p className="text-center font-medium">Purchase Invoice</p>
                <div className="flex  gap-4 justify-center my-4 items-center text-center">
                  {assetData.purchase_invoices &&
                  assetData.purchase_invoices.length > 0 ? (
                    assetData.purchase_invoices.map((invoice, index) => (
                      <div key={invoice.id} className="">
                        {isImage(domainPrefix + invoice.document) ? (
                          <img
                            src={domainPrefix + invoice.document}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-auto cursor-pointer"
                            onClick={() =>
                              window.open(
                                domainPrefix + invoice.document,
                                "_blank"
                              )
                            }
                          />
                        ) : (
                          <a
                            href={domainPrefix + invoice.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attachment-link hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center  "
                          >
                            <FaRegFileAlt size={50} />
                            {getFileName(invoice.document)}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center w-full">No Attachments</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-100 p-1 rounded-md my-2 px-2 w-96">
                <p className="text-center font-medium">Insurance</p>
                <div className="flex  gap-4 justify-center my-4 items-center text-center">
                  {assetData.insurances && assetData.insurances.length > 0 ? (
                    assetData.insurances.map((insurance, index) => (
                      <div key={insurance.id} className="">
                        {isImage(domainPrefix + insurance.document) ? (
                          <img
                            src={domainPrefix + insurance.document}
                            alt={`Attachment ${index + 1}`}
                            className="w-40 h-28 object-cover rounded-md"
                            onClick={() =>
                              window.open(
                                domainPrefix + insurance.document,
                                "_blank"
                              )
                            }
                          />
                        ) : (
                          <a
                            href={domainPrefix + insurance.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attachment-link hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center  "
                          >
                            <FaRegFileAlt size={50} />
                            {getFileName(insurance.document)}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center w-full">No Attachments</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-100 p-1 rounded-md my-2 px-2 w-96">
                <p className="text-center font-medium">Manuals</p>
                <div className="flex  gap-4 justify-center my-4 items-center text-center">
                  {assetData.manuals && assetData.manuals.length > 0 ? (
                    assetData.manuals.map((manual, index) => (
                      <div key={manual.id} className="">
                        {isImage(domainPrefix + manual.document) ? (
                          <img
                            src={domainPrefix + manual.document}
                            alt={`Attachment ${index + 1}`}
                            className="w-40 h-28 object-cover rounded-md"
                            onClick={() =>
                              window.open(
                                domainPrefix + manual.document,
                                "_blank"
                              )
                            }
                          />
                        ) : (
                          <a
                            href={domainPrefix + manual.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attachment-link hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center  "
                          >
                            <FaRegFileAlt size={50} />
                            {getFileName(manual.document)}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center w-full">No Attachments</p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-1 rounded-md my-2 px-2 ">
              <p className="text-center font-medium">Other Files</p>
              <div className="flex  gap-4 flex-wrap my-4 items-center  text-center">
                {assetData.other_files && assetData.other_files.length > 0 ? (
                  assetData.other_files.map((other, index) => (
                    <div key={other.id} className="">
                      {isImage(domainPrefix + other.document) ? (
                        <img
                          src={domainPrefix + other.document}
                          alt={`Attachment ${index + 1}`}
                          className="w-40 h-28 object-cover rounded-md"
                          onClick={() =>
                            window.open(domainPrefix + other.document, "_blank")
                          }
                        />
                      ) : (
                        <a
                          href={domainPrefix + other.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attachment-link hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center  "
                        >
                          <FaRegFileAlt size={50} />
                          {getFileName(other.document)}
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center w-full">No Attachments</p>
                )}
              </div>
            </div>
            <div className="flex w-full  m-2">
              <div className="flex w-full md:flex-row flex-col space-x-4 border-b border-gray-400">
                <h2
                  className={`p-2 px-4 ${
                    page === "consumption"
                      ? "text-blue-500 font-medium  shadow-custom-all-sides"
                      : "text-black"
                  } rounded-t-md  cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                  onClick={() => setPage("consumption")}
                >
                  CONSUMPTION ASSET MEASURE
                </h2>
                <h2
                  className={`p-2 ${
                    page === "nonconsumption"
                      ? "text-blue-500 font-medium  shadow-custom-all-sides"
                      : "text-black"
                  } rounded-t-md  cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                  onClick={() => setPage("nonconsumption")}
                >
                  NON CONSUMPTION ASSET MEASURE
                </h2>
              </div>
            </div>

            {page === "consumption" && (
              <div className="p-5">
                <h2 className="border-b  text-xl border-black font-semibold my-3">
                  Consumption Parameter
                </h2>
                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full py-2">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium">
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="order" className="font-medium">
                    Sequence :
                    </label>
                    <input
                      type="text"
                      name="order"
                      id="order"
                      value={formData.order || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Enter Sequence"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="unit" className="font-medium">
                      Unit Type :
                    </label>
                    <input
                      type="text"
                      name="unit_type"
                      id="unit"
                      value={formData.unit_type || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Enter Unit Type"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="charactorLimt" className="font-medium">
                      Input Character Limit :
                    </label>
                    <input
                      type="text"
                      name="digit"
                      value={formData.digit || ""}
                      onChange={handleAssetParamsChange}
                      id="charactorLimit"
                      placeholder="Input Character Limit"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bleow" className="font-medium">
                      Alert Below :
                    </label>
                    <input
                      type="text"
                      name="alert_below"
                      id="below"
                      value={formData.alert_below}
                      onChange={handleAssetParamsChange}
                      placeholder="Alert Below Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="above" className="font-medium">
                      Alert Above :
                    </label>
                    <input
                      type="text"
                      name="alert_above"
                      id="above"
                      value={formData.alert_above}
                      onChange={handleAssetParamsChange}
                      placeholder="Alert Above Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="min" className="font-medium">
                      Min :
                    </label>
                    <input
                      type="text"
                      name="min_val"
                      id="min"
                      value={formData.min_val}
                      onChange={handleAssetParamsChange}
                      placeholder="Min Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium">
                      Max :
                    </label>
                    <input
                      type="text"
                      name="max_val"
                      id="above"
                      value={formData.max_val}
                      onChange={handleAssetParamsChange}
                      placeholder="Max Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="Multiplier" className="font-medium">
                    
                    Multiplier Factor :
                    </label>
                    <input
                      type="text"
                      name="multiplier_factor"
                      id="Multiplier"
                      value={formData.multiplier_factor}
                      onChange={handleAssetParamsChange}
                      placeholder="Multiplier Factor"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  {/* <div className="grid grid-cols-3 gap-4 my-4"> */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="dashboard_view"
                      id="dashboard_view"
                      checked={formData.dashboard_view || false}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          dashboard_view: !prevState.dashboard_view,
                        }))
                      }
                    />
                    <label htmlFor="dashboard_view">Dashboard View</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="consumption_view"
                      id="consumption_view"
                      checked={formData.consumption_view || false}
                      // onClick={() => setMeterApplicable(!meterApplicable)}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          consumption_view: !prevState.consumption_view,
                        }))
                      }
                    />
                    <label htmlFor="consumption_view">Consumption View</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="check_prev"
                      id="check_prev"
                      checked={formData.check_prev || false}
                      // onClick={() => setMeterApplicable(!meterApplicable)}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          check_prev: !prevState.check_prev,
                        }))
                      }
                    />
                    <label htmlFor="check_prev">Check previous Reading</label>
                  </div>
                  {/* </div> */}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-black p-1 px-4 font-medium text-white rounded-md"
                    onClick={handleAddConsumptionMeasure}
                  >
                    Add
                  </button>
                </div>
                <div className="border-b-2 my-2 border-gray-400" />
              </div>
            )}
            {page === "nonconsumption" && (
              <div className="p-5">
                <h2 className="border-b  text-xl border-black font-semibold my-3">
                  Non Consumption Parameter
                </h2>
                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full py-2">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium">
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="order" className="font-medium">
                      Sequence :
                    </label>
                    <input
                      type="text"
                      name="order"
                      id="order"
                      value={formData.order || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Enter Sequence"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="unit" className="font-medium">
                      Unit Type :
                    </label>
                    <input
                      type="text"
                      name="unit_type"
                      id="unit"
                      value={formData.unit_type || ""}
                      onChange={handleAssetParamsChange}
                      placeholder="Enter Unit Type"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="charactorLimt" className="font-medium">
                      Input Character Limit :
                    </label>
                    <input
                      type="text"
                      name="digit"
                      value={formData.digit || ""}
                      onChange={handleAssetParamsChange}
                      id="charactorLimit"
                      placeholder="Input Character Limit"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bleow" className="font-medium">
                      Alert Below :
                    </label>
                    <input
                      type="text"
                      name="alert_below"
                      id="below"
                      value={formData.alert_below}
                      onChange={handleAssetParamsChange}
                      placeholder="Alert Below Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="above" className="font-medium">
                      Alert Above :
                    </label>
                    <input
                      type="text"
                      name="alert_above"
                      id="above"
                      value={formData.alert_above}
                      onChange={handleAssetParamsChange}
                      placeholder="Alert Above Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="min" className="font-medium">
                      Min :
                    </label>
                    <input
                      type="text"
                      name="min_val"
                      id="min"
                      value={formData.min_val}
                      onChange={handleAssetParamsChange}
                      placeholder="Min Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium">
                      Max :
                    </label>
                    <input
                      type="text"
                      name="max_val"
                      id="above"
                      value={formData.max_val}
                      onChange={handleAssetParamsChange}
                      placeholder="Max Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="Multiplier" className="font-medium">
                    
                    Multiplier Factor :
                    </label>
                    <input
                      type="text"
                      name="multiplier_factor"
                      id="Multiplier"
                      value={formData.multiplier_factor}
                      onChange={handleAssetParamsChange}
                      placeholder="Multiplier Factor"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  {/* <div className="grid grid-cols-3 gap-4 my-4"> */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="dashboard_view"
                      id="dashboard_view"
                      checked={formData.dashboard_view || false}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          dashboard_view: !prevState.dashboard_view,
                        }))
                      }
                    />
                    <label htmlFor="dashboard_view">Dashboard View</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="consumption_view"
                      id="consumption_view"
                      checked={formData.consumption_view || false}
                      // onClick={() => setMeterApplicable(!meterApplicable)}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          consumption_view: !prevState.consumption_view,
                        }))
                      }
                    />
                    <label htmlFor="consumption_view">Consumption View</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="check_prev"
                      id="check_prev"
                      checked={formData.check_prev || false}
                      // onClick={() => setMeterApplicable(!meterApplicable)}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          check_prev: !prevState.check_prev,
                        }))
                      }
                    />
                    <label htmlFor="check_prev">Check previous Reading</label>
                  </div>
                  {/* </div> */}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-black p-1 px-4 font-medium text-white rounded-md"
                    onClick={handleAddConsumptionMeasure}
                  >
                    Add
                  </button>
                </div>
                <div className="border-b-2 my-2 border-gray-400" />
              </div>
            )}
          </div>
          <Table
            columns={assetParmsColumn}
            data={asset_params}
            isPagination={true}
          />
        </div>
        {qrCode && (
          <AssetQrCode
            assetId={id}
            assetName={name}
            building={building_name}
            floor={floor_name}
            unit={unit_name}
            onClose={() => setQrCode(false)}
            QR={domainPrefix + assetData.qr_code_image_url}
          />
        )}
        {editParams && (
          <EditAssetParams
            id={paramsId}
            assetId={id}
            onclose={() => setEditParams(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Assetinfo;
