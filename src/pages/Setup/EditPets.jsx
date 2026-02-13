import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, updatePet, getBuildings, getFloors, getUnits, getSetupUsers } from "../../api";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import Navbar from "../../components/Navbar";

function EditPets() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedTower, setSelectedTower] = useState("");
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [formData, setFormData] = useState({
    user_id: "",
    pet_name: "",
    owner_mobile_no: "",
    pet_breed: "",
    gender: "",
    colour: "",
    age: "",
    dob: "",
    is_pet_transfered: false,
    brought: false,
    stray_pet_adopted: false,
    whether_brought_from_current_city: false,
    pet_born_to_owner_dog: false,
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [petImages, setPetImages] = useState([]);
  const [profilePreview, setProfilePreview] = useState(null);
  const [petImagesPreview, setPetImagesPreview] = useState([]);
  const [existingProfileImage, setExistingProfileImage] = useState(null);
  const [existingPetImages, setExistingPetImages] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, [id]);

  useEffect(() => {
    if (selectedTower && selectedFloorId && selectedUnit) {
      fetchUsersForUnit();
    }
  }, [selectedTower, selectedFloorId, selectedUnit]);

  const loadInitialData = async () => {
    try {
      setFetchLoading(true);
      const [buildingRes, petRes] = await Promise.all([
        getBuildings(),
        getPetById(id),
      ]);
      
      setBuildings(buildingRes.data || []);
      const pet = petRes.data;

      setFormData({
        user_id: pet.user_id || "",
        pet_name: pet.pet_name || "",
        owner_mobile_no: pet.owner_mobile_no || "",
        pet_breed: pet.pet_breed || "",
        gender: pet.gender || "",
        colour: pet.colour || "",
        age: pet.age || "",
        dob: pet.dob || "",
        is_pet_transfered: pet.is_pet_transfered || false,
        brought: pet.brought || false,
        stray_pet_adopted: pet.stray_pet_adopted || false,
        whether_brought_from_current_city: pet.whether_brought_from_current_city || false,
        pet_born_to_owner_dog: pet.pet_born_to_owner_dog || false,
      });

      // Load user site information if available
      if (pet.user_id) {
        const usersRes = await getSetupUsers();
        const allUsers = usersRes.data || [];
        const currentUser = allUsers.find(u => u.id === pet.user_id);
        
        if (currentUser && currentUser.user_sites && currentUser.user_sites.length > 0) {
          const userSite = currentUser.user_sites[0];
          setSelectedTower(String(userSite.build_id || ""));
          setSelectedFloorId(String(userSite.floor_id || ""));
          setSelectedUnit(String(userSite.unit_id || ""));
          setSelectedUserId(String(pet.user_id));

          // Load floors and units
          if (userSite.build_id) {
            const floorsRes = await getFloors(userSite.build_id);
            setFloors(floorsRes.data || []);
          }
          if (userSite.floor_id) {
            const unitsRes = await getUnits(userSite.floor_id);
            setUnits(unitsRes.data || []);
          }
        }
      }

      // Set existing images
      const documents = pet.documents || [];
      const profileImg = documents.find(doc => doc.relation === "PetProfile");
      const petImgs = documents.filter(doc => doc.relation === "PetsImage");

      if (profileImg) {
        setExistingProfileImage(`https://app.myciti.life${profileImg.document}`);
      }
      if (petImgs.length > 0) {
        setExistingPetImages(petImgs.map(img => `https://app.myciti.life${img.document}`));
      }
    } catch (error) {
      console.error("Error loading pet details:", error);
      toast.error("Failed to load pet details");
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchUsersForUnit = async () => {
    try {
      const response = await getSetupUsers();
      const allUsers = response.data || [];
      
      const filteredUsers = allUsers.filter((user) => {
        return user.user_sites?.some(
          (site) =>
            site.build_id === Number(selectedTower) &&
            site.floor_id === Number(selectedFloorId) &&
            site.unit_id === Number(selectedUnit)
        );
      });

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);

    const selectedUser = users.find((u) => u.id === Number(userId));
    if (selectedUser) {
      setFormData((prev) => ({
        ...prev,
        user_id: userId,
        owner_mobile_no: selectedUser.mobile || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "owner_mobile_no") {
      const digits = value.replace(/\D/g, "");
      return setFormData({ ...formData, owner_mobile_no: digits.slice(0, 10) });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handlePetImagesChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPetImages((prev) => [...prev, ...filesArray]);

      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPetImagesPreview((prev) => [...prev, ...previewsArray]);
    }
  };

  const removePetImage = (index) => {
    setPetImages((prev) => prev.filter((_, i) => i !== index));
    setPetImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPetImage = (index) => {
    setExistingPetImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pet_name || !formData.owner_mobile_no) {
      return toast.error("Please enter pet name and owner mobile number");
    }

    if (formData.owner_mobile_no.length !== 10) {
      return toast.error("Mobile number must be exactly 10 digits");
    }

    if (!formData.user_id) {
      return toast.error("Please select a user");
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      
      submitData.append("pet[user_id]", formData.user_id);
      submitData.append("pet[pet_name]", formData.pet_name);
      submitData.append("pet[owner_mobile_no]", formData.owner_mobile_no);
      submitData.append("pet[pet_breed]", formData.pet_breed || "");
      submitData.append("pet[gender]", formData.gender || "");
      submitData.append("pet[colour]", formData.colour || "");
      if (formData.age) {
        submitData.append("pet[age]", formData.age);
      }
      if (formData.dob) {
        submitData.append("pet[dob]", formData.dob);
      }
     // BOOLEAN
submitData.append("pet[is_pet_transfered]", formData.is_pet_transfered ? "true" : "false");
submitData.append("pet[brought]", formData.brought ? "true" : "false");
submitData.append("pet[stray_pet_adopted]", formData.stray_pet_adopted ? "true" : "false");
submitData.append("pet[whether_brought_from_current_city]", formData.whether_brought_from_current_city ? "true" : "false");
submitData.append("pet[pet_born_to_owner_dog]", formData.pet_born_to_owner_dog ? "true" : "false");

// PROFILE IMAGE
if (profileImage) {
  submitData.append("pet[pet_details][profile_image]", profileImage);
}

// MULTIPLE IMAGES
petImages.forEach((img) => {
  submitData.append("pet[pet_details][pet_images][]", img);
});


      await updatePet(id, submitData);
      toast.success("Pet updated successfully!");
      navigate("/setup/pets");
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error(error.response?.data?.error || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <section className="flex">
        <Navbar />
        <div className="w-full flex justify-center items-center h-screen">
          <DNA visible={true} height="120" width="120" ariaLabel="dna-loading" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-5">Edit Pet</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl border p-8">
          <div className="flex flex-wrap items-start mb-6">
            <div className="w-full sm:w-[150px] text-center mb-6 sm:mb-0">
              <div className="w-[120px] h-[120px] bg-indigo-100 rounded-full mx-auto overflow-hidden border-4 border-indigo-400/50 shadow-md">
                <img
                  src={
                    profilePreview ||
                    existingProfileImage ||
                    "https://www.pngitem.com/pimgs/m/137-1370051_avatar-generic-avatar-hd-png-download.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                className="text-2xl mt-2 text-indigo-600 hover:text-indigo-800 transition"
                onClick={() => document.getElementById("profileUpload").click()}
              >
                📷
              </button>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 sm:ml-8">
              <div className="text-sm font-medium">
                <label className="block mb-1">Pet Name *</label>
                <input
                  type="text"
                  name="pet_name"
                  value={formData.pet_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Pet Breed</label>
                <input
                  type="text"
                  name="pet_breed"
                  value={formData.pet_breed}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Colour</label>
                <input
                  type="text"
                  name="colour"
                  value={formData.colour}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="e.g., 1 years"
                />
              </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* Additional Pet Information */}
          <div className="mb-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_pet_transfered"
                  checked={formData.is_pet_transfered}
                  onChange={(e) => setFormData({...formData, is_pet_transfered: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Is Pet Transferred</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="brought"
                  checked={formData.brought}
                  onChange={(e) => setFormData({...formData, brought: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Brought</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="stray_pet_adopted"
                  checked={formData.stray_pet_adopted}
                  onChange={(e) => setFormData({...formData, stray_pet_adopted: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Stray Pet Adopted</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="whether_brought_from_current_city"
                  checked={formData.whether_brought_from_current_city}
                  onChange={(e) => setFormData({...formData, whether_brought_from_current_city: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Brought from Current City</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pet_born_to_owner_dog"
                  checked={formData.pet_born_to_owner_dog}
                  onChange={(e) => setFormData({...formData, pet_born_to_owner_dog: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Pet Born to Owner's Dog</label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 border-t pt-4">
            <div>
              <label className="text-sm font-medium block mb-1">Tower *</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={selectedTower}
                onChange={async (e) => {
                  const buildId = e.target.value;
                  setSelectedTower(buildId);
                  setSelectedFloorId("");
                  setFloors([]);
                  setSelectedUnit("");
                  setUnits([]);
                  setUsers([]);

                  if (buildId) {
                    const res = await getFloors(buildId);
                    setFloors(res.data || []);
                  }
                }}
                required
              >
                <option value="">Select Building</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Floor *</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={selectedFloorId}
                onChange={async (e) => {
                  const floorId = e.target.value;
                  setSelectedFloorId(floorId);
                  setSelectedUnit("");
                  setUnits([]);
                  setUsers([]);

                  if (floorId) {
                    const res = await getUnits(floorId);
                    setUnits(res.data || []);
                  }
                }}
                required
                disabled={!selectedTower}
              >
                <option value="">Select Floor</option>
                {floors.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Unit *</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={selectedUnit}
                onChange={(e) => {
                  setSelectedUnit(e.target.value);
                  setUsers([]);
                }}
                required
                disabled={!selectedFloorId}
              >
                <option value="">Select Unit</option>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">User *</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={selectedUserId}
                onChange={handleUserChange}
                required
                disabled={users.length === 0}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname} {user.lastname}
                  </option>
                ))}
              </select>
            </div>

              <div className="text-sm font-medium">
                <label className="block mb-1">Owner Mobile *</label>
                <input
                  type="text"
                  name="owner_mobile_no"
                  value={formData.owner_mobile_no}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                  maxLength={10}
                />
              </div>
          </div>

          {/* Existing Pet Images */}
          {existingPetImages.length > 0 && (
            <div className="mb-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Existing Pet Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingPetImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingPetImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Pet Images */}
          <div className="mb-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Pet Images</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePetImagesChange}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            {petImagesPreview.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {petImagesPreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`New ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removePetImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/setup/pets")}
              className="bg-gray-100 text-gray-700 px-8 py-2 rounded-lg font-semibold shadow-lg border border-gray-300 hover:bg-gray-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-700 text-white px-8 py-2 rounded-lg font-semibold shadow-lg hover:bg-indigo-800 disabled:opacity-50 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <DNA height={20} width={20} />
                  Updating...
                </>
              ) : (
                "Update Pet"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditPets;