import React, { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import "./DesiderataEditor.css"
import * as api_root from "../../api/desideratas"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'

const DesiderataEditor = ({ user, taserId, className }) => {
    const [isDisplay, setIsDisplay] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    const swrKey = `/admin/${taserId}/desideratas`
    const { data, error } = useSWR([taserId, swrKey], api_root.getDesideratas)
   
    const inputDesiderataName = useRef(null)
    const inputDesiderataShortKey = useRef("x")
    const inputDesiderataId = useRef(null)
    const inputDesiderataColor = useRef(null)

    const inputModalDesiderataName = useRef(null)
    const inputModalDesiderataShortKey = useRef("x")
    const inputModalDesiderataId = useRef(null)
    const inputModalDesiderataColor = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name": inputDesiderataName.current.value,
                "shortKey": inputDesiderataShortKey.current.value,
                "color": inputDesiderataColor.current.value,
            }
            api_root.createDesiderata(taserId, newData)
                .then(() => mutate([taserId, swrKey]))
        }
    }

    const displayUpdateDesiderataForm = (e, taserId, desiderataId, desiderataName, desiderataShortKey, desiderataColor) => {
        e.preventDefault()
        inputModalDesiderataId.current.value = desiderataId
        inputModalDesiderataName.current.value = desiderataName
        inputModalDesiderataShortKey.current.value = desiderataShortKey
        inputModalDesiderataColor.current.value = desiderataColor
        setIsDisplay(false)
    }

    const updateDesiderata = (e) => {
        e.preventDefault()
        const newDesiderataData = {
            "id":inputModalDesiderataId.current.value,
            "name": inputModalDesiderataName.current.value,
            "shortKey": inputModalDesiderataShortKey.current.value,
            "color": inputModalDesiderataColor.current.value
        }
        api_root.updateDesiderata(taserId, newDesiderataData).then(
            mutate([taserId, swrKey])
        )
        inputModalDesiderataId.current.value = ""
        inputModalDesiderataName.current.value = ""
        inputModalDesiderataShortKey.current.value = ""
        inputModalDesiderataColor.current.value = ""
        setIsDisplay(true)
    }
console.log(taserId)
    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputDesiderataId} inputRef2={inputDesiderataName} inputRef3={inputDesiderataShortKey} inputRef4={inputDesiderataColor}/>
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateDesiderata} inputRef1={inputModalDesiderataId} inputRef2={inputModalDesiderataName} inputRef3={inputModalDesiderataShortKey} inputRef4={inputModalDesiderataColor}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th>shortKey</th><th>couleur</th><th></th><th></th></tr></thead>
                    <tbody>
                        {data.map((desiderata) => {
                            return (
                                <tr key={desiderata.id}>
                                    <td> {desiderata.id}</td><td>{desiderata.name}</td><td>{desiderata.shortKey}</td><td style={{backgroundColor: desiderata.color}}>{desiderata.color}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateDesiderataForm(e, taserId, desiderata.id, desiderata.name, desiderata.shortKey, desiderata.color)
                                            }}

                                        /></td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            api_root.deleteDesiderata(taserId, desiderata.id).then(() => mutate([taserId, swrKey]))
                                        }}
                                    /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default DesiderataEditor