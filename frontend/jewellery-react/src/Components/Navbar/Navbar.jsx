import { IoDiamondOutline } from "react-icons/io5";
import { PiStorefrontLight } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiShoppingCartThin } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { TbPhotoScan } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import Logo from "./logo.png";
import all_earrings from "./Dropdown-Assets/All_Earrings.jpg";
import DropDanglers from "./Dropdown-Assets/Drop & Danglers.jpg";
import hoophuggies from "./Dropdown-Assets/hoop &huggies.jpg";
import Jhumkas from "./Dropdown-Assets/Jhumkas.jpg";
import StudsTops from "./Dropdown-Assets/Studs & Tops.jpg";
import rose from "./Dropdown-Assets/rose.jpg";
import white from "./Dropdown-Assets/white.jpg";
import yellow from "./Dropdown-Assets/yellow.jpg";
import gold from "./Dropdown-Assets/Gold.jpg";
import gemstone from "./Dropdown-Assets/gemstone.jpg";
import diamond from "./Dropdown-Assets/diamond.jpg";
import './Navbar.css';
import Slider from './MinimalSlider.jsx'
import { Fade, Zoom, Slide } from 'react-slideshow-image';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext.jsx";
import debounce from 'lodash.debounce'; // Import debounce

function Navbar() {
  const dropdownItems = [
    "Option 1", "Option 2", "Option 3", "Option 4", "Option 5",
    "Option 6", "Option 7", "Option 8", "Option 9", "Option 10",
    "Option 11", "Option 12", "Option 13", "Option 14", "Option 15",
  ];
  const { getTotalCartItems } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Debounced fetch function
  const debouncedFetch = debounce(async (term) => {
    if (term.length > 0) {
      try {
        const response = await fetch(`/search?query=${encodeURIComponent(term)}`);
        if (!response.ok) {
          console.error("Failed to fetch search results");
          setSearchResults([]);
          return;
        }
        const data = await response.json();
        setSearchResults(data); // Set the search results in state
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  }, 300); // 300ms debounce

  useEffect(() => {
    debouncedFetch(searchTerm);

    // Cleanup the debounce on unmount
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Navigate to a search results page (ensure this route exists)
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="logo">
            <img src={Logo} alt="Company Logo" width={100} height={50}></img>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <div>
            <input
              className="bar"
              placeholder="Search for Gold Jewellery, Diamond..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              onKeyDown={handleKeyDown} // Handle Enter key
            />
          </div>
          <div className="scan-icon"><TbPhotoScan /></div>
          <div className="search-icon"><GoSearch /></div>
        </div>

        {/* Search Results Dropdown */}
        

        <div className="top-right-nav">
          <div className="icon-wrap">
            <div className="icon"><IoDiamondOutline /></div>
            <div className="icon-name">Diamond</div>
          </div>
          <div className="icon-wrap">
            <div className="icon"><PiStorefrontLight /></div>
            <div className="icon-name">Store</div>
          </div>
          <div>
            {localStorage.getItem('auth-token') ?
              <div onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} className="icon-wrap">
                <div className="icon"><CiLogout /></div>
                <div className="icon-name">Logout</div>
              </div> :
              <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                <div className="icon-wrap">
                  <div className="icon"><VscAccount /></div>
                  <div className="icon-name">Account</div>
                </div>
              </Link>}
          </div>
          <div className="icon-wrap">
            <div className="icon"><IoIosHeartEmpty /></div>
            <div className="icon-name">Wishlist</div>
          </div>
          <div>
            <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
              <div className="icon-wrap">
                <div className="icon">
                  <PiShoppingCartThin />
                  <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
                <div className="icon-name">Cart</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Rest of your Navbar component (dropdowns, etc.) */}
      <div className="container">
        
        <div className="sub-container">
          <div className="dawg">
            <div className="choice">
            <a>ALL JEWELLERY</a>
            
            </div>
      
          <div className="dropdown1">
            <div>
              <ul><text>CATEGORY</text>
                <Link to='/All-Jewellery' style={{textDecoration:'none' , color:'black'}}><li><div>ALL JEWELLERY</div></li></Link>
                <Link to='/Earrings' style={{textDecoration:'none' , color:'black'}}><li><div>EARRINGS</div></li></Link>
                <Link to='/Pendants' style={{textDecoration:'none', color:'black'}}><li><div>PENDANTS</div></li></Link>
                <Link to='/Rings' style={{textDecoration:'none' , color:'black'}}><li><div>FINGER RINGS</div></li></Link>
                <Link to='/Mangalsutra' style={{textDecoration:'none' , color:'black'}}><li><div>MANGALSUTRA</div></li></Link>
                <Link to='/Chains' style={{textDecoration:'none' , color:'black'}}><li><div>CHAINS</div></li></Link>
                <Link to='/Nosepins' style={{textDecoration:'none' , color:'black'}}><li><div>NOSE PIN</div></li></Link>
                <Link to='/Necklace' style={{textDecoration:'none' , color:'black'}}><li><div>NECKLACES</div></li></Link>
                <Link to='/Necklace-Set' style={{textDecoration:'none' , color:'black'}}><li><div>NECKLACE SET</div></li></Link>
              </ul>
            </div>
            <div>
              <ul>
                <li><Link to='/Bangle' style={{textDecoration:'none' , color:'black'}}><div>BANGLES</div></Link></li>
                <li><Link to='/Bracelet' style={{textDecoration:'none' , color:'black'}}><div>BRACELETS</div></Link></li>
                <li><Link to='/Pendant-Earring' style={{textDecoration:'none' , color:'black'}}><div>PENDANTS & EARRING SET</div></Link></li>
                <li><Link to='/Gold Coins' style={{textDecoration:'none' , color:'black'}}><div>GOLD COINS</div></Link></li>
                
              </ul>
            </div>
            <div>
              <ul><text>GENDER</text>
                <li><Link to='/women' style={{textDecoration:'none' , color:'black'}}><div>WOMEN</div></Link></li>
                <li><Link to='/men' style={{textDecoration:'none' , color:'black'}}><div>MEN</div></Link></li>
                <li><Link to='/kids' style={{textDecoration:'none' , color:'black'}}><div>KIDS & TEENS</div></Link></li>
              </ul>
            </div>
            <div>
              <ul><text>PRICE BAND</text>
                <li><div>BELOW 25K</div></li>
                <li><div>25K-50K</div></li>
                <li><div>50K-1L</div></li>
                <li><div>1L & ABOVE</div></li>
              </ul>
            </div>
          </div>
          </div>

          <div className="dawg">
            <div className="choice">
            <a>GOLD</a>
            </div>
             <div className="dropdown2">
             <div>
              <ul><text>CATEGORY</text>
                <li><div>BANGLES</div></li>
                <li><div>BRACELETS</div></li>
                <li><div>EARRINGS</div></li>
                <li><div>GOLD CHAINS</div></li>
                <li><div>PENDANTS</div></li>
                <li><div>RINGS</div></li>
                <li><div>ENGAGEMENT RINGS</div></li>
                <li><div>NECKLACES</div></li>
                <li><div>NOSE PINS</div></li>
                <li><div>KADAS</div></li>
                <li><div>MANGALSUTRAS</div></li>
              </ul>
            </div>
            <div>
              <ul>
                <li><div>JHUMKAS</div></li>
                <li><div>HOOP EARRINGS</div></li>
                <li><div>STUD EARRINGS</div></li>
                <li><div>MAANG TIKKA</div></li>
                <li><div>NECKLACE SET</div></li>
                <li><div>PENDANTS & EARRINGS SETS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>MENS</text>
                <li><div>BRACELETS</div></li>
                <li><div>CHAINS</div></li>
                <li><div>ENGAGEMENT RINGS</div></li>
                <li><div>KADAS</div></li>
                <li><div>PENDANTS</div></li>
                <li><div>RINGS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>GOLD COIN</text>
                <li><div>SPECIAL COINS</div></li>
                <li><div>1 GRAM</div></li>
                <li><div>2 GRAM</div></li>
                <li><div>4 GRAM</div></li>
                <li><div>5 GRAM</div></li>
                <li><div>8 GRAM</div></li>
                <li><div>10 GRAM</div></li>
                <li><div>25 GRAM</div></li>
                <li><div>30 GRAM</div></li>
                <li><div>50 GRAM</div></li>
                <li><div>100 GRAM</div></li>
              </ul>
            </div>
            <div>
              <ul><text>METAL</text>
              <li><div className="img-n-title" ><div className="img"><img src={rose} width={30}  height={30}></img></div><div className="title">ROSE</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={white} width={30}  height={30}></img></div><div className="title">WHITE</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={yellow} width={30}  height={30}></img></div><div className="title">YELLOW</div></div></li>
              </ul>
            </div>
          </div>
          </div>
          
          
          <div className="dawg">
            <div className="choice">
            <a>DIAMOND</a>
            </div>
             <div className="dropdown3">
             <div>
              <ul><text>CATEGORY</text>
                <li><div>BANGLES</div></li>
                <li><div>BRACELETS</div></li>
                <li><div>NECKLACES SET</div></li>
                <li><div>NECKLACES</div></li>
                <li><div>NOSE PINS</div></li>
                <li><div>MANGALSUTRAS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>EARINGS</text>
                <li><div>JHUMKAS</div></li>
                <li><div>DROP EARRINGS</div></li>
                <li><div>HOOP EARRINGS</div></li>
                <li><div>STUD EARRINGS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>RINGS</text>
                <li><div>ENGAGEMENT RINGS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>PENDANTS</text>
                <li><div>CASUAL WEAR</div></li>
                <li><div>DAILY WEAR</div></li>
                <li><div>PARTY WEAR</div></li>
                <li><div>PENDANTS & EARINGS SET</div></li>
                <li><div>TRADITIONAL</div></li>
              </ul>
            </div>
            <div>
              <ul><text>PRICE BAND</text>
                <li><div>BELOW 25K</div></li>
                <li><div>25K-50K</div></li>
                <li><div>50K-1L</div></li>
                <li><div>1L & ABOVE</div></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>EARINGS</a>
            </div>
             <div className="dropdown4">
             <div>
              <ul><text>STYLE</text>
                <li><div className="img-n-title" ><div className="img"><img src={all_earrings} width={30}  height={30}></img></div><div className="title">ALL EARRINGS</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={DropDanglers} width={30}  height={30}></img></div><div className="title">DROP & DANGLERS</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={Jhumkas} width={30}  height={30}></img></div><div className="title">JHUMKAS</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={hoophuggies} width={30}  height={30}></img></div><div className="title">HOOP & HUGGIES</div></div></li>
                <li><div className="img-n-title"><div className="img"><img src={StudsTops} width={30}  height={30}></img></div><div className="title">STUD & TOPS</div></div></li>
              </ul>
            </div>
            <div>
              <ul><text>METAL & STONES</text>
                <li><div className="img-n-title" ><div className="img"><img src={diamond} width={30}  height={30}></img></div><div className="title">DIAMOND</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={gemstone} width={30}  height={30}></img></div><div className="title">GEMSTONE</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={gold} width={30}  height={30}></img></div><div className="title">GOLD</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={white} width={30}  height={30}></img></div><div className="title">PLATINUM METAL</div></div></li>
                <li><div className="img-n-title" ><div className="img"><img src={rose} width={30}  height={30}></img></div><div className="title">ROSE GOLD</div></div></li>
              </ul>
            </div>
            <div>
              <ul><text>OCCASION</text>
                <li><div>CASUAL WEAR</div></li>
                <li><div>MODERN</div></li>
                <li><div>TRADITIONAL</div></li>
                <li><div>WEDDING</div></li>
                <li><div>WORK WEAR</div></li>
              </ul>
            </div>
            <div>
              <ul><text>PRICE BAND</text>
                <li><div>BELOW 25K</div></li>
                <li><div>25K-50K</div></li>
                <li><div>50K-1L</div></li>
                <li><div>1L & ABOVE</div></li>
              </ul>
            </div>
            <div>
              <ul><text>GENDER</text>
                <li><div>WOMEN</div></li>
                <li><div>KIDS & TEENS</div></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>RINGS</a>
            </div>
             <div className="dropdown5">
             <div>
              <ul><text>ALL RINGS</text>
                <li><div>CASUAL RINGS</div></li>
                <li><div>COUPLE RINGS</div></li>
                <li><div>DIAMOND ENAGEMENT RINGS</div></li>
                <li><div>ENAGEMENT RINGS</div></li>
                <li><div>GOLD ENAGEMENT RINGS</div></li>
                <li><div>MEN'S RINGS</div></li>
                <li><div>PLATINUM ENAGEMENT RINGS</div></li>
              </ul>
            </div>
            <div>
              <ul><text>BY METAL & STONES</text>
                <li><div>DIAMOND</div></li>
                <li><div>GEMSTONE</div></li>
                <li><div>GOLD</div></li>
                <li><div>ROSE GOLD</div></li>
                <li><div>SOLITAIRE</div></li>
                <li><div>WHITE GOLD</div></li>
                
              </ul>
            </div>
            <div>
              <ul><text>PRICE BAND</text>
                <li><div>BELOW 25K</div></li>
                <li><div>25K-50K</div></li>
                <li><div>50K-1L</div></li>
                <li><div>1L & ABOVE</div></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>COLLECTION</a>
            </div>
             <div className="dropdown6">
             <div>
              <ul>
                <li><div>THE SPOTLIGHT EDIT</div></li>
                <li><div>ENCHANTED TRAILS</div></li>
                <li><div>MORDERN POLKI</div></li>
                <li><div>GLAM DAYS</div></li>
                <li><div>FESITVAL OF DIAMONDS</div></li>
                <li><div>STRING IT</div></li>
                <li><div>CELESTE</div></li>
                <li><div>DHAROHAR</div></li>
                
              </ul>
            </div>
            
            <div>
              <ul>
                <li><div>KAKATIYA</div></li>
                <li><div>JOY OF DRESSING</div></li>
                <li><div>ENGAGEMENT RINGS</div></li>
                <li><div>PRETTY IN PINK</div></li>
                <li><div>STUNNING EVERY EAR</div></li>
                <li><div>AVEER</div></li>
                <li><div>DOR</div></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>WEDDING</a>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>GIFTS</a>
            </div>
             <div className="dropdown8">
             <div>
              <ul>
                <li><div>GIFTS FOR LOVED ONES</div></li>
                <li><div>GIFTCARDS</div></li>
                <li><div>CORPORATE GIFTING</div></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="dawg">
            <div className="choice">
            <a>BESTSELLERS</a>
          </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Navbar;
