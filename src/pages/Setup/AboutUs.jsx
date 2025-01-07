import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { domainPrefix, getAboutUs } from "../../api";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState({
    description: "",
    attachments: [],
    site_id: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch data using API function
    const fetchAboutUs = async () => {
      try {
        const response = await getAboutUs(); // Call the API
        const data = response.data;

        console.log("desc", data, data[3]?.description); // Debugging to check the data structure

        if (data && Array.isArray(data) && data.length > 1) {
          const aboutUs = data[4]; // Access the first object in the array
          setAboutUsData({
            description: aboutUs.description || "",
            attachments: aboutUs.attachments || [],
            site_id: aboutUs.site_id || null,
          });
        }
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    fetchAboutUs();
  }, []);

  console.log("de", aboutUsData.attachments);

  return (
    <div>
      <div style={{
        className: "flex flex-col text-red-500",
        backgroundImage: aboutUsData.attachments.length > 0
          ? `url(${domainPrefix}${aboutUsData.attachments[0].image_url})` // Set the first image as the background
          : "url('/path-to-default-background.jpg')", // Default background if no attachments
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensure it covers the whole page
        width: "100%",
      }}>
        {/* Header Section */}
        <header className="text-center py-12 mb-16">
          <h1 className="text-4xl font-bold text-gray-800">MyCiti Life</h1>
          <p className="text-lg text-gray-600 mt-4">Discover our journey and values.</p>
        </header>

        {/* Main Content Section */}
        <section className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us Content</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{aboutUsData.description}</p>
          </div>

          {/* <div>
          {aboutUsData.attachments.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {aboutUsData.attachments.map((attachment, index) => (
                <li key={index} className="relative">
                  <img
                    src={`${domainPrefix}${attachment.image_url}`}
                    alt={`Attachment ${index + 1}`}
                    className="cursor-pointer object-cover rounded-md shadow-lg w-full h-32"
                    onClick={() => setSelectedImage(`${domainPrefix}${attachment.image_url}`)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No attachments available</p>
          )}
        </div> */}


        </section>

        {/* Modal for Full-Screen Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Selected attachment"
              className="max-w-full max-h-full rounded-md shadow-lg"
            />
            <button
              className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-600 rounded-full p-2 focus:outline-none"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center py-6 mt-20">
          <footer>
            <div className="flex justify-center gap-4 mb-2">
              {/* Social Media Icons with Links */}
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                aria-label="Instagram"
              >
                <BsInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                aria-label="Facebook"
              >
                <BsFacebook size={24} />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                aria-label="Twitter"
              >
                <BsTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                aria-label="LinkedIn"
              >
                <BsLinkedin size={24} />
              </a>
            </div>
            <p className="text-white text-sm">
              &copy; 2025 Our Company. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
