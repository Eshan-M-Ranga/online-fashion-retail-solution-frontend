import React, { useContext, useEffect, useState } from 'react'
import './Stylesheets/HomeTest.css'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'
import ItemTest from '../../Components/Item/ItemTest'
import FooterTest from '../../Components/Footer/FooterTest'
import { AuthContext } from '../../Context/AuthProvider'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomeTest = () => {

    const {auth} = useContext(AuthContext)
    //const location = useLocation()

    const [allProduct, setAllProduct] = useState([])
    useEffect(()=>{getAllProduct()},[])
    useEffect(()=>{ 
        console.log(auth)
    }, [auth])

    //show products
    const getAllProduct = () => {

        if(auth.ageCategory && auth.gender) {
            axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getprobyageandgender', {ageCategory: auth.ageCategory, gender: auth.gender})
            .then( resp => {
                axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbygender', {ageCategory: auth.ageCategory, gender: auth.gender})
                .then(res => {
                    axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyinvgendersameage', {ageCategory: auth.ageCategory, gender: auth.gender})
                    .then(resthree => {
                        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyinvgenderinvage', {ageCategory: auth.ageCategory, gender: auth.gender})
                        .then(resFour => {

                            setAllProduct([...resp.data.response, ...res.data.response, ...resthree.data.response, ...resFour.data.response])
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                    
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        } else {
            axios.post(process.env.REACT_APP_API_HOST + '/api/inventory')
            .then(res => setAllProduct(res.data))
            .catch(err => console.log(err))
        }

    }




  return (
    <div className="homeTest">
        <div className="homeTestBanner" >
            <NavBarTest/>
            <div className="homeTestBannerImgCont"></div>
            <div className="homeTestBannerTxtCont">
                <p className="homeTstBannTxtCntHdTxt" >Elevate Your Style</p>
                <p className="homeTstBannTxtCntChTxt"><span>with</span> our new collection</p>
            </div>
        </div>
        <div className="homeTestProNavCont">
            <div className="homeTestProNavContCont">
                <div className="hmTstProNavCtWomenNav">
                    <p>Women's Collection</p>
                    <span>look our new<br/>collection</span>
                </div>
                <div className="hmTstProNavCtMenNav">
                    <p>Men's Collection</p>
                    <span>the best of global brands,<br/>at your door step!</span>
                </div>
            </div>
            <div className="hmTstProNavCntHdCnt">
                <p>only</p>
                <p className="hmTstProNavCntHdCntSpPra" >the best</p>
            </div>
        </div>
        <div className="homeTestProductCont">
            {
                allProduct.map((item, i) => {
                    return <Link to={`/view/${item._id}`} key={i} className="homeTestProductContLink" ><ItemTest id={item._id} desc={item.desc} price={item.price} img={item.img} /></Link>
                })
            }
        </div>
        <div className="test"></div>
        <FooterTest/>
    </div>
  )
}

export default HomeTest
