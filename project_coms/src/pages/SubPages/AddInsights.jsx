import React from 'react'
import FileInputBox from '../../containers/Inputs/FileInputBox'

const AddInsights = () => {
  return (
    <section>
        <div className='className="w-full flex flex-col overflow-hidden"'>
            <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white mx-10 my-5">
                NEW DESIGN INSIGHT
            </h2>
            <div className='md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg '>
                <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
                    BASIC DETAILS
                </h2>
                <div className="flex sm:flex-row flex-col justify-around items-center">
                    <div className="grid md:grid-cols-4 item-start gap-x-4 gap-y-8 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Category
                            </label>
                            <select
                                name=""
                                id=""
                                className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value=""> Selcet Category</option>
                                <option value="">a</option>
                                <option value="">b</option>
                            </select>
                        </div> 
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Sub-category
                            </label>
                            <select
                                name=""
                                id=""
                                className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value=""> Selcet Sub-category</option>
                                <option value="">Pratibha Enterprises</option>
                            </select>
                        </div>  
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Site
                            </label>
                            <select
                                name=""
                                id=""
                                className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value=""> Selcet Inventory</option>
                                <option value="">PBP viman nagar</option>
                                <option value="">WTC</option>
                                <option value="">Teck Park One</option>
                                <option value="">Business bay</option>
                                <option value="">Quadra 1</option>
                                <option value="">RVS</option>
                                <option value="">IOCCB</option>
                                <option value="">ICC Realty</option>
                                <option value="">EON Kharadi -1</option>
                                <option value="">EON Kharadi -2</option>
                                <option value="">EMERSON</option>
                                <option value="">BTPPL</option>
                                <option value="">Bjaja</option>
                                <option value="">Panchshil Test</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Location
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Location"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Categorization
                            </label>
                            <select
                                name=""
                                id=""
                                className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value=""> Selcet Categorization</option>
                                <option value="">Safety</option>
                                <option value="">Security</option>
                                <option value="">Customer Experience</option>
                            </select>
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-1">
                                Observation
                            </label>
                            <textarea
                              name=""
                              id=""
                              cols="1"
                              rows="1"
                              placeholder='Enter Observation'
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-1">
                                Recommandation
                            </label>
                            <textarea
                              name=""
                              id=""
                              cols="1"
                              rows="1"
                              placeholder='Enter Recommandation'
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="font-semibold my-1">
                                Tag
                            </label>
                            <select
                                name=""
                                id=""
                                className="border p-1 px-4 border-gray-500 rounded-md"
                            >
                                <option value="">Selcet Tag</option>
                                <option value="">Workaround</option>
                                <option value="">Learning for future projects</option>
                            </select>
                        </div>   
                        <div className="flex flex-col-2">
                            <label htmlFor="" className="font-semibold mx-3">
                                Must Have
                            </label>
                            <input
                              type="checkbox"
                              id="option3"
                              name="option3"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>       
                    </div>
                </div>
            </div>
            <div className='md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg '>
                <h2 className="text-xl font-semibold mx-5 my-5">
                    ATTACHMENTS
                </h2>
                <FileInputBox/>
            </div>
            <div className='flex gap-2 justify-center mb-10'>
                <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
                    Save
                </button>
                <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
                    Back
                </button>
            </div>
        </div>
    </section>
  )
}

export default AddInsights