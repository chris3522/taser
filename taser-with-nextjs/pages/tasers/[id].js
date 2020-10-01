import Layout from '../../components/layout'
import { url } from '../../lib/env'
import Head from 'next/head'
import moment from 'moment'
import TaserTable from '../../taser-ui/taserTable'
import { useEffect, useState } from 'react'
import inputHandleFocus from '../../taser-ui-handler/cellFocusHandler'
import inputHandleBlur from '../../taser-ui-handler/cellBlurHandler'
import inputHandleKeyUp from '../../taser-ui-handler/cellKeyUpHandler'
import inputHandleKeyPress from '../../taser-ui-handler/cellKeyPressHandler'
import useTaserInfo from '../../swr-data/use-taserInfo'
import useTaserDays from '../../swr-data/use-taserDays'
import useTaserDesideratas from '../../swr-data/use-taserDesideratas'
import useTaserVacations from '../../swr-data/use-taserVacations'
import useTaserUsers from '../../swr-data/use-taserUsers'
import DayPicker from 'react-day-picker'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/fr'


//dayDate init with daypicker
/************************************************ */
let dayDate = '2020-06-03'
//let dayDate = moment().format('YYYY-MM-DD')
/************************************************ */

export default function Taser({ taserInfo, taserDays, taserUsers, taserVacations, taserDesideratas, taserDate }) {
    const [mounted, setMounted] = useState(false)
    const [selectedDay, setSelectedDay] = useState(undefined)
    useEffect(() => {
        console.log("render")
        setMounted(true)
    }, [])

    /**************************************************** */
    // Init data fetching (initial data SSR with props)
    /**************************************************** */

    const { dataInfo, isLoadingInfo, isErrorInfo, mutateInfo } = useTaserInfo(taserInfo.id, taserInfo)
    const { dataDays, isLoadingDays, isErrorDays, mutateDays } = useTaserDays(taserInfo.id, taserDays)
    const { dataDesideratas, isLoadingDesideratas, isErrorDesideratas, mutateDesideratas } = useTaserDesideratas(taserInfo.id, taserDesideratas)
    const { dataUsers, isLoadingUsers, isErrorUsers, mutateUsers } = useTaserUsers(taserInfo.id, taserUsers)
    const { dataVacations, isLoadingVacations, isErrorVacations, mutateVacations } = useTaserVacations(taserInfo.id, taserVacations)

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

    const numberOfDays = parseInt(dataInfo.numberOfDays)
    const numberOfTasers = parseInt(dataInfo.numberOfTasers)

    /************************************* */
    //handlers
    /************************************* */
    //init for ui event handlers
    //init buffer for shorkey iteration (iterate "x" to switch desiderata)
    let buffer = 0
    let colorCell = "white"
    let eraseDesiderataNameAndKeepColorInstead = false
    const tabVacationsAndDesideratas =
        taserVacations.vacations === undefined || taserDesideratas.desideratas === undefined ?
            undefined
            : [...Object.values(taserVacations.vacations.byId), ...Object.values(taserDesideratas.desideratas.byId)]

    //key pressed must match tabVacationsAndDesirata shortKey
    //buffer used to iterate with the same shortkey
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
        dayDate=moment(day).format('YYYY-MM-DD')
    }

    /************************************** */



    return (
        <Layout>
            <Head>
                <title>{dataInfo.desc}</title>
            </Head>
            <p>{`${moment(selectedDay).format('dddd DD MMMM YYYY')}`}</p>
            <div  className='dayPi' ><DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} localeUtils={MomentLocaleUtils} locale={'fr'}/></div>
            <h1>{dataInfo.desc}</h1>
            {
            !isLoadingInfo && 
            !isLoadingDays && 
            !isLoadingDesideratas && 
            !isLoadingUsers &&
            !isLoadingVacations && 
            [...Array(numberOfTasers)].map((n, i) =>
                <TaserTable key={i}
                    selectedDate={moment(dayDate, "YYYY-MM-DD").add(numberOfDays * i, "days").format("YYYY-MM-DD")}
                    numberOfDays={numberOfDays}
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

        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    // Fetch data from external API
    const res1 = await fetch(`${url}/api/tasers/${params.id}/info`)
    const taserInfo = await res1.json()
    const res2 = await fetch(`${url}/api/tasers/${params.id}/days`)
    const taserDays = await res2.json()
    const res3 = await fetch(`${url}/api/tasers/${params.id}/users`)
    const taserUsers = await res3.json()
    const res4 = await fetch(`${url}/api/tasers/${params.id}/vacations`)
    const taserVacations = await res4.json()
    const res5 = await fetch(`${url}/api/tasers/${params.id}/desideratas`)
    const taserDesideratas = await res5.json()

    // Pass data to the page via props
    return { props: { taserInfo, taserDays, taserUsers, taserVacations, taserDesideratas } }
}

