/* src/components/app/App.js */

import React, { useEffect } from "react"
import { Router, navigate, Link } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, UserEditor, Home, TaserUi, VacationEditor, DesiderataEditor } from "components"
import './App.css'
import * as h from "../../lib/helpers"
import * as api_root_info from "../../api/info"

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
    const disconnected = {
        "connected": false,
    }
    return (
        <Layout user={user}>
            {user && (
                <header>
                    <div className="user-profile">
                        <Link className="log-out-link" to="#log-out" onClick={async () => {
                            const taserId = h.slugify(user.email)
                            const result = await api_root_info.updateConnectedAdmin(taserId,disconnected)
                            if (result) {signOut()}
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
                <TaserUi className="section" path="/taser/:taserId" user={user}/>
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
