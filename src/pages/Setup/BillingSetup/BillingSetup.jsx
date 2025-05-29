import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { Switch } from "../../../Buttons";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddInvoiceSetupModal from "./AddInvoiceSetupModal";
import EditInvoiceSetupModal from "./EditInvoiceSetupModal";
import {
  getAddressSetup,
  deleteAddressSetup,
  postInvoiceNumber,
  postReceiptNumber,
  getInvoiceTypeSetup,
  postLogoCamBillingSetup,
} from "../../../api";
import toast from "react-hot-toast";
// import { id } from "date-fns/esm/locale";

function BillingSetup() {
  const [invoiceOption, setInvoiceOption] = useState("invoiceAuto");
  const [receiptOption, setReceiptOption] = useState("receiptAuto");
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  const [addressSetup, setAddressSetup] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [invoiceNumberSetup, setInvoiceNumberSetup] = useState({
    prefix: "",
    nextNumber: "",
  });
  const [receiptNumberSetup, setReceiptNumberSetup] = useState({
    prefix: "",
    nextNumber: "",
  });
  const [invoiceType, setInvoiceType] = useState([]);
  useEffect(() => {
    const fetchAddressSetup = async () => {
      try {
        const response = await getAddressSetup();
        setAddressSetup(response.data);
      } catch (err) {
        console.error("Failed to fetch Address Setup data:", err);
      }
    };
    fetchAddressSetup(); // Call the API
    fetchInvoiceTypeSetup();
  }, []);

  const fetchInvoiceTypeSetup = async () => {
    try {
      const response = await getInvoiceTypeSetup();
      setInvoiceType(response.data);
    } catch (err) {
      console.error("Failed to fetch Address Setup data:", err);
    }
  };

  const navigate = useNavigate();

  const handleAddressSetupDelete = async (id) => {
    try {
      const deleteRes = await deleteAddressSetup(id);
      toast.success("Address setup Deleted Successfully");
      console.log(deleteRes);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
  };

  const themeColor = useSelector((state) => state.theme.color);
  const handleChange = (event) => {
    setInvoiceOption(event.target.value);
  };

  const handleChangeInvoiceNumber = (e) => {
    const { name, value } = e.target;
    setInvoiceNumberSetup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInvoiceNumberSubmit = async () => {
    if (!invoiceNumberSetup.prefix) {
      toast.error("prefix is required ");
      return;
    }
    if (!invoiceNumberSetup.nextNumber) {
      toast.error("Next Number is required ");
      return;
    }
    const sendData = new FormData();
    sendData.append("invoice_setup[auto_generate]", invoiceOption);
    sendData.append("invoice_setup[prefix]", invoiceNumberSetup.prefix);
    sendData.append(
      "invoice_setup[next_number]",
      invoiceNumberSetup.nextNumber
    );
    try {
      const invoiceNum = await postInvoiceNumber(sendData);
      toast.success("Invoice Number Added Successfully");
      // navigate("/admin/cam-billing");
      console.log(invoiceNum);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeReceiptOption = (event) => {
    setReceiptOption(event.target.value);
  };
  const handleChangeReceiptNumber = (e) => {
    const { name, value } = e.target;
    setReceiptNumberSetup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReceiptNumberSubmit = async () => {
    if (!receiptNumberSetup.prefix) {
      toast.error("prefix is required");
      return;
    }
    if (!receiptNumberSetup.nextNumber) {
      toast.error("Next Number is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("receipt_setup[auto_generate]", receiptOption);
    sendData.append("receipt_setup[prefix]", receiptNumberSetup.prefix);
    sendData.append(
      "receipt_setup[next_number]",
      receiptNumberSetup.nextNumber
    );
    try {
      const ReceiptNum = await postReceiptNumber(sendData);
      toast.success("Receipt Number Added Successfully");
      // navigate("/admin/cam-billing");
      console.log(ReceiptNum);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row, index) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "	Invoice Type",
    //   selector: (row) => row.invoice_Type,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setEditInvoiceModal(true);
              setSelectedInvoiceId(row.id);
            }}
          >
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  // const data = [
  //   {
  //     Id: 1,
  //     name: "CAM",
  //     // invoice_Type: "CAM",
  //   },
  // ];

  const addressColumns = [
    {
      name: "Id",
      selector: (row, index) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Organization",
      selector: (row) => row.organization,
      sortable: true,
    },
    {
      name: " Registration No",
      selector: (row) => row.registration_no,
      sortable: true,
    },
    {
      name: "GST.No",
      selector: (row) => row.gst_number,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-billing-address/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          <button>
            <RiDeleteBin5Line
              size={15}
              onClick={() => handleAddressSetupDelete(row.id)}
            />
          </button>
        </div>
      ),
    },
  ];

  // const addressData = [
  //   {
  //     Id: 1,
  //     name: "Jyoti Tower",
  //     organization: "Jyoti Tower",
  //     registration_no: "MH/29/2323",
  //     gst_no: "JY09192121",
  //     address: "G - 205, AB road. Andheri"
  //   },
  // ];

  const [logo, setLogo] = useState(null); // Initialize as null

  const handleFileChange = (files) => {
    if (files && files[0]) {
      setLogo(files[0]); // Directly set the file
      console.log("Selected file:", files[0]);
    }
  };

  const handleChangeLogo = async () => {
    if (!logo) {
      toast.error("Please select a logo before uploading");
      return;
    }

    const sendData = new FormData();
    sendData.append("attachment", logo); // Append the single file

    try {
      const uploadLogo = await postLogoCamBillingSetup(sendData); // Replace with your API call
      toast.success("Logo added successfully");
      console.log("Uploaded logo response:", uploadLogo);
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to add logo");
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h2
          style={{ background: "rgb(5 19 37)" }}
          className="text-center text-xl font-bold p-2 rounded-md text-white my-2"
        >
          Billing Setup
        </h2>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Invoice Number Setup</p>
        </div>
        <div className="space-y-3 my-5 mx-5">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="invoiceAuto"
                value="invoiceAuto"
                checked={invoiceOption === "invoiceAuto"}
                onChange={handleChange}
              />
              <label htmlFor="invoiceAuto" className="text-base text-gray-800">
                Continue auto-generating invoice numbers
              </label>
            </div>
            <div className="flex gap-2">
              <div>
                <input
                  defaultValue="prefix"
                  type="text"
                  name="prefix"
                  value={invoiceNumberSetup.prefix}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={invoiceOption === "invoiceManual"} // Disable if manual is selected
                  placeholder="Prefix"
                  onChange={handleChangeInvoiceNumber}
                />
              </div>
              <div>
                <input
                  defaultValue="nextNumber"
                  type="text"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  name="nextNumber"
                  value={invoiceNumberSetup.nextNumber}
                  disabled={invoiceOption === "invoiceManual"} // Disable if manual is selected
                  placeholder="Next Number"
                  onChange={handleChangeInvoiceNumber}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="invoiceManual"
              value="invoiceManual"
              checked={invoiceOption === "invoiceManual"}
              onChange={handleChange}
            />
            <label htmlFor="invoiceManual" className="text-base text-gray-800">
              I will add them manually each time
            </label>
          </div>
          <div className="flex justify-start">
            <button
              className="border border-gray-500 p-1 px-5 my-3 rounded-md"
              onClick={handleInvoiceNumberSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Receipt Number Setup</p>
        </div>
        <div className="space-y-3 my-5 mx-5">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="receiptAuto"
                value="receiptAuto"
                checked={receiptOption === "receiptAuto"}
                onChange={handleChangeReceiptOption}
              />
              <label htmlFor="receiptAuto" className="text-base text-gray-800">
                Continue auto-generating receipt numbers
              </label>
            </div>
            <div className="flex gap-2">
              <div>
                <input
                  defaultValue="prefix"
                  name="prefix"
                  value={receiptNumberSetup.prefix}
                  onChange={handleChangeReceiptNumber}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={receiptOption === "receiptManual"} // Disable if manual is selected
                  placeholder="Prefix"
                />
              </div>
              <div>
                <input
                  defaultValue="nextNumber"
                  name="nextNumber"
                  value={receiptNumberSetup.nextNumber}
                  onChange={handleChangeReceiptNumber}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={receiptOption === "receiptManual"} // Disable if manual is selected
                  placeholder="Next Number"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="receiptManual"
              value="receiptManual"
              checked={receiptOption === "receiptManual"}
              onChange={handleChangeReceiptOption}
            />
            <label htmlFor="receiptManual" className="text-base text-gray-800">
              I will add them manually each time
            </label>
          </div>
          <div className="flex justify-start">
            <button
              className="border border-gray-500 p-1 px-5 my-3 rounded-md"
              onClick={handleReceiptNumberSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="py-2 mx-5 flex justify-between">
          <p className="text-md font-semibold">Invoice Setup</p>
          <button
            className="border border-gray-500 p-1 px-5 rounded-md"
            onClick={() => setAddInvoiceModal(true)}
          >
            Add
          </button>
        </div>
        <div>
          <div className="mx-5">
            <Table columns={columns} data={invoiceType} />
          </div>
        </div>
        <div className="py-2 mx-5 flex justify-between">
          <p className="text-md font-semibold">Address Setup</p>
          <Link
            to={`/admin/billing-address`}
            className="border border-gray-500 p-1 px-5 rounded-md"
          >
            Add
          </Link>
        </div>
        <div className="mb-10">
          <div className="mx-5">
            <Table columns={addressColumns} data={addressSetup} />
          </div>
        </div>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Upload Logo</p>
        </div>
        <div className="my-5 mx-5">
          <FileInputBox
            handleChange={handleFileChange} // Pass handleFileChange directly
          />
          <div className="flex justify-end">
            <button
              className="border border-gray-500 p-1 px-5 my-3 rounded-md"
              onClick={handleChangeLogo}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex gap-5 mx-4 mb-10">
          <h2>Online Payment Allowed </h2>
          <Switch />
        </div>
      </div>
      {addInvoiceModal && (
        <AddInvoiceSetupModal
          onclose={() => setAddInvoiceModal(false)}
          fetchInvoiceTypeSetup={fetchInvoiceTypeSetup}
        />
      )}
      {editInvoiceModal && (
        <EditInvoiceSetupModal
          id={selectedInvoiceId}
          onclose={() => setEditInvoiceModal(false)}
          fetchInvoiceTypeSetup={fetchInvoiceTypeSetup}
        />
      )}
    </section>
  );
}

export default BillingSetup;
