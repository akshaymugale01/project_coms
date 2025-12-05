import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import {
  getConsultationDetails,
  getDoctors,
  getOrganizations,
  getTimeSlot,
  postDocAppointment,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Select from "react-select";
import docImg from "/doc.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const BookDocAppointment = () => {
  const locations = useLocation();
  const rescheduleId = locations.state ? locations.state.cancelId : null;
  const cancellationReason = locations.state
    ? locations.state.cancellationReason
    : null;
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const orgId = getItemInLocalStorage("VIBEORGID");
  const [relationShipValue, setRelationShipValue] = useState("Self");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  const themeColor = useSelector((state) => state.theme.color);

  const onChangeRelationShipValue = (event) => {
    setRelationShipValue(event.target.value);
  };
  const [relativeConsultation, setRelativeConsultation] = useState(null);
  const [consultFor, setConsultFor] = useState("Self");
  const [relatives, setRelatives] = useState(null);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [selfDetails, setSelfDetails] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null); // []
  const [fullNameValue, setFullNameValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [mobileNoValue, setMobileNoValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [bloodGroupValue, setBloodGroupValue] = useState("");
  const [maritalStatusValue, setMaritalStatusValue] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [selectDateValue, setSelectDateValue] = useState("");
  const [id, setId] = useState("");
  const onChangeMaritalStatusValue = (event) => {
    setMaritalStatusValue(event.target.value);
  };
  const onChangeBloodGroupValue = (event) => {
    setBloodGroupValue(event.target.value);
  };
  const onChangeAgeValue = (event) => {
    setAgeValue(event.target.value);
  };
  const onChangeGenderValue = (event) => {
    setGenderValue(event.target.value);
  };
  const onChangeFullNameValue = (event) => {
    setFullNameValue(event.target.value);
  };
  useEffect(() => {
    function calculateAge(birthDate) {
      const birthDateObject = new Date(birthDate);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDateObject.getFullYear();
      const hasBirthdayOccurred =
        currentDate.getMonth() > birthDateObject.getMonth() ||
        (currentDate.getMonth() === birthDateObject.getMonth() &&
          currentDate.getDate() >= birthDateObject.getDate());

      const finalAge = hasBirthdayOccurred ? age : age - 1;

      return finalAge;
    }

    setRelationShipValue("Self");
    const fetchConsultationData = async () => {
      try {
        const response = await getConsultationDetails(user_id);
        console.log(response);
        if (response.success === true) {
          setRelationShipValue("Self");
          setRelatives(response.data.consultations_details);
          setPersonalDetails(response.data.personal_details);
          setSelfDetails(response.data.self);

          let personalDetails1 = response.data.personal_details;
          let selfDetails1 = response.data.self;

          if (selfDetails1.length === 0) {
            setFullNameValue(
              personalDetails1[0].firstname + " " + personalDetails1[0].lastname
            );
            setGenderValue(personalDetails1[0].gender);
            setMobileNoValue(personalDetails1[0].phone_no);
            setAgeValue(calculateAge(personalDetails1[0].date_of_birth));
          } else {
            setFullNameValue(
              personalDetails1[0].firstname + " " + personalDetails1[0].lastname
            );
            setAgeValue(selfDetails1[0].age);
            setGenderValue(selfDetails1[0].gender);
            setBloodGroupValue(selfDetails1[0].blood_group);
            setMaritalStatusValue(selfDetails1[0].marital_status);
            setMobileNoValue(personalDetails1[0].phone_no);
          }

          setuserLocation(personalDetails1[0].organization_location);

          console.log(response);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchConsultationData();
  }, []);

  const onBtnSelfClick = () => {
    setRelationShipValue("Self");
    setConsultFor("Self");
    setRelativeConsultation(null);

    if (selfDetails.length === 0) {
      console.log(personalDetails);
      if (personalDetails.isNotEmpty) {
        setFullNameValue(
          personalDetails[0].firstname + " " + personalDetails[0].lastname
        );
        setGenderValue(personalDetails[0].gender);
        setMobileNoValue(personalDetails[0].phone_no);
      }
    } else {
      setFullNameValue(
        personalDetails[0].firstname + " " + personalDetails[0].lastname
      );
      setAgeValue(selfDetails[0].age);
      setGenderValue(personalDetails[0].gender);
      setBloodGroupValue(selfDetails[0].blood_group);
      setMaritalStatusValue(selfDetails[0].marital_status);
      setMobileNoValue(personalDetails[0].phone_no);
    }
  };
  const onBtnOtherClick = () => {
    // setShowModal(!showModal);
    // setShowModal(false);
    setConsultFor("Other");

    setFullNameValue("");
    setRelationShipValue("");
    setAgeValue("");
    setGenderValue("");
    setBloodGroupValue("");
    setMaritalStatusValue("");
    setMobileNoValue("");
  };
  const [isBookedConsultation, setIsBookedConsultation] = useState(false);
  const [times, setTimes] = useState([]);
  const onChangeMobileNoValue = (event) => {
    const value = event.target.value;

    // Check if value is all digits and has 10 or fewer characters
    if (value.length <= 10 && (value === "" || /^\d+$/.test(value))) {
      setMobileNoValue(value);
    }
  };

  const onChangeSelectPreference = (event) => {
    setDoctorDetails("");
    console.log("-----------");
    console.log(event.target.value);
    setTimes([]);
    const selectedPreference = event.target.value;
    setSelectPreference(selectedPreference);
    setselectedRadio(selectedPreference);
    console.log(selectedPreference);
    console.log(selectDateValue);
    if (
      (selectDateValue !== "" && selectPreference === "") ||
      selectedPreference !== ""
    ) {
      fetchDoctorsData(selectDateValue, selectedPreference, id);
    }
    if (selectedPreference === "Offline") {
      fetchOrganizations();
    } else {
      setSelectedOption("");
    }
  };

  const [location, setLocation] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const onChangeLocation = (selectedOption) => {
    setTimes([]);
    setSelectedOption(selectedOption);
    console.log(selectedOption);
    if (selectedOption !== "") {
      fetchDoctorsData(selectDateValue, selectPreference, selectedOption.value);
    }
  };
  const [selectPreference, setSelectPreference] = useState("");
  const [selectedRadio, setselectedRadio] = useState("");

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations(user_id, orgId);
      if (response.success === true) {
        console.log(response.data);
        const users = response.data;
        const AssignLocation = users.map((org) => ({
          value: org.id,
          label: org.branch_name,
        }));
        console.log(AssignLocation);
        setLocation(AssignLocation);
        const filteredData = AssignLocation.find(
          (item) => item.value === userLocation
        );
        console.log(filteredData.value);
        console.log(selectPreference);
        console.log(selectedRadio);
        fetchDoctorsData(selectDateValue, selectPreference, filteredData.value);
        setSelectedOption(filteredData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDoctorsData = async (appDate, preference, id) => {
    console.log(appDate);
    console.log(preference);
    console.log(id);
    try {
      const response = await getDoctors(
        user_id,
        appDate,
        orgId,
        preference,
        id
      );
      if (response.success === true) {
        console.log(response.data);
        console.log("doctor detail");
        setDoctorDetails(response.data);
        setTimes([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [doctorSelected, setDoctorSelected] = useState(false);

  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);
  const [DoctorDetail, setDoctorDetail] = useState([]);
  const funSelectedDoctor = (Doctor) => {
    // console.log(doctorDetail)
    setSelectedDoctorDetail(Doctor.user_id);
    setDoctorSelected(true);
    setDoctorDetail(Doctor);

    fetchTimes(
      Doctor.user_id,
      selectDateValue,
      selectedOption.value,
      selectPreference
    );
  };
  const [isLoadingtime, setIsLoadingTime] = useState(true);

  const fetchTimes = async (id, date, orgbId, mode) => {
    setIsLoadingTime(true);
    try {
      const response = await getTimeSlot(user_id, date, orgId, mode, id);
      console.log(response);
      if (response.success === true) {
        setTimes(response.data);
        setIsLoadingTime(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoadingTime(false);
    }
  };

  const onChangeSelectDateValue = (event) => {
    const selectedDate = event.target.value;
    setSelectDateValue(selectedDate);
    if (selectedDate !== "" && selectPreference !== "") {
      fetchDoctorsData(selectedDate, selectPreference, selectedOption.value);
    }
  };
  const [selectedTimes, setSelectedTimes] = useState("");
  const [selectedTimeOnly, setSelectedTimeOnly] = useState("");

  const handleButtonClick = (time) => {
    console.log(time);
    setSelectedTimes(time.id);
    setSelectedTimeOnly(time.slots);
  };

  const [reasonValue, setReasonValue] = useState("");
  const onChangeReasonValue = (event) => {
    setReasonValue(event.target.value);
  };
  const onFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };
  const [selectedFileType, setSelectedFileType] = useState("Blood");
  const [selectedFile, setselectedFile] = useState("");
  const [uploadedReports, setUploadedReports] = useState([]);

  const fileInputRef = useRef(null);

  const addReport = () => {
    if (selectedFile) {
      const newReport = {
        file: selectedFile,
        type: selectedFileType,
      };
      setUploadedReports([...uploadedReports, newReport]);
      setselectedFile(null); // Clear selected file after adding
      fileInputRef.current.value = null;
      setSelectedFileType("Blood");
    }
  };

  const removeReport = (index) => {
    const updatedReports = [...uploadedReports];
    updatedReports.splice(index, 1);
    setUploadedReports(updatedReports);
  };
  const onChangeSelectFile = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"))
    ) {
      setselectedFile(file);
    } else {
      setselectedFile(null); // Clear selected file if it's not a PDF
    }
  };

  const bookConsultation = () => {
    setIsBookedConsultation(true);

    // Check if any of the required fields are missing
    if (
      fullNameValue === "" ||
      relationShipValue === "" ||
      ageValue === "" ||
      genderValue === "" ||
      bloodGroupValue === "" ||
      maritalStatusValue === "" ||
      selectDateValue === "" ||
      selectedTimes === "" ||
      mobileNoValue.length !== 10 ||
      reasonValue === "" ||
      selectedDoctorDetail === null
    ) {
      // Display validation error messages or handle accordingly.
      // alert('Please fill all fields.');
      toast.error("Please fill all fields.", {
        position: "top-center",
        autoClose: 2000,
      });
      // Check if preferences are selected
      if (selectPreference === "") {
        // alert('Please select preferences.');
        toast.error("Please select preferences.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      // Check if offline preference is selected and location is chosen
      if (selectPreference === "Offline" && !selectedOption) {
        // alert('Please select a location for offline consultation.');
        toast.error("Please select a location for offline consultation.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      // Check if a doctor is selected
      if (!doctorSelected) {
        // alert('Please select a doctor.');
        toast.error("Please select a doctor.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      // Check if a time slot is selected
      if (!selectedTimes) {
        // alert('Please select a time slot.');
        toast.error("Please select a time slot.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      return;
    }

    // Check if a valid PDF file is selected
    if (selectedFile) {
      if (
        !selectedFile ||
        !(
          selectedFile.type === "application/pdf" ||
          selectedFile.name.toLowerCase().endsWith(".pdf")
        )
      ) {
        toast.error("Please select a valid PDF file.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
    }

    if (relativeConsultation == null) {
      confirmBooking();
      // New entry, add consultation
    } else {
      directBooking();
      // Already has a consultation
    }
  };
  const navigate = useNavigate();
  const confirmBooking = async () => {
    try {
      //   alert("confirmBooking");

      const formData = new FormData();
      formData.append("full_name", fullNameValue);
      formData.append("relationship", relationShipValue);
      formData.append("blood_group", bloodGroupValue);
      formData.append("marital_status", maritalStatusValue);
      formData.append("age", ageValue);
      formData.append("gender", genderValue);
      formData.append("phone_no", mobileNoValue);

      formData.append("doctor_id", selectedDoctorDetail);
      formData.append("employee_id", user_id);
      //formData.append('user_id', employeeUserId);
      formData.append("appointment_date", selectDateValue);
      formData.append("doctor_slot", selectedTimes);
      formData.append("organization_id", orgId);
      formData.append("reason_for_consultation", reasonValue);
      //formData.append('meeting_pref_type', 'Online');
      formData.append("meeting_pref_type", selectPreference);
      formData.append("organization_branch_id", selectedOption.value);
      const reportFiles = [];
      const reportTypes = [];

      // Populate the arrays with files and types
      uploadedReports.forEach((report) => {
        reportFiles.push(report.file);
        reportTypes.push(report.type);
      });

      // Append each file to 'reports' and each type to 'report_types'
      reportFiles.forEach((file) => {
        formData.append("reports", file);
      });

      reportTypes.forEach((type) => {
        formData.append("report_types", type);
      });
      // formData.append('reports', selectedFile);
      // // formData.append('report_type',"blood");
      // formData.append('report_type',selectedFileType);

      formData.append("cancellation_reason", cancellationReason);
      formData.append("consultation_id", rescheduleId);
      formData.append("user_id", user_id);

      const jsonDataBooking = await postDocAppointment(formData);

      console.log(jsonDataBooking);
      if (jsonDataBooking.success) {
        console.log(selectedFile);
        console.log(DoctorDetail);
        navigate("/doctor-appointments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const directBooking = async () => {
    try {
      const formData1 = new FormData();
      formData1.append("doctor_id", selectedDoctorDetail);
      formData1.append("employee_id", user_id);
      formData1.append("user_id", user_id);
      formData1.append("consultation_for", relativeConsultation.id);
      formData1.append("appointment_date", selectDateValue);
      formData1.append("doctor_slot", selectedTimes);
      formData1.append("reason_for_consultation", reasonValue);
      formData1.append("meeting_pref_type", "Online");
      formData1.append("organization_branch_id", selectedOption.value);
      const reportFiles = [];
      const reportTypes = [];

      // Populate the arrays with files and types
      uploadedReports.forEach((report) => {
        reportFiles.push(report.file);
        reportTypes.push(report.type);
      });

      // Append each file to 'reports' and each type to 'report_types'
      reportFiles.forEach((file) => {
        formData1.append("reports", file);
      });

      reportTypes.forEach((type) => {
        formData1.append("report_types", type);
      });

      // formData1.append('reports', selectedFile);
      // // formData1.append('report_type',"blood");
      // formData1.append('report_type',selectedFileType);

      formData1.append("cancellation_reason", cancellationReason);
      formData1.append("consultation_id", rescheduleId);

      console.log(formData1);

      const response = await postDocAppointment(formData1);
      // alert(response);
      if (response.success === true) {
        console.log(selectedFile);
        navigate("/doctor-appointments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row bg-gray-200">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>

      <div className="flex justify-center my-5 overflow-x-auto w-full sm:w-full">
        <div className=" bg-white rounded-lg w-full  md:mx-5 mb-5 px-2 flex flex-col gap-5">
          <h2
            className="text-center md:text-xl font-bold my-2 p-2 rounded-md text-white"
            style={{ background: themeColor }}
          >
            Book Doctor Appointment
          </h2>

          <div className="grid grid-cols-4 items-center mx-5">
            <p className="font-semibold">For :</p>
            <div className="flex gap-5">
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  consultFor === "Self" && "bg-black text-white"
                }`}
                // onClick={() => setbehalf("self")}
                onClick={onBtnSelfClick}
              >
                Self
              </p>
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  consultFor === "Other" && "bg-black text-white"
                }`}
                // onClick={() => setbehalf("others")}
                onClick={onBtnOtherClick}
              >
                Others
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mx-5">
            <div className="grid  items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Patient Name
              </label>

              {consultFor === "Self" ? (
                <input
                  readOnly
                  value={fullNameValue}
                  onChange={onChangeFullNameValue}
                  type="text"
                  className="border-b text-gray-700 border-gray-400 p-2 outline-none"
                />
              ) : (
                <input
                  value={fullNameValue}
                  onChange={onChangeFullNameValue}
                  type="text"
                  className="border-b  border-gray-400 p-2 outline-none"
                  placeholder="Enter Patient Name"
                />
              )}

              {isBookedConsultation === true && fullNameValue === "" ? (
                <span style={{ color: "red" }}>Please enter valid Name</span>
              ) : (
                <span></span>
              )}
            </div>

            <div className="grid items-center w-full">
              <label htmlFor="relationship" className="font-semibold ">
                Relationship
              </label>
              <select
                value={relationShipValue}
                onChange={onChangeRelationShipValue}
                className="border-b  border-gray-400 p-2 outline-none"
                placeholder="Enter Patient Name"
              >
                {consultFor === "Self" ? (
                  <option value="Self">Self</option>
                ) : (
                  <>
                    {" "}
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
              {isBookedConsultation === true && relationShipValue === "" ? (
                <span style={{ color: "red" }}>Please select Relation</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid   items-center w-full">
              <label htmlFor="age" className="font-semibold">
                Age
              </label>

              <input
                value={ageValue}
                onChange={onChangeAgeValue}
                className="border-b border-gray-400 p-2 outline-none"
                placeholder="Enter Patient's Age"
              />
              {isBookedConsultation === true && ageValue === "" ? (
                <span style={{ color: "red" }}>Please enter Age</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid  items-center w-full">
              <label htmlFor="gender" className="font-semibold">
                Gender
              </label>
              <select
                value={genderValue}
                onChange={onChangeGenderValue}
                className="border-b border-gray-400 p-2 outline-none"
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {isBookedConsultation === true && genderValue === "" ? (
                <span style={{ color: "red" }}>Please select Gender</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid  items-center w-full">
              <label htmlFor="bloodGroup" className="font-semibold">
                Blood Group
              </label>
              <select
                value={bloodGroupValue}
                onChange={onChangeBloodGroupValue}
                className="border-b border-gray-400 p-2 outline-none"
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="O-">O-</option>
              </select>
              {isBookedConsultation === true && bloodGroupValue === "" ? (
                <span style={{ color: "red" }}>Please select Blood Group</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Marital Status
              </label>
              <select
                value={maritalStatusValue}
                onChange={onChangeMaritalStatusValue}
                className="border-b border-gray-400 p-2 outline-none"
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
              {isBookedConsultation === true && maritalStatusValue === "" ? (
                <span style={{ color: "red" }}>
                  Please select Marital Status
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Date
              </label>

              <input
                type="date"
                min={todayDate}
                value={selectDateValue}
                onChange={onChangeSelectDateValue}
                className="border-b border-gray-400 p-2 outline-none"
              />
              {isBookedConsultation === true && selectDateValue === "" ? (
                <span style={{ color: "red" }}>Please select Date</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Mobile
              </label>
              <input
                value={mobileNoValue}
                onChange={onChangeMobileNoValue}
                maxLength="10"
                className="border-b border-gray-400 p-2 outline-none"
                placeholder="Enter mobile no."
              />
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="preference" className="font-semibold">
                Preference
              </label>
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="online"
                    name="preferences"
                    value="Online"
                    style={{ height: "20px" }}
                    onClick={onChangeSelectPreference}
                  />
                  <label htmlFor="online">Online</label>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="offline"
                    name="preferences"
                    value="Offline"
                    style={{ height: "20px" }}
                    onClick={onChangeSelectPreference}
                  />
                  <label htmlFor="offline">Offline</label>
                </div>
              </div>
            </div>
            {selectPreference === "Offline" && (
              <div className="col-md-6 mt-3">
                <label className="font-medium">Select Location</label>
                <br />

                <Select
                  options={location}
                  //   value={selectedLocation}
                  value={selectedOption}
                  onChange={onChangeLocation}
                  isSearchable={true}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "black",
                      // height: "35px",
                    }),

                    dropdownIndicator: (baseStyles) => ({
                      ...baseStyles,
                      color: "black",
                      // height: "48px",
                    }),
                    control: (baseStyles) => ({
                      ...baseStyles,
                      // borderColor: "gray",
                      // minHeight: "30px",
                      // height: "48px",
                      borderWidth: "0 0 1px 0",
                      borderStyle: "solid",
                      borderRadius: "0px",
                      outline: "none",
                    }),
                    option: (baseStyles) => ({
                      ...baseStyles,
                      color: "black",
                    }),
                    indicatorSeparator: (baseStyles) => ({
                      ...baseStyles,
                      // height: "30px",
                    }),
                  }}
                />
              </div>
            )}
            {doctorDetails === null ? (
              <div className="col-md-12"></div>
            ) : (
              <div className="col-span-3">
                <div className="">
                  {/* <ToastContainer limit={1}/> */}
                  <label style={{ fontSize: 16 }} className="font-medium">
                    Select Doctors:
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {doctorDetails.length > 0 ? (
                    doctorDetails.map((doctor) => (
                      <div
                        onClick={() => funSelectedDoctor(doctor)}
                        // className="selected-doc3 col-md-5"
                        className={`flex border cursor-pointer w-80 border-gray-200 rounded-md ${
                          selectedDoctorDetail === doctor.user_id
                            ? " border-green-500 border-2"
                            : ""
                        }`}
                        key={doctor.user_id}
                      >
                        <div className="flex">
                          {doctor.profile_picture ? (
                            <div className="mr-4">
                              <img
                                style={{
                                  height: "90px",
                                  width: "90px",
                                  borderRadius: "14px",
                                  padding: "8px",
                                }}
                                src={Media + "/" + doctor.profile_picture}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className="mr-4">
                              <img
                                style={{ height: "90px" }}
                                src={docImg}
                                alt=""
                              />
                            </div>
                          )}
                          <div className="mt-1">
                            <h3 className="dr-name2">
                              <b>
                                {doctor.firstname} {doctor.lastname}
                              </b>
                            </h3>
                            <span style={{ fontSize: "14px" }}>
                              Qualifications:{" "}
                            </span>
                            <span style={{ fontSize: "14px" }}>
                              {doctor.speciality}
                            </span>
                            <br />
                            <span className="font-medium">
                              {doctor.year_of_experience} Years Experience
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12 mt-3">No doctors available.</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2 mx-5">
            {doctorSelected && (
              <div>
                {isLoadingtime ? (
                  <div style={{ textAlign: "center" }}>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <br />
                    <span>Please wait... Loading time slots</span>
                  </div>
                ) : (
                  <>
                    {doctorDetails.length > 0 && times.length > 0 ? (
                      <div className="flex flex-col">
                        <label className="font-medium">Select Time Slots</label>

                        <div className="flex flex-wrap gap-4">
                          {times.map((time) => (
                            <div key={time.id} className="flex ">
                              <button
                                className={` border-2 border-green-300 px-3 rounded-full  ${
                                  selectedTimes === time.id
                                    ? "bg-green-400 border-none text-white"
                                    : ""
                                }`}
                                onClick={() => handleButtonClick(time)}
                              >
                                {time.slots}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : doctorDetails.length === 0 ? null : (
                      <div>No available time slots.</div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="grid gap-2  items-center  mx-5">
            <label htmlFor="reason" className="font-semibold">
              Reason for Appointment :
            </label>
            <textarea
              name="reason"
              value={reasonValue}
              onChange={onChangeReasonValue}
              className="border border-gray-400 p-2 outline-none rounded-md"
              placeholder="Enter reason for appointment"
            ></textarea>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="mx-5 flex md:flex-row flex-col md:items-center gap-5"
              // style={{ display: "flex", alignItems: "center" }}
            >
              <div className="flex flex-col">
                <label htmlFor="file-type" className="font-medium">
                  Upload Report
                </label>
                <select
                  id="file-type"
                  onChange={onFileTypeChange}
                  value={selectedFileType}
                  className="border-b border-gray-400 p-2 outline-none "
                >
                  <option value="">Select Report</option>
                  <option value="Blood">Blood Report</option>
                  <option value="CT">CT Scan</option>
                  <option value="CBC">CBC Report</option>
                  <option value="Ultrasonic">Ultrasonic Report</option>
                  <option value="Urine Report">Urine Report</option>
                  <option value="Daibetes">Daibetes</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  style={{
                    border: "none",
                    padding: "13px",
                    backgroundColor: "#ffff",
                  }}
                  type="file"
                  onChange={onChangeSelectFile}
                  accept=".pdf"
                  // id="drop-zone"
                />
                <button
                  className="border-2 px-4 p-1 border-black rounded-md"
                  onClick={addReport}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="mx-5 flex flex-col gap-2">
            {uploadedReports.map((report, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-y-5 md:gap-y-0 items-center justify-between border-b "
              >
                <p className="">
                  <span className="font-medium">Report Type:</span>{" "}
                  {report.type}
                </p>
                <p className="">
                  <span className="font-medium">File Name:</span>{" "}
                  {report.file.name}
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-400 rounded-md text-white px-4"
                    style={{ height: 32 }}
                    onClick={() => removeReport(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-5 justify-center items-center my-4">
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-700 font-medium  py-2 px-4 rounded"
              style={{ background: themeColor }}
              onClick={bookConsultation}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDocAppointment;
