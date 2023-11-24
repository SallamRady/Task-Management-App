import React from 'react';
import MainNavbar from '../../components/mainNav/mainNavbar';
import { Container } from '@mui/material';
import TasksList from '../../components/TasksList/TasksList';
import AddTask from '../../components/AddTask/AddTask';

const HomePage = () => {
    const tasks = [
        { title: 'T1', dueDate: '01/12/2023', description: 'Task 1', isCompleted: false },
        { title: 'T2', dueDate: '01/12/2023', description: 'Task 2', isCompleted: true },
        { title: 'T3', dueDate: '01/12/2023', description: 'Task 3', isCompleted: false },
        { title: 'T4', dueDate: '01/12/2023', description: 'Task 4', isCompleted: true },
        { title: 'T5', dueDate: '01/12/2023', description: 'Task 5', isCompleted: true },
    ]
    return (
        <>
            <MainNavbar />
            <Container style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5rem' }}>
                <TasksList tasks={tasks} />
                <AddTask />
            </Container>
        </>
    )
}

export default HomePage
