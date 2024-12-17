import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import axios from 'axios'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'
import './Stylesheets/Product.css'
import { Link } from 'react-router-dom'
import ItemTest from '../../Components/Item/ItemTest'
import FooterTest from '../../Components/Footer/FooterTest'

const Product = ({category}) => {

  const {auth} = useContext(AuthContext)
  const [allProduct, setAllProduct] = useState([])

useEffect(()=>{
  getProducts()
},[category])


  const getProducts = () => {
    if(!category) return
    
    if(category == 'kids'){

    }else if(category && auth.ageCategory && auth.gender && auth.gender == category){

      const age = auth.ageCategory

      axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getprobyageandgender', {ageCategory: age, gender: category})
      .then(resOne => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbygender', {ageCategory: age, gender: category})
        .then(resTwo => {
          axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyagegenderinvcltype', {})
          .then(resThree => {
            axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyinvagegenderinvcltype', {})
            .then(resFour => {
              setAllProduct([...resOne.data.response, ...resTwo.data.response, ...resThree.data.response, ...resFour.data.response])
            })
          })
        })
        .catch(err => console.log(err))
        
      })
      .catch(err => console.log(err))
    }else if(category) {
      axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbygender', {gender: category})
      .then(res => {
        setAllProduct(res.data.response)
      })
    }
  }

  return (
    <div>
      <NavBarTest/>
      <div className="productPageProductCnt">
            {
                allProduct.map((item, i) => {
                    return <Link to={`/view/${item._id}`} key={i} className="homeTestProductContLink" ><ItemTest id={item._id} desc={item.desc} price={item.price} img={item.img} /></Link>
                })
            }
      </div>
      <FooterTest/>
    </div>
  )
}

export default Product
