import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import OrderManagementHeader from './OrderManagementHeader';
import { useReactToPrint } from 'react-to-print';

const OrdersInProgress = () => {

  const [order, setOrder] = useState([])

  const componentRef = useRef()

  useEffect(()=>{
    axios.post(process.env.REACT_APP_API_HOST + '/api/order/getorders',{status : 'processing'})
    .then(res=> setOrder(res.data.response))
    .catch(err=> console.log(err))

  },[])

  const changeStateShipped = (orderId) => {
    console.log(orderId)

    axios.patch(process.env.REACT_APP_API_HOST + '/api/order/updateordersatebyorderid', {_id: orderId, status: "shipped"})
    .then(res => setOrder(order.filter((order) => order._id !== orderId)))
    .catch(err => console.log(err))
    
  }
  const changeStateNew = (orderId) => {
    console.log(orderId)

    axios.patch(process.env.REACT_APP_API_HOST + '/api/order/updateordersatebyorderid', {_id: orderId, status: "new"})
    .then(res => setOrder(order.filter((order) => order._id !== orderId)))
    .catch(err => console.log(err))
    
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })


  return (
    <div>
        <div className="mng-nav">
          <OrderManagementHeader/>
        </div>
        <div className="mng-head">
            <h2 className="heading">Orders in Processing</h2>
        </div>
      <div className="Mng-container">
        <div ref={componentRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Id</th>
              <th>Size</th>
              <th>Color</th>
              <th>Qty</th>
              <th>Address</th>
              <th>State</th>
              <th>Move to</th>
              <th>Move to</th>
            </tr>
          </thead>
          <tbody>
          {
              order.map((item, i) => {
                return (<tr key={i}>
                <td>{item._id}</td>
                <td>{item.pid}</td>
                <td className="text-capitalize">{item.size}</td>
                <td className="text-capitalize">{item.color}</td>
                <td>{item.qty}</td>
                <td className="text-capitalize">{item.address}</td>
                <td className="text-capitalize">{item.status}</td>
                <td>
                  <Button variant="primary" onClick={() => changeStateNew(item._id)}>New State</Button>
                </td>
                <td>
                <Button variant="danger" onClick={() => changeStateShipped(item._id)}>Shipped State</Button>
                </td>
              </tr>)
              })
            }
          </tbody>
        </Table>
        </div>
        <div className="button-container">
          <Button onClick={handlePrint}>Download as PDF</Button>
        </div>
      </div>
    </div>
  )
}

export default OrdersInProgress
