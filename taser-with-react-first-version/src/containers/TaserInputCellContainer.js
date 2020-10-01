import { connect } from 'react-redux'
import TaserInputCell from './../ui/TaserInputCell'
import * as actions from './../store/actions-a'
import { dayKey } from '../store/actions-helpers'

/*<TaserOneLineInWeek store={ store } taserId="1" dayId="2020522" userId="1" vacationId="2" desiderataId="1"/>*/
const mapStateToProps = (state,ownProps) =>{
    const { dayDate, userId, vacations, taserId, taserDays, auth } = ownProps
    const desideratas = state.config.desideratas
    const tabVacationsAndDesideratas=[...vacations,...desideratas]
    
    const taserDay=taserDays.filter(d => d.dayId === dayKey(dayDate))[0] !== undefined ? taserDays.filter(d => d.dayId === dayKey(dayDate))[0]: {}

    const dayAtWorkUsers = taserDay === undefined ? [] : taserDay.dayAtWorkUsers
    const dayAtWorkUser = dayAtWorkUsers === undefined ? {} : dayAtWorkUsers.filter(u => u.userId === userId)[0]
    const vacationId =( dayAtWorkUser === undefined || dayAtWorkUser.vacationId === undefined) ? "" : dayAtWorkUser.vacationId

    const dayWithDesiderataUsers = taserDay === undefined ? [] : taserDay.dayWithDesiderataUsers
    const dayWithDesiderataUser = dayWithDesiderataUsers === undefined ? {} : dayWithDesiderataUsers.filter(ds => ds.userId === userId)[0]
    const desiderataId = (dayWithDesiderataUser === undefined || dayWithDesiderataUser.desiderataId === undefined )? "" : dayWithDesiderataUser.desiderataId
    const desiderata =  desideratas.filter( d => d.desiderataId===desiderataId)[0]
    const desiderataColor = (desiderata === undefined ||desiderata.color === undefined) ? "" : desiderata.color


    
    return {
    tabVacationsAndDesideratas,
    userId,
    taserId,
    vacationId,
    desiderataId,
    desiderataColor,
    taserDay,
    dayDate,
    auth
    }
}

const mapDispatchToProps = dispatch => 
({
    addDayInStore(date,taserId) { dispatch(actions.addDayInTaser(date,taserId)) },
    addUserAndDesiderataInStore(...args) { dispatch(actions.addUserAndDesiderataInDayInTaser(...args))},
    removeVacation(taserId,dayId,userId) { dispatch(actions.removeOneUserAtWorkInDayInTaser(taserId,dayId,userId))},
    removeDesiderata(taserId,dayId,userId) { dispatch(actions.removeOneUserWithDesiderataInDayInTaser(taserId,dayId,userId))},
    addUserAndVacationInStore(...args) { dispatch(actions.addUserAndVacationInDayInTaser(...args))}
})

export const TaserInputCellContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaserInputCell)