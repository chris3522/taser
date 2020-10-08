/* src/components/SignIn/SignIn.js */

import React from "react"
import { navigate } from "@reach/router"
import UserForm2 from "./UserForm2"

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
                    <UserForm2 onClick={signInWithEmailAndPassword}>Connexion avec Email</UserForm2>
                </div>
            </div>
        )
    }
}

export default SignIn
