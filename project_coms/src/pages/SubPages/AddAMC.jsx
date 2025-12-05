import React, { useState } from "react";

const AddAMC = () => {
  const [amcFor, setAmcFor] = useState("asset");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    asset: "",
    service: "",
    amc_cost: "",
    start_date: formattedDate,
    end_date: formattedDate,
    first_service: formattedDate,
  });
  return (
    <section>
      <div className="m-2">
        <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
          Configurations
        </h2>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 rounded-lg sm:shadow-xl">
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Details
          </h2>
          <div className="flex   items-center justify-center gap-4">
            <p className="font-semibold">AMC for :</p>
            <p
              className={`font-medium p-1 px-4 rounded-full cursor-pointer transition-all duration-500 ${
                amcFor === "asset" && "bg-black text-white"
              }`}
              onClick={() => setAmcFor("asset")}
            >
              Asset
            </p>
            <p
              className={`font-medium p-1 px-4 rounded-full cursor-pointer transition-all duration-500 ${
                amcFor === "service" && "bg-black text-white"
              }`}
              onClick={() => setAmcFor("service")}
            >
              Service
            </p>
          </div>
          <div className="flex gap-5 justify-around my-5 ">
            {amcFor === "asset" && (
              <div className="grid  md:grid-cols-2 items-center">
                <label htmlFor="" className="font-semibold">
                  Select Asset :
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  name="asset"
                  //  value={formData.applicable_meter_category}
                  //  onChange={handleChange}
                >
                  <option value="">Select Asset </option>
                  <option value="asset 1">Asset 1</option>
                  <option value="asset 2">Asset 2</option>
                  <option value="asset 2">Asset 3</option>
                </select>
              </div>
            )}
            {amcFor === "service" && (
              <div className="grid  md:grid-cols-2 items-center">
                <label htmlFor="" className="font-semibold">
                  Select Service :
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  name="service"
                  //  value={formData.applicable_meter_category}
                  //  onChange={handleChange}
                >
                  <option value="">Select Service </option>
                  <option value="service 1">Service 1</option>
                  <option value="service 2">Service 2</option>
                  <option value="service 2">Service 3</option>
                </select>
              </div>
            )}

            <div className="grid  md:grid-cols-2 items-center">
              <label htmlFor="" className="font-semibold">
                Select Supplier :
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="supplier"
                // value={formData.sub_group}
                // onChange={handleChange}
              >
                <option value="">Select Supplier</option>
                <option value="supplier 1">Supplier 1</option>
                <option value="Supplier 2">Supplier 2</option>
                <option value="Supplier 3">Supplier 3</option>
              </select>
            </div>
          </div>
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            AMC Details
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Cost :
              </label>
              <input
                type="text"
                name="cost"
                id="cost"
                // value={formData.purchase_cost}
                // onChange={handleChange}
                placeholder="Cost "
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold ">
                Start Date :
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={formData.start_date}
                // onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold ">
                End Date :
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={formData.end_date}
                // onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold ">
                First Service :
              </label>
              <input
                type="date"
                name="first_service"
                id="first_service"
                value={formData.first_service}
                // onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold ">
                Payment Term :
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="payment_term"
                // value={formData.sub_group}
                // onChange={handleChange}
              >
                <option value="">Select Payment Term</option>
                <option value="yearly">Yearly</option>
                <option value="half_yearly">Half Yearly</option>
                <option value="quarterly">Quarterly </option>
                <option value="monthly">Monthly </option>
                <option value="full_payment">Full Payment</option>
                <option value="visit_payment">Visit Based Payment</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold ">
                No. Of Visits :
              </label>
              <input
                type="text"
                name="visits"
                id="first_service"
                // value={formData.first_service}
                // onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="" className="font-semibold ">
              Remarks
            </label>
            <textarea
              name="text"
              placeholder="Enter Remarks!"
              id=""
              cols="25"
              rows="3"
              className="border border-black rounded-md px-2"
              // value={formData.text}
              // onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="border-b border-black my-1 font-semibold">
                AMC Contacts
              </p>
              <input
                type="file"
                // onChange={(event) => handleFileChange(event, "file1")}
                multiple
              />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                AMC Invoice
              </p>
              <input
                type="file"
                // onChange={(event) => handleFileChange(event, "file2")}
                multiple
              />
            </div>
          </div>
          <div className="flex my-5 justify-center">
            <button className="bg-black text-white p-2 px-4 rounded-md font-medium">
              Save & Show Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAMC;
