import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import boy from "/boy.png";
import girl from "/girl.png";
import lady from "/lady.png";
import oldlady from "/oldlady.png";
import oldman from "/oldman.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddEsic = () => {
  const [formData, setFormData] = useState({
    criticalDisease: false,
  });
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center my-5 overflow-x-auto w-full sm:w-full">
        <div className="border border-gray-300 rounded-lg w-full mx-5 p-2 flex flex-col mb-5 gap-5">
          <h2
            style={{ background: themeColor }}
            className="text-center md:text-xl font-bold my-2 p-2 bg-black rounded-md text-white"
          >
            Add Policy
          </h2>

          <div className="">
            <h2 className="md:text-lg my-2 font-medium">
              Who would you like to insure ?
            </h2>
            <div className="grid md:grid-cols-6 gap-4 w-full">
              <div className="border border-gray-400 rounded-md flex flex-col py-2 justify-center items-center cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:bg-green-300  ">
                <img src={girl} alt="boy" width={"30px"} />
                <p>Spouse</p>
              </div>
              <div className="border border-gray-400 rounded-md flex flex-col py-2 justify-center items-center cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:bg-green-300  ">
                <img src={oldlady} alt="boy" width={"30px"} />
                <p>Mother</p>
              </div>
              <div className="border border-gray-400 rounded-md flex flex-col py-2 justify-center items-center cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:bg-green-300  ">
                <img src={oldman} alt="boy" width={"30px"} />
                <p>Father</p>
              </div>
              <div className="border border-gray-400 rounded-md flex flex-col py-2 justify-center items-center cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:bg-green-300  ">
                <img src={girl} alt="boy" width={"30px"} />
                <p>Daughter</p>
              </div>
              <div className="border border-gray-400 rounded-md flex flex-col py-2 justify-center items-center cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:bg-green-300  ">
                <img src={boy} alt="boy" width={"30px"} />
                <p>Son</p>
              </div>
            </div>
          </div>
          {/* <div className="grid md:grid-cols-5 items-center">
            <div className="flex gap-4 items-center">
              <img src={boy} alt="boy" width={"30px"} />
              <p className="text-lg">Self :</p>
            </div>
            <input
              type="date"
              name=""
              id=""
              className="border border-gray-400 p-2 rounded-md col-span-2"
            />
          </div> */}
          <div className="grid md:grid-cols-5 items-center">
            <div className="flex gap-4 items-center">
              <img src={boy} alt="boy" width={"30px"} />
              <p className="text-lg">Son :</p>
            </div>
            <input
              type="date"
              name=""
              id=""
              className="border border-gray-400 p-2 rounded-md col-span-2"
            />
          </div>
          <div>
            <p className="font-medium">
              Any one of the above members having any critical disease?
            </p>
            <div className="flex gap-4 my-2">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="criticalDisease"
                  id="yes"
                  checked={formData.criticalDisease === true}
                  onChange={() =>
                    setFormData({ ...formData, criticalDisease: true })
                  }
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="no"
                  name="criticalDisease"
                  checked={formData.criticalDisease === false}
                  onChange={() =>
                    setFormData({ ...formData, criticalDisease: false })
                  }
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
          {formData.criticalDisease && (
            <textarea
              name=""
              id=""
              placeholder="Describe Disease"
              className="border border-gray-400 p-2 rounded-md col-span-2"
            ></textarea>
          )}
          <div className="flex justify-center">
            <Link
              to={"/employee-portal/esic"}
              className="border-2 rounded-md border-black p-1 px-4 font-medium hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEsic;
