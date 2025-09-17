import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  domainPrefix,
  getFitoutRequestById,
  updateStatusFitoutRequest,
  getSnagAnswer,
  getSnagAnswersByResource,
  getFitoutStatusSetup,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Edit,
  FileText,
  ImageIcon,
  Mail,
  MapPin,
  Package,
  Phone,
  Tag,
  User,
  XCircle,
  Clock,
  Send,
  Eye,
} from "lucide-react";
import ChecklistForm from "./ChecklistForm";
import SnagAnswerDetails from "./SnagAnswerDetails";

const FitOutRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fitoutStatuses, setFitoutStatuses] = useState([]);
  const [openDialog, setOpenDialog] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [answers, setAnswers] = useState("");
  const [formData, setFormData] = useState({
    status: "",
    comments: "",
  });
  const [checklistModal, setChecklistModal] = useState({
    open: false,
    categoryId: null,
    isViewMode: false, // New: Track if we're viewing or filling
    submittedData: null, // New: Store submitted answers
  });
  const [submissionStatus, setSubmissionStatus] = useState({}); // Track which categories have submissions

  const [fitOutData, setFitOutData] = useState([]);
  const [mainStatusDialog, setMainStatusDialog] = useState(false);
  const [mainStatusFormData, setMainStatusFormData] = useState({
    status: "",
    comments: "",
  });
  const [updatingMainStatus, setUpdatingMainStatus] = useState(false);

  const navigate = useNavigate();

  // Get user type and user id from local storage
  const userType = getItemInLocalStorage("USERTYPE");
  const userId = getItemInLocalStorage("UserId");

  // Function to check existing submissions for all categories
  const checkExistingSubmissions = async (categories) => {
    const newSubmissionStatus = {};

    for (const category of categories) {
      try {
        const response = await getSnagAnswer(category.id);
        if (response.data && response.data.length > 0) {
          newSubmissionStatus[category.id] = true;
          console.log(`Category ${category.id} has existing submission`);
        }
      } catch (error) {
        // If error (likely 404), it means no submission exists
        console.log(`No submission found for category ${category.id}`);
        newSubmissionStatus[category.id] = false;
      }
    }

    setSubmissionStatus(newSubmissionStatus);
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await getFitoutRequestById(id);
        console.log("API Response:", res); // Debug log
        const requestData = res?.data || res;
        setRequest(requestData);
        setFitOutData(requestData);
        const categoriesData = requestData?.fitout_request_categories || [];
        setCategories(categoriesData);

        // Check for existing submissions
        if (categoriesData.length > 0) {
          await checkExistingSubmissions(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();

    const fetchFitoutStatus = async () => {
      try {
        const resp = await getFitoutStatusSetup();
        console.log("Fitout statuses response:", resp.data);

        // Convert the response data to an array if it's an object
        const statusArray = Array.isArray(resp.data)
          ? resp.data
          : Object.values(resp.data || {});

        setFitoutStatuses(statusArray);

        // Set default status to the first status if available
        if (statusArray.length > 0) {
          setFormData((prev) => ({
            ...prev,
            status: statusArray[0].name || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching fitout statuses:", error);
        toast.error("Failed to load statuses");
      }
    };
    fetchFitoutStatus();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const handleMainStatusUpdate = async () => {
    if (!mainStatusFormData.comments.trim()) {
      toast.error("Comments are required");
      return;
    }

    setUpdatingMainStatus(true);
    try {
      // Prepare data for API call, include status_updated_by
      const updateData = {
        status: mainStatusFormData.status,
        comments: mainStatusFormData.comments,
        status_updated_by: userId,
      };

      // Call API to update main fitout request status
      await updateStatusFitoutRequest(fitOutData.id, updateData);

      // Update local state after successful API call
      setFitOutData(prev => ({
        ...prev,
        status: mainStatusFormData.status
      }));

      toast.success(`Fitout request has been ${mainStatusFormData.status} successfully.`);
      setMainStatusDialog(false);
      // Reset form data after successful update
      setMainStatusFormData({
        status: fitoutStatuses.length > 0 ? fitoutStatuses[0].name : "",
        comments: "",
      });
    } catch (error) {
      console.error("Error updating main status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdatingMainStatus(false);
    }
  };

  const handleStatusUpdate = async (categoryId) => {
    if (!formData.comments.trim()) {
      toast.error("Comments are required");
      return;
    }

    setUpdating(true);
    try {
      // Prepare data for API call, include updated_by_id
      const updateData = {
        category_id: categoryId,
        status: formData.status,
        comments: formData.comments,
        updated_by_id: userId,
      };

      // Call API to update status
      await updateStatusFitoutRequest(fitOutData.id, updateData);

      // Update local state after successful API call
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? { ...cat, status: formData.status, comments: formData.comments }
            : cat
        )
      );

      toast.success(`Category has been ${formData.status} successfully.`);
      setOpenDialog(null);
      // Reset form data after successful update
      setFormData({
        status: fitoutStatuses.length > 0 ? fitoutStatuses[0].name : "",
        comments: "",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const categoryTypeIds = categories.map((c) => c.category_type.id);
  console.log("All Category Type IDs:", categoryTypeIds);

  const handleOpenChecklistForm = (categoryTypeIds) => {
    const checklistId = getChecklistIdForCategory(categoryTypeIds);
    console.log(
      `Opening checklist form for category ${categoryTypeIds} with checklist ${checklistId}`
    );

    setChecklistModal({
      open: true,
      categoryId: categoryTypeIds,
      isViewMode: false,
      submittedData: null,
    });
  };

  const handleViewSubmission = async (categoryTypeId) => {
    try {
      setLoadingAnswers(true);
      const response = await getSnagAnswersByResource(categoryTypeId);
      const data = response.data || [];

      console.log("Fetched answers:", data);

      setAnswers(data);
      setChecklistModal({
        open: true,
        categoryId: categoryTypeId,
        isViewMode: true,
        submittedData: data,
      });
    } catch (error) {
      toast.error("Failed to load answers");
      console.error("View Submission Error:", error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleCloseChecklistForm = () => {
    setChecklistModal({
      open: false,
      categoryId: null,
      isViewMode: false,
      submittedData: null,
    });
  };

  // Function to check if a category has been submitted
  const hasSubmission = (categoryId) => {
    return submissionStatus[categoryId] || false;
  };

  // Function to mark a category as submitted
  const markAsSubmitted = (categoryId) => {
    setSubmissionStatus((prev) => ({
      ...prev,
      [categoryId]: true,
    }));
  };

  // Function to get checklist ID for a category
  // This can be enhanced based on category type or other logic
  const getChecklistIdForCategory = (categoryId) => {
    // Find the category to get its type or other properties
    const category = categories.find((cat) => cat.id === categoryId);

    // For now, using a default checklist ID
    // TODO: Map category to appropriate checklist based on business logic
    // Example: Different category types could use different checklists
    if (category) {
      // Future logic could use category.category_type.name or category.category_type_id
      // if (category.category_type?.name === "Electrical") return "3";
      // if (category.category_type?.name === "Plumbing") return "4";
    }

    return "2"; // Default checklist ID
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-2">Request not found</div>
          <div className="text-gray-400 text-sm">ID: {id}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/fitout/request/list")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Requests
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  FitOut Request #{fitOutData.id}
                </h1>
                <p className="text-gray-600">
                  Created on {formatDate(fitOutData.created_at)}
                </p>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      fitOutData.status  || "pending"
                    )}`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {fitOutData.status || "pending"}
                  </span>
                  {userType === "pms_admin" && (
                    <button
                      onClick={() => {
                        setMainStatusDialog(true);
                        setMainStatusFormData({
                          status: fitOutData.status || (fitoutStatuses.length > 0 ? fitoutStatuses[0].name : ""),
                          comments: fitOutData.comments || ""
                        });
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Fitout Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Details */}
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-4">
                  <h2 className="flex items-center text-xl font-semibold">
                    <Building2 className="h-6 w-6 mr-3" />
                    Location Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Building</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {fitOutData?.building?.name || ""}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Floor</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {fitOutData?.floor?.name || ""}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Unit</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {fitOutData?.unit?.name || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg p-4">
                  <h2 className="flex items-center text-xl font-semibold">
                    <FileText className="h-6 w-6 mr-3" />
                    Description
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {fitOutData?.description || ""}
                  </p>
                </div>
              </div>

              {/* Categories & Attachments */}
              {categories.length > 0 && (
                <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg p-4">
                    <h2 className="flex items-center text-xl font-semibold">
                      <Tag className="h-6 w-6 mr-3" />
                      Categories & Attachments
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Tag className="h-5 w-5 text-purple-600 mr-2" />
                              <span className="font-semibold text-gray-900">
                                {category.category_type?.name ||
                                  "Unknown Category"}
                              </span>
                              <div className="flex px-3 gap-2">
                                <button
                                  onClick={() =>
                                    handleOpenChecklistForm(
                                      category.category_type.id
                                    )
                                  }
                                  disabled={hasSubmission(
                                    category.category_type.id
                                  )}
                                  className={`px-3 py-1 rounded text-sm flex items-center ${
                                    hasSubmission(category.category_type.id)
                                      ? "bg-gray-400 text-white cursor-not-allowed"
                                      : "bg-green-500 text-white hover:bg-green-600"
                                  }`}
                                >
                                  <Send className="h-4 w-4 mr-1" />
                                  {hasSubmission(category.category_type.id)
                                    ? "Submitted"
                                    : "Open Form"}
                                </button>

                                {hasSubmission(category.category_type.id) && (
                                  <button
                                    onClick={() =>
                                      handleViewSubmission(
                                        category.category_type.id
                                      )
                                    }
                                    className="px-3 py-1 rounded text-sm flex items-center bg-blue-500 text-white hover:bg-blue-600"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Submission
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  category.status
                                )}`}
                              >
                                {category.status}
                              </span>
                              {/* Show Update Status button only for admin users */}
                              {userType === "pms_admin" && (
                                <button
                                  onClick={() => {
                                    setOpenDialog(category.id);
                                    // Pre-select the current status when opening the modal
                                    setFormData((prev) => ({
                                      ...prev,
                                      status:
                                        category.status ||
                                        (fitoutStatuses.length > 0
                                          ? fitoutStatuses[0].name
                                          : ""),
                                      comments: category.comments || "",
                                    }));
                                  }}
                                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Update Status
                                </button>
                              )}
                              {/* )} */}
                            </div>
                          </div>

                          {category.comments && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                Comments:
                              </p>
                              <p className="text-sm text-blue-800">
                                {category.comments}
                              </p>
                            </div>
                          )}

                          {category.attachfile && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
                              <div className="flex items-center mb-3">
                                <ImageIcon className="h-5 w-5 text-gray-600 mr-2" />
                                <span className="text-sm text-gray-600">
                                  Attachment #{category.attachfile.id}
                                </span>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-sm text-gray-600 mb-2">
                                  Document ID: {category.attachfile.id}
                                </p>
                                <a
                                  href={
                                    domainPrefix +
                                    category.attachfile.document_url
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View Document
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Information */}
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg p-4">
                  <h2 className="flex items-center text-xl font-semibold">
                    <User className="h-6 w-6 mr-3" />
                    Requester
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {fitOutData?.user?.firstname || ""}
                      {fitOutData?.user?.lastname || ""}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{fitOutData?.user?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        ID: {fitOutData?.user?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg p-4">
                  <h2 className="flex items-center text-xl font-semibold">
                    <Package className="h-6 w-6 mr-3" />
                    Vendor
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {fitOutData?.supplier?.vendor_name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {fitOutData?.supplier?.company_name}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {fitOutData?.supplier?.mobile}
                        </span>
                      </div>
                      {fitOutData?.supplier?.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {fitOutData?.supplier?.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur rounded-lg">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-t-lg p-4">
                  <h2 className="flex items-center text-xl font-semibold">
                    <Calendar className="h-6 w-6 mr-3" />
                    Timeline
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Selected Date
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDate(fitOutData?.selected_date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Created
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDate(fitOutData?.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last Updated
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDate(fitOutData?.updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Status Update Modal */}
          {mainStatusDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Update Fitout Request Status
                  </h3>
                  <button
                    onClick={() => {
                      setMainStatusDialog(false);
                      // Reset form data when closing modal
                      setMainStatusFormData({
                        status:
                          fitoutStatuses.length > 0
                            ? fitoutStatuses[0].name
                            : "",
                        comments: "",
                      });
                    }}
                    disabled={updatingMainStatus}
                    className={`${
                      updatingMainStatus
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {fitoutStatuses.map((status) => (
                        <label key={status.id} className="flex items-center">
                          <input
                            type="radio"
                            name="mainStatus"
                            value={status.name}
                            checked={mainStatusFormData.status === status.name}
                            onChange={(e) =>
                              setMainStatusFormData({ ...mainStatusFormData, status: e.target.value })
                            }
                            className="mr-2"
                          />
                          <div 
                            className="h-4 w-4 rounded mr-2" 
                            style={{ backgroundColor: status.color_code || '#666' }}
                          ></div>
                          <span>{status.name}</span>
                        </label>
                      ))}
                      
                      {/* Fallback if no statuses are loaded */}
                      {fitoutStatuses.length === 0 && (
                        <div className="text-gray-500 text-sm">
                          Loading statuses...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments
                    </label>
                    <textarea
                      value={mainStatusFormData.comments}
                      onChange={(e) =>
                        setMainStatusFormData({ ...mainStatusFormData, comments: e.target.value })
                      }
                      placeholder="Enter your comments..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setMainStatusDialog(false);
                        // Reset form data when canceling
                        setMainStatusFormData({
                          status:
                            fitoutStatuses.length > 0
                              ? fitoutStatuses[0].name
                              : "",
                          comments: "",
                        });
                      }}
                      disabled={updatingMainStatus}
                      className={`px-4 py-2 border border-gray-300 rounded-lg ${
                        updatingMainStatus
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleMainStatusUpdate}
                      disabled={updatingMainStatus}
                      className={`px-4 py-2 text-white rounded-lg flex items-center ${
                        updatingMainStatus
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {updatingMainStatus && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      )}
                      {updatingMainStatus ? "Updating..." : "Update Status"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Update Modal */}
          {openDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Update Category Status
                  </h3>
                  <button
                    onClick={() => {
                      setOpenDialog(null);
                      // Reset form data when closing modal
                      setFormData({
                        status:
                          fitoutStatuses.length > 0
                            ? fitoutStatuses[0].name
                            : "",
                        comments: "",
                      });
                    }}
                    disabled={updating}
                    className={`${
                      updating
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {fitoutStatuses.map((status) => (
                        <label key={status.id} className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={status.name}
                            checked={formData.status === status.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          <div
                            className="h-4 w-4 rounded mr-2"
                            style={{
                              backgroundColor: status.color_code || "#666",
                            }}
                          ></div>
                          <span>{status.name}</span>
                        </label>
                      ))}

                      {/* Fallback if no statuses are loaded */}
                      {fitoutStatuses.length === 0 && (
                        <div className="text-gray-500 text-sm">
                          Loading statuses...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments
                    </label>
                    <textarea
                      value={formData.comments}
                      onChange={(e) =>
                        setFormData({ ...formData, comments: e.target.value })
                      }
                      placeholder="Enter your comments..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setOpenDialog(null);
                        // Reset form data when canceling
                        setFormData({
                          status:
                            fitoutStatuses.length > 0
                              ? fitoutStatuses[0].name
                              : "",
                          comments: "",
                        });
                      }}
                      disabled={updating}
                      className={`px-4 py-2 border border-gray-300 rounded-lg ${
                        updating
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(openDialog)}
                      disabled={updating}
                      className={`px-4 py-2 text-white rounded-lg flex items-center ${
                        updating
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {updating && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      )}
                      {updating ? "Updating..." : "Update Status"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checklist Form Modal */}
          {checklistModal.open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {checklistModal.isViewMode
                      ? "View Submission"
                      : "Checklist Form"}{" "}
                    - Category ID: {checklistModal.categoryId}
                  </h3>
                  <button
                    onClick={handleCloseChecklistForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  {checklistModal.isViewMode ? (
                    <SnagAnswerDetails
                      resourceId={checklistModal.categoryId}
                      isModal={true}
                      checklistId={getChecklistIdForCategory(
                        checklistModal.categoryId
                      )}
                    />
                  ) : (
                    <ChecklistForm
                      resourceId={String(checklistModal.categoryId)}
                      onClose={handleCloseChecklistForm}
                      isModal={true}
                      checklistId={getChecklistIdForCategory(
                        checklistModal.categoryId
                      )}
                      isViewMode={checklistModal.isViewMode}
                      submittedData={checklistModal.submittedData}
                      onSubmissionComplete={() =>
                        markAsSubmitted(checklistModal.categoryId)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitOutRequestDetails;
