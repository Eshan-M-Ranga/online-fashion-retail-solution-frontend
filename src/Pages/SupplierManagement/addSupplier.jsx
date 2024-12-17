import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import './AddSupplier.css';
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';

function AddSupplier() {
    const [formData, setFormData] = useState({
        supplierId: '',
        supplierName: '',
        contactInfo: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const PHONE_NO_REGX = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.supplierName) {
            setError("Add suplier name")
        } 

        else if(!formData.contactInfo) {
            setError("Add suplier contact number")
        }
        else if(!PHONE_NO_REGX.test(formData.contactInfo)) {
            setError("Add valid contact number")
        }
        else if(!formData.address) {
            setError("Add suplier address")
        }
        else{
            
        //const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        try {
            //const updatedFormData = { ...formData, lastUpdated: currentDate };
            const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/suppliers', formData);
            console.log(response.data);
            setSuccess('Supplier added successfully.');
            setError('');
            // Reset form data after successful submission
            setFormData({
                supplierName: '',
                contactInfo: '',
                address: '',
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to add supplier. Please try again.');
            setSuccess('');
        }
    }
    };

    return (
        <>
        <div className="mng-nav">
          <InventoryStockSupplierManHeaderN/>
        </div>
        <div className="mng-head">
            <h2 className="heading">Add Supplier</h2>
        </div>

        <div className="MngF-container">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="supplierName">
                                    <Form.Label>Supplier Name</Form.Label>
                                    <Form.Control type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} placeholder="Enter Supplier Name"  className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="contactInfo">
                                    <Form.Label>Contact Info</Form.Label>
                                    <Form.Control type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Enter Contact Info"  className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Card.Body>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address"  className="custom-input" />
                                </Form.Group>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="float-end">
                        Add Supplier
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default AddSupplier;