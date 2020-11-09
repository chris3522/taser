import React, { useState } from "react"
import useSWR from "swr"
import moment from 'moment'
import TaserTable from './taserTable'
import TaserTableRenfort from './taserTableRenfort'
import inputHandleFocus from './../Taser-ui-handler/cellFocusHandler'
import inputHandleBlur from './../Taser-ui-handler/cellBlurHandler'
import inputHandleKeyUp from './../Taser-ui-handler/cellKeyUpHandler'
import inputHandleKeyPress from './../Taser-ui-handler/cellKeyPressHandler'
import './taser.css'

import * as api_root_info from "../../../api/info"
import * as api_root_users from "../../../api/users"
import * as api_root_vacations from "../../../api/vacations"
import * as api_root_desideratas from "../../../api/desideratas"

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'
import { SignInUsers } from 'components'
import uiPass from '../../../lib/env'

const accessAllLines = uiPass.PWDTASERUI
const accessAdmin = uiPass.PWDTASERADMIN

//dayDate init with daypicker
/************************************************ */
//let dayDate = '2020-06-03'
let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */

export default function Taser({ taserId, renforts, setAuthAdmin, authAdmin, taserConnectedAdmin, mutateConnectedAdmin }) {
   //  setAuthAdmin(accessAdmin)
    const [buttonConnectName, setButtonConnectName] = useState(false)
    const [displayConnectInfo, setDisplayConnectInfo] = useState(taserConnectedAdmin.connected ? 'displayBlock' : 'displayNone')
    const [userAuthId, setUserAuthId] = useState()
    const [selectedDay, setSelectedDay] = useState(undefined)
    console.log('userAuthId: '+userAuthId)

    const rangeOfDays = selectedDay ? moment(selectedDay, 'YYYY-MM-DD').startOf('month').subtract(150, "days").format('YYYY-MM-DD') :
        moment(dayDate, 'YYYY-MM-DD').startOf('month').subtract(150, "days").format('YYYY-MM-DD')

    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */
    const { data: taserInfo, error: errorInfo } = useSWR([taserId, "taserInfo"], api_root_info.getInfoOnly)
    const { data: taserUsers, error: errorUsers } = useSWR([taserId, "users"], api_root_users.getUsers)
    const { data: taserVacations, error: errorVacations } = useSWR([taserId, "vacations"], api_root_vacations.getVacations)
    const { data: taserDesideratas, error: errorDesideratas } = useSWR([taserId, "desideratas"], api_root_desideratas.getDesideratas)
  
    /************************************* */
    //handlers for taser UI input cells
    /************************************* */
    //init for ui event handlers with 4 global let variables
    //init buffer for shorkey iteration (iterate "x" to switch desiderata)
    //key pressed must match tabVacationsAndDesirata shortKey
    //buffer used to iterate with the same shortkey
    let buffer = 0
    let colorCell = "white"
    let eraseDesiderataNameAndKeepColorInstead = false
    let saveVacationOrDesiderataId = ""
    const handleKeyPress = (e, tabVacationsAndDesideratas) => {
        let { eraseDesiderataNameAndKeepColorInstead1, buffer1, saveVacationOrDesiderataId1 } = inputHandleKeyPress(e, buffer, tabVacationsAndDesideratas, colorCell, eraseDesiderataNameAndKeepColorInstead, saveVacationOrDesiderataId)
        eraseDesiderataNameAndKeepColorInstead = eraseDesiderataNameAndKeepColorInstead1
        buffer = buffer1
        saveVacationOrDesiderataId = saveVacationOrDesiderataId1
    }
    const handleKeyUp = (e) => {
        inputHandleKeyUp(e, eraseDesiderataNameAndKeepColorInstead)
    }
    const handleBlur = ({ e, ...args }) => {
        inputHandleBlur({ e, saveVacationOrDesiderataId, taserId, ...args })
    }
    const handleFocus = e => {
        inputHandleFocus(e)
    }
    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }

    /*********************************************************** */
    //handlers for signin Authorization inside App (not login App)
    /*********************************************************** */

    const connected = {
        "connected": true,
    }
    const disconnected = {
        "connected": false,
    }
    const handleConnectedAdmin = async (connect) => {
        mutateConnectedAdmin( { ...taserConnectedAdmin, ...connect })
        await api_root_info.updateConnectedAdmin(taserId, connect)
    }
    const handleSubmit = async ({ ...args }) => {
        const { taserUsers, loginEntry, taserConnectedAdmin } = args
        const isConnectedAdmin = taserConnectedAdmin.connected
        const userId = taserUsers.filter(user => user.name === loginEntry)[0] && taserUsers.filter(user => user.name === loginEntry)[0].id ? taserUsers.filter(user => user.name === loginEntry)[0].id : false
        if (taserConnectedAdmin && buttonConnectName === false) {
            switch (loginEntry) {
                case accessAdmin:
                    setAuthAdmin(accessAdmin)
                    setButtonConnectName(true)
                    setUserAuthId(accessAllLines)
                    handleConnectedAdmin(connected)
                    setDisplayConnectInfo('displayBlock')
                    break
                case accessAllLines:
                    !isConnectedAdmin && (setUserAuthId(accessAllLines))
                    !isConnectedAdmin && (setButtonConnectName(true))
                    isConnectedAdmin && (alert("Administrateur connecté : connexion impossible"))
                    break;
                default:
                    userId && !isConnectedAdmin && (setUserAuthId(userId))
                    userId && !isConnectedAdmin && (setButtonConnectName(true))
                    userId && isConnectedAdmin && (alert("Administrateur connecté : connexion impossible"))
            }
        }
        else {
            setAuthAdmin(false)
            setButtonConnectName(false)
            setDisplayConnectInfo('displayNone')
            setUserAuthId()
            handleConnectedAdmin(disconnected)
        }
    }

    /************************************** */

    if (errorInfo) return <p>Error loading data!</p>
    else if (errorUsers) return <p>Error loading data!</p>
    else if (errorVacations) return <p>Error loading data!</p>
    else if (errorDesideratas) return <p>Error loading data!</p>
    else if (!taserInfo) return <p>Loading...</p>
    else if (!taserVacations) return <p>Loading...</p>
    else if (!taserDesideratas) return <p>Loading...</p>
    else if (!taserUsers) return <p>Loading...</p>
    else if (!renforts) return <p>Loading...</p>
    //else if (!taserConnectedAdmin) return <p>Loading...</p>
    else {
        const { name, desc, numberOfDays, numberOfTasers } = { ...taserInfo }
        console.log("desc: "+desc)
        const tabVacationsAndDesideratas = [...taserDesideratas, ...taserVacations]
        return (

            <div>
                <p className={"dateCurrent"}>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
                <div className={"row"}>
                    <div className={'dayPi five columns'} ><DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} localeUtils={MomentLocaleUtils} locale={'fr'} /></div>
                    <SignInUsers className={'seven columns'} handleSubmit={(loginEntry) => handleSubmit({ taserUsers, loginEntry, taserConnectedAdmin })} buttonConnectName={buttonConnectName} displayConnectInfo ={displayConnectInfo}/>
                </div>
                <h5>{name}</h5>
                {
                    [...Array(parseInt(numberOfTasers))].map((n, i) =>{
                    return(
                        <TaserTable key={i}
                            selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                            numberOfDays={parseInt(numberOfDays)}
                            activeSelectedDate={dayDate}
                            taserInfo={taserInfo}
                            taserUsers={taserUsers}
                            taserId={taserId}
                            userAuthId={userAuthId}
                            rangeOfDays={rangeOfDays}
                            /*handler*/
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                            handleKeyPress={(e) => handleKeyPress(e, tabVacationsAndDesideratas)}
                            handleKeyUp={handleKeyUp} >
                            {renforts&&(
                                [...Array(renforts.length)].map((n, j) =>
                                        <TaserTableRenfort key={`renfort-${j}`}
                                        selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                                        numberOfDays={parseInt(numberOfDays)}
                                        activeSelectedDate={dayDate}
                                        taserInfo={taserInfo}
                                        userAuthId={false}
                                        rangeOfDays={rangeOfDays}
                                        renforts={renforts[j]}/>)
                                )
                            }
                        </TaserTable>)}

                    )}

            </div>
        )
    }
}


