import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getSetupUsers,
  postFitoutCategoriesSetup,
  postHelpDeskCategoriesSetup,
} from "../../api";

const FitoutCategory = ({ handleToggleCategoryPage, setCatAdded }) => {
  const [engineers, setEngineers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    assigned_id: "",
    tat: "",
    document: []
  });

  const [catFile, setCatFile] = useState([]);

  console.log("file", catFile);

  const themeColor = useSelector((state) => state.theme.color);

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

  const handleFileChange = (fileList, fieldName) => {
    const newFiles = Array.from(fileList); // Convert FileList to array
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: [...(prevFormData[fieldName] || []), ...newFiles],
    }));
    console.log("Updated FormData: ", formData);
  };
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const siteId = getItemInLocalStorage("SITEID");

  const handleAddCategory = async () => {
    if (formData.category === "") {
      return toast.error("Please provide category");
    }
    const sendData = new FormData();
    // sendData.append("fit_out_setup_category[society_id]", siteId);
    // sendData.append("fit_out_setup_category[of_phase]", "pms");
    sendData.append("fit_out_setup_category[name]", formData.name);
    sendData.append("fit_out_setup_category[tat]", formData.minTat);

    sendData.append(
      "fit_out_setup_category[assigned_id]",
      formData.assigned_id
    );
    (formData.documents || []).forEach((file, index) => {
      sendData.append("attachfiles[]", file);
      // console.log(documents)
    });
    try {
      const resp = await postFitoutCategoriesSetup(sendData);
      setCatAdded(true);
      handleToggleCategoryPage();
      setFormData({ ...formData, category: "", minTat: "", engineer: [] });
      toast.success("Added Sucessfully!");
    } catch (error) {
      console.log(error);
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
  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">Dynamic FAQ Form</h1> */}
      <div className="grid md:grid-cols-3 gap-4 ">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Enter Category </label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            placeholder="Enter Category"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="font-medium">Select Engineer</label>
          <select
            className="border p-2 w-full rounded-md"
            value={formData.assigned_id} 
            onChange={handleChange}
            name="assigned_id"
          >
            <option value="">Select Engineer</option>
            {engineers.map((engineer) => (
              <option value={engineer.id} key={engineer.id}>
                {engineer.firstname} {engineer.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Response Time (min)</label>
          <input
            type="number"
            className="border p-2 w-full rounded-md"
            placeholder="Response Time"
            value={formData.minTat}
            onChange={handleChange}
            name="minTat"
          />
        </div> */}
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files, "documents")}
          multiple={true}
        />
      </div>
      <div className="flex justify-center my-2 gap-4">
        <button
          className=" font-semibold hover:bg-black hover:text-white transition-all  p-2 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          style={{ background: themeColor }}
          onClick={handleAddCategory}
        >
          Add
        </button>
        <button
          onClick={handleToggleCategoryPage}
          className="  px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>

      {/* <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          isPagination={true}
        /> */}
    </div>
  );
};

export default FitoutCategory;
