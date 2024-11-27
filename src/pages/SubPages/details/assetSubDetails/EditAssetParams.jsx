import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editAssetparamsDetails, getAssetparamsDetails } from "../../../../api";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";

const EditAssetParams = ({ id, assetId, onclose }) => {
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    digit: "",
    unit_type: "",
    dashboard_view: false,
    consumption_view: false,
    asset_id: assetId,
    alert_below: "",
    alert_above: "",
    min_val: "",
    max_val: "",
    multiplier_factor: "",
    check_prev: false,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const params = await getAssetparamsDetails(id);
        setFormData({
          ...formData,
          name: params.data.name,
          dashboard_view: params.data.dashboard_view,
          consumption_view: params.data.consumption_view,
          order: params.data.order,
          unit_type: params.data.unit_type,
          digit: params.data.digit,
          alert_above: params.data.alert_above,
          alert_below: params.data.alert_below,
          min_val: params.data.min_val,
          max_val: params.data.max_val,
          multiplier_factor: params.data.multiplier_factor,
          check_prev: params.data.check_prev,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const handleAssetParamsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditConsumptionMeasure = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Editing Asset params Please wait!");
      const response = await editAssetparamsDetails(id, formData);

      // setFormData({});
      toast.dismiss();
      toast.success("Asset Params edited successfully");
      // setFormData(initialAddAssetFormData);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Error Editing Asset Params!");
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
        <button className="place-self-end" onClick={onclose}>
          <AiOutlineClose size={20} />
        </button>
        <h2 className="border-b flex items-center gap-2 text-xl border-black font-semibold">
          <BiEditAlt /> Edit Consumption Parameter
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
              placeholder="Enter Order"
              className="border p-1 px-4 border-gray-500 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unitType" className="font-medium">
              Unit Type :
            </label>
            <input
              type="text"
              name="unit_type"
              id="unitType"
              value={formData.unit_type || ""}
              onChange={handleAssetParamsChange}
              placeholder="Enter Order"
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
            onClick={handleEditConsumptionMeasure}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssetParams;
