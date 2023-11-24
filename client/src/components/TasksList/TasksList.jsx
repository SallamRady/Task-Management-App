import React from 'react'
import TaskCard from '../Task/TaskCard'

const TasksList = ({ tasks, setTasks }) => {
    const Task = tasks.map(task => {
        return <TaskCard
            key={task?._id}
            id={task?._id}
            title={task?.title}
            tasks={tasks}
            setTasks={setTasks}
            description={task?.description}
            dueDate={task?.dueDate}
            isCompleted={task?.isCompleted} />
    })
    return Task;
}

export default TasksList
