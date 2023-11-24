import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, Checkbox, Chip, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { getData } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import './TaskCard.css';


const TaskCard = ({ tasks, setTasks, id, title, dueDate, description, isCompleted, Catrgoties }) => {
    let navigator = useNavigate();
    const [editDialog, setEditDialog] = useState(false);
    const [_title, setTitle] = useState(title);
    const [_description, setDescription] = useState(description);
    const [day, setDay] = useState(dueDate?.split('T')[0]?.split('-')[2]);
    const [Month, setMonth] = useState(dueDate?.split('T')[0]?.split('-')[1]);
    const [year, setYear] = useState(dueDate?.split('T')[0]?.split('-')[0]);
    const [catrgoties, setCatrgoties] = useState(Catrgoties);
    const handleChange = async () => {
        let _token = getData('token');
        await fetch(`http://localhost:8080/tasks/edit-task/${id}`, {
            method: "PUT",
            body: JSON.stringify({ isCompleted: isCompleted ? false : true,categories: catrgoties }),
            headers: {
                Authorization: `Bearer ${_token}`,
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            console.log("Tasks Data:", data);
            tasks = tasks.map(ele => {
                if (ele?._id === id) return data?.task;
                else return { ...ele };
            });
            navigator("/home");
            setTasks(tasks)
        }).catch(err => {
            console.log("Error in fetch items:", err);
        });
    }
    const deleteTask = async (id) => {
        let _token = getData('token');
        await fetch(`http://localhost:8080/tasks/delete-task/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${_token}`,
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            console.log("Tasks Data:", data);
            tasks = tasks.filter(ele => ele?._id !== id);
            navigator("/home");
            setTasks(tasks)
        }).catch(err => {
            console.log("Error in fetch items:", err);
        });
    };
    const handleEditTask = async (e) => {
        e.preventDefault();
        let dueDate = new Date(year, Month - 1, day);
        let task = {
            title: _title, description: _description, dueDate, categories: catrgoties
        };
        let _token = getData('token');
        let url = `http://localhost:8080/tasks/edit-task/${id}`;
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                Authorization: `Bearer ${_token}`,
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            console.log("Data Task ", data);
            tasks = tasks.map(ele => {
                if (ele?._id === id) return data?.task;
                else return { ...ele };
            });
            navigator("/home");
            setTasks(tasks);
            setEditDialog(false);
        }).catch(err => {
            console.log("Error in fetch items:", err);
        });
    }
    let dayList = [...Array(31).keys()].map(i => i + 1).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });
    let monthList = [...Array(12).keys()].map(i => i + 1).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });
    let yearList = [...Array(30).keys()].map(i => i + 2000).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });
    let Cats = ["Work", "Study", "Sport", "Other"];
    let CategoriesList = Cats.map(ele => <MenuItem value={ele} key={ele}>{ele}</MenuItem>)


    return (
        <>
            {editDialog && <Container id="EditTask">
                <h3 id="unstyled-modal-title" className="modal-title">
                    Edit Task
                </h3>
                <Box component="form" onSubmit={handleEditTask} sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id="title"
                        value={_title}
                        label="Task Title."
                        name="title"
                        autoComplete="title"
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-standard-label">Due Date:</InputLabel>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
                        <InputLabel id="demo-simple-select-standard-label">Day</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={day}
                            onChange={e => setDay(e.target.value)}
                            label="Age"
                        >
                            {dayList}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
                        <InputLabel id="demo-simple-select-standard-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={Month}
                            onChange={e => setMonth(e.target.value)}
                            label="Age"
                        >
                            {monthList}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
                        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            label="Age"
                        >
                            {yearList}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={catrgoties}
                            multiple
                            onChange={e => {
                                console.log("Cx", e.target.value);
                                setCatrgoties(e.target.value)
                            }}
                            label="Categories"
                        >
                            {CategoriesList}
                        </Select>
                    </FormControl>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name="description"
                        value={_description}
                        label="Task description"
                        type="text"
                        id="description"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => setEditDialog(false)}
                        fullWidth
                        variant="contained"
                        color='error'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Container>}
            <Card sx={{ width: 345 }} style={{ padding: '0.2rem', margin: '0.4rem' }}>
                <CardHeader
                    title={title}
                    subheader={dueDate?.split('T')[0]}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <Stack direction="row" spacing={1}>
                    {(Catrgoties||[])?.map(cat => <Chip key={cat} label={cat} color="secondary" />)}
                </Stack>
                <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Checkbox
                            checked={isCompleted}
                            value={isCompleted}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        /> Completed?
                    </Container>
                    <Container>
                        <IconButton onClick={() => setEditDialog(true)} aria-label="edit task">
                            <EditTwoToneIcon color='primary' />
                        </IconButton>
                        <IconButton onClick={() => deleteTask(id)} aria-label="delete task">
                            <DeleteForeverTwoToneIcon color='error' />
                        </IconButton>
                    </Container>
                </CardActions>
            </Card>
        </>
    );
}

export default TaskCard;
