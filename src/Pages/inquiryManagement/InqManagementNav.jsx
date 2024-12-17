import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const InqManagementNav = () => {

    const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={()=> navigate('/inqhome')} style={{cursor: "pointer"}} >Inquiry Management </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={()=> navigate('/newinq')} >New Inquires</Nav.Link>
          <Nav.Link onClick={()=> navigate('/finishedinq')} >Finished Inquires</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default InqManagementNav
