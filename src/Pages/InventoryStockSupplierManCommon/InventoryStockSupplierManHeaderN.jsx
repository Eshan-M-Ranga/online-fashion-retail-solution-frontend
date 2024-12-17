import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // Import your CSS file for custom styles

const InventoryStockSupplierManHeaderN = () => {
    return (
        <Navbar expand="lg" className="custom-navbar bg-body-tertiary"style={{marginBottom: "70px"}}>
            <Navbar.Brand href="/issmanhome">Stock Supply & Inventory Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Supplier" id="basic-nav-dropdown-supplier">
                  <NavDropdown.Item as={Link} to="/addsupplier">Add Supplier</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/viewallsuppliers">View All Suppliers</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Inventory" id="basic-nav-dropdown-inventory">
                  <NavDropdown.Item as={Link} to="/addinventory">Add Inventory</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/viewallinventories">View All Inventories</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/chart">Visualization</Nav.Link>
                <Nav.Link as={Link} to="/analysis">Analysis Sales</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
}

export default InventoryStockSupplierManHeaderN
