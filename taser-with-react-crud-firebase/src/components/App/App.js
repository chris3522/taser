/* src/components/app/App.js */

import React, { useEffect } from "react"
import { Router, navigate, Link } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, Editor } from "components"
import './App.css'

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})

const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    /*  useEffect(() => {
          if (!user) {
              //navigate("/")
          }
      }, [user])*/
    //A un user loggé en admin correspond un tableau de service
    return (
        <Layout user={user}>
            {user && (
                <header>
                    <div className="user-profile">
                        <Link className="log-out-link" to="#log-out" onClick={() => {
                            signOut()
                            //navigate("/admin");
                        }}
                        >
                            Log Out
                        </Link>
                        {user.photoURL && (<img alt="Profile" src={user.photoURL} className="avatar" />)}
                    </div>
                </header>
            )}
            <Router>
                <SignIn className="section"
                    path="/admin"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {user && (<TaserInfo className="section" path="/admin/tasers" user={user} />)}
                {user && (<Editor className="section" path="/admin/tasers/:taserId" user={user} />)}
                {/* <Editor path="taser/:taserId/editor/:infoId" />*/}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
