/* src/components/SignIn/SignIn.js */

import React from "react"
import { navigate } from "@reach/router"
import UserForm2 from "./UserForm2"

const SignIn = ({ className, user, signIns: { signInWithGoogle, signInWithEmailAndPassword } }) => {
    if (user) {
        navigate("/admin/tasers") 
        console.log(user.email)
    return null
    } else {
        return (
            <div className={`${className}`}>
                    {/*<div className="six columns">
                                <button onClick={signInWithGoogle} className="u-full-width">Connexion avec Google</button>
                            </div>*/}
                    <UserForm2 onClick={signInWithEmailAndPassword}>Connexion</UserForm2>
            </div>
        )
    }
}

export default SignIn
