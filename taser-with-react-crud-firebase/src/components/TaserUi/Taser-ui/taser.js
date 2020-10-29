import React, { useEffect, useState } from "react"
import useSWR from "swr"
import moment from 'moment'
import TaserTable from './taserTable'
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


//dayDate init with daypicker
/************************************************ */
//let dayDate = '2020-06-03'
let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */

export default function Taser({ taserId }) {
    const [mounted, setMounted] = useState(false)
    const [auth, setAuth] = useState(false)
    const [userAuthId, setUserAuthId] = useState("")
    const [selectedDay, setSelectedDay] = useState(undefined)
    useEffect(() => {
        console.log("render")
        setMounted(true)
    }, [])

    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */

    const { data: taserInfo, error: errorInfo } = useSWR([taserId, "taserInfo"], api_root_info.getInfoOnly)
    const { data: taserUsers, error: errorUsers } = useSWR([taserId, "users"], api_root_users.getUsers)
    const { data: taserVacations, error: errorVacations } = useSWR([taserId, "vacations"], api_root_vacations.getVacations)
    const { data: taserDesideratas, error: errorDesideratas } = useSWR([taserId, "desideratas"], api_root_desideratas.getDesideratas)

    /************************************* */
    //handlers
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
    const handleBlur = ({e, ...args}) => {
        inputHandleBlur({e, saveVacationOrDesiderataId, taserId, ...args})
    }
    const handleFocus = e => {
        inputHandleFocus(e)
    }
    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }
    const handleSubmit = ({ ...args }) => {
        const {taserUsers, userName} = args
        const userId = taserUsers.filter(user => user.name===userName)[0] && taserUsers.filter(user => user.name===userName)[0].id ? taserUsers.filter(user => user.name===userName)[0].id : false
        setUserAuthId(userId)
        userName === "service" && (setUserAuthId("service"))
        userName === "service" && (setAuth(!auth))
        userId && (setAuth(!auth))
        if (auth) {
            setAuth(!auth) 
            setUserAuthId("")
        } 
    }
    /************************************** */

    if (errorInfo) return <p>Error loading data!</p>
    else if (!taserInfo) return <p>Loading...</p>
    else if (!taserVacations) return <p>Loading...</p>
    else if (!taserDesideratas) return <p>Loading...</p>
    else if (!taserUsers) return <p>Loading...</p>
    else {
        const { name, desc, numberOfDays, numberOfTasers } = { ...taserInfo }
        const tabVacationsAndDesideratas = [...taserDesideratas, ...taserVacations]
        return (
            <div>
                <p className={"dateCurrent"}>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
                <div className={"row"}>
                    <div className={'dayPi five columns'} ><DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} localeUtils={MomentLocaleUtils} locale={'fr'} /></div>
                    <SignInUsers className={'seven columns'} handleSubmit={(userName) => handleSubmit ({taserUsers, userName})} auth={auth}/>
                </div>
                <h3>{name}</h3>
                {
                    [...Array(parseInt(numberOfTasers))].map((n, i) =>
                        <TaserTable key={i}
                            selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                            numberOfDays={parseInt(numberOfDays)}
                            activeSelectedDate={dayDate}
                            taserInfo={taserInfo}
                            taserUsers={taserUsers}
                            taserId={taserId}
                            auth={auth}
                            userAuthId={userAuthId}
                            /*handler*/
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                            handleKeyPress={(e) => handleKeyPress(e, tabVacationsAndDesideratas)}
                            handleKeyUp={handleKeyUp} />)}

            </div>
        )
    }
}


