import { connect } from 'react-redux'
//import * as actions from '../store/actions-b'
import TaserMultiWeeks from '../ui/TaserMultiWeeks'


const mapStateToProps = (state,ownProps) =>{
    const { taserId } = ownProps
    const taser =  state.tasers.filter(t => t.taserDef.taserId === taserId)[0]
    const auth = taser.taserDef.auth
    const users =  taser.users
    const vacations =  taser.vacations
    const datesUsed = state.datesUsed
    return {
    taserId,
    datesUsed,
    taser,
    users,
    vacations,
    config : state.config,
    auth
    }
}

const mapDispatchToProps = dispatch => ({})
/*({
    onDateSelect(day) { dispatch(actions.setSelectedDate(day)) }
})*/

export const TaserMultiWeeksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaserMultiWeeks)