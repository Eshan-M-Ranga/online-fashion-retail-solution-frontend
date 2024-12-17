import React from 'react'
import { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import OrderManagementHeader from './OrderManagementHeader';

const OrderManagementHome = () => {
  return (
    <div>
      <div className="mng-nav">
          <OrderManagementHeader/>
      </div>
      <div className="bg-image">
    <Container>
    <h2 className="custom-heading mt-4">Welcome to Order Management</h2>
      <Row className="mt-4">
        <Col md={3} >
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964277/neworders_megljl.jpg" />
            <Card.Body>
              <Card.Title>View New Orders</Card.Title>
              <Card.Text style={{height: "50px"}}>View all new orders.</Card.Text>
              <Link to="/omneworders">
                <Button variant="primary">New Orders</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964325/oip_aai9by.jpg" />
            <Card.Body>
              <Card.Title>Orders in Processing</Card.Title>
              <Card.Text style={{height: "50px"}}>View all orders in processing stage.</Card.Text>
              <Link to="/omoip">
                <Button variant="primary">Orders in Processing</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964377/shipped_efxgps.jpg" />
            <Card.Body>
              <Card.Title>View Shipped Orders</Card.Title>
              <Card.Text style={{height: "50px"}}>View all shipped orders.</Card.Text>
              <Link to="/omshippedorders">
                <Button variant="primary">Shipped Orders</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964422/delivered_t2eh8g.jpg" />
            <Card.Body>
              <Card.Title>View delivered Orders</Card.Title>
              <Card.Text style={{height: "50px"}}>view all delivered orders.</Card.Text>
              <Link to="/omdeliveredorders">
                <Button variant="primary">Delivered Orders</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  )
}

export default OrderManagementHome
