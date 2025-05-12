import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/MasaDetay.css';

const urunler = [
  { id: 1, isim: 'Meysu Kola', fiyat: 20 },
  { id: 2, isim: 'Su', fiyat: 10 },
  { id: 3, isim: 'Açık Ayran', fiyat: 25 },
  { id: 4, isim: 'Ayran', fiyat: 30 },
  { id: 5, isim: 'Şalgam', fiyat: 18 },
  { id: 6, isim: 'Küçük Didi', fiyat: 22 },
  { id: 7, isim: 'Büyük Didi', fiyat: 12 },
  { id: 8, isim: 'Paşa Dilimi', fiyat: 150 },
  { id: 9, isim: 'Cips Dilimi', fiyat: 160 },
  { id: 10, isim: 'Fıstık Dilimi', fiyat: 170 },
  { id: 11, isim: 'Karışık Sunum', fiyat: 460 },
  { id: 12, isim: '1 Kg Skım', fiyat: 170 },
  { id: 13, isim: '1/2 Kg Skım', fiyat: 170 },
  { id: 14, isim: 'Tek Kişilik Skım', fiyat: 170 },
  { id: 15, isim: 'İki Kişilik Skım', fiyat: 170 },
  { id: 16, isim: 'Üç Kişilik Skım', fiyat: 170 },
  { id: 17, isim: 'Dört Kişilik Skım', fiyat: 170 },
];

const MasaDetay = () => {
  const { id } = useParams();
  const [secilenUrunler, setSecilenUrunler] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0);

  const [siparisler, setSiparisler] = useState([]);

  const localStorageKey = `masa_${id}_siparisler`;
  const masaAdi = `Masa ${id}`;

  // Load data from localStorage on mount
  useEffect(() => {
    const kayitliSiparisler = localStorage.getItem(localStorageKey);
    if (kayitliSiparisler) {
      try {
        const parsed = JSON.parse(kayitliSiparisler);
        if (Array.isArray(parsed)) {
          setSiparisler(parsed);
          // Aktif siparişi bul (ödeme yapılmamış olan)
          const aktifSiparis = parsed.find(s => !s.odemeTipi);
          if (aktifSiparis) {
            setSecilenUrunler(aktifSiparis.urunler || []);
            setToplamFiyat(aktifSiparis.toplamFiyat || 0);
          }
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, [localStorageKey]);

  // Calculate total price whenever secilenUrunler changes
  useEffect(() => {
    const yeniToplam = secilenUrunler.reduce((acc, urun) => {
      return acc + (Number(urun.fiyat) || 0) * (Number(urun.adet) || 0);
    }, 0);
    setToplamFiyat(yeniToplam);
  }, [secilenUrunler]);

  const urunEkle = (urun) => {
    setSecilenUrunler((prev) => {
      const mevcut = prev.find((u) => u.id === urun.id);
      if (mevcut) {
        return prev.map((u) =>
          u.id === urun.id ? { ...u, adet: u.adet + 1 } : u
        );
      }
      return [...prev, { ...urun, adet: 1 }];
    });
  };

  const urunAdetGuncelle = (id, yeniAdet) => {
    if (yeniAdet < 1) {
      urunSil(id);
      return;
    }
    setSecilenUrunler((prev) =>
      prev.map((u) => (u.id === id ? { ...u, adet: yeniAdet } : u))
    );
  };

  const urunSil = (id) => {
    setSecilenUrunler((prev) => prev.filter((u) => u.id !== id));
  };

  const masaTemizle = () => {
    setSecilenUrunler([]);
   
    // Sadece aktif siparişi temizle, geçmiş siparişleri sakla
    const odemesiYapilanlar = siparisler.filter(s => s.odemeTipi);
    localStorage.setItem(localStorageKey, JSON.stringify(odemesiYapilanlar));
    setSiparisler(odemesiYapilanlar);
  };

  const kaydetSiparis = () => {
    const yeniSiparis = {
      masaId: id,
      tarih: new Date().toISOString(),
      urunler: [...secilenUrunler],
      toplamFiyat: toplamFiyat,
      odemeTipi: null
    };
    
    // Mevcut aktif siparişi kaldır (eğer varsa)
    const guncellenmisSiparisler = siparisler.filter(s => s.odemeTipi);
    guncellenmisSiparisler.push(yeniSiparis);
    
    localStorage.setItem(localStorageKey, JSON.stringify(guncellenmisSiparisler));
    setSiparisler(guncellenmisSiparisler);
    alert(`${masaAdi} için sipariş kaydedildi.`);
  };

  const odemeYap = (tip) => {
    const odemeTarihi = new Date().toISOString();
    const yeniSiparis = {
      masaId: id,
      tarih: odemeTarihi,
      urunler: [...secilenUrunler],
      toplamFiyat: toplamFiyat,
      odemeTipi: tip
    };
    
    // Eski aktif siparişi kaldır ve yeni ödemeyi ekle
    const guncellenmisSiparisler = [
      ...siparisler.filter(s => s.odemeTipi),
      yeniSiparis
    ];
    
    localStorage.setItem(localStorageKey, JSON.stringify(guncellenmisSiparisler));
    setSiparisler(guncellenmisSiparisler);
    setSecilenUrunler([]);

    alert(`${tip} ile ${toplamFiyat} ₺ tutarında ödeme yapıldı.`);
  };

  const formatFiyat = (fiyat) => {
    return Number(fiyat).toFixed(2).replace('.', ',');
  };

  return (
    <div className="masa-detay-container">
      {/* Ürün Listesi */}
      <div className="urun-listesi">
        <h3>Ürünler</h3>
        {urunler.map((urun) => (
          <button
            key={urun.id}
            onClick={() => urunEkle(urun)}
            className="urun-buton"
          >
            {urun.isim} ({urun.fiyat} ₺)
          </button>
        ))}
      </div>

      {/* Sipariş Tablosu */}
      <div className="siparis-tablosu">
        <h3>{masaAdi}</h3>
        <p className="toplam-fiyat">Toplam Fiyat: {formatFiyat(toplamFiyat)} ₺</p>
        {secilenUrunler.length === 0 ? (
          <p>Masada ürün yok.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Adet</th>
                <th>Fiyat</th>
                <th>Toplam</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              {secilenUrunler.map((urun) => (
                <tr key={urun.id}>
                  <td>{urun.isim}</td>
                  <td>
                    <button
                      onClick={() =>
                        urunAdetGuncelle(urun.id, urun.adet - 1)
                      }
                    >
                      -
                    </button>
                    <span style={{ margin: '0 10px' }}>{urun.adet}</span>
                    <button
                      onClick={() =>
                        urunAdetGuncelle(urun.id, urun.adet + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>{formatFiyat(urun.fiyat)} ₺</td>
                  <td>{formatFiyat(urun.fiyat * urun.adet)} ₺</td>
                  <td>
                    <button
                      onClick={() => urunSil(urun.id)}
                      className="sil-buton"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* İşlemler */}
      <div className="islemler-paneli">
        <h3>İşlemler</h3>
        <button onClick={masaTemizle} className="temizle-buton">
          Masayı Temizle
        </button>
        <button onClick={kaydetSiparis} className="kaydet-buton">
          Kaydet
        </button>
        <button
          onClick={() => odemeYap('Nakit')}
          className="odeme-buton"
          disabled={secilenUrunler.length === 0}
        >
          Nakit / Kart Ödeme
        </button>
      </div>

     </div>
  );
};

export default MasaDetay;