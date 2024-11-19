import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AfficherMedicaments = () => {
    const [medicaments, setMedicaments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/medicaments')
            .then(response => setMedicaments(response.data))
            .catch(error => console.error('Erreur lors du chargement des médicaments', error));
    }, []);

    return (
        <div>
            <h2>Médicaments de Référence</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Nom</th>
                        <th>DCI 1</th>
                        <th>Dosage</th>
                        <th>Unité Dosage</th>
                        <th>Forme</th>
                        <th>Présentation</th>
                        <th>PPV (DH)</th>
                        <th>PH (DH)</th>
                        <th>Prix BR (DH)</th>
                        <th>Princeps/Générique</th>
                        <th>Taux de Remboursement</th>
                    </tr>
                </thead>
                <tbody>
                    {medicaments.map((medicament, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{medicament.code}</td>
                            <td>{medicament.nom}</td>
                            <td>{medicament.dci1}</td>
                            <td>{medicament.dosage1}</td>
                            <td>{medicament.uniteDosage1}</td>
                            <td>{medicament.forme}</td>
                            <td>{medicament.presentation}</td>
                            <td>{medicament.ppv}</td>
                            <td>{medicament.ph}</td>
                            <td>{medicament.prixBr}</td>
                            <td>{medicament.princepsGenerique}</td>
                            <td>{medicament.tauxRemboursement}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AfficherMedicaments;
