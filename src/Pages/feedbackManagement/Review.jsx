import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarTest from '../../Components/NavBarTest/NavBarTest';
import './Review.css'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthProvider';

const Review = () => {

    const location = useLocation();
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()

    const [pid, setPid] = useState(0) 
    const [orderId, setOrderId] = useState('') 
    const [action, setAction] = useState('') 
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [comment, setComment] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [img, setImg] = useState('')

    useEffect(()=>{
        setPid(location.state.pid)
        setOrderId(location.state.orderId)
        setAction(location.state.action)
      }, [location])

    useEffect(() => {
        if(pid === 0) return
        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/gtProbyid', {_id: pid})
        .then(res => {
            setDesc(res.data.response.desc)
            setPrice(res.data.response.price)
            setImg(res.data.response.img)
        })
        .catch(error => console.log(error))
    }, [pid])

    useEffect(() => {
        if(orderId === '') return
        axios.post(process.env.REACT_APP_API_HOST + '/api/comment/getcommentbyorderid', {orderId})
        .then(res => {
            if(res.data.response !== null) setComment(res.data.response.comment)
        })
        .catch(error => console.log(error))
    }, [orderId])

    useEffect(() => {
        if(orderId === '') return
        axios.post(process.env.REACT_APP_API_HOST + '/api/order/getorderbyorderid', {orderId})
        .then(res => {
            setColor(res.data.response.color)
            setSize(res.data.response.size)
        })
        .catch(error => console.log(error))
    }, [orderId])


    const submitComment = () => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/comment/createcomment', {pid, uid: auth.id, orderId, comment})
        .then(res => {
            console.log(res)
            navigate("/up")
        })
        .catch(error => console.log(error))
    }

    const editComment = () => {
        axios.patch(process.env.REACT_APP_API_HOST + '/api/comment/updatecommentbyorderid', {orderId, comment})
        .then(res => {
            navigate("/up")
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="userReview" >
      <NavBarTest/>
      <div className="userReviewCont">
        <p className="userReviewContPara">Feel Free to</p>
        <p className="userReviewContParaUc"><span>comment</span> your experience!</p>
        <div className="userReviewContCont">
            <div className="usrRwCntCntImgCnt">
                {pid !== 0 && <img src={img} alt="" />}
            </div>
            <div className="usrRwCntCntTxtCnt">
                <div className="usrRwCntCntTxtCntHdTxt">
                    <p>{desc}</p>
                    <span>Delivered</span>
                </div>
                <div className="usrRwCntCntTxtCntSrw">
                    <div className="usrRwCntCntTxtCntCl">
                        <p><span>color: </span>{color}</p>
                    </div>
                    <div className="usrRwCntCntTxtCntFs">
                        <span>Free Shipping</span>
                        <span>Cash on Delivery</span>
                    </div>
                    
                    <div className="usrRwCntCntTxtCntSize">{size}</div>
                    <div className="usrRwCntCntTxtCntPr">
                        <p>Price</p>
                        <span>{price}.00 LKR</span>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div className="userReviewContTxtAreaCnt">
            <textarea placeholder="Write your review.." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            
            <div className="usrRvwCntTxtArBtnCnt">
                { action === 'new' && <button onClick={submitComment}>Submit</button>}
                { action === 'edit' && <button onClick={editComment}>Update</button>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Review
