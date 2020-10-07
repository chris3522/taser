/* src/components/app/App.js */

import React, { useEffect } from "react"
import { Router, navigate, Link } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout } from "components"
import './App.css'

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})

const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])
    return (
        <Layout>
            {user && (
                <div>
                    <Link to="#log-out" onClick={() => {
                        signOut()
                        //navigate("/");
                    }}
                    >
                        Log Out
                    </Link>
                    {user.photoURL && (<img alt="Profile" src={user.photoURL} className="avatar" />)}
                </div>
            )}
            <Router>
                <SignIn
                    path="/"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {user && (<TaserInfo path="/tasers" user={user} />)}
                {/* <Editor path="taser/:taserId/editor/:infoId" />*/}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
