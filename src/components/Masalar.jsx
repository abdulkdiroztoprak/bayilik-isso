import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Masalar.css';

const initialMasalar = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  isim: `Masa ${i + 1}`,
  aktif: false,
}));

export default function Masalar() {
  const navigate = useNavigate();
  const [masalar, setMasalar] = useState(initialMasalar);

  const guncelleMasalar = () => {
    const updated = initialMasalar.map((m) => ({
      ...m,
      aktif: !!localStorage.getItem(`adisyon-${m.id}`),
    }));
    setMasalar(updated);
  };

  useEffect(() => {
    guncelleMasalar();

    // Eğer adisyonlar başka sayfada değişirse ve buraya geri dönülürse güncelle
    const handleFocus = () => {
      guncelleMasalar();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const masaSec = (masa) => {
    localStorage.setItem('secilenMasa', JSON.stringify(masa));
    navigate(`/masa/${masa.id}`);
  };

  return (
    <div className="masalar-container">
      {masalar.map((masa) => (
        <button
          key={masa.id}
          onClick={() => masaSec(masa)}
          className={`masa-button ${masa.aktif ? 'aktif' : ''}`}
        >
          {masa.isim}
        </button>
      ))}
    </div>
  );
}
