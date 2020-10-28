const inputHandleKeyUp = (e, eraseDesiderataNameAndKeepColorInstead) => {
    e.preventDefault()
    //Desiderata name value is replaced by her desiderata color by style
    e.target.value = eraseDesiderataNameAndKeepColorInstead ? "" : e.target.value
    var KeyID = e.keyCode;
    switch (KeyID) {
        case 8:
            //backspace
            e.target.value = ""
            e.target.style.backgroundColor=""
            break
        case 46:
            //del
            e.target.value = ""
            e.target.style.backgroundColor=""
            break
        default:
            break
    }
    return KeyID
}

export default inputHandleKeyUp
