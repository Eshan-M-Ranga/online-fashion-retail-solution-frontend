import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../Context/AuthProvider'

const CartRow = ({iid, pid, color, size, qty, totalPrice, setPrice, selectedItem, setSelectedItem, cartItem, setCartItem, myFun}) => {

    const {auth} = useContext(AuthContext)
    const [productData, setProData] = useState({})
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/gtProbyid',{_id:pid}).then(res => {
            setProData(res.data.response)
            //console.log(res.data.response)
          })
          .catch(err => console.log(err))
    }, [])


    const handleOnChange = () => {
        if(!isChecked) {
            setPrice(totalPrice + parseInt(productData.price))
            
            //console.log(selectedItem.map((item) => item.id === auth.id))
            setSelectedItem([...selectedItem, {id:auth.id, pid:pid, color:color, size:size, qty:qty, _id:iid}])
        } else {
            setPrice(totalPrice - productData.price)
            setSelectedItem(selectedItem.filter((item) => {
                if(item.pid == pid && item.color == color && item.size == size && item.qty == qty) return false
                return true
            })
            )
        }
        setIsChecked(!isChecked)
    }

    const deleteRow = ()=> {
      axios.post(process.env.REACT_APP_API_HOST + '/api/cart/deletecartitem', {_id: iid})
      .then(res => {


        

      })
      .catch(err => console.log(err))
    }
    const test =()=>{
      myFun(iid)
    }

  return (
        <div className="cartRow">
          <div className="cartRowImgCont">
            <img src={productData.img} alt="" />
          </div>
          <div className="cartRowTxtCont">
            <span className="cartRowTxtContHeading">{productData.desc}</span>
            <div className="cartRowTxtContOther">
              Color: {color}
            </div>
          </div>
          <div className="cartRowSizebox">
            <span>{size}</span>
          </div>
          <div className="cartRowProQtBtn">
            <span className="cartRowProQtBtnBtn">Free Shipping</span>
            <span className="cartRowProQtBtnBtn">Cash on Delivery</span>
          </div>
          <div className="CartRowPriceSpan">{productData.price}.00 LKR</div>
          <span class="material-symbols-outlined cartRowItmdelBtn" onClick={test}>delete</span>
          <input type="checkbox" className="cartRowCheckBox" checked={isChecked} onChange={handleOnChange} />
        </div>
  )
}

export default CartRow
