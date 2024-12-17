import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewSupplier() {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/suppliers/${id}`);
                setSupplier(response.data);
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        };
        fetchSupplier();
    }, [id]);

    return (
        <div>
            <h2>View Supplier</h2>
            {supplier && (
                <div>
                    <p>Supplier ID: {supplier.supplierId}</p>
                    <p>Supplier Name: {supplier.supplierName}</p>
                    <p>Contact Info: {supplier.contactInfo}</p>
                    <p>Address: {supplier.address}</p>
                </div>
            )}
        </div>
    );
}

export default ViewSupplier;