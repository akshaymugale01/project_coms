import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { getSiteDetails } from "../../../api";

const SiteDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({ feature: [] });

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const siteDetailsResp = await getSiteDetails(id);
        console.log(siteDetailsResp.data.feature);
        setDetails(siteDetailsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSiteDetails();
  }, [id]);
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div className="border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400 mx-4">
      <div className=" flex sm:flex-row flex-col gap-5 justify-between ">
        <div className="flex justify-end w-full">
          <Link
            to={``}
            className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full  hover:bg-black hover:text-white transition-all duration-500"
          >
            <BiEditAlt />
            Edit Details
          </Link>
        </div>
      </div>
      <div>
        <h2 className="border-b text-xl border-black font-semibold">
          Site Details
        </h2>
        <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-3">
          <div className="grid grid-cols-2">
            <p>Company Name : </p>
            <p className="text-sm font-normal"></p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Site Name : </p>
            <p className="text-sm font-normal">{details.name}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Region : </p>
            <p className="text-sm font-normal">{details.region}</p>
          </div>
        </div>
      </div>
      <h2 className="border-b text-xl border-black font-semibold">Feature</h2>
      <div className="flex flex-wrap gap-2">

      {details.feature.map((feat) => (
          <div key={feat.id} className="flex">
          <p>{capitalizeFirstLetter(feat.feature_name)},</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SiteDetails;
