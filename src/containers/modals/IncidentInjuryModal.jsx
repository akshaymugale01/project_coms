import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { MdClose } from "react-icons/md";
import { FaCheck, FaTrash } from "react-icons/fa";
import { PiPlusCircleBold } from "react-icons/pi";
import { postInjurydata, getInjured } from "../../api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const IncidentInjuryModal = ({ onclose ,onsave }) => {
  const { id } = useParams();

  const [incident, setIncident] = useState([{ name: "", mobile: "" }]);
  const [injury, setInjury] = useState();
  const [injuryType, setInjuryType] = useState("");
  const [whoGotInjured, setWhoGotInjured] = useState("");
  const [whoGotInjuredOptions, setWhoGotInjuredOptions] = useState([]);

  const [companyName, setCompanyName] = useState("");
  console.log(whoGotInjured);
  const handleAddIncident = (event) => {
    event.preventDefault();
    setIncident([...incident, { name: "", mobile: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newIncident = [...incident];
    newIncident[index][name] = value;
    setIncident(newIncident);
  };

  const handleRemoveIncident = (index) => {
    const newIncident = [...incident];
    newIncident.splice(index, 1);
    setIncident(newIncident);
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  // Validate Injury Type
  if (!injuryType) {
    toast.error("Please select injury type");
    return;
  }

  // Validate Who Got Injured
  if (!whoGotInjured) {
    toast.error("Please select who got injured");
    return;
  }

  // Validate at least one incident
  if (incident.length === 0) {
    toast.error("Please add at least one injured person");
    return;
  }

  // Validate each incident row
  for (let i = 0; i < incident.length; i++) {
    const item = incident[i];

    if (!item.name?.trim()) {
      toast.error(`Please enter name`);
      return;
    }

    if (!item.mobile?.trim()) {
      toast.error(`Please enter mobile number`);
      return;
    }

    // Mobile validation (10 digit example)
    if (!/^[0-9]{10}$/.test(item.mobile)) {
      toast.error(`Enter valid 10-digit mobile number`);
      return;
    }

    if (!item.companyName?.trim()) {
      toast.error(`Please enter company name`);
      return;
    }
  }

  const data = {
    incident_id: id,
    injuries: incident.map((item) => ({
      injury_type: injuryType,
      injury_number: "",
      lost_time: "",
      who_got_injured: whoGotInjured,
      name: item.name,
      company_name: item.companyName,
      mobile: item.mobile,
    })),
  };

  postInjurydata(data)
    .then((response) => {
      toast.success("Injury data submitted successfully!");
      onclose();
    })
    .catch((error) => {
      toast.error("Error submitting injury data");
      console.error(error);
    });
};


  const fetchInjuredData = async () => {
    try {
      const res = await getInjured("injury");
      const whoGotInjuredOptions = res.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setWhoGotInjured(whoGotInjuredOptions[0].name);
      setWhoGotInjuredOptions(whoGotInjuredOptions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchInjuredData();
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[80%]  md:w-auto w-96 p-2 pt-4 px-4 flex flex-col rounded-xl gap-2">
        <h1 className="font-semibold text-center text-xl border-b flex items-center gap-2 justify-center">
          <PiPlusCircleBold /> Add Injury
        </h1>
        <div className="overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-2 z-10">
            {incident.map((incident1, index) => (
              <div key={index} className="bg-green-50 rounded-md p-1 border-b">
                <div className="grid gap-x-5 gap-y-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm font-medium">
                      Injury Type
                    </label>
                    <select
                      name="injuryType"
                      id={injuryType}
                      className="border p-2 border-gray-400 rounded-md w-full"
                      onChange={(event) => setInjuryType(event.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Head">Head</option>
                      <option value="Neck">Neck</option>
                      <option value="Nose">Nose</option>
                      <option value="Tongue">Tongue</option>
                      <option value="Arms">Arms</option>
                      <option value="Legs">Legs</option>
                      <option value="Eye">Eye</option>
                      <option value="Ears">Ears</option>
                      <option value="Skin">Skin</option>
                      <option value="Mouth">Mouth</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm font-medium">
                      Who got injured
                    </label>
                    <select
                      name="whoGotInjured"
                      value={whoGotInjured}
                      onChange={(event) => setWhoGotInjured(event.target.value)}
                      className="border p-2 border-gray-400 rounded-md w-full"
                    >
                      <option value="">Select </option>
                      {Array.isArray(whoGotInjuredOptions) &&
                        whoGotInjuredOptions.map((level) => (
                          <option
                            value={level.name}
                            id={level.id}
                            key={level.id}
                          >
                            {level.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 my-1">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={incident1.name}
                      onChange={(event) => handleInputChange(index, event)}
                      className="border rounded-md border-gray-400 p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Mobile"
                      value={incident1.mobile}
                      onChange={(event) => handleInputChange(index, event)}
                      className="border rounded-md border-gray-400 p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="company"
                      placeholder="Company"
                      value={incident1.companyName}
                      onChange={(event) => handleInputChange(index, event)}
                      className="border rounded-md border-gray-400 p-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-b">
                  <button
                    className="bg-red-400 p-2 px-4 text-white rounded-md my-2"
                    onClick={() => handleRemoveIncident(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <button
                className="bg-gray-800 p-2 px-4 text-white rounded-md flex items-center gap-2"
                onClick={handleAddIncident}
              >
                <PiPlusCircleBold /> Add More
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 border-t p-1">
          <button
            className="bg-gray-400 text-white p-2 px-4 rounded-full flex items-center gap-2"
            onClick={() => onclose()}
          >
            <MdClose /> Cancel
          </button>
          <button
            className="bg-indigo-800 text-white p-2 px-4 rounded-full flex items-center gap-2"
            onClick={handleSubmit}
          >
            <FaCheck /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default IncidentInjuryModal;