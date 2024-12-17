import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmpManagementHeader = () => {

  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={()=> navigate('/empmanhome')} style={{cursor: "pointer"}} >Employee & Task Management </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={()=> navigate('/empregister')} >Register Employee</Nav.Link>
          <Nav.Link onClick={()=> navigate('/employees')} >View Employees</Nav.Link>
          <Nav.Link onClick={()=> navigate('/tasks/add')} >Add Task</Nav.Link>
          <Nav.Link onClick={()=> navigate('/tasks')} >View Tasks</Nav.Link>
          <Nav.Link onClick={()=> navigate('/attendance')} >Record Attendance</Nav.Link>
          <Nav.Link onClick={()=> navigate('/employeereport')} >Employee Report</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EmpManagementHeader;