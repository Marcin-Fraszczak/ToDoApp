import React, {useEffect, useState} from "react"
import {createRoot} from "react-dom/client"
import {getTasks, deleteTask} from "./fetches"
import {Task} from "./Task"
import {NewTask} from "./NewTask";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [appReload, setAppReload] = useState(false)

    useEffect(() => {
        getTasks(setTasks)
    }, [appReload])

    const onRemoveTask = (id) => {
        deleteTask(id, () => setAppReload(!appReload))
    }

    return (
        <>
            <NewTask appReload={appReload} setAppReload={setAppReload}/>
            {tasks.map((item, index) =>
                <Task key={index} task={item} onRemoveTask={onRemoveTask}/>)}
        </>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
