import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  domainPrefix,
  getFitoutRequest,
  getFitoutRequestById,
} from "../../api";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
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
} from "lucide-react";

const FitOutRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(null);
  const [formData, setFormData] = useState({
    status: "approved",
    comments: "",
  });

  const [fitOutData, setFitOutData] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await getFitoutRequestById(id);
        console.log("API Response:", res); // Debug log
        const requestData = res?.data || res;
        setRequest(requestData);
        setFitOutData(requestData);
        setCategories(requestData?.fitout_request_categories || []);
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
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

  const handleStatusUpdate = (categoryId) => {
    if (!formData.comments.trim()) {
      toast.error("Comments are required");
      return;
    }

    // Update the category status
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, status: formData.status, comments: formData.comments }
          : cat
      )
    );

    toast.success(`Category has been ${formData.status} successfully.`);
    setOpenDialog(null);
    setFormData({ status: "approved", comments: "" });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
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
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  categories[0]?.status || "pending"
                )}`}
              >
                <Clock className="h-4 w-4 mr-1" />
                {categories[0]?.status || "Pending"}
              </span>
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
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                category.status
                              )}`}
                            >
                              {category.status}
                            </span>
                            {category.status === "pending" && (
                              <button
                                onClick={() => setOpenDialog(category.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Update Status
                              </button>
                            )}
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
                    <span className="text-sm">ID: {fitOutData?.user?.id}</span>
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

        {/* Status Update Modal */}
        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Category Status
                </h3>
                <button
                  onClick={() => setOpenDialog(null)}
                  className="text-gray-400 hover:text-gray-600"
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
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="approved"
                        checked={formData.status === "approved"}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="mr-2"
                      />
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span>Approved</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="rejected"
                        checked={formData.status === "rejected"}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="mr-2"
                      />
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span>Rejected</span>
                    </label>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                    placeholder="Enter your comments..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setOpenDialog(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(openDialog)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitOutRequestDetails;
