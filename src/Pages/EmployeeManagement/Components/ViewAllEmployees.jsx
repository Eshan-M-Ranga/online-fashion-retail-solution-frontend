import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { AuthContext } from '../../../Context/AuthProvider';

const ViewAllEmployees = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/emp', {headers: {
              'Authorization': 'bearer ' + authData.token
            }});
            setEmployees(response.data);
          } catch (error) {
            if(error.response.data.error == 'TokenExpiredError'){
              axios.get(process.env.REACT_APP_API_HOST + '/api/auth/getrefreshtoken')
              .then(res => console.log(res))
              .catch(err => console.log(err))
            }
          }
        

      };
      fetchData();
    


  }, [authData]);

  const handleDelete = async (id) => {
    console.log('Delete employee with ID:', id);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/emp/${id}`, {headers: {
        'Authorization': 'bearer ' + authData.token
      }});
      console.log(response.data);
      setEmployees(employees.filter((employee) => employee._id !== id));
      alert('Employee Details Deleted Successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className="mng-nav">
          <EmpManagementHeader/>
        </div>
        <div className="mng-head">
            <h2 className="heading">All Employees</h2>
        </div>
        <div className="Mng-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Basic Salary</th> {/* Added Salary column */}
                <th>OT Rate</th>
                <th>Total OT</th>
                <th>Total Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="text-capitalize">{employee.firstName}</td>
                  <td className="text-capitalize">{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td className="text-capitalize">{employee.role}</td>
                  <td>{employee.salary}</td> {/* Displaying Salary */}
                  <td>{employee.otrate}</td>
                  <td>{employee.totalot}</td>
                  <td>{employee.totalsalary}</td>
                  <td>
                  <Link to={`/employees/update/${employee._id}`}>
                      <Button variant="primary">Update</Button>
                    </Link>{' '}
                    <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      <EmpManagementFooter/>
    </div>
  );
};

export default ViewAllEmployees;