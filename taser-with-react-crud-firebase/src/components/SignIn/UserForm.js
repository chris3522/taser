import React, { useState } from 'react'

const Field = ({ children }) =>
    <div className="six columns">
        {children}
    </div>

const Input = ({ value, onChange, ...props }) =>
    <input 
        {...props}
        className="u-full-width"
        value={value}
        onChange={event => onChange(event.target.value)}
    />

const SubmitButton = props =>
    <button {...props}>submit</button>

const UserForm = ({ onClick }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = (e) => {
        e.preventDefault()
        onClick(email, password)
    }


    return (
        <div className="row">
            <Field>
                <label>Email</label> 
                <Input value={email} onChange={setEmail} type="email" placeholder="test@mailbox.com"/>
            </Field>
            <Field>
                <label>Password</label> 
                <Input value={password} onChange={setPassword} type="password" />
            </Field>
            <SubmitButton onClick={handleClick} />
        </div>
    )
}

export default UserForm