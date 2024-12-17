import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EmpManagementHeader from './EmpManagementHeader';
import EmpManagementFooter from './EmpManagementFooter';
import ViewTkRw from './ViewTkRw';
import { AuthContext } from '../../../Context/AuthProvider';

const ViewAllTasks = () => {

  const {auth} = useContext(AuthContext)
  const [authData, setAuthData] = useState({})
  useEffect(()=>{setAuthData(auth)},[auth])

  const navigate = useNavigate()
  useEffect(()=>{
    //if(!auth.role && auth.role !== "Manager" && auth.role !== "HR Manager") return navigate('/employeelogin')
  },[auth])
////////////////////////////////////

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_HOST + '/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    console.log('Delete task with ID:', taskId);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/tasks/${taskId}`);
      console.log(response.data);
      // Update tasks list after deletion
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert('Task Deleted Successfully');
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
          <h2 className="heading">All Tasks</h2>
        </div>
        <div className="Mng-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (<tr key={task._id}>
                  <td className="text-capitalize">{task.title}</td>
                  <td className="text-capitalize">{task.description}</td>
                  <td className="text-capitalize">{task.status}</td>
                  <ViewTkRw id={task.assignedTo} />
                  <td>
                    <Link to={`/tasks/update/${task._id}`}>
                      <Button variant="primary">Update</Button>
                    </Link>
                    {' '}
                    <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
                  </td>

                </tr>)
              })}
            </tbody>
          </Table>
        </div>
      <EmpManagementFooter/>
    </div>
  );
};

export default ViewAllTasks;