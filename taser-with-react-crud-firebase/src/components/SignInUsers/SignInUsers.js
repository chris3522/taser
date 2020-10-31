/* src/components/SignIn/SignIn.js */

import React from "react"
import UserForm from "./UserForm"

const SignInUsers = ({ className, handleSubmit, authTaserUi}) => {
    const buttonName = !authTaserUi ? "Connexion" : "Déconnexion"
    return (
        <div className={`${className}`}>
            <UserForm onClick={handleSubmit}>{buttonName}</UserForm>
        </div>
    )
}

export default SignInUsers
