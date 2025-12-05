import React, { useState } from 'react'
import Select from "react-select";
const IncidentApprovalSetup = () => {
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
    <section>
        <div className="w-full flex flex-col overflow-hidden">
            <div className="flex md:flex-row flex-col md: gap-3 mx-5 my-3 ">
              <Select
                className='p-1 px-4  rounded-md z-10'
                options={options}
                isMulti
                value={formData.Attendees}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, Attendees: selectedOption })

                }
              />
                <button className='font-semibold border-2 border-black px-4 p-1 flex  items-center rounded-md'>
                    Submit
                </button>
            </div>

        </div>
    </section>
  )
}

export default IncidentApprovalSetup