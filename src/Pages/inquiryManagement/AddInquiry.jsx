import React, { useState } from 'react'
import './AddInquiry.css'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddInquiry = () => {
  
  const [name, setname] = useState('')
  const [inquiry, setInquiry] = useState('')
  const [phoneNum, setPNum] = useState('')
  
  const [errName, setErrName] = useState('')
  const [errInq, setErrInq] = useState('')
  const [errPhone, setErrPhone] = useState('')

  const navigate = useNavigate()
  const PHONE_NO_REGX = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

  const submitInquiry = () => {

    if(!name) setErrName("add your name")
    if(!inquiry) setErrInq("add your inquiry")
    if(!phoneNum) setErrPhone("add your phone number")
    if(!PHONE_NO_REGX.test(phoneNum)) setErrPhone("add valid phone number")

    if(name && inquiry && phoneNum && PHONE_NO_REGX.test(phoneNum)){
      axios.post(process.env.REACT_APP_API_HOST + '/api/inquiry/add', {name, inquiry, phoneNum, state: "new"})
      .then(res => navigate('/'))
      .catch(err => console.log(err))
    }

  }
  
  return (
    <div className="userReview" >
      <NavBarTest/>
      <div className="userReviewCont">
        <p className="userReviewContPara">Add Your</p>
        <p className="userReviewContParaUc"><span>inquiry</span> Here!</p>
       
        <div className="userReviewContTxtAreaCntt">
          <div className="userInqCont">
            <div className="userInqContInpCont">
              <label className="userInqLabel" htmlFor="">Name</label>
              <input className="userInqinput" type="text" placeholder='Add your name' onChange={(e) => setname(e.target.value)} onFocus={() => setErrName('')}/>
              <p className="userInqErr">{errName}</p>
            </div>
            <div className="userInqContInpCont">
              <label className="userInqLabel" htmlFor="">Inquiry</label>
              <textarea className="userInqTxtArea" placeholder="Write your inquiry.." value={inquiry} onChange={(e) => setInquiry(e.target.value)} onFocus={() => setErrInq('')}></textarea>
              <p className="userInqErr">{errInq}</p>
            </div>
            <div className="userInqContInpCont">
              <label className="userInqLabel" htmlFor="">Phone Number</label>
              <input className="userInqinput" type="text" placeholder='Add your phone number' onChange={(e) => setPNum(e.target.value)} onFocus={() => setErrPhone('')}/>
              <p className="userInqErr">{errPhone}</p>
            </div>
            <div className="usrRvwCntTxtArBtnCnt">
                <button className="usrRvwCntTxtArBtnCntBtn" onClick={submitInquiry}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddInquiry
