import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-slideshow-image/dist/styles.css";

const Slideshow = () => {
  const [error, setError] = useState(null);
  const [comapnies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    banner_type: "",
    banner_redirect: "",
    company_id: "",
    title: "",
    attachfile: [],
  });

  console.log("formData", formData);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          " https://panchshil-super.lockated.com/company_setups.json",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer kD8B8ZeWZQAd2nQ-70dcfLXgYHLQh-zjggvuuE_93BY",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response", response);
        setCompanies(response.data); // Assuming the API returns an object with a "banners" field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setError("Failed to fetch banners. Please try again later.");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleCompanyChange = (e) => {
    const formData = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      company_id: formData,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files; // This is a FileList object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: Array.from(files), // Convert FileList to an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data for the POST request
    try {
      const sendFormData = new FormData();
      sendFormData.append("banner[company_id]", formData.company_id || ""); // Default empty string if undefined
      sendFormData.append("banner[title]", formData.title || "");
      const response = await axios.post(
        "https://panchshil-super.lockated.com/banners.json",
        sendFormData
      );
      if(response.status === 201){
        toast.success("Event Created Successfully");
      }else {
        toast.error("Failed to create event. Please try again.");
      }
      
    } catch (error) {
      console.error("Error creating banner:", error);
      toast.error("Failed to create banner. Please try again.");
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="website-content overflow-auto">
          <div className="module-data-section container-fluid">
            <div className="card mt-3 pb-4 mx-4">
              <div className="card-header">
                <h3 className="card-title">New Banner</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Company</label>
                      <select
                        className="form-control form-select"
                        style={{ width: "100%" }}
                        value={formData.company_id}
                        onChange={handleCompanyChange}
                      >
                        <option value="">Select a Company</option>
                        {comapnies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        Banner
                        <span />  
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        name="attachfile"
                        placeholder="Default input"
                        onChange={(e) => handleFileChange(e, "attachfile")}
                        accept="image/*"
                        multiple // Allow multiple file uploads
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control form-select"
                        style={{ width: "100%" }}
                      >
                        <option selected="selected">Select Status</option>
                        <option>Active</option>
                        <option>In-Active</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        Title <span />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Default input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="purple-btn2 w-100"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;
