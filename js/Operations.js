import React, {useEffect, useState} from "react"
import {postOperation} from "./fetches";

const Operations = (props) => {
    const errorMsg = 'invalid name'
    const errorStyle = {color: 'red', width: '7rem', marginLeft: '2rem'}
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const validateString = value => value ? value : null

    useEffect(() => {
        if (!props.form) {
            setError(false)
            setValue('')
        }
        if (value) {
            setError(!validateString(value))
        }
    }, [value, props.form])

    const handleSubmit = (e) => {
        e.preventDefault()
        let description = e.target.name.value
        if (validateString(description)) {
            e.target.name.value = ''
            setError(false)
            const data = {
                description: description,
                timeSpent: 0,
            }
            postOperation(props.taskId, data, props.setOperations(prev => [...prev, data]))
        } else {
            setError(true)
        }
    }

    return (
        <>
            <div className="card-body">
                <form hidden={!props.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-group">
                        <input type="text"
                               name='name'
                               className="form-control"
                               placeholder="Operation description"
                               value={value}
                               onChange={e => setValue(e.target.value)}/>


                        <div className="input-group-append">
                            <button className="btn btn-info">
                                Add
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                            <div style={errorStyle}>{error ? errorMsg : ''}</div>
                        </div>
                    </div>
                </form>
            </div>

            <ul className="list-group list-group-flush">
                {props.children}
            </ul>
        </>
    )
}

export {Operations}