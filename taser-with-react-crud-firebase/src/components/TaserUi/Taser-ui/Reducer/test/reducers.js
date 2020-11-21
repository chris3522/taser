
const C = require('./constants')
const { addDayInTaser2, removeDayInTaser2, addDayInSaveLog, removeDayInSaveLog } = require('./actions')

const usersYears = (state=[], action) => {
    const year = Math.floor(action.dayNumber/10000).toString()
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === year).length>0) {  
                return state.map( u => userYears(u,action) )
            }
            else {
                return state.concat([{[year]:[],changed:true}]).map(u => userYears(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === year).length>0) {      
                return state.map( u => userYears(u,action) )
            }
            else {
                return state.concat([{[year]:[],changed:true}]).map(u => userYears(u,action))     
            }
        default:
            return state
    }
}

const userYears = (state={}, action) => {
    const year = Math.floor(action.dayNumber/10000).toString()
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== year) ?
                state:
                {
                ...state,
                [year]:usersDays(state[year],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== year) ?
                state:
                {
                ...state,
                [year]:usersDays(state[year],action),
                changed:true
                }
        default:
            return state
    } 
}


const usersDays = (state=[], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.userId).length>0) {      
                return state.map( u => userDays(u,action) )
            }
            else {
                return state.concat([{[action.userId]:[],changed:true}]).map(u => userDays(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.userId).length>0) {      
                return state.map( u => userDays(u,action) )
            }
            else {
                return state.concat([{[action.userId]:[],changed:true}]).map(u => userDays(u,action))     
            }
        default:
            return state
    }
}

const userDays = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.userId) ?
                state:
                {
                ...state,
                [action.userId]:userDay(state[action.userId],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.userId) ?
                state:
                {
                ...state,
                [action.userId]:userDay(state[action.userId],action),
                changed:true
                }
        default:
            return state
    } 
}


const userDay = (state=[], action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.dayNumber.toString()).length>0) {
                return state.map( u => days(u,action) )
            }
            else {
                return state.concat([{[action.dayNumber]:[],changed:true}]).map(u => days(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.dayNumber.toString()).length>0) {
                return state.map( u => days(u,action) )
            }
            else {
                return state.concat([{[action.dayNumber]:[],changed:true}]).map(u => days(u,action)) 
            }
        default:
            return state
    }
}


const days = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.dayNumber.toString()) ?
                state:
                {
                ...state,
                [action.dayNumber]:day1([],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.dayNumber.toString()) ?
                state:
                {
                ...state,
                [action.dayNumber]:day1([],action),
                changed:true
                }
        default:
            return state
    }
}

const day1 = (state=[], action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return Array(day({}, action))
        case C.REMOVE_USER_DAY:
            return Array()
        default:
            return state
    }
}


const day = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                nature: action.nature,
                isRequired: action.isRequired,
                name: action.name,
                vacOrDesId: action.vacOrDesId,
                color: action.color
            }
        default:
            return state
    }
}

const newState = [
    {
        userIdeeeeeeeee: [
        {
            20201111: [{
            dayNumber: "20201110",
            userId: "userIdeeeeeeeee",
            nature: "vacations",
            isRequired: true,
            name: "nPar",
            color: "blue"
            }]
        }
        ]
    },
    {
        userIde2: [
        {
            20201111: [{
            dayNumber: "20201111",
            userId: "userIde2",
            nature: "vacations",
            isRequired: true,
            name: "nPar",
            color: "blue"
            }]
        }
        ]
    }
]

const newData =   {
        dayNumber: 20201113,
        userId: "userIde2",
        nature: "vacations",
        isRequired: true,
        name: "nPar",
        vacOrDesId: "bbbbbbb",
        color: "vert"
    }
const newState2 = [
  {
    2020: [
      {
        userIde2: [
          {
            20201113: [
              {
                dayNumber: 20201113,
                userId: "userIde2",
                nature: "vacations",
                isRequired: true,
                name: "nPar",
                color: "blue"
              }
            ]
          },
          {
            20201112: [
              {
                dayNumber: 20201112,
                userId: "userIde2",
                nature: "vacations",
                isRequired: true,
                name: "jPar",
                color: "blue"
              }
            ]
          }
        ]
      }
    ]
  }
]
//console.log(JSON.stringify(usersDays(newState,addDayInTaser2(newData)), null, 2))
//usersYears([],addDayInTaser2(newData))
//console.log(JSON.stringify(usersYears(newState2,addDayInTaser2(newData)), null, 2))
//console.log(JSON.stringify(usersYears(newState2,removeDayInTaser2("userIde2",20201113)), null, 2))

const logState= [
  {
    dayNumber: 20201113,
    userId: "userIde2",
    nature: "vacations",
    isRequired: true,
    name: "nPar",
    color: "vert",
    action: "ADD_TASER_DAY"
  }
]

const actionDays = (state=[], action) => {
    switch (action.type) {
        case C.ADD_DAY:    
            return state.concat(saveDay({},action))
        case C.REMOVE_DAY:
            return state.concat(saveDay({},action))
        default:
            return state
    }
}
s
const actionDay = (state={}, action) => {
    switch (action.type){
        case C.ADD_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                nature: action.nature,
                isRequired: action.isRequired,
                name: action.name,
                vacOrDesId: action.vacOrDesId,
                color: action.color, 
                action: action.type
            }
        case C.REMOVE_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                action: action.type
            }
        default:
            return state
    }
}

//console.log(JSON.stringify(saveDays(logState,addDayInSaveLog(newData)), null, 2))
console.log(JSON.stringify(actionDays(logState,removeDayInSaveLog("userId",20201011)), null, 2))