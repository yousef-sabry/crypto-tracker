import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import CurrencyConverterPage from './Pages/CurrencyConverterPage';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ContactPage from './Pages/ContactPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Converter" element={<CurrencyConverterPage />} />
        <Route path="/Contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
