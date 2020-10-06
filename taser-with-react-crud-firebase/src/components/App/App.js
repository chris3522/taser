/* src/components/app/App.js */

import React from "react"
import { Router, navigate, Link } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout } from "components"

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})

const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    console.log(user)
    return (
        <Layout>
            <h2>Tableau de service</h2>
            {user && (
                <div>
                    <Link to="/#logout"

                        onClick={() => {
                            signOut()
                            navigate("/")
                        }}
                    >
                        Log Out</Link>
                    {user.profile && (<img alt="Profile" src={user.photoURL} />)}
                </div>
            )}
            <Router>
                <SignIn
                    path="/"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {user && (<TaserInfo path="tasers" user={user} />)}
                {/* <Editor path="taser/:taserId/editor/:infoId" />*/}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
