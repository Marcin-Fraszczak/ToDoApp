import React, {useEffect, useState} from "react"
import {createRoot} from "react-dom/client"
import {getTasks} from "./fetches"
import {Task} from "./Task"


const App = () => {
    const [tasks, setTasks] = useState(false)
    const print = (data) => console.log(data)

    const onRemoveTask = (id) => {
        console.log('task to be removed: ', id)
    }

    useEffect(() => {
        getTasks(setTasks)
    }, [])

    if (tasks) {
        return (
            <>
                {tasks.map((item, index) => <Task key={index} task={item} onRemoveTask={onRemoveTask}/>)}
            </>
        )
    }
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
