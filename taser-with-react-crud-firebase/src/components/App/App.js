/* src/components/app/App.js */

import React, { useState } from "react"
import { Router, navigate } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, UserEditor, Home, TaserUi, VacationEditor, DesiderataEditor, Link, RenfortEditor } from "components"
import './App.css'
import * as h from "../../lib/helpers"
import * as api_root_info from "../../api/info"
import basePath from "../../lib/env"


const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})
const BASE = basePath.BASE
const disconnected = {
    "connected": false,
}


const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    const NotFound = () => <p>Sorry, nothing here</p>
    const [authAdmin, setAuthAdmin] = useState()
    console.log('authAdmin: '+authAdmin)
    //A un user loggé en admin correspond un tableau de service
    //console.log('*****'+process.env.REACT_APP_BASEPATH)
    return (
        <Layout user={user}>
            {user && (
                <header>
                    <div className="user-profile">
                        <Link className="log-out-link" to="/#log-out" onClick={async () => {
                            const taserId = h.slugify(user.email)
                            const result = await api_root_info.updateConnectedAdmin(taserId, disconnected)
                            if (result) {
                                signOut()
                                navigate(`${BASE}/login`)
                            }
                        }}
                        >
                            Log Out
                        </Link>
                        {user.photoURL && (<img alt="Profile" src={user.photoURL} className="avatar" />)}
                    </div>
                </header>
            )}
            <Router basepath={BASE}>
                <NotFound default />
                <Home className="section" user={user} path="/" />
                {user && (<TaserUi className="section" path="/taser/:taserId" user={user} setAuthAdmin={setAuthAdmin} authAdmin={authAdmin}/>)}
                <SignIn
                    className="section"
                    path="/login"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {user && authAdmin && (<TaserInfo className="section" path="/admin/taser" user={user} authAdmin={authAdmin}/>)}
                {user && authAdmin && (<UserEditor className="section" path="/admin/:taserId/users" user={user} />)}
                {user && authAdmin && (<VacationEditor className="section" path="/admin/:taserId/vacations" user={user} />)}
                {user && authAdmin && (<DesiderataEditor className="section" path="/admin/:taserId/desideratas" user={user} />)}
                {user && authAdmin && (<RenfortEditor className="section" path="/admin/:taserId/renforts" user={user} />)}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
