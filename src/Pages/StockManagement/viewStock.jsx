import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewStock() {
    const { id } = useParams();
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const fetchStockItem = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/stock/${id}`);
                setStock(response.data);
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        };
        fetchStockItem();
    }, [id]);

    return (
        <div>
            <h2>View Stock Item</h2>
            {stock && (
                <div>
                    <p>Cloth ID: {stock.clothId}</p>
                    <p>Quantity: {stock.quantity}</p>
                </div>
            )}
        </div>
    );
}

export default ViewStock;