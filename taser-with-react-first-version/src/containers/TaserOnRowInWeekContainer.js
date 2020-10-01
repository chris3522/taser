import { connect } from 'react-redux'
import TaserOneRowInWeek from './../ui/TaserOneRowInWeek'
//import * as actions from './../store/actions-b'

/*<TaserOneLineInWeek store={ store } taserId="1" dayId="2020522" userId="1" vacationId="2" desiderataId="1"/>*/
const mapStateToProps = (state,ownProps) => {
    const {  userId, users, vacations, taserId, mondayDayId, taserDays, auth } = ownProps
    //const taser =  tasers.filter(t => t.taserDef.taserId === taserId)[0]
    const user =  users.filter(u => u.userId===userId)[0]
    return {
        taserId,
        datesUsed : state.datesUsed,
        user,
        vacations,
        mondayDayId,
        taserDays,
        auth
    }
}

const mapDispatchToProps = dispatch => ({})
/*({
    onDateSelect(day) { dispatch(actions.setSelectedDate(day)) }
})*/

export const TaserOneRowInWeekContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaserOneRowInWeek)