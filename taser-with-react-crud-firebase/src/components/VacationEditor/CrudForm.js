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
            <div className="four columns">
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
            <div className="two columns">
                <label>
                    <span className="label-checkbox">Obligatoire sur 24h?</span>
                    <input
                        ref={inputRef5}
                        type="checkbox"
                    />

                </label>
            </div>
            <div className="four columns">
                <button type="submit"
                    className={buttonName === "Update" ? "submitButton " : null}
                >{buttonName}</button>
            </div>
        </div>
    </form>

export default CrudForm