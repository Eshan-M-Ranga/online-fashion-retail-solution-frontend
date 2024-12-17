import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import './UpdateStock.css'; // Import the same custom CSS file for styling

function UpdateStock() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        clothId: '',
        productName: '',
        quantity: ''
    });
    const [clothOptions, setClothOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchStockItem = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/stock/${id}`);
                const { clothId, productName, quantity } = response.data;
                setFormData({ clothId, productName, quantity });
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch stock item. Please try again.');
                // Handle error
            }
        };
        fetchStockItem();

        const fetchClothOptions = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/inventory');
                const clothOptions = response.data.map(item => ({ id: item.clothId, name: item.clothType }));
                setClothOptions(clothOptions);
            } catch (error) {
                console.error('Error fetching cloth options:', error);
                setError('Failed to fetch cloth options. Please try again.');
            }
        };

        fetchClothOptions();
    }, [id]);

    useEffect(() => {
        const selectedCloth = clothOptions.find(option => option.id === formData.clothId);
        if (selectedCloth) {
            setFormData(prevState => ({ ...prevState, productName: selectedCloth.name }));
        }
    }, [clothOptions, formData.clothId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        try {
            const updatedFormData = { ...formData, lastUpdated: currentDate }; // Include lastUpdated in updatedFormData
            const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/stock/${id}`, updatedFormData);
            console.log(response.data);
            setSuccess('Stock item updated successfully.');
            setError('');
            // Add success message or redirect to another page
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update stock item. Please try again.');
            setSuccess('');
            // Handle error
        }
    };

    return (
        <Container className="main-container">
            <Card className="form-card">
                <h2 className="heading">Update Stock Item</h2>
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
                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Enter Product Name" required className="custom-input" />
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
                    <Button variant="primary" type="submit" className="submit-btn">Update Stock</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default UpdateStock;