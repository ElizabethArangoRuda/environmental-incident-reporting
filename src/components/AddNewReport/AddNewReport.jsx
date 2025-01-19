import React, { useState } from 'react';
import "./AddNewReport.scss";
import errorIcon from "../../assets/icons/error-24px.svg";
import ComplaintService from '../../services/ComplaintService'; // Import the service
import Map from '../Map/Map'; // Import the new Map component

function AddNewReport() {

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleMarkerChange = (lat, lng) => {
    setForm((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    console.log("Selected coordinates:", { lat, lng });
  };

  // Status to manage which accordion is open
  const [openSections, setOpenSections] = useState({
    report_environmental_issue: false,
    contact_information_optional: false,
    media_files: false,
  });

  // Function for toggling the visibility of an accordion
  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Status to handle form data
  const [form, setForm] = useState({
    address: '',
    description: '',
    category: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    media_files: [],
    latitude: 0,
    longitude: 0,
  });

  const [errors, setErrors] = useState({});

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle file change
  const handleFileChange = (e) => {
    const { files } = e.target;
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = Array.from(files).filter((file) => file.size <= maxSize);
    console.log("Valid Files", validFiles);
    setForm((prev) => ({
      ...prev,
      media_files: validFiles,
    }));
    if (files.length !== validFiles.length) {
      setMessage("Some files are too large and were not added.");
      setIsError(true);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fill in all requiered fields.");
      setIsError(true);
      return;
    }

    try {
      const response = await ComplaintService.createComplaint(form);
      console.log('Complaint submitted successfully:', response);
      setMessage("Complaint submitted successfully!");
      setIsError(false);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setMessage("Failed to submit complaint.");
      setIsError(true);
    }
    console.log("Form Submitted:", form);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.address) newErrors.address = "Address is required.";
    if (!form.description) newErrors.description = "Description is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.latitude || !form.longitude) {
      newErrors.coordinates = "Please select a location on the map.";
    }
    if (form.contact_phone && !/^\+\d{1,3}\s?\(\d{1,3}\)\s?\d{3}-\d{4}$/.test(form.contact_phone)) {
      newErrors.contact_phone = "Invalid phone number format. Use +1 (212) 555-6789.";
    }
    if (form.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) {
      newErrors.contact_email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="add-report">
      <div className="add-report__wrapper">
        <form className="add-report__form" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Direction Accordion */}
          <div className="add-report__container">
            <button
              type="button"
              onClick={() => toggleSection("report_environmental_issue")}
              className="add-report__button"
            >
              Report Environmental Issue
            </button>
            {openSections.report_environmental_issue && (
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
                </div>
              </div>
            )}
          </div>

          {/* Accordion Contact Information */}
          <div className="add-report__container">
            <button
              type="button"
              onClick={() => toggleSection("contact_information_optional")}
              className="add-report__button"
            >
              Contact Information (Optional)
            </button>
            {openSections.contact_information_optional && (
              <div>
                <input
                  className={`add-report__input ${errors.contact_name ? "add-report__input--error" : ""}`}
                  name="contact_name"
                  type="text"
                  placeholder="Contact Name"
                  value={form.contact_name}
                  onChange={handleChange}
                />
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
                </div>
              </div>
            )}
          </div>

          {/* Accordion for media */}
          <div className="add-report__media-section">
            <button
              type="button"
              onClick={() => toggleSection("media_files")}
              className="add-report__add-media-btn"
            >
              {openSections.media_files ? "Close Media Section" : "Add Media"}
            </button>
            {openSections.media_files && (
              <div className="add-report__media-options">
                <label className="add-report__label">Upload Media</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  name="media_files" // This name must be the same as the name expected by the api endpoint.
                  onChange={handleFileChange}
                />

                {/* Files preview */}
                {form.media_files && form.media_files.length > 0 && (
                  <div className="add-report__media-preview">
                    <h3>Selected Files:</h3>
                    <ul>
                      {Array.from(form.media_files).map((file, index) => (
                        <li key={index}>
                          <span>{file.name}</span>
                          {/* Images preview */}
                          {file.type.startsWith("image/") && (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="add-report__media-preview-item"
                            />
                          )}
                          {/* Videos preview */}
                          {file.type.startsWith("video/") && (
                            <video
                              src={URL.createObjectURL(file)}
                              controls
                              className="add-report__media-preview-item"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* File's validation */}
                {errors.media && (
                  <p className="error-message">
                    <img className="error-icon" src={errorIcon} alt="Error" />
                    {errors.media}
                  </p>
                )}

              </div>
            )}
          </div>

          <Map
            onMarkerChange={handleMarkerChange}
          />
          {errors.coordinates && (
            <p className="error-message">
              <img className="error-icon" src={errorIcon} alt="Error" />
              {errors.coordinates}
            </p>
          )}

          {/* Show message only if it exists */}
          {message && (
            <div
              className={`message ${isError ? 'error' : 'success'}`}
            >
              {message}
            </div>
          )}

          <div className="add-report__actions-wrapper">
            <div className="add-report__actions">
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
