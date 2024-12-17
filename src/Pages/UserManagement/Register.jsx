import React, { useContext, useEffect, useState } from 'react'
import './Stylesheets/Register.css'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'

const Register = () => {

    const {auth, setAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [fname, setfName] = useState()
    const [fnameValid, setfNameValid] = useState()
    const [fnameFocus, setfNameFocus] = useState()

    const [lname, setLname] = useState()
    const [lnameValid, setLnameValid] = useState()
    const [lnameFocus, setLnameFocus] = useState()

    //email
    const [email, setEmail] = useState()
    const [emailValid, setEmailValid] = useState()
    const [emailFocus, setEmailFocus] = useState()

    //password
    const [password, setPassword] = useState()
    const [passwordValid, setPasswordValid] = useState()
    const [passwordFocus, setPasswordFocus] = useState()

    //conf-password
    const [confPass, setConfPass] = useState()
    const [confPassValid, setConfPassValid] = useState()
    const [confPassFocus, setConfPassFocus] = useState()

    const [dob, setDob] = useState('')
    const [gender, setGender] = useState()
    useEffect(() => {console.log(dob)}, [dob])
    useEffect(() => {console.log(gender)}, [gender])

    const NAME_REGEX = /^[a-z ,.'-]+$/i
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    useEffect(() => {setfNameValid(NAME_REGEX.test(fname))}, [fname])
    useEffect(() => {setLnameValid(NAME_REGEX.test(lname))}, [lname])
    useEffect(() => {setEmailValid(EMAIL_REGEX.test(email))}, [email])
    useEffect(() => {
        setPasswordValid(PASSWORD_REGEX.test(password))
        setConfPassValid(password === confPass)
    }, [password, confPass])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userData = {firstName: fname, lastName: lname, email, password, dob, gender, role: 'user'}
        //console.log(data)

        axios.post(process.env.REACT_APP_API_HOST + '/api/user/register', userData)
        .then(res => {
            //console.log(res.data)
            const newData = {id: res.data.response.id, token: res.data.token, refreshToken: res.data.refreshToken, firstName: res.data.response.firstName, email: res.data.response.email, role: res.data.response.role, ageCategory: res.data.response.ageCategory, gender: res.data.response.gender}
            //console.log("new data: ", newData)
            setAuth(newData)
            navigate('/')
        })
        .catch(err => setErrMsg(err.response.data.err ? err.response.data.err : ''))

    }
  return (
    <div className="register">
        <NavBarTest/>
        { !success ? (
            <div className="registerCont">
                 <h1>Sing up</h1>
                 <form>
                     <div className="inputCont">
                         <label htmlFor="firstname">first name</label>
                         <input type="text" id="firstname" placeholder='First Name' 
                            onChange={(e)=>setfName(e.target.value)}
                            onFocus={()=>setfNameFocus(true)}
                            onBlur={()=>setfNameFocus(false)}
                         />
                         <p className={fnameFocus && fname && !fnameValid ? "show" : "hide"} >Please enter a valid name</p>
                     </div>

                     <div className="inputCont">
                         <label htmlFor="lastname">last name</label>
                         <input type="text" id="lastname" placeholder='Last Name' 
                            onChange={(e)=>setLname(e.target.value)}
                            onFocus={()=>setLnameFocus(true)}
                            onBlur={()=>setLnameFocus(false)}
                        />
                         <p className={lnameFocus && lname && !lnameValid ? "show" : "hide"} >Please enter a valid name</p>
                     </div>

                     <div className="inputCont">
                         <label htmlFor="email">Email Address</label>
                         <input type="text" id="email" placeholder='Email Address' 
                            onChange={(e)=>setEmail(e.target.value)}
                            onFocus={()=>setEmailFocus(true)}
                            onBlur={()=>setEmailFocus(false)}
                        />
                         <p className={emailFocus && email && !emailValid ? "show" : "hide"} >Please enter a valid email address</p>
                     </div>

                     <div className="inputCont">
                         <label htmlFor="password">Password</label>
                         <input type="text" id="password" placeholder='Password' 
                            onChange={(e)=>setPassword(e.target.value)}
                            onFocus={()=>setPasswordFocus(true)}
                            onBlur={()=>setPasswordFocus(false)}
                        />
                         <p className={passwordFocus && password && !passwordValid ? "show" : "hide"} >Add at least 8 chars including uppercase, numbers & symbols</p>
                     </div>

                     <div className="inputCont">
                         <label htmlFor="confPassword">Confirm Password</label>
                         <input type="text" id="confPassword" placeholder='Confirm Password' 
                            onChange={(e)=>setConfPass(e.target.value)}
                            onFocus={()=>setConfPassFocus(true)}
                            onBlur={()=>setConfPassFocus(false)}
                        />
                         <p className={confPassFocus && confPass && !confPassValid ? "show" : "hide"} >Confirm password must mach with password</p>
                     </div>
                     <button className="regPgBtn" onClick={() => setSuccess(true)} disabled={!fnameValid || !lnameValid || !emailValid || !passwordValid || !confPassValid}>next</button>
                     <p className="loginLink">Already have an account?<span>Login</span></p>
                 </form>
            </div>
       ) : (
        
        <div className="userDataCont">
            <h1>Sing up</h1>
            <form>
                <div className="inputCont">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" max={new Date().toISOString().substring(0, 10)} onChange={(e)=>setDob(e.target.value)} />
                    <p className={!dob ? "show" : "hide"}>Please enter a valid date</p>
                </div>
                <div className="inputCont radioBtn">
                    <p>Gender</p>
                    <div className="radibtnCont">
                        <input onClick={()=>setGender('Male')} type="radio" id="male" name="eee"/>
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="radibtnCont">
                        <input onClick={()=>setGender('Female')} type="radio" id="female" name="eee"/>
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className="radibtnCont">
                        <input onClick={()=>setGender('other')} type="radio" id="other" name="eee"/>
                        <label htmlFor="other">Other</label>
                    </div>
                </div>
                <p className={!gender ? "radioErrorPara show" : "radioErrorPara hide"}>Please select gender</p>
                <button className="regPgBtn" onClick={handleSubmit} disabled={!dob || !gender}>submit</button>
                <p>{errMsg}</p>
                <p className="loginLink">Already have an account?<span>Login</span></p>
            </form>
        </div>
       
       ) }
    </div>
  )
}

export default Register
