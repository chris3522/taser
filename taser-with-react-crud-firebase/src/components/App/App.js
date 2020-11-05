/* src/components/app/App.js */

import React, { useEffect, useState } from "react"
import { Router } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, UserEditor, Home, TaserUi, VacationEditor, DesiderataEditor, Link, RenfortEditor } from "components"
import './App.css'
import * as h from "../../lib/helpers"
import * as api_root_info from "../../api/info"
import basePath from "../../lib/env"
import { auth } from "firebase"

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})

const BASE = basePath.BASE
const disconnected = {
    "connected": false,
}

const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    const [authAdmin, setAuthAdmin] = useState()
    console.log('*'+authAdmin)
    /*useEffect(() => {
        const cleanup = async (ev) => {
            if (user) {
                ev.preventDefault()
                const taserId = h.slugify(user.email)
                api_root_info.updateConnectedAdmin(taserId, disconnected)
                signOut()
                console.log("disconnected")
                return null
            } else { return null }
        }
        window.addEventListener('beforeunload', cleanup)
        return () => window.removeEventListener('beforeunload', cleanup)
    }, [user])*/
    //A un user loggé en admin correspond un tableau de service
    const NotFound = () => <p>Sorry, nothing here</p>

    console.log(process.env.REACT_APP_BASEPATH)
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
                <Home className="section" path="/" />
                <TaserUi className="section" path="/taser/:taserId" user={user} setAuthAdmin={setAuthAdmin}/>
                <SignIn
                    className="section"
                    path="/login"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                />
                {authAdmin && (<TaserInfo className="section" path="/admin/taser" user={user} authAdmin={authAdmin}/>)}
                {authAdmin && (<UserEditor className="section" path="/admin/:taserId/users" user={user} />)}
                {authAdmin && (<VacationEditor className="section" path="/admin/:taserId/vacations" user={user} />)}
                {authAdmin && (<DesiderataEditor className="section" path="/admin/:taserId/desideratas" user={user} />)}
                {authAdmin && (<RenfortEditor className="section" path="/admin/:taserId/renforts" user={user} />)}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
