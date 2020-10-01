import { connect } from 'react-redux'
import TaserOneWeek from './../ui/TaserOneWeek'
//import * as actions from './../store/actions-b'


const mapStateToProps = (state,ownProps) =>{
    const { taserId, mondayDayId, auth } = ownProps
    const taser = state.tasers.filter(t => t.taserDef.taserId === taserId)[0]
    const taserDays =  taser.taserDays
    const users =  taser.users
    const vacations =  taser.vacations
    return {
    taserId,
    datesUsed : state.datesUsed,
    taser,
    taserDays,
    users,
    vacations,
    config : state.config,
    mondayDayId, 
    auth
    }
}

const mapDispatchToProps = dispatch => ({})
/*({
    onDateSelect(day) { dispatch(actions.setSelectedDate(day)) }
})*/

export const TaserOneWeekContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaserOneWeek)