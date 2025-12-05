import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const Detail = ({ heading, details,title }) => {
 
 const themeColor = useSelector((state)=> state.theme.color)


  return (
    <div className="flex flex-col gap-2">
      <h2 style={{
        background: "rgb(19 27 32)"
      }} className="text-center w-full text-white font-semibold text-lg p-2 px-4 ">
        {heading}
      </h2>
        <h2 className="text-center font-medium rounded-md border-2 mx-2 border-gray-400">{title}</h2>
      <div className="md:grid sm:px-2 px-4 flex flex-col grid-cols-3 gap-5 gap-x-32">
        {details.map((item, index) => (
          <dl className="grid grid-cols-2 " key={index}>
          <dt className="font-semibold text-sm">{item.title}</dt>
          <dd className="text-sm">{item.description}</dd>
        </dl>
        ))}
        {/* {detailData.details.map((item, index) => (
          <dl className="flex gap-4" key={index}>
            <dt className="font-semibold">{item.title}</dt>
            <dd>{item.description}</dd>
          </dl>
        ))} */}
      </div>
    </div>
  );
};


export default Detail;



