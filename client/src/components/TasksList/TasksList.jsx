import React from 'react'
import TaskCard from '../Task/TaskCard'

const TasksList = ({ tasks }) => {
    const Task = tasks.map(task => {
        return <TaskCard
            title={task?.title}
            description={task?.description}
            dueDate={task?.dueDate}
            isCompleted={task?.isCompleted} />
    })
    return Task;
}

export default TasksList
