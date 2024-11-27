import React from "react";

const BookOutstation = () => {
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <form
        className="border  border-gray-300 rounded-lg p-4 w-full mx-4"
        // onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
          Book New Outstation Ride
        </h2>

        <div className="flex flex-col my-5 justify-around w-full gap-4">
          
          <div className="flex flex-col justify-around">
            <label htmlFor="" className="font-semibold">
              Destination:
            </label>
            <textarea
              name="heading"
              placeholder="Enter Destination"
              cols="15"
              rows="1"
              //   value={formData.heading}
              //   onChange={handleChange}
              className="border p-2 rounded-md border-black"
            ></textarea>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="grid grid-cols-2 items-center">
                <label htmlFor="" className="font-medium">Departure Date :</label>
                <input type="date" name="" id="" className="w-40 border border-gray-500 px-4 rounded-md" />
            </div>
            <div className="grid grid-cols-2 items-center">
                <label htmlFor="" className="font-medium">Return Date :</label>
                <input type="date" name="" id=""  className="w-40 border border-gray-500 px-4 rounded-md" />
            </div>
            <div className="grid grid-cols-2 items-center">
                <label htmlFor="" className="font-medium">No. Of Passengers :</label>
                <input type="number" placeholder="No. of Passengers" name="" id=""  className="w-40 border border-gray-500 p-1 placeholder:text-sm rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex flex-col my-5 gap-1 ">
          <label htmlFor="" className="font-medium">
            Purpose :
          </label>
          <textarea
            name="text"
            placeholder=" Purpose of Travel!"
            id=""
            cols="80"
            rows="3"
            className="border p-2 border-black rounded-md"
            // value={formData.text}
            // onChange={handleChange}
          />
        </div>

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className={`text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300 `}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookOutstation;
