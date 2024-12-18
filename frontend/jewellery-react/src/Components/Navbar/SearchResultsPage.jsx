import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { backend_url } from "../../App"; // Assuming backend_url is exported from App.jsx
import Item from '../../Components/Items/Items';
import './SearchResultsPage.css';
// Custom hook to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Show loading indicator
      setIsLoading(true);
      
      // If search term is empty, clear the results and stop
      if (searchTerm.length === 0) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch search results from the backend
        const response = await fetch(`${backend_url}/search?query=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
          console.error("Failed to fetch search results");
          setSearchResults([]); // Clear results on error
        } else {
          const data = await response.json();
          setSearchResults(data); // Set the fetched results
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }

      // Stop loading indicator
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [searchTerm]); // Fetch results whenever searchTerm changes

  return (
    <div className="search-results-page">
      <h2>Search Results for "{searchTerm}"</h2>
      
      {isLoading ? (
        // Show a loading message while fetching data
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        // Display products in a grid if results are found
        <div className='boy'>
        <div className="CateContainer">
          {searchResults.map((product, i) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product_link" >
              <div key={i}>
                
                <Item
                    key={i}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    new_price={product.new_price}
                />
                {/* Add more product details or links as needed */}
              </div>
            </Link>
          ))}
        </div>
        </div>
      ) : (
        // Show a message if no results are found
        <p>No products found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
