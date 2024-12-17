import React, { useContext, useState } from 'react'
import './Stylesheets/Login.css'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'

const Login = () => {

  const {auth, setAuth} = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [emailErrMsg, setEmailErrMsg] = useState('')
  const [pwdErrMsg, setPwdErrMsg] = useState('')
  
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const loginHandler = (e) => {
    e.preventDefault()
    
    if(!EMAIL_REGEX.test(email))  setEmailErrMsg('Please enter a valid email')
    if(!password)  setPwdErrMsg('Please enter a valid password')
    if(EMAIL_REGEX.test(email) && password) {
      //console.log('ok')

      axios.post(process.env.REACT_APP_API_HOST + '/api/user/login', {email, password})
      .then(res => {
        const newData = {id: res.data.response.id, token: res.data.token, refreshToken: res.data.refreshToken, firstName: res.data.response.firstName, email: res.data.response.email, role: res.data.response.role , ageCategory: res.data.response.ageCategory, gender: res.data.response.gender}
        //console.log("new data: ", newData)
        setAuth(newData)
        navigate('/')
      })
      .catch(err => {
        setErrMsg(err?.response?.data?.err)
      })
    }
  }
  return (
    <div className="login">
      <NavBarTest/>
      <div className="loginCont">
        <form>
            <h1>Login</h1>
            <div className="inputCont">
                <label htmlFor="email">Email Address</label>
                <input type="text" id="email" placeholder='Email Address'
                  onChange={(e)=>setEmail(e.target.value)}
                  onFocus={()=>setEmailErrMsg('')}
                />
                <p>{emailErrMsg}</p>
            </div>
            <div className="inputCont">
                <label htmlFor="password">Password</label>
                <input type="text" id="password" placeholder='Password'
                  onChange={(e)=>setPassword(e.target.value)}
                  onFocus={()=>setPwdErrMsg('')}
                />
                <p>{pwdErrMsg}</p>
            </div>
            <button onClick={loginHandler} >login</button>
            <p>{errMsg}</p>
            <p className="loginLink">Don't have an account?<span>Sign up</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login
