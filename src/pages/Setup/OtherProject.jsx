import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../../components/Navbar";
import {
  deleteOtherProject,
  domainPrefix,
  getOtherProject,
  postOtherProject,
  postProjectLike,
  putOtherProject,
} from "../../api"; // Import delete API function
import { getItemInLocalStorage } from "../../utils/localStorage";
import { PiPlusCircle } from "react-icons/pi";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Trash icon for delete
import Slider from "react-slick";
import toast from "react-hot-toast";

const OtherProject = () => {
  const companyID = getItemInLocalStorage("COMPANYID");
  const userID = getItemInLocalStorage("UserId");
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    attachments: [],
    pdf: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getOtherProject();
        const data = response.data;
        const transformedProjects = data.map((project) => {
          const lastFivePictures = project.attachments.slice(-5) || [];
          return {
            ...project,
            images: lastFivePictures.map((attachments) =>
              attachments.document
                ? `https://app.myciti.life${attachments.document}`
                // ? `http://localhost:3002${attachments.document}`
                : "https://via.placeholder.com/300"
            ),
          };
        });
        setProjects(transformedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenModal = () => {
    setIsEditMode(false); // Set to Add mode
    setFormData({
      title: "",
      description: "",
      address: "",
      attachments: [],
      pdf: [],
    });
    setIsModalOpen(true);
  };
  const handleEdit = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    if (!projectToEdit) return;

    setIsEditMode(true); // Set to Edit mode
    setCurrentProjectId(id); // Set current project ID
    setFormData({
      title: projectToEdit.title,
      description: projectToEdit.description,
      address: projectToEdit.address,
      attachments: [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      address: "",
      attachments: [],
      pdf: [],
    });
  };

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments" || name === "pdf") {
      // Handle both 'attachments' and 'pdf' the same way
      setFormData((prevData) => ({
        ...prevData,
        [name]: files, // Set files as an array of file objects
      }));
    } else {
      // For other input types, set the value normally
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  // Handle Like
  const handleLikeSubmit = async (id) => {
    try {
      await postProjectLike({ other_project_id: id, status: "liked" });
      setLikedProjects((prevLikedProjects) => [...prevLikedProjects, id]); // Mark the project as liked
      console.log("Like submitted successfully");
    } catch (error) {
      console.error("Error submitting like:", error);
    }
  };
  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await deleteOtherProject(id); // API call to delete project
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      ); // Update state
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Submit New Project
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("other_project[title]", formData.title);
  //     formDataToSend.append("other_project[description]", formData.description);
  //     formDataToSend.append("other_project[address]", formData.address);
  //     formDataToSend.append("other_project[company_id]", companyID);
  //     Array.from(formData.attachments).forEach((file) => {
  //       formDataToSend.append("attachments[]", file);
  //     });

  //     try {
  //       const response = await postOtherProject(formDataToSend);
  //       setProjects((prevProjects) => [
  //         ...prevProjects,
  //         {
  //           ...response.data,
  //           image: response.data.attachments?.[0]?.document
  //             ? `https://app.myciti.life${response.data.attachments[0].document}`
  //             : "https://via.placeholder.com/300",
  //         },
  //       ]);
  //       handleCloseModal();
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Posting Please Wait")
    // Ensure `attachments` and `pdf` are arrays before processing
    const attachments = formData.attachments || []; // Default to an empty array if undefined
    const pdf = formData.pdf || []; // Default to an empty array if undefined

    // Prepare FormData for submission
    const formDataToSend = new FormData();
    formDataToSend.append("other_project[title]", formData.title || ""); // Default empty string if undefined
    formDataToSend.append(
      "other_project[description]",
      formData.description || ""
    );
    formDataToSend.append("other_project[address]", formData.address || "");

    // Append attachments
    Array.from(attachments).forEach((file) => {
      formDataToSend.append("attachments[]", file);
    });

    // Append PDFs
    Array.from(pdf).forEach((file) => {
      formDataToSend.append("pdf[]", file);
    });

    // Log the FormData to verify structure
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (isEditMode) {
        // Edit Mode: Call PUT API
        await putOtherProject(currentProjectId, formDataToSend);
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === currentProjectId
              ? { ...project, ...formData }
              : project
          )
        );
        toast.dismiss();
        toast.success("Project updated successfully!");
      } else {
        // Add Mode: Call POST API
        const response = await postOtherProject(formDataToSend);
        setProjects((prevProjects) => [...prevProjects, response.data]);
        toast.dismiss();
        toast.success("Created Sucessfully!");
      }
      handleCloseModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // console.log("slider", projects);

  console.log("formdata", formData);

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-700 w-full p-6">
        <div className="flex justify-end text-right mb-4">
          {userID === 574 && (
            <>
              <button
                onClick={handleOpenModal}
                className="bg-gray-900 text-white font-semibold p-2 px-4 rounded-md flex items-center gap-2"
              >
                <PiPlusCircle size={20} />
                Add New Project
              </button>
            </>
          )}
        </div>
        <header className="text-center mb-8">
          <img
            src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?semt=ais_hybrid"
            alt="Godrej Living"
            className="mx-auto w-20"
          />
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-md rounded-lg overflow-hidden group"
              >
                <div className="relative">
                  <div className="relative">
                    {/* Conditional rendering based on the number of images */}
                    {project?.images?.length === 1 ? (
                      // Single image layout
                      <div className="overflow-hidden">
                        <img
                          src={project.images[0]}
                          alt={`${project.title} - Image`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      // Slider layout for multiple images
                      <Slider {...sliderSettings}>
                        {project?.images?.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>

                  <div
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${
                      likedProjects.includes(project.id)
                        ? "bg-green-500"
                        : "bg-red-500 cursor-pointer"
                    } text-white text-sm font-bold py-1 px-3 rounded-full`}
                    onClick={() => {
                      if (!likedProjects.includes(project.id)) {
                        handleLikeSubmit(project.id);
                      }
                    }}
                  >
                    {likedProjects.includes(project.id) ||
                    project.liked_count === 0
                      ? "I'm Interested"
                      : `👍 ${project.liked_count || 0}`}
                  </div>

                  {userID === 574 && (
                    <div
                      className="absolute top-4 right-14 bg-gray-900 text-white text-sm p-2 rounded-full cursor-pointer"
                      onClick={() => handleEdit(project.id)}
                    >
                      <FiEdit size={18} />
                    </div>
                  )}

                  {userID === 574 && (
                    <div
                      className="absolute top-4 right-4 bg-gray-900 text-white text-sm p-2 rounded-full cursor-pointer"
                      onClick={() => handleDelete(project.id)}
                    >
                      <FiTrash2 className="text-red-500" size={18} />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{project.title}</h2>

                  {project.pdf && project.pdf[0]?.document ? (
                    <a
                      href={project.pdf[0]?.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold mb-2"
                    >
                      Download PDF
                    </a>
                  ) : null}

                  <p className="text-sm text-gray-600 mb-2">
                    {project.address}
                  </p>

                  <p className="text-sm text-gray-800">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Attachments
                </label>
                <input
                  type="file"
                  name="attachments"
                  multiple
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">
              {isEditMode ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Attachments
                </label>
                <input
                  type="file"
                  name="attachments"
                  multiple
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">PDF</label>
                <input
                  type="file"
                  name="pdf"
                  multiple
                  accept="application/pdf" // Restrict to PDF files
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {isEditMode ? "Update Project" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default OtherProject;
