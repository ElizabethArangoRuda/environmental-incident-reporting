import axios from "axios";
import { useEffect, useState } from "react";
import "./AddNewReport.scss";
import errorIcon from "../../assets/icons/error-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/world-map-svgrepo-com.svg";
import L from 'leaflet';
import MapPage from "../../pages/MapPage/MapPage";

let map = null; // Declare a variable to store the map instance

function AddNewReport({latitude, longitude}) {
  const navigate = useNavigate();
  const [markerCoord, setMarkerCoord] = useState(); 
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

  const url = "http://localhost:8080";

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

  // Function to toggle section visibility
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


  


  const handleSubmit = async (e, latitude, longitude) => {
    e.preventDefault();
  
    if (!validateForm()) return;



    
    setForm((prevForm) => ({
      ...prevForm,
      // media: files,
      latitude: latitude,
      longitude: longitude,
    }));

    console.log("Looking at the form:", form);
    console.log("Props Latitude:", latitude, "Props Longitude:", longitude);




      try {
        const response = await axios.post(`${url}/api/complaints/anonymous`, {
          ...form, 
          latitude: markerCoord.lat,
          longitude: markerCoord.lng,
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

    useEffect(() => {
      if (!map) {
        // Initialize the map centered at a default location
        map = L.map('map', {center:[0,0]});
  
        // Define the tile layers
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Issues',
        });
  
        // Add default layer (OSM)
        osmLayer.addTo(map);
        
        // Check if the browser supports Geolocation API
        if (navigator.geolocation) {
          // Get the user's current position
          navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Set the map view to the user's location
            map.setView([latitude, longitude], 13);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }

        let marker;

        map.on("click", function(event){
          if (marker){
            map.removeLayer(marker);
          }
          marker = new L.marker(event.latlng).addTo(map);
          setMarkerCoord(event.latlng);
        });

      }
    }, []);

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

          <div id="map" className="add-report__map"></div>

          <div className="add-report__actions-wrapper">
            <div className="add-report__actions">
              <button onClick={handleCancel} className="btn btn--cancel" type="button">
                Cancel
              </button>
              <button className="btn btn--submit" type="submit" onSubmit={handleSubmit}>
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

