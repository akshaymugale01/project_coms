import React from 'react'

const AddMaterial = () => {
  return (
    <div>
        <div className="flex justify-center items-center my-5 w-full p-4">
      <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Material Inward/Outward
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label htmlFor="personName" className="font-semibold">
              Person Name
            </label>
            <input
              name="personName"
              placeholder="Enter Person Name"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="noOfItems" className="font-semibold">
              No of items
            </label>
            <input
              name="noOfItems"
              placeholder="Enter No of items"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleNumber" className="font-medium">
              Vehicle number
            </label>
            <input
              type="number"
              name="vehicleNumber"
              id="vehicleNumber"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium">
              Description :
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="attachment" className="font-medium">
              Add Attachment
            </label>
            <input
              type="file"
              name="attachment"
              id="attachment"
              className="border p-2 rounded-md border-black"
            />
          </div>
        </div>

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddMaterial