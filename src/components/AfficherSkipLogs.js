import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AfficherSkipLogs = () => {
    const [skipLogs, setSkipLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/skip-logs');
                setSkipLogs(response.data);
                toast.success('Skip Logs chargés avec succès.');
            } catch (error) {
                console.error('Erreur lors du chargement des Skip Logs', error);
                toast.error('Erreur lors du chargement des Skip Logs.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ToastContainer />
            <h2>Skip Logs</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <table border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item ID</th>
                            <th>Item Type</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skipLogs.map((skip, index) => (
                            <tr key={index}>
                                <td>{skip.id}</td>
                                <td>{skip.itemId}</td>
                                <td>{skip.itemType}</td>
                                <td>{skip.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AfficherSkipLogs;
