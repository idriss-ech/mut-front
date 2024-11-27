import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sidebar.css'

const Sidebar = () => {
    const handleNavigation = (message) => {
        toast.info(message);
    };

    return (
        <div className="sidebar">
            <ToastContainer />
            <ul>
                <li><Link to="/importer" onClick={() => handleNavigation('Navigating to Import Dossiers')}>Importer les dossiers</Link></li>
                <li><Link to="/traites" onClick={() => handleNavigation('Navigating to Dossiers Traités')}>Dossiers traités</Link></li>
                <li><Link to="/medicaments" onClick={() => handleNavigation('Navigating to Medicaments de Référence')}>Médicaments de référence</Link></li>
                <li><Link to="/skip-logs" onClick={() => handleNavigation('Navigating to Skip Logs')}>Skip Logs</Link></li> {/* Ajouté pour Skip Logs */}
            </ul>
        </div>
    );
};

export default Sidebar;
