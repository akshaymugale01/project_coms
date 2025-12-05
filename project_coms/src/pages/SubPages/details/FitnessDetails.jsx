import React from "react";
import Detail from "../../../containers/Detail";


const FitnessDetails = () => {
  const appointmentDetails = [
    { title: "Appointment Date  :", description: "22/05/2024" },
    { title: "Appointment Time  :", description: "5:30 PM" },
    { title: "Name  :", description: "Kunal Sah" },
    { title: "Trainer Name  :", description: "Doc" },
    { title: "Relationship  :", description: "Self" },
    { title: "Age  :", description: 25 },
    { title: "Gender  :", description: "Male" },
   
    { title: "Marital Status :", description: "Unmarried" },
    { title: "Mobile No. :", description: 993384448 },
    { title: "Preference :", description: "Online" },
  ];
  return (
    <div className="w-screen">
      <Detail heading={"Appointment Details"} details={appointmentDetails} />
      <div className="flex flex-col sm:items-start flex-wrap gap-2">
        <h2 className="text-center sm:w-screen  bg-black text-white font-semibold mt-5 text-lg p-2 px-4 ">
          Additional Info
        </h2>
        <div className="px-4 flex flex-col gap-1 mx-2  ">
          <p className="font-medium">Reason for Appointment :</p>
          <p className="text-wrap bg-gray-200 p-2 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            perferendis laboriosam labore consectetur nihil praesentium, itaque
            possimus recusandae quo odit deserunt eveniet mollitia ex,
            accusantium molestias! Laboriosam odit esse deleniti sed doloremque
            qui cum, dicta, dignissimos sapiente molestiae, quis labore nulla
            quod a fuga aliquid consequuntur. Consequuntur pariatur ipsum in.
          </p>
       
        </div>
      </div>
    </div>
  );
};







export default FitnessDetails
