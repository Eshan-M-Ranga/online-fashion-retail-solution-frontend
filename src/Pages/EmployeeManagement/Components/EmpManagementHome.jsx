import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import { AuthContext } from '../../../Context/AuthProvider';

const EmpManagementHome = () => {

  const navigate = useNavigate()
  const {auth, setAuth} = useContext(AuthContext)


  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
  return (
    <>
    <div className="mng-nav">
          <EmpManagementHeader/>
    </div>
    <div className="bg-image">
    <Container>
    <h2 className="custom-heading mt-4">Welcome to Employee Management</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://th.bing.com/th/id/R.bec2071ad2facb165133b3727f215b6b?rik=Zxu%2fGereqH8Lpg&pid=ImgRaw&r=0" />
            <Card.Body>
              <Card.Title>View All Employees</Card.Title>
              <Card.Text>View all registered employees.</Card.Text>
              <Link to="/employees">
                <Button variant="primary">View Employees</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.u_l5uS0k2z0PZG-tltdIyAHaFN?rs=1&pid=ImgDetMain" />
            <Card.Body>
              <Card.Title>View All Tasks</Card.Title>
              <Card.Text>View all tasks assigned to employees.</Card.Text>
              <Link to="/tasks">
                <Button variant="primary">View Tasks</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://th.bing.com/th/id/R.5bb0648d75f3a37f947a6634999e6330?rik=YiubZdq63ThyOA&pid=ImgRaw&r=0" />
            <Card.Body>
              <Card.Title>Employee Report</Card.Title>
              <Card.Text>Generate a report of all employees.</Card.Text>
              <Link to="/employeereport">
                <Button variant="primary">Generate Report</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    <EmpManagementFooter/>
    </>
  );
};

export default EmpManagementHome;