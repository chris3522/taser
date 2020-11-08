/* src/components/SignIn/SignIn.js */

import React from "react"
import UserForm from "./UserForm"

const SignInUsers = ({ className, handleSubmit, buttonConnectName, displayConnectInfo }) => {
    const buttonName = !buttonConnectName ? "Connexion" : "Déconnexion"

    return (
        <div className={`${className}`}>
            <UserForm onClick={handleSubmit}>{buttonName}</UserForm>
            <div className={displayConnectInfo}>
                <code>Connexion bloquée par l'administrateur</code>
            </div>
        </div>

    )
}

export default SignInUsers
