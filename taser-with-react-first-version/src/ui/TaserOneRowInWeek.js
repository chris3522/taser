import React from 'react'
import moment from 'moment'
import './../stylesheets/TaserOneRowInWeek.css';
import  { TaserInputCellContainer } from '../containers/TaserInputCellContainer'
//import { TaserInputCellContainer } from '../containers/TaserInputCellContainer'
import { Table } from 'semantic-ui-react'
import { v4 } from 'uuid'
//import { dayKey } from '../store/actions-helpers';

const TaserOneRowInWeek = (props) => {

    const { taserDays, user, vacations, taserId, mondayDayId, auth } = props   
    //MondayDayId est le premier lundi de la semaine ici


   
    return (

        <Table.Row key={v4()}>
            <Table.Cell key={v4()}>{user.name}</Table.Cell>
            {[...Array(7)].map((n,i) => {
                    return  <TaserInputCellContainer key={v4()} dayDate={moment(mondayDayId).add(i, 'days').format("YYYY-MM-DD")} userId={user.userId} vacations={ vacations } taserId={ taserId } taserDays = {taserDays} auth={auth}/>
                
                }
            )}
        </Table.Row>



    )
}


export default TaserOneRowInWeek