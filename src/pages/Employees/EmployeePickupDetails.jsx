import React, { useState } from "react";

const EmployeePickupDetails = () => {
   
  return (
    <section>
      <div>
        <h2 className="text-center w-screen bg-black text-white my-1 font-semibold  text-lg p-2 px-4 ">
          Daily Pickup & Drop Details
        </h2>
        <div className="grid grid-cols-3 gap-5 my-5 px-5">
          <div className="grid grid-cols-2">
            <p className="font-medium">Booking ID :</p>
            <p>1234</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Employee :</p>
            <p>emp</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Department :</p>
            <p>IT</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Pickup Location :</p>
            <p>Home</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Drop-Off Location :</p>
            <p>Office</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Date :</p>
            <p>23/05/2024</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Picup Time :</p>
            <p>08:00 AM</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium">Passengers :</p>
            <p>1</p>
          </div>
        </div>
        <h2 className="text-center w-screen bg-black text-white my-1 font-semibold  text-lg p-2 px-4 ">
          Additional Info
        </h2>
        <div className="px-4">
          <p className="font-medium">Additional Note :</p>
          <p className="bg-gray-300 rounded-md p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            vitae ullamcorper odio. Quisque ac scelerisque erat. Cras sed enim
            sit amet urna luctus maximus at non erat. Pellentesque interdum leo
            vestibulum volutpat pellentesque. Curabitur nec tortor ac nulla
            aliquam mattis. Etiam malesuada ligula ac nibh efficitur, non ornare
            orci porttitor. Praesent imperdiet sapien nec quam imperdiet, ac
            rutrum mi porttitor. Etiam in odio lectus. Nam at vestibulum neque.
          </p>
        </div>
     
      </div>

      
    </section>
  );
};

export default EmployeePickupDetails;
