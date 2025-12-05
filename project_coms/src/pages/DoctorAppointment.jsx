import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import {
  API_URL,
  getDocAppointmentList,
  getDocCancelCheck,
  postDocCancellation,
  vibeMedia,
} from "../api";
import { getItemInLocalStorage } from "../utils/localStorage";
import toast from "react-hot-toast";
import { FaVideo } from "react-icons/fa";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";

const DoctorAppointment = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("upcoming");
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showReportList, setShowReportList] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDownload = (filename) => {
    const downloadLink = vibeMedia + filename;
    window.open(downloadLink, "_blank");
  };
  const columns = [
    {
      name: "Patient Name",
      selector: (row) => row.consultation_for.full_name,
      sortable: true,
    },
    {
      name: "Doctor",
      selector: (row) =>
        ` ${row.doctor_id.firstname} ${row.doctor_id.lastname}`,
      sortable: true,
    },

    {
      name: "Appointment Date",
      selector: (row) => row.appointment_date,
      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row.doctor_slot.slots,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason_for_consultation,
      sortable: true,
    },

    // {
    //   name: "Approval",
    //   selector: (row) => (row.status === "Upcoming" &&
    //   <div className="flex justify-center gap-2">
    //       <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full"><TiTick size={20} /></button>
    //
    //   </div>
    // ),
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          {row.confirmed == "1" ? (
            <button
              className="hover:bg-green-400 hover:text-white rounded-full p-1 text-green-400 transition-all duration-200"
              onClick={() => {
                if (checkExpiry(row.appointment_date, row.doctor_slot.slots)) {
                } else {
                  window.open(row.meeting_url, "_blank");
                }
              }}
            >
              <FaVideo size={16} />
            </button>
          ) : (
            <> </>
          )}
          {/* <Link to={`/doc-appointment-details/${row.id}`}>
            <BsEye title="View details" size={18} />
          </Link> */}
          <button
            className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"
            title="Cancel"
            onClick={() => CancelAppointmentModal(row.id)}
          >
            <IoClose size={20} />
          </button>
        </div>
      ),
    },
  ];
  const completedColumns = [
    {
      name: "Patient Name",
      selector: (row) => row.consultation_for.full_name,
      sortable: true,
    },
    {
      name: "Doctor",
      selector: (row) =>
        ` ${row.doctor_id.firstname} ${row.doctor_id.lastname}`,
      sortable: true,
    },

    {
      name: "Appointment Date",
      selector: (row) => row.appointment_date,
      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row.doctor_slot.slots,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason_for_consultation,
      sortable: true,
    },

    // {
    //   name: "Report",
    //   cell: (row) => (
    //     <div className="relative inline-block text-left">
    //       <button
    //         type="button"
    //         className="p-1 pl-3 pr-3 bg-gray-200 rounded-md"
    //         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //       >
    //         Download PDFs
    //       </button>

    //       {isDropdownOpen && (
    //         <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
    //           <div className="py-1">
    //             {selectedRecords.length === 0 &&
    //               row.consultation_reports.map((report, reportIndex) => (
    //                 <button
    //                   key={reportIndex}
    //                   className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
    //                   onClick={() => {
    //                     handleDownload(report.reports);
    //                     setSelectedReport(report.reports);
    //                     setIsDropdownOpen(false);
    //                   }}
    //                 >
    //                   {report.reports.split("_").slice(2).join("_")}
    //                   <i className="fas fa-download ml-3"></i>
    //                 </button>
    //               ))}

    //             {selectedRecords.length > 0 &&
    //               single.consultation_reports
    //                 .filter((report) =>
    //                   selectedRecords.includes(report.report_type)
    //                 )
    //                 .map((report, reportIndex) => (
    //                   <button
    //                     key={reportIndex}
    //                     className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
    //                     onClick={() => {
    //                       handleDownload(report.reports);
    //                       setSelectedReport(report.reports);
    //                       setIsDropdownOpen(false);
    //                     }}
    //                   >
    //                     {report.reports.split("_").slice(2).join("_")}
    //                     <i className="fas fa-download ml-3"></i>
    //                   </button>
    //                 ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "Prescription",
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          <a
            target="_blank"
            href={"https://vibecopilot.ai/api/media" + row.prescription_url}
            style={{ color: "black" }}
          >
            <FaPrescriptionBottleMedical size={20} />
          </a>
        </div>
      ),
    },
  ];
  function checkExpiry(from_date, time_range) {
    const [year, month, day] = from_date.split("-").map(Number);
    const startTime = time_range.split(" ")[0];
    const [hours, minutes] = startTime.split(":").map(Number);
    let fromDate = new Date(year, month - 1, day, hours, minutes);
    fromDate.setMinutes(fromDate.getMinutes());
    const now = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const currentDate = new Date(now);
    // currentDate.setMinutes(currentDate.getMinutes() + 330);
    const acceptableStartTime = new Date(fromDate);
    acceptableStartTime.setMinutes(acceptableStartTime.getMinutes() - 5);

    // Calculate the end time of the acceptable range (10 minutes after)
    const acceptableEndTime = new Date(fromDate);
    console.log("end fromDate date----", acceptableEndTime);
    acceptableEndTime.setMinutes(acceptableEndTime.getMinutes() + 10);
    console.log("plus 10 fromDate date----", acceptableEndTime);
    const isWithinTimeRange = currentDate >= acceptableStartTime;
    const isWithinTimeRange1 = currentDate <= acceptableEndTime;

    // Compare the dates
    if (!isWithinTimeRange) {
      toast.error(
        "The consultation hasn't started yet. Please join when the session begins.",
        { position: "top-center", autoClose: 2000 }
      );
      return true;
    } else if (!isWithinTimeRange1) {
      toast.error(
        "The consultation has ended. Please schedule a new appointment.",
        { position: "top-center", autoClose: 2000 }
      );

      return true;
    } else {
      return false;
    }
  }
  const checkCancel = async (cancelId) => {
    console.log(cancelId);
    try {
      const response = await getDocCancelCheck(user_id, cancelId);
      if (response.success === true) {
        console.log(response.data);
        setCancelModal(true);
      } else {
        console.log("Something went wrong");
        if (response.status === 121) {
          toast.error(
            "Unfortunately, you have exceeded the allowed limit for canceling appointments.",
            { position: "top-center", autoClose: 2000 }
          );
        } else {
          toast.error("Please try again.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const CancelAppointmentModal = (id) => {
    setCancelId(id);
    checkCancel(cancelId);
  };
  const cancelledColumns = [
    {
      name: "Patient Name",
      selector: (row) => row.consultation_for.full_name,
      sortable: true,
    },
    {
      name: "Doctor",
      selector: (row) =>
        ` ${row.doctor_id.firstname} ${row.doctor_id.lastname}`,
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: (row) => row.appointment_date,
      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row.doctor_slot?.slots,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason_for_consultation,
      sortable: true,
    },
    {
      name: "Cancellation Reason",
      selector: (row) => row.cancellation_reason,
      sortable: true,
    },
  ];

  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointmentUpcoming, setAppointmentUpcoming] = useState([]);

  const [appointmentDoctor, setAppointmentDoctor] = useState("Upcoming");
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const fetchConsultationLists = async () => {
    try {
      const response = await getDocAppointmentList(user_id);
      if (response.success === true) {
        console.log(response.data);
        setAppointmentDetails(response.data);
        setAppointmentUpcoming(response.data.upcoming);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchConsultationLists();
  }, []);

  const [cancellationReason, setCancellationReason] = useState("");

  const Cancel_Consultation = async () => {
    if (!cancellationReason) {
      toast.error("Please fill the Reason.");
      return;
    }
    // setLoading(true);

    //   setLoading(true);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("consultation_id", cancelId);
    formData.append("cancellation_reason", cancellationReason);
    formData.append("unfreeze", "true");

    //   setIsCreatingTask(true);
    await postDocCancellation(formData)
      .then((response) => {
        if (response.success) {
          // setLoading(false);
          console.log("success");
          fetchConsultationLists();
          setCancelModal(false);
          setCancellationReason("");
          // window.location.reload();
        } else {
          console.log(response.status);
          console.log(typeof response.status);
          if (response.status === 121) {
            toast.error(
              " Unfortunately, you have exceeded the allowed limit for canceling appointments.",
              { position: "top-center", autoClose: 2000 }
            );
          } else {
            toast.error("Please try again.", {
              position: "top-center",
              autoClose: 2000,
            });
          }

          // setLoading(false);
          console.log("unsuccess");
        }
      })
      .catch((error) => {
        //   setLoading(false);
        //alert('Please check your internet and try again!');
      })
      .finally(() => {
        //   setLoading(false);
      });
  };
  const Reschedule = () => {
    console.log("rescheduleId------------------------------");
    console.log(cancelId);

    navigate("/doctor-appointments/book-doc-appointment", {
      state: { cancelId, cancellationReason },
    });
  };
  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5  justify-between mt-10 my-2 border-b border-gray-300">
          <div className="flex gap-4  ">
            <h2
              className={`cursor-pointer transition-all duration-200 ${
                page === "upcoming" ? "border-black border-b-2 font-medium" : ""
              }`}
              onClick={() => setPage("upcoming")}
            >
              Upcoming
            </h2>
            <h2
              className={`cursor-pointer transition-all duration-200 ${
                page === "completed"
                  ? "border-black border-b-2 font-medium"
                  : ""
              }`}
              onClick={() => setPage("completed")}
            >
              Completed
            </h2>
            <h2
              className={`cursor-pointer transition-all duration-200 ${
                page === "cancelled"
                  ? "border-black border-b-2 font-medium"
                  : ""
              }`}
              onClick={() => setPage("cancelled")}
            >
              Cancelled
            </h2>
          </div>
          <Link
            style={{ background: themeColor }}
            to={"/doctor-appointments/book-doc-appointment"}
            className=" font-semibold hover:bg-black text-white duration-150 transition-all k p-2 rounded-sm cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Book an Appointment
          </Link>
        </div>
        {page === "upcoming" && (
          <Table responsive columns={columns} data={appointmentUpcoming} />
        )}
        {page === "completed" && (
          <Table
            responsive
            columns={completedColumns}
            data={appointmentDetails.completed}
          />
        )}
        {page === "cancelled" && (
          <Table
            responsive
            columns={cancelledColumns}
            data={appointmentDetails.cancelled}
          />
        )}
      </div>

      {cancelModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
          <div
            style={{ background: themeColor }}
            className="bg-white overflow-auto max-h-[70%] w-[30rem] p-4 px-8 flex flex-col rounded-md gap-5"
          >
            <div className="col-md-12">
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2 className="text-xl font-medium text-white my-2">
                  Cancel Consultation
                </h2>
                {/* <img onClick={closeModal} class=" col-md-1 " src={ClosePopUp} alt="" /> */}
                {/* <span className="btn_clo close" onClick={closeModal}>
              &times;
            </span> */}
              </div>

              <div className="flex flex-col gap-2 ">
                <span className="font-medium text-white">
                  Reason for Cancelling Consultation
                </span>

                <textarea
                  className="border border-gray-400 rounded-md p-2"
                  spellCheck={true}
                  rows={6}
                  placeholder="Enter reason"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                ></textarea>
              </div>
              {/* <button
            className="pr-3 pl-3 p-1 mr-2 ml-2"
            // onClick={() => Reschedule(single.id, cancellationReason)}
          >
            <span style={{ color: "white" }}>Reschedule</span>
          </button> */}

              <div
                className="mt-2 gap-2"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="bg-green-400 text-white  p-1 px-2 rounded-md"
                  onClick={() => Cancel_Consultation()}
                >
                  <span>Done</span>
                </button>
                <button
                  className="bg-red-400 text-white p-1 px-2 rounded-md"
                  onClick={() => setCancelModal(false)}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorAppointment;
