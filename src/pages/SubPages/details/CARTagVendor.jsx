import React, { useState } from 'react'
import Table from '../../../components/table/Table';
import Select from "react-select"
const CARTagVendor = () => {
    const column = [
        { name: "Vendor Name", selector: (row) => row.VendorName, sortable: true },
        { name: "EmailSentTo", selector: (row) => row.EmailSentTo, sortable: true },
        { name: "Email Sent At", selector: (row) => row.EmailSentAt, sortable: true },
        { name: "Email Sent By", selector: (row) => row.EmailSentBy, sortable: true },
      ];

      const data = [
        {
          id: 1,
          VendorName: "",
          EmailSentTo: "",
          EmailSentAt: "",
          EmailSentBy: "",

        },
      ];
      const options = [
        {
          value: "Akshat",
          label: "Akshat",
          email: "akshat.shrawat@vibecopilot.ai",
        },
        { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
        { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
      ];
      const [formData, setFormData] = useState({
        repeat: false,
        on_behalf: "",
      });
  return (
    <section>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-lg mx-8 my-5 font-semibold p-2 bg-black rounded-full text-white">
                Cost Approval Requests
            </h2>
            <div className='flex gap-3 mx-8 my-8 z-10 '>
                <Select 
                className='w-96'
                options={options}
                placeholder="Select User"
                value={formData.on_behalf}
                onChange={(selectedOption) =>
                setFormData({ ...formData, on_behalf: selectedOption })
                }
                />
                <button
                   className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
                >
                    Submit
                </button>
            </div>
            <div className='mx-5 my-2 rounded-md'>
              <Table
                columns={column}
                data={data}
                isPagination={true}
              />
            </div>
        </div>
    </section>
  )
}

export default CARTagVendor