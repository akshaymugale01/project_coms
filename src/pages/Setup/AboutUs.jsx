// import React, { useEffect, useState } from "react";
// import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { PiPlusCircle } from "react-icons/pi";

// import { domainPrefix, getAboutUs, getBanner, postAboutUs, postBanner } from "../../api";
// import { getItemInLocalStorage } from "../../utils/localStorage";
// import toast from "react-hot-toast";
// import { FaInstagram } from "react-icons/fa";
// import Slider from "react-slick";
// import { Fade } from "react-slideshow-image";
// import 'react-slideshow-image/dist/styles.css'

// const AboutUs = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [bannerModalOpen, setBannerModalOpen] = useState(false);
//   const userID = getItemInLocalStorage("UserId");
//   const siteID = getItemInLocalStorage("SITEID")
//   const [aboutUsData, setAboutUsData] = useState({
//     description: "",
//     attachments: [],
//     site_id: null,
//   });

//   const [formData, setFormData] = useState({
//     site_id: siteID,
//     description: "",
//     attachments: [],
//     title: "",
//   });

//   console.log("from", formData);
//   console.log("abousUsData", aboutUsData);

//   const [bannerData, setBannerData] = useState([]);

//   console.log("BAnner Data", bannerData);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleBannerOpenModal = () => setBannerModalOpen(true);

//   const handleBannerCloseModal = () => {
//     setBannerData({ title: "", description: "", attachments: [] });
//     setBannerModalOpen(false);
//   };
//   const handleCloseModal = () => {
//     setFormData({ site_id: "", description: "", attachments: [] });
//     setIsModalOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBannerInputChange = (e) => {
//     const { name, value } = e.target;
//     setBannerData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, attachments: e.target.files }));
//   };

//   const handleBannerFileChange = (e) => {
//     setBannerData((prev) => ({ ...prev, attachments: e.target.files }));
//   };

//   const handleAddAboutUs = async () => {
//     if (!formData.description) {
//       return toast.error("Please Add Description");
//     }
//     const formDataToSend = new FormData();
//     formDataToSend.append("about[site_id]", formData.site_id);
//     formDataToSend.append("about[description]", formData.description);

//     Array.from(formData.attachments).forEach((file) => {
//       formDataToSend.append("about[attachments][]", file);
//     });

//     try {
//       await postAboutUs(formDataToSend);

//       toast.success("About Details created successfully!");
//       handleCloseModal();
//       navigate("/about_us");
//     } catch (error) {
//       console.error("Error creating details:", error);
//       toast.error("Failed to create details.");
//     }
//   };

//   const handleAddBanners = async () => {
//     // if (!formData.description) {
//     //   return toast.error("Please Add Description");
//     // }
//     const formDataToSend = new FormData();
//     formDataToSend.append("banner[title]", bannerData.title);
//     formDataToSend.append("banner[description]", bannerData.description);
//     formDataToSend.append("banner[site_id]", siteID);
//     Array.from(bannerData.attachments).forEach((file) => {
//       formDataToSend.append("[attachments][]", file);
//     });

//     try {
//       await postBanner(formDataToSend);
//       toast.success("About Details created successfully!");
//       handleBannerCloseModal();
//       navigate("/about_us");
//     } catch (error) {
//       console.error("Error creating details:", error);
//       toast.error("Failed to create details.");
//     }
//   };


//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   useEffect(() => {
//     const fetchAboutUs = async () => {
//       try {
//         const response = await getAboutUs();
//         const data = response.data;

//         if (data && Array.isArray(data) && data.length > 0) {
//           // Select the last record in the array
//           const aboutUs = data[data.length - 1];
//           setAboutUsData({
//             description: aboutUs.description || "",
//             attachments: aboutUs.attachments || [],
//             site_id: aboutUs.site_id || null,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching About Us data:", error);
//       }
//     };

//     const fetchBanner = async () => {
//       try {
//         const response = await getBanner(); // API call to fetch banners
//         const data = response.data;

//         if (data && Array.isArray(data) && data.length > 0) {
//           const lastRecords = data.slice(-4);

//           const bannerFetchData = lastRecords.map((banner) => ({
//             description: banner.description || "",
//             attachments: banner.attachments || [],
//             site_id: banner.site_id || null
//           }));

//           setBannerData(bannerFetchData);

//           console.log("Fetched Banner Data: ", bannerFetchData); // Debugging
//         }
//       } catch (error) {
//         console.error("Error fetching banner data:", error);
//       }
//     };


//     fetchAboutUs();
//     fetchBanner();
//   }, []);



