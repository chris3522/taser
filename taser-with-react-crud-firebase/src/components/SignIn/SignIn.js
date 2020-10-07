/* src/components/SignIn/SignIn.js */

import React from "react"
import { navigate } from "@reach/router"
import UserForm from "./UserForm"

const SignIn = ({ user, signIns: { signInWithGoogle, signInWithEmailAndPassword } }) => {
    if (user) {
        navigate("/tasers") 
        console.log(user.email)
    return null
    } else {
        return (
            <div className="row">
                <div className="six columns">
                    <button onClick={signInWithGoogle} className="u-full-width">Connexion avec Google</button>
                </div>
                <div className="six columns">
                    <UserForm onClick={signInWithEmailAndPassword}>Connexion avec Email</UserForm>
                </div>
            </div>
        )
    }
}

export default SignIn
