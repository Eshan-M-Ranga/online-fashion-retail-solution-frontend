import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InqManagementNav from './InqManagementNav';


const InqManagementHome = () => {
  return (
<div>

        <div className="mng-nav">
          <InqManagementNav/>
        </div>
      <div className="bg-image">
    <Container>
    <h2 className="custom-heading mt-4">Welcome to Inqury Management</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964377/shipped_efxgps.jpg" />
            <Card.Body>
              <Card.Title>View New Inquires</Card.Title>
              <Card.Text style={{height: "50px"}}>View all new inquires.</Card.Text>
              <Link to="/newinq">
                <Button variant="primary">New Inquires</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img style={{height: "200px"}} variant="top" src="https://res.cloudinary.com/dkrnap1pq/image/upload/v1726964422/delivered_t2eh8g.jpg"/>
            <Card.Body>
              <Card.Title>View Finished Inquires</Card.Title>
              <Card.Text style={{height: "50px"}}>view all finished inquires.</Card.Text>
              <Link to="/finishedinq">
                <Button variant="primary">Finished Inquires</Button>
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

export default InqManagementHome
