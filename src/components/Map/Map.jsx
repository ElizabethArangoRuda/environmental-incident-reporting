import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.scss';

function Map({ issues = [], setLatitude, setLongitude, onMarkerChange }) {
  const mapReference = useRef(null); // Reference to the container where the map is rendered
  const mapInstance = useRef(null); // Reference to the Leaflet instance of the map
  //const markersReference = useRef([]); // Guardar los marcadores para limpiarlos en actualizaciones
  const selectedMarkerReference = useRef(null); // Referencia al marcador seleccionado por el usuario


  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize the map only if it is not yet initialized
      mapInstance.current = L.map(mapReference.current).setView([0, 0], 2); // Mapa centrado en [0, 0] y zoom 2

      // Añadir un tile layer de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors', // Información de derechos de autor
      }).addTo(mapInstance.current); // Añadir el tile layer al mapa

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
            marker.bindPopup('You are here!').openPopup(); // Display a popup with the message “You are here!”
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
        const marker = L.marker([issue.latitude, issue.longitude]).addTo(mapInstance.current); // Crear un marcador
        marker.bindPopup('Issue reported here.'); // Añadir un popup con el texto
        return marker; // Retornar el marcador para su posterior uso
      });

      // Adjust the map view to include all markers
      if (markers.length > 0) {
        const featureGroup = L.featureGroup(markers); // Grouping markers
        mapInstance.current.fitBounds(featureGroup.getBounds()); // Adjust the map so that all markers are visible
      }
    }
  }, [issues, setLatitude, setLongitude]); // The effect is executed when you change “issues”, “setLatitude” or “setLongitude”.

  /*useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.invalidateSize(); // Redibuja el mapa para adaptarse a los cambios en el tamaño
    }
  }, []); // Se ejecuta una vez cuando el componente se monta*/

  /*useEffect(() => {
    // Limpiar los marcadores anteriores
    markersReference.current.forEach((marker) => mapInstance.current.removeLayer(marker));
    markersReference.current = [];

    // Agregar marcadores nuevos
    if (issues.length > 0) {
      issues.forEach((issue) => {
        const marker = L.marker([issue.latitude, issue.longitude]).addTo(mapInstance.current);
        marker.bindPopup('Issue reported here.');
        markersRef.current.push(marker); // Guardar referencia del marcador
      });

      // Ajustar la vista para incluir todos los marcadores
      const group = L.featureGroup(markersRef.current);
      mapInstance.current.fitBounds(group.getBounds());
    }
  }, [issues]);*/

  useEffect(() => {
    // Manejar clics en el mapa
    if (mapInstance.current && onMarkerChange) {
      mapInstance.current.on('click', (event) => {
        // Manejar clics en el mapa para seleccionar una ubicación
        const { lat, lng } = event.latlng;

        // Eliminar marcador seleccionado anterior
        if (selectedMarkerReference.current) {
          mapInstance.current.removeLayer(selectedMarkerReference.current);
        }

        /*onMarkerChange(lat, lng);

        selectedMarkerReference.current = L.marker([lat, lng]).addTo(mapInstance.current).bindPopup('Selected position').openPopup();*/

        const newMarker = L.marker([lat, lng]).addTo(mapInstance.current).bindPopup('Selected position').openPopup();
        selectedMarkerReference.current = newMarker;

        // Comunicar las coordenadas seleccionadas al padre
        onMarkerChange(lat, lng);
      });
    }
  }, [/*setLatitude, setLongitude,*/ onMarkerChange]);

  //return <div id="map" ref={mapReference} style={{ height: '500px', width: '100%' }} />; // Render the map container
  return <div id="map" ref={mapReference} className="map-container" />;
}

export default Map;
