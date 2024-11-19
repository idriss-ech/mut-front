import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/importer">Importer les dossiers</Link></li>
                <li><Link to="/traites">Dossiers traités</Link></li>
                <li><Link to="/medicaments">Médicaments de référence</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
