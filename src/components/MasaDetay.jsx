import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import './css/MasaDetay.css';

//adisyonMenü
const urunler = [
  { id: 1, isim: 'Çiğ Köfte İsso Special', fiyat: 130, kategori: 'Çiğ Köfte' },
  { id: 2, isim: 'Çiğ Köfte Double Dürüm', fiyat: 120, kategori: 'Çiğ Köfte' },
  { id: 3, isim: 'Çiğ Köfte Dürüm', fiyat: 100, kategori: 'Çiğ Köfte' },
  { id: 4, isim: '1 Kg Sıkım', fiyat: 500, kategori: 'Çiğ Köfte' },
  { id: 5, isim: '800 Gr Sıkım', fiyat: 400, kategori: 'Çiğ Köfte' },
  { id: 6, isim: '600 Gr Sıkım', fiyat: 300, kategori: 'Çiğ Köfte' },
  { id: 7, isim: '450 Gr Sıkım', fiyat: 225, kategori: 'Çiğ Köfte' },
  { id: 8, isim: '250 Gr Sıkım', fiyat: 150, kategori: 'Çiğ Köfte' },
  { id: 9, isim: 'Karışık Sunum', fiyat: 460, kategori: 'Çiğ Köfte' },
  { id: 10, isim: 'Fıstık Dilimi', fiyat: 160, kategori: 'Çiğ Köfte' },
  { id: 11, isim: 'Cips Dilimi', fiyat: 170, kategori: 'Çiğ Köfte' },
  { id: 12, isim: 'Paşa Dilimi', fiyat: 150, kategori: 'Çiğ Köfte' },
  { id: 13, isim: 'Büyük Didi', fiyat: 45, kategori: 'İçecek' },
  { id: 14, isim: 'Küçük Didi', fiyat: 35, kategori: 'İçecek' },
  { id: 15, isim: 'Şalgam', fiyat: 40, kategori: 'İçecek' },
  { id: 16, isim: 'Büyük Kapalı Ayran', fiyat: 30, kategori: 'İçecek' },
  { id: 17, isim: 'Açık Ayran', fiyat: 40, kategori: 'İçecek' },
  { id: 22, isim: 'Su', fiyat: 10, kategori: 'İçecek' },
  { id: 19, isim: 'Meysu Kola', fiyat: 45, kategori: 'İçecek' },
  { id: 20, isim: 'Dondurmalı Dövme Tatlısı', fiyat: 100, kategori: 'Tatlı' },
  { id: 21, isim: 'Dövme Tatlısı', fiyat: 80, kategori: 'Tatlı' },
  { id: 18, isim: ' Küçük Ayran', fiyat: 25, kategori: 'İçecek' },
  { id: 23, isim: ' 1 Lt Açık Ayran', fiyat: 90, kategori: 'İçecek' },
  { id: 24, isim: ' Küçük Paket Açık Ayran', fiyat: 45, kategori: 'İçecek' },
   { id: 25, isim: ' 1 Lt Salgam', fiyat: 80, kategori: 'İçecek' },
   { id: 26, isim: ' Sade Soda', fiyat: 25, kategori: 'İçecek' },
    { id: 27, isim: ' Meyveli Soda', fiyat: 30, kategori: 'İçecek' },
      { id: 28, isim: ' Niğde Gazozu', fiyat: 35, kategori: 'İçecek' },
];

const kategoriler = [...new Set(urunler.map((u) => u.kategori))];

