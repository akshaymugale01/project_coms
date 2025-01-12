import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { getFacitilitySetup } from '../../api';
import { useParams } from 'react-router-dom';

const FacilityDetails = () => {
  const { id } = useParams(); // The ID from URL params
  const [facilityData, setFacilityData] = useState(null); // Set initial state as null, to track loading properly
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the facility details for the specific ID
  const fetchFacilityBooking = async () => {
    try {
      const response = await getFacitilitySetup(id); // API call
      // console.log("Amenitis", response.data); // Check the raw response

      // Filter the specific facility by ID (assuming 'id' is unique in the response)
      const facility = response.data.find(facility => facility.id === parseInt(id));
      console.log("facility ", facility);

      if (facility) {
        setFacilityData(facility); // Set only the matching facility
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
          <div className="border rounded-lg bg-blue-50 p-4">
            {['member', 'guest', 'tenant'].map((type) => (
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
                      {/* {slot.slot_str} */}
                      {slot.start_hr}:{slot.start_min}
                      {/* {slot.start_hr && slot.start_min
                        ? `${String(slot.start_hr).padStart(2, '0')}:${String(slot.start_min).padStart(2, '0')}`
                        : 'N/A'} */}
                    </p>
                  </div>
                  <div>
                    <p>End Time:</p>
                    <p>
                      {/* {slot.slot_str} */}
                      {slot.end_hr}:{slot.end_min}
                      {/* {slot.end_hr && slot.end_min
                        ? `${String(slot.end_hr).padStart(2, '0')}:${String(slot.end_min).padStart(2, '0')}`
                        : 'N/A'} */}
                    </p>
                  </div>
                  <h1 className='text-gray-800'> From {slot.slot_str}</h1>
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
                        className="object-cover w-full h-40"
                      />
                    </div>
                  ))
                ) : (
                  <p>No cover images available.</p>
                )}
              </div>
            </div>

            {/* Attachments Section */}
            <div className="flex-1">
              <h2 className="font-medium text-lg mb-2">Attachments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilityData.attachments && facilityData.attachments.length > 0 ? (
                  facilityData.attachments.map((doc, index) => (
                    <div key={index} className="rounded-lg border overflow-hidden">
                      <a
                        href={domainPrefix + doc.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-40"
                      >
                        <img
                          src={domainPrefix + doc.image_url}
                          alt={`Attachment`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </a>
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
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Description
          </h2>
          <p>{facilityData.description || 'No description provided.'}</p>
        </div>

        {/* Terms and Conditions */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Terms and Conditions
          </h2>
          <p>{facilityData.terms || 'No terms provided.'}</p>
        </div>

        {/* Cancellation Policy */}
        <div className="my-4">
          <h2 className="border-b border-black text-lg font-medium mb-2">
            Cancellation Policy
          </h2>
          <p>{facilityData.cancellation_policy || 'No policy provided.'}</p>
        </div>
      </div>
    </section>
  );
};

export default FacilityDetails;
