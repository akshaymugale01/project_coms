import React, { useEffect, useState } from 'react'
import { getAMCDetails, getEditAMCDetails } from '../../../../api'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaRegFileAlt } from 'react-icons/fa'

const AssetAmcDetails = () => {
    const themeColor = useSelector((state)=> state.theme.color)
    const {id} = useParams()
    const [amc, setAmc] = useState([])
    useEffect(()=>{
        const fetchAssetAmcDetails =async()=>{

            const assetAmcResp = await getEditAMCDetails(id)
            console.log(assetAmcResp.data)
            setAmc(assetAmcResp.data)
        } 
        fetchAssetAmcDetails()
    },[])
    const FormatedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
      };

      const isImage = (filePath) => {
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
        const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
        return imageExtensions.includes(extension);
      };
    //   const getFileName = (filePath) => {
    //     return filePath.split("/").pop().split("?")[0];
    //   };
    const getFileName = (filePath) => {
        return decodeURIComponent(filePath.split("/").pop().split("?")[0]);
      };
      const domainPrefix = "https://admin.vibecopilot.ai";
  return (
    <section>
    <div className="m-2">
      <h2
        style={{ background: themeColor }}
        className="text-center text-xl font-bold p-2  rounded-full text-white"
      >
        AMC Details
      </h2>
      <div className="my-2 mb-10 md:border-2 p-2 px-5 rounded-md border-gray-400 md:mx-20">
        <div className="flex gap-2 justify-end">
       
          {/* <Link to={`/services/edit-service/${id}`} className="flex gap-2 items-center border-2 border-black px-4 p-1 rounded-full hover:bg-black transition-all duration-300 hover:text-white">
            <BiEditAlt />
            Edit Details
          </Link> */}
        </div>
        <div className="flex justify-center m-5">
          <h1 className="p-2 border-2 border-black md:px-28 text-xl rounded-md font-semibold">
            {amc.asset_name}
          </h1>
        </div>
        <div className="my-2 flex justify-end"></div>
        <div className="p-5 grid md:grid-cols-3 gap-5 bg-gray-100 rounded-md font-medium">
          <div className="grid grid-cols-2">
            <p>Vendor :</p>
            <p className="text-sm">{amc.vendor_name}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Start Date :</p>
            <p className="text-sm">{amc.start_date}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>End Date :</p>
            <p className="text-sm">{amc.end_date}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Frequency :</p>
            <p className="text-sm">{amc.frequency}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Created On :</p>
            <p className="text-sm">{FormatedDate(amc.created_at)}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Updated On :</p>
            <p className="text-sm">{FormatedDate(amc.updated_at)}</p>
          </div>
        </div>
        <h1 className="border-b border-black font-semibold my-5">Attachments</h1>
        <div className="flex  gap-4 flex-wrap my-4 items-center  text-center">
                  {amc.attachments &&
                  amc.attachments.length > 0
                    ? amc.attachments.map((doc, index) => (
                        <div key={doc.id} className="">
                          {isImage(domainPrefix + doc.document) ? (
                            <img
                              src={domainPrefix + doc.document}
                              alt={`Attachment ${index + 1}`}
                              className="w-40 h-28 object-cover rounded-md"
                              onClick={() =>
                                window.open(doc.document, "_blank")
                              }
                            />
                          ) : (
                            <a
                              href={domainPrefix + doc.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="attachment-link hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center  "
                            >
                              <FaRegFileAlt size={50} />
                              {getFileName(doc.document)}
                            </a>
                          )}
                        </div>
                      ))
                    : (<p className="text-center w-full">No Attachments</p>)}
                </div>
      </div>
    </div>
  </section>
  )
}

export default AssetAmcDetails
