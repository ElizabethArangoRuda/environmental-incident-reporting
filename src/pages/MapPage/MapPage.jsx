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

      // Define the tile layers
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      });

      const osmHOTLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by the Humanitarian OpenStreetMap Team, under ODbL.',
      });

      const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
      });

      // Add default layer (OSM)
      osmLayer.addTo(map);

      // Define a baseMaps object for layer control
      const baseMaps = {
        "OpenStreetMap": osmLayer,
        "Humanitarian OSM (HOT)": osmHOTLayer,
        "CartoDB Light": cartoDBLayer,
      };

      // Create an overlay for cities (example data)
      const cities = [
        { name: 'London', lat: 51.5074, lng: -0.1278 },
        { name: 'New York', lat: 40.7128, lng: -74.0060 },
        { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      ];

      const citiesLayer = L.layerGroup(
        cities.map(city =>
          L.marker([city.lat, city.lng]).bindPopup(city.name)
        )
      );

      // Define an overlayMaps object for layers control
      const overlayMaps = {
        "Cities": citiesLayer,
      };

      // Add the layers control to the map
      L.control.layers(baseMaps, overlayMaps).addTo(map);

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

      // Add the cities layer to the map (this could be dynamic as well)
      citiesLayer.addTo(map);
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

