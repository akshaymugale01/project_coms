import React, { useEffect, useState } from "react";
import { getInventory, postTicketAddItems } from "../../api";
import ModalWrapper from "./ModalWrapper";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { comment } from "postcss";
import toast from "react-hot-toast";
const CARAddItemsModal = ({ onclose }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [items, setItems] = useState([]);
  const [comment, setComment] = useState("")
  const themeColor = useSelector((state) => state.theme.color);
  var handleChangeSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const itemsResponse = await getInventory();
      console.log(itemsResponse);
      const InventoryItems = itemsResponse.data;
      const ItemsList = InventoryItems.map((item) => ({
        value: item.id,
        label: [item.name, " - ", item.rate],
      }));
      setItems(ItemsList);
    };
    fetchItems();
  }, []);
  console.log(comment)
  console.log(selectedOption)

//{"id"=>"556", "item_ids"=>["2"], "comment"=>"dsfsf"}
const {id}= useParams()
const handleCARReq = async()=>{
    if (selectedOption.length === 0) {
        return toast.error("Please Select Item to Make a Request");
      }
    const payload = {
        id: id,
        item_ids: selectedOption.map(option => option.value),
        comment: comment
    }
    try {
        console.log(payload)
        toast.loading("Creating Approval Request Please Wait")
        const resp = await postTicketAddItems(payload)
        onclose()
        toast.dismiss()
        toast.success("Approval Request Created SuccessFully")
        console.log(resp)
    } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
        toast.dismiss()
    }
}

  //  items_ids: selectedOption.map(option => option.value),
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl">Add Request</h1>
        <div className="flex flex-col gap-4">
          <div className="w-96">
            <label htmlFor="" className="font-medium">
              Select Items
            </label>
            <Select
              isMulti
              onChange={handleChangeSelect}
              options={items}
              noOptionsMessage={() => "No Services Available"}
              maxMenuHeight={90}
              placeholder="Select Items"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="remarks" className="font-medium">
              Remarks
            </label>
            <textarea
              className="border border-gray-400 rounded-md px-2"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              rows={3}
              cols={10}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button onClick={handleCARReq}
              style={{
                background: themeColor,
              }}
              className="bg-black text-white rounded-md p-1 px-4 font-medium "
            >
              Request Approval
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CARAddItemsModal;
