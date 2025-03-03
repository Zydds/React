import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function CoffeeExplorer() {
  // State to store our coffee data
  const [coffeeList, setCoffeeList] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track any errors that occur
  const [error, setError] = useState(null);
  
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Using axios to fetch the coffee data
    const fetchCoffeeData = async () => {
      try {
        // Set loading to true while we fetch
        setLoading(true);
        
        // Using axios instead of fetch for API calls
        // This provides a more concise syntax and automatic JSON parsing
        const response = await axios.get('https://api.sampleapis.com/coffee/iced');
        
        // With axios, the data is directly available in response.data
        // No need to check response.ok or call .json()
        setCoffeeList(response.data);
        
        // Set loading to false since we're done
        setLoading(false);
      } catch (err) {
        // Handle any errors that occurred during fetch
        // Axios wraps the error in a consistent format
        setError(err.message || 'An error occurred while fetching coffee data');
        setLoading(false);
        console.error("Error fetching coffee data:", err);
      }
    };
    
    // Call our async function
    fetchCoffeeData();
  }, []); // Empty dependency array means this effect runs once on mount
  
  // If we're still loading, show a loading spinner
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-brown" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Brewing your coffee data...</p>
      </div>
    );
  }
  
  // If we encountered an error, display it
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Coffee Data</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please try again later or check the API endpoint.</p>
        </div>
      </div>
    );
  }
  
  // If we have coffee data, display it in a Bootstrap card grid
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Explore Kopi!</h2>
      <p className="text-center mb-5">Ayo kita cari berbagai cara menyajikan kopi</p>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {coffeeList.map((coffee) => (
          <div className="col" key={coffee.id}>
            {/* Bootstrap card component */}
            <div className="card h-100 shadow-sm">
              {/* Coffee image with error handling */}
              <img 
                src={coffee.image} 
                className="card-img-top" 
                alt={coffee.title} 
                style={{ height: '220px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Coffee+Image+Not+Available';
                }}
              />
              
              {/* Card body with coffee details */}
              <div className="card-body">
                <h5 className="card-title">{coffee.title}</h5>
                <p className="card-text">{coffee.description}</p>
                
                <h6 className="mt-3 mb-2">Bahan:</h6>
                <ul className="list-group list-group-flush mb-3">
                  {coffee.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item bg-light">
                      {ingredient.includes('*') ? (
                        <>
                          {ingredient.replace('*', '')} <span className="text-muted fst-italic">(optional)</span>
                        </>
                      ) : (
                        ingredient
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Card footer with button */}
              <div className="card-footer bg-white border-top-0">
                <button className="btn btn-outline-primary w-100">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoffeeExplorer;