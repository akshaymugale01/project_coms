import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { getFacitilitySetupId } from "../../api";
import { useParams } from 'react-router-dom';
import { formatTime } from '../../utils/dateUtils';

const FacilityDetails = () => {
  const { id } = useParams(); // The ID from URL params
  const [facilityData, setFacilityData] = useState(null); // Set initial state as null, to track loading properly
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the facility details for the specific ID
  const fetchFacilityBooking = async () => {
    try {
      const response = await getFacitilitySetupId(id); // API call
      console.log("Test Amenitis", response.data); // Check the raw response

      // Filter the specific facility by ID (assuming 'id' is unique in the response)
      const facility = response.data.id === parseInt(id);
      const facilitydata = response.data;
      console.log("facility ", facility);

      if (facility) {
        setFacilityData(facilitydata); // Set only the matching facility
      } else {
        setError('Facility not found.');
      }
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching facility details:", error);
      setError('Failed to fetch facility details. Please try again.'); // Set error message
      setLoading(false); // Stop loading on error
    }
  };


  console.log("AMENITIes", facilityData);

  const domainPrefix = "https://app.myciti.life";
  // const domainPrefix = "http://localhost:3002";


  useEffect(() => {
    fetchFacilityBooking();
  }, [id]); // Trigger when ID changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!facilityData) {
    return <p>No data found for this facility.</p>;
  }

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full p-4 mb-5">
        <h1 style={{ background: 'rgb(17, 24, 39)' }} className="bg-black text-white font-semibold rounded-md text-center p-2">
          Facility Details
        </h1>

        {/* Facility Info */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Facility Information
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Facility Name:</p>
              <p>{facilityData.fac_name || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Type:</p>
              <p>{facilityData.fac_type ? facilityData.fac_type.toUpperCase() : 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Active:</p>
              <p>{facilityData.active ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* Fee Details */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Fee Details
          </h2>
          <div className="border shadow-md rounded-lg bg-blue-50 p-4">
            {['member', 'guest', 'tenant',].map((type) => (
              <div key={type} className="my-2">
                <p className="font-medium capitalize">{type}:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>Adult Fee:</p>
                    <p>{facilityData[`${type}_price_adult`] || 'N/A'}</p>
                  </div>
                  <div>
                    <p>Child Fee:</p>
                    <p>{facilityData[`${type}_price_child`] || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className='border p-2 rounded-md'>
              <p className="font-medium text-bold capitalize gap-5">Fixed Price: {facilityData?.fixed_amount || "NA"}</p> 
            </div>
          </div>
          <div className='border-b border-black'>
            <div className='grid grid-cols-3 p-4 gap-4'>
              <div className='flex justify-start gap-4'>
                <p className='font-medium'>Min Person Allowed:</p>
                <p>{facilityData.min_people || 'N/A'}</p>
              </div>
              <div className='flex justify-start gap-4'>
                <p className='font-medium'>Max Person Allowed:</p>
                <p>{facilityData.max_people || 'N/A'}</p>
              </div>
              <div className='flex justify-start gap-4'>
                <p className='font-medium'>GST:</p>
                <p>{facilityData.gst_no || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Time ALLOW */}
        <div className='border rounded-lg shadow-md bg-blue-50'>
          <div className='grid grid-cols-3 p-2 gap-4'>
            <div >
              <p className='font-medium'>Booking Allowed Before:</p>
              <p>
                {facilityData.book_before[0] || 'N/A'}
              </p>
            </div>
            <div >
              <p className='font-medium'>Advance Booking:</p>
              <p>
                {facilityData.advance_booking[0] || 'N/A'}
              </p>
            </div>
            <div >
              <p className='font-medium'>Can Cancel Before Schedule:</p>
              <p>
                {facilityData.cancel_before[0] || 'N/A'}
              </p>
            </div>
          </div>
        </div>



        {/* Slot Configuration */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Slot Configuration
          </h2>
          {facilityData.amenity_slots?.length > 0 ? (
            facilityData.amenity_slots.map((slot, index) => (
              <div key={index} className="border rounded-lg bg-white p-4 mb-2">
                <p className="font-medium">Slot {index + 1}:</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p>Start Time:</p>
                    <p>
                      {String(slot.start_hr || 0).padStart(2, "0")}:
                      {String(slot.start_min || 0).padStart(2, "0")}
                    </p>
                  </div>
                  <div>
                    <p>End Time:</p>
                    <p>
                      {String(slot.end_hr || 0).padStart(2, "0")}:
                      {String(slot.end_min || 0).padStart(2, "0")}
                    </p>
                  </div>
                  <h1 className="text-gray-800">
                    From{" "}
                    {slot.slot_str
                      .split(":")
                      .map((part, index) => (index === 0 ? String(part).padStart(2, "0") : String(part).padStart(2, "0")))
                      .join(":")}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p>No slots configured.</p>
          )}
        </div>


        {/* Images Section */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Images
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Cover Images Section */}
            <div className="flex-1">
              <h2 className="font-medium text-lg mb-2">Cover Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilityData.covers && facilityData.covers.length > 0 ? (
                  facilityData.covers.map((image_url, index) => (
                    <div key={index} className="rounded-lg border overflow-hidden">
                      <img
                        src={domainPrefix + image_url.image_url}
                        alt={`Cover ${index + 1}`}
                        className="object-cover rounded-md w-full h-40 transition-transform transform hover:scale-110"
                      />
                    </div>
                  ))
                ) : (
                  <p>No cover images available.</p>
                )}
              </div>
            </div>


            {/* <a href={domainPrefix + doc.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-40">
                </a> 
             */}

            {/* Attachments Section */}
            <div className="flex-1">
              <h2 className="font-medium text-lg mb-2">Attachments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilityData.attachments && facilityData.attachments.length > 0 ? (
                  facilityData.attachments.map((doc, index) => (
                    <div key={index} className="rounded-lg border overflow-hidden">

                      <img
                        src={domainPrefix + doc.image_url}
                        alt={`Attachment`}
                        className="object-cover rounded-md w-full h-40 transition-transform transform hover:scale-110"
                      />

                    </div>
                  ))
                ) : (
                  <p>No attachments available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description:</h3>
            <p className={`text-gray-600 ${facilityData.description ? '' : 'italic text-gray-400'}`}>
              {facilityData.description || "NA"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Terms and Conditions:</h3>
            <p className={`text-gray-600 ${facilityData.terms ? '' : 'italic text-gray-400'}`}>
              {facilityData.terms || "NA"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Terms and Conditions:</h3>
            <p className={`text-gray-600 ${facilityData.cancellation_policy ? '' : 'italic text-gray-400'}`}>
              {facilityData.cancellation_policy || "NA"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityDetails;
