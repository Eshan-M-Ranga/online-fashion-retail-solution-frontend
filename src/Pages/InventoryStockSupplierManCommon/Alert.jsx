import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Alert() {
    const [projection, setProjection] = useState(null);
    const [threshold, setThreshold] = useState(100); // Default threshold, you can set it according to your requirements
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Fetch projection data
        axios.get('http://localhost:5000/api/projection') // Adjust the endpoint as per your backend
            .then(response => {
                setProjection(response.data.projection);
            })
            .catch(error => {
                console.error('Error fetching projection data:', error);
            });
    }, []);

    useEffect(() => {
        // Check if the projection is below the threshold and show alert if true
        if (projection !== null && projection < threshold) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [projection, threshold]);

    return (
        <div>
            {showAlert && (
                <div className="alert">
                    <p>Attention: There is a potential risk of items being lost in the coming months due to low sales projection.</p>
                    <p>Please review your inventory and sales projections.</p>
                </div>
            )}
        </div>
    );
}

export default Alert;