import moment from 'moment'

export function getCurrentDate() {
     const dateCurrent = moment().format('YYYY-MM-DD')
     return  JSON.parse(`{"date":"${dateCurrent}"}`)
}

