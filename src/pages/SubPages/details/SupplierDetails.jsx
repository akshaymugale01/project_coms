import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaQrcode, FaRegFileAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getVendorsDetails } from "../../../api";
import Navbar from "../../../components/Navbar";

const SupplierDetails = () => {
  const { id } = useParams();
  const [Details, setDetails] = useState([]);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust the format as needed
  };

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const vendorDetailsResponse = await getVendorsDetails(id);
        setDetails(vendorDetailsResponse.data);
        console.log(vendorDetailsResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendorDetails();
  }, []);

  const domainPrefix = "https://admin.vibecopilot.ai";

  return (
    <section className="flex  ">
      <Navbar />
      <div className="w-full mx-3 mb-5 flex  flex-col overflow-hidden">
        <div className="border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400">
          <div className=" flex sm:flex-row flex-col gap-5 justify-between ">
            <div className="flex items-center gap-2 "></div>
            <div className="flex md:flex-row flex-col gap-2">
              <Link
                to={`/suppliers/edit-supplier/${id}`}
                className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full  hover:bg-black hover:text-white transition-all duration-500"
              >
                <BiEditAlt />
                Edit Details
              </Link>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Company Details
            </h2>
            <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
              {/* <div className="grid grid-cols-2 items-center">
                <p>Site :</p>
                <p className="text-sm font-normal "></p>
              </div> */}
              <div className="grid grid-cols-2">
                <p>Company Name : </p>
                <p className="text-sm font-normal">{Details.company_name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Vendor Name : </p>
                <p className="text-sm font-normal">{Details.vendor_name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Primary Phone : </p>
                <p className="text-sm font-normal">{Details.mobile}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Secondary Phone : </p>
                <p className="text-sm font-normal">
                  {Details.secondary_mobile}
                </p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Primary Email : </p>
                <p className="text-sm font-normal">{Details.email}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Secondary Email : </p>
                <p className="text-sm font-normal">{Details.secondary_email}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>PAN : </p>
                <p className="text-sm font-normal">{Details.pan_number}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Supplier Type : </p>
                <p className="text-sm font-normal">{Details?.supplier?.name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Category : </p>
                <p className="text-sm font-normal">{Details?.category?.name}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Website : </p>
                <p className="text-sm font-normal">{Details.website_url}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>GST Number : </p>
                <p className="text-sm font-normal">{Details.gstin_number}</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p>Status : </p>
                <div className="text-sm font-normal ">
                  {Details.active ? (
                    <p className="bg-green-400 px-4 w-fit text-white rounded-full">
                      Active
                    </p>
                  ) : (
                    <p className="bg-red-400 px-4 w-fit text-white rounded-full">
                      Inactive
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b text-xl border-black font-semibold">
              Supplier Location Details
            </h2>
            <div className="my-5 md:px-10 items-center font-medium grid gap-5 md:grid-cols-3 text-sm">
              <div className="grid  items-center md:col-span-3">
                <p>Address : </p>
                <p className="text-sm font-normal">
                  {Details.address} {Details.address2}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <p>District : </p>
                <p className="text-sm font-normal">{Details.district}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>City :</p>
                <p className="text-sm font-normal">{Details.city}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>State : </p>
                <p className="text-sm font-normal">{Details.state}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Pin code : </p>
                <p className="text-sm font-normal">{Details.pincode}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Country : </p>
                <p className="text-sm font-normal">{Details.country}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b text-xl border-black font-semibold">
              Supplier Bank Details
            </h2>
            <div className="my-5 md:px-10 items-center font-medium grid gap-5 md:grid-cols-3 text-sm">
              {/* <div className="grid grid-cols-2 items-center">
                <p>Client Name :</p>
                <p className="text-sm font-normal"></p>
              </div> */}
              <div className="grid grid-cols-2 items-center">
                <p>Account Name : </p>
                <p className="text-sm font-normal">{Details.account_name}</p>
              </div>

              <div className="grid grid-cols-2">
                <p>Account Number : </p>
                <p className="text-sm font-normal">{Details.account_number}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Bank & Branch Name :</p>
                <p className="text-sm font-normal">
                  {Details.bank_branch_name}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>IFSC :</p>
                <p className="text-sm font-normal">{Details.ifsc_code}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Additional Info
            </h2>
            <div className="flex  flex-col my-2 gap-2">
              <p className="font-medium">Notes : </p>
              <div className="bg-gray-400 p-1 text-white rounded-md">
                {Details.notes}
              </div>
            </div>
          </div>

          <div>
            <h2 className="border-b  text-xl border-black font-semibold">
              Attachments
            </h2>
            <div className="flex justify-between gap-2 w-full">
              <div className="bg-gray-100 p-1 rounded-md my-2 px-2 w-96"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierDetails;
