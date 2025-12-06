import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { domainPrefix, getContactBookDetails } from "../../../api";
import Navbar from "../../../components/Navbar";
import { FaRegFileAlt } from "react-icons/fa";

const BusinessDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchContactBookDetails = async () => {
      try {
        const detailsRes = await getContactBookDetails(id);
        setDetails(detailsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContactBookDetails();
  }, []);
  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };
  const FormatedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h1
          style={{ background: themeColor }}
          className="text-center bg-black p-2 my-2 text-white rounded-md font-medium"
        >
          Contact Details
        </h1>
        <div className="m-2 flex justify-end">
          <Link
            className="border-2 border-black rounded-md font-medium p-1 flex gap-2 items-center px-4"
            to={`/business/edit-contact/${id}`}
          >
            <BiEdit />
            Edit
          </Link>
        </div>
        {details.logo && details.logo.map((doc, index) => (
          <div key={doc.id} className="flex justify-center">
            <img
              src={domainPrefix + doc.document}
              alt={`Attachment ${index + 1}`}
              className="w-40 h-40 object-cover rounded-md"
              onClick={() => window.open(domainPrefix + doc.document, "_blank")}
            />
          </div>
        ))}
        <div className="grid md:m-2 md:p-4 p-2  bg-gray-50 rounded-md gap-5">
          <div className="grid lg:grid-cols-3 rounded-md gap-5">
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Company Name : </p>
              <p className="">{details.company_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Contact Person Name : </p>
              <p className="">{details.contact_person_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Mobile : </p>
              <p className="">{details.mobile}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Landline : </p>
              <p className="">{details.landline_no}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Primary Email : </p>
              <p className="">{details.primary_email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Secondary Email : </p>
              <p className="">{details.secondary_email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Website : </p>
              <p className="">{details.website}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Category : </p>
              <p className="">{details.generic_info_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Sub Category : </p>
              <p className="">{details.generic_sub_info_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Key Offering : </p>
              <p className="">{details.key_offering}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Created On :</p>
              <p className="text-sm">{FormatedDate(details.created_at)}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Updated On :</p>
              <p className="text-sm">{FormatedDate(details.updated_at)}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Address : </p>
            <p className="bg-gray-200 p-1 rounded-md">{details.address}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Description : </p>
            <p className="bg-gray-200 p-1 rounded-md">{details.description}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Profile : </p>
            <p className="bg-gray-200 p-1 rounded-md">{details.profile}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Attachments : </p>
            <div className="flex gap-4 flex-wrap my-4 items-center  text-center">
              {details.contact_books_attachment &&
              details.contact_books_attachment.length > 0 ? (
                details.contact_books_attachment.map((doc, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
