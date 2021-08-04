import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, []) //DEPENDENCY ARRAY

  //FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //FETCH TASK
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //ADD TASK
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    //CREATED ID WITHOUT BACKEND JSON SERVER IN PLACE
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    //for each task you want to filter where the task id is not equal to the id
    setTasks(tasks.filter(task => task.id !== id));
  };

  //TOGGLE REMINDER
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    //use map to toggle --> map through `tasks` in our state and for each `task` 
    //where `task.id` in current iteration is equal to the id that's passed in 
    //then we have specific object : (else the task) 
    //we want to copy && spread across all the task properties and values in object (of the task that matches) but want to change the reminder so the reminder i'm going to set is opposite of whatever that specific task reminder is
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder } : task))
  }

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask} 
      />
      {/* If showAddTask is true we show AddTask else we do nothing */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* IF THERE ARE TASKS, show Tasks, else show message */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
