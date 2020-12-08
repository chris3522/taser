import React, { useState, useReducer, useEffect } from "react"
import moment from 'moment'
import TaserTable from './taserTable'
import TaserTableRenfort from './taserTableRenfort'
import inputHandleFocus from './../Taser-ui-handler/cellFocusHandler'
import inputHandleBlur from './../Taser-ui-handler/cellBlurHandler'
import inputHandleKeyUp from './../Taser-ui-handler/cellKeyUpHandler'
import inputHandleKeyPress from './../Taser-ui-handler/cellKeyPressHandler'

import * as api_root_days from "../../../api/days"
import * as api_root_connect from "../../../api/connected"
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'
import { renfortCreateList } from '../../../lib/helpers'
import C from './Reducer/constants'

import { SignInUsers, Statistics } from 'components'
import uiPass from '../../../lib/env'

const accessAllLines = uiPass.PWDTASERUI
const accessAdmin = uiPass.PWDTASERADMIN


export default function Taser({
    taserId,
    dayDate,
    renforts,
    taserInfo,
    taserUsers,
    taserDesideratas,
    taserVacations,
    authAdmin,
    userAuthId,
    buttonConnectName, setButtonConnectName, displayConnectInfo, setDisplayConnectInfo,
    setUserAuthId,
    mutateTaserAuthAdmin,
    isExtraYear,
    yearDays, yearDaysNext, yearDaysPrev, yearDaysSelect,
    mutateYearDays, mutateYearDaysNext, mutateYearDaysPrev, mutateYearDaysSelect,
    yearDaysRenfort, yearDaysRenfortNext, yearDaysRenfortPrev, yearDaysRenfortSelect, }) {


    /************************************************************ */
    // Init data fetching (initial data SSR with props from taserUI)
    /************************************************************ */
    // const [renfortYears, setRenfortYears] = useState()
    /*********fetch data years************************************************ */
    const fourYears = [...yearDays[yearDays.year], ...yearDaysNext[yearDaysNext.year], ...yearDaysPrev[yearDaysPrev.year]].concat(isExtraYear && yearDaysSelect.year ? yearDaysSelect[yearDaysSelect.year] : [])
    const fourYearsReducer = (acc, user) => {
        let days = user[Object.keys(user)[0]]
        return acc.concat(days)
    }
    const fourYearsReducer2 = (acc, day) => {
        let day2 = day[Object.keys(day)[0]][0]
        return acc.concat(day2)
    }
    const fourYearsReduce = fourYears.reduce(fourYearsReducer, []).reduce(fourYearsReducer2, []).filter(day => day !== undefined)
    const fourYearsState = [yearDays, yearDaysNext, yearDaysPrev].concat(isExtraYear ? yearDaysSelect : [])

    /*********Set reducer to button save*************************************** */
    const [actionDays, dispatchActionDays] = useReducer(reducers.actionDays)
    const [dataDays, dispatchDays] = useReducer(reducers.usersYears, fourYearsState)
    /*********Set reducer to persist data with all inputs********************** */
    const [dataDaysPersistence, dispatchDataDaysPersistence] = useReducer(reducers.persistDays, fourYearsReduce)

    /*********fetch data  renforts years************************************** */
    const renfortYears = yearDaysRenfort && yearDaysRenfort.length ? yearDaysRenfort.map(
        renfort => renfortCreateList([...renfort[renfort.year]])
    ) : []
    const renfortYearsNext = yearDaysRenfortNext && yearDaysRenfortNext.length ? yearDaysRenfortNext.map(
        renfort => renfortCreateList([...renfort[renfort.year]])
    ) : []
    const renfortYearsPrev = yearDaysRenfortPrev && yearDaysRenfortPrev.length ? yearDaysRenfortPrev.map(
        renfort => renfortCreateList([...renfort[renfort.year]])
    ) : []
    const renfortYearsSelect = yearDaysRenfortSelect && yearDaysRenfortSelect.length ? yearDaysRenfortSelect.map(
        renfort => renfortCreateList([...renfort[renfort.year]])
    ) : []

    const renfortFourYears0 = renforts.map(
        (n, i) => renfortYears[i].concat(renfortYearsNext[i]).concat(renfortYearsPrev[i]).concat(renfortYearsSelect[i])
    )
    const renfortFourYears = renfortFourYears0.map(
        taser => taser.filter(d => d !== undefined)
    )
    /************concat all days and all years  (renfort and taser in one)****************** */
    const allDaysFromAllPersistTasers = dataDaysPersistence.concat(renfortFourYears && renfortFourYears.length > 0 ? renfortFourYears.reduce((a, b) => a.concat(b)) : [])

    /***********handlers for saving data *************************************************** */
    const [readyToSaveInBase, setReadyToSaveInBase] = useState(false)

    useEffect(() => {
        const saveInBase = async (data, taserId) => {
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
            mutateYearDaysSelect()
        }
        readyToSaveInBase && saveInBase(dataDays, taserId)
    }, [readyToSaveInBase, mutateYearDays, mutateYearDaysNext, mutateYearDaysPrev, mutateYearDaysSelect, taserId, dataDays])

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
            await mutateYearDays()
            await mutateYearDaysNext()
            await mutateYearDaysPrev()
            await mutateYearDaysSelect()
            setReadyToSaveInBase(true)
            setReadyToSaveInBase(false)
        }
    }

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
        inputHandleBlur({ e, saveVacationOrDesiderataId, taserId, dispatchActionDays, dispatchDataDaysPersistence, ...args })
    }
    const handleFocus = e => {
        inputHandleFocus(e)
    }




    /*********************************************************** */
    //handlers for signin Authorization inside App (not login App)
    /*********************************************************** */
    let isAuthAdmin = authAdmin.connected.connected

    console.log('userAuthId: ' + userAuthId)
    const connected = {
        "connected": true,
    }
    const disconnected = {
        "connected": false,
    }

    const handleConnectedAdmin = async (connect) => {
        const stateData = { connected: { ...authAdmin.connected, ...connect } }
        mutateTaserAuthAdmin(stateData, false)
        isAuthAdmin = connect.connected
        await api_root_connect.createConnected({ taserId, stateData })

    }
    const handleSubmit = async ({ ...args }) => {
        const { taserUsers, loginEntry, isAuthAdmin } = args
        const userId = taserUsers.filter(user => user.name === loginEntry)[0] && taserUsers.filter(user => user.name === loginEntry)[0].id ? taserUsers.filter(user => user.name === loginEntry)[0].id : false
        if (buttonConnectName === false) {
            switch (loginEntry) {
                case accessAdmin:
                    setButtonConnectName(true)
                    setUserAuthId(accessAllLines)
                    handleConnectedAdmin(connected)
                    setDisplayConnectInfo('displayBlock')
                    break
                case accessAllLines:
                    !isAuthAdmin && (setUserAuthId(accessAllLines))
                    !isAuthAdmin && (setButtonConnectName(true))
                    isAuthAdmin && (alert("Administrateur connecté : connexion impossible"))
                    break;
                default:
                    userId && !isAuthAdmin && (setUserAuthId(userId))
                    userId && !isAuthAdmin && (setButtonConnectName(true))
                    userId && isAuthAdmin && (alert("Administrateur connecté : connexion impossible"))
            }
        }
        else {
            setButtonConnectName(false)
            setDisplayConnectInfo('displayNone')
            setUserAuthId()
            handleConnectedAdmin(disconnected)
        }
    }

    const isRequiredVacationsNumber = taserVacations.reduce((acc, vacation) => {
        if (vacation && vacation.isRequired === "required") {
            acc++
        }
        return acc
    }, 0)
    const requiredVacationsArray = taserVacations.reduce((acc, vacation) => {
        if (vacation && vacation.isRequired === "required") {
            acc.push(vacation.name)
        }
        return acc
    }, [])

    /************************************** */
    if (!fourYearsState) return <p>..loading</p>
    else {
        const { name, desc, numberOfDays, numberOfTasers } = { ...taserInfo }
        console.log("desc: " + desc)
        const tabVacationsAndDesideratas = [...taserDesideratas, ...taserVacations]
        return (

            <div>
                <div className={"row"}><h5>{name}</h5> </div>
                {
                    [...Array(parseInt(numberOfTasers))].map((n, i) => {
                        return (
                            <TaserTable key={i}
                                selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                                numberOfDays={parseInt(numberOfDays)}
                                activeSelectedDate={dayDate}
                                taserInfo={taserInfo}
                                taserUsers={taserUsers}
                                dataDaysPersistence={dataDaysPersistence}
                                allDaysFromAllPersistTasers={allDaysFromAllPersistTasers}
                                isRequiredVacationsNumber={isRequiredVacationsNumber}
                                requiredVacationsArray={requiredVacationsArray}
                                taserId={taserId}
                                userAuthId={userAuthId}

                                /*handler*/
                                handleFocus={handleFocus}
                                handleBlur={handleBlur}
                                handleKeyPress={(e) => handleKeyPress(e, tabVacationsAndDesideratas)}
                                handleKeyUp={handleKeyUp} >

                                {renforts && (
                                    [...Array(renforts.length)].map((n, j) =>
                                        <TaserTableRenfort key={`renfort-${j}`}
                                            selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                                            numberOfDays={parseInt(numberOfDays)}
                                            activeSelectedDate={dayDate}
                                            userAuthId={false}
                                            isRequiredVacationsNumber={isRequiredVacationsNumber}
                                            renfortYears={renfortFourYears[j]}
                                            renforts={renforts[j]} />)
                                )
                                }

                            </TaserTable>)
                    }

                    )}
                <div className={"row"}>
                    <SignInUsers className={''}
                        handleSubmit={(loginEntry) => handleSubmit({ taserUsers, loginEntry, isAuthAdmin })}
                        handleSave={() => handleSave({ actionDays })}
                        buttonConnectName={buttonConnectName} 
                        displayConnectInfo={displayConnectInfo} 
                        userAuthId={userAuthId}
                        taserUsers={taserUsers} />
                </div>
                <div className={"row section"}>
                    <h5>Stats</h5>
                    <Statistics
                        dataDaysPersistence={dataDaysPersistence}
                        tabVacationsAndDesideratas={tabVacationsAndDesideratas}
                        taserUsers={taserUsers}
                        yearDays={[yearDays.year]}
                        yearDaysNext={[yearDaysNext.year]}
                        yearDaysPrev={[yearDaysPrev.year]}
                        yearDaysSelect={isExtraYear && yearDaysSelect.year ? [yearDaysSelect.year] : []}
                    />
                </div>

            </div>
        )
    }
}


