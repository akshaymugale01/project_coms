import React, { useEffect, useState } from "react";
import Detail from "../../../containers/Detail";
import image from "/profile.png";
import { domainPrefix, getVisitorDetails } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { BiEdit, BiQr } from "react-icons/bi";
import Navbar from "../../../components/Navbar";
import VisitorQRCode from "../../../containers/modals/VisitorQRCode";

const VisitorDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchVisitorDetails = async () => {
      try {
        const detailsResp = await getVisitorDetails(id);
        setDetails(detailsResp.data);
        console.log(detailsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVisitorDetails();
  }, [id]);

  const themeColor = useSelector((state) => state.theme.color);
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };
  const dateTimeFormat = (dateString) => {
    if (!dateString) {
      return " ";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
      return " ";
    }

    return date.toLocaleString();
  };

  const VisitorColumns = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/edit/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },
    {
      name: " Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: " Mobile No.",
      selector: (row) => row.contact_no,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
  ];

  const visitorLogColumn = [
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: " Check in",
      selector: (row) => (row.check_in ? dateTimeFormat(row.check_in) : ""),
      sortable: true,
    },
    {
      name: " Check out",
      selector: (row) => (row.check_in ? dateTimeFormat(row.check_out) : null),
      sortable: true,
    },
  ];
  const [qrModal, setQrmodal] = useState(false);
  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex flex-col gap-2">
          <h2
            style={{
              background: themeColor,
            }}
            className="text-center rounded-full w-full text-white font-semibold text-lg p-2 px-4 mt-2 "
          >
            Visitor Details
          </h2>
          <div className="flex justify-end gap-2 mx-2 mt-1">
            <button
              onClick={() => setQrmodal(true)}
              className="border-2 border-black rounded-full px-2 p-1 flex items-center gap-2"
            >
              <BiQr /> QR code
            </button>
            <Link
              to={`/admin/passes/visitors/edit-visitor/${id}`}
              className="border-2 border-black rounded-full px-2 p-1 flex items-center gap-2"
            >
              <BiEdit /> Edit Details
            </Link>
          </div>
          <div className="flex justify-center">
            {details.profile_picture && details.profile_picture !== null ? (
              // details.visitor_files.map((doc, index) => (
              <img
                src={domainPrefix + details.profile_picture.url}
                alt=""
                className="w-48 h-48 rounded-full cursor-pointer"
                onClick={() =>
                  window.open(
                    domainPrefix + details.profile_picture.url,
                    "_blank"
                  )
                }
              />
            ) : (
              // ))
              <img src={image} alt="" className="w-48 h-48" />
            )}
          </div>
          <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4">
            {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Site Name : </p>
            <p className="">{details.site_name}</p>
          </div> */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Visitor Type : </p>
              <p className="">{details.visit_type}</p>
            </div>
            {details.visit_type === "Support Staff" && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Staff Category : </p>
                <p className="">{details.visitor_staff_category.name}</p>
              </div>
            )}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Visitor's Name : </p>
              <p className="">{details.name}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Mobile No. : </p>
              <p className="">{details.contact_no}</p>
            </div>
            {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">OTP : </p>
            <p className="">{details.otp}</p>
          </div> */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Purpose : </p>
              <p className="">{details.purpose}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Coming From : </p>
              <p className="">{details.coming_from}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Vehicle No. : </p>
              <p className="">{details.vehicle_number}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Expected Date : </p>
              <p className="">{details.expected_date}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Expected Time : </p>
              <p className="">{details.expected_time}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Goods Inward : </p>
              <p className="">{details.goods_inwards ? "Yes" : "No"}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Host Approval Needed ? : </p>
              <p className="">{details.skip_host_approval ? "No" : "Yes"}</p>
            </div>
            {details.frequency === "Frequently" && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Pass Start Date : </p>
                <p className="">
                  {details.start_pass ? dateFormat(details.start_pass) : "-"}
                </p>
              </div>
            )}
            {details.frequency === "Frequently" && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Pass End Date : </p>
                <p className="">
                  {details.end_pass ? dateFormat(details.end_pass) : "-"}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Host : </p>
              {details.created_by_name && (
                <p className="">
                  {details.created_by_name.firstname}{" "}
                  {details.created_by_name.lastname}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Created On : </p>
              <p className="">{dateFormat(details.created_at)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Updated On : </p>
              <p className="">{dateFormat(details.updated_at)}</p>
            </div>
            {details.frequency === "Frequently" && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Permitted Days : </p>
                <p className="">{details.working_days.join(", ")}</p>
              </div>
            )}
          </div>

          <div className="my-4 ">
            <h2 className="font-medium border-b text-lg border-gray-400 px-2 ">
              Additional Visitors Info
            </h2>
            <div className="m-4  ">
              {details.extra_visitors && details.extra_visitors.length !== 0 ? (
                <Table columns={VisitorColumns} data={details.extra_visitors} />
              ) : (
                <p className="text-center">No Additional Visitor Added</p>
              )}
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-medium border-b text-lg border-gray-400 px-2 ">
              Visitor Log
            </h2>
            <div className="m-4">
              {details.visits_log && details.visits_log.length !== 0 ? (
                <Table columns={visitorLogColumn} data={details.visits_log} />
              ) : (
                <p className="text-center">No Log Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {qrModal && (
        <VisitorQRCode
          QR={domainPrefix + details.qr_code_image_url}
          onClose={() => setQrmodal(false)}
        />
      )}
    </section>
  );
};

export default VisitorDetails;
