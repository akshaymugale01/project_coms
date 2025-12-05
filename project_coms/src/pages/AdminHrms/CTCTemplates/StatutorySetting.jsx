import React, { useState } from "react";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { useSelector } from "react-redux";

const StatutorySetting = () => {
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [taxStatFields, setTaxStatFields] = useState([]);
  const [statData, setStatData] = useState({});

  useEffect(() => {
    const fetchTaxStat = async () => {
      try {
        const res = await getTaxAndStatSetting(hrmsOrgId);
        setTaxStatFields(res);
        const initialStatData = res.reduce((acc, field) => {
          acc[field.id] =
            field.value_type === "boolean"
              ? field.default_value === "true"
              : field.default_value;
          return acc;
        }, {});

        setStatData(initialStatData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTaxStat();
  }, []);
  const handleStatChange = (id, event, valueType) => {
    const updatedValue =
      valueType === "boolean"
        ? event.target.value === "true"
        : event.target.value;
    setStatData({
      ...statData,
      [id]: updatedValue,
    });
  };

  console.log(statData);
  const handlePostTaxStatutory = async () => {
    const taxData = Object.entries(statData).map(([key, value]) => ({
      employee: 1,
      master_id: key,
      value: String(value),
    }));
    try {
      const res = await postTaxAndStatSetting(taxData);
      setPage("CTC Components");
    } catch (error) {
      console.log(error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div>
      {taxStatFields.map((field) => (
        <div key={field.id} className="flex gap-2 flex-col my-2">
          <label className="block text-gray-700 font-medium">
            {field.label}
          </label>
          {field.value_type === "boolean" && (
            <div className="flex gap-4 items-center">
              <label className="flex gap-2">
                <input
                  type="radio"
                  name={`boolean-${field.id}`}
                  value="true" // String "true"
                  checked={statData[field.id] === true} // Boolean check
                  onChange={(e) => handleStatChange(field.id, e, "boolean")}
                />
                Yes
              </label>
              <label className="flex gap-2">
                <input
                  type="radio"
                  name={`boolean-${field.id}`}
                  value="false" // String "false"
                  checked={statData[field.id] === false} // Boolean check
                  onChange={(e) => handleStatChange(field.id, e, "boolean")}
                />
                No
              </label>
            </div>
          )}
          {field.value_type === "number" && (
            <input
              type="number"
              value={statData[field.id]}
              onChange={(e) => handleStatChange(field.id, e, "number")}
              placeholder="Enter PF wage"
              className="border w-full border-gray-500 p-2 rounded-md"
            />
          )}
          {field.value_type === "string" && (
            <input
              type="text"
              value={statData[field.id]}
              onChange={(e) => handleStatChange(field.id, e, "string")}
              placeholder="Enter text"
              className="border w-full border-gray-500 p-2 rounded-md"
            />
          )}
          {field.value_type === "drop down" && (
            <select
              name=""
              id=""
              value={statData[field.id]}
              onChange={(e) => handleStatChange(field.id, e, "string")}
              className="border w-full border-gray-500 p-2 rounded-md"
            >
              <option value="">Select Template</option>
              <option value="temp">Template</option>
            </select>
          )}
        </div>
      ))}
      <div className="flex justify-center items-center ">
        <button
          style={{ background: themeColor }}
          className="text-white p-2 rounded-md"
          onClick={handlePostTaxStatutory}
        >
          Save & Proceed
        </button>
      </div>
    </div>
  );
};

export default StatutorySetting;
