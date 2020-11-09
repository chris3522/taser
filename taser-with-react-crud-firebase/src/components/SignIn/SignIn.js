/* src/components/SignIn/SignIn.js */

import React from "react"
import { navigate } from "@reach/router"
import UserForm2 from "./UserForm2"
import * as h from "../../lib/helpers"
import basePath from "../../lib/env"

const BASE = basePath.BASE

const SignIn = ({ className, user, handleFirstSignInUser, signIns: { signInWithGoogle, signInWithEmailAndPassword }}) => {
    /*const connected = {
        "connected": true,
    }
    const handleConnectedAdmin = async (user) => {
        const taserId = h.slugify(user.email)
        const result = await api_root_info.updateConnectedAdmin(taserId,connected)
        if (result) { navigate(`${BASE}/taser/${taserId}`) }
    }*/
    if (user) {
        //handleConnectedAdmin(user)
        const taserId = h.slugify(user.email)
        handleFirstSignInUser(taserId)
        navigate(`${BASE}/taser/${taserId}`)
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
