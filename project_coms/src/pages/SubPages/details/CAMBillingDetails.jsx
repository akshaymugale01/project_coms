import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaDownload, FaRegFileAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  domainPrefix,
  getAddressSetupDetails,
  getCamBillingDataDetails,
  getCamBillInvoiceDownload,
  getCamLogo,
  downloadReceiptInvoice,
} from "../../../api";
import { toWords } from "number-to-words";
import toast from "react-hot-toast";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/table/Table";
import RecallInvoiceModal from "../../../containers/modals/RecallInvoiceModal";
import CAMBillInvoiceReceivePaymentModal from "../../../containers/modals/CAMBillInvoiceReceivePaymentModal";
import CAMBillingPaymentStatusModal from "../../../containers/modals/CAMBillingPaymentStatusModal";
function CAMBillingDetails() {
  const themeColor = useSelector((state) => state.theme.color);
  const [recallModal, setRecallModal] = useState(false);
  const [receivePayment, setReceivePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [camBilling, setComBilling] = useState([]);
  const [camBillingAllData, setCamBillingAllData] = useState({});
  const [invoiceReceipt, setInvoiceReceipt] = useState([]);
  const [addressInvoice, setAddressInvoice] = useState({});
  const [amountCharges, setAmountCharges] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [logo, setLogo] = useState({});
  const { id } = useParams();

  const [totalAmount, setTotalAmount] = useState("");
  const [totalAmountPaid, setTotalAmountPaid] = useState("");
  const [paymentStatusButton, setPaymentStatusButton] = useState("");

  const fetchAddressSetupDetails = async (addressId) => {
    try {
      const addressSetupCamBilling = await getAddressSetupDetails(addressId);
      setAddressInvoice(addressSetupCamBilling.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(addressInvoice);

  const fetchCamBilling = async () => {
    try {
      const response = await getCamBillingDataDetails(id);
      console.log(response.data);
      setCamBillingAllData(response.data);
      setComBilling(response.data);
      fetchAddressSetupDetails(response.data.invoice_address_id);
      const transformedData = [response.data];
      setAmountCharges(transformedData);
      setReceiver(response.data.reciever_details);
      console.log(receiver);
      setInvoiceReceipt(response.data.invoice_receipts);
      setReceivePaymentDetails(response.data.payments);
      setTotalAmount(response.data.total_amount);
      setTotalAmountPaid(
        response.data.payments.reduce((sum, item) => sum + item.total_amount, 0)
      );
    } catch (err) {
      console.error("Failed to fetch Cam Billing data:", err);
    }
  };

  const fetchLogo = async () => {
    try {
      const response = await getCamLogo();
      setLogo(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCamBilling();
    fetchLogo();
  }, [id]);
  const columns = [
    { name: "S.N.", key: "sn" },
    { name: "Description Of Service/Goods", key: "description" },
    { name: "SAC/HSN Code", key: "SACHSNCode" },
    { name: "Qty", key: "qty" },
    { name: "Unit", key: "unit" },
    { name: "Rate", key: "rate" },
    { name: "Total Value", key: "total_value" },
    { name: "Discount/Rebate", key: "percentage" },
    { name: "Taxable Value", key: "taxable_value" },
    { name: "CGST Rate", key: "cgst_rate" },
    { name: "CGST Amount", key: "cgst_amount" },
    { name: "SGST Rate", key: "sgst_rate" },
    { name: "SGST Amount", key: "sgst_amount" },
    { name: "IGST Rate", key: "igst_rate" },
    { name: "IGST Amount", key: "igst_amount" },
  ];

  // Safely access camBilling.charges
  const filteredData =
    camBilling?.charges?.map((charge, index) => ({
      sn: index + 1,
      description: charge.description || "N/A",
      SACHSNCode: charge.hsn_id || "N/A",
      qty: charge.quantity || "0",
      unit: charge.unit || "N/A",
      rate: charge.rate || "0.00",
      total_value: charge.total_value || "0.00",
      percentage: `${charge.discount_percent || "0"}%`,
      taxable_value: charge.taxable_value || "0.00",
      cgst_rate: `${charge.cgst_rate || "0"}%`,
      cgst_amount: charge.cgst_amount || "0.00",
      sgst_rate: `${charge.sgst_rate || "0"}%`,
      sgst_amount: charge.sgst_amount || "0.00",
      igst_rate: `${charge.igst_rate || "0"}%`,
      igst_amount: charge.igst_amount || "0.00",
    })) || [];
  console.log(filteredData);
  const columnsPaymentDetails = [
    {
      name: "Previous Amount Due",
      selector: (row, index) => row.due_amount,
      sortable: true,
    },
    {
      name: "Current Charges",
      selector: (row) => row.total_charge,
      sortable: true,
    },
    {
      name: "Interest Amt on previous dues",
      selector: (row) => row.due_amount_interst,
      sortable: true,
    },
    {
      name: "Total Amount Due",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
    },
  ];
  const download = async (id) => {
    try {
      const response = await downloadReceiptInvoice(id);
      console.log(response);
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "receipt_invoice_file.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Receipt Invoice downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading :", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const columnsReceipts = [
    {
      name: "Receipt No.",
      selector: (row, index) => row.receipt_number,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoice_number,
      sortable: true,
    },
    // {
    //   name: "Block",
    //   selector: (row) => row.building_id,
    //   sortable: true,
    // },
    // {
    //   name: "Flat",
    //   selector: (row) => row.unit_id,
    //   sortable: true,
    // },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Amount Received",
      selector: (row) => row.amount_received,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.transaction_or_cheque_number,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date,
      sortable: true,
    },
    {
      name: "Receipt Date",
      selector: (row) => row.receipt_date,
      sortable: true,
    },
    // {
    //   name: "Mail sent",
    //   selector: (row) => row.mail_sent,
    //   sortable: true,
    // },
    {
      name: "Attachments",
      selector: (row) => (
        <div>
          <button onClick={() => download(row.id)}>
            <FaRegFileAlt />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  const [receivePaymentDetails, setReceivePaymentDetails] = useState([]);
  const handleClick = (image_path) => {
    console.log(image_path);
    window.open(`${domainPrefix}${image_path}`, "_blank");
  };

  const columnsTransaction = [
    {
      name: "Date",
      selector: (row, index) => row.created_at,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.transaction_id,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.paymen_date,
      sortable: true,
    },
    {
      name: "images",
      selector: (row) => (
        <div>
          <button onClick={() => handleClick(row.image_url)}>
            <FaRegFileAlt />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  const amount = camBilling.total_amount;
  const amountInWords = Number.isFinite(amount)
    ? toWords(amount)
    : "Invalid Amount";

  const handleDownload = async () => {
    try {
      const response = await getCamBillInvoiceDownload(id);
      console.log(id);
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cam_invoice_file.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Cam Billing Invoice downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading :", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const getStatusButton = () => {
    const status = camBillingAllData.status;

    // if (status === "pending" || status === "recall" || status === null) {
    //   return (
    //     <button className="bg-black text-white p-2 px-5 w-fit rounded-md">
    //       Unpaid
    //     </button>
    //   );
    // } else {
    //   return (
    //     <button className="bg-green-500 text-white p-2 px-5 w-fit rounded-md">
    //       Paid
    //     </button>
    //   );
    // }

    if (totalAmountPaid === 0) {
      return (
        <button className="bg-black text-white p-2 px-5 w-fit rounded-md">
          Unpaid
        </button>
      );
    } else if (totalAmountPaid < totalAmount) {
      return (
        <button className="bg-black text-white p-2 px-5 w-fit rounded-md">
          Partial Paid
        </button>
      );
    } else if (totalAmountPaid > totalAmount) {
      return (
        <button className="bg-black text-white p-2 px-5 w-fit rounded-md">
          Paid Extra
        </button>
      );
    } else if (totalAmountPaid === totalAmount) {
      return (
        <button className="bg-green-500 text-white p-2 px-5 w-fit rounded-md">
          Paid
        </button>
      );
    }
  };
  console.log(camBillingAllData.status);
  console.log(receivePaymentDetails);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: "rgb(3 19 37)" }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          CAM Billing Details
        </h2>
        <div className="flex justify-end mx-5">
          <div className="md:flex grid grid-cols-2 sm:flex-row flex-col gap-2">
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: "rgb(3 19 37)" }}
              onClick={() => setRecallModal(true)}
            >
              Recall
            </button>
            <Link
              to={`/cam_bill/create-invoice-receipt/${id}`}
              style={{ background: "rgb(3 19 37)" }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            >
              Create Invoice Receipt
            </Link>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: "rgb(3 19 37)" }}
              onClick={() => setReceivePayment(true)}
            >
              Receive Payment
            </button>
            <button
              onClick={handleDownload}
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: "rgb(3 19 37)" }}
            >
              <FaDownload />
              Download Invoice
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 mx-5 my-5">
          <div className="space-y-2">
            {getStatusButton()}
            <div className="">
              {/* <img src="/building.jpg" className="w-60 h-40 rounded-md"></img> */}
              {logo?.logo_url ? (
                <img
                  src={`${domainPrefix}${logo.logo_url}`} // Use logo_url for the image source
                  className="w-60 h-40 rounded-md"
                  alt="Invoice Logo"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
          <div className="my-5">
            <h2 className="font-bold text-lg">{addressInvoice.title}</h2>
            <p className="font-normal">{addressInvoice.address}</p>
            <p className="font-normal">Tel :{addressInvoice.phone_number}</p>
            <p className="font-normal">Fax:{addressInvoice.fax_number}</p>
            <p className="font-normal">E-mail:{addressInvoice.email_address}</p>
          </div>
        </div>
        <div className="mx-5">
          <h2 className="border-b  text-xl border-black font-semibold">
            Tax invoice
          </h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>GSTIN : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.gst_number}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>PAN : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.pan_number}
                </p>
              </div>
              <div className="grid grid-cols-2">
                {/* <p>Consecutive Serial No : </p> */}
                <p>Invoice No : </p>
                <p className="text-sm font-normal">
                  {camBillingAllData.invoice_number}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Customer Code : </p>
                <p className="text-sm font-normal"></p>
              </div>
            </div>
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Date of Supply : </p>
                <p className="text-sm font-normal">
                  {camBillingAllData.supply_date}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Billing Period: : </p>
                <p className="text-sm font-normal">
                  {camBillingAllData.bill_period_start_date} to{" "}
                  {camBillingAllData.bill_period_end_date}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Place of Supply/Delivery : </p>
                <p className="text-sm font-normal">{addressInvoice.state}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5">
          <h2 className="border-b  text-xl border-black font-semibold">
            Details of Receiver of supply:
          </h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Name : </p>
                <p className="text-sm font-normal">
                  {receiver?.firstname || ""} {receiver?.lastname || ""}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Address : </p>
                <p className="text-sm font-normal">
                  {receiver?.user_address || ""}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>PAN : </p>
                <p className="text-sm font-normal">
                  {receiver?.pan_number || ""}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>State : </p>
                <p className="text-sm font-normal">{addressInvoice.state}</p>
              </div>
              {/* <div className="grid grid-cols-2">
                <p>State Code : </p>
                <p className="text-sm font-normal">27</p>
              </div> */}
              <div className="grid grid-cols-2">
                <p>GSTIN/ Unique ID : </p>
                <p className="text-sm font-normal">
                  {receiver?.gst_number || ""}/{receiver?.uid || ""}
                </p>
              </div>
            </div>
            <div className="space-y-2 px-5"></div>
          </div>
        </div>
        <div className="my-5 mx-5">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr style={{ background: "rgb(12 19 37)" }}>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-left text-sm text-white"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2 text-sm text-black"
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Invoice Value (In Figure): {camBilling.total_charge}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Amount Due (In Figure): {camBilling.total_amount}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Amount (In Words): {amountInWords}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="mx-5 border-b  text-xl border-black font-semibold">
          <h2 className="border-b  text-xl border-black font-semibold"></h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>
                  Certified that the Particulars given above are true and
                  correct and the amount indicated. :{" "}
                </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-lg">Bank Details : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>A/C Name : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.account_name}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>A/C No : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.account_number}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Account Type : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.account_type}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Bank & Branch : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.bank_branch_name}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>IFSC : </p>
                <p className="text-sm font-normal">
                  {addressInvoice.ifsc_code}
                </p>
              </div>
            </div>
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Authorized Signatory : </p>
                <p className="text-sm font-normal"></p>
                <div className="my-5">
                  {addressInvoice?.attachments?.[0]?.image_url ? (
                    <img
                      src={
                        domainPrefix + addressInvoice.attachments[0].image_url
                      } // Prepend base URL if needed
                      className="w-60 h-40 rounded-md"
                      alt="Invoice"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 border-b  text-xl border-black font-semibold">
          <h2 className="border-b  text-xl border-black font-semibold"></h2>
          <div className="grid grid-cols-1 my-5">
            <p>Note : </p>
            <p className="text-sm font-normal">{camBilling.note}</p>
          </div>
        </div>
        <div className="my-5 mx-5">
          <Table columns={columnsPaymentDetails} data={amountCharges} />
        </div>
        <div className="my-5 mx-5">
          <h2 className="">Transaction details for this invoice</h2>
          <Table columns={columnsTransaction} data={receivePaymentDetails} />
        </div>
        <div className="my-5 mx-5">
          <h2 className="">Imported Receipts</h2>
          <Table columns={columnsReceipts} data={invoiceReceipt} />
        </div>
      </div>
      {recallModal && (
        <RecallInvoiceModal
          onclose={() => setRecallModal(false)}
          fetchCamBilling={fetchCamBilling}
        />
      )}
      {receivePayment && (
        <CAMBillInvoiceReceivePaymentModal
          onclose={() => setReceivePayment(false)}
          fetchCamBilling={fetchCamBilling}
        />
      )}
      {paymentStatus && (
        <CAMBillingPaymentStatusModal onclose={() => setPaymentStatus(false)} />
      )}
    </section>
  );
}

export default CAMBillingDetails;
