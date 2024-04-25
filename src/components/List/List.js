import React, { useState, useEffect } from 'react';
import Add from '../Add/Add';
import './List.css';
import Task from '../Task/task';

function List() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTaskList = localStorage.getItem('tasks');
        if (savedTaskList)
            setTasks(JSON.parse(savedTaskList));
    }, []);

    const addTask = (newTask) => {
        const taskList = [...tasks, newTask];
        setTasks(taskList);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log(newTask)
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const editTask = (taskId, newName) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, name: newName, isEditing: false };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const startEditing = (taskId) => {
        const updatedTask = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, isEditing: true };
            }
            return  { ...task, isEditing: false };
        });
        setTasks(updatedTask);
        localStorage.setItem('tasks', JSON.stringify(updatedTask));
        
    }

    const cancelEditing = () => {
        const updatedTask = tasks.map(task => {
            return  { ...task, isEditing: false };
        });
        setTasks(updatedTask);
        localStorage.setItem('tasks', JSON.stringify(updatedTask));
    }

    const checkedTask = (taskId) => {
        const editedTask = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, isChecked: !task.isChecked };
            }
            return task;
        });
        setTasks(editedTask);
        localStorage.setItem('tasks', JSON.stringify(editedTask));
        
    }

    return (
        <div>
            <h1>To Do List with React</h1>
            <Add addTask={addTask} />
            <ul>
                {tasks.map(task => (
                    <Task key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} startEditing={startEditing} cancelEditing={cancelEditing} checkedTask={checkedTask}/>
                ))}
            </ul>
        </div>
    );
}

export default List;