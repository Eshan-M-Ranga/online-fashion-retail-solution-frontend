import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserProfOrderRow = ({pid, color, size, qty, status, orderId}) => {

    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState('')
    const [comment, setComment] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/gtProbyid', {_id: pid})
        .then(res => {
            console.log(res.data.response)
            setDesc(res.data.response.desc)
            setPrice(res.data.response.price)
            setImg(res.data.response.img)
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/comment/getcommentbyorderid', {orderId})
        .then(res => {
            if(res.data.response !== null) setComment(res.data.response.comment)
        })
        .catch(error => console.log(error))
    }, [])

    const reviewBtnHandle = (action) =>{
        navigate("/review",{state:{pid, orderId, action}})
    }

    const deleteBtnHandle = () => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/comment/deletecommentbyorderid', {orderId})
        .then(res => {
            if(res.data.response.deletedCount == 1) setComment('')
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="userProfOrderRow">
        <div className="userProfOrderRowSpCnt">
            <div className="usrPrfOdrRwImgCnt">
                <img src={img} alt="" />
            </div>
            <div className="usrPrfOdrRwDataCnt">
              <h4>{desc}</h4>
              <div className="usrPrfOdrRwDataCntOD">
                  <p><span>Color: </span>{color}</p>
                  <span className="uPrfOdRwDCFShpCoD">Free Shipping</span>
                  <span className="uPrfOdRwDCFShpCoD">Cash on Delivery</span>
              </div>
            </div>
            <div className="usrPrfOdrRwSizeBx"><span>{size}</span></div>
            <div className="usrPrfOdrRwPriceBx">
              <p>Price</p>
              <span>{price}.00 LKR</span>
            </div>
            <div className="usrPrfOdrRwStCmBox">
              <p>Order Status</p>
              <span>{status}</span>
              {
                !comment && status == 'delivered' &&
                <button onClick={() => reviewBtnHandle('new')} ><i class="fa-regular fa-pen-to-square"></i>Write a Review</button>
              }
            </div>
        </div>
        {
            comment && <div className="usrPrfOrdrRwCommCnt">
                <span>Your Comment:</span>
                <p>{comment}</p>
                <div className="usrPrfOdrRwCmCtBtn">
                    <button className="usrPrfOdrRwCmCtBtnEdt" onClick={() => reviewBtnHandle('edit')} ><i class="fa-solid fa-pen-to-square"></i>edit</button>
                    <button className="usrPrfOdrRwCmCtBtnDt" onClick={deleteBtnHandle} ><i class="fa-solid fa-trash"></i>delete</button>
                </div>
            </div>
        }
    </div>
  )
}

export default UserProfOrderRow
