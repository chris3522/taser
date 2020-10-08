//A version of UserForm with useRef
import React, { useRef } from 'react'

const SubmitButton = props =>
<button {...props} className="u-full-width" >{props.children}</button>

const UserForm = ({ onClick, children }) => {
    const inputEmail = useRef(null)
    const inputPwd = useRef(null)

    const handleClick = (e) => {
        e.preventDefault()
        onClick(inputEmail.current.value, inputPwd.current.value)
    }

    return (
        <div >
            <input className="u-full-width" ref={inputEmail} type="email" placeholder="test@mailbox.com"/>
            <input className="u-full-width" ref={inputPwd} type="password" placeholder="*******"/>   
            <SubmitButton onClick={handleClick} >{children}</SubmitButton>
        </div>
    )
}

export default UserForm
