import React from "react";
import ModalWrapper from "../../../../containers/modals/ModalWrapper";
import { FaQrcode } from "react-icons/fa";
import toast from "react-hot-toast";
import { softServiceDownloadQrCode } from "../../../../api";
const SoftServiceQr = ({ onClose, QR, softId }) => {
  const handleQrDownload = async () => {
    console.log(softId);
    toast.loading("Qr code downloading please wait!");
    try {
      const response = await softServiceDownloadQrCode(softId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "qr_codes.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.parentNode.removeChild(link);
      console.log(response);
      toast.dismiss();
      toast.success("Qr code downloaded successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error not download Qr code:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <ModalWrapper onclose={onClose}>
      <div className="mx-4 flex flex-col justify-between items-center gap-10 z-50">
        <img
          src={QR}
          alt="qr"
          width={200}
          className="border shadow-xl rounded-md"
        />
        <button
          className="px-4 w-full border-2 border-black rounded-md flex justify-center items-center gap-2 py-1"
          onClick={handleQrDownload}
          // onClick={() => downloadFile(QR)}
        >
          <FaQrcode />
          Print QR Code
        </button>
      </div>
    </ModalWrapper>
  );
};

export default SoftServiceQr;
