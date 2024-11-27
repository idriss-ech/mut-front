import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AfficherDossiers.css';

const AfficherDossiers = () => {
    const [dossiers, setDossiers] = useState([]);

    useEffect(() => {
        fetchDossiers();
    }, []);

    const fetchDossiers = () => {
        axios.get('http://localhost:8080/api/dossiers')
            .then(response => {
                setDossiers(response.data);
                toast.success('Dossiers chargés avec succès.');
            })
            .catch(error => {
                console.error('Erreur lors du chargement des dossiers', error);
                toast.error('Erreur lors du chargement des dossiers.');
            });
    };

    const handleDeleteAll = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/deleteAll');
            if (response.status === 200) {
                toast.success(response.data); // Affiche le message de succès du backend
                fetchDossiers(); // Rafraîchit la liste des dossiers après la suppression
            } else {
                toast.error('Une erreur s\'est produite lors de la suppression des dossiers.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression des dossiers', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data); // Affiche le message d'erreur du backend
            } else {
                toast.error('Une erreur s\'est produite lors de la suppression des dossiers.');
            }
        }
    };

    return (
        <div className="dossiers">
            <ToastContainer />
            <h2>Dossiers Traités</h2>
            <button onClick={handleDeleteAll} className="delete-all-btn">Supprimer tous les dossiers</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Assuré</th>
                        <th>Numéro d'affiliation</th>
                        <th>Immatriculation</th>
                        <th>Lien de Parenté</th>
                        <th>Montant Total des Frais</th>
                        <th>Prix Consultation</th>
                        <th>Nombre de Pièces Jointes</th>
                        <th>Nom Bénéficiaire</th>
                        <th>Date de Dépôt</th>
                        <th>Montant Remboursement</th>
                        <th>Traitements</th>
                    </tr>
                </thead>
                <tbody>
                    {dossiers.map((dossier, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{dossier.id}</td>
                                <td>{dossier.nomAssure}</td>
                                <td>{dossier.numeroAffiliation}</td>
                                <td>{dossier.immatriculation}</td>
                                <td>{dossier.lienParente}</td>
                                <td>{dossier.montantTotalFrais}</td>
                                <td>{dossier.prixConsultation}</td>
                                <td>{dossier.nombrePiecesJointes}</td>
                                <td>{dossier.nomBeneficiaire}</td>
                                <td>{dossier.dateDepotDossier}</td>
                                <td>{dossier.montantRemboursement}</td>
                                <td>
                                    <table className="inner-table">
                                        <thead>
                                            <tr>
                                                <th>Nom Médicament</th>
                                                <th>Type Médicament</th>
                                                <th>Prix Médicament</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dossier.traitements.map((traitement, tIndex) => (
                                                <tr key={tIndex}>
                                                    <td>{traitement.nomMedicament}</td>
                                                    <td>{traitement.typeMedicament}</td>
                                                    <td>{traitement.prixMedicament}€</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AfficherDossiers;
