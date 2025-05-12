import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>İSSO ÇİĞKÖFTE</h1>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Navigation - desktop */}
        <nav className={`navigation ${isMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            <li>
              <Link to="/Masalar" onClick={() => setIsMenuOpen(false)}>Masalar</Link>
            </li>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Menü</Link>
            </li>
            <li>
              <Link to="/iletisim" onClick={() => setIsMenuOpen(false)}>İletişim</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;