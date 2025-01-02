import React, { useState, useEffect } from 'react';
import './Gallery.scss';

// Import images manually
import img1 from '../../assets/images/biodiversityloss.jpg';
import img2 from '../../assets/images/deforestation.jpg';
import img3 from '../../assets/images/garbage.jpg';
import img4 from '../../assets/images/mining.jpg';
import img5 from '../../assets/images/water_pollution.jpg';

function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageList = [img1, img2, img3, img4, img5]; // Array of imported images

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length); // Change image every 3 seconds
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [imageList.length]);

    return (
        <div className="image-carousel">
            <img src={imageList[currentIndex]} alt={`carousel-img-${currentIndex}`} className="carousel-image" />
        </div>
    );
}

export default Gallery;