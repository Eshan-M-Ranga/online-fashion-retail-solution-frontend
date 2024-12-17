import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////

  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('Present'); // Default status is Present

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/emp', {headers: {
          'Authorization': 'bearer ' + authData.token
        }});
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, [authData]);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/attendance', { employeeId, status });
      console.log(response.data);
      // Reset form after successful submission
      setEmployeeId('');
      setStatus('Present');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mng-nav">
        <EmpManagementHeader/>
      </div>
      <div className="mng-head">
          <h2 className="heading">Record Attendance</h2>
      </div>
      <div className="MngT-container">
      <Form onSubmit={handleSubmit}>
         <img src={'https://t3.ftcdn.net/jpg/01/25/05/50/360_F_125055050_loLfRxF2fJi5Ge0t49jmaIMBUhlmchwE.jpg'} alt="Employee" style={{ width: '200px', marginBottom: '20px' }} />
        <Row className="mb-3">
          <Form.Group as={Col} controlId="employeeId">
            <Form.Label>Select Employee:</Form.Label>
            <Form.Control as="select" value={employeeId} onChange={handleEmployeeIdChange}>
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control as="select" value={status} onChange={handleStatusChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Record Attendance
        </Button>
      </Form>
      </div>
    <EmpManagementFooter/>
    </>
  );
};

export default Attendance;