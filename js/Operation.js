import React, {useEffect, useState} from "react"
import {putOperation} from "./fetches";

const Operation = (props) => {
    const errorMsg = 'incorrect time'
    const errorStyle = {color: 'red'}
    const [form, setForm] = useState(false)
    const [error, setError] = useState(false)
    const [value, setValue] = useState('')
    const [operation, setOperation] = useState(props.operation)

    const ModifyOperation = (time) => {
        setOperation(prevOperation => {
            return {
                ...prevOperation,
                timeSpent: prevOperation.timeSpent + time,
            }
        })
    }

    const displayTime = value => value >= 60 ? `${Math.floor(value / 60)}h ${value % 60}m` : `${value}m`

    const hideTimeForm = (e) => {
        e.preventDefault()
        setForm(false)
        setError(false)
    }

    useEffect(() => {
        if (value) {
            setError(!validateNumber(value))
        }
    }, [value])

    const validateNumber = value => value ? (value.match(/^[0-9]+$/) && Number(value) > 0) : null

    const addTime = (e) => {
        e.preventDefault()
        let time = e.target.time.value
        if (validateNumber(time)) {
            e.target.time.value = ''
            setError(false)
            setForm(false)
            const data = {
                description: operation.description,
                timeSpent: operation.timeSpent + Number(time)
            }
            putOperation(operation.id, data, ModifyOperation(Number(time)))
        } else {
            setError(true)
        }
    }

    const deleteOperation = (id) => {
        console.log('id to delete ', id)
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {operation.description}
                <span className="badge badge-success badge-pill ml-2">
                    {operation.timeSpent > 0 && displayTime(operation.timeSpent)}
                </span>
            </div>

            <div style={errorStyle}>{error ? errorMsg : ''}</div>
            <form hidden={!form} onSubmit={e => addTime(e)}>
                <div className="input-group input-group-sm">
                    <input type="number"
                           className="form-control"
                           placeholder="Spent time in minutes"
                           style={{width: '12rem'}}
                           name='time'
                           onChange={e => setValue(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-success"><i className="fas fa-save"></i></button>
                        <button className="btn btn-outline-dark"
                                onClick={e => hideTimeForm(e)}
                        ><i className="fas fa-times false"></i></button>
                    </div>
                </div>
            </form>

            <div hidden={form || props.status !== 'open'}>
                <button className="btn btn-outline-success btn-sm mr-2"
                        onClick={() => setForm(true)}>
                    Add time<i className="fas fa-clock ml-1"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteOperation(operation.id)}><i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    )
}

export {Operation}