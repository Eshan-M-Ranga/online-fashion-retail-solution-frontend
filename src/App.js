import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Product from './Pages/UserManagement/Product';
import View from './Pages/UserManagement/View';
import Register from './Pages/UserManagement/Register';
import Order from './Pages/UserManagement/Order';
import UserProfile from './Pages/feedbackManagement/UserProfile';
import HomeTest from './Pages/UserManagement/HomeTest';
import Review from './Pages/feedbackManagement/Review';
import EmployeeLogin from './Pages/EmployeeManagement/Components/EmployeeLogin';
import EmpManagementHome from './Pages/EmployeeManagement/Components/EmpManagementHome';
import ViewAllEmployees from './Pages/EmployeeManagement/Components/ViewAllEmployees';
import UpdateEmployee from './Pages/EmployeeManagement/Components/UpdateEmployee';
import EmployeeReport from './Pages/EmployeeManagement/Components/EmployeeReport';
import AddTask from './Pages/EmployeeManagement/Components/AddTask';
import ViewAllTasks from './Pages/EmployeeManagement/Components/ViewAllTasks';
import UpdateTask from './Pages/EmployeeManagement/Components/UpdateTask';
import Attendance from './Pages/EmployeeManagement/Components/Attendance';
import RegisterEmployee from './Pages/EmployeeManagement/Components/RegisterEmployee';
import { useState } from 'react';
import OrderManagementHome from './Pages/OrderManagement/OrderManagementHome';
import NewOrders from './Pages/OrderManagement/NewOrders';
import OrdersInProgress from './Pages/OrderManagement/OrdersInProgress';
import ShippedOrders from './Pages/OrderManagement/ShippedOrders';
import DeliveredOrders from './Pages/OrderManagement/DeliveredOrders';
import InventoryStockSupplierManHome from './Pages/InventoryStockSupplierManCommon/InventoryStockSupplierManHome';
import InventoryStockReport from './Pages/InventoryStockSupplierManCommon/InventoryStockReport';
import QuantityMovementChart from './Pages/InventoryStockSupplierManCommon/QuantityMovementChart';
import SalesProjectionAnalysis from './Pages/InventoryStockSupplierManCommon/SalesProjectionAnalysis';
import AddInventory from './Pages/InventoryManagement/addInventory';
import ViewAllInventories from './Pages/InventoryManagement/viewAllInventories';
import ViewInventory from './Pages/InventoryManagement/ViewInventory';
import UpdateInventory from './Pages/InventoryManagement/updateInventory';
import AddSupplier from './Pages/SupplierManagement/addSupplier';
import ViewAllSuppliers from './Pages/SupplierManagement/viewAllSuppliers';
import ViewSupplier from './Pages/SupplierManagement/viewSupplier';
import UpdateSupplier from './Pages/SupplierManagement/updateSupplier';
import AddStock from './Pages/StockManagement/addStock';
import ViewAllStocks from './Pages/StockManagement/viewAllStocks';
import ViewStock from './Pages/StockManagement/viewStock';
import UpdateStock from './Pages/StockManagement/updateStock';
import Login from './Pages/UserManagement/Login';
import AddInquiry from './Pages/inquiryManagement/AddInquiry';
import NewInqPage from './Pages/inquiryManagement/NewInqPage';
import FinishedInqPage from './Pages/inquiryManagement/FinishedInqPage';
import InqManagementHome from './Pages/inquiryManagement/InqManagementHome';
import NaviTest from './Pages/UserManagement/NaviTest';
import Cart from './Pages/UserManagement/Cart';

function App() {


  
  const [data, setData] = useState('')
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<HomeTest/>} />
        <Route path='/mens' element={<Product category='Male' />} />
        <Route path='/womens' element={<Product category='Female' />} />
        <Route path='/kids' element={<Product category='kids' />} />
        <Route path='/view' element={<View/>} >
          <Route path=':pid' element={<View/>} />
        </Route>

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<Order/>} />

        <Route path='/omh' element={<OrderManagementHome/>} />
        <Route path='/omneworders' element={<NewOrders/>} />
        <Route path='/omoip' element={<OrdersInProgress/>} />
        <Route path='/omshippedorders' element={<ShippedOrders/>} />
        <Route path='/omdeliveredorders' element={<DeliveredOrders/>} />

        <Route path='/up' element={<UserProfile/>} />
        <Route path='/review' element={<Review/>} />
        <Route path='/navitest' element={<NaviTest/>}>
          <Route path=':pid' element={<NaviTest/>} />
        </Route>

        {/*Shehan*/}
        <Route path='/inqhome' element={<InqManagementHome/>} />
        <Route path='/inq' element={<AddInquiry/>} />
        <Route path='/newinq' element={<NewInqPage/>} />
        <Route path='/finishedinq' element={<FinishedInqPage/>} />
        

        {/*Hirushi */}
        <Route path='/employeelogin' element={<EmployeeLogin data={data} setData={setData} />} />
        <Route exact path="/empmanhome" element={<EmpManagementHome data={data} setData={setData} />} />
        <Route exact path="/employees" element={<ViewAllEmployees/>} />
        <Route exact path="/employees/update/:id" element={<UpdateEmployee/>} />
        <Route exact path="/tasks/add" element={<AddTask/>} />
        <Route exact path="/tasks" element={<ViewAllTasks/>} />
        <Route exact path="/tasks/update/:id" element={<UpdateTask />} />
        <Route exact path="/empregister" element={<RegisterEmployee />} />
        {/* Route for recording attendance */}
        <Route exact path="/employeereport" element={<EmployeeReport/>} />
        <Route exact path="/attendance" element={<Attendance />} />




        {/*Chanduka*/}
      

       
        {/* Other routes */}
        <Route path="/issmanhome" element={<InventoryStockSupplierManHome/>} />
        <Route path="/inventorystock" element={<InventoryStockReport/>} />
        <Route path="/chart" element={<QuantityMovementChart/>} />
        <Route path="/analysis" element={<SalesProjectionAnalysis/>} />


        {/* Inventory Routes */}
        <Route path="/addinventory" element={<AddInventory/>} />
        <Route path="/viewallinventories" element={<ViewAllInventories />} />
        <Route path="/viewinventory/:id" element={<ViewInventory />} />
        <Route path="/updateinventory/:id" element={<UpdateInventory />} />

        {/* Supplier Routes */}
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/viewallsuppliers" element={<ViewAllSuppliers />} />
        <Route path="/viewsupplier/:id" element={<ViewSupplier />} />
        <Route path="/updatesupplier/:id" element={<UpdateSupplier />} />

      
        {/* Stock Routes */}
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/viewallstocks" element={<ViewAllStocks />} />
        <Route path="/viewstock/:id" element={<ViewStock />} />
        <Route path="/updatestock/:id" element={<UpdateStock />} />

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
