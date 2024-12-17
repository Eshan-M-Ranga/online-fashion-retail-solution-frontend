import React, { useContext, useEffect, useState } from 'react'
import './Stylesheets/Cart.css'
import { useLocation, useNavigate } from 'react-router-dom';
import {AuthContext} from "../../Context/AuthProvider"
import axios from 'axios';
import CartRow from '../../Components/CartRow/CartRow';
import NavBarTest from '../../Components/NavBarTest/NavBarTest';

const Cart = () => {

  //const location = useLocation();
  // const {id, pid, size, color, qty} = location.state
  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()

  const [cartItem, setCartItem] = useState([])
  const [totalPrice, setPrice] = useState(0)
  const [selectedItem, setSelectedItem] = useState([])
  
  const [btnPresed, setBtnPresed] = useState(false)

  useEffect(()=>{

    if(auth.token == null) navigate("/login")
    else {
      axios.post(process.env.REACT_APP_API_HOST + '/api/cart/getcartitem', {id: auth.id})
      .then(res => {
        console.log(res.data.response)
        setCartItem(res.data.response)
    
      })
      .catch(err => console.log(err))
  }
  }, [])

  //useEffect(()=>{console.log(totalPrice)}, [totalPrice])
  //useEffect(()=>{console.log(selectedItem)}, [selectedItem])

  const handleCheckout = () => {

    setBtnPresed(true)
    if(selectedItem.length !== 0){
      navigate("/order",{state:{totalPrice, selectedItem}})
    }

  }

  const myFun =(iid)=>{
    
    axios.post(process.env.REACT_APP_API_HOST + '/api/cart/deletecartitem', {_id: iid})
    .then(res => {

      setCartItem([])
      axios.post(process.env.REACT_APP_API_HOST + '/api/cart/getcartitem', {id: auth.id})
      .then(res => {
        console.log(res.data.response)
        setCartItem(res.data.response)
    
      })

    })
    .catch(err => console.log(err))

  }


  return (
    <>
    <div className="cart">
      <NavBarTest/>
      <div className="cartCont">
        <p className="cartContShCartHeaging">Shopping Cart</p>

        {
          cartItem.map((item, i) => {
            return <CartRow key={i} iid={item._id} pid={item.pid} color={item.color} totalPrice={totalPrice} setPrice={setPrice} size={item.size} qty={item.qty} selectedItem={selectedItem} setSelectedItem={setSelectedItem} cartItem={cartItem} setCartItem={setCartItem} myFun={myFun} />
          })
        }

      </div>
      <div className="cartTotalPriCont">
        <div className="cartTotalPriContCont">
          <div className="shCartSubTotalCont">
            <p>Sub Total:</p>
            <p>{totalPrice} LKR</p>
          </div>
          <div className="shCartShippingChrgs">
            <p>Shipping Carges:</p>
            <p>Free Shipping</p>
          </div>
          <p className={btnPresed && selectedItem.length==0 ? "cartErrMsg show" : "cartErrMsg hide"}>Please select at least one item</p>
          <button onClick={handleCheckout}>checkout</button>
        </div>
      </div>
    </div></>
  )
}

export default Cart
