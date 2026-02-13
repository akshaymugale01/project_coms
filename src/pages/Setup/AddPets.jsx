import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBuildings,
  getFloors,
  getUnits,
  getSetupUsers,
  postPet,
} from "../../api";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import Navbar from "../../components/Navbar";

function AddPets() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
  const [profilePreview, setProfilePreview] = useState(null);
  const [petImages, setPetImages] = useState([]);
  const [petImagesPreview, setPetImagesPreview] = useState([]);

  // Load Buildings
  useEffect(() => {
    const loadBuildings = async () => {
      try {
        const res = await getBuildings();
        setBuildings(res.data || []);
      } catch {
        toast.error("Failed to load buildings");
      }
    };
    loadBuildings();
  }, []);

  // Fetch Users When Unit Selected
  useEffect(() => {
    if (selectedTower && selectedFloorId && selectedUnit) {
      fetchUsersForUnit();
    } else {
      setUsers([]);
      setSelectedUserId("");
      setFormData((prev) => ({
        ...prev,
        user_id: "",
        owner_mobile_no: "",
      }));
    }
  }, [selectedTower, selectedFloorId, selectedUnit]);

  const fetchUsersForUnit = async () => {
    try {
      const response = await getSetupUsers();
      const allUsers = response.data || [];

      const filteredUsers = allUsers.filter((user) =>
        user.user_sites?.some(
          (site) =>
            site.build_id === Number(selectedTower) &&
            site.floor_id === Number(selectedFloorId) &&
            site.unit_id === Number(selectedUnit),
        ),
      );

      setUsers(filteredUsers);
    } catch {
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
      return setFormData({
        ...formData,
        owner_mobile_no: digits.slice(0, 10),
      });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handlePetImagesChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPetImages((prev) => [...prev, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setPetImagesPreview((prev) => [...prev, ...previews]);
    }
  };

  const removePetImage = (index) => {
    setPetImages((prev) => prev.filter((_, i) => i !== index));
    setPetImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pet_name || !formData.owner_mobile_no || !formData.pet_breed) {
      return toast.error("Please enter pet name, owner mobile number, and pet breed");
    }

    if (formData.owner_mobile_no.length !== 10) {
      return toast.error("Mobile number must be exactly 10 digits");
    }

    if (!selectedTower || !selectedFloorId || !selectedUnit) {
      return toast.error("Please select Tower, Floor & Unit");
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
      submitData.append(
        "pet[is_pet_transfered]",
        formData.is_pet_transfered ? "true" : "false",
      );
      submitData.append("pet[brought]", formData.brought ? "true" : "false");
      submitData.append(
        "pet[stray_pet_adopted]",
        formData.stray_pet_adopted ? "true" : "false",
      );
      submitData.append(
        "pet[whether_brought_from_current_city]",
        formData.whether_brought_from_current_city ? "true" : "false",
      );
      submitData.append(
        "pet[pet_born_to_owner_dog]",
        formData.pet_born_to_owner_dog ? "true" : "false",
      );

      // PROFILE IMAGE
      if (profileImage) {
        submitData.append("pet[pet_details][profile_image]", profileImage);
      }

      // MULTIPLE IMAGES
      petImages.forEach((img) => {
        submitData.append("pet[pet_details][pet_images][]", img);
      });

      await postPet(submitData);

      toast.success("Pet added successfully!");
      navigate("/setup/pets");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full p-6">
        <div>
          <h1 className="text-2xl font-bold mb-5 text-center bg-gray-900 py-2 rounded-lg text-white mx-2">
            Add Pet
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl border p-8"
        >
          {/* Profile Image */}
          <div className="flex flex-wrap items-start mb-6">
            <div className="w-full sm:w-[150px] text-center mb-6 sm:mb-0">
              <div className="w-[120px] h-[120px] bg-indigo-100 rounded-full mx-auto overflow-hidden border-4 border-indigo-400/50 shadow-md">
                <img
                  src={
                    profilePreview ||
                    "https://www.pngitem.com/pimgs/m/137-1370051_avatar-generic-avatar-hd-png-download.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                type="button"
                className="text-2xl mt-2 text-indigo-600"
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

            {/* Pet Fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 sm:ml-8">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="pet_name"
                  value={formData.pet_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pet Breed *
                </label>
                <input
                  type="text"
                  name="pet_breed"
                  value={formData.pet_breed}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
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

              <div>
                <label className="block text-sm font-medium mb-1">Colour</label>
                <input
                  type="text"
                  name="colour"
                  value={formData.colour}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="e.g., 1 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
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
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_pet_transfered"
                  checked={formData.is_pet_transfered}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_pet_transfered: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">
                  Is Pet Transferred
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="brought"
                  checked={formData.brought}
                  onChange={(e) =>
                    setFormData({ ...formData, brought: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Brought</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="stray_pet_adopted"
                  checked={formData.stray_pet_adopted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stray_pet_adopted: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Stray Pet Adopted</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="whether_brought_from_current_city"
                  checked={formData.whether_brought_from_current_city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whether_brought_from_current_city: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">
                  Brought from Current City
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pet_born_to_owner_dog"
                  checked={formData.pet_born_to_owner_dog}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pet_born_to_owner_dog: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">
                  Pet Born to Owner &apos;s Dog
                </label>
              </div>
            </div>
          </div>

          {/* Tower / Floor / Unit / User */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4 mt-6">
            <select
              value={selectedTower}
              onChange={async (e) => {
                const id = e.target.value;
                setSelectedTower(id);
                setSelectedFloorId("");
                setSelectedUnit("");
                setFloors([]);
                setUnits([]);
                if (id) {
                  const res = await getFloors(id);
                  setFloors(res.data || []);
                }
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Building</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedFloorId}
              onChange={async (e) => {
                const id = e.target.value;
                setSelectedFloorId(id);
                setSelectedUnit("");
                setUnits([]);
                if (id) {
                  const res = await getUnits(id);
                  setUnits(res.data || []);
                }
              }}
              disabled={!selectedTower}
              className="border p-2 rounded"
            >
              <option value="">Select Floor</option>
              {floors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              disabled={!selectedFloorId}
              className="border p-2 rounded"
            >
              <option value="">Select Unit</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <select
              value={selectedUserId}
              onChange={handleUserChange}
              disabled={users.length === 0}
              className="border p-2 rounded"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>
                <div>
                <label className="block text-sm font-medium mb-1">
                  Owner Mobile *
                </label>
                <input
                  type="text"
                  name="owner_mobile_no"
                  value={formData.owner_mobile_no}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  maxLength={10}
                />
              </div>
          </div>

          {/* Pet Images */}
          <div className="mt-6 border-t pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pet Attachment</h3>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePetImagesChange}
                className="w-full border p-2 rounded"
              />

              {petImagesPreview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {petImagesPreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt="pet"
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removePetImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/setup/pets")}
              className="bg-gray-200 px-6 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-700 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              {loading ? <DNA height={20} width={20} /> : "Create Pet"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddPets;
