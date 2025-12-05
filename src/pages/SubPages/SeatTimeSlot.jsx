import React, { useState } from "react";

export const initialSelectedTimes = {
  
  "10:00 AM - 10:30 AM": false,
  "11:00 AM - 11:30 AM": false,
  "12:00 PM - 12:30 PM": false,
  "02:00 PM - 02:30 PM": false,
  "03:00 PM - 03:30 PM": false,
  "06:00 PM - 06:30 PM": false,
  "08:00 PM - 08:30 PM": false,
  "10:00 PM - 10:30 PM": false,
  "11:00 PM - 11:30 PM": false,
};
const SeatTimeSlot = ({ selectedTimes, handleButtonClick }) => {
 

  

  return (
    <div>
      <div className="m-1 mt-2">
        <div className="row mt-4 mb-1 ">
          <p className="font-semibold border-b border-gray-500 w-full">
            Available Time Slot
          </p>
          {/* <div className="row mt-0 mb-0 ml-4" style={{color:"#cdcdcd"}}>
                    <span style={{display:"flex", color:"#ededed",  marginRight:14,  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace"}}>[ <i className="fas fa-info-circle" title="Detail" style={{ fontSize: 14, marginTop: 5,color:"rgb(221 221 221)" }}></i>&nbsp;
                      <p className='mr-2 mb-2 ' style={{width:10, height:10,paddingBottom:4,marginTop:7,backgroundColor:"#0A9F6A" }}></p>Selected</span>
                    <span style={{display:"flex", color:"#ededed",  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace"}}>
                      <p className='mr-2 mb-2 ' style={{width:10, height:10,paddingBottom:4, marginTop:7,backgroundColor:"#fff" }}></p>Deselected]</span>
                    </div>
                    <br></br> */}
        </div>

        <div className="flex flex-wrap">
          {Object.entries(selectedTimes).map(([time, isActive]) => (
            <div key={time} className="m-1">
              <a
                className={`p-1 shadow-custom-all-sides rounded-full text-white flex gap-10 m-2 flex-wrap px-4 ${
                  isActive ? "bg-red-400" : "bg-green-400"
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleButtonClick(time);
                }}
                //   style={{ padding: "10px 20px", borderRadius: "5px", display: "inline-block", margin: "5px", textAlign: "center" }}
              >
                <div>{time}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatTimeSlot;
