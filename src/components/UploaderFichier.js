import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploaderFichier.css';

const UploaderFichier = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Veuillez sélectionner un fichier avant de l\'envoyer.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);
            setValidationErrors([]); // Clear previous errors
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Always display the batch start success message
            toast.success(response.data.message);

            if (response.data.validationErrors) {
                setValidationErrors(response.data.validationErrors);
            }

        } catch (error) {
            console.error('Erreur lors de l\'upload', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                if (error.response.data.validationErrors) {
                    setValidationErrors(error.response.data.validationErrors);
                }
            } else {
                toast.error('Une erreur s\'est produite lors de l\'upload du fichier.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
        <div className="container">
            <ToastContainer />
            <div className="header">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p>Browse File to upload!</p>
            </div>
            <label htmlFor="file" className="footer">
                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                    <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                </svg>
                <p>{file ? file.name : "Not selected file"}</p>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2"></path>
                    <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                    <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path>
                </svg>
            </label>
            <input id="file" type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
            
        </div>  <br />
        {validationErrors.length > 0 && (
                <div className="validation-errors">
                    <h3>Erreurs de Validation :</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Validation Errors</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validationErrors.map((error, index) => (
                                <tr key={index}>
                                    <td>{error}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default UploaderFichier;
