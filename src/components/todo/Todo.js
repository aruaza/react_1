import React, {useState} from 'react';
import classes from "./todo.module.css";
import Button from "../button/Button";
import Input from "../input/Input";
const Todo = ({task, handleDelete, index, handleDone, handleEdit, setCurrentEdit, isEdit}) => {
    const todoClass = `${classes.todo} ${task.completed ? classes.active : ''}`;
    const [newTitle, setNewTitle]=useState(task.task)

    const handleSave=()=>{
        handleEdit({
            ...task, task: newTitle
        })
        setCurrentEdit('')
    }

    return (
        <>
            {
                isEdit? <div className={classes.edit}>
                        <input type="text" value={newTitle} onChange={event => setNewTitle(event.target.value)}/>
                        <Button label={'save'} onClick={handleSave}/>
                        <Button label={'cansel'} onClick={()=>{handleEdit(task.id)
                            setCurrentEdit('')}} />
                    </div> :
                    <div className={todoClass} >
                        <p>{index+1} { task.task}</p>
                        <Button label={'edit'} onClick={()=>{setCurrentEdit (task.id)}}/>
                        <Button  label={'Done'} onClick={() => {handleDone(task.id)}}/>
                        <Button label={'Delete'} onClick={() => {handleDelete(task.id)}}/>
                    </div>
            }


        </>
    )
}

export default Todo