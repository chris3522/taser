const inputHandleKeyUp = (e,test) => {
        e.preventDefault()
        //Desiderata name value is replaced by her desiderata color by style
        e.target.value = test ? "" : e.target.value
}

export default inputHandleKeyUp
