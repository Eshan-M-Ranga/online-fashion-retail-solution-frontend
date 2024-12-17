import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';

const UpdateEmployee = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    salary: '',
    otrate: '',
    totalot: 0,
    totalsalary: 0,
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/emp/${id}`);
        setEmployeeData(response.data);
      } catch (error) {
        setError('Error fetching employee data');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    // Clear validation error when user starts typing in the input field
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (validateForm()) {
      // Calculate total OT and total salary based on OT rate and salary
      const otRate = parseFloat(employeeData.otrate);
      const salary = parseFloat(employeeData.salary);
      const totalOT = isNaN(otRate) || isNaN(salary) ? 0 : otRate + salary;
      const totalSalary = isNaN(totalOT) ? 0 : totalOT + salary;

      const updatedEmployeeData = {
        ...employeeData,
        totalot: totalOT,
        totalsalary: totalSalary,
      };

      try {
        const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/emp/${id}`, updatedEmployeeData);
        console.log(response.data);
        alert('Employee Details Updated Successfully');
        navigate("/employees")
      } catch (error) {
        setError('Error updating employee details. Please try again.');
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate first name
    if (!employeeData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    // Validate last name
    if (!employeeData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    // Validate email
    if (!employeeData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(employeeData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate phone
    if (!employeeData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(employeeData.phone.trim())) {
      errors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <EmpManagementHeader/>
      <h2>Update Employee</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            isInvalid={!!validationErrors.firstName}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.firstName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            isInvalid={!!validationErrors.lastName}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.lastName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            placeholder="Enter email"
            isInvalid={!!validationErrors.email}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={employeeData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            isInvalid={!!validationErrors.phone}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="salary">
          <Form.Label>Basic Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            value={employeeData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            isInvalid={!!validationErrors.salary}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.salary}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="otrate">
          <Form.Label>OT Rate (%)</Form.Label>
          <Form.Control
            type="text"
            name="otrate"
            value={employeeData.otrate}
            onChange={handleChange}
            placeholder="Enter OT rate"
            isInvalid={!!validationErrors.otrate}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.otrate}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '25px' }}>
          Update Employee
        </Button>
      </Form>
      <EmpManagementFooter/>
    </div>
  );
};

export default UpdateEmployee;