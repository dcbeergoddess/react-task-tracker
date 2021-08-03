import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';

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
    console.log(id);
  }

  return (
    <div className="container">
      <Header />
      {/* IF THERE ARE TASKS, show Tasks, else show message */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
