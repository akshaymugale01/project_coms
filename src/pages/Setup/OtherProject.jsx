import React from "react";
import Navbar from "../../components/Navbar";

const projects = [
    {
        id: 1,
        name: "Godrej City",
        address:
            "Gold Meadows at Godrej City Ph-2, Off Old Mumbai Pune Highway, Khanawale, Panvel, Raigad - 410206",
        description: "Welcome to the golf standard of living at Godrej...",
        likes: 25,
        image: "https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=", // Replace with actual image URL
    },
    {
        id: 2,
        name: "Godrej RKS",
        address:
            "Sion - Trombay Rd, Dreamland Society, Borla, Union Park, Chembur, Mumbai, Maharashtra 400071",
        description:
            "Godrej RKS at RK Studios, Chembur is an address where legacy meets luxury...",
        likes: 21,
        image: "https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=", // Replace with actual image URL
    },
];

const OtherProject = () => {
    return (
        <section className="flex" >
            <div className="hidden md:block">
                <Navbar />
            </div>
            <div className="bg-gray-100 min-h-screen p-6">

                <header className="text-center mb-8">
                    <img
                        src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?semt=ais_hybrid" // Replace with actual logo URL
                        alt="Godrej Living"
                        className="mx-auto w-40"
                    />
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                                    👍 {project.likes}
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold mb-2">{project.name}</h2>
                                <p className="text-sm text-gray-600 mb-2">{project.address}</p>
                                <p className="text-sm text-gray-800">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherProject;
