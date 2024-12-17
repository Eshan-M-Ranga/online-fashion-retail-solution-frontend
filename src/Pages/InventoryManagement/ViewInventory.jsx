import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';

function ViewInventory() {
    const { id } = useParams();
    const [inventory, setInventory] = useState(null);

    useEffect(() => {
        const fetchInventoryItem = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/inventory/${id}`);
                setInventory(response.data);
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        };
        fetchInventoryItem();
    }, [id]);

    return (
        <div>
            <InventoryStockSupplierManHeaderN/>
            <h2>View Inventory Item</h2>
            {inventory && (
                <div>
                    <p>Cloth ID: {inventory.clothId}</p>
                    <p>Cloth Type: {inventory.clothType}</p>
                    <p>Quantity: {inventory.quantity}</p>
                    <p>Price: {inventory.price}</p>
                </div>
            )}
        </div>
    );
}

export default ViewInventory;