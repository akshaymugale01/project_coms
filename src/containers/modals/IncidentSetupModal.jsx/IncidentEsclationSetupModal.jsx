import React, { useState } from 'react'
import ModalWrapper from "../ModalWrapper"
import Select from "react-select";
const EscalationSetupModal = ({ onclose} ) => {
    const [formData, setFormData] = useState({
        meeting: "",
        Attendees: [],
        repeat: false,
        on_behalf: "",
    });
    const options = [
        {
          value: "Akshat",
          label: "Akshat",
          email: "akshat.shrawat@vibecopilot.ai",
        },
        { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
        { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
    ];
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col  justify-center">
                <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
                    Escalations
                </h2>
                <div className="border-t-2 border-black">
                    <div className="flex flex-col gap-y-3 my-5">
                        <select
                          name=""
                          id=""
                          className="border p-1 py-3 px-4 border-gray-500 rounded-md"
                        >
                            <option value="">Select Level</option>
                            <option value="">L1</option> 
                        </select>
                        <input
                          type='number'
                          name=""
                          id=""
                          placeholder='Escalate In Days'
                          className="border p-1 py-3 border-gray-500 rounded-md w-full"
                        >
                        </input>
                        <Select
                          options={options}
                          isMulti
                          value={formData.Attendees}
                          onChange={(selectedOption) =>
                          setFormData({ ...formData, Attendees: selectedOption })
                          }
                        />
                    </div>
                </div>
                <div className="border-t-2 border-black my-2"></div>
                <div className="flex justify-end">
                    <button className="bg-black p-1 px-4 py-2 border-2 rounded-md text-white font-medium border-black ">
                        Submit 
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EscalationSetupModal