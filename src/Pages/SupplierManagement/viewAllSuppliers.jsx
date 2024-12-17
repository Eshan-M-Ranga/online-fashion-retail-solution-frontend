import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import './ViewAllSuppliers.css'; // Import custom CSS file for styling
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';
import { useReactToPrint } from 'react-to-print';

function ViewAllSuppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const componentRef = useRef();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/api/suppliers/${id}`);
            setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updatesupplier/${id}`);
    };

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
    };

    // Filter suppliers based on search term
    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.clothType.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <>
        <div className="mng-nav">
            <InventoryStockSupplierManHeaderN/>
        </div>
        <div className="mng-head">
            <h2 className="heading">View All Suppliers</h2>
        </div>

        <div className="MngFV-container">
            
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by Supplier Name or Cloth Type"
                    aria-label="Search by Supplier Name or Cloth Type"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>
            <div ref={componentRef}>
            <Table className="suppliers-table">
                <thead>
                    <tr>
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Contact Info</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers.map(supplier => (
                        <tr key={supplier._id}>
                            <td>{supplier._id}</td>
                            <td className="text-capitalize">{supplier.supplierName}</td>
                            <td>{supplier.contactInfo}</td>
                            <td className="text-capitalize">{supplier.address}</td>
                            <td>
                                <Button variant="primary" className="update-btn" onClick={() => handleUpdate(supplier._id)}>Update</Button>
                                <Button variant="danger" className="delete-btn" onClick={() => handleDelete(supplier._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <div className="button-container">
                <Button onClick={handlePrint}>Download as PDF</Button>
            </div>
        </div>
        </>
    );
}

export default ViewAllSuppliers;