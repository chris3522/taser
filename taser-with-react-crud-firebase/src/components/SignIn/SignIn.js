/* src/components/SignIn/SignIn.js */

import React from "react"
import { navigate } from "@reach/router"
import UserForm from "./UserForm"

const SignIn = ({ user, signIns: { signInWithGoogle, signInWithEmailAndPassword } }) => {
  if (user) {
    navigate(`/tasers`)
    return null
  } else {
    return (
      <div className="sign-in-page">
        <h3>
          Bienvenue sur le tableau de service
        </h3>
        <p>
          Connectez-vous avec voter compte google
        </p>
        <div className="sign-in-buttons">
          <button onClick={signInWithGoogle}>Connexion avec Google</button>
          <UserForm onClick={signInWithEmailAndPassword}>Connexion avec Email</UserForm>
        </div>
      </div>
    )
  }
}

export default SignIn
