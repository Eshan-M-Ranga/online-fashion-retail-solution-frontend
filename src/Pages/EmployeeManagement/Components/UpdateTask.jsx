import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';

const UpdateTask = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    assignedTo: '',
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/tasks/${id}`);
        setTaskData(taskResponse.data);

        const employeesResponse = await axios.get(process.env.REACT_APP_API_HOST + '/api/tasks');
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/tasks/${id}`, taskData);
      console.log(response.data);
      alert('Task Details Updated Successfully');
      navigate("/tasks")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <EmpManagementHeader/>
      <h2>Update Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Task Title</Form.Label>
          <Form.Control type="text" name="title" value={taskData.title} onChange={handleChange} placeholder="Enter task title" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Task Description</Form.Label>
          <Form.Control type="text" name="description" value={taskData.description} onChange={handleChange} placeholder="Enter task description" />
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
          <Form.Label>Assigned To</Form.Label>
          <Form.Control as="select" name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: "25px"}}>Update Task</Button>
      </Form>
      <EmpManagementFooter/>
    </div>
  );
};

export default UpdateTask;