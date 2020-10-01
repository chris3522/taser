import { connect } from 'react-redux'
import Init from './../components/Init'
import * as actions from './../store/actions-b'

const mapStateToProps = (state) => {
     return ({
         currentDate : state.datesUsed.currentDate,
         selectedDate : state.datesUsed.selectedDate
     })
}


const mapDispatchToProps = dispatch =>
({
    initDateSelect(date) { dispatch(actions.setSelectedDate(date)) },
    initDateCurrent(date) { dispatch(actions.setCurrentDate(date)) },
})

export const InitContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Init)