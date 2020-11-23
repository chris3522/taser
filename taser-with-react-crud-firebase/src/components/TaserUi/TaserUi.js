import React,  { useState } from "react"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import moment from 'moment'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'
import './Taser-ui/taser.css'
import * as api_root_info from "../../api/info"
import * as api_root_renfort from "../../api/renforts"
import * as api_root_users from "../../api/users"
import * as api_root_vacations from "../../api/vacations"
import * as api_root_desideratas from "../../api/desideratas"
import * as api_root_days from "../../api/days"

//dayDate init with daypicker
/************************************************ */
//let dayDate = '2020-06-03'
let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */


const TaserUi = ({ className, taserId, user, setAuthAdmin, authAdmin }) => {
    const [selectedDay, setSelectedDay] = useState(undefined)
    const currentYear = moment().year()
    const nextYear = moment().add(1, 'year').year()
    const prevYear = moment().subtract(1, 'year').year()
    const years=[currentYear,nextYear,prevYear]
    const selectedYear = moment(dayDate,'YYYY-MM-DD').year()

    const { data: yearDays, error: errorYearDays, mutate: mutateYearDays } = useSWR([taserId,currentYear,currentYear, "currentyear"], api_root_days.getYear)
    const { data: yearDaysNext, error: errorYearDaysNext, mutate: mutateYearDaysNext } = useSWR([taserId,currentYear,nextYear, "currentyearnext"], api_root_days.getYear)
    const { data: yearDaysPrev, error: errorYearDaysPrev, mutate: mutateYearDaysPrev } = useSWR([taserId,currentYear,prevYear, "currentyearprev"], api_root_days.getYear)
    const { data: yearDaysSelect, error: errorYearDaysSelect, mutate: mutateYearDaysSelect } = useSWR(!years.includes(selectedYear) ? [taserId,currentYear,selectedYear, "currentyearselected"] : null,  api_root_days.getYear)

    const handleDayClick = (day) => {
        setSelectedDay(day)
        dayDate = moment(day).format('YYYY-MM-DD')
    }
   
    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */
    const { data: taserInfo, error: errorInfo } = useSWR([taserId, "taserInfo"], api_root_info.getInfoOnly)
    const { data: taserUsers, error: errorUsers } = useSWR([taserId, "users"], api_root_users.getUsers)
    const { data: taserVacations, error: errorVacations } = useSWR([taserId, "vacations"], api_root_vacations.getVacations)
    const { data: taserDesideratas, error: errorDesideratas } = useSWR([taserId, "desideratas"], api_root_desideratas.getDesideratas)
    const { data: renforts, error: errorRenforts } = useSWR([taserId, "renforts"], api_root_renfort.getRenforts)
    const { data: taserConnectedAdmin, mutate: mutateConnectedAdmin } = useSWR([taserId, "authAdmin"], api_root_info.getConnectedAdmin)
    if (errorInfo) return <p>Error loading data!</p>
    else if (errorUsers) return <p>Error loading data!</p>
    else if (errorVacations) return <p>Error loading data!</p>
    else if (errorDesideratas) return <p>Error loading data!</p>
    else if (errorRenforts) return <p>Error loading data!</p>
    else if (errorYearDaysNext) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDaysPrev) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDaysSelect) return <p>Error loading data or wait a minute!</p>
    else if (errorYearDays) return <p>Error loading data!</p>
    else if (!taserInfo) return <p>Loading...</p>
    else if (!taserVacations) return <p>Loading...</p>
    else if (!taserDesideratas) return <p>Loading...</p>
    else if (!taserUsers) return <p>Loading...</p>
    else if (!renforts) return <p>Loading...</p>
    else if (!taserConnectedAdmin) return <p>Loading...</p>
    else if (!yearDays) return <p>Loading...</p>
    else if (!yearDaysNext) return <p>Loading...</p>
    else if (!yearDaysPrev) return <p>Loading...</p>
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
                    taserInfo={taserInfo}
                    taserUsers={taserUsers}
                    taserDesideratas={taserDesideratas}
                    taserVacations={taserVacations}
                    renforts={renforts}
                    setAuthAdmin={setAuthAdmin}
                    authAdmin={authAdmin}
                    taserConnectedAdmin={taserConnectedAdmin}
                    mutateConnectedAdmin={mutateConnectedAdmin}
                    yearDays={yearDays}
                    yearDaysPrev={yearDaysPrev}
                    yearDaysNext={yearDaysNext}
                    yearDaysSelect={yearDaysSelect}
                    mutateYearDays={mutateYearDays}
                    mutateYearDaysNext={mutateYearDaysNext}
                    mutateYearDaysPrev={mutateYearDaysPrev}
                    mutateYearDaysSelect={mutateYearDaysSelect}
                    isExtraYear={!years.includes(selectedYear)}
                    />
            </div>
        )
    }
}

export default TaserUi