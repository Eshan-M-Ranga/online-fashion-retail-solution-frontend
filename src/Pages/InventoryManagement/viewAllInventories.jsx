import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import './ViewAllInventories.css'; // Import custom CSS file for styling
import InventoryStockSupplierManHeaderN from '../InventoryStockSupplierManCommon/InventoryStockSupplierManHeaderN';
import { useReactToPrint } from 'react-to-print';

function ViewAllInventories() {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const componentRef = useRef();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/inventory');
                setInventory(response.data);
                //console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchInventory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/api/inventory/${id}`);
            setInventory(prevInventory => prevInventory.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updateinventory/${id}`);
    };

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
    };

    // Filter inventory based on search term
    {/*const filteredInventory = inventory.filter(item =>
        item.clothType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );*/}


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <div>
            <div className="mng-nav">
                <InventoryStockSupplierManHeaderN/>
            </div>
            <div className="mng-head">
                <h2 className="heading">View All Inventories</h2>
            </div>
            <div className="Mng-container">
            <Form className="search-bar" style={{margin: "20px"}}>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search by Cloth Type or Supplier"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </Form>
            <div ref={componentRef}>
            <Table className="inventory-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Type</th>
                        <th>Price</th>
                        <th>Supplier</th>
                        <th>Quentity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td className="text-capitalize">{item.clothType}</td>
                            <td>{item.price}</td>
                            <td className="text-capitalize">{item.supplier}</td>
                            <td>{item.colorData.map(itm => {return (<p className="text-capitalize">{itm.color}: {itm.qty}</p>)})}</td>
                            <td>
                                <Button variant="primary" className="update-btn" onClick={() => handleUpdate(item._id)}>Update</Button>
                                <Button variant="danger" className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</Button>
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
        </div>
    );
}

export default ViewAllInventories;