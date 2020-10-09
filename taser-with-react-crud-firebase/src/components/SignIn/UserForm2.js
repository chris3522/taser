//A version of UserForm with useRef
import React, { useRef } from 'react'

const SubmitButton = props =>
<button {...props} className="button log-in" >{props.children}</button>

const UserForm = ({ onClick, children }) => {
    const inputEmail = useRef(null)
    const inputPwd = useRef(null)

    const handleClick = (e) => {
        e.preventDefault()
        onClick(inputEmail.current.value, inputPwd.current.value)
    }

    return (
        <div className="row log-in-div">
            <input className="log-in" ref={inputEmail} type="email" placeholder="test@mailbox.com"/>
            <input className="log-in" ref={inputPwd} type="password" placeholder="*******"/>   
            <SubmitButton onClick={handleClick} >{children}</SubmitButton>
        </div>
    )
}

export default UserForm
