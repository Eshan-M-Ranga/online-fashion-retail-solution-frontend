import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import './InventoryStockReport.css'; // Import custom CSS file for styling

function InventoryStockReport() {
    const [inventoryData, setInventoryData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch inventory data
                const inventoryResponse = await axios.get('http://localhost:5000/api/inventory');
                setInventoryData(inventoryResponse.data);

                // Fetch stock data
                const stockResponse = await axios.get('http://localhost:5000/api/stock');
                setStockData(stockResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate current quantity for each cloth item
    const calculateCurrentQuantity = (clothId) => {
        // Find the stock entries for the given clothId
        const clothStockEntries = stockData.filter(entry => entry.clothId === clothId);
        // Sum up the quantities from all stock entries
        const totalStockQuantity = clothStockEntries.reduce((total, entry) => total + entry.quantity, 0);
        // Find the inventory entry for the given clothId
        const inventoryEntry = inventoryData.find(entry => entry.clothId === clothId);
        // Calculate the current quantity by subtracting stock quantity from inventory quantity
        const currentQuantity = inventoryEntry.quantity - totalStockQuantity;
        return currentQuantity;
    };

    // Function to generate PDF
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container className="report-container">
            <h2 className="heading">Inventory & Stock Report</h2>
            <div ref={componentRef}>
                <Table striped bordered hover>
                    <thead className="table-header">
                        <tr>
                            <th>Cloth ID</th>
                            <th>Cloth Type</th>
                            <th>Full Quantity</th>
                            <th>Current Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map(item => (
                            <tr key={item.clothId} className="table-row">
                                <td>{item.clothId}</td>
                                <td>{item.clothType}</td>
                                <td>{item.quantity}</td>
                                <td>{calculateCurrentQuantity(item.clothId)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="button-container">
                <Button onClick={handlePrint}>Download as PDF</Button>
            </div>
        </Container>
    );
}

export default InventoryStockReport;