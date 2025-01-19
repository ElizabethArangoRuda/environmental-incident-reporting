import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.scss';

function Map({ issues = [], setLatitude, setLongitude, onMarkerChange }) {
  const mapReference = useRef(null); // Reference to the container where the map is rendered
  const mapInstance = useRef(null); // Reference to the Leaflet instance of the map
  const selectedMarkerReference = useRef(null); // Reference to the marker selected by the user

  const getCategoryIcon = (category) => {
    const iconColors = {
      "Air Pollution": "blue",
      "Water Pollution": "green",
      "Waste Management": "orange",
      "Deforestation": "red",
      "Biodiversity Loss": "violet",
      "Flood": "yellow",
      "Default": "grey",
    };

    const color = iconColors[category] || "grey"; // Default color if category is unknown

    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize the map only if it is not yet initialized
      mapInstance.current = L.map(mapReference.current).setView([0, 0], 2); // Mapa centrado en [0, 0] y zoom 2

      // Add an OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors', // Copyright information
      }).addTo(mapInstance.current); // Add the tile layer to the map

      // Verify if the browser supports the Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords; // Obtain coordinates

            // Adjust the map view to the obtained coordinates
            mapInstance.current.setView([latitude, longitude], 13);
            setLatitude(latitude); // Update the coordinates in the parent component's state
            setLongitude(longitude);

            // Add a marker at the user's current location
            const marker = L.marker([latitude, longitude]).addTo(mapInstance.current);
            marker.bindPopup(`
      <strong>Category:''</strong> ${'default'}<br>
      <strong>Description:</strong> ${issue.description}
    `).openPopup(); // Display a popup with the message “You are here!”
          },
          (error) => {
            console.error('Error getting location:', error); // Handling geolocation errors
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    // Add markers for issues
    if (issues && mapInstance.current) {
      const markers = issues.map((issue) => {
        const marker = L.marker([issue.latitude, issue.longitude], {
          icon: getCategoryIcon(issue.category),
        }).addTo(mapInstance.current); // Crear un marcador
        marker.bindPopup(`
      <strong>Category:</strong> ${issue.category}<br>
      <strong>Description:</strong> ${issue.description}
    `); // Add a popup with the text
        return marker; // Return the marker for later use
      });

      // Adjust the map view to include all markers
      if (markers.length > 0) {
        const featureGroup = L.featureGroup(markers); // Grouping markers
        mapInstance.current.fitBounds(featureGroup.getBounds()); // Adjust the map so that all markers are visible
      }
    }
  }, [issues, setLatitude, setLongitude]); // The effect is executed when you change “issues”, “setLatitude” or “setLongitude”.

  useEffect(() => {
    // Handle clicks on the map
    if (mapInstance.current && onMarkerChange) {
      mapInstance.current.on('click', (event) => {
        // Handle clicks on the map to select a location
        const { lat, lng } = event.latlng;

        // Delete previous selected marker
        if (selectedMarkerReference.current) {
          mapInstance.current.removeLayer(selectedMarkerReference.current);
        }

        const newMarker = L.marker([lat, lng]).addTo(mapInstance.current).bindPopup('Selected position').openPopup();
        selectedMarkerReference.current = newMarker;

        // Communicate the selected coordinates to the parent
        onMarkerChange(lat, lng);
      });
    }
  }, [onMarkerChange]);

  return <div id="map" ref={mapReference} className="map-container" />;
}

export default Map;

