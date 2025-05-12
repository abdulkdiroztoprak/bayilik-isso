import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css'; 

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>İSSO ÇİĞKÖFTE</h1> 
        </div>
        <nav className="navigation">
          <ul>
          <li>
              <Link to="/Masalar">Masalar</Link>
            </li>
            <li>
              <Link to="/">Menü</Link>
            </li>
            <li>
              <Link to="/iletisim">İletişim</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;