// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import NavBar from './Components/Navbar';
import PredictionPage from './Components/PredictionPage';
import About from './Components/About';

function App() {
  const [prediction, setPrediction] = useState(null);
  useEffect(() => {
    console.log(prediction);
  }, [prediction]);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home prediction={prediction} setPrediction={setPrediction} />}/>
          <Route exact path="/predict" element={ <PredictionPage prediction={prediction} setPrediction={setPrediction} />}/>
          <Route exact path="/about" element={ <About />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