//   const fadeImages = [
//     {
//       url:
//         bannerData[0]?.attachments?.[0]?.document
//           ? `${domainPrefix}${bannerData[0].attachments[0].document}`
//           : "/path-to-default-image.jpg", // Fallback image
//       caption: "First Slide",
//     },
//     {
//       url:
//         bannerData[1]?.attachments?.[0]?.document
//           ? `${domainPrefix}${bannerData[1].attachments[0].document}`
//           : "/path-to-default-image.jpg", // Fallback image
//       caption: "Second Slide",
//     },
//     {
//       url:
//         bannerData[2]?.attachments?.[0]?.document
//           ? `${domainPrefix}${bannerData[2].attachments[0].document}`
//           : "/path-to-default-image.jpg", // Fallback image
//       caption: "Third Slide",
//     },
//   ];

//   // console.log("b ", bannerData[0].attachments[0].document);

//   return (
//     <div>
//       <div
//         style={{
//           backgroundImage: aboutUsData.attachments.length > 0
//             ? `url(${domainPrefix}${aboutUsData?.attachments?.[0]?.image_url})`
//             : "url('/path-to-default-background.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           minHeight: "100vh",
//           width: "100%",
//         }}
//         className="flex flex-col"
//       >
//         {/* Buttons Section */}
//         <div className="flex flex-wrap justify-end p-4 space-y-4 space-x-4">
//           {userID === 574 && (
//             <>
//               <button
//                 onClick={handleOpenModal}
//                 className="bg-gray-900 font-semibold p-2 px-4 rounded-md text-white cursor-pointer flex items-center gap-2"
//               >
//                 <PiPlusCircle size={20} />
//                 Add About Us
//               </button>
//               <button
//                 onClick={handleBannerOpenModal}
//                 className="bg-gray-900 font-semibold p-2 px-4 rounded-md text-white cursor-pointer flex items-center gap-2"
//               >
//                 <PiPlusCircle size={20} />
//                 Add Banners
//               </button>
//             </>
//           )}
//         </div>

//         {/* Header */}
//         <header className="text-center py-12 mb-16">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">MyCiti Life</h1>
//           <p className="text-base md:text-lg text-gray-600 mt-4">
//             Discover our journey and values.
//           </p>
//         </header>

//         {/* Slider Section */}
//         <div className="slide-container px-4 md:px-8">
//           <Fade>
//             {fadeImages.map((fadeImage, index) => (
//               <div key={index} className="mx-auto max-w-xs md:max-w-lg">
//                 <img
//                   className="w-full h-auto block mx-auto"
//                   src={fadeImage.url}
//                   alt={fadeImage.caption}
//                 />
//                 <h2 className="text-center text-sm md:text-base mt-2">
//                   {fadeImage.caption}
//                 </h2>
//               </div>
//             ))}
//           </Fade>
//         </div>

//         {/* About Us Section */}
//         <section className="flex flex-col px-4 md:px-8 w-full">
//           <div className="mb-16">
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               About Us Content
//             </h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               {aboutUsData.description}
//             </p>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-white py-4">
//           <div className="flex justify-center gap-4 mb-2">
//             <a
//               href="https://www.instagram.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <BsInstagram size={24} />
//             </a>
//             <a
//               href="https://www.facebook.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <BsFacebook size={24} />
//             </a>
//             <a
//               href="https://twitter.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <BsTwitter size={24} />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white hover:text-gray-400"
//             >
//               <BsLinkedin size={24} />
//             </a>
//           </div>
//           <div className="max-w-4xl mx-auto text-center px-4">
//             <p className="text-sm">
//               &copy; {new Date().getFullYear()} MyCiti Life. All rights reserved.
//             </p>
//             <div className="mt-4 flex justify-center gap-4">
//               <a
//                 href="/privacy-policy"
//                 className="text-gray-400 hover:text-white transition duration-300"
//               >
//                 Privacy Policy
//               </a>
//               <a
//                 href="/terms-of-service"
//                 className="text-gray-400 hover:text-white transition duration-300"
//               >
//                 Terms of Service
//               </a>
//               <a
//                 href="/contact-us"
//                 className="text-gray-400 hover:text-white transition duration-300"
//               >
//                 Contact Us
//               </a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>

//   );
// };

