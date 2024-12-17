import React, { useContext, useEffect, useState } from 'react'
import '../Stylesheet/EmployeeLogin.css'
import { AuthContext } from '../../../Context/AuthProvider'
import axios from 'axios'
import EmpManagementHeader from './EmpManagementHeader'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = ({data, setData}) => {

    const {auth ,setAuth} = useContext(AuthContext)

    const navigate = useNavigate()

        //email
        const [email, setEmail] = useState('')
        const [emailValid, setEmailValid] = useState(false)
        const [emailFocus, setEmailFocus] = useState(false)
    
        //password
        const [password, setPassword] = useState('')

        const [errMsg, setErrMsg] = useState('')

        useEffect(() => {setEmailValid(EMAIL_REGEX.test(email))}, [email])
        useEffect(() => {
        }, [password])
        useEffect(() => {setErrMsg('')}, [email, password])

        const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        const handleSubmit = (e) => {

            e.preventDefault()
            setErrMsg('')
            if(!EMAIL_REGEX.test(email)) return setErrMsg("please enter valid email")
            else if(!password) return setErrMsg("please type password")

            axios.post(process.env.REACT_APP_API_HOST + '/api/emp/login', {email, password})
            .then(res => {
                setAuth({id: res.data.response._id, email: res.data.response.email, firstName: res.data.response.firstName, role: res.data.response.role, token: res.data.token})
                console.log(res)

                // employee management
                if(res.data.response.role == "HR Manager") return navigate("/empmanhome")
                
                // inquiry management
                if(res.data.response.role == "Manager") return navigate("/inqhome")
                
                // inventory management
                if(res.data.response.role == "Inventory Clerk") return navigate("/issmanhome")
                if(res.data.response.role == "Inventory Manager") return navigate("/issmanhome")
                
                // order management
                if(res.data.response.role == "Distribution Supervisor") return navigate("/omh")
                if(res.data.response.role == "Delivery Agent") return navigate("/omh")
            })
        .catch(error => {
                //console.log(error.response.data.err)
                if(error.response.data.err) setErrMsg(error.response.data.err)
            })

        }

  return (
    <div className="employeeLogin" >
      <div className="employeeLoginCont">
        <h3>Employee Login</h3>
        <form>
            <div className="inputCont">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                />
                <p className={emailFocus && email && !emailValid ? "show" : "hide"}>please enter valid email</p>
            </div>

            <div className="inputCont">
                <label htmlFor="password">Password</label>
                <input id="password" type="text" placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="empLoginErrMsgPara">{errMsg}</div>
            <button className="empLoginLoginBtn" onClick={handleSubmit} disabled={!emailValid || !password}>Login</button>
        </form>

      </div>
    </div>
  )
}

export default EmployeeLogin
