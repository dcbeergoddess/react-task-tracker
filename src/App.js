import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

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
    }
  
])
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
