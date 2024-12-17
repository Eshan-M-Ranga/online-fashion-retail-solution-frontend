import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const AddTask = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    assignedTo: '', // Employee ID for assignment
  });
  const [employees, setEmployees] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/tasks', taskData, {headers: {
        'Authorization': 'bearer ' + authData.token
      }});
      console.log(response.data);
      // Reset form fields after successful submission
      setTaskData({
        title: '',
        description: '',
        status: 'Todo',
        assignedTo: '',
      });
      alert('Task Added Successfully');
      navigate("/empmanhome")
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
            <h2 className="heading">Add Task</h2>
        </div>
        <div className="MngT-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={taskData.status} onChange={handleChange}>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="assignedTo">
              <Form.Label>Assign To</Form.Label>
              <Form.Control as="select" name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "25px"}}>
              Add Task
            </Button>
          </Form>
        </div>
      <EmpManagementFooter/>
    </div>
  );
};

export default AddTask;