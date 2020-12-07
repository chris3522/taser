import React, { useState, useEffect } from "react"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import moment from 'moment'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'
import './Taser-ui/taser.css'
import * as api_root_info from "../../api/info"
import * as api_root_connect from "../../api/connected"
import * as api_root_renfort from "../../api/renforts"
import * as api_root_users from "../../api/users"
import * as api_root_vacations from "../../api/vacations"
import * as api_root_desideratas from "../../api/desideratas"
import * as api_root_days from "../../api/days"
import * as actions from '../TaserInfo/Reducer/actions'


//dayDate init with daypicker
/************************************************ */
//let dayDate = '2020-06-03'
let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */


const TaserUi = ({ className, taserId, user, authAdmin, dispatchAuthAdmin, userAuthId, setUserAuthId }) => {
    const [selectedDay, setSelectedDay] = useState(undefined)
    const currentYear = moment().year()
    const nextYear = moment().add(1, 'year').year()
    const prevYear = moment().subtract(1, 'year').year()
    const years = [currentYear, nextYear, prevYear]
    const selectedYear = moment(dayDate, 'YYYY-MM-DD').year()

    const { data: yearDays, error: errorYearDays, mutate: mutateYearDays } = useSWR([taserId, currentYear, currentYear, "currentyear"], api_root_days.getYear)
    const { data: yearDaysNext, error: errorYearDaysNext, mutate: mutateYearDaysNext } = useSWR([taserId, currentYear, nextYear, "currentyearnext"], api_root_days.getYear)
    const { data: yearDaysPrev, error: errorYearDaysPrev, mutate: mutateYearDaysPrev } = useSWR([taserId, currentYear, prevYear, "currentyearprev"], api_root_days.getYear)
    const { data: yearDaysSelect, error: errorYearDaysSelect, mutate: mutateYearDaysSelect } = useSWR(!years.includes(selectedYear) ? [taserId, currentYear, selectedYear, "currentyearselected"] : null, api_root_days.getYear)

    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }

    const { data: renforts, error: errorRenforts } = useSWR([taserId, "renforts"], api_root_renfort.getRenforts)
    const { data: yearDaysRenfort, error: errorYearDaysRenfort } = useSWR(renforts && renforts.renforts && renforts.renforts.length > 0 ? [renforts.renforts, currentYear, currentYear, "currentyearrenfort"] : null, api_root_days.getYearRenfort)
    const { data: yearDaysRenfortNext, error: errorYearDaysRenfortNext } = useSWR(renforts && renforts.renforts && renforts.renforts.length > 0 ? [renforts.renforts, currentYear, nextYear, "currentyearrenfortnext"] : null, api_root_days.getYearRenfort)
    const { data: yearDaysRenfortPrev, error: errorYearDaysRenfortPrev } = useSWR(renforts && renforts.renforts && renforts.renforts.length > 0 ? [renforts.renforts, currentYear, prevYear, "currentyearrenfortprev"] : null, api_root_days.getYearRenfort)
    const { data: yearDaysRenfortSelect, error: errorYearDaysRenfortSelect } = useSWR(!years.includes(selectedYear) && renforts && renforts.renforts && renforts.renforts.length > 0 ? [renforts.renforts, currentYear, selectedYear, "currentyearrenfortselected"] : null, api_root_days.getYearRenfort)
    if (errorYearDaysRenfort !== undefined) {
        console.log(errorYearDaysRenfort !== undefined ? errorYearDaysRenfort : null)
        console.log(errorYearDaysRenfortNext !== undefined ? errorYearDaysRenfortNext : null)
        console.log(errorYearDaysRenfortPrev !== undefined ? errorYearDaysRenfortPrev : null)
        console.log(errorYearDaysRenfortSelect !== undefined ? errorYearDaysRenfortSelect : null)
    }

    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */
    const { data: taserInfo, error: errorInfo } = useSWR([taserId, "taserInfo"], api_root_info.getInfoOnly)
    const { data: taserUsers, error: errorUsers } = useSWR([taserId, "users2"], api_root_users.getUsers)

    const { data: taserVacations, error: errorVacations } = useSWR([taserId, "vacations"], api_root_vacations.getVacations)
    const { data: taserDesideratas, error: errorDesideratas } = useSWR([taserId, "desideratas"], api_root_desideratas.getDesideratas)

    /********Connected Admin fecth init********** */

    const { data: taserAuthAdmin, mutate: mutateTaserAuthAdmin } = useSWR([taserId, "authAdmin"], api_root_connect.getConnected)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        if (!firstInit && taserAuthAdmin) {
            dispatchAuthAdmin(actions.updateConnected(taserAuthAdmin.connected.connected))
            setFirstInit(true)
        }
    }, [taserAuthAdmin, firstInit, setFirstInit, dispatchAuthAdmin])
    if (errorInfo) return <p>Error loading data! 1</p>
    else if (errorUsers) return <p>Error loading data! 2</p>
    else if (errorVacations) return <p>Error loading data! 3</p>
    else if (errorDesideratas) return <p>Error loading data! 4</p>
    else if (errorRenforts) return <p>Error loading data! 5</p>
    else if (errorYearDaysNext) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDaysPrev) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDaysSelect) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDays) return <p>Error loading data! 6</p>
    else if (!taserInfo) return <p>Loading...</p>
    else if (!taserVacations) return <p>Loading...</p>
    else if (!taserDesideratas) return <p>Loading...</p>
    else if (!taserUsers) return <p>Loading...</p>
    else if (!renforts) return <p>Loading...</p>
    else if (!firstInit) return <p>Loading auth...</p>
    else if (!taserAuthAdmin) return <p>Loading...</p>
    else if (!yearDays) return <p>Loading...</p>
    else if (!yearDaysNext) return <p>Loading...</p>
    else if (!yearDaysPrev) return <p>Loading...</p>
    else if (!yearDaysRenfort && renforts.renforts.length > 0) return <p>Loading...</p>
    else if (!yearDaysRenfortNext && renforts.renforts.length > 0) return <p>Loading...</p>
    else if (!yearDaysRenfortPrev && renforts.renforts.length > 0) return <p>Loading...</p>
    else if (!years.includes(selectedYear) && !yearDaysSelect) return <p>Loading...</p>
    else if (user) {
        return (
            <div className={`${className}`}>
                <p className={"dateCurrent"}>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
                <div className={'dayPi row'} >
                    <DayPicker
                        month={selectedDay}
                        selectedDays={selectedDay}
                        onDayClick={handleDayClick}
                        localeUtils={MomentLocaleUtils}
                        locale={'fr'} />
                </div>
                <Taser taserId={taserId}
                    dayDate={dayDate}
                    taserInfo={taserInfo.info}
                    taserUsers={taserUsers.users}
                    taserDesideratas={taserDesideratas.desideratas}
                    taserVacations={taserVacations.vacations}
                    renforts={renforts.renforts}
                    authAdmin={authAdmin}
                    userAuthId={userAuthId}
                    setUserAuthId={setUserAuthId}
                    mutateTaserAuthAdmin={mutateTaserAuthAdmin}
                    yearDays={yearDays}
                    yearDaysPrev={yearDaysPrev}
                    yearDaysNext={yearDaysNext}
                    yearDaysSelect={yearDaysSelect}
                    mutateYearDays={mutateYearDays}
                    mutateYearDaysNext={mutateYearDaysNext}
                    mutateYearDaysPrev={mutateYearDaysPrev}
                    mutateYearDaysSelect={mutateYearDaysSelect}
                    isExtraYear={!years.includes(selectedYear)}
                    yearDaysRenfort={yearDaysRenfort}
                    yearDaysRenfortPrev={yearDaysRenfortPrev}
                    yearDaysRenfortNext={yearDaysRenfortNext}
                    yearDaysRenfortSelect={yearDaysRenfortSelect}
                />
            </div>
        )
    }
}

export default TaserUi