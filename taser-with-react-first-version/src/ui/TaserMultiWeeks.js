import React from 'react'
import moment from 'moment'
import './../stylesheets/TaserOneWeek.css';
import { TaserOneWeekContainer } from '../containers/TaserOneWeekContainer'
import { Segment } from 'semantic-ui-react'
import { v4 } from 'uuid'



const TaserMultiWeeks = (props) => {

    const { taserId, datesUsed, auth } = props  
    datesUsed.selectedDate = datesUsed.selectedDate === "" ? moment(new Date()).format("YYYY-MM-DD") : datesUsed.selectedDate
    let mondayKeyDate = []
    const numberOfWeeksToDisplay = 4 //minimum = 2 (before + current week)
    const firstMondayCurrentWeek = moment(datesUsed.selectedDate).startOf('isoWeek').format("YYYY-MM-DD")
    const fisrtMondayOneWeekBeforeCurrent = moment(firstMondayCurrentWeek).subtract(1, 'week').format("YYYY-MM-DD")

    const mondayKeyDate_0 = moment(fisrtMondayOneWeekBeforeCurrent).format("YYYY-MM-DD")
    const mondayKeyDate_1 = moment(firstMondayCurrentWeek).format("YYYY-MM-DD")

    for (let i = 0; i < numberOfWeeksToDisplay-2; i++) {
        mondayKeyDate[i] = moment(firstMondayCurrentWeek).add(i+1, 'week').format("YYYY-MM-DD")
    }


   // const taser =  tasers.filter(t => t.taserDef.taserId === taserId)[0]
   // const user =  taser.users.filter(u => u.userId===userId)[0].name
    
   // let  day =  moment(datesUsed.selectedDate === "" ? datesUsed.currentDate : datesUsed.selectedDate)
    const mainTaser =  "mainTaser"
    return (

    <Segment>
            <TaserOneWeekContainer  taserId={taserId} mondayDayId={mondayKeyDate_0} key={v4()} mainTaser="" auth={ auth }/>
            <TaserOneWeekContainer  taserId={taserId} mondayDayId={mondayKeyDate_1} key={v4()} mainTaser={ mainTaser } auth={ auth }/>

            {mondayKeyDate.map((mondayDayId,i) => {  
                return <TaserOneWeekContainer  taserId={taserId} mondayDayId={mondayDayId} key={v4()} mainTaser="" auth={ auth }/>
                }   
            )}

    </Segment>
        
    )
}


export default TaserMultiWeeks