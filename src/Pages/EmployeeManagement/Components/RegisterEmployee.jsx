import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const RegisterEmployee = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////


  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Delivery Agent',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    // Clear validation error when user starts typing in the input field
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data before submission
      if (validateForm()) {
        const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/emp', employeeData, {headers: {
          'Authorization': 'bearer ' + authData.token
        }});
        // Reset form after successful submission
        setEmployeeData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        alert('Employee Registration Successfully');
        navigate("/empmanhome")
      }
    } catch (error) {
      alert('Unsuccess');
      console.error(error);
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

    // Validate password
    if (!employeeData.password.trim()) {
      errors.password = 'Password is required';
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
        <div className="mng-nav">
          <EmpManagementHeader/>
        </div>
        <div className="mng-head">
            <h2 className="heading">Employee Registration</h2>
        </div>
        <div className="MngT-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
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
                placeholder="Enter Last Name"
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
                placeholder="Enter Email"
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
                placeholder="Enter Phone Number"
                isInvalid={!!validationErrors.phone}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Position</Form.Label>
              <Form.Control as="select" name="role" value={employeeData.role} onChange={handleChange}>
                <option value="Delivery Agent">Delivery Agent</option>
                <option value="Inventory Clerk">Inventory Clerk</option>
                <option value="Distribution Supervisor">Distribution Supervisor</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Manager">Manager</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={employeeData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                isInvalid={!!validationErrors.password}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '25px' }}>
              Register
            </Button>
          </Form>
        </div>
      <EmpManagementFooter/>
    </div>
  );
};

export default RegisterEmployee;