import React, { useState, useReducer, useEffect } from "react"
import moment from 'moment'
import TaserTable from './taserTable'
import TaserTableRenfort from './taserTableRenfort'
import inputHandleFocus from './../Taser-ui-handler/cellFocusHandler'
import inputHandleBlur from './../Taser-ui-handler/cellBlurHandler'
import inputHandleKeyUp from './../Taser-ui-handler/cellKeyUpHandler'
import inputHandleKeyPress from './../Taser-ui-handler/cellKeyPressHandler'
import './taser.css'

import * as api_root_info from "../../../api/info"
import * as api_root_days from "../../../api/days"
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'
import C from './Reducer/constants'

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

export default function Taser({
    taserId,
    renforts,
    taserInfo,
    taserUsers,
    taserDesideratas,
    taserVacations,
    setAuthAdmin,
    authAdmin,
    taserConnectedAdmin,
    mutateConnectedAdmin,
    yearDays, yearDaysNext, yearDaysPrev,
    mutateYearDays, mutateYearDaysNext, mutateYearDaysPrev }) {
    //  setAuthAdmin(accessAdmin)

    /************************************************************ */
    // Init data fetching (initial data SSR with props from taserUI)
    /************************************************************ */
    const threeYears = [...yearDays[yearDays.year], ...yearDaysNext[yearDaysNext.year], ...yearDaysPrev[yearDaysPrev.year]]
    const threeYearsState = [yearDays, yearDaysNext, yearDaysPrev]
    const [actionDays, dispatchActionDays] = useReducer(reducers.actionDays)
    const [dataDays, dispatchDays] = useReducer(reducers.usersYears, threeYearsState)


    const [readyToSaveInBase, setReadyToSaveInBase] = useState(false)
    const [buttonConnectName, setButtonConnectName] = useState(false)
    const [displayConnectInfo, setDisplayConnectInfo] = useState(taserConnectedAdmin.connected ? 'displayBlock' : 'displayNone')
    const [userAuthId, setUserAuthId] = useState()
    const [selectedDay, setSelectedDay] = useState(undefined)
    console.log('userAuthId: ' + userAuthId)

    useEffect(() => {
        const saveInBase = async (data, taserId) => {
            //console.log(data)
            //data.map( year => api_root_days.createAllDays({taserId, year}))
            await data.map(stateData => {
                let year = Object.keys(stateData)[0]
                api_root_days.createAllDays({ taserId, stateData, year })
                return console.log("...saving in base")
            })
            console.log(data)
            dispatchActionDays(actions.resetActionLog())
            mutateYearDays()
            mutateYearDaysNext()
            mutateYearDaysPrev()
        }
        readyToSaveInBase && saveInBase(dataDays, taserId)
        console.log("effect")
    },[readyToSaveInBase,mutateYearDays, mutateYearDaysNext,mutateYearDaysPrev,taserId, dataDays])

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
        inputHandleBlur({ e, saveVacationOrDesiderataId, taserId, dispatchActionDays, ...args })
    }
    const handleFocus = e => {
        inputHandleFocus(e)
    }
    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }

    const handleSave = async ({ ...args }) => {
        const { actionDays } = args
        if (actionDays && actionDays.length > 0) {
            await actionDays.map(d => {
                switch (d.actionType) {
                    case C.ADD_DAY:
                        return dispatchDays(actions.addDayInTaser(d))
                    case C.REMOVE_DAY:
                        return dispatchDays(actions.removeDayInTaser(d.userId, d.dayNumber))
                    default:
                        return null
                }
            })
            setReadyToSaveInBase(true)
            setReadyToSaveInBase(false)
        }
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
        mutateConnectedAdmin({ ...taserConnectedAdmin, ...connect })
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

    if (!threeYearsState) return <p>..loading</p>
    else {
        const { name, desc, numberOfDays, numberOfTasers } = { ...taserInfo }
        console.log("desc: " + desc)
        const tabVacationsAndDesideratas = [...taserDesideratas, ...taserVacations]
        return (

            <div>
                <p className={"dateCurrent"}>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
                <div className={"row"}>
                    <div className={'dayPi five columns'} ><DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} localeUtils={MomentLocaleUtils} locale={'fr'} /></div>
                    <SignInUsers className={'seven columns'}
                        handleSubmit={(loginEntry) => handleSubmit({ taserUsers, loginEntry, taserConnectedAdmin })}
                        handleSave={() => handleSave({ actionDays })}
                        buttonConnectName={buttonConnectName} displayConnectInfo={displayConnectInfo} />
                </div>
                <h5>{name}</h5>
                {
                    [...Array(parseInt(numberOfTasers))].map((n, i) => {
                        return (
                            <TaserTable key={i}
                                selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                                numberOfDays={parseInt(numberOfDays)}
                                activeSelectedDate={dayDate}
                                taserInfo={taserInfo}
                                taserUsers={taserUsers}
                                threeYears={threeYears}
                                actionDays={actionDays}
                                taserId={taserId}
                                userAuthId={userAuthId}

                                /*handler*/
                                handleFocus={handleFocus}
                                handleBlur={handleBlur}
                                handleKeyPress={(e) => handleKeyPress(e, tabVacationsAndDesideratas)}
                                handleKeyUp={handleKeyUp} >

                                {/*renforts&&(
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
                            */}

                            </TaserTable>)
                    }

                    )}

            </div>
        )
    }
}


