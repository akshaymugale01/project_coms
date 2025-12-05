import React, { useEffect, useState } from "react";
import ModalWrapper from "../../../containers/modals/ModalWrapper";
import { BiEdit, BiSolidEdit } from "react-icons/bi";
import { EditSiteDetails, getCompanies, getSiteDetails } from "../../../api";
import { id } from "date-fns/locale";
import { AiOutlineClose } from "react-icons/ai";
import { Switch } from "../../../Buttons";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { features } from "../../../utils/features";
import toast from "react-hot-toast";
const EditSite = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [feats, setFeats] = useState(
    features.map((feature) => ({
      value: feature,
      label: feature,
    }))
  );
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    companyId: "",
    siteName: "",
    region: "",
    active: true,
  });
  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const siteDetailsResp = await getSiteDetails(id);
        console.log(siteDetailsResp.data);
        const formattedSelectedFeatures = siteDetailsResp.data.feature.map(
          (feature) => ({
            value: feature.feature_name,
            label: feature.feature_name,
          })
        );

        setSelectedOption(formattedSelectedFeatures);
        setFormData({
          ...formData,
          siteName: siteDetailsResp.data.name,
          region: siteDetailsResp.data.region,

          active: siteDetailsResp.data.region,
        });
      } catch (error) {
        console.log(error);
      }
    };

   
    const fetchCompanies = async () => {
      try {
        const companyResp = await getCompanies();
        console.log(companyResp);
        setCompanies(companyResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
    fetchSiteDetails();
  }, [id]);
  const handleChangeSelectMeeting = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    setFormData({ ...formData, features: selectedOption });
    setFeats(selectedOption);
  };
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()
  const handleEditSite = async () => {
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
      const resp = await EditSiteDetails(id,sendData);
      console.log(resp.data.id);
      toast.success("Site edited successfully")
      navigate(`/setup/account/site/site-details/${id}`)
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
        Edit Site
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
              value={selectedOption}
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
            onClick={handleEditSite}
          >
           Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSite;
