import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { editComplaintsDetails, getComplaintsDetails } from "../../api";
import toast from "react-hot-toast";
import { Rate } from "antd";
import { BiAngry, BiHappy, BiLaugh, BiSad, BiSmile } from "react-icons/bi";
import { ImNeutral } from "react-icons/im";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { getItemInLocalStorage } from "../../utils/localStorage";

const TicketCloseModal = ({ onclose, closeStatusId }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [rating, setRating] = useState(0);

  const [formData, setFormData] = useState({
    comment: "",
    of_phase: "pms",
    documents: [],
    log_status: "",
    complaint_status_id: "",
  });
  const { id } = useParams();

  const closeStatus = getItemInLocalStorage("STATUS");
  console.log(closeStatus);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const FileChange = async (event) => {
    const files = event.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64 = await convertFileToBase64(file);
      base64Array.push(base64);
    }
    console.log("Array base64-", base64Array);
    const formattedBase64Array = base64Array.map((base64) => {
      return base64.split(",")[1];
    });
    console.log("Format", formattedBase64Array);
    setFormData({
      ...formData,
      documents: formattedBase64Array,
    });
  };

  const handleReopenTicket = async () => {
    if (!formData.comment) {
      return toast.error("Please add a comment. Thanks. ");
    }
    try {
      const updatedData = {
        complaint: {
          rating: rating,
        },

        complaint_log: {
          complaint_id: id,
          comment: formData.comment,
          complaint_status_id: closeStatusId,

          //   log_status: "Re Open"
        },
        complaint_comment: {
          docs: formData.documents,
        },
      };
      await editComplaintsDetails(updatedData);
      setFormData({
        comment: "",
        documents: [],
      });
      console.log("Edited Ticket Details:", updatedData);
      onclose();
      window.location.reload();
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error Saving in details update: ", error);
    }
  };

  //   const smielyRating = [
  //     <BiAngry size={50} />,
  //     <BiSad size={50} />,
  //     <MdOutlineSentimentNeutral size={50} />,
  //     <BiSmile size={50} />,
  //     // <BiLaugh  size={50}/>,
  //     <BiHappy size={50} />,
  //   ];

  const smielyRating = [
    { icon: <BiAngry size={50} />, defaultColor: "grey", activeColor: "red" },
    { icon: <BiSad size={50} />, defaultColor: "grey", activeColor: "orange" },
    {
      icon: <MdOutlineSentimentNeutral size={50} />,
      defaultColor: "grey",
      activeColor: "black",
    },
    { icon: <BiSmile size={50} />, defaultColor: "grey", activeColor: "" },
    {
      icon: <BiHappy size={50} />,
      defaultColor: "grey",
      activeColor: "green",
    },
  ];

  const handleRateClick = (index, ) => {
    const ratingValue = index + 1;
    setActiveIndex(index);
    setRating(ratingValue);
  };
console.log(rating)
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg">
          <IoAddCircle size={20} />
          Add Comment
        </h2>
        <div className="flex flex-col item-center justify-center mb-5 gap-5">
          <div className="px-4 flex flex-col gap-1 justify-center">
            <label htmlFor="addComment" className="font-medium">
              Add Comment :
            </label>
            <div className="flex justify-between gap-4">
              <textarea
                name="text"
                value={formData.comment}
                className="border p-1 px-2 border-gray-400 rounded-md w-96"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
            </div>
          </div>
          <input
            type="file"
            name="documents"
            id="documents"
            onChange={FileChange}
            multiple
            className="file:bg-black file:text-white file:rounded-full file:p-2 file:px-4 file:font-semibold bg-gray-300 p-2 rounded-full"
          />
          <div className="my-2">
            <p className="font-medium my-1">Rate Your Experience :</p>
            {/* <Rate
              //   style={}
              tooltips={["Terrible", "Poor", "Neutral", "Good", "Excellent"]}
              character={({ index }) => {
                return smielyRating[index];
              }}
            
            /> */}
            <Rate
              tooltips={["Terrible", "Poor", "Neutral", "Good", "Excellent"]}
              character={({ index }) => {
                const { icon, defaultColor, activeColor } = smielyRating[index];
                const color =
                  index === activeIndex ? activeColor : defaultColor;
                return React.cloneElement(icon, { style: { color } });
              }}
              onChange={(value) => handleRateClick(value - 1)}
            />
          </div>
        </div>
        <button
          className="bg-black p-2 px-4 text-white rounded-md my-5"
          onClick={handleReopenTicket}
        >
          Submit
        </button>
      </div>
    </ModalWrapper>
  );
};

export default TicketCloseModal;
