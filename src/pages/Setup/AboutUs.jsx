import React, { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

import { domainPrefix, getAboutUs, postAboutUs } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa";

const AboutUs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = getItemInLocalStorage("UserId");
  const siteID = getItemInLocalStorage("SITEID")
  const [aboutUsData, setAboutUsData] = useState({
    description: "",
    attachments: [],
    site_id: null,
  });
  const [formData, setFormData] = useState({
    site_id: siteID,
    description: "",
    attachments: [],
  });

  console.log("from", formData);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setFormData({ site_id: "", description: "", attachments: [] });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleAddAboutUs = async () => {
    if (!formData.description) {
      return toast.error("Please Add Description");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("about[site_id]", formData.site_id);
    formDataToSend.append("about[description]", formData.description);

    Array.from(formData.attachments).forEach((file) => {
      formDataToSend.append("about[attachments][]", file);
    });

    try {
      await postAboutUs(formDataToSend);

      toast.success("About Details created successfully!");
      handleCloseModal();
      navigate("/about_us");
    } catch (error) {
      console.error("Error creating details:", error);
      toast.error("Failed to create details.");
    }
  };

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await getAboutUs();
        const data = response.data;

        if (data && Array.isArray(data) && data.length > 0) {
          // Select the last record in the array
          const aboutUs = data[data.length - 1];
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


  return (
    <div className="flex flex-col">
      <div
        style={{
          backgroundImage: aboutUsData.attachments.length > 0
            ? `url(${domainPrefix}${aboutUsData.attachments[0].image_url})`
            : "url('/path-to-default-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="flex w-50 p-4 justify-end">
          {userID === 574 && (
            <button
              onClick={handleOpenModal}
              style={{ background: "rgb(19 27 32)" }}
              className="font-semibold duration-300 ease-in-out transition-all p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add About Us
            </button>
          )}
        </div>
        <header className="text-center py-12 mb-16">
          <h1 className="text-4xl font-bold text-gray-800">MyCiti Life</h1>
          <p className="text-lg text-gray-600 mt-4">Discover our journey and values.</p>
        </header>

        <section className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us Content</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{aboutUsData.description}</p>
          </div>
        </section>



        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Add About Us</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Attachments
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAboutUs}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}


      </div>


      <footer className="bg-gray-800 text-white py-2">
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
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyCiti Life. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="/contact-us"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
