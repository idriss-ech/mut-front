// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UploaderFichier from './components/UploaderFichier';
import AfficherDossiers from './components/AfficherDossiers';
import AfficherMedicaments from './components/AfficherMedicaments';
import './App.css'
const App = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/importer" element={<UploaderFichier />} />
                        <Route path="/traites" element={<AfficherDossiers />} />
                        <Route path="/medicaments" element={<AfficherMedicaments />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
