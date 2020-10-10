/* src/components/TaserInfo/TaserInfo.js */
import React, { useEffect, useRef } from "react"
import useSWR, { mutate } from "swr"
import { navigate } from "@reach/router"
import "./TaserInfo.css"
import * as libInfo from "../../lib/getTaserInfo"
import * as h from "../../lib/helpers"
//A faire
//css form reutilisable

const TaserInfo = ({ user, className }) => {
    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    const taserId = h.slugify(user.email)
    const { data, error } = useSWR(taserId, libInfo.getTaserInfo)

    const inputTaserName = useRef(null)
    const inputTaserDesc = useRef(null)
    const inputTaserNumberOfDays = useRef(null)
    const inputTaserNumberOfTasers = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            libInfo.createInfo(
                taserId,
                inputTaserName.current.value,
                inputTaserDesc.current.value,
                inputTaserNumberOfDays.current.value,
                inputTaserNumberOfTasers.current.value
            )
            mutate(taserId)
        }
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        //in one line !!!
        const { name, desc, numberOfDays, numberOfTasers } = {...data[0]}
        //the same in 16 lines !!!
        /*let dataDefautName
        if (data[0] && data[0].name && dataDefautName !== data[0].name) {
            dataDefautName = data[0].name
        }
        let dataDefautDesc = ""
        if (data[0] && data[0].desc && dataDefautDesc !== data[0].desc) {
            dataDefautDesc = data[0].desc
        }
        let dataDefautNumberOfDays = ""
        if (data[0] && data[0].numberOfDays && dataDefautNumberOfDays !== data[0].numberOfDays) {
            dataDefautNumberOfDays = data[0].numberOfDays
        }
        let dataDefautNumberOfTasers = ""
        if (data[0] && data[0].numberOfTasers && dataDefautNumberOfTasers !== data[0].numberOfTasers) {
            dataDefautNumberOfTasers = data[0].numberOfTasers
        }*/
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
                    {data[0] && data[0].id && data.map((info) => {
                        return (
                            info.id && (<div key={info.id}>{`${info.name} ${info.desc}`}</div>)
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default TaserInfo