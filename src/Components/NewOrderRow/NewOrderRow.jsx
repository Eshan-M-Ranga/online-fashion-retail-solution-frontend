import React from 'react'

const NewOrderRow = ({pid, color, size, qty}) => {
  return (
    <div>
      <div className="orderManageTableRow">
            <p>{pid}</p>
            <p>{color}</p>
            <p>{size}</p>
            <p>{qty}</p>
        </div>
    </div>
  )
}

export default NewOrderRow
