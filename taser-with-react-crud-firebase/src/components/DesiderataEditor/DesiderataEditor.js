import React, { useEffect, useRef, useState, useReducer } from "react"
import useSWR from "swr"
import { navigate } from "@reach/router"
import "./DesiderataEditor.css"
import * as api_root from "../../api/desideratas"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'
import basePath from "../../lib/env"
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'

const BASE = basePath.BASE

const DesiderataEditor = ({ user, taserId, className }) => {
    useEffect(() => {
        if (!user) {
             navigate(`${BASE}/admin`)
        }
    }, [user])

    /*********************define users state  *********************** */
    const [isDisplay, setIsDisplay] = useState(true)
    const [desideratas, dispatchDesideratas] = useReducer(reducers.desideratas,[])
 
    /***********************init users state************************* */
    const swrKey = `/admin/${taserId}/desideratas` 
    const { data: dataDesideratas, error: errorDesideratas, mutate: mutateDesideratas } = useSWR([taserId, swrKey], api_root.getDesideratas)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        console.log(dataDesideratas)
        !firstInit && dataDesideratas && dispatchDesideratas(actions.initState(dataDesideratas.desideratas))
    }, [dataDesideratas, firstInit])

    /******************update state with new users******************** */
    useEffect(() => {
        let stateData = {desideratas : desideratas}
        if(desideratas.length>0 && firstInit){
            api_root.createDesideratas({taserId,stateData})
            mutateDesideratas(stateData, false)
        }
        return () => {stateData = {}}
    }, [desideratas, firstInit, taserId, mutateDesideratas])
   
    const inputDesiderataName = useRef(null)
    const inputDesiderataShortKey = useRef("x")
    const inputDesiderataId = useRef(null)
    const inputDesiderataNature = useRef("desiderata")
    const inputDesiderataColor = useRef(null)

    const inputModalDesiderataName = useRef(null)
    const inputModalDesiderataShortKey = useRef("x")
    const inputModalDesiderataId = useRef(null)
    const inputModalDesiderataNature = useRef("desiderata")
    const inputModalDesiderataColor = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name": inputDesiderataName.current.value,
                "shortKey": inputDesiderataShortKey.current.value,
                "color": inputDesiderataColor.current.value,
                "nature": inputDesiderataNature.current.value,
                "isRequired": ""
            }
            if (!firstInit) {setFirstInit(true)}
            dispatchDesideratas(actions.addDesiderata(newData))   
        }
    }

    const displayUpdateDesiderataForm = (e, taserId, desiderataId, desiderataNature, desiderataName, desiderataShortKey, desiderataColor) => {
        e.preventDefault()
        inputModalDesiderataId.current.value = desiderataId
        inputModalDesiderataNature.current.value = desiderataNature
        inputModalDesiderataName.current.value = desiderataName
        inputModalDesiderataShortKey.current.value = desiderataShortKey
        inputModalDesiderataColor.current.value = desiderataColor
        setIsDisplay(false)
    }

    const updateDesiderata = (e) => {
        e.preventDefault()
        const newDesiderataData = {
            "id":inputModalDesiderataId.current.value,
            "nature":inputModalDesiderataNature.current.value,
            "name": inputModalDesiderataName.current.value,
            "shortKey": inputModalDesiderataShortKey.current.value,
            "color": inputModalDesiderataColor.current.value,
            "isRequired": ""
        }
        if (!firstInit) {setFirstInit(true)}
        dispatchDesideratas(actions.updateDesiderata(newDesiderataData)) 

        inputModalDesiderataId.current.value = ""
        inputModalDesiderataNature.current.value = ""
        inputModalDesiderataName.current.value = ""
        inputModalDesiderataShortKey.current.value = ""
        inputModalDesiderataColor.current.value = ""
        setIsDisplay(true)
    }

    if (errorDesideratas) return <p>Error loading data!</p>
    else if (!dataDesideratas) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputDesiderataId} inputRef2={inputDesiderataNature} inputRef3={inputDesiderataName} inputRef4={inputDesiderataShortKey} inputRef5={inputDesiderataColor}/>
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateDesiderata} inputRef1={inputModalDesiderataId} inputRef2={inputModalDesiderataNature} inputRef3={inputModalDesiderataName} inputRef4={inputModalDesiderataShortKey} inputRef5={inputModalDesiderataColor}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th>shortKey</th><th>couleur</th><th></th><th></th></tr></thead>
                    <tbody>
                        {dataDesideratas.desideratas.map((desiderata) => {
                            return (
                                <tr key={desiderata.id}>
                                    <td> {desiderata.id}</td><td>{desiderata.name}</td><td>{desiderata.shortKey}</td><td style={{backgroundColor: desiderata.color}}>{desiderata.color}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateDesiderataForm(e, taserId, desiderata.id, desiderata.nature, desiderata.name, desiderata.shortKey, desiderata.color)
                                            }}

                                        /></td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            if (!firstInit) {setFirstInit(true)}
                                            dispatchDesideratas(actions.removeDesiderata(desiderata)) 
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