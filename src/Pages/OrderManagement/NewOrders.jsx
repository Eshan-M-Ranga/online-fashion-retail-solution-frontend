import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import OrderManagementHeader from './OrderManagementHeader';
import { useReactToPrint } from 'react-to-print';

const NewOrders = () => {

  const [order, setOrder] = useState([])

  const componentRef = useRef()

  useEffect(()=>{
    axios.post(process.env.REACT_APP_API_HOST + '/api/order/getorders',{status : 'new'})
    .then(res=> setOrder(res.data.response))
    .catch(err=> console.log(err))

  },[])

  const changeState = (orderId) => {
    console.log(orderId)

    axios.patch(process.env.REACT_APP_API_HOST + '/api/order/updateordersatebyorderid', {_id: orderId, status: "processing"})
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
            <h2 className="heading">New Orders</h2>
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
                <th>State</th>
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
                  <td className="text-capitalize">{item.status}</td>
                  <td>
                    <Button variant="primary" onClick={() => changeState(item._id)}>Processing State</Button>
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

export default NewOrders
