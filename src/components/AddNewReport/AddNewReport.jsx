import axios from "axios";
import { useState } from "react";
import "./AddNewReport.scss";
import errorIcon from "../../assets/icons/error-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/world-map-svgrepo-com.svg";

function AddNewReport() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    description: "",
    category: "",
    media: [], // To store the files selected
  });
  const [errors, setErrors] = useState({});
  const [openSections, setOpenSections] = useState({
    address: false,
    description: false,
    category: false,
    contact_name: false,
    contact_phone: false,
    contact_email: false,
    media: false,
  }); // Track which sections are open

  const url = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array
    setForm((prevForm) => ({
      ...prevForm,
      media: files,
    }));
  };

  const toggleSection = (section) => {
    setOpenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.address) newErrors.address = "Address is required.";
    if (!form.description) newErrors.description = "Description is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (form.contact_phone && !/^\+\d{1,3}\s?\(\d{1,3}\)\s?\d{3}-\d{4}$/.test(form.contact_phone)) {
      newErrors.contact_phone = "Invalid phone number format. Use +1 (212) 555-6789.";
    }
    if (form.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) {
      newErrors.contact_email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    async function createReport(latitude, longitude) {
      try {
        const formData = new FormData();
  
        // Append form fields
        Object.keys(form).forEach((key) => {
          if (key !== 'media') formData.append(key, form[key]);
        });
  
        // Append media files
        form.media.forEach((file) => {
          formData.append('media', file);
        });
  
        // Append geolocation data
        if (latitude && longitude) {
          formData.append('latitude', latitude);
          formData.append('longitude', longitude);
        }
  
        const response = await axios.post(`${url}/api/reports`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setForm({
          address: "",
          contact_name: "",
          contact_phone: "",
          contact_email: "",
          description: "",
          category: "",
          media: [],
        });
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error creating report:", error);
      }
    }
  
    // Request geolocation data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          createReport(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Proceed without geolocation if not available or denied
          createReport();
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Proceed without geolocation
      createReport();
    }
  };

  const handleCancel = () => {
    setForm({
      address: "",
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      description: "",
      category: "",
      media: [],
    });
    setErrors({});
  };

  return (
    <div className="add-report">
      <div className="add-report__header">
        <h1 className="add-report__header-name">
          <Link className="add-report__header-back" to="/map">
            <img src={backArrow} alt="Back" />
          </Link>
          Report Environmental Issue
        </h1>
      </div>
      <div className="add-report__wrapper">
        <form className="add-report__form" onSubmit={handleSubmit}>
          <div className="add-report__fields-wrapper">
            <div className="add-report__details-wrapper">
              <h2 className="add-report__form-header">Environmental Issue Details</h2>

              {/* Address Section */}
              <div className="add-report__container">
                <button 
                type="button" className="add-report__button" onClick={() => toggleSection("address")}>
                  Address
                </button>
                {openSections.address && (
                  <div>
                    <input
                      className={`add-report__input ${errors.address ? "add-report__input--error" : ""}`}
                      name="address"
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="error-message">
                        <img className="error-icon" src={errorIcon} alt="Error" />
                        {errors.address}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="add-report__container">
                <button type="button" className="add-report__button" onClick={() => toggleSection("description")}>
                  Description of the Problem
                </button>
                {openSections.description && (
                  <div>
                    <textarea
                      className={`add-report__textarea ${errors.description ? "add-report__input--error" : ""}`}
                      name="description"
                      placeholder="Describe the problem"
                      value={form.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <p className="error-message">
                        <img className="error-icon" src={errorIcon} alt="Error" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Category Section */}
              <div className="add-report__container">
                <button type="button" className="add-report__button" onClick={() => toggleSection("category")}>
                  Category
                </button>
                {openSections.category && (
                  <div>
                    <select
                      className={`add-report__select ${errors.category ? "add-report__input--error" : ""}`}
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Air Pollution">Air Pollution</option>
                      <option value="Water Pollution">Water Pollution</option>
                      <option value="Waste Management">Waste Management</option>
                      <option value="Deforestation">Deforestation</option>
                      <option value="Biodiversity Loss">Biodiversity Loss</option>
                    </select>
                    {errors.category && (
                      <p className="error-message">
                        <img className="error-icon" src={errorIcon} alt="Error" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="add-report__contact-wrapper">
              <h2 className="add-report__form-header">Contact Details (Optional)</h2>

              {/* Contact Name Section */}
              <div className="add-report__container">
                <button type="button" className="add-report__button" onClick={() => toggleSection("contact_name")}>
                  Contact Name
                </button>
                {openSections.contact_name && (
                  <div>
                    <input
                      className={`add-report__input ${errors.contact_name ? "add-report__input--error" : ""}`}
                      name="contact_name"
                      type="text"
                      placeholder="Contact Name"
                      value={form.contact_name}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {/* Contact Phone Section */}
              <div className="add-report__container">
                <button type="button" className="add-report__button" onClick={() => toggleSection("contact_phone")}>
                  Phone Number
                </button>
                {openSections.contact_phone && (
                  <div>
                    <input
                      className={`add-report__input ${errors.contact_phone ? "add-report__input--error" : ""}`}
                      name="contact_phone"
                      type="text"
                      placeholder="Phone Number"
                      value={form.contact_phone}
                      onChange={handleChange}
                    />
                    {errors.contact_phone && (
                      <p className="error-message">
                        <img className="error-icon" src={errorIcon} alt="Error" />
                        {errors.contact_phone}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Email Section */}
              <div className="add-report__container">
                <button type="button" className="add-report__button" onClick={() => toggleSection("contact_email")}>
                  Email
                </button>
                {openSections.contact_email && (
                  <div>
                    <input
                      className={`add-report__input ${errors.contact_email ? "add-report__input--error" : ""}`}
                      name="contact_email"
                      type="text"
                      placeholder="Email"
                      value={form.contact_email}
                      onChange={handleChange}
                    />
                    {errors.contact_email && (
                      <p className="error-message">
                        <img className="error-icon" src={errorIcon} alt="Error" />
                        {errors.contact_email}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="add-report__media-section">
            <button
              type="button"
              onClick={() => toggleSection("media")}
              className="add-report__add-media-btn"
            >
              {openSections.media ? "Close Media Section" : "Add Media"}
            </button>

            {openSections.media && (
              <div className="add-report__media-options">
                <label className="add-report__label">Upload Media</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          <div className="add-report__actions-wrapper">
            <div className="add-report__actions">
              <button onClick={handleCancel} className="btn btn--cancel" type="button">
                Cancel
              </button>
              <button className="btn btn--submit" type="submit">
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewReport;

