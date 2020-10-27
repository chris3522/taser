import React from "react"
import "./DesiderataEditor.css"


const CrudForm = ({ buttonName, displayForm, onSubmit, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5 }) =>

    <form className={displayForm} onSubmit={onSubmit}>
        <div className="row">
            <div className={`zero columns`} >
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
                    defaultValue="desiderata"
                />
            </div>
            <div className="four columns">
                <input
                    ref={inputRef3}
                    className="u-full-width"
                    type="text"
                    placeholder="nom (10 lettres max)"
                    maxLength="10"
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
                    readOnly
                    defaultValue="x"
                />
            </div>
            <div className="two columns">
                <input
                    ref={inputRef5}
                    className="u-full-width colorBox"
                    type="color"
                />
            </div>
            <div className="two columns">
                <button type="submit"
                    className={buttonName === "Update" ? "submitButton " : null}
                >{buttonName}</button>
            </div>
            <div className="two columns">

            </div>
        </div>
    </form>

export default CrudForm