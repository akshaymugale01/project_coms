import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Table from "../../components/table/Table";
import { getGoods } from "../../api";
import { dateFormat, formatTime } from "../../utils/dateUtils";
const InwardsTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [goodsIn, setGoodsIn] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  
  // Full filtered dataset for pagination calculation
  const [fullFilteredData, setFullFilteredData] = useState([]);
  
  // Function to get paginated data
  const getPaginatedData = (data, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  // Pagination helper functions
  const handlePerPageChange = (newPerPage) => {
    console.log(`Changing per page to ${newPerPage}`);
    setPerPage(newPerPage);
    setCurrentPage(1);
    
    // Use current search state for pagination
    let dataToUse = searchText.trim() === "" ? goodsIn : 
      goodsIn.filter((item) =>
        (item.person_name && 
         item.person_name.name &&
         item.person_name.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.vehicle_no &&
         item.vehicle_no.toLowerCase().includes(searchText.toLowerCase()))
      );
    
    setFullFilteredData(dataToUse);
    const pageData = getPaginatedData(dataToUse, 1, newPerPage);
    setFilteredData(pageData);
  };

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const pageData = getPaginatedData(fullFilteredData, page, perPage);
    setFilteredData(pageData);
  };

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const goodsRes = await getGoods();
        const filterGoodsIn = goodsRes.data.filter(
          (good) => good.ward_type === "in"
        );

        setGoodsIn(filterGoodsIn);
        
        // Set pagination data
        setFullFilteredData(filterGoodsIn);
        setTotalRows(filterGoodsIn.length);
        const pageData = getPaginatedData(filterGoodsIn, currentPage, perPage);
        setFilteredData(pageData);
        
        console.log(`Inwards: showing ${pageData.length} items out of ${filterGoodsIn.length} total`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoods();
  }, [currentPage, perPage]);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/inwards-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/passes/edit/goods-in-out/${row.id}`}>
          <BiEdit size={17} />
        </Link>
        </div>
      ),
    },

    {
      name: "Type",
      selector: (row) => (row.ward_type === "in" ? "Inward" : "Outward"),
      sortable: true,
    },

    {
      name: "Person Name",
      selector: (row) => row.person_name?.name,
      sortable: true,
    },

    {
      name: "Vehicle Number",
      selector: (row) => row.vehicle_no,
      sortable: true,
    },
    {
      name: "Goods In Time",
      selector: (row) => formatTime(row.goods_in_time),
      sortable: true,
    },

    {
      name: "Goods out Time",
      selector: (row) => formatTime(row.goods_out_time),
      sortable: true,
    },
    {
      name: "Created on",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
  ];
  console.log(goodsIn);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    setCurrentPage(1); // Reset to first page when searching
    
    let filteredResults;
    if (searchValue.trim() === "") {
      filteredResults = goodsIn;
    } else {
      filteredResults = goodsIn.filter(
        (item) =>
          (item.person_name && 
           item.person_name.name &&
           item.person_name.name.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.vehicle_no &&
           item.vehicle_no.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
    
    // Update full filtered data and pagination
    setFullFilteredData(filteredResults);
    setTotalRows(filteredResults.length);
    const pageData = getPaginatedData(filteredResults, 1, perPage);
    setFilteredData(pageData);
    
    console.log(`Search: filtered to ${filteredResults.length} items, showing ${pageData.length} on page 1`);
  };
  return (
    <section className="flex">
      <div className=" w-full flex mx-3 flex-col overflow-hidden mb-10">
        <div className="flex md:flex-row flex-col gap-5 justify-between my-2">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            id=""
            className="border-gray-300 border rounded-md p-2 w-full placeholder:text-sm"
            placeholder="Search by name, vehicle number"
          />
          <Link
            to={"/admin/passes/add-goods-in-out"}
            className="p-1 font-medium px-4 text-white rounded-md flex items-center gap-2"
            style={{ background: "rgb(3 19 37)" }}
          >
            {" "}
            <PiPlusCircle /> Add
          </Link>
        </div>
        <Table
          columns={columns}
          data={filteredData}
          // customStyles={customStyle}
          isPagination={true}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangePage={handlePageChange}
          paginationPerPage={perPage}
          onChangeRowsPerPage={handlePerPageChange}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </section>
  );
};

export default InwardsTable;
