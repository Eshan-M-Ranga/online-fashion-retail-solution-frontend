import React, { useEffect, useState } from 'react'
import './Comment.css'
import axios from 'axios'

const Comment = ({comment, uid}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_HOST + '/api/user/getuserbyid', {_id: uid})
        .then(res => {
            //console.log(uid)
            setFirstName(res.data.response.firstName)
            setLastName(res.data.response.lastName)
        })
        .catch(error => console.log(error))
    }, [])


  return (
    <div className="commentcomment" >
        <div className="commentHeadCont">
            <span class="material-symbols-outlined">account_circle</span>
            <h4><span>{firstName}</span></h4>
            <h4>{lastName}</h4>
        </div>
        <div className="commentTxtcont">
            <p className="commentParaCont">{comment}</p>
        </div>
    </div>
  )
}

export default Comment
