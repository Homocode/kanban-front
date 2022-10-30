import React, {useState} from "react";

function Card (props) {
    const {id, cardAssignment, cardPriority, cardStatus, handleDelete } = props
    const [assignment, setAssignment] = useState(cardAssignment)
    const[priority, setPriority] = useState(cardPriority)
    const [status, setStatus] = useState(cardStatus);
    
    const handleChange = (event) => {
        if (event.target.name === "card-assignment") {
            setAssignment(event.target.value)
        } else if (event.target.name === "priority-number") {
            setPriority(event.target.value)
        } else if (event.target.name === "status-task") {
            setStatus(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.value)
    }

    return (
        <div className="assignment-card" id={id}>
            <div className="task inline-display">
                <form onSubmit={handleSubmit} id="assignment-form">
                    <input onChange={handleChange} value={assignment} id="card-assignment" placeholder="Enter assignment...." type="text" name="card-assignment"></input>
                </form>
                <button type="button" onClick={handleDelete} className="delete-button">X</button>
            </div>
            <div className="card-priority inline-display">
                <div className="status-circle" id="priority-status-circle"></div>
                <label htmlFor="priority-number">Priority:</label>
                <input form={`assignment-card-${id}`} onChange={handleChange} id="priority-number" name="priority-number" min="1" max="5" value={priority} type="text" ></input>
                    </div>
                    <div className="card-status inline-display">
                        <div className="status-circle" id="status-status-circle">
                            <div id="status-status-circle-a"></div>
                            <div id="status-status-circle-b"></div>
                            <div id="status-status-circle-c"></div>
                            <div id="status-status-circle-d"></div>
                        </div>
                        <label htmlFor="status-task">Status:</label>
                        <select onChange={handleChange} form={`assignment-card-${id}`} id="status-task" name="status-task" type="text" defaultValue={"not-started"}>
                            <option value="not-started">Not started</option>
                            <option value="in-progress">In progress</option>
                            <option value="block">Block</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>
    )
}

export default Card