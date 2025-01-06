import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

let map = null; // Declare a variable to store the map instance

function MapPage() {
  useEffect(() => {
    if (!map) { // Check if the map is already initialized
      // Initialize the map centered at a default location
      map = L.map('map').setView([0, 0], 2); // Center at [0, 0] with zoom level 2

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    }
  }, []); // Empty dependency array ensures this runs only once

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