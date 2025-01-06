
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import ReportingPage from './pages/ReportingPage/ReportingPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/report" element={<ReportingPage />} />
          {/* Fallback Route */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
