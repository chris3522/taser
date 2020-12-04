/* src/components/app/App.js */

import React, { useState, useReducer, useEffect } from "react"
import { Router, navigate } from "@reach/router"
import withFirebaseAuth from "react-with-firebase-auth"
import { firebaseAppAuth, providers } from "../../lib/firebase"
import { SignIn, TaserInfo, Layout, UserEditor, Home, TaserUi, VacationEditor, DesiderataEditor, Link, RenfortEditor } from "components"
import './App.css'
import * as h from "../../lib/helpers"
import * as api_root_connect from "../../api/connected"
import basePath from "../../lib/env"
import * as api_root_tasers from "../../api/tasers"

import * as reducers from '../TaserInfo/Reducer/reducers'
import * as actions from '../TaserInfo/Reducer/actions'

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})
const BASE = basePath.BASE
const disconnected = false
const connectedDefaultState = {connected: { connected:false, adminUid: undefined, id: undefined}}

const App = ({ signInWithGoogle, signInWithEmailAndPassword, signOut, user }) => {
    const NotFound = () => <p>Sorry, nothing here</p>
    
    /*********************define admin connected state  *********************** */
    const [authAdmin, dispatchAuthAdmin] = useReducer(reducers.connect,connectedDefaultState)

    /***********************init admin connected state state************************* */
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        if (user && !firstInit) {
            const taserId = h.slugify(user.email)
            const adminUid = user.uid
            dispatchAuthAdmin(actions.initConnected(disconnected, adminUid, taserId))
            setFirstInit(true)
        }
    }, [firstInit, user, dispatchAuthAdmin, setFirstInit])
   // console.log('authAdmin: '+authAdmin)
    //A un user loggé en admin correspond un tableau de service
    //console.log('*****'+process.env.REACT_APP_BASEPATH)
    const handleFirstSignInUser = async (taserId) => {           
        const data = await api_root_tasers.getTasers2()
        const dataArray = data.filter(taser => taser.info.id===taserId)
        if (dataArray === undefined || dataArray.length === 0) {
            dispatchAuthAdmin(actions.updateConnected(true))
            navigate(`${BASE}/admin/taser`)
        }
    }
    return (
        <Layout user={user}>
            {user && (
                <header>
                    <div className="user-profile">
                        <Link className="log-out-link" to="/#log-out" onClick={async () => {
                            const taserId = h.slugify(user.email)
                            setFirstInit(false)
                            const stateData = {connected : {connected :disconnected}}
                            await api_root_connect.createConnected({taserId, stateData})
                            signOut()                     
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
                {user && (<TaserUi className="section" path="/taser/:taserId" user={user} 
                    authAdmin={authAdmin}
                    dispatchAuthAdmin={dispatchAuthAdmin} 
                    />)}
                <SignIn
                    className="section"
                    path="/login"
                    user={user}
                    signIns={{ signInWithGoogle, signInWithEmailAndPassword }}
                    handleFirstSignInUser={handleFirstSignInUser}
                />
                {user && authAdmin && (<TaserInfo className="section" path="/admin/taser" user={user} authAdmin={authAdmin} />)}
                {user && authAdmin && (<UserEditor className="section" path="/admin/:taserId/users" user={user} />)}
                {user && authAdmin && (<VacationEditor className="section" path="/admin/:taserId/vacations" user={user} />)}
                {user && authAdmin && (<DesiderataEditor className="section" path="/admin/:taserId/desideratas" user={user} />)}
                {user && authAdmin && (<RenfortEditor className="section" path="/admin/:taserId/renforts" user={user} />)}
            </Router>
        </Layout>
    )
}

export default createComponentWithAuth(App)
