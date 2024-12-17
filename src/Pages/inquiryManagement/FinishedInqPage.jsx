import React, { useEffect, useRef, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import InqManagementNav from './InqManagementNav';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const FinishedInqPage = () => {

    const [inquiry, SetInquire] = useState([])

    const componentRef = useRef()

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/inquiry/getallbystate', {state: 'finished'})
        .then(res => SetInquire(res.data))
        .catch(err => console.log(err))

    },[])

    const changeState = (inqId) => {
        console.log(inqId)
    
        axios.patch(process.env.REACT_APP_API_HOST + '/api/inquiry/updateinqbyid', {_id: inqId, state: "new"})
        .then(res => SetInquire(inquiry.filter((inquiry) => inquiry._id !== inqId)))
        .catch(err => console.log(err))
        
      }

      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })


  return (
    <div>
      <div className="mng-nav">
            <InqManagementNav/>
        </div>
        <div className="mng-head">
            <h2 className="heading">Finished Inquires</h2>
        </div>
        <div className="Mng-container">
        <div ref={componentRef}>
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>Inquire Id</th>
                <th>Name</th>
                <th>Inquiry</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Move to</th>
              </tr>
            </thead>
            <tbody>
            {
                inquiry.map((item, i) => {
                    return (<tr key={i}>
                        <td>{item._id}</td>
                        <td className="text-capitalize">{item.name}</td>
                        <td>{item.inquiry}</td>
                        <td>{item.phoneNum}</td>
                        <td className="text-capitalize">{item.state}</td>
                        <td>
                          <Button variant="primary" onClick={() => changeState(item._id)}  >New State</Button>
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

export default FinishedInqPage
