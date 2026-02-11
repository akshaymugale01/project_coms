import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPetById } from "../../api";
import { DNA } from "react-loader-spinner";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { BiEdit } from "react-icons/bi";

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await getPetById(id);
      const petData = response.data;

      const profileDoc = petData.documents?.find(
        (doc) => doc.relation === "PetProfile"
      );

      if (profileDoc) {
        petData.profile_image = `https://app.myciti.life${profileDoc.document}`;
      }

      const petImageDocs =
        petData.documents?.filter((doc) => doc.relation === "PetsImage") || [];

      petData.pet_images = petImageDocs.map(
        (doc) => `https://app.myciti.life${doc.document}`
      );

      setPet(petData);
    } catch (error) {
      toast.error("Failed to fetch pet details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA height={80} width={80} />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Pet not found</p>
      </div>
    );
  }

  return (
    <section className="flex bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Pet Details
            </h1>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="border-b bg-gray-50 px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                {pet.profile_image ? (
                  <img
                    src={pet.profile_image}
                    alt={pet.pet_name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {pet.pet_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {pet.pet_breed} • {pet.gender}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/setup/pets-edit/${id}`}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                  <BiEdit /> Edit
                </Link>

                <Link
                  to="/setup/pets"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  Back
                </Link>
              </div>
            </div>

            <div className="p-6 space-y-10">

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: "Pet Name", value: pet.pet_name },
                    { label: "Breed", value: pet.pet_breed },
                    { label: "Gender", value: pet.gender },
                    { label: "Colour", value: pet.colour },
                    { label: "Age", value: pet.age },
                    { label: "Date of Birth", value: pet.dob },
                    { label: "Owner Mobile", value: pet.owner_mobile_no },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <p className="text-xs text-gray-500 uppercase">
                        {item.label}
                      </p>
                      <p className="text-gray-800 font-medium mt-1">
                        {item.value || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: "is_pet_transfered", label: "Pet Transferred" },
                    { key: "brought", label: "Brought" },
                    { key: "stray_pet_adopted", label: "Stray Pet Adopted" },
                    { key: "whether_brought_from_current_city", label: "From Current City" },
                    { key: "pet_born_to_owner_dog", label: "Born to Owner's Dog" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          pet[item.key]
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {pet[item.key] ? "Yes" : "No"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {pet.pet_images && pet.pet_images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Pet Gallery
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {pet.pet_images.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                      >
                        <img
                          src={image}
                          alt={`${pet.pet_name} ${index + 1}`}
                          className="w-full h-40 object-cover hover:scale-105 transition duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Record Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {pet.created_at && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase">
                      Created At
                    </p>
                    <p className="text-gray-800 mt-1">
                      {new Date(pet.created_at).toLocaleString()}
                    </p>
                  </div>
                )}

                {pet.updated_at && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase">
                      Updated At
                    </p>
                    <p className="text-gray-800 mt-1">
                      {new Date(pet.updated_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PetDetails;
