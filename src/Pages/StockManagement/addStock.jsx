import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import './AddStock.css'; // Import the same custom CSS file for styling

function AddStock() {
    const [formData, setFormData] = useState({
        clothId: '',
        productName: '',
        quantity: '',
        lastUpdated: '' // Add lastUpdated field to formData
    });
    const [clothOptions, setClothOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchClothOptions = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/inventory');
                const clothOptions = response.data.map(item => ({ id: item.clothId, name: item.clothType }));
                setClothOptions(clothOptions);
            } catch (error) {
                console.error('Error fetching cloth options:', error);
            }
        };

        fetchClothOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Find the corresponding cloth type based on the selected cloth ID
        const selectedCloth = clothOptions.find(option => option.id === value);
        if (selectedCloth) {
            setFormData(prevState => ({ ...prevState, productName: selectedCloth.name }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        try {
            const updatedFormData = { ...formData, lastUpdated: currentDate }; // Include lastUpdated in updatedFormData
            const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/stock', updatedFormData);
            console.log(response.data);
            setSuccess('Stock added successfully.');
            setError('');
            // Clear form data after successful submission
            setFormData({
                clothId: '',
                productName: '',
                quantity: '',
                lastUpdated: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to add stock. Please try again.');
            setSuccess('');
        }
    };

    return (
        <Container className="main-container">
            <Card className="form-card">
                <h2 className="heading">Add Stock</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="clothId">
                                    <Form.Label>Cloth ID</Form.Label>
                                    <Form.Control as="select" name="clothId" value={formData.clothId} onChange={handleChange} required className="custom-input">
                                        <option value="">Select Cloth ID</option>
                                        {clothOptions.map(option => (
                                            <option key={option.id} value={option.id}>{option.id}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Card.Body>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Enter Product Name" required readOnly className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter Quantity" required className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="submit-btn">Add Stock</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default AddStock;