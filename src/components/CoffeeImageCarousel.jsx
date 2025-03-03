import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CoffeeImageCarousel = () => {
  // State to store our coffee images
  const [coffeeImages, setCoffeeImages] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track any errors
  const [error, setError] = useState(null);
  // State to track the active slide index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Function to fetch a new random coffee image
  const fetchRandomCoffeeImage = useCallback(async () => {
    try {
      // Make a request to the random coffee API
      const response = await axios.get('https://coffee.alexflipnote.dev/random.json');
      
      // The API returns a file URL in the response
      return response.data.file;
    } catch (err) {
      console.error("Error fetching random coffee image:", err);
      setError(err.message || 'Failed to fetch coffee image');
      return null;
    }
  }, []);
  
  // Function to fetch multiple coffee images at once
  const fetchMultipleCoffeeImages = useCallback(async (count) => {
    try {
      setLoading(true);
      
      // Create an array of promises to fetch multiple images in parallel
      const imagePromises = Array(count)
        .fill()
        .map(() => fetchRandomCoffeeImage());
        
      // Wait for all promises to resolve
      const imageUrls = await Promise.all(imagePromises);
      
      // Filter out any null results (failed fetches)
      const validImageUrls = imageUrls.filter(url => url !== null);
      
      // If we got at least one valid image, update the state
      if (validImageUrls.length > 0) {
        setCoffeeImages(validImageUrls);
        setLoading(false);
      } else {
        throw new Error('Could not fetch any coffee images');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [fetchRandomCoffeeImage]);
  
  // Effect to fetch images when the component mounts
  useEffect(() => {
    // Fetch 5 coffee images initially
    fetchMultipleCoffeeImages(5);
    
    // Set up interval to fetch a new image every 30 seconds
    // This keeps the carousel fresh with new content
    const refreshInterval = setInterval(() => {
      fetchRandomCoffeeImage().then(imageUrl => {
        if (imageUrl) {
          setCoffeeImages(prevImages => {
            // Replace the oldest image with the new one
            const newImages = [...prevImages];
            newImages.shift(); // Remove the first/oldest image
            newImages.push(imageUrl); // Add the new image at the end
            return newImages;
          });
        }
      });
    }, 30000); // 30 seconds
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, [fetchRandomCoffeeImage, fetchMultipleCoffeeImages]);
  
  // Effect to automatically advance the carousel
  useEffect(() => {
    // Only start the carousel if we have images
    if (coffeeImages.length === 0) return;
    
    // Set up the interval to advance the slide every 3 seconds
    const slideInterval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % coffeeImages.length);
    }, 3000); // 3 seconds
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(slideInterval);
  }, [coffeeImages.length]);
  
  // If we're still loading, show a loading spinner
  if (loading) {
    return (
      <div className="container mt-5 mb-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading coffee images...</span>
        </div>
        <p className="mt-2">Brewing a fresh batch of coffee images...</p>
      </div>
    );
  }
  
  // If we encountered an error, display it
  if (error) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Coffee Images</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // If we have coffee images, display the carousel
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Coffee Inspiration Gallery</h2>
      <p className="text-center mb-4">Feast your eyes on these delightful coffee images, refreshed regularly</p>
      
      {/* Bootstrap Carousel Component */}
      <div id="coffeeCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {coffeeImages.map((_, index) => (
            <button 
              key={index}
              type="button"
              data-bs-target="#coffeeCarousel"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        {/* Carousel Items */}
        <div className="carousel-inner rounded shadow">
          {coffeeImages.map((imageUrl, index) => (
            <div 
              key={imageUrl}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            >
              <div 
                style={{
                  height: "400px",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Coffee Beauty #{index + 1}</h5>
                <p>Enjoy this coffee masterpiece</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      <div className="text-center mt-3">
        <small className="text-muted">Images automatically update every 30 seconds. New slide every 3 seconds.</small>
      </div>
    </div>
  );
};

export default CoffeeImageCarousel;