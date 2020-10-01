import { getTaserDays } from '../../../lib/days'
import { getTaserUsers } from '../../../lib/users'
import { getTaserVacations } from '../../../lib/vacations'
import { getTaserDesideratas } from '../../../lib/desideratas'
import { getTaserInfo } from '../../../lib/info'
import { getCurrentDate } from '../../../lib/date'

export default (req, res) => {
    const {
        query: { params },
        } = req
    const id = params[0]  // taser Id
    const param = params[1] // days, users, vacations, info ou desideratas
    let data = {}
    switch (param) {
    case 'days':
        data = getTaserDays(id)
        res.status(200).json(data)
        break
    case 'users':
        data = getTaserUsers(id)
        res.status(200).json(data)
        break
    case 'vacations':
        data = getTaserVacations(id)
        res.status(200).json(data)
        break
    case 'desideratas':
        data = getTaserDesideratas(id)
        res.status(200).json(data)
        break
    case 'info':
        data = getTaserInfo(id)
        res.status(200).json(data)
        break
    case 'date':
        data = getCurrentDate()
        res.status(200).json(data)
        break
    default:
        console.log(`Sorry, we are out of ${param}.`)
    }
    

    
}