const MasaDetay = () => {
  const { id } = useParams();
  const [secilenUrunler, setSecilenUrunler] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0);
  const [siparisler, setSiparisler] = useState([]);
  const [kategoriIndex, setKategoriIndex] = useState(0);
  const [verilenPara, setVerilenPara] = useState('');
  const [paraUstu, setParaUstu] = useState(null);
  const [error, setError] = useState('');

  const localStorageKey = `masa_${id}_siparisler`;
  const masaAdi = `Masa ${id}`;

  // Improved input validation for verilenPara
  const handleVerilenParaChange = (e) => {
    const deger = e.target.value;
    if (deger === '' || /^[0-9]+([,.][0-9]{0,2})?$/.test(deger)) {
      setVerilenPara(deger);
      setError('');
    } else {
      setError('Geçerli bir para miktarı girin (örn: 200,00)');
    }
  };

  // Calculate change
  const hesaplaParaUstu = () => {
    const verilen = parseFloat(verilenPara.replace(',', '.'));
    if (isNaN(verilen)) {
      setError('Lütfen geçerli bir sayı giriniz.');
      return;
    }
    if (verilen < toplamFiyat) {
      setError('Verilen para toplam fiyattan az olamaz!');
      return;
    }
    setParaUstu(verilen - toplamFiyat);
    setError('');
  };

  // Handle payment
  const odemeYap = (tip) => {
    if (paraUstu === null) {
      setError('Lütfen önce verilen parayı girip "Para Üstü Hesapla" butonuna tıklayın.');
      return;
    }
    if (secilenUrunler.length === 0) {
      setError('Ödeme yapmak için ürün seçmelisiniz.');
      return;
    }

    const yeniSiparis = {
      masaId: id,
      tarih: new Date().toISOString(),
      urunler: [...secilenUrunler],
      toplamFiyat,
      odemeTipi: tip,
      verilenPara: parseFloat(verilenPara.replace(',', '.')),
      paraUstu,
    };

    const odemesiYapilanlar = siparisler.filter((s) => s.odemeTipi);
    const guncellenmis = [...odemesiYapilanlar, yeniSiparis];

    localStorage.setItem(localStorageKey, JSON.stringify(guncellenmis));
    setSiparisler(guncellenmis);
    setSecilenUrunler([]);
    setVerilenPara('');
    setParaUstu(null);
    localStorage.removeItem(`adisyon-${id}`);

    setError('');
    alert(`${tip} ile ${toplamFiyat.toFixed(2).replace('.', ',')} ₺ ödeme yapıldı. Para üstü: ${paraUstu.toFixed(2).replace('.', ',')} ₺`);
  };

  // Load orders from localStorage
  useEffect(() => {
    const kayitliSiparisler = localStorage.getItem(localStorageKey);
    if (kayitliSiparisler) {
      try {
        const parsed = JSON.parse(kayitliSiparisler);
        if (Array.isArray(parsed)) {
          setSiparisler(parsed);
          const aktifSiparis = parsed.find((s) => !s.odemeTipi);
          if (aktifSiparis) {
            // Validate that products still exist in urunler
            const validUrunler = aktifSiparis.urunler.filter((u) =>
              urunler.some((p) => p.id === u.id)
            );
            setSecilenUrunler(validUrunler);
            setToplamFiyat(
              validUrunler.reduce(
                (acc, urun) => acc + (Number(urun.fiyat) || 0) * (Number(urun.adet) || 0),
                0
              )
            );
            localStorage.setItem(`adisyon-${id}`, '1');
          } else {
            localStorage.removeItem(`adisyon-${id}`);
          }
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        setError('Siparişler yüklenirken bir hata oluştu.');
      }
    }
  }, [localStorageKey, id]);

  // Memoized total price calculation
  const toplamFiyatMemo = useMemo(() => {
    return secilenUrunler.reduce(
      (acc, urun) => acc + (Number(urun.fiyat) || 0) * (Number(urun.adet) || 0),
      0
    );
  }, [secilenUrunler]);

  useEffect(() => {
    setToplamFiyat(toplamFiyatMemo);
  }, [toplamFiyatMemo]);

  // Add product
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

  // Update product quantity
  const urunAdetGuncelle = (urunId, yeniAdet) => {
    if (yeniAdet < 1) return urunSil(urunId);
    setSecilenUrunler((prev) =>
      prev.map((u) => (u.id === urunId ? { ...u, adet: yeniAdet } : u))
    );
  };

  // Remove product
  const urunSil = (urunId) => {
    setSecilenUrunler((prev) => prev.filter((u) => u.id !== urunId));
  };

  // Clear table
  const masaTemizle = () => {
      setSecilenUrunler([]);
    setToplamFiyat(0);
    setVerilenPara('');
    setParaUstu(null);
    localStorage.removeItem(`adisyon-${id}`);
    setError('');
    setSecilenUrunler([]);
    localStorage.removeItem(`adisyon-${id}`);
    const odemesiYapilanlar = siparisler.filter((s) => s.odemeTipi);
    localStorage.setItem(localStorageKey, JSON.stringify(odemesiYapilanlar));
    setSiparisler(odemesiYapilanlar);
    setError('');
  };

const posOdeme = () => {
  // Ekranı temizleme (mevcut içeriği silme)
  document.body.innerHTML = '';

  // Bir uyarı mesajı gösterme
  alert('Ödeme işlemi tamamlandı!');
};


  // Save order
  const kaydetSiparis = () => {
    if (secilenUrunler.length === 0) {
      setError('Kaydetmek için en az bir ürün seçili olmalı.');
      return;
    }
    const yeniSiparis = {
      masaId: id,
      tarih: new Date().toISOString(),
      urunler: [...secilenUrunler],
      toplamFiyat,
      odemeTipi: null,
    };
    const guncellenmis = [...siparisler.filter((s) => s.odemeTipi), yeniSiparis];
    localStorage.setItem(localStorageKey, JSON.stringify(guncellenmis));
    setSiparisler(guncellenmis);
    localStorage.setItem(`adisyon-${id}`, '1');
    setError('');
    alert(`${masaAdi} için sipariş kaydedildi.`);
  };

  const formatFiyat = (fiyat) => Number(fiyat).toFixed(2).replace('.', ',');

  const handleKategoriChange = (event, newValue) => {
    setKategoriIndex(newValue);
  };

  // Memoized filtered products
  const filtreliUrunler = useMemo(
    () => urunler.filter((u) => u.kategori === kategoriler[kategoriIndex]),
    [kategoriIndex]
  );

    return (
    <div className="masa-detay-container" style={{ 
      backgroundColor: '#e2e2e2',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="urun-listesi" style={{
        backgroundColor: '#fff0ff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#161934', marginBottom: '15px' }}>Ürünler</h3>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={kategoriIndex}
            onChange={handleKategoriChange}
            aria-label="kategori sekmeleri"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#b6d0ff',
              },
            }}
          >
            {kategoriler.map((kategori, index) => (
              <Tab 
                label={kategori} 
                key={index} 
                sx={{
                  color: '#77767c',
                  '&.Mui-selected': {
                    color: '#161934',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        <div style={{ 
          marginTop: '15px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {filtreliUrunler.map((u) => (
            <Button
              key={u.id}
              onClick={() => urunEkle(u)}
              variant="outlined"
              className="urun-buton"
              aria-label={`${u.isim} ekle`}
              sx={{
                color: '#161934',
                borderColor: '#b6d0ff',
                '&:hover': {
                  backgroundColor: '#b6d0ff',
                  borderColor: '#b6d0ff',
                },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '8px 12px',
                justifyContent: 'flex-start',
                textAlign: 'left'
              }}
            >
              {u.isim} <span style={{ marginLeft: 'auto', color: '#77767c' }}>{formatFiyat(u.fiyat)} ₺</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="siparis-tablosu" style={{
        backgroundColor: '#fff0ff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: '#161934', margin: 0 }}>{masaAdi}</h3>
          <p className="toplam-fiyat" style={{ 
            color: '#161934', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            margin: 0
          }}>
            Toplam: {formatFiyat(toplamFiyat)} ₺
          </p>
        </div>
        
        {error && (
          <Paper elevation={2} sx={{ 
            backgroundColor: '#ffebee', 
            padding: '10px', 
            marginBottom: '15px',
            borderLeft: '4px solid #f44336'
          }}>
            <p style={{ color: '#f44336', margin: 0 }}>{error}</p>
          </Paper>
        )}
        
        {secilenUrunler.length === 0 ? (
          <Paper elevation={0} sx={{ 
            backgroundColor: '#f5f5f5', 
            padding: '20px', 
            textAlign: 'center',
            color: '#77767c'
          }}>
            <p style={{ margin: 0 }}>Masada ürün yok.</p>
          </Paper>
        ) : (
          <Table aria-label="sipariş tablosu" sx={{ 
            '& .MuiTableCell-root': {
              borderColor: '#e2e2e2'
            }
          }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b6d0ff' }}>
                <TableCell sx={{ color: '#161934', fontWeight: 'bold' }}>Ürün</TableCell>
                <TableCell sx={{ color: '#161934', fontWeight: 'bold' }}>Adet</TableCell>
                <TableCell sx={{ color: '#161934', fontWeight: 'bold' }}>Fiyat</TableCell>
                <TableCell sx={{ color: '#161934', fontWeight: 'bold' }}>Toplam</TableCell>
                <TableCell sx={{ color: '#161934', fontWeight: 'bold' }}>Sil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secilenUrunler.map((u) => (
                <TableRow key={u.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ color: '#161934' }}>{u.isim}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Button
                        onClick={() => urunAdetGuncelle(u.id, u.adet - 1)}
                        aria-label={`${u.isim} adet azalt`}
                        sx={{ 
                          minWidth: '30px', 
                          padding: '5px',
                          color: '#161934',
                          borderColor: '#b6d0ff',
                          '&:hover': {
                            backgroundColor: '#b6d0ff',
                            borderColor: '#b6d0ff',
                          }
                        }}
                      >
                        -
                      </Button>
                      <span style={{ 
                        color: '#161934',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {u.adet}
                      </span>
                      <Button
                        onClick={() => urunAdetGuncelle(u.id, u.adet + 1)}
                        aria-label={`${u.isim} adet artır`}
                        sx={{ 
                          minWidth: '30px', 
                          padding: '5px',
                          color: '#161934',
                          borderColor: '#b6d0ff',
                          '&:hover': {
                            backgroundColor: '#b6d0ff',
                            borderColor: '#b6d0ff',
                          }
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#161934' }}>{formatFiyat(u.fiyat)} ₺</TableCell>
                  <TableCell sx={{ color: '#161934' }}>{formatFiyat(u.fiyat * u.adet)} ₺</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => urunSil(u.id)}
                      className="sil-buton"
                      aria-label={`${u.isim} sil`}
                      sx={{ 
                        color: '#f44336',
                        minWidth: '30px',
                        padding: '5px',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.08)'
                        }
                      }}
                    >
                      ✖
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="islemler-paneli" style={{
        backgroundColor: '#fff0ff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#161934', marginTop: 0, marginBottom: '20px' }}>İşlemler</h3>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          marginBottom: '15px'
        }}>
          <TextField
            label="Verilen Para (₺)"
            value={verilenPara}
            onChange={handleVerilenParaChange}
            placeholder="Örn: 200,00"
            error={!!error}
            helperText={error}
            sx={{ 
              width: '150px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b6d0ff',
                },
                '&:hover fieldset': {
                  borderColor: '#b6d0ff',
                },
              }
            }}
            inputProps={{ 'aria-label': 'Verilen para miktarı' }}
          />
          <Button
            onClick={hesaplaParaUstu}
            variant="contained"
            className="hesapla-buton"
            aria-label="Para üstünü hesapla"
            sx={{
              backgroundColor: '#b6d0ff',
              color: '#161934',
              '&:hover': {
                backgroundColor: '#a0c0ff',
              }
            }}
          >
            Hesapla
          </Button>
        </Box>
        
        {paraUstu !== null && (
          <Paper elevation={0} sx={{ 
            backgroundColor: '#e2e2e2',
            padding: '10px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            <p style={{ 
              margin: 0,
              color: '#161934',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              Para Üstü: {formatFiyat(paraUstu)} ₺
            </p>
          </Paper>
        )}
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px'
        }}>
          <Button
            onClick={masaTemizle}
            variant="outlined"
            className="temizle-buton"
            aria-label="Masayı temizle"
            sx={{
              color: '#161934',
              borderColor: '#b6d0ff',
              '&:hover': {
                backgroundColor: '#b6d0ff',
                borderColor: '#b6d0ff',
              }
            }}
          >
            Temizle
          </Button>
          
          <Button
            onClick={kaydetSiparis}
            variant="contained"
            className="kaydet-buton"
            aria-label="Siparişi kaydet"
            sx={{
              backgroundColor: '#b6d0ff',
              color: '#161934',
              '&:hover': {
                backgroundColor: '#a0c0ff',
              }
            }}
          >
            Kaydet
          </Button>

          <Button
            onClick={posOdeme}
            variant="contained"
            className="pos-buton"
            aria-label="Pos ile ödeme"
            disabled={secilenUrunler.length === 0}
            sx={{
              backgroundColor: '#161934',
              color: '#fff0ff',
              '&:hover': {
                backgroundColor: '#000000',
              },
              '&:disabled': {
                backgroundColor: '#77767c',
                color: '#e2e2e2'
              }
            }}
          >
            Pos
          </Button>
          
          <Button
            onClick={() => odemeYap('Nakit')}
            variant="contained"
            className="odeme-buton"
            disabled={secilenUrunler.length === 0 || paraUstu === null || !!error}
            sx={{
              backgroundColor: '#161934',
              color: '#fff0ff',
              '&:hover': {
                backgroundColor: '#000000',
              },
              '&:disabled': {
                backgroundColor: '#77767c',
                color: '#e2e2e2'
              }
            }}
            aria-label="Nakit veya kart ile ödeme yap"
          >
            Nakit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MasaDetay;