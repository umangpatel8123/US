import React from 'react';
import './App.css';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeelingsPage from './components/FeelingsPage'; // Import the FeelingsPage component
import Bargain from './components/Bargain'; // Import the Bargain component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Landing page route */}
          <Route path="/feelings" element={<FeelingsPage />} /> {/* Feelings page route */}
          <Route path="/bargain" element={<Bargain />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
