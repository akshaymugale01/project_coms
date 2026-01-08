import React, { useEffect, useState } from "react";
import {
  domainPrefix,
  getFacitilitySetupId,
  postFacitilitySetup,
  updateFacitilitySetup,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
// import { Navbar } from "@material-tailwind/react";
import Navbar from "../../components/Navbar";
import { FaCheck, FaTrash } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";

const EditHotelSetup = () => {
  const { id } = useParams();
  const [allowMultipleSlots, setAllowMultipleSlots] = useState("no");
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [dates, setDates] = useState({
    hotel: {
      book_before: "",
      cancel_before: "",
      advance_booking: "",
    },
  });
  const handleSelectChange = (e) => {
    setAllowMultipleSlots(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const sitID = getItemInLocalStorage("SITEID");
  const navigate = useNavigate();
  // const initialCgstNo = "";
  // const initialSgst = "";
  // const initialGst = Number(initialCgstNo) + Number(initialSgst);
  const [formData, setFormData] = useState({
    hotel: {
      site_id: sitID,
      fac_type: "",
      fac_name: "",
      member_charges: "",
      disclaimer: "",
      cancellation_policy: "",
      cutoff_min: "",
      return_percentage: "",
      create_by: "",
      active: true,
      is_hotel: true,
      member_price_adult: "",
      member_price_child: "",
      guest_price_adult: "",
      guest_price_child: "",
      tenant_price_child: "",
      tenant_price_adult: "",
      consecutive_slot_allowed: false,
      no_of_days: 0,
      min_people: "",
      max_people: "",
      prepaid: false,
      postpaid: false,
      fixed_amount: 0,
      terms: "",
      gst_no: 0,
      sgst: 0,
      book_before: "",
      book_before_days: "",
      book_before_hours: "",
      book_before_minutes: "",
      advance_days: "",
      advance_hours: "",
      advance_minutes: "",
      cancel_before: "",
      advance_booking: "",
      cancel_before_days: "",
      cancel_before_hours: "",
      cancel_before_minutes: "",
      deposit: "",
      description: "",
      max_slots: "",
      member: false,
      guest: false,
      tenant: false,
    },
    covers: [],
    attachments: [],
  });

  console.log("DATA:", formData);

  // const fecthFacitySetup = async() => {
  //   try {
  //    const fetchAPI = await getFacitilitySetup()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fecthFacitySetup();
  // },[]) // [] for

  // Fetch the facility details for the specific ID
  const fetchFacilityBooking = async () => {
    try {
      const response = await getFacitilitySetupId(id); // API call
      if (!response.data) {
        throw new Error("Invalid response from API");
      }

      const facility = response.data;

      console.log("facility", facility);

      if (facility) {
        const defaultTime = ["0 days, 0 hours, 0 minutes", { days: 0, hours: 0, minutes: 0 }, 0];

        const bookBefore = Array.isArray(facility.book_before) ? facility.book_before : defaultTime;
        const cancelBefore = Array.isArray(facility.cancel_before) ? facility.cancel_before : defaultTime;
        const advanceBooking = Array.isArray(facility.advance_booking) ? facility.advance_booking : defaultTime;


        setDates({
          hotel: {
            book_before: bookBefore,
            cancel_before: cancelBefore,
            advance_booking: advanceBooking,
          },
        });
        setFormData({
          hotel: {
            site_id: facility.site_id || "",
            fac_type: facility.fac_type || "",
            fac_name: facility.fac_name || "",
            member_charges: facility.member_charges || "",
            book_before: bookBefore,
            book_before_days: bookBefore[1].days,
            book_before_hours: bookBefore[1].hours,
            book_before_mins: bookBefore[1].minutes,
            cancel_before_days: cancelBefore[1].days,
            cancel_before_hours: cancelBefore[1].hours,
            cancel_before_mins: cancelBefore[1].minutes,
            advance_booking: advanceBooking,               
            advance_days: advanceBooking[1].days,
            advance_hours: advanceBooking[1].hours,
            advance_minutes:advanceBooking[1].minutes ,
            disclaimer: facility.disclaimer || "",
            cancellation_policy: facility.cancellation_policy || "",
            cutoff_min: facility.cutoff_min || "",
            return_percentage: facility.return_percentage || "",
            create_by: facility.create_by || "",
            active: facility.active || true,
            member_price_adult: facility.member_price_adult || "",
            member_price_child: facility.member_price_child || "",
            guest_price_adult: facility.guest_price_adult || "",
            guest_price_child: facility.guest_price_child || "",
            tenant_price_child: facility.tenant_price_child || "",
            tenant_price_adult: facility.tenant_price_adult || "",
            min_people: facility.min_people || "",
            max_people: facility.max_people || "",
            cancel_before: cancelBefore,
            terms: facility.terms || "",
            gst_no: facility.gst_no || "",
            sgst: facility.sgst || "",
            consecutive_slot_allowed:
              facility.consecutive_slot_allowed || false,
            no_of_days: facility.no_of_days || "",
            deposit: facility.deposit || "",
            description: facility.description || "",
            max_slots: facility.max_slots || "",
            fixed_amount: facility.fixed_amount || 0,
            guest: facility.guest || false,
            member: facility.member || false,
            tenant: facility.tenant || false,
            prepaid: facility.prepaid || false,
            postpaid: facility.postpaid || false,
            status: facility.status || "",
            payment_methods: facility.payment_methods || [],
          },
          covers: facility.covers || [],
          attachments: facility.attachments || [],
        });
      } else {
        setError("Facility not found.");
      }
    } catch (error) {
      console.error("Error fetching facility details:", error);
      setError(
        error.message || "Failed to fetch facility details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilityBooking();
  }, [id]); // Trigger when ID changes

  const updateAmenitiesSetup = async () => {
    const postData = new FormData();

    // Append hotel fields
  Object.entries(formData.hotel).forEach(([key, value]) => {
    // Handle arrays like payment_methods separately
    if (Array.isArray(value)) {
      value.forEach((item) => {
        postData.append(`amenity[${key}][]`, item); // For arrays
      });
    } else {
      postData.append(`amenity[${key}]`, value); // For regular fields
    }
  });


    // Append payment methods as an array
    if (
      formData.hotel.payment_methods &&
      formData.hotel.payment_methods.length > 0
    ) {
      formData.hotel.payment_methods.forEach((method) => {
        postData.append("amenity[payment_methods][]", method);
      });
    }

    // Append cover images
    if (formData.covers.length > 0) {
      formData.covers.forEach((file, index) => {
        if (file instanceof File) {
          postData.append(`cover_images[]`, file); // Key as "cover_images[index]"
        } else {
          console.error("Invalid cover file:", file);
        }
      });
    }

    // Append attachments
    if (formData.attachments.length > 0) {
      formData.attachments.forEach((file, index) => {
        if (file instanceof File) {
          postData.append(`attachments[]`, file); // Key as "attachments[index]"
        } else {
          console.error("Invalid attachment file:", file);
        }
      });
    }

    try {
      if (!id) {
        throw new Error("Amenity ID is missing.");
      }

      const response = await updateFacitilitySetup(postData, id); // Ensure this API call is correct
      console.log(response);

      toast.success("Updated successfully!");
      navigate("/setup/facility");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update hotel setup. Please try again.");
    }
  };

  const handleCheckboxChange = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      hotel: {
        ...prevState.hotel,
        [type]: prevState.hotel[type] === null ? true : null, // Toggle between true and null
      },
    }));
  };

  const handlePriceChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      hotel: {
        ...prevState.hotel,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData((prev) => ({
      ...prev,
      [fieldName]: files, // Save File instances
    }));
  };

  const handleHotelChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        [field]: value,
      },
    }));
  };

  // Handle input change
