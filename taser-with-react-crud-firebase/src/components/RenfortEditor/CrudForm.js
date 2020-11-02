import React from "react"
import useSWR from "swr"
import * as api_root_tasers from "../../api/tasers"
import "./RenfortEditor.module.css"


const CrudForm = ({ buttonName, onSubmit, inputRef1, taserId }) => {
    const swrKey = `tasersListForRenfort`
    const { data, error } = useSWR([swrKey], api_root_tasers.getTasers)
    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        const data2 = data.filter(taser => taser.id!==taserId)
        return (
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="six columns">
                        <select className="u-full-width"  ref={inputRef1}>
                            {data2.map((renfort,i) => <option key={i} value={JSON.stringify(renfort)}>{renfort.name}</option>)}
                        </select>
                    </div>
                    <div className="four columns">
                        <button type="submit">{buttonName}</button>
                    </div>
                    <div className="two columns">

                    </div>
                </div>
            </form>
        )
    }
}

export default CrudForm