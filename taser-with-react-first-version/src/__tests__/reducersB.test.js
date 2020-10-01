import { datesUsed, currentDate } from '../store/reducers-b'
import { setCurrentDate, setSelectedDate, setDeepTaserDate } from '../store/actions-b'

describe("datesUsed Reducer with action creator", () => {

    it('SET_CURRENT_DATE sucess', () => {
        const state = {
                currentDate:"2020-01-10",
                selectedDate:"2030-01-01",
                deepTaserDate:"2018-01-01"
        }
        const action = setCurrentDate(new Date().toString)
        const results = datesUsed(state,action)
        expect(results)
            .toEqual({
                currentDate:action.currentDate,
                selectedDate:"2030-01-01",
                deepTaserDate:"2018-01-01",
            })
    })

    it('SET_SELECTED_DATE sucess', () => {
        const state = {}
        const action = setSelectedDate(new Date().toString)
        const results = datesUsed(state,action)
        expect(results)
            .toEqual({selectedDate:action.selectedDate})
    })
    it('SET_DEEP_TASER_DATE sucess', () => {
        const state = {}
        const action = setDeepTaserDate(new Date().toString)
        const results = datesUsed(state,action)
        expect(results)
            .toEqual({deepTaserDate:action.deepTaserDate})
    })
})