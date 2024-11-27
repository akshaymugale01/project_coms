import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";

import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import { FaTrash } from "react-icons/fa";
import {
  deleteMyBankDetails,
  editMyBankAccount,
  getMyBankAccounts,
  getMyBankDetails,
  postMyBankAccounts,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BankAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNo: "",
    ifsc: "",
  });
  const columns = [
    {
      name: "Bank Name",
      selector: (row) => row.bank_name,
      sortable: true,
    },

    {
      name: "Account Number	",
      selector: (row) => row.account_number,
      sortable: true,
    },
    {
      name: "IFSC Code",
      selector: (row) => row.ifsc_code,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button onClick={() => handleDeleteBank(row.id)}>
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];
  const handleDeleteBank = async (bankId) => {
    try {
      await deleteMyBankDetails(bankId);
      fetchMyBankAccounts();
    } catch (error) {
      console.log(error);
    }
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchMyBankAccounts = async () => {
    try {
      const bankRes = await getMyBankAccounts(hrmsOrgId);
      setBankAccounts(bankRes);
      setFilteredAccounts(bankRes)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyBankAccounts();
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredAccounts(bankAccounts);
    } else {
      const filteredResult = bankAccounts.filter((accounts) =>
        accounts.bank_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      accounts.account_number.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredAccounts(filteredResult);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBankAccount = async () => {
    if (!formData.bankName) {
      toast.error("Bank name is required");
      return;
    }
    if (!formData.accountNo) {
      toast.error("Account number is required");
      return;
    }
    if (!formData.ifsc) {
      toast.error("IFSC code is required");
      return;
    }

    const postData = new FormData();
    postData.append("bank_name", formData.bankName);
    postData.append("account_number", formData.accountNo);
    // postData.append("holder_name", "ABC");
    postData.append("ifsc_code", formData.ifsc);
    postData.append("organization", hrmsOrgId);

    try {
      const res = await postMyBankAccounts(postData);
      toast.success("Bank account added successfully");
      setShowAddModal(false);
      fetchMyBankAccounts();
    } catch (error) {
      toast.error("An error occurred while adding the bank account");
      console.log(error);
    }
  };
  const [id, setId] = useState("");
  const handleEditModal = async (bankId) => {
    setShowModal(true);
    setId(bankId);
    try {
      const bankDetails = await getMyBankDetails(bankId);
      setFormData({
        ...formData,
        accountNo: bankDetails.account_number,
        bankName: bankDetails.bank_name,
        ifsc: bankDetails.ifsc_code,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBankAccount = async () => {
    if (!formData.bankName) {
      toast.error("Bank name is required");
      return;
    }
    if (!formData.accountNo) {
      toast.error("Account number is required");
      return;
    }
    if (!formData.ifsc) {
      toast.error("IFSC code is required");
      return;
    }

    const postData = new FormData();
    postData.append("bank_name", formData.bankName);
    postData.append("account_number", formData.accountNo);
    // postData.append("holder_name", "ABC");
    postData.append("ifsc_code", formData.ifsc);
    postData.append("organization", hrmsOrgId);

    try {
      const res = await editMyBankAccount(id, postData);
      toast.success("Bank account updated successfully");
      setShowModal(false);
      fetchMyBankAccounts();
    } catch (error) {
      toast.error("An error occurred while updating the bank account");
      console.log(error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className=" w-full flex m-2 flex-col overflow-hidden">
        <div className=" flex justify-between gap-2 mt-5 mb-2">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={() => setShowAddModal(true)}
            style={{ background: themeColor }}
            className="border-2 font-semibold  hover:text-white duration-150 transition-all  p-2 rounded-lg text-white cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Add Bank Account</h1>
              <div className="grid md:grid-cols-1 gap-4">
                {/* <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Account Holder Name:</label>
                  <input
                    type="text"
                    name="branchName"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter  Name"
                  />
                </div> */}
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Bank Name:</label>
                  <input
                    type="text"
                    name="bankName"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter Name"
                    value={formData.bankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Account Number:</label>
                  <input
                    type="text"
                    name="accountNo"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter Account No."
                    value={formData.accountNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">IFSC Code:</label>
                  <input
                    type="text"
                    name="ifsc"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter IFSC"
                    value={formData.ifsc}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 my-2">
                <button
                  className=" bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={handleAddBankAccount}
                >
                  Submit
                </button>
                <button
                  className="  bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowAddModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Edit Bank Account</h1>
              <div className="grid md:grid-cols-1 gap-5">
                {/* <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Account Holder Name:</label>
                  <input
                    type="text"
                    name="branchName"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter  Name"
                  />
                </div> */}
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Bank Name:</label>
                  <input
                    type="text"
                    name="bankName"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter Name"
                    value={formData.bankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">Account Number:</label>
                  <input
                    type="text"
                    name="accountNo"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter Account No."
                    value={formData.accountNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label className="font-semibold">IFSC Code:</label>
                  <input
                    type="text"
                    name="ifsc"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Enter IFSC"
                    value={formData.ifsc}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={handleEditBankAccount}
                >
                  Save
                </button>
                <button
                  className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <Table columns={columns} data={filteredAccounts} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"bank"} />
    </section>
  );
};

export default BankAccount;
