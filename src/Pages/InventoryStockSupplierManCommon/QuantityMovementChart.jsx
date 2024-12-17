import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { Bar } from 'react-chartjs-2';
import './QuantityMovementChart.css';
import Chart from 'chart.js/auto';

function QuantityMovementChart() {
    const [inventoryData, setInventoryData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const componentRef = useRef();
    const chartRef = useRef(); // Add chart reference

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryResponse = await axios.get('http://localhost:5000/api/inventory');
                setInventoryData(inventoryResponse.data);

                const stockResponse = await axios.get('http://localhost:5000/api/stock');
                setStockData(stockResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy existing chart if it exists
        }

        const canvas = componentRef.current.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: inventoryData.map(item => item.clothType),
                datasets: [
                    {
                        label: 'Full Quantity',
                        data: inventoryData.map(item => item.quantity),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Current Quantity',
                        data: inventoryData.map(item => calculateCurrentQuantity(item.clothId)),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [inventoryData, stockData]);

    const calculateCurrentQuantity = (clothId) => {
        const clothStockEntries = stockData.filter(entry => entry.clothId === clothId);
        const totalStockQuantity = clothStockEntries.reduce((total, entry) => total + entry.quantity, 0);
        const inventoryEntry = inventoryData.find(entry => entry.clothId === clothId);
        const currentQuantity = inventoryEntry.quantity - totalStockQuantity;
        return currentQuantity;
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container className="container" style={{ marginBottom: "25px" }}>
            <h2 className="heading">Inventory & Stock Visualization</h2>
            <div ref={componentRef}>
                <div className="chart-container">
                    <canvas id="quantity-movement-chart" />
                </div>
            </div>
            <div className="button-container">
                <Button onClick={handlePrint}>Download as PDF</Button>
            </div>
        </Container>
    );
}

export default QuantityMovementChart;