/* src/components/app/App.js */

import React, { useEffect } from "react"
import { Router, navigate, Link } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, UserEditor, Home, TaserUi, VacationEditor, DesiderataEditor } from "components"
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
    const NotFound = () => <p>Sorry, nothing here</p>
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
                <NotFound default />
                <Home className="section" path="/"/>
                {/*ajouter les taserId authoriser avant de continuer sur TaserUi*/}
                <TaserUi className="section" path="/taser/:taserId"/>
                <SignIn 
                    className="section"
                    path="/admin"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {user && (<TaserInfo className="section" path="/admin/taser" user={user} />)}
                {user && (<UserEditor className="section" path="/admin/:taserId/users" user={user} />)}
                {user && (<VacationEditor className="section" path="/admin/:taserId/vacations" user={user} />)}
                {user && (<DesiderataEditor className="section" path="/admin/:taserId/desideratas" user={user} />)}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
