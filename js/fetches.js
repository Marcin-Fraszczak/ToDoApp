import {API_KEY, API_URL} from "./config"

const checkForErrors = async (response, successCallback) => {
    try {
        if (!response.ok) {
            throw new Error('Network error')
        }
        const data = await response.json()
        if (data.error || typeof successCallback !== "function") {
            throw new Error("Error!")
        }
        return data.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getTasks = async (successCallback) => {
    const response = await fetch(`${API_URL}/tasks`, {
        headers: {
            Authorization: API_KEY,
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(data.sort(function (a, b) {
        return new Date(b.addedDate) - new Date(a.addedDate)
    }))
}

const putTask = async (taskId, taskData, successCallback) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(taskData.status)
}

const postTask = async (taskData, successCallback) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(prev => [data, ...prev])
}

const deleteTask = async (taskId, successCallback) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            Authorization: API_KEY,
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(prev => prev.filter(item => item.id !== taskId))
}

const getOperations = async (id, successCallback) => {
    const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
            Authorization: API_KEY,
        },
    })
    let data = await checkForErrors(response, successCallback)
    data && successCallback(data.sort(function (a, b) {
        return new Date(a.addedDate) - new Date(b.addedDate)
    }))
}

const putOperation = async (operationId, operationData, successCallback) => {
    const response = await fetch(`${API_URL}/operations/${operationId}`, {
        method: 'PUT',
        body: JSON.stringify(operationData),
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(prev => {
        return {
            ...prev,
            timeSpent: data.timeSpent,
        }
    })
}

const postOperation = async (taskId, operationData, successCallback) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}/operations`, {
        method: 'POST',
        body: JSON.stringify(operationData),
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(prev => [data, ...prev])
}

const deleteOperation = async (operationId, successCallback) => {
    const response = await fetch(`${API_URL}/operations/${operationId}`, {
        method: 'DELETE',
        headers: {
            Authorization: API_KEY,
        },
    })
    const data = await checkForErrors(response, successCallback)
    data && successCallback(prev => prev.filter(item => item.id !== operationId))
}

export {getTasks, putTask, postTask, deleteTask, getOperations, putOperation, postOperation, deleteOperation}