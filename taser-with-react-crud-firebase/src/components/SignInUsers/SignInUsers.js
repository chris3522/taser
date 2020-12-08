/* src/components/SignIn/SignIn.js */

import React from "react"
import UserForm from "./UserForm"
import UserForm2 from "./UserForm2"

const SignInUsers = ({ className, handleSubmit, buttonConnectName, displayConnectInfo, handleSave, userAuthId }) => {
    const buttonName = !buttonConnectName ? "Connexion" : "Déconnexion"
    return (
        <div className={`${className}`}>
            <UserForm onClick={handleSubmit} userAuthId={userAuthId}>{buttonName}</UserForm>
            {buttonConnectName &&
                <UserForm2 onClick={handleSave}>Enregister</UserForm2>
            }
            <div className={displayConnectInfo}>
                <code>Connexion bloquée par l'administrateur</code>
            </div>
            {userAuthId && <div> <code>{`${userAuthId} est connecté`}</code></div>}
        </div>

    )
}

export default SignInUsers
