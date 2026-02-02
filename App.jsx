// App.jsx - Главный компонент
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PrinterDetail from './pages/PrinterDetail';
import Admin from './pages/Admin';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/printer/:id" element={<PrinterDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}