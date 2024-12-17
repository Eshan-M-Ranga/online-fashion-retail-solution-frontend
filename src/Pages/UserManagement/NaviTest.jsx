import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NaviTest = () => {

    const {pid} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(pid) navigate(`/view/${pid}`)
    },[pid])


  return (
    <div>
    </div>
  )
}

export default NaviTest
