import React from "react"
import "./VacationEditor.css"


const CrudForm = ({ buttonName, displayForm, onSubmit, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5 }) =>

    <form className={displayForm} onSubmit={onSubmit}>
        <div className="row">
            <div className={`twelve columns`} >
                <input
                    ref={inputRef1}
                    className="u-full-width"
                    placeholder="id"
                    type="hidden"
                    readOnly
                />
                <input
                    ref={inputRef2}
                    className="u-full-width"
                    placeholder="nature"
                    type="hidden"
                    readOnly
                    defaultValue="vacation"
                />
            </div>
        </div>
        <div className="row">
            <div className="three columns">
                <input
                    ref={inputRef3}
                    className="u-full-width"
                    type="text"
                    placeholder="nom (4 lettres max)"
                    maxLength="4"
                    required
                />
            </div>
            <div className="two columns">
                <input
                    ref={inputRef4}
                    className="u-full-width"
                    type="text"
                    placeholder="shortKey"
                    maxLength="1"
                    required
                />
            </div>
            <div className="three columns">
                <select className="u-full-width"  ref={inputRef5}>
                    <option key={1} value={"required"}>{"Obligatoire sur 24h ?"}</option>
                    <option key={2} value={"optional"}>{"Optionnelle sur 24h ?"}</option>
                    <option key={3} value={"renfort"}>{"De renfort pour un autre service ?"}</option>
                </select>
            </div>
            <div className="four columns">
                <button type="submit"
                    className={buttonName === "Update" ? "submitButton " : null}
                >{buttonName}</button>
            </div>
        </div>
    </form>

export default CrudForm