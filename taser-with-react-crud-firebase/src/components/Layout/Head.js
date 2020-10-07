//import React from 'react'
import ReactDOM from 'react-dom'

const headRoot = document.head
const Head = ({ children }) => {
    return (
        ReactDOM.createPortal(
                children,
                headRoot
            )
    )
}

export default Head
