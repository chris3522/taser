import React from "react"
import TaserTheadLine from './taserTheadLine'
import TaserTbodyLine from './taserTbodyLine'

const TaserTable = (props) => {
    const { selectedDate,
        numberOfDays,
        activeSelectedDate,
        taserUsers,
        threeYears,
        actionDays,
        userAuthId,
    } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props

    return (
        <div className="taseruiscroll">
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
                            taserUsers={taserUsers}
                            userId={user.id}
                            threeYears={threeYears}
                            actionDays={actionDays}
                            userAuthId={userAuthId}

                            handleKeyPress={handleKeyPress}
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