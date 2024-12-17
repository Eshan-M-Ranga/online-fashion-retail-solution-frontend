import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const EmployeeReport = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////

  const [employees, setEmployees] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/emp', {headers: {
          'Authorization': 'bearer ' + authData.token
        }});
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error.message);
        // You can add code to show an error message to the user
      }
    };
    fetchSuppliers();
  }, [authData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <div className="mng-nav">
      <EmpManagementHeader/>
    </div>
    <div className="mng-head">
        <h2 className="heading">Employee Report</h2>
    </div>
    
    <div className="Mng-container">
      <div ref={componentRef}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Basic salary</th>
            <th>OT Rate</th>
            <th>Total OT</th>
            <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="text-capitalize">{employee.firstName}</td>
                <td className="text-capitalize">{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.salary}</td>
                <td>{employee.otrate}</td>
                <td>{employee.totalot}</td>
                <td>{employee.totalsalary}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="button-container">
        <Button onClick={handlePrint}>Download as PDF</Button>
      </div>
    </div>
    <EmpManagementFooter/>
    </>
  );
};

export default EmployeeReport;