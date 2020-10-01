import React from 'react'
import moment from 'moment'
import '../stylesheets/TaserOneWeek.css';
import { TaserOneRowInWeekContainer } from '../containers/TaserOnRowInWeekContainer'
import { Table } from 'semantic-ui-react'
import { dayKey } from '../store/actions-helpers'
import { v4 } from 'uuid'


const TaserOneWeek = (props) => {
    const colors = [
        'blue',
  'olive',
    'grey',
  'violet',
  'purple',
  'pink',

]
    const { taserId, users, vacations, mondayDayId, taserDays, mainTaser, datesUsed, auth } = props  
    // numero des jours de la semaine
    const dayKeyDate = []
    const dayNumber = []
    const addClassActiveCell = []
    const monthOfMondayDayid = moment(mondayDayId).format('MMMM')
    const selectedDate = moment(datesUsed.selectedDate).format("YYYY-MM-DD").toString()
    const dayShortName=["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]

    for (let i = 0; i < 7; i++) {
        dayNumber[i] = moment(mondayDayId).add(i, 'day').date()
        addClassActiveCell[i] =  moment(mondayDayId).add(i, 'day').format("YYYY-MM-DD").toString() === selectedDate ? true : false
        dayKeyDate[i] = dayKey (moment(mondayDayId).add(i, 'day').format("YYYY-MM-DD").toString())
    }
    
    return (
          <Table celled unstackable color={ mainTaser==="mainTaser" ? colors[0] : colors[1]}  compact='very' size='small' key={v4()}>
                 <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell key={ v4()}>{monthOfMondayDayid}</Table.HeaderCell>
                         
                        {dayNumber.map((dayNumberDate,i) => 
                            <Table.HeaderCell key={ v4()} className={ i===5 || i===6 ? 'customTable weekEndStyle' : 'customTable'}>
                                <span key="1">{dayShortName[i]}</span>
                                <span key="2" className={(addClassActiveCell[i] && mainTaser === "mainTaser") ? 'activeCell' : 'noActiveCell'}>{ dayNumber[i] < 10 ? " 0"+dayNumber[i] : " "+dayNumber[i] }</span>
                            </Table.HeaderCell>
                        )}

                    </Table.Row>
                </Table.Header>
                <Table.Body>{users.length === 0 ? <p>Add users</p> : users.map( u =>
                    <TaserOneRowInWeekContainer key={u.userId + mondayDayId} userId={u.userId} users={ users } vacations={ vacations } taserId={ taserId } mondayDayId={mondayDayId} taserDays={taserDays} auth={ auth }/>
                )}               
                </Table.Body>
        </Table>
            
    )
}


export default TaserOneWeek