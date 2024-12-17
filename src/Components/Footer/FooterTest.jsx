import React from 'react'
import './FooterTest.css'
import { Link } from 'react-router-dom'

const FooterTest = () => {
  return (
    <div className="footerTest">
      <div className="footerTestCont">
      <div className="NavBarTestLeft">
          <p className="NavBarTestLeftPara">Bowers</p>
          <span className="NavBarTestLeftSpn">&</span>
          <p className="NavBarTestLeftPara">Beyond</p>
        </div>
      </div>
      <div className="footerTestContDatUs">
        <h5>download</h5>
        <span>app store</span>
        <span>play store</span>
        <span>desktop app</span>
        <h5>services</h5>
        <span>delivery management</span>
        <span>product operations</span>
        <span>customer webinars</span>
        <Link className="footerTestLink" to='/inq'><span>Inquiries</span></Link>
      </div>
      <div className="footerTestContDatOrg">
        <h5>products</h5>
        <span>men's fashion</span>
        <span>women's fashion</span>
        <span>accessories</span>
        <h5>company</h5>
        <span>terms & conditions</span>
        <span>privacy policy</span>
        <span>careers</span>
        <Link className="footerTestLink" to='/employeelogin' ><span>employee</span></Link>
      </div>
      
      <div className="footerTestContInfo">
        <p>follow us on</p>
        <div className="ftrTstCntInfoSmCnt">
            <i class="fa-brands fa-square-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-square-x-twitter"></i>
        </div>
      </div>
    </div>
  )
}

export default FooterTest
