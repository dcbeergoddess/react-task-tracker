import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
     {tasks.map((task) => (
       //PASS IN EACH TASK AS A PROP (task={task})
        <Task 
        key={task.id} 
        task={task} 
        onDelete={onDelete} 
        onToggle={onToggle} 
        />
      ))} 
    </>
  )
}

export default Tasks
