import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';
import './SalesProjectionAnalysis.css'; // Import custom CSS file for styling

function SalesProjectionAnalysis() {
    const [salesData, setSalesData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [projection, setProjection] = useState(null);
    const [quantityLeft, setQuantityLeft] = useState(null);
    const [newSuppliersCount, setNewSuppliersCount] = useState(null);
    const [clothTypesData, setClothTypesData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Fetch sales data
        axios.get('http://localhost:5000/api/inventory')
            .then(response => {
                setSalesData(response.data);
            })
            .catch(error => {
                console.error('Error fetching sales data:', error);
            });

        // Fetch stock data
        axios.get('http://localhost:5000/api/stock')
            .then(response => {
                setStockData(response.data);
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
            });

        // Fetch supplier data
        axios.get('http://localhost:5000/api/suppliers')
            .then(response => {
                setSupplierData(response.data);
            })
            .catch(error => {
                console.error('Error fetching supplier data:', error);
            });
    }, []);

    useEffect(() => {
        if (salesData.length > 0 && stockData.length > 0 && supplierData.length > 0) {
            // Perform analysis and generate projection
            const projection = generateSalesProjection(salesData, stockData, supplierData);
            setProjection(projection);

            // Additional analysis
            const quantityLeftAfterThreeMonths = calculateQuantityLeftAfterThreeMonths(stockData);
            setQuantityLeft(quantityLeftAfterThreeMonths);

            const newSuppliers = countNewSuppliers(supplierData);
            setNewSuppliersCount(newSuppliers);

            const clothTypes = calculateClothTypeData(salesData, supplierData);
            setClothTypesData(clothTypes);

            // Check if projection is low and trigger alert if true
            if (projection !== null && projection < 100) { // Adjust threshold as needed
                setShowAlert(true);
            } else {
                setShowAlert(false);
            }
        }
    }, [salesData, stockData, supplierData]);

    // Function to generate sales projection
    const generateSalesProjection = (salesData, stockData, supplierData) => {
        // Your analysis and projection generation logic here

        // For demonstration, let's say we simply sum up past sales to get a rough projection
        const pastSales = salesData.reduce((total, item) => total + item.quantity, 0);

        // Consider current stock levels and supplier information to adjust projection
        const currentStock = stockData.reduce((total, item) => total + item.quantity, 0);
        const supplierCapacity = supplierData.reduce((total, item) => total + item.quantity, 0);

        // Adjust projection based on stock and supplier capacity
        let adjustedProjection = pastSales + currentStock + supplierCapacity;

        return adjustedProjection;
    };

    // Function to calculate quantity left after three months
    const calculateQuantityLeftAfterThreeMonths = (stockData) => {
        // Your calculation logic here

        // For demonstration, let's say we subtract 20% of current stock as an estimate
        const currentStock = stockData.reduce((total, item) => total + item.quantity, 0);
        const quantityLeft = currentStock * 0.8; // 20% reduction
        return quantityLeft;
    };

    // Function to count new suppliers
    const countNewSuppliers = (supplierData) => {
        // Your calculation logic here

        // For demonstration, let's say we count the number of suppliers added in the last three months
        const currentDate = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const newSuppliers = supplierData.filter(item => new Date(item.dateSupplied) > threeMonthsAgo);
        return newSuppliers.length;
    };

    // Function to calculate cloth types data
    const calculateClothTypeData = (salesData, supplierData) => {
        // Your calculation logic here

        const clothTypesData = [];

        // Group sales data by cloth type
        const groupedSalesData = salesData.reduce((acc, curr) => {
            acc[curr.clothType] = (acc[curr.clothType] || 0) + curr.quantity;
            return acc;
        }, {});

        // Group supplier data by cloth type
        const groupedSupplierData = supplierData.reduce((acc, curr) => {
            acc[curr.clothType] = (acc[curr.clothType] || 0) + curr.quantity;
            return acc;
        }, {});

        // Calculate quantity in next three months and supplier count in next three months for each cloth type
        for (let clothType in groupedSalesData) {
            const quantityInNextThreeMonths = groupedSalesData[clothType];
            const supplierCountInNextThreeMonths = groupedSupplierData[clothType] || 0;
            clothTypesData.push({
                clothType,
                quantityInNextThreeMonths,
                supplierCountInNextThreeMonths
            });
        }

        return clothTypesData;
    };

    return (
        <div className="sales-analysis-container">
          <h2 className="heading">Sales Projection Analysis</h2>
          {showAlert ? (
            <div className="alert alert-low">
              <p>Low sales projection - High Risk</p>
            </div>
          ) : (
            <div className="alert alert-normal">
              <p>Low sales projection - Low Risk</p>
            </div>
          )}
          <div className="card-container">
            <Card>
              <Card.Body>
                <Card.Title>Projected Sales for 3 Months</Card.Title> {/* Change here */}
                <Card.Text>{projection}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Quantity Left After Three Months</Card.Title>
                <Card.Text>{quantityLeft}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>New Suppliers Added in Last Three Months</Card.Title>
                <Card.Text>{newSuppliersCount}</Card.Text>
              </Card.Body>
            </Card>
            <div className="full-width-card table-container">
              <h3>Cloth Types Analysis</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Cloth Type</th>
                    <th>Quantity in Next Three Months</th>
                    <th>Supplier Count in Next Three Months</th>
                  </tr>
                </thead>
                <tbody>
                  {clothTypesData.map((clothTypeData, index) => (
                    <tr key={index}>
                      <td>{clothTypeData.clothType}</td>
                      <td>{clothTypeData.quantityInNextThreeMonths}</td>
                      <td>{clothTypeData.supplierCountInNextThreeMonths}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      );       
                  }      

export default SalesProjectionAnalysis;