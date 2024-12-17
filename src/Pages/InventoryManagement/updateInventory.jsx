import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import './UpdateInventory.css'; // Import custom CSS file for styling
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';

function UpdateInventory() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [clothTypes, setClothTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [filex, setFilex] = useState()
    const [imgUrl, setImgUrl] = useState('')
    const [imgCh, setImgCh] = useState(false)

    useEffect(() => {
        if(imgUrl.length) {
            console.log('Img received')
            axios.put(`${process.env.REACT_APP_API_HOST}/api/inventory/${id}`, formData)
            .then(res => {
                setError('')
                setSuccess('Inventory added successfully.')
                navigate('/viewallinventories')
            })
            .catch(err => console.log(err))
        }

    }, [imgUrl])

    useEffect(() => {


        const fetchInventoryItem = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/inventory/${id}`);

                const { age, clothType, color, colorCode, date, desc, gender, img, price, qty, supplier, _id} = response.data.inventoryItem;
                setFormData({ age, clothType, color, colorCode, date, desc, gender, img, price, qty, supplier, _id});
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch inventory item. Please try again.');
            }

            const fetchData = async () => {
                try {
                    const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/suppliers');
                    setSuppliers(response.data);


                    const types = response.data.map(supplier => supplier.clothType);
                    const uniqueTypes = [...new Set(types)];
                    setClothTypes(uniqueTypes);
                } catch (error) {
                    console.error('Error fetching cloth types:', error);
                    setError('Failed to fetch cloth types. Please try again.');
                }
            };
            fetchData();
        };
        fetchInventoryItem();
    }, [id]);

    useEffect(() => {
        if (formData.clothType) {
            const filtered = suppliers.filter(supplier => supplier.clothType === formData.clothType);
            setFilteredSuppliers(filtered);
        }
    }, [formData.clothType, suppliers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const updatedFormData = { ...formData, lastUpdated: currentDate };
            const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/inventory/${id}`, updatedFormData);
            console.log(response.data);
            setSuccess('Inventory item updated successfully.');
            setError('');
            // Add success message or redirect to another page
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update inventory item. Please try again.');
            setSuccess('');
        }
    };


    const handleSubmitN =(e)=> {
        e.preventDefault()

        if(imgCh == false) {
            console.log('img didnt changed')
            return setImgUrl(formData.img)
        }


        const reader = new FileReader()

        reader.readAsDataURL(filex)
  
        reader.onload = () => {
          axios.post(process.env.REACT_APP_API_HOST + '/api/upload', {img: reader.result})
          .then(res => {
            if(res.data.result.url !== '') {
                console.log(res.data.result.url)
                setFormData({ ...formData, ["img"]: res.data.result.url })
                setImgUrl(res.data.result.url)

            }
          })
          .catch(err => {
            setSuccess('')
            setError('An error occurred. Please try again later.')
        })
        }

    }
    return (
        <>

            <div className="mng-nav">
                <InventoryStockSupplierManHeaderN/>
            </div>
            <div className="mng-head">
                <h2 className="heading">Update Inventory</h2>
            </div>

                <div className="MngT-container">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmitN}>
                        <Row className="mb-4">
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="desc">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Enter Description" required className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="img">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" name="img" onChange={(e) => {
                                            setFilex(e.target.files[0])
                                            setImgCh(true)
                                            }}  className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                        </Row>
                                        
                        <Row className="mb-4">
                            <Col>
                                        
                                <Form.Group controlId="clothType">
                                    <Form.Label>Cloth Type</Form.Label>
                                    <Form.Select name="clothType" value={formData.clothType} onChange={handleChange} required className="custom-select">
                                        <option value="Blouse">Blouse</option>
                                        <option value="Skirt">Skirt</option>
                                        <option value="Frock">Frock</option>
                                        <option value="nightie">nightie</option>
                                        <option value="Jacket">Jacket</option>
                                        <option value="Shorts">Shorts</option>
                                        <option value="Jeans">Jeans</option>
                                        <option value="Shirt">Shirt</option>
                                        <option value="T-shirt">T-shirt</option>
                                        <option value="Coat">Coat</option>
                                        
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="color">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Enter Color" required className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                                        
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="colorCode">
                                        <Form.Label>Color Code</Form.Label>
                                        <Form.Control type="text" name="colorCode" value={formData.colorCode} onChange={handleChange} placeholder="Enter Color Code" required className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                                        
                        </Row>
                                        
                        <Row className="mb-4">
                            <Col>
                                <Form.Group controlId="gender">
                                    <Form.Label>Suitable Gender</Form.Label>
                                    <Form.Select name="gender" value={formData.gender} onChange={handleChange} required className="custom-select">
                                        <option value="">Suitable Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="age">
                                    <Form.Label>Suitable Age</Form.Label>
                                    <Form.Select name="age" value={formData.age} onChange={handleChange} required className="custom-select">
                                        <option value="">Suitable Age</option>
                                        <option value="Kids">Kids -- 5-12</option>
                                        <option value="Teenagers">Teenagers -- 13-19</option>
                                        <option value="Youngers">Youngers -- 20-29</option>
                                        <option value="Young Upper">Young Upper -- 30-39</option>
                                        <option value="Middlers">Middlers -- 40-49</option>
                                        <option value="Middle Upper">Middle Upper -- 50-69</option>
                                        <option value="Old Above">Old Above -- 70</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Enter Price" required className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Group controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Select name="supplier" value={formData.supplier} onChange={handleChange} required className="custom-select">
                                        <option value="">Supplier</option>
                                        {suppliers.map((sup) => {
                                            return <option key={sup._id} value={sup.supplierName}>{sup.supplierName}</option>
                                        })}

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="qty">
                                        <Form.Label>Qty</Form.Label>
                                        <Form.Control type="text" name="qty" value={formData.qty} onChange={handleChange} placeholder="Enter Qty" required className="custom-text-input" />
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Card.Body>
                                    <Form.Group controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}  required className="custom-text-input" max={new Date().toJSON().slice(0, 10)}/>
                                    </Form.Group>
                                </Card.Body>
                            </Col>
                        </Row>
                                    
                        <Row className="mb-4">
                            <Col className="text-center"> {/* Center the content */}
                            <Button variant="primary" type="submit" className="float-end">
                                Update Inventory
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
    </>
    );
}

export default UpdateInventory;