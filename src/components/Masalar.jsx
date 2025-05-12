import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Masalar.css'; // doğru css dosyasını çağırıyoruz



const masalarListesi = [
  { id: 1, isim: 'Masa 1', aktif: false },
  { id: 2, isim: 'Masa 2', aktif: false },
  { id: 3, isim: 'Masa 3', aktif: false },
  { id: 4, isim: 'Masa 4', aktif: false },
  { id: 5, isim: 'Masa 5', aktif: false },
  { id: 6, isim: 'Masa 6', aktif: false },
  { id: 7, isim: 'Masa 7', aktif: false },
  { id: 8, isim: 'Masa 8', aktif: false },
  { id: 9, isim: 'Masa 9', aktif: false },
  { id: 10, isim: 'Masa 10', aktif: false },
  { id: 11, isim: 'Masa 11', aktif: false },
  { id: 12, isim: 'Masa 12', aktif: false },
  { id: 13, isim: 'Masa 13', aktif: false },
  { id: 14, isim: 'Masa 14', aktif: false },
  { id: 15, isim: 'Masa 15', aktif: false },
  { id: 16, isim: 'Masa 16', aktif: false },
  { id: 17, isim: 'Masa 17', aktif: false },
  { id: 18, isim: 'Masa 18', aktif: false },
  { id: 19, isim: 'Masa 19', aktif: false },
  { id: 20, isim: 'Masa 20', aktif: false },
  { id: 21, isim: 'Masa 21', aktif: false },
  { id: 22, isim: 'Masa 22', aktif: false },
  { id: 23, isim: 'Masa 23', aktif: false },
  { id: 24, isim: 'Masa 24', aktif: false },
];

function Masalar() {
  const navigate = useNavigate();

  const masaSec = (masa) => {
    localStorage.setItem('secilenMasa', JSON.stringify(masa));
    navigate(`/masa/${masa.id}`);
  };

  return (
    <div className="masalar-container">
      {masalarListesi.map((masa) => (
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

export default Masalar;
