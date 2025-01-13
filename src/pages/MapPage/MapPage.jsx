import React, { useState, useEffect } from 'react';
import './MapPage.scss';
import ComplaintService from '../../services/ComplaintService'; // Import the service
import Map from '../../components/Map/Map'; // Import the new Map component

function MapPage({ setLatitude, setLongitude }) {

  const [issues, setIssues] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issuesData = await ComplaintService.getAllComplaints(); // Llamamos al servicio
        setIssues(issuesData); // Establecemos las quejas obtenidas en el estado
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <>
      <article className="page">
        <div className="page__container">
          <section className="page__title-section">
            <h2>Explore the Map</h2>
          </section>
          <section className="page__component-section"> // {/*page__map-container*/}
            {/* Pass issues, setLatitude, and setLongitude as props */}
            <Map issues={issues} setLatitude={setLatitude} setLongitude={setLongitude} />
          </section>
        </div>
      </article>
    </>
  );
}

export default MapPage;
