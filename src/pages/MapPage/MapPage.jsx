import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

let map = null; // Declare a variable to store the map instance

function MapPage({ issueLocation }) {
  useEffect(() => {
    if (!map) {
      // Initialize the map centered at a default location
      map = L.map('map').setView([0, 0], 2); // Center at [0, 0] with zoom level 2

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Check if the browser supports Geolocation API
      if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Set the map view to the user's location
            map.setView([latitude, longitude], 13);

            // Add a marker at the user's location
            const marker = L.marker([latitude, longitude]).addTo(map);
            marker.bindPopup('You are here!').openPopup();
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    // Add a marker for the issue location if it exists
    if (issueLocation && issueLocation.lat && issueLocation.lng) {
      const issueMarker = L.marker([issueLocation.lat, issueLocation.lng]).addTo(map);
      issueMarker.bindPopup('Issue reported here.').openPopup();
    }
  }, [issueLocation]); // Re-run when issueLocation changes


  return (
    <article className="map">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="map__layout">
        {/* Search Section */}
        <section className="map__search">
          <h2>Explore the Map</h2>
        </section>

        {/* Map Section */}
        <section className="map__map">
          <div id="map" className="map__container"></div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </article>
  );
}

export default MapPage;