// export default AboutUs;
import React, { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { domainPrefix, getAboutUs, getBanner, postAboutUs, postBanner } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { Fade } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const userID = getItemInLocalStorage("UserId");
  const siteID = getItemInLocalStorage("SITEID");

  const [aboutUsData, setAboutUsData] = useState({
    description: "",
    attachments: [],
    site_id: null,
  });

  const [formData, setFormData] = useState({
    site_id: siteID,
    description: "",
    attachments: [],
    title: "",
  });

  const [bannerData, setBannerData] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleBannerOpenModal = () => setBannerModalOpen(true);
  const handleBannerCloseModal = () => setBannerModalOpen(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleBannerInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleBannerFileChange = (e) => {
    setBannerData((prev) => ({ ...prev, attachments: e.target.files }));
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
      navigate("/setup");
    } catch (error) {
      console.error("Error creating details:", error);
      toast.error("Failed to create details.");
    }
  };

  const handleAddBanners = async () => {
    // if (!formData.description) {
    //   return toast.error("Please Add Description");
    // }
    const formDataToSend = new FormData();
    formDataToSend.append("banner[title]", bannerData.title);
    formDataToSend.append("banner[description]", bannerData.description);
    formDataToSend.append("banner[site_id]", siteID);
    Array.from(bannerData.attachments).forEach((file) => {
      formDataToSend.append("[attachments][]", file);
    });

    try {
      await postBanner(formDataToSend);
      toast.success("Banner created successfully!");
      handleBannerCloseModal();
      navigate("/setup");
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

        if (data && data.length > 0) {
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

    const fetchBanner = async () => {
      try {
        const response = await getBanner();
        const data = response.data;

        if (data && data.length > 0) {
          setBannerData(data.slice(-3)); // Show the last three banners
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchAboutUs();
    fetchBanner();
  }, [userID, siteID]);


  // const fadeImages = Array.isArray(bannerData) ? bannerData.map((banner, index) => ({
  //   url: banner.attachments?.[0]?.document
  //     ? `${domainPrefix}${banner.attachments[0].document}`
  //     : "/path-to-default-image.jpg", // Fallback image
  //   caption: `Slide ${index + 1}`,
  // })) : [];

  const fadeImages = [
    {
      url:
        bannerData[0]?.attachments?.[0]?.document
          ? `${domainPrefix}${bannerData[0].attachments[0].document}`
          : "/path-to-default-image.jpg", // Fallback image
      caption: "First Slide",
    },
    {
      url:
        bannerData[1]?.attachments?.[0]?.document
          ? `${domainPrefix}${bannerData[1].attachments[0].document}`
          : "/path-to-default-image.jpg", // Fallback image
      caption: "Second Slide",
    },
    {
      url:
        bannerData[2]?.attachments?.[0]?.document
          ? `${domainPrefix}${bannerData[2].attachments[0].document}`
          : "/path-to-default-image.jpg", // Fallback image
      caption: "Third Slide",
    },
  ];

  return (
    <div>
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
        className="flex flex-col"
      >
        {/* Buttons Section */}
        <div className="flex justify-end p-4">
          {userID === 574 && (
            <>
              <button
                onClick={handleOpenModal}
                className="bg-gray-900 text-white font-semibold p-2 px-4 rounded-md flex items-center gap-2"
              >
                <PiPlusCircle size={20} />
                Add About Us
              </button>
              <button
                onClick={handleBannerOpenModal}
                className="bg-gray-900 text-white font-semibold p-2 px-4 rounded-md flex items-center gap-2"
              >
                <PiPlusCircle size={20} />
                Add Banners
              </button>
            </>
          )}
        </div>

        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800">MyCiti Life</h1>
          <p className="text-lg text-gray-600 mt-4">Discover our journey and values.</p>
        </header>

        {/* Slider Section */}
        <div className="slide-container px-4 md:px-8">
          <Fade>
            {fadeImages.map((fadeImage, index) => (
              <div
                key={index}
                className="mx-auto max-w-xs md:max-w-lg h-72 w-full flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover"
                  src={fadeImage.url}
                  alt={fadeImage.caption}
                />
              </div>
            ))}
          </Fade>
        </div>

        {/* About Us Section */}
        <section className="px-4 md:px-8 w-full">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us Content</h2>
            <p className="text-lg text-gray-700">{aboutUsData.description}</p>
          </div>
        </section>

        {/*About Us- Modals */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Add About Us</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                <button onClick={handleAddAboutUs} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Banner Modal */}
        {bannerModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Add Banners</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  name="title"
                  id="title"
                  value={bannerData.title}
                  onChange={handleBannerInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={bannerData.description}
                  onChange={handleBannerInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <input
                  type="file"
                  multiple
                  onChange={handleBannerFileChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={handleBannerCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                <button onClick={handleAddBanners} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-2">
              <BsInstagram size={24} />
              <BsFacebook size={24} />
              <BsTwitter size={24} />
              <BsLinkedin size={24} />
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MyCiti Life. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
