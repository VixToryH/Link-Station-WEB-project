import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const BookingPlaceholder = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
    <h2>Сторінка бронювання місць</h2>
    <a href="/" style={{ color: '#0056b3', fontWeight: 'bold' }}>Назад на головну</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<BookingPlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;