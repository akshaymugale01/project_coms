import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  serviceBookingService,
  serviceCategoryService,
  serviceSubcategoryService,
  unitConfigurationService,
} from "./additionalServices";
import Loading from "../../utils/Loading";
import OsrModal from "./OsrModal";
import Osr from "./Osr";
import { FaPlus } from "react-icons/fa";

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [unitConfigs, setUnitConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    subcategory: "",
    dateFrom: "",
    dateTo: "",
  });

  const applyFilters = useCallback(() => {
    let filtered = [...bookings];

    if (filters.status) {
      filtered = filtered.filter(
        (booking) => booking.status === filters.status
      );
    }

    if (filters.category) {
      const categorySubcategories = subcategories
        .filter((sub) => sub.service_category_id === parseInt(filters.category))
        .map((sub) => sub.id);
      filtered = filtered.filter((booking) =>
        categorySubcategories.includes(booking.service_subcategory_id)
      );
    }

    if (filters.subcategory) {
      filtered = filtered.filter(
        (booking) =>
          booking.service_subcategory_id === parseInt(filters.subcategory)
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (booking) =>
          new Date(booking.booking_date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (booking) => new Date(booking.booking_date) <= new Date(filters.dateTo)
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, filters, subcategories]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, subcategoriesRes, categoriesRes, unitConfigsRes] =
        await Promise.all([
          serviceBookingService.getAll(),
          serviceSubcategoryService.getAll(),
          serviceCategoryService.getAll(),
          unitConfigurationService.getAll(),
        ]);
      setBookings(bookingsRes.data);
      setSubcategories(subcategoriesRes.data);
      setCategories(categoriesRes.data);
      setUnitConfigs(unitConfigsRes.data);
      
      // Debug: Log booking data structure
      if (bookingsRes.data && bookingsRes.data.length > 0) {
        console.log("First booking data structure:", bookingsRes.data[0]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      if (newStatus === "cancelled") {
        await serviceBookingService.cancel(bookingId);
      } else if (newStatus === "completed") {
        await serviceBookingService.complete(bookingId);
      } else {
        await serviceBookingService.update(bookingId, { status: newStatus });
      }

      toast.success(`Booking ${newStatus} successfully`);
      loadData();
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      category: "",
      subcategory: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCreateBooking = () => {
    navigate('/service-booking');
  };

  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((s) => s.id === subcategoryId);
    return subcategory ? subcategory.name : "Unknown";
  };

  const getCategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((s) => s.id === subcategoryId);
    if (!subcategory) return "Unknown";
    const category = categories.find(
      (c) => c.id === subcategory.service_category_id
    );
    return category ? category.name : "Unknown";
  };

  const getUnitConfigName = (unitConfigId) => {
    const unitConfig = unitConfigs.find((u) => u.id === unitConfigId);
    return unitConfig ? unitConfig.name : "Unknown";
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-pending";
      case "confirmed":
        return "badge-confirmed";
      case "completed":
        return "badge-completed";
      case "cancelled":
        return "badge-cancelled";
      default:
        return "badge-pending";
    }
  };

  const getAvailableSubcategories = () => {
    if (!filters.category) return subcategories;
    return subcategories.filter(
      (sub) => sub.service_category_id === parseInt(filters.category)
    );
  };

//   if (loading) {
//     return <Loading message="Loading bookings..." />;
//   }

  return (
    <div className="flex h-screen">
      <Osr />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h1>All Service Bookings</h1>
          <button
            onClick={handleCreateBooking}
            className="btn btn-primary flex items-center gap-2"
            style={{ 
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            <FaPlus size={16} />
            Book Service
          </button>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: "20px" }}>
          <h3>Filters</h3>
          <div className="grid grid-3">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="form-control"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-control"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subcategory</label>
              <select
                name="subcategory"
                value={filters.subcategory}
                onChange={handleFilterChange}
                className="form-control"
              >
                <option value="">All Subcategories</option>
                {getAvailableSubcategories().map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date From</label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date To</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div
              className="form-group"
              style={{ display: "flex", alignItems: "end" }}
            >
              <button className="btn btn-secondary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div style={{ marginBottom: "20px" }}>
          <p>
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>

        {/* Bookings Table */}
        {filteredBookings.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Unit Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>{booking.user_id}</td>
                  <td>{getCategoryName(booking.service_subcategory_id)}</td>
                  <td>{getSubcategoryName(booking.service_subcategory_id)}</td>
                  <td>
                    {new Date(booking.booking_date).toLocaleDateString()}
                    {booking.service_slot && (
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {booking.service_slot.start_time} -{" "}
                        {booking.service_slot.end_time}
                      </div>
                    )}
                  </td>
                  <td>{getUnitConfigName(booking.unit_configuration_id)}</td>
                  <td>₹{booking.total_amount || booking.price || 0}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => viewBookingDetails(booking)}
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    >
                      View
                    </button>

                    {booking.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "confirmed")
                          }
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "cancelled")
                          }
                          style={{ marginBottom: "5px" }}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {booking.status === "confirmed" && (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          handleStatusUpdate(booking.id, "completed")
                        }
                        style={{ marginBottom: "5px" }}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found matching the current filters.</p>
        )}

        {/* Booking Details Modal */}
        <OsrModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Booking #${selectedBooking?.id} Details`}
        >
          {selectedBooking && (
            <div>
              <div className="grid grid-2">
                <div>
                  <h4>Booking Information</h4>
                  <p>
                    <strong>ID:</strong> #{selectedBooking.id}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`badge ${getStatusBadgeClass(
                        selectedBooking.status
                      )}`}
                      style={{ marginLeft: "10px" }}
                    >
                      {selectedBooking.status}
                    </span>
                  </p>
                  <p>
                    <strong>User ID:</strong> {selectedBooking.user_id}
                  </p>
                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(selectedBooking.booking_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(selectedBooking.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4>Service Information</h4>
                  <p>
                    <strong>Category:</strong>{" "}
                    {getCategoryName(selectedBooking.service_subcategory_id)}
                  </p>
                  <p>
                    <strong>Service:</strong>{" "}
                    {getSubcategoryName(selectedBooking.service_subcategory_id)}
                  </p>
                  <p>
                    <strong>Unit Type:</strong>{" "}
                    {getUnitConfigName(selectedBooking.unit_configuration_id)}
                  </p>
                  {selectedBooking.service_slot && (
                    <p>
                      <strong>Time Slot:</strong>{" "}
                      {selectedBooking.service_slot.start_time} -{" "}
                      {selectedBooking.service_slot.end_time}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4>Pricing</h4>
                <p>
                  <strong>Total Price:</strong> ₹{selectedBooking.total_amount || selectedBooking.price || 0}
                </p>
              </div>

              {selectedBooking.special_instructions && (
                <div style={{ marginTop: "20px" }}>
                  <h4>Special Instructions</h4>
                  <p>{selectedBooking.special_instructions}</p>
                </div>
              )}

              {selectedBooking.rating && (
                <div style={{ marginTop: "20px" }}>
                  <h4>Rating & Review</h4>
                  <p>
                    <strong>Rating:</strong> {selectedBooking.rating}/5
                  </p>
                  {selectedBooking.review && (
                    <p>
                      <strong>Review:</strong> {selectedBooking.review}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </OsrModal>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
