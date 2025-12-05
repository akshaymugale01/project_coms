import React from "react";
import Navbar from "../../../components/Navbar";
import EmployeePortal from "../../../components/navbars/EmployeePortal";
import esicImg from "/esic.png";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import esicCard from "/esic card.jpg"

const WorkspaceESIC = () => {
  const themeColor = useSelector((state) => state.theme.color);

  // Function to generate and download the ESIC card as a PDF
  const downloadESICCardPDF = () => {
    const doc = new jsPDF();

    // Add ESIC Image
    doc.addImage(esicCard, "PNG", 10, 10, 100, 60); // Adjust the image position and size

    // Add ESIC Card Details
    doc.setFontSize(12);
    doc.text("Name: Sunil Khera", 10, 80);
    doc.text("IP no.: 009876760008", 10, 90);
    doc.text("D.O.B: 15/08/1998", 10, 100);
    doc.text("Address: Street 5, Block G, Bandra Kurla Complex,", 10, 110);
    doc.text("Bandra East, Mumbai, Maharashtra, 400051", 10, 120);

    // Save the PDF
    doc.save("esic-card.pdf");
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="flex justify-end">
          <Link
            to={"/employee-portal/add-family-esic"}
            style={{ background: themeColor }}
            className="flex items-center gap-2 text-white p-1 mt-2 px-2 rounded-md"
          >
            <PiPlus />
            Add Family Member
          </Link>
        </div>
        <div className="border border-gray-400 rounded-md h-full my-4 p-4">
          <div className="w-60 shadow-custom-all-sides p-2 rounded-md text-sm flex flex-col gap-2">
            <img src={esicImg} alt="ESIC" />
            <div className="grid grid-cols-2">
              <h2 className="font-medium">Name :</h2>
              <h2>Sunil Khera</h2>
            </div>
            <div className="grid grid-cols-2">
              <h2 className="font-medium">IP no. :</h2>
              <h2>009876760008</h2>
            </div>
            <div className="grid grid-cols-2">
              <h2 className="font-medium">D.O.B :</h2>
              <h2>15/08/1998</h2>
            </div>
            <div className="grid">
              <h2 className="font-medium">Address:</h2>
              <h2 className="text-sm">
                Street 5, Block G, Bandra Kurla Complex, Bandra East, Mumbai,
                Maharashtra, 400051
              </h2>
            </div>
            <div className="w-full flex justify-center mt-2">
              <button
                className="flex items-center gap-2 px-4 w-60 justify-center bg-green-500 text-white p-1 rounded-md"
                onClick={downloadESICCardPDF}
              >
                <FaDownload /> Download Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceESIC;
