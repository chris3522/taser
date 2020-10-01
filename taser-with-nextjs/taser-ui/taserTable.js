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
        taserDesideratas } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props

    return (
        <div>
            <table>
                <thead>
                    <TaserTheadLine selectedDate={selectedDate} numberOfDays={numberOfDays} activeSelectedDate={activeSelectedDate} />
                </thead>
                <tbody>
                    {taserUsers.users === undefined ? <tr></tr> : taserUsers.users.allIds.map(userId =>
                        <TaserTbodyLine key={userId}
                            selectedDate={selectedDate}
                            numberOfDays={numberOfDays}
                            activeSelectedDate={activeSelectedDate} //unused
                            taserInfo={taserInfo}
                            taserUsers={taserUsers}
                            userId={userId}
                            taserDays={taserDays}
                            taserVacations={taserVacations}
                            taserDesideratas={taserDesideratas}
                            /******handlers*********** */
                            handleKeyPress = {handleKeyPress}
                            handleKeyUp={handleKeyUp}
                            handleBlur={handleBlur}
                            handleFocus={handleFocus}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TaserTable