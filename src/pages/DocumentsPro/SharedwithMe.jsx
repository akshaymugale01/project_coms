import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import {
  deleteFilePersonal,
  deleteFolderPersonal,
  deleteShareFile,
  deleteShareFolder,
  getFolderDocumentCommon,
  getFolderDocumentPersonal,
  getSetupUsers,
  getSharedwith,
  getSubFolderDocumentCommon,
  postFileDocumentCommon,
  postFolderDocumentPersonal,
  postSharePersonal,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  FaEllipsisV,
  FaFile,
  FaFolder,
  FaPlus,
  FaUpload,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Select from "react-select";

const SharedwithMe = () => {
  const userID = getItemInLocalStorage("UserId");
  const siteID = getItemInLocalStorage("SITEID");
  const themeColor = useSelector((state) => state.theme.color);
  const [assignedUser, setAssignedUser] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: "Home" }]); // Default breadcrumb starting at Root
  const [parentID, setParentID] = useState(null); // Dynamically update parent ID based on breadcrumbs
  const [folders, setFolders] = useState([]); // List of folders
  const [files, setFiles] = useState([]); // List of files

  const [menuOpen, setMenuOpen] = useState(null); // State to track which menu is open (null = none open)

  const handleMenuOpen = (id) => {
    setMenuOpen(menuOpen === id ? null : id); // Toggle menu visibility
  };
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState({
    folderID: null,
    fileID: null,
    username: "",
  });

  // Open share modal
  const handleShareClick = (id, type) => {
    setShareData({
      folderID: type === "folder" ? id : null,
      fileID: type === "file" ? id : null,
      username: "",
    });
    setIsShareModalOpen(true);
  };
  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getSetupUsers();

        // Assuming response.data is an array of user objects
        const formattedUsers = response.data.map((user) => ({
          value: user.id, // React Select uses "value" and "label"
          label: `${user.firstname} ${user.lastname}`, // User's full name
        }));

        setAssignedUser(formattedUsers);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAssignedTo();
  }, []);
  const handleSelectChange = (selectedOption) => {
    setShareData((prev) => ({
      ...prev,
      username: selectedOption?.value || "",
    }));
  };
  // Handle share submission
  const handleShareSubmit = async () => {
    try {
      const payload = {
        user_id: shareData.username, // Assuming userID is the sharer
        shared_by: userID,
        folder_id: shareData.folderID,
        document_id: shareData.fileID,
      };

      // if (shareData.username) {
      //   payload.shared_with_username = shareData.username;
      // }

      const response = await postSharePersonal(payload);
      setIsShareModalOpen(false);
      // if (response.data.success) {
      //   toast.success("Item shared successfully");
      //   setIsShareModalOpen(false);
      // } else {
      //   throw new Error(response.data.message || "Failed to share item");
      // }
    } catch (error) {
      console.error("Error sharing item:", error);
      toast.error("Failed to share item");
    }
  };

  const fetchFolderDocumentCommon = async () => {
    try {
      // Perform the API request using the predefined method
      const response = await getSharedwith();

      // Check if the response is successful
      if (response.data && response.data.success) {
        const documents = response.data.documents || [];

        // Extract shared folders and files
        const folders = [];
        const files = [];
        const shareIds = []; // Array to collect share IDs (id field)

        documents.forEach((doc) => {
          shareIds.push(doc.id); // Collect share_id from the `id` field

          if (doc.folder) {
            folders.push({
              id: doc.id, // Share ID
              folderId: doc.folder.id,
              name: doc.folder.name,
              parent_id: doc.folder.parent_id,
              type: "folder",
            });
          } else if (doc.document) {
            files.push({
              id: doc.id, // Share ID
              documentId: doc.document.id,
              name: doc.document.image_file_name,
              document_url: doc.document.document_url,
              type: "file",
            });
          }
        });

        return { folders, files, shareIds }; // Return shareIds along with folders and files
      } else {
        console.error("Failed to fetch data: Response was not successful");
        return { folders: [], files: [], shareIds: [] };
      }
    } catch (error) {
      console.error("Error fetching folder and document contents:", error);
      return { folders: [], files: [], shareIds: [] };
    }
  };

  useEffect(() => {
    fetchFolderDocumentCommon().then((data) => {
      setFolders(data.folders);
      setFiles(data.files);
    });
  }, []);

  // Delete folder or file
  const handleDelete = async (id) => {
    try {
      const response = await deleteShareFolder(id);

      // if (response.data.success) {
      toast.success(`Folder deleted successfully`);
      //   fetchFolderContents(parentID); // Refresh folder contents
      // } else {
      //   throw new Error(response.data.message || "Failed to delete item");
      // }
      if (parentID) {
        const response = await getSubFolderDocumentCommon(parentID);
        if (response.data.success) {
          const { folders, documents } = response.data;
          setFolders(
            folders.map((folder) => ({
              id: folder.id,
              name: folder.name,
              type: "folder",
            }))
          );
          setFiles(
            documents.map((file) => ({
              id: file.id,
              name: file.image_file_name,
              type: "file",
              document_url: file.document_url,
            }))
          );
        }
      } else {
        const data = await fetchFolderDocumentCommon();
        setFolders(data.folders);
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // toast.error("Failed to delete item");
    }
  };
  const handleDeleteFile = async (id) => {
    try {
      const response = await deleteShareFile(id);

      // if (response.data.success) {
      toast.success(`File deleted successfully`);
      //   fetchFolderContents(parentID); // Refresh folder contents
      // } else {
      //   throw new Error(response.data.message || "Failed to delete item");
      // }
      if (parentID) {
        const response = await getSubFolderDocumentCommon(parentID);
        if (response.data.success) {
          const { folders, documents } = response.data;
          setFolders(
            folders.map((folder) => ({
              id: folder.id,
              name: folder.name,
              type: "folder",
            }))
          );
          setFiles(
            documents.map((file) => ({
              id: file.id,
              name: file.image_file_name,
              type: "file",
              document_url: file.document_url,
            }))
          );
        }
      } else {
        const data = await fetchFolderDocumentCommon();
        setFolders(data.folders);
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // toast.error("Failed to delete item");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Navigate to a breadcrumb
  // Navigate to a breadcrumb
  const navigateToBreadcrumb = async (index) => {
    const selectedBreadcrumb = breadcrumbs[index];

    if (index === 0) {
      // If "Root" is clicked, reset breadcrumbs and fetch root-level contents
      setBreadcrumbs([{ id: null, name: "Home" }]);
      const data = await fetchFolderDocumentCommon();
      setFolders(data.folders);
      setFiles(data.files);
    } else {
      // For other breadcrumbs, set breadcrumbs up to the clicked one
      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
      const response = await getSubFolderDocumentCommon(selectedBreadcrumb.id);

      if (response.data.success) {
        const { folders, documents } = response.data;

        setFolders(
          folders.map((folder) => ({
            id: folder.id,
            name: folder.name,
            parent_id: folder.parent_id,
            structure: folder.structure,
            description: folder.description,
            date_of_upload: folder.date_of_upload,
            site_id: folder.site_id,
            uploaded_by: folder.uploaded_by,
            folder_type: folder.folder_type,
            unit_id: folder.unit_id,
            created_at: folder.created_at,
            updated_at: folder.updated_at,
            type: "folder",
          }))
        );

        setFiles(
          documents.map((file) => ({
            id: file.id,
            name: file.image_file_name,
            type: "file",
          }))
        );
      } else {
        toast.error("Failed to fetch folder contents");
      }
    }
  };

  // Open a folder and fetch its contents
  const openFolder = async (folder) => {
    try {
      // Update breadcrumbs to include the clicked folder
      setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
      setParentID(folder.id);
      // Fetch data for the selected folder
      const response = await getSubFolderDocumentCommon(folder.id);

      if (response.data.success) {
        const { folders: subFolders, documents: subFiles } = response.data;

        // Format and set the state for folders and files
        setFolders(
          subFolders.map((subFolder) => ({
            id: subFolder.id,
            name: subFolder.name,
            parent_id: subFolder.parent_id,
            structure: subFolder.structure,
            description: subFolder.description,
            date_of_upload: subFolder.date_of_upload,
            site_id: subFolder.site_id,
            uploaded_by: subFolder.uploaded_by,
            folder_type: subFolder.folder_type,
            unit_id: subFolder.unit_id,
            created_at: subFolder.created_at,
            updated_at: subFolder.updated_at,
            type: "folder",
          }))
        );

        setFiles(
          subFiles.map((file) => ({
            id: file.id,
            name: file.image_file_name,
            type: "file",
          }))
        );
      } else {
        throw new Error(
          response.data.message || "Failed to fetch folder contents"
        );
      }
    } catch (error) {
      console.error("Error opening folder:", error);
      toast.error("Failed to open folder");
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob(); // Convert the response to a blob
      const blobUrl = URL.createObjectURL(blob); // Create a temporary URL for the blob

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename || "file");
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  return (
    <div className="p-6  min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="flex  mb-2">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.id} className="flex items-center">
            <button
              onClick={() => navigateToBreadcrumb(index)}
              className="hover:underline text-base"
            >
              {crumb.name}
            </button>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </nav>

      {/* Folder and File List */}
      <div className="bg-white  rounded-lg   ">
        {/* <h2 className="text-lg font-semibold mb-4">Contents</h2> */}
        <div className="flex flex-col space-y-2">
          {folders.length === 0 && files.length === 0 && (
            <p>No folders and files found.</p>
          )}

          <p className="text-xl font-semibold  text-gray-700">Folders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="relative flex flex-col items-center p-4 bg-gray-100 rounded-lg cursor-pointer transition duration-200 hover:bg-gray-200"
              >
                <FaFolder className="text-4xl text-yellow-400 mb-2" />
                <button
                  onClick={() => openFolder(folder)}
                  className="text-sm font-medium text-gray-800 text-center"
                >
                  {folder.name}
                </button>
                {/* Three-dot menu */}
                <div className="absolute top-2 right-2">
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() =>
                      setMenuOpen(menuOpen === folder.id ? null : folder.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpen === folder.id && (
                    <div className="absolute bg-white shadow-md rounded-md p-2 right-0">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          handleShareClick(folder.folderId, "folder")
                        }
                      >
                        Share
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDelete(folder.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl font-semibold mb-4 text-gray-700">Files</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative flex flex-col items-center p-4 bg-gray-100 rounded-lg cursor-pointer transition duration-200 hover:bg-gray-200"
              >
                {file && file.document_url ? (
                  <a
                    href={`http://13.215.74.38/${file.document_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <FaFile className="text-4xl text-blue-400 mb-2" />
                    <p className="text-sm font-medium text-gray-800 text-center">
                      {file.name}
                    </p>
                  </a>
                ) : (
                  <span>Document URL not available</span>
                )}
                {/* Three-dot menu */}
                <div className="absolute top-2 right-2">
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() =>
                      setMenuOpen(menuOpen === file.id ? null : file.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpen === file.id && (
                    <div className="absolute bg-white shadow-md rounded-md p-2 right-0">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          handleShareClick(file.documentId, "file")
                        }
                      >
                        Share
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          handleDownload(
                            `https://app.myciti.life${file.document_url}`,
                            // `http://localhost:3002${file.document_url}`,
                            file.name
                          )
                        }
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96  rounded-lg shadow-lg p-4 relative">
            <h2 className="text-xl font-semibold mb-4">
              Share Folder and Files
            </h2>
            <Select
              options={assignedUser}
              value={assignedUser.find(
                (user) => user.value === shareData.username
              )}
              onChange={handleSelectChange}
              placeholder="Select User"
              isSearchable
              className="w-full p-2 mb-4  rounded-md"
              classNamePrefix="react-select"
            />
            <button
              onClick={handleShareSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              style={{ background: themeColor }}
            >
              Share
            </button>
            <button
              onClick={() => {
                setIsShareModalOpen(false); // Close the share modal
                setMenuOpen(null); // Close the menu
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
              style={{ background: themeColor }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedwithMe;
