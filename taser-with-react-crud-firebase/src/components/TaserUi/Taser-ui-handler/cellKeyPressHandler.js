const inputHandleKeyPress = (e, buffer, tabVacationsAndDesideratas, colorCell) => {
    //init
    let _entryKey = e.key.toLowerCase()
    e.preventDefault()
    const oneVacationAndDesiderata_entry = tabVacationsAndDesideratas.filter(vd => vd.shortKey === _entryKey)
    const oneVacationAndDesiderata_name = oneVacationAndDesiderata_entry[buffer] ? oneVacationAndDesiderata_entry[buffer].name : null
    const oneVacationAndDesiderata_color = oneVacationAndDesiderata_entry[buffer] && oneVacationAndDesiderata_entry[buffer].nature === "desiderata" ? oneVacationAndDesiderata_entry[buffer].color : ""
    colorCell = oneVacationAndDesiderata_color
    let eraseDesiderataNameAndKeepColorInstead = colorCell === "" ? false : true

    //set target value cell on shortkey pressed
    e.target.value = oneVacationAndDesiderata_name
    e.target.style.backgroundColor = colorCell
    //saveInStoreVacationOrDesiderataId=oneVacationAndDesiderata_entry[buffer]

    //check if keypressed is iterate in a same sequence as "x x x x"  for example
    buffer = oneVacationAndDesiderata_entry.length > 1 ? ++buffer : buffer = 0
    buffer = buffer === oneVacationAndDesiderata_entry.length ? 0 : buffer

    _entryKey = ""
    return  {eraseDesiderataNameAndKeepColorInstead1:eraseDesiderataNameAndKeepColorInstead ,buffer1:buffer}
}

export default inputHandleKeyPress