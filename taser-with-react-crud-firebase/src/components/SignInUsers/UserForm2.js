//A version of UserForm with useRef
import React from 'react'
import styles from './SignInUsers.module.css'

const SubmitButton = props =>
    <button {...props} className={`four columns ${styles.button}`} >{props.children}</button>

const UserForm = ({ onClick, children, auth }) => {

    const handleClick = (e) => {
        e.preventDefault()
        onClick()
    }
    return (
        <div className="row">
            <SubmitButton onClick={handleClick} >{children}</SubmitButton>
        </div>
    )
}
export default UserForm
