import React, { useRef, useState } from "react"
import cartesianProduct from './cartesianProduct'
import moment from 'moment'
import 'moment-ferie-fr'
import styles from "./Statistics.module.css"


const Statistics = ({ className, dataDaysPersistence, tabVacationsAndDesideratas, taserUsers,
    yearDays, yearDaysNext, yearDaysPrev, yearDaysSelect }) => {

    /*****sort vacations********* */
    function compare(a, b) {
        if (a.nature > b.nature) {
            return -1
        }
        if (a.nature < b.nature) {
            return 1
        }
        return 0
    }
    function compare2(a, b) {
        if (a.isRequired > b.isRequired) {
            return -1
        }
        if (a.isRequired < b.isRequired) {
            return 1
        }
        return 0
    }
    tabVacationsAndDesideratas.sort(compare)
    tabVacationsAndDesideratas.sort(compare2)

    /************Fériés et weekend func search******** */
    const isWeekend = (date) => {
        return parseInt(moment(date, "YYYYMMDD").format('E'), 0) > 5
    }

    const isSunday = (date) => {
        return moment(date, "YYYYMMDD").weekday() === 6
    }

    const isSaturday = (date) => {
        return moment(date, "YYYYMMDD").weekday() === 5
    }

    const isFriday = (date) => {
        return moment(date, "YYYYMMDD").weekday() === 4
    }

    /****set user and vac tab heads******** */
    const userNamesSet = taserUsers.reduce((acc, user) => {
        return acc.concat({ name: user.name, id: user.id })
    }, [])
    const vacNamesSet = tabVacationsAndDesideratas.reduce((acc, vac) => {
        return acc.concat(vac.name)
    }, [])

    const ferieSet = ["Feries"]

    const weekendSet = ["Weekend"]

    const requiredVacSundaySet = tabVacationsAndDesideratas.reduce((acc, vac) => {
        if (vac.isRequired === "required") {
            acc.push(`${vac.name}+Di`)
        }
        return acc
    }, [])

    const requiredVacSaturdaySet = tabVacationsAndDesideratas.reduce((acc, vac) => {
        if (vac.isRequired === "required") {
            acc.push(`${vac.name}+Sa`)
        }
        return acc
    }, [])

    const requiredVacFridaySet = tabVacationsAndDesideratas.reduce((acc, vac) => {
        if (vac.isRequired === "required") {
            acc.push(`${vac.name}+Ve`)
        }
        return acc
    }, [])
    /*******cartesian product*************** */
    const userVacGrid = cartesianProduct(userNamesSet, vacNamesSet)
    const reduceDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            if (user.id === day.userId && vacName === day.name) {
                acc++
            }
            return acc
        }, 0)
    }

    const userFerieGrid = cartesianProduct(userNamesSet, ferieSet)
    const reduceFerieDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            let day2 = moment(day.dayNumber, "YYYYMMDD")
            if (user.id === day.userId && day2.isFerie()) {
                acc++
            }
            return acc
        }, 0)
    }

    const userWeekendGrid = cartesianProduct(userNamesSet, weekendSet)
    const reduceWeekendDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            if (user.id === day.userId && isWeekend(day.dayNumber)) {
                acc++
            }
            return acc
        }, 0)
    }

    const userRequiredVacSundayGrid = cartesianProduct(userNamesSet, requiredVacSundaySet)
    const reduceRequiredVacSundayDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            let vacName2 = vacName.replace('+Di', '')
            if (user.id === day.userId
                && day.isRequired === "required"
                && vacName2 === day.name
                && isSunday(day.dayNumber)) {
                acc++
            }
            return acc
        }, 0)
    }

    const userRequiredVacSaturdayGrid = cartesianProduct(userNamesSet, requiredVacSaturdaySet)
    const reduceRequiredVacSaturdayDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            let vacName2 = vacName.replace('+Sa', '')
            if (user.id === day.userId
                && day.isRequired === "required"
                && vacName2 === day.name
                && isSaturday(day.dayNumber)) {
                acc++
            }
            return acc
        }, 0)
    }

    const userRequiredVacFridayGrid = cartesianProduct(userNamesSet, requiredVacFridaySet)
    const reduceRequiredVacFridayDays = (user, vacName, days) => {
        return days.reduce((acc, day) => {
            let vacName2 = vacName.replace('+Ve', '')
            if (user.id === day.userId
                && day.isRequired === "required"
                && vacName2 === day.name
                && isFriday(day.dayNumber)) {
                acc++
            }
            return acc
        }, 0)
    }
    /******add a stat to each cell of cartesian product tab********* */
    const [dataDaysYear, setDataDaysYear] = useState([])
    const reduceStats = userVacGrid.map(userThisVac => {
        return userThisVac.concat(reduceDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })

    const reduceFerieStats = userFerieGrid.map(userThisVac => {
        return userThisVac.concat(reduceFerieDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })
    const reduceWeekendStats = userWeekendGrid.map(userThisVac => {
        return userThisVac.concat(reduceWeekendDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })

    const reduceRequiredVacSunday = userRequiredVacSundayGrid.map(userThisVac => {
        return userThisVac.concat(reduceRequiredVacSundayDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })

    const reduceRequiredVacSaturday = userRequiredVacSaturdayGrid.map(userThisVac => {
        return userThisVac.concat(reduceRequiredVacSaturdayDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })

    const reduceRequiredVacFriday = userRequiredVacFridayGrid.map(userThisVac => {
        return userThisVac.concat(reduceRequiredVacFridayDays(userThisVac[0], userThisVac[1], dataDaysYear))
    })

    const reduceStatsAll = reduceStats.concat(reduceFerieStats).concat(reduceWeekendStats).concat(reduceRequiredVacSunday).concat(reduceRequiredVacSaturday).concat(reduceRequiredVacFriday)
    
    /***************define years data********************** */
    const yearsList = [...yearDays, ...yearDaysNext, ...yearDaysPrev, ...yearDaysSelect]
    const inputYear = useRef(null)
    const [display, setDisplay] = useState(styles.displayNone)

    const onSubmit = (e) => {
        e.preventDefault()
        setDataDaysYear(dataDaysPersistence
            .filter(day => Math.floor(day.dayNumber / 10000) === parseInt(inputYear.current.value))
        )
        setDisplay(styles.displayInBlock)
    }


    /******render tab ******** */
    return (
        <div className={`${className}`}>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="six columns">
                        <select className="u-full-width" ref={inputYear}>
                            {yearsList.map((year, i) => <option key={i} value={year}>{year}</option>)}
                        </select>
                    </div>
                    <div className="four columns">
                        <button type="submit">Valider</button>
                    </div>
                    <div className="two columns">

                    </div>
                </div>
            </form>

            <table className={`${display} ${styles.statuiscroll}`}>
                <thead>
                    <tr>
                        <th></th>
                        {vacNamesSet.map((vac, i) => <th key={i}>{vac}</th>)}
                        <th>Fériés</th>
                        <th>Jours de Weekend</th>
                        {requiredVacSundaySet.map((vac, i) => <th key={i}>{vac}</th>)}
                        {requiredVacSaturdaySet.map((vac, i) => <th key={i}>{vac}</th>)}
                        {requiredVacFridaySet.map((vac, i) => <th key={i}>{vac}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {userNamesSet.map((user, i) => <tr key={i}>
                        <td>{user.name}</td>
                        {reduceStatsAll
                            .filter(u => u[0].name === user.name)
                            .map((u, i) => <td key={i}>{u[2]}</td>)}
                    </tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default Statistics