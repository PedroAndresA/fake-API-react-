// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './Views/Home';
import AdminPanel from './Views/AdminPanel';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/products" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
