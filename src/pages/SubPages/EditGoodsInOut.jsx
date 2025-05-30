import React, { useEffect, useState } from "react";
import {
    domainPrefix,
  getExpectedVisitor,
  getGoodsDetails,
  getStaff,
  postGoods,
  putGoodsDetails,
} from "../../api";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Select from "react-select";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "lucide-react";
const EditGoodsInOut = () => {
  const { id } = useParams(); // get the record ID from the URL
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
  const [prevFiles, setPrevFiles] = useState([]);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const visitorRes = await getExpectedVisitor();
        const visitorData = visitorRes.data.map((visitor) => ({
          value: visitor.id,
          label: visitor.name,
        }));
        setVisitors(visitorData);
      } catch (error) {
        console.log(error);
      }
    };

    console.log("visitors", visitors);
    const fetchStaff = async () => {
      try {
        const staffRes = await getStaff();
        const staffData = staffRes.data.map((staff) => ({
          value: staff.id,
          label: ` ${staff.firstname} ${staff.lastname}`,
        }));
        setStaff(staffData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchGoodsDetails = async () => {
      try {
        const res = await getGoodsDetails(id); // You need to implement this API call
        const data = res.data;

        setFormData({
          visitorId: data.visitor_id || "",
          noOfGoods: data.no_of_goods || "",
          wardType: data.ward_type || "",
          vehicleNumber: data.vehicle_no || "",
          personName: data.person_name || "",
          staffId: data.staff_id || "",
          description: data.description || "",
          documents: [], // You may want to handle existing docs differently
        });

        // Set selected visitor/staff for react-select
        if (data.visitor_id) {
          setSelectedVisitor({
            value: data.visitor_id,
            label: data.visitor_name,
          });
        }
        if (data.staff_id) {
          setSelectedStaff({ value: data.staff_id, label: data.staff_name });
        }
        setWard(data.ward_type || "in");
        setType(data.visitor_id ? "visitor" : "staff");
        setPrevFiles(data.goods_files || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGoodsDetails();
    fetchStaff();
    fetchVisitor();
  }, [id]);
  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  useEffect(() => {
    if (visitors.length && formData.visitorId) {
      const match = visitors.find((v) => v.value === formData.visitorId);
      setSelectedVisitor(match || null);
    }
  }, [visitors, formData.visitorId]);

  const handleVisitorSelection = (selectedOption) => {
    console.log(selectedOption);
    setSelectedVisitor(selectedOption);
  };
  const handleStaffSelection = (selectedOption) => {
    setSelectedStaff(selectedOption);
  };
  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate();

  const handleEditGoodsInOut = async () => {
    if ((!selectedVisitor && !selectedStaff) || !formData.noOfGoods) {
      return toast.error("Please Provide all the data!");
    }
    const postData = new FormData();
    const visitorId = selectedVisitor.value;
    postData.append("goods_in_out[visitor_id]", visitorId);

    postData.append("goods_in_out[no_of_goods]", formData.noOfGoods);
    postData.append("goods_in_out[description]", formData.description);
    postData.append("goods_in_out[ward_type]", ward);
    postData.append("goods_in_out[vehicle_no]", formData.vehicleNumber);
    postData.append("goods_in_out[person_name]", formData.personName);
    const staffId = selectedStaff.value;
    postData.append("goods_in_out[staff_id]", staffId);
    postData.append("goods_in_out[created_by_id]", userId);
    formData.documents.forEach((docs) => {
      postData.append("goods_files[]", docs);
    });
    try {
      await putGoodsDetails(id, postData); // You need to implement this API call
      toast.success("Goods updated successfully");
      navigate("/admin/passes/goods-in-out");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <p className="font-medium">Inward/Outward :</p>
                <div className="flex gap-5">
                  <h2
                    onClick={() => setWard("in")}
                    className={`rounded-full cursor-pointer p-1 px-5 border-gray-400 border ${
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
                    value={selectedVisitor}
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
                    noOptionsMessage={() => "Visitors nor available..."}
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
              <label className="font-semibold">Documents</label>

              {/* Show previously uploaded files */}
              {prevFiles.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-2">
                  {prevFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-2">
                      <a
                        href={domainPrefix + file.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {/* {file.document.split("/").pop().split("?")[0]} */}
                      </a>
                      <img
                        src={domainPrefix + file.document}
                        alt="Uploaded"
                        className="w-24 h-25 object-cover rounded border"
                      />
                      {/* Optional: Delete button */}
                      {/* <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleRemovePrevFile(file.id)}
                      >
                        Remove
                      </button> */}
                    </div>
                  ))}
                </div>
              )}

              <FileInputBox
                handleChange={(files) => handleFileChange(files, "documents")}
                fieldName={"documents"}
                isMulti={true}
              />
            </div>

            <div className="flex gap-5 justify-center items-center my-4">
              <button
                type="submit"
                onClick={handleEditGoodsInOut}
                className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
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

export default EditGoodsInOut;
