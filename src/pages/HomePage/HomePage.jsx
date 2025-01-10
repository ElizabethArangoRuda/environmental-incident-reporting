import { useState } from 'react';
import './HomePage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Gallery from '../../components/Gallery/Gallery';

function HomePage () {
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  // Navigate to the Maps page
  const handleNavigateToMaps = () => {
    window.location.href = '/map'; // Update the path as per your routing setup
  };

  return (
    <article className="home">
      {/* Header Component */}
      <Header
        isFilterPanelVisible={isFilterPanelVisible}
        setIsFilterPanelVisible={setIsFilterPanelVisible}
      />

      {/* Main Layout */}
      <div className="home__layout">
        {/* Environmental Issues Photo Gallery */}
        <section className="home__gallery">
          <h2>Environmental Incident Reporting App</h2>
          <Gallery />
        </section>

        {/* Navigate to Maps Button */}
        <section className="home__navigate">
          <button className="navigate-button" onClick={handleNavigateToMaps}>
            Explore Environmental Incidents on the Map
          </button>
        </section>

        {/* About Section */}
        <section className="home__about">
          <h2>About the Project</h2>
          <p>
            The Environmental Incident Reporting App is designed to raise
            awareness and empower communities to report and address environmental
            issues in Colombia. Our interactive platform allows users to visualize
            real-time data, report incidents, and contribute to environmental
            protection efforts.
          </p>
        </section>
      </div>

      {/* Footer Component */}
      <Footer />
    </article>
  );
}

export default HomePage;