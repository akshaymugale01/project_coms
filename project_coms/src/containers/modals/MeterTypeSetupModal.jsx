import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Switch } from "../../Buttons";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
const MeterTypeSetupModal = ({ onclose} ) => {
    const [meter, setMeter] = useState([]);
    const handleAddMeterType = (event) => {
        event.preventDefault();
        setMeter([...meter, { name: '', mobile: '' }]);
    };

    const handleRemoveMeterType = (index) => {
        const newMeter = [...meter];
        newMeter.splice(index, 1);
        setMeter(newMeter);
    };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center ">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
            Edit Meter Type
        </h2>
        <div className="border-t-2 border-black">
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium mt-1">Meter Category</label>
                <input type="text" name="" id="" placeholder="Meter Category" className="border rounded-md border-gray-500 p-1 px-2" />
            </div>
            <h3 className="text-sm font-medium my-2">Meter Unit Type</h3>
            <div className="flex md:flex-row flex-col  gap-2 my-2">
                <div className="flex gap-3">
                    <input type="text" name="" id="" placeholder="kwh" className="border rounded-md border-gray-500 p-1 px-2" /><Switch size={10}/>
                </div>
                <div className="flex gap-3">
                    <input type="text" name="" id="" placeholder="ampere" className="border rounded-md border-gray-500 p-1 px-2" /><Switch size={10}/>
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-2">
                <div className="flex gap-3">
                    <input type="text" name="" id="" placeholder="volt" className="border rounded-md border-gray-500 p-1 px-2" /><Switch size={10}/>
                </div>
                <div className="flex gap-3">
                    <input type="text" name="" id="" placeholder="Amp" className="border rounded-md border-gray-500 p-1 px-2" /><Switch size={10}/>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <input type="text" name="" id="" placeholder="Zool" className="border rounded-md border-gray-500 p-1 px-2" /><Switch size={10}/>
                </div>
            </div>
            <div className="grid md:grid-cols-2  gap-3 mt-2">
            {meter.map((meter1, index) => (
                <div key={index}>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <input type="text" name="" id="" placeholder="Enter Unit Name" className="border rounded-md border-gray-500 p-1 px-2" />
                            <button onClick={() => handleRemoveMeterType(index)}><FaTrash /></button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="flex justify-end my-2">
                <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={handleAddMeterType}>
                   <IoMdAdd/> Add Unit Type
                </Link>
            </div>
        </div>
        <div className="border-t-2 border-black my-4"></div>
        <div className="flex justify-center">
          <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300">
            Update
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default MeterTypeSetupModal