// import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import './App.scss'

function App() {
  return (
  <>
  <Header />
  <Gallery />
<section className="student-list">
    <div className="student">
        <div className="student__content">
            <img 
                className="student__image" 
                src="https://img.icons8.com/ios/100/000000/test-account.png" 
                alt="Test Student Account Image" />
        </div>
        <h4 className="student__title">Student Name</h4>
    </div>
    <div className="student">
        <div className="student__content">
            <img 
                className="student__image" 
                src="https://img.icons8.com/ios/100/000000/test-account.png" 
                alt="Test Student Account Image" />
        </div>
        <h4 className="student__title">Student Name</h4>
    </div>
    <div className="student">
        <div className="student__content">
            <img 
                className="student__image" 
                src="https://img.icons8.com/ios/100/000000/test-account.png" 
                alt="Test Student Account Image" />
        </div>
        <h4 className="student__title">Student Name</h4>
    </div>
</section>
<Footer />
</>
  )
}

export default App
