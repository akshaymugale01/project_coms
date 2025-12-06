import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { getLOIDetails, getLOIItemsDetails } from "../../../api";
import { useParams } from "react-router-dom";

import numberToWordsIndian from "../../../utils/NumbersToWords";
import { FaRegFileAlt } from "react-icons/fa";

const LOIPoDetails = () => {
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
    // { name: "SAC/HSN Code", selector: (row) => row.sac_code, sortable: true },

    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    { name: "Unit", selector: (row) => row.standard_unit_name, sortable: true },
    { name: "Rate", selector: (row) => row.rate, sortable: true },
    // { name: "CGST(%)", selector: (row) => row.csgt_rate, sortable: true },
    // { name: "CGST AMT", selector: (row) => row.csgt_amt, sortable: true },
    // {
    //   name: "SGST(%)",
    //   selector: (row) => row.sgst_rate,
    //   sortable: true,
    // },
    // {
    //   name: "SGST AMT",
    //   selector: (row) => row.sgst_amt,
    //   sortable: true,
    // },
    // { name: "IGST(%)", selector: (row) => row.igst_rate, sortable: true },
    // { name: "IGST AMT", selector: (row) => row.igst_amt, sortable: true },
    // { name: "TCS(%)", selector: (row) => row.tcs_rate, sortable: true },
    // { name: "TCS AMT", selector: (row) => row.tcs_amt, sortable: true },

    // { name: "Tax Amount", selector: (row) => row.tax_amt, sortable: true },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
      sortable: true,
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
  return (
    <section>
      <div className=" flex flex-col m-5  gap-4 rounded-md ">
        <h2 className="border-b text-center text-xl border-black font-semibold">
          Letter of Indent
        </h2>
        <div className="md:border-2 flex flex-col my-5 md:mx-3 md:p-4 gap-4 rounded-md border-gray-400">
          <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <p>LOI No. :</p>
              <p className="text-sm font-normal ">{details.id}</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>LOI Date : </p>
              <p className="text-sm font-normal ">{details.loi_date}</p>
            </div>
          </div>
          <h2 className="border-b  text-xl border-black font-semibold"></h2>
          <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 ">
            <div className="grid grid-cols-2 items-center ">
              <p>Related To : </p>
              <p className="text-sm font-normal">{details.related_to}</p>
            </div>
            <div className="grid items-center gap-2">
              <p>Billing Address : </p>
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
            </div>
            <div className="grid items-center gap-2">
              <p>Delivery Address : </p>
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
            </div>
            {/* <div className="grid grid-cols-2 items-center ">
              <p>Supplier : </p>
              <p className="text-sm font-normal">{details.vendor_name}</p>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <p>Retention : </p>
              <p className="text-sm font-normal">{details.retention}%</p>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <p>TDS : </p>
              <p className="text-sm font-normal">{details.tds}%</p>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <p>QC : </p>
              <p className="text-sm font-normal">{details.qc}%</p>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <p>Payment Tenure : </p>
              <p className="text-sm font-normal"></p>
            </div>
            <div className="grid grid-cols-2 items-center ">
              <p>Advance Amount : </p>
              <p className="text-sm font-normal"> </p>
            </div> */}
          </div>
          <div className="border-t border-black"></div>
          <Table columns={column} data={loiItems} pagination={false} />

          <div className="my-2 md:px-2 text-sm items-center font-medium grid gap-1 ">
            <div className="flex justify-between items-center">
              <p>Net Amount(INR) :</p>
              <p className="text-sm font-medium ">{totalAmount}</p>
            </div>
            {/* <div className="flex justify-between items-center">
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
            </div> */}
            <div className="md:flex  gap-2 items-center">
              <p>Amount In Words :</p>
              <p className="text-sm font-medium">{netAmtInWords}</p>
            </div>
            
        </div>
        </div>
        {/* <div className="border-t py-3 border-black"></div>
          <div className="">
            <p className="text-sm font-bold">Notes:</p>
            <p className="bg-gray-100 p-2 rounded-md">a</p>
          </div>
          <div className="">
            <p className="text-sm font-bold">Terms & Conditions:</p>
            <p className="bg-gray-100 p-2 rounded-md">{details.terms}</p>
          </div> */}
        {/* <div className="border-t py-3 border-black"></div> */}
        {/* <p className="text-xg font-semibold mx-5">For</p> */}
        <div className=" py-5 mx-5 border-black">
          <p className="text-md font-semibold border-b border-black">
            Attachments
          </p>
          <div className="flex gap-4 flex-wrap my-4 items-center  text-center">
            {details.loi_details_image &&
            details.loi_details_image.length > 0 ? (
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
        <div className=" py-3 flex flex-col items-end justify-center border-black">
          <div className="flex flex-col justify-center">
            {/* <p className="text-center">
              {details.created_by_name.firstname
                ? details.created_by_name.firstname
                : ""}{" "}
              {details.created_by_name.lastname
                ? details.created_by_name.lastname
                : ""}
            </p> */}
            <p className="text-xg font-semibold mx-5 ">Authorised Signatory</p>
          </div>
        </div>
      </div>

      {/* </div> */}
    </section>
  );
};

export default LOIPoDetails;
