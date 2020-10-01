import { connect } from 'react-redux'
import DayPickerCustom from './../ui/DayPickerCustom'
import * as actions from './../store/actions-b'


const mapStateToProps = (state,ownProps) => {
    const { locale='fr' } = ownProps
     return ({
         selectedDay : new Date(state.datesUsed.selectedDate),
         locale
     })
}


const mapDispatchToProps = dispatch =>
({
    onDateSelect(day) { dispatch(actions.setSelectedDate(day)) }
})

export const DaypickerCustomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DayPickerCustom)