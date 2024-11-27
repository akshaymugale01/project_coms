import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { getFloors, getUnits, getFilterData, getAssignedTo } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
const TicketFilterModal = ({
  onclose,
  setFilteredData,
  fetchData,
  currentPage,
  perPage,
}) => {
  const building = getItemInLocalStorage("Building");
  const [floor, setFloor] = useState([]);
  const [unitName, setUnitName] = useState([]);
  const categories = getItemInLocalStorage("categories");
  const statuses = getItemInLocalStorage("STATUS");
  const [assignedUser, setAssignedUser] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    issueStatusId: "",
    priorityLevel: "",
    assign: "",
    createBy: "",
    building_id: "",
    floor_id: "",
    unit_id: "",
    startDate: "",
    endDate: "",
  });
  const buildingChange = async (e) => {
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        // console.log("units n", build.data);
        setFloor(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    async function getUnit(UnitID) {
      try {
        const unit = await getUnits(UnitID);
        setUnitName(
          unit.data.map((item) => ({ name: item.name, id: item.id }))
        );
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
    } else if (e.target.type === "select-one" && e.target.name === "floor_id") {
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

  const handleFilterData = async () => {
    // Split created_by by space
    try {
      const [firstName = "", lastName = ""] = (formData.createBy || "").split(
        " "
      );
      const response = await getFilterData(
        formData.category_id,
        formData.issueStatusId,
        formData.priorityLevel,
        formData.assign,

        firstName,
        lastName,
        formData.building_id,
        formData.floor_id,
        formData.unit_id,
        formData.startDate,
        formData.endDate
      );
      console.log(response);
      setFilteredData(response.data.complaints);
      onclose();
    } catch (error) {
      console.error("Error filter Data:", error);
    }
  };

  const handleReset = () => {
    fetchData(currentPage, perPage);
    onclose();
  };
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        setAssignedUser(response.data);
        // setEditTicketInfo(response.data);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAssignedTo();
  }, []);

  return (
    <ModalWrapper onclose={onclose}>
      <div className="w-full max-w-4xl mx-auto overflow-hidden flex flex-col space-y-5">
        <div className="border-b border-gray-300 pb-3">
          <h2 className="text-xl font-bold text-gray-700">Filter By</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto px-5 w-full hide-scrollbar">
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-gray-600">
              Building Name
            </label>
            <select
              id="builiding_name"
              value={formData.building_id}
              name="building_id"
              onChange={buildingChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Building</option>
              {building?.map((build) => (
                <option key={build.id} value={build.id}>
                  {build.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-gray-600">
              Floor Name
            </label>
            <select
              value={formData.floor_id}
              name="floor_id"
              onChange={buildingChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Floor</option>
              {floor?.map((floorId) => (
                <option
                  key={floorId.id}
                  // onClick={() => console.log("checking-category")}
                  value={floorId.id}
                >
                  {floorId.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-gray-600">
              Unit Name
            </label>
            <select
              id="six"
              value={formData.unit_id}
              name="unit_id"
              onChange={buildingChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Unit </option>
              {unitName?.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="create_date"
              className="font-semibold text-gray-600"
            >
              Date Start
            </label>
            <input
              type="date"
              id="create_date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="create_date"
              className="font-semibold text-gray-600"
            >
              Date End
            </label>
            <input
              type="date"
              id="create_date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            />
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="create_by" className="font-semibold text-gray-600">
              Created By
            </label>
            <input
              type="text"
              id="create_by"
              name="createBy"
              value={formData.createBy}
              onChange={handleChange}
              placeholder="Created By"
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            />
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold text-gray-600">
              Category
            </label>
            <select
              id="category"
              value={formData.category_id}
              name="category_id"
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex flex-col">
            <label
              htmlFor="sub_category"
              className="font-semibold text-gray-600"
            >
              Sub Category
            </label>
            <select
              id="sub_category"
              name="sub_category"
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Sub Category</option>
            </select>
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-semibold text-gray-600">
              Status
            </label>
            <select
              value={formData.issueStatusId}
              name="issueStatusId"
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Status</option>
              {statuses?.map((status) => (
                <option value={status.id} key={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="priority_level"
              className="font-semibold text-gray-600"
            >
              Priority Level
            </label>
            <select
              id="priority_level"
              value={formData.priorityLevel}
              name="priorityLevel"
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Priority Level</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
              <option value="P5">P5</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="assigned_to"
              className="font-semibold text-gray-600"
            >
              Assigned To
            </label>
            <select
              id="assigned_to"
              value={formData.assign}
              name="assign"
              onChange={handleChange}
              className="border p-2 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Assign To</option>
              {assignedUser?.map((assign) => (
                <option key={assign.id} value={assign.id}>
                  {assign.firstname} {assign.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-5 border-t border-gray-300 mt-5">
          <button
            className="bg-gray-600 text-white rounded-md px-6 py-2 hover:bg-gray-700"
            onClick={handleFilterData}
          >
            Filter
          </button>
          <button
            className="border border-gray-400 rounded-md px-6 py-2 hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TicketFilterModal;
