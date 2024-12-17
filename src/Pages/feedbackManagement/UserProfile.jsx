import React, { useContext, useEffect, useRef, useState } from 'react'
import './UserProfile.css'
import UserProfOrderRow from '../../Components/UserProfOrderRow/UserProfOrderRow'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthProvider'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'

const UserProfile = () => {

    const {auth} = useContext(AuthContext)
    const [userOrders, setUserOrders] = useState([])

    const fNameInpRef = useRef()
    const fNameParaRef = useRef()
    const lNameInpRef = useRef()
    const lNameParaRef = useRef()
    const fNmEditBtnRef = useRef()
    const lNmEditBtnRef = useRef()
    const fNmSaveBtnRef = useRef()
    const lNmSaveBtnRef = useRef()
    const pwShowRef = useRef()
    const pwEditCntRef = useRef()
    const addInpRef = useRef()
    const addParaRef = useRef()
    const addSaveBtnRef = useRef()
    const addEditBtnRef = useRef()

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [currentPw, setCurrentPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confNewPw, setConfNewPw] = useState('')
    const [edtPwErMsg, setedtPwErMsg] = useState('')
    const [address, setaddress] = useState('')

    useEffect(() => {

      if(auth.id === '') return
      //console.log(auth)
        axios.post(process.env.REACT_APP_API_HOST + '/api/order/getordersbyuid', {id: auth.id})
        .then(res => setUserOrders(res.data.response))
        .catch(error => console.log(error))
    }, [auth])

    useEffect(() => {

      if(auth.id === '') return
      //console.log(auth)
        axios.post(process.env.REACT_APP_API_HOST + '/api/user/getuserbyid', {_id: auth.id})
        .then(res => {
          console.log(res.data)
          setFirstname(auth.firstName)
          setLastName(auth.lastName)
          setEmail(auth.email)
          setPassword(res.data.response.password)
        })
        .catch(error => console.log(error))
    }, [auth])

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/user/getaddressbyuid', {ownerId: auth.id})
        .then(res => {
          setaddress(res.data.response.address)

        })
        .catch(error => console.log(error))
    },[auth])

    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const handlefNameUpdateMode = () => {
      fNameParaRef.current.classList.toggle("phide")
      fNameInpRef.current.classList.toggle("phide")
      fNmEditBtnRef.current.classList.toggle("phide")
      fNmSaveBtnRef.current.classList.toggle("phide")
    }

    const handlelNameUpdateMode = () => {
      lNmEditBtnRef.current.classList.toggle("phide")
      lNmSaveBtnRef.current.classList.toggle("phide")
      lNameParaRef.current.classList.toggle("phide")
      lNameInpRef.current.classList.toggle("phide")
    }

    const handlefNameUpdate = () => {


      axios.patch(process.env.REACT_APP_API_HOST + '/api/user/updateuserfname', {_id: auth.id, firstName})
      .then(res => {})
      .catch(error => console.log(error))

      // do function
       
      fNameParaRef.current.classList.toggle("phide")
      fNameInpRef.current.classList.toggle("phide")
      fNmEditBtnRef.current.classList.toggle("phide")
      fNmSaveBtnRef.current.classList.toggle("phide")
    }
    
    const handlelNameUpdate = () => {

      axios.patch(process.env.REACT_APP_API_HOST + '/api/user/updateuserlname', {_id: auth.id, lastName})
      .then(res => {})
      .catch(error => console.log(error))
      //do function
      
      lNameParaRef.current.classList.toggle("phide")
      lNameInpRef.current.classList.toggle("phide")
      lNmEditBtnRef.current.classList.toggle("phide")
      lNmSaveBtnRef.current.classList.toggle("phide")
    }

    const handlelPwUpdateMode = () => {
      pwShowRef.current.classList.toggle("phide")
      pwEditCntRef.current.classList.toggle("phide")
    }

    const handlelPwUpdate = (e) => {
      e.preventDefault()

      if(currentPw !== password) return setedtPwErMsg('Incorrect password')
      if(!PASSWORD_REGEX.test(newPw)) return setedtPwErMsg('Please add valid password')
      if(newPw !== confNewPw) return setedtPwErMsg('Confirm password not match')


      axios.patch(process.env.REACT_APP_API_HOST + '/api/user/updateuserpw', {_id: auth.id, password: newPw})
      .then(res => {
        pwEditCntRef.current.classList.toggle("phide")
        pwShowRef.current.classList.toggle("phide")

        setCurrentPw('')
        setNewPw('')
        setConfNewPw('')

      })
      .catch(error => console.log(error))

    }

    const handlelPwUpdateCancel = (e) => {
      e.preventDefault()

      
      pwEditCntRef.current.classList.toggle("phide")
      pwShowRef.current.classList.toggle("phide")
    }

    const handleAddUpdate = () => {

      axios.post(process.env.REACT_APP_API_HOST + '/api/user/updateuseraddress', {ownerId: auth.id, address})
      .then(res => {})
      .catch(error => console.log(error))

      addInpRef.current.classList.toggle("phide")
      addParaRef.current.classList.toggle("phide")
      addEditBtnRef.current.classList.toggle("phide")
      addSaveBtnRef.current.classList.toggle("phide")
    }

    const handleAddUpdateMode = (e) => {



      addInpRef.current.classList.toggle("phide")
      addParaRef.current.classList.toggle("phide")
      addEditBtnRef.current.classList.toggle("phide")
      addSaveBtnRef.current.classList.toggle("phide")
    }


  return (
    <div className="userProfile" >
      <NavBarTest/>
      <div className="userProfileOrder">
        <h2>My Orders</h2>
        <div className="userProfileOrderCont">
            {
                userOrders.map((item, i) => {
                    return <UserProfOrderRow key={i} pid={item.pid} color={item.color} size={item.size} qty={item.qty} status={item.status} orderId={item._id} />
                })
            }
        </div>
      </div>

      <div className="userProfileUserData">
        <div className="userProfileUserDataCnt">
          <p className="usrProusrdattxtCntHd">This is</p>
          <p className="usrProusrdattxtCntChTxt"><span>Your</span> Space</p>
          <div className="usrProUsrDatCntCnt">
            <div className="usrProUsrDatCntCntNmCnt">
              <div className="usrProUsrDatCntCntNmFn">
                <label htmlFor="">First name</label>
                <div className="usrProUsrDatCntCntRcnt">
                  <span ref={fNameParaRef} className="usrProUsrDatCntCntNmCntPara ">{firstName}</span>
                  <input ref={fNameInpRef} type="text" placeholder='First name' className="usrProUsrDatCntCntNmCntInp phide" value={firstName} onChange={(e) => setFirstname(e.target.value)}/>
                  <i class="fa-regular fa-pen-to-square" ref={fNmEditBtnRef} onClick={handlefNameUpdateMode}></i>
                  <i class="fa-regular fa-floppy-disk phide" ref={fNmSaveBtnRef} onClick={handlefNameUpdate}></i>
                </div>
              </div>
              <div className="usrProUsrDatCntCntNmLn">
                <label htmlFor="">Last name</label>
                <div className="usrProUsrDatCntCntRcnt">
                  <p ref={lNameParaRef} className="usrProUsrDatCntCntNmCntPara ">{lastName}</p>
                  <input ref={lNameInpRef} type="text" placeholder='Last name' className="usrProUsrDatCntCntNmCntInp phide" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  <i class="fa-regular fa-pen-to-square" ref={lNmEditBtnRef} onClick={handlelNameUpdateMode}></i>
                  <i class="fa-regular fa-floppy-disk phide" ref={lNmSaveBtnRef} onClick={handlelNameUpdate}></i>
                </div>
              </div>
            </div>
            <div className="usrProUsrDatCntCntEmaiCnt">
              <label htmlFor="">Email Address</label>
              <p className="usrProUsrDatCntCntEmaiCntcnt">
                {email}
              </p>
            </div>
            <div className="usrProUsrDatCntCntPwCnt" ref={pwShowRef}>
              <label htmlFor="">Password</label>
              <div className="usrProUsrDatCntCntPwCntInpCnt">
                <p className="usrProUsrDatCntCntPwCntcnt">
                  ***********************
                </p>
                <i class="fa-regular fa-pen-to-square" onClick={handlelPwUpdateMode}></i>
              </div> 
            </div>
            <div className="usrProUsrDatCntCnteditPwCnt phide" ref={pwEditCntRef}>
              <label htmlFor="" className="usrProUsrDatCntCntediHdCnt">Edit your password</label>

              <form action="" className="usrProUsrDatCntEditPwdCt">
                <label htmlFor="" className="usrPrUsrDtCtEdtPdCtCt">current password</label>
                <input type="text" placeholder='Enter current password' className="usrPrUsrDtCtEdtPdInpCt" value={currentPw} onChange={(e) => {
                  setCurrentPw(e.target.value) 
                  setedtPwErMsg('')
                  } } />
                

                <label htmlFor="" className="usrPrUsrDtCtEdtPdCtCt">New password</label>
                <input type="text" placeholder='Enter new password' className="usrPrUsrDtCtEdtPdInpCt" value={newPw} onChange={(e) => {
                  setNewPw(e.target.value)
                  setedtPwErMsg('')
                  }} />
              

                <label htmlFor="" className="usrPrUsrDtCtEdtPdCtCt">confirm new password</label>
                <input type="text" placeholder='confirm new password' className="usrPrUsrDtCtEdtPdInpCt" value={confNewPw} onChange={(e) => {
                  setConfNewPw(e.target.value)
                  setedtPwErMsg('')
                  }} />
                <p className="usrProUsrDatErrMsgParaCnt">{edtPwErMsg}</p>
                <div className="usrProUsrDtCtEdtPdCtBtnCt">
                  <button className="usrPrUsrDatCtEditCCtBtn" onClick={handlelPwUpdateCancel}>Cancel</button>
                  <button className="usrProUsrDatCntEditPwdCtBtn" onClick={handlelPwUpdate}>Save</button>
                </div>
              </form>
            </div>
            <label htmlFor="">Address</label>
            <div className="usrProUsrDatCntCntAddCnt">
              <span ref={addParaRef} className="usrProUsrDatCntCntAddCntPara">{address}</span>
              <input ref={addInpRef} type="text" placeholder='Add your address..' className="usrProUsrDatCntCntAddCntInp phide" value={address} onChange={(e) => setaddress(e.target.value)}/>
              <i class="fa-regular fa-pen-to-square" ref={addEditBtnRef} onClick={handleAddUpdateMode}></i>
              <i class="fa-regular fa-floppy-disk phide" ref={addSaveBtnRef} onClick={handleAddUpdate}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
