import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Iletisim from './components/Iletisim';
import Header from './components/Header';
import Footer from './components/Footer';
import Masalar from './components/Masalar';
import MasaDetay from './components/MasaDetay';
import './App.css';


function App() {
  return (
    <div className="app-container">
      <Header />
      <hr />
      <main className="content">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="/Masalar" element={<Masalar />} />
          <Route path="/masa/:id" element={<MasaDetay />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;