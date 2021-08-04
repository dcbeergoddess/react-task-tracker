import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'DMV Alumni Meeting',
      day: 'July 30th at 1pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Log Coding Hours',
      day: 'August 4th at 4pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Send Finished Crochet Sweater',
      day: 'August 6th at 11am',
      reminder: false,
    },
  ]);

  //DELETE TASK
  const deleteTask = id => {
    //for each task you want to filter where the task id is not equal to the id
    setTasks(tasks.filter(task => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    //use map to toggle --> map through `tasks` in our state and for each `task` 
    //where `task.id` in current iteration is equal to the id that's passed in 
    //then we have specific object : (else the task) 
    //we want to copy && spread across all the task properties and values in object (of the task that matches) but want to change the reminder so the reminder i'm going to set is opposite of whatever that specific task reminder is
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header />
      <AddTask />
      {/* IF THERE ARE TASKS, show Tasks, else show message */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
