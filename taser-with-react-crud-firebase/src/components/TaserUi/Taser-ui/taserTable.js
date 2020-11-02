import React from "react"
import TaserTheadLine from './taserTheadLine'
import TaserTbodyLine from './taserTbodyLine'

const TaserTable = (props) => {
    const { selectedDate,
        numberOfDays,
        activeSelectedDate,
        taserInfo,
        taserDays,
        taserUsers,
        taserVacations,
        taserDesideratas,
        userAuthId,
        rangeOfDays,
        taserId } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props

    return (
        <div>
            <table className="taserui">
                <thead>
                    <TaserTheadLine selectedDate={selectedDate} numberOfDays={numberOfDays} activeSelectedDate={activeSelectedDate} />
                </thead>
                <tbody>
                    {taserUsers === undefined ? <tr></tr> : taserUsers.map(user =>
                        <TaserTbodyLine key={user.id}
                            selectedDate={selectedDate}
                            numberOfDays={numberOfDays}
                            activeSelectedDate={activeSelectedDate} //unused
                            taserInfo={taserInfo}
                            taserUsers={taserUsers}
                            userId={user.id}
                            taserId={taserId}
                            taserDays={taserDays}
                            taserVacations={taserVacations}
                            taserDesideratas={taserDesideratas}
                            userAuthId={userAuthId}
                            rangeOfDays={rangeOfDays}
                            /******handlers*********** */
                            handleKeyPress = {handleKeyPress}
                            handleKeyUp={handleKeyUp}
                            handleBlur={handleBlur}
                            handleFocus={handleFocus}
                        />
                    )}
                </tbody>
                 {props.children}
            </table>
        </div>
    )
}

export default TaserTable