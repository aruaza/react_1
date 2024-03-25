import React, {useEffect, useState} from "react";
// import './App.css';
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
import List from "./components/list/List";
import TodoList from "./components/todoList/TodoList";
import Input from "./components/input/Input";


function App() {
    
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([])
    const [setLocal]=useState([])


    useEffect(() => {
        const myLocalStorage = JSON.parse(localStorage.getItem('todos'))
        if (myLocalStorage === null) {
            return localStorage.setItem('todos', JSON.stringify(tasks))
        }
        if (myLocalStorage.length !== 0) {
            setTasks(myLocalStorage)
        }
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(tasks))
    }, [tasks]);
    const onChangeInput = (event) => setInput(event.target.value);

    const handleShow = () => setShow(prevState=>!prevState);
    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    const getTodo = async (endpoint) => {
        const data = await fetch(BASE_URL + endpoint)
        console.log(data);
        const todos = await (data.json())
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const getFromLocalStorage = () => {
        setLocal(JSON.parse()(localStorage.getItem('todos')))
    }

    const handleAdd = () => {
        setTasks(prev => [ ...prev, {
                id: tasks.length===0 ? 1 : tasks[tasks.length -1].id+1,
                task: input
            }
            ]
        );
        console.log(tasks);
    };

    const handleDelete = (id) => setTasks(tasks.filter(t => t.id !== id));
    const searchTask = (event) => {
        setInput(event.target.value)
        const filteredTasks = tasks.filter(task =>
            task.task.toLowerCase().includes(event.target.value.toLowerCase()))
        setTasks(filteredTasks)
    }

    const handleDone = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task

            )
        );

    };


    const handleEdit=(newTitle)=>{
        tasks.map(task=>{
            if (task.id===newTitle.id){
                return task.task=newTitle.task
            }
        })
        setTasks(tasks)
    }
    const [filterOption, setFilterOption]=useState('all')
    const handleFilterChange=(event)=>{
        setFilterOption(event.target.value)
    }

    const filterTasks=tasks.filter(task=>{
        switch (filterOption){
            case "all" :
                return true
            case "completed" :
                return task.completed
            case "not completed" :
                return !task.completed
            default:
                return true

        }
    })
    const handleClearAllTasks = () => {
        setTasks([]);
        localStorage.removeItem('todos');
    };


    return (
        <div>
            <div >
                <select value={filterOption} onChange={handleFilterChange} >
                    <option value="all">все таски</option>
                    <option value="completed"> выполненные</option>
                    <option value="not completed">не выполненные</option>
                </select>

            </div>
            {show &&
                <Modal
                    handleShow={handleShow}
                    onChangeInput={onChangeInput}
                    handleAdd={handleAdd}
                >
                    <List />
                </Modal>
            }
            <Button label={'Очистить все таски'} onClick={handleClearAllTasks} />
            <Button label={'get'} onClick={()=>getTodo('todos')}/>
            <Button label={'get from storage'} onClick={()=>getFromLocalStorage()}/>
            <Button label={'open'} onClick={handleShow} />
            <div className="inputApp">
                <Input type={'search'}
                       placeholder={'Поиск дел'}
                       onChangeInput={searchTask}
                       value={input} />
            </div>
            <TodoList
                tasks={filterTasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
            />

        </div>
    );
}

export default App;
