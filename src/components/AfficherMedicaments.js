import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AfficherMedicaments = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/medicaments');
                setMedicaments(response.data);
                toast.success('Médicaments chargés avec succès.');
            } catch (error) {
                console.error('Erreur lors du chargement des médicaments', error);
                toast.error('Erreur lors du chargement des médicaments.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ToastContainer />
            <h2>Médicaments de Référence</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : (
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
            )}
        </div>
    );
};

export default AfficherMedicaments;
