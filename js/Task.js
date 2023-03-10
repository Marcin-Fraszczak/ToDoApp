import React, {useEffect, useState} from "react"
import {getOperations} from "./fetches"
import {Operations} from "./Operations"
import {Operation} from "./Operation"

const Task = ({task, onRemoveTask}) => {
    const [status, setStatus] = useState(task.status)
    const [operations, setOperations] = useState(null)
    const [form, setForm] = useState(false)

    useEffect(() => {
        // fetch with status
        getOperations(task.id, setOperations)
    }, [status])

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{task.title}</h5>
                    <h6 className="card-subtitle text-muted">{task.description}</h6>
                </div>

                <div>
                    <button className="btn btn-info btn-sm mr-2" hidden={status !== 'open'}
                            onClick={() => setForm(!form)}>
                        Add operation
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>

                    <button className="btn btn-dark btn-sm" hidden={status !== 'open'}
                            onClick={() => setStatus('closed')}>
                        Finish
                        <i className="fas fa-archive ml-1"></i>
                    </button>

                    <button className="btn btn-outline-danger btn-sm ml-2" hidden={!operations}
                            onClick={() => onRemoveTask(task.id)}>
                        <i className="fas fa-trash false"></i>
                    </button>
                </div>
            </div>
            <Operations taskId={task.id} operations={operations} setOperations={setOperations}
                        form={form} setForm={setForm} status={status}>
                {operations && operations.map((item, index) => <Operation key={index} operation={item} status={status}/>)}
            </Operations>
        </section>
    )

}

export {Task}