import React, { useEffect, useState } from "react";
import { IoMdPrint } from "react-icons/io";
import { MdFeed } from "react-icons/md";
import Table from "../../../components/table/Table";
import { getLOIDetails } from "../../../api";
import { useParams } from "react-router-dom";
import numberToWordsIndian from "../../../utils/NumbersToWords";
import { FaRegFileAlt } from "react-icons/fa";

const MaterialPRDetails = () => {
  const { id } = useParams();
  const [details, seDetails] = useState({});
  const [loiItems, setLoiItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [netAmt, setNetAmt] = useState("");
  const [netAmtInWords, setNetAmtInWords] = useState("");
  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  useEffect(() => {
    const fetchLOIDetails = async () => {
      try {
        const loiResp = await getLOIDetails(id);
        console.log(loiResp.data);
        setLoiItems(loiResp.data.loi_items);
        seDetails(loiResp.data);

        console.log("Supplier", loiResp.data.supplier);

        const totalAmount = loiResp.data.loi_items
          ? loiResp.data.loi_items.reduce(
              (sum, item) => sum + (Number(item.amount) || 0),
              0
            )
          : " ";

        const taxAmt = loiResp.data.loi_items
          ? loiResp.data.loi_items.reduce(
              (sum, item) => sum + (Number(item.tax_amt) || 0),
              0
            )
          : " ";

        setTotalAmount(formatAmount(totalAmount));

        setTaxAmount(formatAmount(taxAmt));
        const netAmount = totalAmount + taxAmt;
        setNetAmt(formatAmount(netAmount));
        setNetAmtInWords(numberToWordsIndian(netAmount));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLOIDetails();
  }, []);

  const column = [
    { name: "Sr.No", selector: (row, index) => index + 1, sortable: true },
    { name: "Item Details", selector: (row) => row.item_name, sortable: true },
    { name: "SAC/HSN Code", selector: (row) => row.sac_code, sortable: true },

    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    { name: "Unit", selector: (row) => row.standard_unit_name, sortable: true },
    { name: "Rate", selector: (row) => row.rate, sortable: true },
    { name: "CGST(%)", selector: (row) => row.csgt_rate, sortable: true },
    { name: "CGST AMT", selector: (row) => row.csgt_amt, sortable: true },
    {
      name: "SGST(%)",
      selector: (row) => row.sgst_rate,
      sortable: true,
    },
    {
      name: "SGST AMT",
      selector: (row) => row.sgst_amt,
      sortable: true,
    },
    { name: "IGST(%)", selector: (row) => row.igst_rate, sortable: true },
    { name: "IGST AMT", selector: (row) => row.igst_amt, sortable: true },
    { name: "TCS(%)", selector: (row) => row.tcs_rate, sortable: true },
    { name: "TCS AMT", selector: (row) => row.tcs_amt, sortable: true },

    { name: "Tax Amount", selector: (row) => row.tax_amt, sortable: true },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
  ];

  const columnDebitNote = [
    { name: "ID", selector: (row) => row.ID, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    { name: "Description", selector: (row) => row.Description, sortable: true },
    { name: "Approved", selector: (row) => row.Approved, sortable: true },
    { name: "Approved On", selector: (row) => row.ApprovedOn, sortable: true },
    { name: "Approved By", selector: (row) => row.ApprovedBy, sortable: true },
    { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
    { name: "Attachment", selector: (row) => row.QCAmount, sortable: true },
  ];
  const dataDebitNote = [
    {
      id: 1,
      ID: "",
      Amount: "",
      Description: "",
      Approved: "",
      ApprovedOn: "",
      ApprovedBy: "",
      CreatedOn: "",
      CreatedBy: "",
      Attachment: "",
    },
  ];
  const columnPayment = [
    { name: "Action", selector: (row) => row.Action, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    {
      name: "Payment Mode",
      selector: (row) => row.PaymentMode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.TransactionNumber,
      sortable: true,
    },
    { name: "Status	", selector: (row) => row.Status, sortable: true },
    {
      name: "Payment Date",
      selector: (row) => row.PaymentDate,
      sortable: true,
    },
    { name: "Note", selector: (row) => row.Note, sortable: true },
    {
      name: "Date of Entry",
      selector: (row) => row.DateofEntry,
      sortable: true,
    },
    { name: "Actions", selector: (row) => row.Actions, sortable: true },
  ];
  const dataPayment = [
    {
      id: 1,
      Action: "",
      Amount: "",
      PaymentMode: "",
      TransactionNumber: "",
      Status: "",
      PaymentDate: "",
      Note: "",
      DateofEntry: "",
      Actions: "",
    },
  ];
  const columnRetentionPayment = [
    { name: "Action", selector: (row) => row.Action, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    {
      name: "Payment Mode",
      selector: (row) => row.PaymentMode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.TransactionNumber,
      sortable: true,
    },
    { name: "Status	", selector: (row) => row.Status, sortable: true },
    {
      name: "Payment Date",
      selector: (row) => row.PaymentDate,
      sortable: true,
    },
    { name: "Note", selector: (row) => row.Note, sortable: true },
    {
      name: "Date of Entry",
      selector: (row) => row.DateofEntry,
      sortable: true,
    },
    { name: "Actions", selector: (row) => row.Actions, sortable: true },
  ];
  const dataRetentionPayment = [
    {
      id: 1,
      Action: "",
      Amount: "",
      PaymentMode: "",
      TransactionNumber: "",
      Status: "",
      PaymentDate: "",
      Note: "",
      DateofEntry: "",
      Actions: "",
    },
  ];
  const columnQCPayment = [
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    {
      name: "Payment Mode",
      selector: (row) => row.PaymentMode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.TransactionNumber,
      sortable: true,
    },
    { name: "Status	", selector: (row) => row.Status, sortable: true },
    {
      name: "Payment Date",
      selector: (row) => row.PaymentDate,
      sortable: true,
    },
    { name: "Note", selector: (row) => row.Note, sortable: true },
    {
      name: "Date of Entry",
      selector: (row) => row.DateofEntry,
      sortable: true,
    },
    { name: "Actions", selector: (row) => row.Actions, sortable: true },
  ];
  const dataQCPayment = [
    {
      id: 1,
      Amount: "",
      PaymentMode: "",
      TransactionNumber: "",
      Status: "",
      PaymentDate: "",
      Note: "",
      DateofEntry: "",
      Actions: "",
    },
  ];

  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };
  const domainPrefix = "https://admin.vibecopilot.ai";
  const [statusFilter, setStatusFilter] = useState("Pending");

  const statusOptions = [
    "Pending",
    "SiteApproval",
    "Admin Head Approval",
    "HO Approval",
    "Approved",
    "Completed"
  ];

  return (
    <section className="mb-10">
      <div className="flex flex-col  md:justify-between my-5 w-full">
        <h2 className="text-xl font-semibold mx-5 border-b text-center border-black">
          Material PR DETAILS
        </h2>
        <div className="flex my-2 justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="font-semibold border-2 border-black px-4 p-1 rounded-md mr-3"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
            Clone
          </button>
          <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3">
            <MdFeed />
            feeds
          </button>
          <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
            <IoMdPrint />
            Print
          </button>
          &nbsp;
        </div>
      </div>
      <div className="flex gap-3 item-center justify-center md:justify-between my-3 md:mx-5 flex-wrap">
        <div className="flex flex-col gap-1 justify-center md:items-center">
          <p className="text-sm font-medium">Project Site Approval:</p>
          <p className="bg-orange-400 px-2 text-center  py-1 rounded-md text-white text-sm">
            Pending
          </p>
          <p className="">Approval Authority</p>
        </div>
        <div className="flex flex-col gap-1 justify-center md:items-center">
          <p className="text-sm font-medium">Admin Head Approval:</p>
          <p className="bg-orange-400 px-2 text-center py-1 rounded-md text-white text-sm">
            Pending
          </p>
          <p className="">Approval Authority</p>
        </div>
        <div className="flex flex-col gap-1 justify-center md:items-center">
          <p className="text-sm font-medium">HO Approval:</p>
          <p className="bg-orange-400 px-2 items-center py-1 rounded-md text-white text-sm text-center">
            Pending
          </p>
          <p className="">Approval Authority</p>
        </div>
        <div className="flex flex-col gap-1 justify-center md:items-center">
          <p className="text-sm font-medium">Prompter Approval:</p>
          <p className="bg-orange-400 px-2 items-center py-1 rounded-md text-white text-sm text-center">
            Pending
          </p>
          <p className="">Approval Authority</p>
        </div>
      </div>

      <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
        <h2 className=" text-lg border-black font-semibold text-center">
          {details.site_name}
        </h2>
        <div className="my-5  text-sm items-center font-medium grid gap-4 md:grid-cols-2">
          {details.billing_address && details.billing_address.phone_number && (
            <div className="grid grid-cols-2 items-center">
              <p>Phone :</p>
              <p className="text-sm font-normal ">
                {details.billing_address.phone_number}
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 items-center">
            <p>Fax </p>
            <p className="text-sm font-normal ">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Email</p>
            <p className="text-sm font-normal ">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>GST</p>
            <p className="text-sm font-normal ">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>PAN</p>
            <p className="text-sm font-normal ">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Address :</p>
            <p className="text-sm font-normal ">: NA</p>
          </div>
          {/* <div className="grid gap-2 col-span-3 items-center">
            <p>Address :</p>
            {details.billing_address &&
                details.billing_address.building_name && (
                  <p className="text-sm font-normal bg-gray-100 p-2 rounded-md">
                    {details.billing_address.building_name},{" "}
                    {details.billing_address.street_name},{" "}
                    {details.billing_address.city},{" "}
                    {details.billing_address.state},{" "}
                    {details.billing_address.pin_code}.
                  </p>
                )}
          </div> */}
        </div>
        <h2 className="border-t text-lg border-b border-black font-semibold ">
          Material PR
        </h2>
        <div className="my-5  text-sm items-center font-medium grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 items-center">
            <p>PR No. :</p>
            <p className="text-sm font-normal">{details.pr_no}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Reference No. :</p>
            <p className="text-sm font-normal">{details.reference}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>PR Date :</p>
            <p className="text-sm font-normal">{details.loi_date}</p>
          </div>
                    <div className="grid grid-cols-2 items-center">
            <p>Supplier :</p>
            <p className="text-sm font-normal">{details?.supplier?.company_name}</p>
          </div>
          {/* <div className="grid  items-center col-span-3">
            <p>Address :</p>
            {details.delivery_address &&
                details.delivery_address.building_name && (
                  <p className="text-sm font-normal bg-gray-100 rounded-md p-2">
                    {details.delivery_address.building_name},{" "}
                    {details.delivery_address.street_name},{" "}
                    {details.delivery_address.city},{" "}
                    {details.delivery_address.state},{" "}
                    {details.delivery_address.pin_code}.
                  </p>
                )}
          </div> */}
          <div className="grid grid-cols-2 items-center">
            <p>Phone</p>
            <p className="text-sm font-normal">: {details?.supplier?.mobile}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Address</p>
            <p className="text-sm font-normal">{details?.supplier?.address}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Email</p>
            <p className="text-sm font-normal">{details?.supplier?.email}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>GST</p>
            <p className="text-sm font-normal">{details?.supplier?.gst}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>QC (%) :</p>
            <p className="text-sm font-normal">{details.qc}%</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Retention (%) :</p>
            <p className="text-sm font-normal">{details.retention}%</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>TDS (%) :</p>
            <p className="text-sm font-normal">{details.tds || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Transportation Amount :</p>
            <p className="text-sm font-normal">{details.transportation_amount || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Payment Tenure :</p>
            <p className="text-sm font-normal">{details.payment_tenure ? `${details.payment_tenure} Days` : "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Advance Amount :</p>
            <p className="text-sm font-normal">{details.advance_amount || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Related To :</p>
            <p className="text-sm font-normal">{details.related_to || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Approval Status :</p>
            <p className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${details.is_approved ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
              {details.is_approved ? "Approved" : "Pending"}
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Created By :</p>
            <p className="text-sm font-normal">
              {details.created_by_name ? `${details.created_by_name.firstname || ""} ${details.created_by_name.lastname || ""}`.trim() : "N/A"}
            </p>
          </div>
          <div className="grid items-center gap-2">
            <p>Billing Address : </p>
            {details.billing_address &&
              details.billing_address.building_name && (
                <p className="text-sm font-normal bg-gray-100 rounded-md p-2">
                  {details.billing_address.address_title} - {details.billing_address.building_name},{" "}
                  {details.billing_address.street_name},{" "}
                  {details.billing_address.city},{" "}
                  {details.billing_address.state},{" "}
                  {details.billing_address.pin_code}.
                </p>
              )}
          </div>
          <div className="grid items-center gap-2">
            <p>Delivery Address : </p>
            {details.delivery_address &&
              details.delivery_address.building_name && (
                <p className="text-sm font-normal bg-gray-100 rounded-md p-2">
                  {details.delivery_address.address_title} - {details.delivery_address.building_name},{" "}
                  {details.delivery_address.street_name},{" "}
                  {details.delivery_address.city},{" "}
                  {details.delivery_address.state},{" "}
                  {details.delivery_address.pin_code}.
                </p>
              )}
          </div>
        </div>
        <div className="border-black border-t mt-5"></div>
        <Table columns={column} data={loiItems} pagination={false} />
        <div className="my-2 md:px-2 text-sm items-center font-medium grid gap-1 ">
          <div className="flex justify-between items-center">
            <p>Net Amount(INR) :</p>
            <p className="text-sm font-medium ">{totalAmount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Gross Amount :</p>
            <p className="text-sm font-medium">{totalAmount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Taxes :</p>
            <p className="text-sm font-medium">{taxAmount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Net Invoice Amount :</p>
            <p className="text-sm font-bold">{netAmt}</p>
          </div>
          <div className="md:flex  gap-2 items-center">
            <p>Amount In Words :</p>
            <p className="text-sm font-medium">{netAmtInWords}</p>
          </div>
        </div>
      </div>
      <div className="border-t py-5 mx-5 border-black">
        <p className="text-md font-semibold">Notes</p>
        <p className="text-sm">No Notes</p>
      </div>
      <div className="border-t my-2 mx-5 border-black">
        <p className="text-md font-semibold">Terms & Conditions:</p>
        <p className="text-sm p-2 bg-gray-100 rounded-md">{details.terms}</p>
      </div>

      <div className="border-t my-2 mx-5 border-black">
        <p className="text-md font-semibold">Attachments</p>
        <div className="flex gap-4 flex-wrap my-4 items-center  text-center">
          {details.loi_details_image && details.loi_details_image.length > 0 ? (
            details.loi_details_image.map((doc, index) => (
              <div key={doc.id} className="">
                {isImage(domainPrefix + doc.document) ? (
                  <img
                    src={domainPrefix + doc.document}
                    alt={`Attachment ${index + 1}`}
                    className="w-40 h-28 object-cover rounded-md"
                    onClick={() =>
                      window.open(domainPrefix + doc.document, "_blank")
                    }
                  />
                ) : (
                  <a
                    href={domainPrefix + doc.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center"
                  >
                    <FaRegFileAlt size={50} />
                    {getFileName(doc.document)}
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-center w-full">No Attachments</p>
          )}
        </div>
      </div>
      <div className=" flex flex-col gap-5 items-end mx-5 border-black">
        <p className="text-md font-semibold">
          For (company name) we Confirm & Accept,
        </p>
        <p className="text-sm">Authorised Signatory</p>
      </div>
      <div className=" py-2 mx-5 border-black">
        {/* <h3 className='text-md font-semibold my-3'>Debit Note Details</h3> */}
        {/* <Table
            columns={columnDebitNote}
            data={dataDebitNote}
            /> */}
      </div>
      {/* <div className='border-t py-2 mx-5 border-black'>
            <h3 className='text-md font-semibold my-3'>Payment Details</h3>
            <Table
            columns={columnPayment}
            data={dataPayment}
            />
        </div> */}
      {/* <div className='border-t py-2 mx-5 border-black'>
            <h3 className='text-md font-semibold my-3'>Retention Payment Details</h3>
            <Table
            columns={columnRetentionPayment}
            data={dataRetentionPayment}
            />
        </div> */}
      {/* <div className='border-t py-2 mx-5 border-black'>
            <h3 className='text-md font-semibold my-3'>QC Payment Details</h3>
            <Table
            columns={columnQCPayment}
            data={dataQCPayment}
            />
        </div> */}
    </section>
  );
};

export default MaterialPRDetails;
