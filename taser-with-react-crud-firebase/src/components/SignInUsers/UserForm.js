//A version of UserForm with useRef
import React, { useRef } from 'react'
import styles from './SignInUsers.module.css'

const SubmitButton = props =>
    <button {...props} className={`four columns ${styles.button}`} >{props.children}</button>

const UserForm = ({ onClick, children, auth }) => {
    const inputUser = useRef(null)

    const handleClick = (e) => {
        e.preventDefault()
        onClick(inputUser.current.value)
    }

    return (
        <div className="row">
            <input className="four columns" ref={inputUser} type="text" placeholder="Nom"/>
            <SubmitButton onClick={handleClick} >{children}</SubmitButton>
        </div>
    )
}

export default UserForm
