import React, { useState } from 'react'

const Field = ({ children }) =>
    <>
        {children}
    </>

const Input = ({ value, onChange, ...props }) =>
    <input
        {...props}
        value={value}
        onChange={event => onChange(event.target.value)}
    />

const SubmitButton = props =>
    <button {...props}>submit</button>

const UserForm = ({ onClick }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = () => onClick(email,password)
    

    return (
        <>
            <Field>
                email: <Input value={email} onChange={setEmail} />
            </Field>
            <Field>
                password: <Input value={password} onChange={setPassword} type="password" />
            </Field>
            <SubmitButton onClick={handleClick} />
        </>
    )
}

export default UserForm