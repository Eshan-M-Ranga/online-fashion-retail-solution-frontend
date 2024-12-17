import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Home.css';
import InventoryStockSupplierManHeaderN from './InventoryStockSupplierManHeaderN';

function InventoryStockSupplierManHome() {
    return (
        <Container>
        <div className="mng-nav">
            <InventoryStockSupplierManHeaderN/>
        </div>
            <Row className="mt-5">
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726963545/inventory_dijn4y.jpg" alt="Inventory" className="home-image" />
                        <Card.Body>
                            <Card.Title>Manage Your Inventory</Card.Title>
                            <Card.Text>
                                View, add, update, or delete inventory items.
                            </Card.Text>
                            <Link to="/viewallinventories">
                                <Button variant="primary">Go to Inventory</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726963941/supplier_nmmgew.jpg" alt="Suppliers" className="home-image" />
                        <Card.Body>
                            <Card.Title>Manage Your Suppliers</Card.Title>
                            <Card.Text>
                                Manage your supplier information and relationships.
                            </Card.Text>
                            <Link to="/viewallsuppliers">
                                <Button variant="primary">Go to Suppliers</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964031/stock_syesxb.jpg" alt="Stock" className="home-image" />
                        <Card.Body>
                            <Card.Title>Manage Your Stock</Card.Title>
                            <Card.Text>
                                Track and manage your stock levels.
                            </Card.Text>
                            <Link to="/viewallstocks">
                                <Button variant="primary">Go to Stock</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964088/report_mfk17h.jpg" alt="Reports" className="home-image" />
                        <Card.Body>
                            <Card.Title>View Reports</Card.Title>
                            <Card.Text>
                                Access various reports for insights into your business.
                            </Card.Text>
                            <Link to="/inventorystock">
                                <Button variant="primary">View Reports</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964136/sales_qr6kjf.png" alt="Sales Prediction" className="home-image" />
                        <Card.Body>
                            <Card.Title>Sales Prediction</Card.Title>
                            <Card.Text>
                                Get predictions for future sales.
                            </Card.Text>
                            <Link to="/analysis">
                                <Button variant="primary">Sales Prediction</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="text-center">
                    <Card>
                        <Card.Img variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964184/chart_fbq7hq.jpg" alt="Charts" className="home-image" />
                        <Card.Body>
                            <Card.Title>View Charts</Card.Title>
                            <Card.Text>
                                Visualize your data with interactive charts.
                            </Card.Text>
                            <Link to="/chart">
                                <Button variant="primary">View Charts</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default InventoryStockSupplierManHome;