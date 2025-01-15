import React, { useEffect, useState } from 'react'
import { domainPrefix, getFacitilitySetup, postFacitilitySetup, updateFacitilitySetup } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemInLocalStorage } from '../../utils/localStorage';
import { useSelector } from 'react-redux';
import { Navbar } from '@material-tailwind/react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { BiPlusCircle } from 'react-icons/bi';
import { id } from 'date-fns/locale';
import toast from 'react-hot-toast';

const EditAmenitySetup = () => {
    const { id } = useParams()
    const [allowMultipleSlots, setAllowMultipleSlots] = useState("no");
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(true); // Loading state
    const [dates, setDates] = useState({
        amenity: {
            book_before: "",
            cancel_before: "",
            advance_booking: ""
        }
    })
    const handleSelectChange = (e) => {
        setAllowMultipleSlots(e.target.value);
    };
    const themeColor = useSelector((state) => state.theme.color);
    const sitID = getItemInLocalStorage('SITEID');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amenity: {
            site_id: sitID,
            fac_type: "",
            fac_name: "",
            member_charges: "",
            book_before: "",
            disclaimer: "",
            cancellation_policy: "",
            cutoff_min: "",
            return_percentage: "",
            create_by: "",
            active: true,
            member_price_adult: "",
            member_price_child: "",
            guest_price_adult: "",
            guest_price_child: "",
            tenant_price_child: "",
            tenant_price_adult: "",
            min_people: "",
            max_people: "",
            cancel_before: "",
            terms: "",
            gst_no: "",
            advance_booking: "",
            deposit: "",
            description: "",
            max_slots: "",
            member: null,
            guest: null,
            tenant: null,
        },
        covers: [],
        attachments: [],
        slots: [
            {
                start_hr: "",
                end_hr: "",
                start_min: "",
                end_min: "",
            },
        ],
    });

    console.log("DATA:", formData)

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
            const response = await getFacitilitySetup(id); // API call
            if (!response.data) {
                throw new Error("Invalid response from API");
            }

            const facility = Array.isArray(response.data)
                ? response.data.find(facility => facility.id === parseInt(id))
                : response.data;


            console.log("facility", facility);

            if (facility) {
                const bookBeforeStr = facility.book_before?.toString().padStart(6, "0") || "000000"; // Ensure it's 6 characters long
                const book_before_days = parseInt(bookBeforeStr.slice(0, 2), 10);
                const book_before_hours = parseInt(bookBeforeStr.slice(2, 4), 10);
                const book_before_mins = parseInt(bookBeforeStr.slice(4, 6), 10);

                setDates({
                    amenity: {
                        book_before: facility.book_before || "",
                        cancel_before: facility.cancel_before || "",
                        advance_booking: facility.advance_booking || "",
                    }
                })
                setFormData({
                    amenity: {
                        site_id: facility.site_id || "",
                        fac_type: facility.fac_type || "",
                        fac_name: facility.fac_name || "",
                        member_charges: facility.member_charges || "",
                        book_before: facility.book_before || "",
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
                        cancel_before: facility.cancel_before || "",
                        terms: facility.terms || "",
                        gst_no: facility.gst_no || "",
                        advance_booking: facility.advance_booking || "",
                        deposit: facility.deposit || "",
                        description: facility.description || "",
                        max_slots: facility.max_slots || "",
                        member: facility.member || null,
                        guest: facility.guest || null,
                        tenant: facility.tenant || null,
                        status: facility.status || "",
                        payment_methods: facility.payment_methods || [],
                    },
                    covers: facility.covers || [],
                    attachments: facility.attachments || [],
                    slots: facility.amenity_slots.map(slot => ({
                        id: slot.id || null,
                        amenity_id: slot.amenity_id || null, // Ensure correct key name for amenity_id
                        start_time: `${slot.start_hr}:${slot.start_min}`, // Correct start_time format
                        end_time: `${slot.end_hr}:${slot.end_min}`,

                        start_hr: slot.start_hr || "", // Time in hour format
                        end_hr: slot.end_hr || "", // Time in hour format
                        start_min: slot.start_min || "", // Time in minute format
                        end_min: slot.end_min || "", // Time in minute format
                    })),
                });
            } else {
                setError("Facility not found.");
            }
        } catch (error) {
            console.error("Error fetching facility details:", error);
            setError(error.message || "Failed to fetch facility details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilityBooking();
    }, [id]); // Trigger when ID changes

    const updateAmenitiesSetup = async () => {
        const postData = new FormData();

        // Append amenity fields
        Object.entries(formData.amenity).forEach(([key, value]) => {
            postData.append(`amenity[${key}]`, value);
        });

        // Append slots as an array with the correct structure
        formData.slots.forEach((slot, index) => {
            Object.entries(slot).forEach(([key, value]) => {
                postData.append(`amenity[amenity_slots_attributes][${index}][${key}]`, value);
            });
        });

        // Append payment methods as an array
        if (formData.amenity.payment_methods && formData.amenity.payment_methods.length > 0) {
            formData.amenity.payment_methods.forEach((method) => {
                postData.append("amenity[payment_methods][]", method);
            });
        }

        // Append additional arrays (covers, attachments) if needed
        if (formData.covers.length > 0) {
            formData.covers.forEach((file) => {
                postData.append("cover_images[]", file);
            });
        }

        if (formData.attachments.length > 0) {
            formData.attachments.forEach((file) => {
                postData.append("attachments[]", file);
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
            toast.error("Failed to update amenity setup. Please try again.");
        }
    };

    const handleCheckboxChange = (type) => {
        setFormData((prevState) => ({
            ...prevState,
            amenity: {
                ...prevState.amenity,
                [type]: prevState.amenity[type] === null ? true : null, // Toggle between true and null
            },
        }));
    };

    const handlePriceChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            amenity: {
                ...prevState.amenity,
                [field]: value,
            },
        }));
    };



    const handleFileChange = (event, key) => {
        const files = Array.from(event.target.files); // Convert FileList to an Array
        setFormData((prevState) => ({
            ...prevState,
            [key]: [...(prevState[key] || []), ...files], // Append new files to the existing array
        }));
    };

    const handleAmenityChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            amenity: {
                ...prev.amenity,
                [field]: value,
            },
        }));
    };


    const handleAddSlot = () => {
        setFormData((prevState) => ({
            ...prevState,
            slots: [
                ...prevState.slots,
                {
                    start_hr: "",      // Hour for start time
                    start_min: "",     // Minute for start time
                    end_hr: "",        // Hour for end time
                    end_min: "",       // Minute for end time
                },
            ],
        }));
    };

    const handleRemoveSlot = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            slots: prevState.slots.filter((_, i) => i !== index),
        }));
    };


    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            // Update the specific field in the formData
            const updatedFormData = {
                ...prevData,
                amenity: {
                    ...prevData.amenity,
                    [name]: value,
                },
            };

            // Construct the combined `book_before` value
            const { book_before_days, book_before_hours, book_before_mins } = updatedFormData.amenity;
            updatedFormData.amenity.book_before =
                parseInt(`${book_before_days || 0}${book_before_hours || 0}${book_before_mins || 0}`, 10);

            const { advance_days, advance_hours, advance_mins } = updatedFormData.amenity;
            updatedFormData.amenity.advance_booking =
                parseInt(`${advance_days || 0}${advance_hours || 0}${advance_mins || 0}`, 10);

            const { cancel_before_days, cancel_before_hours, cancel_before_min } = updatedFormData.amenity;
            updatedFormData.amenity.cancel_before =
                parseInt(`${cancel_before_days || 0}${cancel_before_hours || 0}${cancel_before_min || 0}`, 10);


            return updatedFormData;
        });
    };


    const [timeValues, setTimeValues] = useState({
        time1: "00:00",
        time2: "00:00",
        time3: "00:00",
    });

    const handleTimeChange = (e, timeKey) => {
        const { value } = e.target;
        setTimeValues((prev) => ({
            ...prev,
            [timeKey]: value,
        }));
    };
    const [subFacilities, setSubFacilities] = useState([
        { name: "", status: "" },
    ]);

    const handleAddSubFacility = () => {
        setSubFacilities([...subFacilities, { name: "", status: "" }]);
    };
    const handleRemoveSubFacility = (index) => {
        const updatedSubFacilities = subFacilities.filter((_, i) => i !== index);
        setSubFacilities(updatedSubFacilities);
    };

    const handleSubChange = (index, field, value) => {
        const updatedSubFacilities = subFacilities.map((subFacility, i) =>
            i === index ? { ...subFacility, [field]: value } : subFacility
        );
        setSubFacilities(updatedSubFacilities);
    };
    const [subFacilityAvailable, setSubFacilityAvailable] = useState(false);

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
    const [rules, setRules] = useState([
        { timesPerDay: "", selectedOption: "" },
    ]);

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
        setFormData({
            ...formData, amenity: {
                ...formData.amenity, fac_type: e.target.value,
            },
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

    const handleSlotTimeChange = (index, timeType, timeValue) => {
        let [hours, minutes] = timeValue.split(":");

        // Ensure hours and minutes are valid strings, defaulting to "00" if empty or undefined
        hours = (hours || "00").padStart(2, "0");
        minutes = (minutes || "00").padStart(2, "0");

        setFormData(prevState => {
            const updatedSlots = [...prevState.slots];
            updatedSlots[index] = {
                ...updatedSlots[index],
                [`${timeType}_hr`]: hours,
                [`${timeType}_min`]: minutes,
            };
            return { ...prevState, slots: updatedSlots };
        });
    };


    console.log("slots", formData.slots);


    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            amenity: {
                ...formData.amenity,
                description: value, // Update description in the state
            },
        });
    };

    //handle tearms
    const handleTermsChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            amenity: {
                ...formData.amenity,
                terms: value, // Update terms in the state
            },
        });
    };

    // Handle cancellation policy change
    const handleCancellationPolicyChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            amenity: {
                ...formData.amenity,
                cancellation_policy: value, // Update cancellation policy in the state
            },
        });
    };

    //Validate 2 Inputs
    const validateInput = (e) => {
        const { name, value } = e.target;

        // Check if the input is not exactly 2 digits or contains non-numeric characters
        if (!/^\d{2}$/.test(value)) {
            // Show an alert message for invalid input
            alert(`${name.replace('_', ' ')} must be exactly 2 digits. "05"`);
        }
    };



    return (
        <section className="flex">
            {/* <Navbar /> */}
            <div className="w-full p-4 mb-5">
                <h1
                    style={{ background: 'rgb(17, 24, 39)' }}
                    className="bg-black text-white font-semibold rounded-md text-center p-2"
                >
                    Setup Edit Facility
                </h1>

                <div className="flex  gap-4 my-4">
                    <div className="flex gap-2 items-center">
                        <input type="radio" name="type" id="bookable"
                            value="bookable"
                            checked={formData.amenity.fac_type === "bookable"}
                            onChange={handelRadioChange}
                        />
                        <label htmlFor="bookable" className="text-lg">
                            Bookable
                        </label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="radio" name="type" id="request"
                            value="request"
                            onChange={handelRadioChange}
                            checked={formData.amenity.fac_type === "request"}
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
                                value={formData.amenity.fac_name}
                                onChange={(e) => handleAmenityChange("fac_name", e.target.value)}
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
                                value={formData.amenity.active ? "true" : "false"}
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        amenity: {
                                            ...prevData.amenity,
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
                    <h2 className="border-b border-black font-medium text-lg">
                        Fee Setup
                    </h2>
                    <div className="border rounded-lg bg-blue-50 p-1 my-2">
                        <div className="grid grid-cols-4 border-b border-gray-400">
                            <p className="text-center font-medium">Member Type</p>
                            <p className="text-center font-medium">Adult</p>
                            <p className="text-center font-medium"> Child</p>
                        </div>
                        {/* Member Section */}
                        <div className="grid grid-cols-4 items-center border-b">
                            <div className="flex justify-center my-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenity.member === true}
                                        onChange={() => handleCheckboxChange("member")}
                                    />
                                    Member
                                </label>
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.member}
                                    value={formData.amenity.member_price_adult || ""}
                                    onChange={(e) =>
                                        handlePriceChange("member_price_adult", e.target.value)
                                    }
                                    className="border border-gray-400 rounded p-2 outline-none"
                                    placeholder="₹100"
                                />
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.member}
                                    value={formData.amenity.member_price_child || ""}
                                    onChange={(e) =>
                                        handlePriceChange("member_price_child", e.target.value)
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
                                        checked={formData.amenity.guest === true}
                                        onChange={() => handleCheckboxChange("guest")}
                                    />
                                    Guest
                                </label>
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.guest}
                                    value={formData.amenity.guest_price_adult || ""}
                                    onChange={(e) =>
                                        handlePriceChange("guest_price_adult", e.target.value)
                                    }
                                    className="border border-gray-400 rounded p-2 outline-none"
                                    placeholder="₹100"
                                />
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.guest}
                                    value={formData.amenity.guest_price_child || ""}
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
                                        checked={formData.amenity.tenant === true}
                                        onChange={() => handleCheckboxChange("tenant")}
                                    />
                                    Tenant
                                </label>
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.tenant}
                                    value={formData.amenity.tenant_price_adult || ""}
                                    onChange={(e) =>
                                        handlePriceChange("tenant_price_adult", e.target.value)
                                    }
                                    className="border border-gray-400 rounded p-2 outline-none"
                                    placeholder="₹100"
                                />
                            </div>
                            <div className="flex justify-center my-2">
                                <input
                                    type="text"
                                    disabled={!formData.amenity.tenant}
                                    value={formData.amenity.tenant_price_child || ""}
                                    onChange={(e) =>
                                        handlePriceChange("tenant_price_child", e.target.value)
                                    }
                                    className="border border-gray-400 rounded p-2 outline-none"
                                    placeholder="₹100"
                                />
                            </div>
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
                                    value={formData.amenity.min_people}
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
                                    value={formData.amenity.max_people}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="my-2 flex flex-col gap-2">
                                <label htmlFor="gst_no" className="font-medium">
                                    GST
                                </label>
                                <input
                                    type="number"
                                    name="gst_no"
                                    id="gst_no"
                                    className="border rounded-md p-2"
                                    placeholder="GST(%)"
                                    value={formData.amenity.gst_no || ""} // Add GST to the state if necessary
                                    onChange={(e) =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            amenity: {
                                                ...prevState.amenity,
                                                gst_no: e.target.value, // Add GST handler
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border-y">
                    {/* Booking Allowed Before */}
                    <div className="grid grid-cols-5 items-center border-b px-4 gap-2">
                        <div className="flex justify-center my-2">
                            <label htmlFor="book_before_days" className="flex items-center gap-2">
                                Booking allowed before
                            </label>
                        </div>
                        <div>
                            {dates?.amenity?.book_before &&
                                (() => {
                                    const bookBefore = dates.amenity.book_before.toString(); // Read the value as a string
                                    const days = bookBefore.slice(0, 2); // Extract days
                                    const hours = bookBefore.slice(2, 4); // Extract hours
                                    const minutes = bookBefore.slice(4, 6); // Extract minutes
                                    return `${days} days, ${hours} hours, ${minutes} minutes`; // Format and display
                                })()}
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="book_before_days"
                                value={formData.amenity.book_before_days}
                                onChange={handleInputChange}
                                onBlur={validateInput} // Validate on losing focus
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Day"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="book_before_hours"
                                value={formData.amenity.book_before_hours}
                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Hour"
                                onBlur={validateInput} // Validate on losing focus
                                maxLength="2" // Restrict input to a maximum of 2 characters
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="book_before_mins"
                                value={formData.amenity.book_before_min}
                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Mins"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                    </div>


                    {/* Advance Booking */}
                    <div className="grid grid-cols-5 items-center border-b px-4 gap-2">
                        <div className="flex justify-center my-2">
                            <label htmlFor="advance_days" className="flex items-center gap-2">
                                Advance Booking
                            </label>
                        </div>
                        <div>
                            {dates?.amenity?.advance_booking &&
                                (() => {
                                    const bookBefore = dates.amenity.advance_booking.toString(); // Convert to string
                                    const days = bookBefore.slice(0, 2); // First 2 digits for days
                                    const hours = bookBefore.slice(2, 4); // Next 2 digits for hours
                                    const minutes = bookBefore.slice(4, 6); // Next 2 digits for minutes
                                    return `${days} days, ${hours} hours, ${minutes} minutes`;
                                })()}
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="advance_days"
                                value={formData.amenity.advance_days}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Day"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="advance_hours"
                                value={formData.amenity.advance_hours}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Hour"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="advance_mins"
                                value={formData.amenity.advance_mins}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Mins"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                    </div>

                    {/* Can Cancel Before Schedule */}
                    <div className="grid grid-cols-5 items-center px-4 gap-2">
                        <div className="flex justify-center my-2">
                            <label htmlFor="cancel_before_days" className="flex items-center gap-2">
                                Can Cancel Before Schedule
                            </label>
                        </div>
                        <div>
                            {dates?.amenity?.cancel_before &&
                                (() => {
                                    const bookBefore = dates.amenity.cancel_before.toString(); // Convert to string
                                    const days = bookBefore.slice(0, 2); // First 2 digits for days
                                    const hours = bookBefore.slice(2, 4); // Next 2 digits for hours
                                    const minutes = bookBefore.slice(4, 6); // Next 2 digits for minutes
                                    return `${days} days, ${hours} hours, ${minutes} minutes`;
                                })()}
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="cancel_before_days"
                                value={formData.amenity.cancel_before_days}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Day"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="cancel_before_hours"
                                value={formData.amenity.cancel_before_hours}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Hour"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            <input
                                type="text"
                                name="cancel_before_mins"
                                value={formData.amenity.cancel_before_min}

                                onChange={handleInputChange}
                                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                                placeholder="Mins"
                                maxLength="2" // Restrict input to a maximum of 2 characters
                                onBlur={validateInput} // Validate on losing focus
                            />
                        </div>
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
                    />
                </div>
                <h2 className="font-medium text-lg mb-2">Cover Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.covers && formData.covers.length > 0 ? (
                        formData.covers.map((image_url, index) => (
                            <div key={index} className="rounded-lg border overflow-hidden">
                                <img
                                    src={domainPrefix + image_url.image_url}
                                    alt={`Cover ${index + 1}`}
                                    className="object-cover w-full h-40"
                                />
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
                    />
                </div>
                <h2 className="font-medium text-lg mb-2">Attachments</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.attachments && formData.attachments.length > 0 ? (
                        formData.attachments.map((doc, index) => (
                            <div key={index} className="rounded-lg border overflow-hidden">
                                <img
                                    src={domainPrefix + doc.image_url}
                                    alt={`Cover ${index + 1}`}
                                    className="object-cover w-full h-40"
                                />
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
                            value={formData.amenity.description} // Bind value to state
                            onChange={handleDescriptionChange} // Handle change
                            placeholder="Enter a description..."
                        />
                    </div>
                </div>
                <div className="my-4">
                    <h2 className="border-b border-black text-lg mb-1 font-medium">Configure Slot</h2>

                    {formData.slots.map((slot, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 bg-white my-2 rounded-lg">
                            <div className="flex flex-col">
                                <label htmlFor={`start-time-${index}`} className="font-medium">
                                    Start Time
                                </label>
                                <input
                                    id={`start-time-${index}`}
                                    type="time"
                                    placeholder="Start Time"
                                    value={`${String(slot.start_hr || 0).padStart(2, '0')}:${String(slot.start_min || 0).padStart(2, '0')}`}
                                    onChange={(e) => handleSlotTimeChange(index, "start", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex flex-col mx-3">
                                <label htmlFor={`end-time-${index}`} className="font-medium">
                                    End Time
                                </label>
                                <input
                                    id={`end-time-${index}`}
                                    type="time"
                                    placeholder="End Time"
                                    value={`${String(slot.end_hr || 0).padStart(2, '0')}:${String(slot.end_min || 0).padStart(2, '0')}`}
                                    onChange={(e) => handleSlotTimeChange(index, "end", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                                />
                            </div>
                            <div className="flex items-end justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSlot(index)}
                                    className="text-red-600 hover:text-red-800 p-2"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}


                    <div className="flex">
                        <button
                            type="button"
                            onClick={handleAddSlot}
                            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            <BiPlusCircle className="h-5 w-5 mr-2" />
                            Add Slot
                        </button>
                    </div>
                </div>


                <div></div>

                <div>
                    <div className="flex flex-col">
                        <label htmlFor="terms" className="font-medium">
                            Terms & Conditions
                        </label>
                        <textarea
                            id="terms"
                            rows="3"
                            className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
                            value={formData.amenity.terms} // Bind value to state
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
                            value={formData.amenity.cancellation_policy} // Bind value to state
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
}

export default EditAmenitySetup