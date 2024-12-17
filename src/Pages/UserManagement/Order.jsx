import React, { useContext, useEffect, useRef, useState } from 'react'
import './Stylesheets/Order.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AuthContext} from "../../Context/AuthProvider"
import axios from 'axios';
import NavBarTest from '../../Components/NavBarTest/NavBarTest';

const Order = () => {

  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation();
  const cpRef = useRef()
  const cdRef = useRef()

  const [success, setSuccess] = useState(false)
  const [sucRate, setSucRate] = useState(false)
  //const [error, setError] = useState(false)

  const [payMethod, setPayMethod] = useState('')
  const [address, setAddress] = useState('Please add your address')

  const [cardNum, setCardNum] = useState('')
  const [cnValid, setCnValid] = useState(false)
  const [cnFocus, setCnFocus] = useState(false)

  const [exp, setExp] = useState('')
  const [expValid, setExpValid] = useState(false)
  const [expFocus, setExpFocus] = useState(false)

  const [cvv, setCvv] = useState('')
  const [cvvValid, setCvvValid] = useState(false)
  const [cvvFocus, setCvvFocus] = useState(false)

  const V_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/
  const M_REGEX = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
  const AE_REGEX = /^3[47][0-9]{13}$/
  const CVV_REGEX = /^[0-9]{3,4}$/
  

  useEffect(()=>{
    if(V_REGEX.test(cardNum)) setCnValid(true)
    else if(M_REGEX.test(cardNum)) setCnValid(true)
    else if(AE_REGEX.test(cardNum)) setCnValid(true)
  else setCnValid(false)
  }, [cardNum])
  useEffect(()=>{}, [exp])
  useEffect(()=>{setCvvValid(CVV_REGEX.test(cvv))}, [cvv])

  const [selectedIteme, setSelectedItem] = useState([])

  useEffect(()=>{
    //if(auth.token == null) navigate("/login")
    //else if(auth.role !== "user") navigate("/")
  },[auth])

  useEffect(() => {
    axios.post(process.env.REACT_APP_API_HOST + '/api/user/getaddressbyuid', {ownerId: auth.id})
    .then(res => {
      setAddress(res.data.response.address)

    })
    .catch(error => console.log(error))
},[auth])


  useEffect(()=>{
    setSelectedItem(location.state.selectedItem)
  
  }, [location])

  useEffect(()=>{if(sucRate == true) setSuccess(true)}, [sucRate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(payMethod == 'card') return
    console.log("clicked")
    selectedIteme.map((item) => {
      
      axios.post(process.env.REACT_APP_API_HOST + '/api/order/addorder', {id: item.id, pid: item.pid, color: item.color, size: item.size, qty: item.qty, status: "new", address} )
      .then(res => {
        console.log(res)

        axios.post(process.env.REACT_APP_API_HOST + '/api/cart/deletecartitem', {_id: item._id})
        .then(res => {
          setSucRate(true)
        })
        .catch(err => console.log(err))

        
      })
      .catch(err => console.log(err))
    })

  }
  const payMethSelector = (ref, type) => {
    cpRef.current.classList.remove('ordrCntPMSltCntCdSel')
    cdRef.current.classList.remove('ordrCntPMSltCntCdSel')
    ref.current.classList.add('ordrCntPMSltCntCdSel')
    setPayMethod(type)
  }
  

  return (
    <div className="order">
      <NavBarTest/>
      { !success ? (
        <div className="orderCont">

        <div className="orderContHeading">
          <h1>Payment</h1>
          <div className="orderContSubTotal">
            <p>Total: {location.state.totalPrice} LKR</p>
            <p>Delivery Free</p>
          </div>
        </div>
        <div className="orderContaddress">
          <h4>Address</h4>
          <span>{address}</span>
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <h4>choose payment method below</h4>
        <div className="orderContPMSelectCont">

          <div className="orderContPMSelectContCard" ref={cpRef} onClick={() => payMethSelector(cpRef, 'card')}>
            <span class="material-symbols-outlined">credit_card</span>
            <p>Card Payment</p>
          </div>
          <div className="orderContPMSelectContCard" ref={cdRef} onClick={() => payMethSelector(cdRef, 'cash on delivery')}>
            <span class="material-symbols-outlined">local_shipping</span>
            <p>Cash on Delivery</p>
          </div>
          
        </div>
        <h4>Credit Card Info</h4>
        <div className="orderContCreditCardCont">
          <form>
            <div className="inputCont">
                <label htmlFor="cardno">Card Number</label>
                <input type="text" id="cardno" placeholder='Card Number' 
                  onChange={(e) => setCardNum(e.target.value)} 
                  onFocus={() => setCnFocus(true)}
                  onBlur={() => setCnFocus(false)}
                />
                <p className={cnFocus && cardNum && !cnValid ? "show" : "hide"}>Please enter a valid card number</p>
            </div>
            <div className="orderContFlexInpCont">
               <div className="inputCont orderContExpInptcont">
                   <label htmlFor="expday">Expiry Date</label>
                   <input type="month" id="expday" placeholder='Exp MM/YY' 
                    onChange={(e) => setExp(e.target.value)} 
                    onFocus={() => setExpFocus(true)}
                    onBlur={() => setExpFocus(false)}
                    min={new Date().toISOString().substring(0, 10)}
                  />
                   <p>Please enter EXP date</p>
               </div>
               <div className="inputCont orderContCVVInptcont">
                   <label htmlFor="cvv">CVV</label>
                   <input type="text" id="cvv" placeholder='CVV' 
                    onChange={(e) => setCvv(e.target.value)} 
                    onFocus={() => setCvvFocus(true)}
                    onBlur={() => setCvvFocus(false)}
                  />
                   <p className={cvvFocus && cvv && !cvvValid ? "show" : "hide"}>Invalid CVV</p>
               </div>
            </div>
            <button className="orderContCreditCardContBtn" onClick={handleSubmit}>pay now</button>
          </form>
        </div>
      </div>
      ) : (
        <div className="orderPageSucMsgCont">
          <div className="orderPageSucMsgContCont">
            <span class="material-symbols-outlined">check</span>
            <p>Success!</p>
            <p>Thank You For Ordering!</p>
            <Link to='/'><button className='orderContCreditCardContBtn'>back to home</button></Link>
          </div>
        </div>
      ) }
    </div>
  )
}

export default Order
