import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/İletisim.css';

function Iletisim() {
  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate('/Dahafazlası');
  };

  return (
    <div className="iletisim-container">
      <h1>İletişim</h1>
      <p>Bize ulaşın veya bizi ziyaret edin!</p>

      <div className="contact-img">
        <div className="logo-box">
          <img
            src="/image/cig-logo.png"
            alt="Çiğköfte Logo"
            className="logo-img"
          />
        </div>

        <div className="logo-box">
          <img 
            src="/image/logo1.png"
            alt="Adsız Tasarım"
            className="logo-img"
          />
        </div>
      </div >
      <p className="logo-name">abdulkadiroztoprak</p>
      <p className="logo-name">abdulkadiroztoprak20@gmail.com</p>
        <button 
        className="custom-button"
        onClick={handleClick}
      >
        Daha Fazlası İçin
        <span className="button-icon">→</span>
      </button>

    
    </div>
  );
}

export default Iletisim;