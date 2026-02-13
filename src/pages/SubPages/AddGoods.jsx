import React, { useEffect, useState } from "react";
import { getExpectedVisitor, getStaff, postGoods } from "../../api";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Select from "react-select";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AddGoods = () => {
  const [visitors, setVisitors] = useState([]);
  const [staff, setStaff] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedVisitor, setSelectedVisitor] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [type, setType] = useState("visitor");
  const [ward, setWard] = useState("in");
  const [formData, setFormData] = useState({
    visitorId: "",
    noOfGoods: "",
    wardType: "",
    vehicleNumber: "",
    personName: "",
    staffId: "",
    description: "",
    documents: [],
  });

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const visitorRes = await getExpectedVisitor();

        const visitorData =
          visitorRes?.data?.visitors?.map((visitor) => ({
            value: visitor.id,
            label: visitor.name,
          })) || [];

        setVisitors(visitorData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStaff = async () => {
      try {
        const staffRes = await getStaff();

        const staffData =
          staffRes?.data?.staffs?.map((staff) => ({
            value: staff.id,
            label: `${staff.firstname} ${staff.lastname}`,
          })) || [];

        setStaff(staffData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaff();
    fetchVisitor();
  }, []);
  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  const handleVisitorSelection = (selectedOption) => {
    // console.log(selectedOption);
    setSelectedVisitor(selectedOption);
  };
  const handleStaffSelection = (selectedOption) => {
    setSelectedStaff(selectedOption);
  };
  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate();
  const handleAddGoodsInOut = async () => {
    if ((type === "visitor" && !selectedVisitor) || (type === "staff" && !selectedStaff) || !formData.noOfGoods) {
      return toast.error("Please Provide all the data!");
    }
    const postData = new FormData();

    if (type === "visitor" && selectedVisitor) {
      postData.append("goods_in_out[visitor_id]", selectedVisitor.value);
    }

    if (type === "staff" && selectedStaff) {
      postData.append("goods_in_out[staff_id]", selectedStaff.value);
    }

    postData.append("goods_in_out[no_of_goods]", formData.noOfGoods);
    postData.append("goods_in_out[description]", formData.description);
    postData.append("goods_in_out[ward_type]", ward);
    postData.append("goods_in_out[vehicle_no]", formData.vehicleNumber);
    postData.append("goods_in_out[person_name]", formData.personName);
    postData.append("goods_in_out[created_by_id]", userId);
    formData.documents.forEach((docs) => {
      postData.append("goods_files[]", docs);
    });
    try {
      const postRes = await postGoods(postData);
      console.log(postRes);
      toast.success("Goods added successfully");
      navigate("/admin/passes/goods-in-out");
    } catch (error) {
      console.log(error);
    }
  };
const handleChange = (e) => {
  let { name, value } = e.target;

  if (name === "vehicleNumber") {
   
    value = value.replace(/[^a-zA-Z0-9]/g, "");
  }

  setFormData({ ...formData, [name]: value });
};

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className=" w-full flex md:mx-3 flex-col overflow-hidden">
        <div className="flex justify-center items-center my-2 w-full md:p-2">
          <div className="md:border border-gray-300 rounded-lg md:p-4 p-2 w-full md:mx-4">
            <h2
              className="text-center md:text-xl font-bold p-2 bg-black rounded-lg mb-4 text-white"
              style={{ background: "rgb(3 19 37)" }}
            >
              Add Goods
            </h2>
            <div className="grid lg:grid-cols-3">
              <div className="lg:flex grid grid-cols-2 items-center gap-5 my-2">
                <p className="font-medium">Type :</p>
                <div className="flex gap-5">
                  <h2
                    onClick={() => setType("visitor")}
                    className={`rounded-full cursor-pointer p-1 px-5 border-gray-400 border ${
                      type === "visitor" && "bg-black text-white font-medium"
                    }`}
                  >
                    Visitor
                  </h2>
                  <h2
                    onClick={() => setType("staff")}
                    className={`rounded-full p-1 cursor-pointer px-5 border-gray-400 border ${
                      type === "staff" && "bg-black text-white font-medium"
                    }`}
                  >
                    Staff
                  </h2>
                </div>
              </div>
              <div className="lg:flex grid grid-cols-2 items-center gap-5 my-2">
                <p className="font-medium px-2">Inward/Outward :</p>
                <div className="flex gap-5">
                  <h2
                    onClick={() => setWard("in")}
                    className={`rounded-full cursor-pointer p-2 py-1  px-2 border-gray-400 border ${
                      ward === "in" && "bg-black text-white font-medium"
                    }`}
                  >
                    Inward
                  </h2>
                  <h2
                    onClick={() => setWard("out")}
                    className={`rounded-full p-1 cursor-pointer px-5 border-gray-400 border ${
                      ward === "out" && "bg-black text-white font-medium"
                    }`}
                  >
                    Outward
                  </h2>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5 my-2">
              {type === "visitor" ? (
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="firstName" className="font-semibold">
                    Select Visitor
                  </label>
                  <Select
                    options={visitors}
                    onChange={handleVisitorSelection}
                    noOptionsMessage={() => "Visitors not available..."}
                  />
                </div>
              ) : (
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="firstName" className="font-semibold">
                    Select Staff
                  </label>
                  <Select
                    options={staff}
                    onChange={handleStaffSelection}
                    noOptionsMessage={() => "Staff not available..."}
                  />
                </div>
              )}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="goodsQty" className="font-semibold">
                  No. of goods
                </label>
                <input
                  type="goodsQty"
                  id="goodsQty"
                  name="noOfGoods"
                  value={formData.noOfGoods}
                  onChange={handleChange}
                  placeholder="Enter number"
                  className="border p-2 rounded-md border-gray-300"
                  pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="grid gap-2 items-center w-full">
                <label htmlFor="vehicleNumber" className="font-semibold">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Enter vehicle number"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                name="description"
                id=""
                value={formData.description}
                onChange={handleChange}
                cols="30"
                rows="3"
                className="border p-2 rounded-md border-gray-300"
              ></textarea>
            </div>

            <div className="grid gap-2 items-center w-full mt-2">
              <label htmlFor="" className="font-semibold">
                Documents
              </label>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "documents")}
                fieldName={"documents"}
                isMulti={true}
              />
            </div>

            <div className="flex gap-5 justify-end items-center my-5">
                <button
                type="submit"
                onClick={()=>navigate("/admin/passes/goods-in-out")}
                className="text-white bg-gray-400 hover:bg-white hover:text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:border-1 border-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAddGoodsInOut}
                className="text-white bg-indigo-600  border-2 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddGoods;
