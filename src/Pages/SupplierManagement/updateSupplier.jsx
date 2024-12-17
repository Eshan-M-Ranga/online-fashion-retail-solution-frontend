import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';

function UpdateSupplier() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        supplierName: '',
        contactInfo: '',
        address: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/suppliers/${id}`);
                const { supplierId, supplierName, contactInfo, address, clothType, quantity, price, dateSupplied, lastUpdated } = response.data;
                setFormData({ supplierId, supplierName, contactInfo, address, clothType, quantity, price, dateSupplied, lastUpdated });
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSupplier();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        try {
            //const updatedFormData = { ...formData, lastUpdated: currentDate };
            const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/suppliers/${id}`, formData);
            console.log(response.data);
            setSuccess('Supplier updated successfully.');
            setError('');
            navigate('/viewallsuppliers')
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update supplier. Please try again.');
            setSuccess('');
        }
    };

    return (
        <>
            <div className="mng-nav">
                <InventoryStockSupplierManHeaderN/>
            </div>
            <div className="mng-head">
                <h2 className="heading">Update Supplier</h2>
            </div>
            <div className="MngT-container">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="supplierName">
                                    <Form.Label>Supplier Name</Form.Label>
                                    <Form.Control type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} placeholder="Enter Supplier Name" required className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="contactInfo">
                                    <Form.Label>Contact Info</Form.Label>
                                    <Form.Control type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Enter Contact Info" required className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="float-end">
                        Update Supplier
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default UpdateSupplier;