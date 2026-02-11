import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { getPets, deletePet } from "../../api";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { DNA } from "react-loader-spinner";
import toast from "react-hot-toast";

const ViewPets = () => {
  const [pets, setPets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async (page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const response = await getPets(page, perPage);
      const data = response.data || [];
      setPets(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(pets);
    } else {
      const searchWords = searchValue.toLowerCase().split(" ").filter(Boolean);
      const filteredResults = pets.filter((item) => {
        const searchable = [
          item.pet_name,
          item.pet_breed,
          item.owner_mobile_no,
          item.gender,
          item.colour,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchWords.every((word) => searchable.includes(word));
      });
      setFilteredData(filteredResults);
    }
  };



  const petsColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/setup/pets-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/setup/pets-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
       {
  name: "Profile Image",
  cell: (row) => {
    const profileDoc = row.documents?.find(
      (doc) => doc.relation === "PetProfile"
    );

    const imageUrl = profileDoc
      ? `https://app.myciti.life${profileDoc.document}`
      : null;

    return imageUrl ? (
      <img
        src={imageUrl}
        alt={row.pet_name}
        className="w-10 h-10 rounded-full object-cover"
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    );
  },
},
    {
      name: "Pet Name",
      selector: (row) => row.pet_name || "N/A",
      sortable: true,
    },
    {
      name: "Breed",
      selector: (row) => row.pet_breed || "N/A",
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender || "N/A",
      sortable: true,
    },
    {
      name: "Colour",
      selector: (row) => row.colour || "N/A",
      sortable: true,
    },
    {
      name: "Owner Mobile",
      selector: (row) => row.owner_mobile_no || "N/A",
      sortable: true,
    }
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col gap-4 overflow-hidden mb-5">
        <h1 className="text-2xl font-bold mt-5">Pets Management</h1>
        
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
          <input
            type="text"
            placeholder="Search by pet name, breed, mobile, gender, or colour"
            className="p-2 w-full border border-gray-300 rounded-md placeholder:text-sm outline-none"
            value={searchText}
            onChange={handleSearch}
          />
          <Link
            to="/setup/pets-add"
            style={{ background: "rgb(19 27 32)" }}
            className="font-semibold p-2 px-4 rounded-md text-white flex items-center gap-2 whitespace-nowrap"
          >
            <PiPlusCircle size={20} /> Add Pet
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <Table columns={petsColumn} data={filteredData} />
        )}
      </div>
    </section>
  );
};

export default ViewPets;
