/* src/components/TaserInfo/TaserInfo.js */
import React, { useEffect, useRef, useState, useReducer } from "react"
import useSWR from "swr"
import { Link } from 'components'
import "./TaserInfo.css"
import * as api_root from "../../api/info"
import * as h from "../../lib/helpers"
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'

const TaserInfo = ({ user, className }) => {
 /*   useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])*/
    const taserId = h.slugify(user.email)
    const uid = user.uid.toString()

    /*********************define info state  *********************** */
    const [info, dispatchInfo] = useReducer(reducers.info,{})

    /***********************init info state************************* */
    const swrKey = "/admin/taser"
    const { data: dataInfo, error: errorInfo, mutate: mutateInfo } = useSWR([taserId, uid, swrKey], api_root.getInfo)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        !firstInit && dataInfo && dispatchInfo(actions.initState(dataInfo.info))
    }, [dataInfo, firstInit])

    /******************update state with new info******************** */
    useEffect(() => {
        let stateData = {info : info}
        if(firstInit){
            api_root.createInfo({taserId,stateData})
            mutateInfo(stateData, false)
        }
        return () => {stateData = {}}
    }, [info, firstInit, taserId, mutateInfo])


    const inputTaserName = useRef(null)
    const inputTaserDesc = useRef(null)
    const inputTaserNumberOfDays = useRef(null)
    const inputTaserNumberOfTasers = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "id":taserId,
                "uid":uid,
                "name":inputTaserName.current.value,
                "desc":inputTaserDesc.current.value,
                "numberOfDays":inputTaserNumberOfDays.current.value,
                "numberOfTasers":inputTaserNumberOfTasers.current.value
            }
            if (!firstInit) {setFirstInit(true)}
            dispatchInfo(actions.setInfo(newData))   
        }
    }

    if (errorInfo) return <p>Error loading data!</p>
    else if (!dataInfo) return <p>Loading...</p>
    else {
        const  { name, desc, numberOfDays, numberOfTasers }  = {...dataInfo.info}
        return (
            <div className={`${className}`}>
                <form onSubmit={handleSubmit}>
                    <label>id</label>
                    <input
                        className="u-full-width"
                        type="text"
                        value={taserId}
                        readOnly={true}
                    />
                    <label>Titre</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="*Titre du tableau..."
                        required
                        defaultValue={name}
                        ref={inputTaserName}
                    />
                    <label>Description</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Description courte de votre tableau..."
                        defaultValue={desc}
                        ref={inputTaserDesc}
                    />
                    <label>Longueur d'un tableau (7 jours par défaut)</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Longueur d'un tableau (en jours)..."
                        defaultValue={numberOfDays}
                        ref={inputTaserNumberOfDays}
                    />
                    <label>Nombre de taleaux affichés sur une page (4 par défaut)</label>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="Nombre de taleaux affichés sur une page..."
                        defaultValue={numberOfTasers}
                        ref={inputTaserNumberOfTasers}
                    />
                    <button type="submit">Create or Update</button>
                </form>
                <div className={`${className}`}>
                    {name && (
                        <div key={taserId}>    
                            <Link to={`/admin/${taserId}/users`} className="link">
                                <h5><span className="square">></span>{`Gérer les utilisateurs`}</h5>
                            </Link>
                            <Link to={`/admin/${taserId}/vacations`} className="link">
                                <h5><span className="square">></span>{`Gérer les vacations`}</h5>
                            </Link>
                            <Link to={`/admin/${taserId}/desideratas`} className="link">
                                <h5><span className="square">></span>{`Gérer les désidératas`}</h5>
                            </Link>
                            <Link to={`/admin/${taserId}/renforts`} className="link">
                                <h5><span className="square">></span>{`Ajouter des tableaux en renfort de ${name}`}</h5>
                            </Link>
                           {/*  <button
                                onClick={() => {
                                    api_root.deleteTaser(taserId).then(() => mutate([taserId,swrKey]))
                                }}
                                className=""
                            >
                                x
                            </button> */}
                        </div>)}                 
                </div>
            </div>
        )
    }
}

export default TaserInfo