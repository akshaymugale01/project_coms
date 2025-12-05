import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch } from "../../../Buttons";
import { getAllFeature, getCompanies, postSite } from "../../../api";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { features } from "../../../utils/features";
const AddSite = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedOption, setSelectedOption] = useState([]);
  const [companies, setCompanies] = useState([])
  const [feats, setFeats] = useState(features);
  const [formData, setFormData] = useState({
    companyId: "",
    siteName: "",
    region: "",
    active: true,
    
  });
  console.log(formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  var handleChangeSelectMeeting = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };
  useEffect(() => {
    const formattedFeatures = features.map((feature) => ({
        value: feature,
        label: feature,
      }));
      setFeats(formattedFeatures);
    const fetchCompanies = async()=>{
        try {
            const companyResp = await getCompanies()
            console.log(companyResp)
            setCompanies(companyResp.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchCompanies()
    // fetchAllFeatures();
  }, []);
const navigate = useNavigate()
  const handleCreateSite = async () => {
    if (
      formData.companyId === "" ||
      formData.siteName === "" ||
      formData.region === "" 
 
    ) {
      toast.error("All fields are required!");
    }
    const featureList = selectedOption.map((feat) => feat.value);
    const sendData = new FormData();
    sendData.append("site[company_id]", formData.companyId);
    sendData.append("site[name]", formData.siteName);
    sendData.append("site[region]", formData.region);
    const allowedFeat = featureList.join(",");
    sendData.append("features[]", featureList);
    try {
      const resp = await postSite(sendData);
      console.log(resp);
      toast.success("Site created successfully")
      navigate("/setup/account/site")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:px-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
      <h2
        style={{ background: themeColor }}
        className="text-center text-xl font-bold p-2 rounded-full text-white"
      >
        Create New Site
      </h2>
      <div className="md:mx-16 my-5 mb-10  p-5 px-10 rounded-lg sm:shadow-custom-all-sides">
        <div className="flex sm:flex-row flex-col justify-around items-center">
          <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Select Company :
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.companyId}
                name="companyId"
              >
                <option value="">Select Company</option>
                {companies?.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                  <option value="29">company 1</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                id="name"
                onChange={handleChange}
                value={formData.siteName}
                placeholder="Enter Site Name"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Region
              </label>
              <input
                type="text"
                name="region"
                id="name"
                onChange={handleChange}
                value={formData.region}
                placeholder="Enter Region"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <Select
              isMulti
              onChange={handleChangeSelectMeeting}
              options={feats}
              noOptionsMessage={() => "No Feature available..."}
              className="rounded-md"
              // maxMenuHeight={90}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "black",
                }),
                clearIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "red",
                }),
                dropdownIndicator: (baseStyles) => ({
                  ...baseStyles,
                  color: "black",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "darkblue",
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  color: state.isFocused ? "red" : "gray",
                  backgroundColor: state.isFocused ? "black" : "lightgreen",
                }),
              }}
              menuPosition={"fixed"}
              placeholder={"Select Features"}
            />
            <div className="flex gap-4 items-center">
              <p>Inactive</p>
              <Switch
                checked={formData.active}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    active: !prevState.active,
                  }))
                }
              />
              <p>Active</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:mt-8 my-4">
          <button
            className="font-medium p-1 px-2 text-white rounded-md"
            style={{ background: themeColor }}
            onClick={handleCreateSite}
          >
            Create Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSite;
