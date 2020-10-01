import C from './constants-b'
import moment from 'moment'

// 3 action creators

// Action type SET_CURRENT_DATE :
export const setCurrentDate = (currentDate) =>
    ({
        type: C.SET_CURRENT_DATE,
        currentDate:currentDate
    })

//Action type SET_SELECTED_DATE
export const setSelectedDate = (selectedDate) =>
    ({
        type: C.SET_SELECTED_DATE,
        selectedDate:moment(selectedDate).format("YYYY-MM-DD")
    })

//Action type SET_DEEP_TASER_DATE
export const setDeepTaserDate = (deepTaserDate) =>
    ({
        type: C.SET_DEEP_TASER_DATE,
        deepTaserDate:deepTaserDate
    })