const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => {
    // Update the specific field
    const updatedFormData = {
      ...prevData,
      hotel: {
        ...prevData.hotel,
        [name]: value,
      },
    };
    // Split name into parts: ["book", "before", "days"] → field = "book_before", unit = "days"
    // Dynamically calculate total minutes for time fields
    const calculateTotalMinutes = (prefix) => {
      const days = parseInt(updatedFormData.hotel[`${prefix}_days`]) || 0;
      const hours = parseInt(updatedFormData.hotel[`${prefix}_hours`]) || 0;
      const minutes = parseInt(updatedFormData.hotel[`${prefix}_mins`]) || 0;
      return days * 24 * 60 + hours * 60 + minutes;
    };
    if (name.includes("book_before")) {
      updatedFormData.hotel.book_before = calculateTotalMinutes("book_before");
    } else if (name.includes("advance")) {
      updatedFormData.hotel.advance_booking = calculateTotalMinutes("advance");
    } else if (name.includes("cancel_before")) {
      updatedFormData.hotel.cancel_before =
        calculateTotalMinutes("cancel_before");
    }

    return updatedFormData;
  });
};

  /*const [rules, setRules] = useState([{ selectedOption: "", timesPerDay: "" }]);
    const options = ["Flat", "User", "Tenant", "Owner"];
    const handleAddRule = () => {
      if (rules.length < 5) {
        setRules([...rules, { selectedOption: "", timesPerDay: "" }]);
      }
    };
    const handleOptionChange = (index, field, value) => {
      const updatedRules = rules.map((rule, i) =>
        i === index ? { ...rule, [field]: value } : rule
      );
      setRules(updatedRules);
    };
  
    const handleRemoveRule = (index) => {
      const updatedRules = rules.filter((_, i) => i !== index);
      setRules(updatedRules);
    };*/
  //new
  const [rules, setRules] = useState([{ timesPerDay: "", selectedOption: "" }]);

  const options = ["Members", "Guests", "Tenant", "Staff", "Others"];

  const handleOptionChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleAddRule = () => {
    if (rules.length < 4) {
      setRules([...rules, { timesPerDay: "", selectedOption: "" }]);
    }
  };

  const [blockData, setBlockData] = useState({
    blockBy: "",
  });

  const handelRadioChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      amenity: {
        ...prev.amenity,
        fac_type: value,
      },
    }));
  };

  const removeImage = (index) => {
    const updatedCovers = formData.covers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      covers: updatedCovers,
    });
  };

  const removeAttachment = (index) => {
    const updatedAttachments = formData.attachments.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      attachments: updatedAttachments,
    });
  };

  // const handleSlotTimeChange = (index, timeType, timeValue) => {

  //     const [hours, minutes] = timeValue.split(":");

  //     setFormData(prevState => {
  //         const updatedSlots = [...prevState.slots];
  //         updatedSlots[index] = {
  //             ...updatedSlots[index],
  //             [`${timeType}_hr`]: hours,
  //             [`${timeType}_min`]: minutes,
  //         };
  //         return { ...prevState, slots: updatedSlots };
  //     });
  // };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        description: value, // Update description in the state
      },
    });
  };

  //handle tearms
  const handleTermsChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        terms: value, // Update terms in the state
      },
    });
  };

  // Handle cancellation policy change
  const handleCancellationPolicyChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        cancellation_policy: value, // Update cancellation policy in the state
      },
    });
  };

  //Validate 2 Inputs
  const validateInput = (e) => {
    const { name, value } = e.target;
    const intValue = parseInt(value);

    if (isNaN(intValue) || intValue < 0) {
      toast.error(`${name.replace("_", " ")} must be a positive number.`);
      return;
    }

    if (name.includes("days") && intValue > 365) {
      toast.error(`${name.replace("_", " ")} cannot exceed 365 days.`);
      return
    } else if (name.includes("hours") && intValue > 24) {
      toast.error(`${name.replace("_", " ")} cannot exceed 24 hours.`);
      return
    } else if (name.includes("minutes") && intValue > 59) {
      toast.error(`${name.replace("_", " ")} cannot exceed 59 minutes.`);
      return
    }
  };
  const handelPayemntRadioChange = (e) => {
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      hotel: {
        ...prevState.hotel,
        prepaid: value === "prepaid",
        postpaid: value === "postpaid",
      },
    }));
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full p-4 mb-5">
        <h1
          style={{ background: "rgb(17, 24, 39)" }}
          className="bg-black text-white font-semibold rounded-md text-center p-2"
        >
          Setup Edit Hotel Facility
        </h1>

        <div className="flex  gap-4 my-4">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              id="bookable"
              value="bookable"
              checked={formData.hotel.fac_type === "bookable"}
              onChange={handelRadioChange}
            />
            <label htmlFor="bookable" className="text-lg">
              Bookable
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              id="request"
              value="request"
              onChange={handelRadioChange}
              checked={formData.hotel.fac_type === "request"}
            />
            <label htmlFor="request" className="text-lg">
              Request
            </label>
          </div>
        </div>

        <div>
          <h2 className="border-b border-black text-lg  font-medium my-3">
            Facility Details
          </h2>
          <div className="grid md:grid-cols-4 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Facility name
              </label>
              <input
                type="text"
                name="fac_name"
                id=""
                value={formData.hotel.fac_name}
                onChange={(e) =>
                  handleHotelChange(e.target.name, e.target.value)
                }
                className="border border-gray-400 rounded-md p-2"
                placeholder="Facility name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="active" className="font-medium">
                Active
              </label>
              <select
                name="active"
                id="active"
                className="border rounded-md border-gray-400 p-2"
                value={formData.hotel.active ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    hotel: {
                      ...prevData.hotel,
                      active: e.target.value === "true",
                    },
                  }))
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="flex gap-4 border-b border-black items-center mt-4">
            <span className="text-lg text-gray-800 ml-2">
              Prepaid
              <input
                type="radio"
                className="ml-2"
                name="payment_type"
                value="prepaid"
                checked={formData.hotel.prepaid === true} // Bind state for prepaid
                onChange={handelPayemntRadioChange}
              />
            </span>
            <span className="text-lg text-gray-800 ml-2">
              Postpaid
              <input
                type="radio"
                className="ml-2"
                name="payment_type"
                value="postpaid"
                checked={formData.hotel.postpaid === true} // Bind state for postpaid
                onChange={handelPayemntRadioChange}
              />
            </span>
          </div>
        </div>
        <div className="my-4">
          <h2 className="border-b border-black font-medium text-lg">
            Fee Setup
          </h2>
          <div className="border rounded-lg bg-blue-50 p-1 my-2">
            <div className="grid grid-cols-4 border-b border-gray-400">
              <p className="text-center font-medium">Member Type</p>
              <p className="text-center font-medium">Adult</p>
              <p className="text-center font-medium"> Child</p>
              <p className="text-center font-medium"> Flat Amount</p>
            </div>
            {/* Member Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.member}
                    onChange={() => handleCheckboxChange("member")}
                  />
                  Member
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.member}
                  value={formData.hotel.member_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.member}
                  value={formData.hotel.member_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  // disabled={
                  //   !(
                  //     (formData.hotel.fac_type === "request" &&
                  //       formData.hotel.postpaid === true) ||
                  //     formData.hotel.prepaid
                  //   )
                  // }
                  value={formData.hotel.fixed_amount || 0}
                  onChange={(e) =>
                    handlePriceChange("fixed_amount", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            {/* Guest Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.guest}
                    onChange={() => handleCheckboxChange("guest")}
                  />
                  Guest
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.guest}
                  value={formData.hotel.guest_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("guest_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.guest}
                  value={formData.hotel.guest_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("guest_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            {/* Tenant Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.tenant}
                    onChange={() => handleCheckboxChange("tenant")}
                  />
                  Tenant
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.tenant}
                  value={formData.hotel.tenant_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={1}
                  disabled={!formData.hotel.tenant}
                  value={formData.hotel.tenant_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center border-b">
              {/* Checkbox */}
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.pay_on_facility === true}
                    onChange={() => handleCheckboxChange("pay_on_facility")}
                  />
                  Pay On Facility
                </label>
              </div>
              {/* GST Input */}
              <div className="flex items-center space-x-11">
                <label htmlFor="gst_no" className="font-medium p-2">
                  CGST
                </label>
                <input
                  type="number"
                  name="gst_no"
                  id="gst_no"
                  min={0}
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="CGST(%)"
                  value={formData.hotel.gst_no || 0} // Add GST to the state if necessary
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      hotel: {
                        ...prevState.hotel,
                        gst_no: e.target.value, // Add GST handler
                      },
                    }))
                  }
                />
              </div>

              {/* SGST Input */}
              <div className="flex items-center space-x-12">
                <label className="font-medium" htmlFor="sgst">
                  SGST
                </label>
                <input
                  type="number"
                  id="sgst"
                  value={formData.hotel.sgst || ""}
                  onChange={(e) => handlePriceChange("sgst", e.target.value)}
                  name="sgst"
                  min={0}
                  placeholder="Enter SGST"
                  className="border border-gray-400 rounded p-2 outline-none"
                />
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="my-2 flex flex-col gap-2">
                <label htmlFor="min_people" className="font-medium">
                  Minimum person allowed
                </label>
                <input
                  type="number"
                  name="min_people"
                  id="min_people"
                  className="border rounded-md p-2"
                  placeholder="Minimum person allowed"
                  value={formData.hotel.min_people}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-2 flex flex-col gap-2">
                <label htmlFor="max_people" className="font-medium">
                  Maximum person allowed
                </label>
                <input
                  type="number"
                  name="max_people"
                  id="max_people"
                  className="border rounded-md p-2"
                  placeholder="Maximum person allowed"
                  value={formData.hotel.max_people}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-y">
          {/* Booking Allowed Before */}
          <div className="grid grid-cols-5 items-center border-b px-4 gap-2">
            <div className="flex justify-center my-2">
              <label
                htmlFor="book_before"
                className="flex items-center gap-2"
              >
                Booking allowed before
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="book_before_days"
                value={formData.hotel.book_before_days ?? 0}
                onChange={handleInputChange}
                onBlur={validateInput} // Validate on losing focus
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="book_before_hours"
                value={formData.hotel.book_before_hours ?? 0}
                onChange={handleInputChange}
                onBlur={validateInput} // Validate on losing focus
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="book_before_minutes"
                value={formData.hotel.book_before_minutes ?? 0}
                onChange={handleInputChange}
                onBlur={validateInput} // Validate on losing focus
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>

          {/* Advance Booking */}
          <div className="grid grid-cols-5 items-center border-b px-4 gap-2">
            <div className="flex justify-center my-2">
              <label htmlFor="advance_booking" className="flex items-center gap-2">
                Advance Booking
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="advance_days"
                value={formData.hotel.advance_days ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="advance_hours"
                value={formData.hotel.advance_hours ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="advance_minutes"
                value={formData.hotel.advance_minutes ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>

          {/* Can Cancel Before Schedule */}
          <div className="grid grid-cols-5 items-center px-4 gap-2">
            <div className="flex justify-center my-2">
              <label
                htmlFor="cancel_before"
                className="flex items-center gap-2"
              >
                Can Cancel Before Schedule
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="cancel_before_days"
                value={formData.hotel.cancel_before_days ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="cancel_before_hours"
                value={formData.hotel.cancel_before_hours ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                min={0}
                name="cancel_before_minutes"
                value={formData.hotel.cancel_before_minutes ?? 0}
                onBlur={validateInput} // Validate on losing focus
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center px-4 gap-2">
            <div className="flex items-center gap-2 my-2">
              <label
                htmlFor="consecutive_slot_allowed"
                className="flex items-center ml-12"
              >
                Consecutive booking allowed
              </label>
              <input
                type="checkbox"
                id="consecutive_slot_allowed"
                checked={formData.hotel.consecutive_slot_allowed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hotel: {
                      ...prev.hotel,
                      consecutive_slot_allowed: e.target.checked,
                      // Reset no_of_days if unchecked
                      no_of_days: e.target.checked ? prev.hotel.no_of_days : "",
                    },
                  }))
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            {formData.hotel.consecutive_slot_allowed && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Number of days"
                  value={formData.hotel.no_of_days || ""}
                  min={1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hotel: {
                        ...prev.hotel,
                        no_of_days: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-400 rounded-md p-2 outline-none w-full"
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Cover Images
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "covers")}
            multiple // Allow multiple file uploads
          />
        </div>

        <h2 className="font-medium text-lg mb-2">Cover Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.covers && formData.covers.length > 0 ? (
            formData.covers.map((cover, index) => (
              <div
                key={index}
                className="relative rounded-lg border overflow-hidden"
              >
                <img
                  src={
                    cover.image_url
                      ? domainPrefix + cover.image_url
                      : URL.createObjectURL(cover)
                  }
                  alt={`Cover ${index + 1}`}
                  className="object-cover w-full h-40"
                />
                {/* <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                >
                                    X
                                </button> */}
              </div>
            ))
          ) : (
            <p>No cover images available.</p>
          )}
        </div>

        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Attachments
          </h2>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "attachments")}
            multiple // Allow multiple file uploads
          />
        </div>

        <h2 className="font-medium text-lg mb-2">Attachments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.attachments && formData.attachments.length > 0 ? (
            formData.attachments.map((doc, index) => (
              <div
                key={index}
                className="relative rounded-lg border overflow-hidden"
              >
                <img
                  src={
                    doc.image_url
                      ? domainPrefix + doc.image_url
                      : URL.createObjectURL(doc)
                  }
                  alt={`Attachment ${index + 1}`}
                  className="object-cover w-full h-40"
                />
                {/* <button
                                    onClick={() => removeAttachment(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                >
                                    X
                                </button> */}
              </div>
            ))
          ) : (
            <p>No attachments available.</p>
          )}
        </div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              cols="80"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.description} // Bind value to state
              onChange={handleDescriptionChange} // Handle change
              placeholder="Enter a description..."
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="terms" className="font-medium">
              Terms & Conditions
            </label>
            <textarea
              id="terms"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.terms} // Bind value to state
              onChange={handleTermsChange} // Handle change
              placeholder="Enter terms and conditions..."
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col my-4">
            <label htmlFor="cancellation_policy" className="font-medium">
              Cancellation Policy
            </label>
            <textarea
              id="cancellation_policy"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.cancellation_policy} // Bind value to state
              onChange={handleCancellationPolicyChange} // Handle change
              placeholder="Enter cancellation policy..."
            />
          </div>
        </div>

        <div className="flex justify-center my-2">
          <button
            style={{ background: themeColor }}
            className=" text-white p-2 px-4 font-semibold rounded-md flex items-center gap-2"
            onClick={updateAmenitiesSetup}
          >
            <FaCheck /> Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditHotelSetup;
