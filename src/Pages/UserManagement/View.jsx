import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './/Stylesheets/View.css'
import axios from 'axios'
import ColorContainer from '../../Components/ColorContainer/ColorContainer'
import {AuthContext} from "../../Context/AuthProvider"
import Comment from '../../Components/Comment/Comment'
import NavBarTest from '../../Components/NavBarTest/NavBarTest'
import FooterTest from '../../Components/Footer/FooterTest'
import ItemTest from '../../Components/Item/ItemTest'

const View = () => {
    
    
    const {auth} = useContext(AuthContext)
    const {pid} = useParams()
    const [allProduct, setAllProduct] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

    const sRef = useRef()
    const mRef = useRef()
    const lRef = useRef()
    const xlRef = useRef()

    const [desc, setDesc] = useState('')
    const [fullDesc, setfullDesc] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [colorData, setColorData] = useState([])

    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [qty, setQty] = useState(0)
    
    const [btnClicked, setBtnClicked] = useState(false)

    const [comment, setComment] = useState([])

    const [age, setage] = useState('')
    const [clothType, setclothType] = useState('')
    const [gender, setgender] = useState('')

    useEffect(()=>{getProduct()},[])
    //useEffect(()=>{console.log(auth)},[auth])


    useEffect(() => {
      getRecommendation()
    },[age, clothType, gender])

    const getProduct = () => {
      axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/gtProbyid', {_id: pid})
      .then(res => {
        console.log(res)
        setDesc(res.data.response.desc)
        setfullDesc(res.data.response.fullDesc)
        setPrice(res.data.response.price)
        setColorData(res.data.response.colorData)
        setImg(res.data.response.img)
        setage(res.data.response.age)
        setclothType(res.data.response.clothType)
        setgender(res.data.response.gender)
      })
      .catch(err => console.log(err))
    }

    useEffect(() => {
      axios.post(process.env.REACT_APP_API_HOST + '/api/comment/productcomment', {pid})
      .then(res => setComment(res.data.response))
      .catch(error => console.log(error))
  }, [])


  const getRecommendation = () => {

    if(!age || !clothType || !gender ) return
    if(age && clothType && gender) {
      axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyagegendercltype', {ageCategory: age, clothType, gender, _id: pid})
      .then(resOne => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyinvagegendercltype', {ageCategory: age, clothType, gender})
        .then(resTwo => {
          axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyagegenderinvcltype', {ageCategory: age, clothType, gender})
          .then(resThree => {
            axios.post(process.env.REACT_APP_API_HOST + '/api/inventory/getproductbyinvagegenderinvcltype', {ageCategory: age, clothType, gender})
            .then(resFour => {
              setAllProduct([...resOne.data.response, ...resTwo.data.response, ...resThree.data.response, ...resFour.data.response])
            })
          })
        })
        .catch(err => console.log(err))
        
      })
      .catch(err => console.log(err))
    } else{
      axios.post(process.env.REACT_APP_API_HOST + '/api/inventory')
      .then(res => setAllProduct(res.data))
      .catch(err => console.log(err))
    }
  }

    //navigate("/cart",{state:{id: auth.id,pid, size, color, qty}})
    const addTocart = () => {
      setBtnClicked(true)
      if(!color || !size) return
      if(auth.token == null) navigate("/login")
      else {

       
        //console.log(data)
        axios.post(process.env.REACT_APP_API_HOST + '/api/cart/addcart',{id: auth.id,pid, size, color, qty})
        .then(res => {
          //console.log(res)
          navigate("/cart")
        })
        .catch(err => console.log(err))
      }
    }

    const sizeBoxHandler = (e, size) => {
      sRef.current.classList.remove('sizeSelected')
      mRef.current.classList.remove('sizeSelected')
      lRef.current.classList.remove('sizeSelected')
      xlRef.current.classList.remove('sizeSelected')

      e.current.classList.add('sizeSelected')
      setSize(size)

    }

  return (
    <div className="viewPageBanner">
      <NavBarTest/>
      <div className="viewPageCont">
        <div className="viewPageContLeft">
          <img src={img} alt="" />
        </div>
        <div className="viewPageContRight">

          <p className="viewPageContRightTxtCont">{desc}</p>
          <div className="iCmXMarCnt">
            <div className="iCmXMarCntLCnt">
              <p className="viewPageContRightPrise">{price}<span>.00 LKR</span></p>
              <span className="showSpnData">Color:</span>
              <div className="viewPagecolorsCont">
              {
                colorData.map((item, i) => {
                  return <ColorContainer color={item.color} code={item.code} key={i} selectedColor={color} setColorMethod={setColor} />
                })
              }
              </div>
            </div>
            <div className="iCmXMarCntRCnt">
              <span>Free Shipping</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
          
          <span className="showSpnData">Size:</span>
          <div className="viewPageSizeBtnCont">
            <div className="viewPageSizeCont">
              <div ref={sRef} className="viewPageProSize" onClick={() => sizeBoxHandler(sRef, 'S')}>
                <p className="viewPageProSizePraX">s</p>
              </div>
              <div ref={mRef} className="viewPageProSize" onClick={() => sizeBoxHandler(mRef, 'M')}>
                <p className="viewPageProSizePraX">m</p>
              </div>
              <div ref={lRef} className="viewPageProSize" onClick={() => sizeBoxHandler(lRef, 'L')}>
                <p className="viewPageProSizePraX">l</p>
              </div>
              <div ref={xlRef} className="viewPageProSize" onClick={() => sizeBoxHandler(xlRef, 'XL')}>
                <p className="viewPageProSizePraX">xl</p>
              </div>

            </div>
            <button onClick={addTocart} >Add to Cart</button>
          </div>
          <p className={(!color || !size) && btnClicked ? "viewPgErrMsg show" : "viewPgErrMsg hide" }>Please select color and size</p>
          <div className="viewPageContRightInfo">
            <div className="viewPageContRightInfoCnt">
              <i class="fa-solid fa-shield-halved"></i>
              <p><span>Safe Payments</span>Payment methods used by many international shoppers</p>
            </div>
            <div className="viewPageContRightInfoCnt">
              <i class="fa-solid fa-lock"></i>
              <p><span>Security & Privacy</span>  We respect your privacy so your personal details are safe</p>
            </div>
            <div className="viewPageContRightInfoCnt">
              <i class="fa-solid fa-heart-pulse"></i>
              <p><span>Buyer Protection</span>  Get your money back if your order isn't delivered by estimated date or if you're not satisfied with your order</p>
            </div>
          </div>
        </div>
      </div>
      <div className="descCont"></div>
      <div className="viewPageProdDesc">
        <div className="viewPageProdDescCont">
          <p>{fullDesc}</p>
          <span className="viewDescTextHd">Description of </span>
          <span className="viewDescTextCh"><span>your</span> selection</span>
        </div>
      </div>
      <div className="viewPageCustSuggestionCnt">
        <div className="viewPageCustSuggestionCntImg"></div>
        <span className="viewPgCstSgstCntHt">More Suggestions</span>
        <span className="viewPgCstSgstCntCt"><span>specially</span> for you</span>
        <div className="viewPageCustSuggestionCntCnt">
          
            {
                allProduct.map((item, i) => {
                    return <Link to={`/navitest/${item._id}`} key={i} className="homeTestProductContLink" ><ItemTest id={item._id} desc={item.desc} price={item.price} img={item.img} /></Link>
                })
            }
        </div>
        
        
      </div>
      <div className="viewPageCommentCont">
        {
          comment.map((item, i) => {
            return <Comment comment={item.comment} uid={item.uid} key={i} />
          })
        }
        <span className="viewPgCommentCntHt">Unwrap Your</span>
        <span className="viewPgCommentCntCt"><span>werm</span> experience</span>
      </div>
      <FooterTest/>
    </div>
  )
}

export default View
