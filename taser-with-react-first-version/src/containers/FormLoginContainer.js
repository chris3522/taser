import { connect } from 'react-redux'
import FormLogin from './../ui/FormLogin'
import * as actions from './../store/actions-a'
//import { dayKey } from '../store/actions-helpers'

/*<TaserOneLineInWeek store={ store } taserId="1" dayId="2020522" userId="1" vacationId="2" desiderataId="1"/>*/
const mapStateToProps = (state,ownProps) =>{ 
    const { taserId } = ownProps
    const taser =  state.tasers.filter(t => t.taserDef.taserId === taserId)[0]
    const users =  taser.users
    const auth = taser.taserDef.auth
    return {
        taserId,
        users,
        auth
    }
}

const mapDispatchToProps = dispatch => 
({
    toggleAuth(taserId,auth) { dispatch(actions.toggleTaserAuth (taserId,auth)) }
})

export const FormLoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormLogin)