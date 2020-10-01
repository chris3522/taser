import { createStore, combineReducers,applyMiddleware } from 'redux' 
import { tasers } from './reducers-a'
import { datesUsed } from './reducers-b'
import { config } from './reducers-c'
import stateData from './initialState'



const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev State', store.getState())
    console.log('action',action)
    result = next(action)
    console.log('next State', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger,saver)(createStore)(
        combineReducers({tasers,datesUsed,config}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) : 
            initialState
    )

export default storeFactory