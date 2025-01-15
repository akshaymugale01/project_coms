import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { getOtherProject, postOtherProject, postProjectLike } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { PiPlusCircle } from "react-icons/pi";

const OtherProject = () => {
    const companyID = getItemInLocalStorage("COMPANYID");
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        attachments: [],
    });
    const [loading, setLoading] = useState(true);

    // Fetch projects from the API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getOtherProject();
                const data = response.data
                const transformedProjects = data.map((project) => ({
                    ...project,
                    image: project.attachments?.[0]?.document
                        ? `https://app.myciti.life${project.attachments[0].document}`
                        : "https://via.placeholder.com/300", // Default image
                }));
                setProjects(transformedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Handle Modal Open/Close
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            title: "",
            description: "",
            address: "",
            attachments: [],
        });
    };

    // Handle Form Changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "attachments") {
            setFormData({ ...formData, attachments: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleLikeSubmit = async (id) => {
        const formDataToSend = new FormData();
        formDataToSend.append("other_project_id", id); // Use the passed id parameter
        formDataToSend.append("status", "liked");

        try {
            await postProjectLike(formDataToSend); // Make the API call
            console.log("Like submitted successfully");
        } catch (error) {
            console.error("Error submitting like:", error);
        }
    };

    // Submit New Project
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("other_project[title]", formData.title);
        formDataToSend.append("other_project[description]", formData.description);
        formDataToSend.append("other_project[address]", formData.address);
        formDataToSend.append("other_project[company_id]", companyID);
        Array.from(formData.attachments).forEach((file) => {
            formDataToSend.append("attachments[]", file);
        });

        try {
            const response = await postOtherProject(formDataToSend);
            console.log("Response:", response.data);
            // Reload projects after submission
            setProjects((prevProjects) => [
                ...prevProjects,
                {
                    ...response.data,
                    image: response.data.attachments?.[0]?.document
                        ? `https://app.myciti.life${response.data.attachments[0].document}`
                        : "https://via.placeholder.com/300",
                },
            ]);
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <section className="flex">
            <div className="hidden md:block">
                <Navbar />
            </div>

            <div className="min-h-screen bg-gray-700 w-full p-6">
                <div className="flex justify-end text-right mb-4">
                    {companyID === 48 && (
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
                                    <div className="overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div
                                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full cursor-pointer"
                                        onClick={() => handleLikeSubmit(project.id)}
                                    >
                                        👍 {project.like_count || 0}
                                    </div>

                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{project.address}</p>
                                    <p className="text-sm text-gray-800">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
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
                                <label className="block text-sm font-bold mb-2">Description</label>
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
                                <label className="block text-sm font-bold mb-2">Attachments</label>
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
            )}
        </section>
    );
};

export default OtherProject;
