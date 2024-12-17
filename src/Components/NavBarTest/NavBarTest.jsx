import React from 'react'
import './NavBarTest.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'

const NavBarTest = () => {

  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="NavBarTest" >
      <Link className="NavBarTestHmLink" to={'/'}>
        <div className="NavBarTestLeft">
          <p className="NavBarTestLeftPara">Bowers</p>
          <span className="NavBarTestLeftSpn">&</span>
          <p className="NavBarTestLeftPara">Beyond</p>
        </div>
      </Link>
      <div className="NavBarTestNav">
        <Link to='/mens' className="NavBarTestNavLink" >mens</Link>
        <Link to='/womens' className="NavBarTestNavLink" >womens</Link>
        <Link to='/kids' className="NavBarTestNavLink" >kids</Link>
      </div>
      {!auth.token ? 
        <div className="NavBarTestRight">
          
          <span onClick={()=> navigate('/register')}>Register</span>
          <Link className="NavBarTestRightLink" to='/login'><button className="NavBarTestRightButton" >Sign in</button></Link>
          
        </div>
      : 
        <div className="NavBarTestRight">
          <Link to='/cart' className="NavBarTestRightLink" ><div className="NavBarTestRightBtn"><i class="fa-solid fa-cart-shopping"></i></div></Link>
          <Link to='/up' className="NavBarTestRightLink" ><div className="NavBarTestRightBtn"><i class="fa-solid fa-user"></i></div></Link>
          <button className="NavBrTstRigtBtnLout">Logout</button>
        </div>
      }
    </div>
  )
}

export default NavBarTest
