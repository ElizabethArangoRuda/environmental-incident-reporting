import { useState } from 'react';
import './HomePage.scss';
import Gallery from '../../components/Gallery/Gallery';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const navigate = useNavigate();
  const handleNavigateToMaps = () => navigate('/map');

  return (
    <article className="page">
      <div className="page__container">
        <section className="page__title-section">
          <h2>Environmental Incident Reporting App</h2>
        </section>
        <section className="page__componente-section">
          <Gallery />
        </section>

        {/* Navigate to Maps Button */}
        <section className="page__component-section">
          <button className="navigate-button" onClick={handleNavigateToMaps}>
            Explore Environmental Incidents on the Map
          </button>
        </section>

        {/* About Section */}
        <section className="page-home__about-section">
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
    </article>
  );
}

export default HomePage;