import React from 'react'
const InputCellHandlers = ({children},props) => {
    const { /*selectedDate,
        numberOfDays,
        activeSelectedDate,
        taserInfo,
        taserDays,
        taserUsers,*/
        taserVacations,
        taserDesideratas } = props
    //const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props


    /***********handlers****************** */
    const handleBlur = event => console.log(event.target.value)
    const handleFocus = event => console.log(event.target.value)
    const handleKeyPress = event => console.log(event.target.value)
    const handleKeyUp = event => console.log(event.target.value)

   

    let newChildrenWithHandlers =
        React.cloneElement({children}, { handleKeyPress, handleKeyUp, handleFocus, handleBlur })

    return ({newChildrenWithHandlers})

}
export default InputCellHandlers