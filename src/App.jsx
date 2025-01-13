import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import ReportingPage from './pages/ReportingPage/ReportingPage';
import { useState } from "react";

function App() {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  return (
    <>
      <BrowserRouter>
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage setLatitude={setLatitude} setLongitude={setLongitude}/>} />
              <Route path="/report" element={<ReportingPage setLatitude={setLatitude} setLongitude={setLongitude}/>} />
              {/* Fallback Route */}
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
          </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
