import React, { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import moment from 'moment'
import TaserTable from './taserTable'
import inputHandleFocus from './../Taser-ui-handler/cellFocusHandler'
import inputHandleBlur from './../Taser-ui-handler/cellBlurHandler'
import inputHandleKeyUp from './../Taser-ui-handler/cellKeyUpHandler'
import inputHandleKeyPress from './../Taser-ui-handler/cellKeyPressHandler'
import './taser.css'


//import useTaserInfo from '../../swr-data/use-taserInfo'
import * as api_root_info from "../../../api/info"
//import useTaserDays from '../../swr-data/use-taserDays'
//import useTaserDesideratas from '../../swr-data/use-taserDesideratas'
//import useTaserVacations from '../../swr-data/use-taserVacations'
//import useTaserUsers from '../../swr-data/use-taserUsers'
import * as api_root_users from "../../../api/users"

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'


//dayDate init with daypicker
/************************************************ */
let dayDate = '2020-06-03'
//let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */

export default function Taser({ taserId }) {
    const [mounted, setMounted] = useState(false)
    const [selectedDay, setSelectedDay] = useState(undefined)
    useEffect(() => {
        console.log("render")
        setMounted(true)
    }, [])

    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */
    console.log(taserId)
    const { data : dataInfo, error : errorInfo } = useSWR([taserId, "info"], api_root_info.getInfoOnly)
    //const { dataInfo, isLoadingInfo, isErrorInfo, mutateInfo } = useTaserInfo(taserInfo.id, taserInfo)

    //const { dataDays, isLoadingDays, isErrorDays, mutateDays } = useTaserDays(taserInfo.id, taserDays)
    //const { dataDesideratas, isLoadingDesideratas, isErrorDesideratas, mutateDesideratas } = useTaserDesideratas(taserInfo.id, taserDesideratas)
    const { data : taserUsers, error : errorUsers } = useSWR([taserId, "users"], api_root_users.getUsers)
    //const { dataUsers, isLoadingUsers, isErrorUsers, mutateUsers } = useTaserUsers(taserInfo.id, taserUsers)
    //const { dataVacations, isLoadingVacations, isErrorVacations, mutateVacations } = useTaserVacations(taserInfo.id, taserVacations)

    /*
    //Test mutate data
        let newDataDays =""
        if (!isLoadingDays && mounted)
            {
            newDataDays = dataDays 
            newDataDays.days.byId['2020-06-03']['1'].vacationId = "2" 
            mutateDays({ ...dataDays,days : newDataDays.days} , false)
            
            }else{
                
            }
    */


    /************************************* */
    //handlers
    /************************************* */
    //init for ui event handlers
    //init buffer for shorkey iteration (iterate "x" to switch desiderata)

    /*
    let buffer = 0
    let colorCell = "white"
    let eraseDesiderataNameAndKeepColorInstead = false
    const tabVacationsAndDesideratas =
        taserVacations.vacations === undefined || taserDesideratas.desideratas === undefined ?
            undefined
            : [...Object.values(taserVacations.vacations.byId), ...Object.values(taserDesideratas.desideratas.byId)]

    */

    //key pressed must match tabVacationsAndDesirata shortKey
    //buffer used to iterate with the same shortkey

    /*
    const handleKeyPress = tabVacationsAndDesideratas === undefined ?
        () => console.log('keypressed')
        : e => {
            let { eraseDesiderataNameAndKeepColorInstead1, buffer1 } = inputHandleKeyPress(e, buffer, tabVacationsAndDesideratas, colorCell, eraseDesiderataNameAndKeepColorInstead)
            eraseDesiderataNameAndKeepColorInstead = eraseDesiderataNameAndKeepColorInstead1
            buffer = buffer1
        }
    


    const handleKeyUp = (e) => {
        inputHandleKeyUp(e, eraseDesiderataNameAndKeepColorInstead)
    }
    const handleBlur = e => {
        inputHandleBlur(e)
    }
    const handleFocus = e => {
        inputHandleFocus(e)
    }
    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }
*/

    const handleKeyPress = e => {

        }
    


    const handleKeyUp = (e) => {
        
    }
    const handleBlur = e => {
        
    }
    const handleFocus = e => {
       
    }
    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }
    /************************************** */
    const taserVacations = ""
    const taserDesideratas = ""
  
    const dataDays =""
    const dataDesideratas =""
    if (errorInfo) return <p>Error loading data!</p>
    else if (!dataInfo) return <p>Loading...</p>
    else {
        const  { name, desc, numberOfDays, numberOfTasers }  = {...dataInfo}
        return (
            <div>
                <p className={"dateCurrent"}>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
                <div className='dayPi' ><DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} localeUtils={MomentLocaleUtils} locale={'fr'} /></div>
                <h3>{dataInfo.name}</h3>
                {
 
                    [...Array(parseInt(numberOfTasers))].map((n, i) =>
                        <TaserTable key={i}
                            selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                            numberOfDays={parseInt(numberOfDays)}
                            activeSelectedDate={dayDate}
                            taserInfo={dataInfo}
                            taserUsers={taserUsers}
                            taserDays={dataDays}
                            taserVacations={taserVacations}
                            taserDesideratas={dataDesideratas}
                            /*handler*/
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                            handleKeyPress={handleKeyPress}
                            handleKeyUp={handleKeyUp} />)}

            </div>
        )
    }
}


