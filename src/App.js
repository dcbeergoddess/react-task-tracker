import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      console.log(data)
    }
    fetchTasks()
  }, []) //DEPENDENCY ARRAY

  //ADD TASK
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  //DELETE TASK
  const deleteTask = (id) => {
    //for each task you want to filter where the task id is not equal to the id
    setTasks(tasks.filter(task => task.id !== id));
  };

  //TOGGLE REMINDER
  const toggleReminder = (id) => {
    //use map to toggle --> map through `tasks` in our state and for each `task` 
    //where `task.id` in current iteration is equal to the id that's passed in 
    //then we have specific object : (else the task) 
    //we want to copy && spread across all the task properties and values in object (of the task that matches) but want to change the reminder so the reminder i'm going to set is opposite of whatever that specific task reminder is
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task))
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
