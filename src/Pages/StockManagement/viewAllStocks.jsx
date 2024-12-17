import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import './ViewAllStocks.css'; // Import custom CSS file for styling

function ViewAllStocks() {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/stock');
                setStocks(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchStocks();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/updatestock/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/api/stock/${id}`);
            setStocks(prevStocks => prevStocks.filter(stock => stock._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
    };

    // Filter stocks based on search term
const filteredStocks = stocks.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.clothId && item.clothId.toString().toLowerCase().includes(searchTerm.toLowerCase()))
);

    return (
        <div className="stocks-container">
            <Form className="search-bar" style={{ margin: "20px" }}>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search by Product Name or Product ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </Form>
            <h2 className="heading">View All Stocks</h2>
            <table className="stocks-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity in Stock</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStocks.map(item => (
                        <tr key={item._id}>
                            <td>{item.clothId}</td>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>{formatDateTime(item.lastUpdated)}</td> {/* Format date and time */}
                            <td>
                                <button className="update-btn" onClick={() => handleUpdate(item._id)}>Update</button>
                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllStocks;