import React from 'react'

const ItemTest = ({id, desc, price, img}) => {
  return (
    <div className="hmTstProCntCard">
        <div className="hmTstProCntCardImgCnt">
            <img src={img} alt="" />
        </div>
        <p className="hmTstProCntCardHdTxt">{desc}</p>
        <span>{price}.00 LKR</span>
        <div className="freeShp">Free Shipping</div>
        <div className="cshOnDel">Cash on Delivery</div>
    </div>
  )
}

export default ItemTest
