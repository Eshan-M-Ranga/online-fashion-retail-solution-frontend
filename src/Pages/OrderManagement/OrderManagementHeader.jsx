import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderManagementHeader = () => {

    const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={()=> navigate('/omh')} style={{cursor: "pointer"}} >Order Management </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={()=> navigate('/omneworders')} >New Orders</Nav.Link>
          <Nav.Link onClick={()=> navigate('/omoip')} >Orders in Processing</Nav.Link>
          <Nav.Link onClick={()=> navigate('/omshippedorders')} >Shipped Orders</Nav.Link>
          <Nav.Link onClick={()=> navigate('/omdeliveredorders')} >Delivered Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default OrderManagementHeader
