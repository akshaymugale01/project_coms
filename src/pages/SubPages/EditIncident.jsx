import React, { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const EditIncident = () => {
    const [incident, setIncident] = useState([{ name: '', mobile: '' }]);
    const [checkbutton, setCheckbutton]=useState()
    const [medical, setMedical]=useState()
    const [investigation, setInvestigation]= useState([{ name1: '', mobile1: '' }])

  const handleAddIncident = (event) => {
    event.preventDefault();
    setIncident([...incident, { name: '', mobile: '' }]);
};

const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newIncident = [...incident];
    newIncident[index][name] = value;
    setIncident(newIncident);
};

const handleRemoveIncident = (index) => {
    const newIncident = [...incident];
    newIncident.splice(index, 1);
    setIncident(newIncident);
};


const handleAddInvestigation = (event) => {
    event.preventDefault();
    setInvestigation([...investigation, { name1: '', mobile1: '' }]);
};

const handleInputChange1 = (index, event) => {
    const { name1, value } = event.target;
    const newInvestigation = [...investigation];
    newInvestigation[index][name1] = value;
    setInvestigation(newInvestigation);
};

const handleRemoveInvestigation = (index) => {
    const newInvestigation = [...investigation];
    newInvestigation.splice(index, 1);
    setInvestigation(newInvestigation);
};

  return (
    <section className='flex'>
        <div className='hidden md:block'>
        <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
          <h2 className="text-center text-lg mx-8 my-5 font-semibold p-2 bg-black rounded-full text-white">
            Edit Incidents
          </h2>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    DETAILS
                </h2>
                <div className='flex  flex-col justify-around '>
                    <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold">
                                Time & Date
                            </label>
                            <div className='flex gap-2'>
                            <input
                              type="date"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md w-full"
                            />
                            <input
                              type="time"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md w-full"
                            />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Select The Incident Primary Category
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                                <option value="">System Down</option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Select The Category For The Injury / Illness Incident
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Select The Secondry Category For The Incident
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Probability
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select Probability</option> 
                                <option value="">Rare </option> 
                                <option value="">Possible </option> 
                                <option value="">Likely </option>
                                <option value="">Often </option>
                                <option value="">Frequent Almost/Certain </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Description
                            </label>
                            <textarea
                              name=""
                              id=""
                              cols="5"
                              rows="1"
                              placeholder="Accident near Main Gate"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Property Damage Category
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                                <option value="">other </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Insured by
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                                <option value="">Building insurance </option>
                                <option value="">Private/Individual </option>
                                <option value="">others </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Primary root cause category
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Preventive action
                            </label>
                            <textarea
                              name=""
                              id=""
                              cols="5"
                              rows="3"
                              placeholder="Accident near Main Gate"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full my-5'> 
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Building
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select Building</option>
                                <option value="">HelpDesk</option> 
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Select The Category For The System down Inciden
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option> 
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Select The Tncident Secondry Category 
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option> 
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Severity 
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select Severity </option>
                                <option value="">Insignificant </option>
                                <option value="">Minor </option>
                                <option value="">moderate </option>
                                <option value="">major </option>
                                <option value="">catasTrophic </option> 
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Incident level 
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select Level </option>
                                <option value="">Level-4 </option> 
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Has Any Property Damage Happened In The Incident? 
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                                <option value="">Yes </option>
                                <option value="">No </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Damage covered under insurance 
                            </label>
                            <select
                               name=""
                               id=""
                               className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Select </option>
                                <option value="">Yes </option>
                                <option value="">No </option> 
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                RCA 
                            </label>
                            <input
                              type="text"
                              placeholder="Material Quality"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Corrective action 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>     
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    ADD WITNESSES DETAILS
                </h2>
                <div>
                {incident.map((incident1, index) => (
                    <div key={index}>
                        <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Name 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Name"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={incident.mobile}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Mobile 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Mobile"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={incident.mobile}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <button onClick={() => handleRemoveIncident(index)}><FaTrash /></button>
                        </div>
                    </div>
                ))}
                   <button className="font-semibold border-2 border-black  p-1 flex gap-2 rounded-md" onClick={handleAddIncident}><FaPlus/> Add More</button>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    COST OF INCIDENT
                </h2>
                <div className='flex flex-col justify-around '>
                    <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-3 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Equipment/Property Damaged Cost 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>   
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Production Loss 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>   
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Treatment Cost 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div> 
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Absenteeism Cost 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div> 
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Other Cost 
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div> 
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold">
                                Total Cost 
                            </label>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>   
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    FIRST AID PROVIDED
                </h2>
                <div className="flex  gap-2">
                    <label htmlFor="meterApplicable">Was First Aid provided by Employees ? </label>
                    <input type="checkbox" name="is_meter" id="meterApplicable" 
                    onClick={() => setCheckbutton(!checkbutton)} />
                    {checkbutton &&(
                      <div>
                        <div className="flex flex-col ml-10">
                                <input
                                  type="text"
                                  placeholder="Name of First Aid Attendants"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={incident.mobile}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                      </div>
                    )
                    }
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    MEDICAL TREATMENT
                </h2>
                <div className="flex  gap-2">
                    <label htmlFor="meterApplicable">Sent for Medical Treatment </label>
                    <input type="checkbox" name="is_meter" id="meterApplicable" 
                    onClick={() => setMedical(!medical)} />
                    {medical &&(
                        <div className='flex gap-4'>
                            <div className="flex flex-col ml-10">
                                <input
                                  type="text"
                                  placeholder=" Treatment Facility"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col ml-10">
                                <input
                                  type="text"
                                  placeholder=" Attending Physician"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                />
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    ADD WITNESSES DETAILS
                </h2>
                <div>
                {investigation.map((investigation1, index) => (
                    <div key={index}>
                        <div className='grid md:grid-cols-4 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Name 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Name"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={investigation.mobile1}
                                  onChange={(event) => handleInputChange1(index, event)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Mobile 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Mobile"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={investigation.mobile1}
                                  onChange={(event) => handleInputChange1(index, event)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold">
                                    Designation 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Designation"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={investigation.mobile1}
                                  onChange={(event) => handleInputChange1(index, event)}
                                />
                            </div>
                            <button onClick={() => handleRemoveInvestigation(index)}><FaTrash /></button>
                        </div>
                    </div>
                ))}
                   <button className="font-semibold border-2 border-black  p-1 flex gap-2 rounded-md" onClick={handleAddInvestigation}><FaPlus/> Add More</button>
                </div>
            </div>
            <div className='border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400'>
                <div className=' mt-3 mb-10 '>
                    <div className="flex items-center gap-6">
                        {/* <label htmlFor="meterApplicable">Support</label> */}
                        <input type="checkbox" name="is_meter" id="meterApplicable" />
                        <label htmlFor="meterApplicable">Support required</label>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2">

                            {/* <label htmlFor="meterApplicable">Disclaimer </label>
                        */}
                        <div className=
                        'flex items-center gap-6'>
                            <input type="checkbox" name="is_meter" id="meterApplicable"/>
                            <label htmlFor="meterApplicable">I have correctly stated all the facts related to the incident</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 md:mx-20 p-4 gap-4 rounded-md border-gray-400 ">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    ATTACHMENTS
                </h2>
                <p className='text-medium font-semibold'>ATTACHMENTS</p>
                <p className='text-xs '>No ATTACHMENTS</p>
            </div>
            <div className='flex justify-center mb-20 my-3'>
                <button className='font-semibold border-2 border-black  p-1 flex gap-2 rounded-md'>Update Incident</button>
            </div>
        </div>
    </section>
  )
}

export default EditIncident