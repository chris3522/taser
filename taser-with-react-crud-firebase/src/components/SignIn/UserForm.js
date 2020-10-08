//A version of UserForm with useState
import React, { useState } from 'react'

const Input = ({ value, onChange, ...props }) =>
    <input 
        {...props}
        className="u-full-width"
        value={value}
        onChange={event => onChange(event.target.value)}
    />

const SubmitButton = props =>
<button {...props} className="u-full-width" >{props.children}</button>

const UserForm = ({ onClick, children }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = (e) => {
        e.preventDefault()
        onClick(email, password)
    }

    return (
        <div >
            <Input value={email} onChange={setEmail} type="email" placeholder="test@mailbox.com"/>
            <Input value={password} onChange={setPassword} type="password" placeholder="*******"/>   
            <SubmitButton onClick={handleClick} >{children}</SubmitButton>
        </div>
    )
}

export default UserForm