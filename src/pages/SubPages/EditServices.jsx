import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  domainPrefix,
  EditSoftServices,
  getFloors,
  getSoftServicesDetails,
  getUnits,
  postSoftServices,
} from "../../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Select from "react-select";
import Navbar from "../../components/Navbar";
const EditService = () => {
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    site_id: "",
    building_id: "",
    floor_id: "",
    unit_id: "",
    user_id: "",
    name: "",
    // wing_id: "",
    // area_id: "",
    attachments: [],
  });
  console.log(formData);
  const buildings = getItemInLocalStorage("Building");

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const ServiceDetailsResponse = await getSoftServicesDetails(id);
      setFormData(ServiceDetailsResponse.data);
      fetchFloor(ServiceDetailsResponse.data.building_id);
      getUnit(ServiceDetailsResponse.data.floor_id);
      console.log(ServiceDetailsResponse);
      const selectedUnits = ServiceDetailsResponse.data.units.map((unit) => ({
        value: unit.id,
        label: unit.name,
      }));
      setSelectedOption(selectedUnits);
    };

    const fetchFloor = async (floorID) => {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    };
    const getUnit = async (UnitID) => {
      try {
        const unit = await getUnits(UnitID);
        // setUnits(unit.data.map((item) => ({ name: item.name, id: item.id })));
        // console.log(unit);
        const unitList = unit.data.map((uni) => ({
          value: uni.id,
          label: uni.name,
        }));
        setUnits(unitList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceDetails();
  }, []);

  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    async function getUnit(UnitID) {
      try {
        const unit = await getUnits(UnitID);
        // setUnits(unit.data.map((item) => ({ name: item.name, id: item.id })));
        // console.log(unit);
        const unitList = unit.data.map((uni) => ({
          value: uni.id,
          label: uni.name,
        }));
        setUnits(unitList);
      } catch (error) {
        console.log(error);
      }
    }

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "floor_name"
    ) {
      const UnitID = Number(e.target.value);
      await getUnit(UnitID);
      setFormData({
        ...formData,
        floor_id: UnitID,
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

  const handleEditService = async () => {
    if (!formData.name || !formData.building_id || !formData.floor_id) {
      return toast.error("All fields are required.");
    }

    try {
      toast.loading("Editing Service Please Wait!");
      const dataToSend = new FormData();
      dataToSend.append("soft_service[site_id]", formData.site_id);
      dataToSend.append("soft_service[name]", formData.name);
      dataToSend.append("soft_service[building_id]", formData.building_id);
      dataToSend.append("soft_service[floor_id]", formData.floor_id);
      selectedOption.forEach((option) => {
        dataToSend.append("soft_service[unit_id][]", option.value);
      });
      dataToSend.append("soft_service[user_id]", formData.user_id);
      (formData.attachments || []).forEach((file, index) => {
        dataToSend.append(`attachfiles[]`, file);
      });
      const serviceResponse = await EditSoftServices(dataToSend, id);
      console.log(serviceResponse);
      toast.dismiss();
      toast.success("Service Edited Successfully");
      navigate(`/services/service-details/${id}`);
    } catch (error) {
      toast.error("Error Creating Service");
      console.log(error);
      toast.dismiss();
    }
  };

  const [selectedOption, setSelectedOption] = useState([]);
  var handleChangeSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  return (
    <section className="flex ">
      <Navbar />
      <div className="p-4 overflow-hidden w-full  flex  flex-col">
        <div className="">
          <div className="md:mx-20 my-5 md:mb-10 sm:border border-gray-400 p-5  rounded-lg ">
            <h2
              style={{ background: "rgb(3 19 37)" }}
              className="text-center text-xl font-bold p-2 bg-black rounded-md text-white"
            >
              Edit Service
            </h2>
            <div className="grid md:grid-cols-3 gap-4 my-5">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold">
                  Service Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Service Name"
                  className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
                />
              </div>
              {/* <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Select Site:
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                value={formData.site_id}
                name="site_id"
                onChange={handleChange}
              >
                <option value="">Select Site</option>
                <option value="unit1">Site 1</option>
                <option value="unit2">Site 2</option>
                <option value="unit2">Site 3</option>
              </select>
            </div> */}
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold">
                  Select Building:
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.building_id}
                  onChange={handleChange}
                  name="building_id"
                >
                  <option value="">Select Building</option>
                  {buildings?.map((building) => (
                    <option value={building.id} key={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Floor:
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.floor_id}
                  onChange={handleChange}
                  name="floor_name"
                >
                  <option value="">Select Floor</option>
                  {floors?.map((floor) => (
                    <option value={floor.id} key={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Units:
                </label>

                <Select
                  value={selectedOption}
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={handleChangeSelect}
                  options={units}
                  noOptionsMessage={() => "No Units Available"}
                  //   maxMenuHeight={90}
                  placeholder="Select Units"
                />
              </div>
            </div>
            <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
              Attachments
            </h2>

            {/* Show previously uploaded attachments if any */}
            {Array.isArray(formData.attachments) &&
              formData.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold mb-2">Previously Uploaded:</p>
                  <ul className="list-disc list-inside">
                    {formData.attachments.map((file, idx) => (
                      <div key={idx} className="mb-2">
                        {/* Existing file from backend */}
                        {"document" in file ? (
                          <>
                            <a
                              href={domainPrefix + file.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {/* {file.document.split("/").pop()} */}
                              <img
                                src={domainPrefix + file.document}
                                alt={file.document.split("/").pop()}
                                style={{
                                  maxWidth: "120px",
                                  marginTop: "4px",
                                  borderRadius: "6px",
                                }}
                              />
                            </a>
                          </>
                        ) : (
                          // New file from local (File object)
                          <>
                            <span className="text-gray-700">{file.name}</span>
                            <div>
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                  maxWidth: "120px",
                                  marginTop: "4px",
                                  borderRadius: "6px",
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              )}

            <FileInputBox
              handleChange={(files) => handleFileChange(files, "attachments")}
              fieldName={"attachments"}
              isMulti={true}
            />
            <div className="flex my-5 justify-center">
              <button
                style={{ background: "rgb(3 19 37)" }}
                className="bg-black text-white p-1 px-4 rounded-md font-medium"
                onClick={handleEditService}
              >
                Save & Show Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditService;
