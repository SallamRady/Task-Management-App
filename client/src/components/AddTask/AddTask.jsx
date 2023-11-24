import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../utils/storage';

const AddTask = ({ tasks, setTasks }) => {
    // declaration variables.
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState(1);
    const [Month, setMonth] = useState(1);
    const [year, setYear] = useState(2023);
    // const TasksContainer
    const navigator = useNavigate();

    // methods.
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("form data :", title, description, day, Month, year);
        let dueDate = new Date(year, Month - 1, day);
        let task = {
            title, description, dueDate
        };
        let _token = getData('token');
        await fetch("http://localhost:8080/tasks/creae-task", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                Authorization: `Bearer ${_token}`,
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            console.log("Tasks Data:", data);
            tasks.push({
                ...data?.task
            });
            navigator("/home");
            setTasks(tasks)
            setOpen(false);
        }).catch(err => {
            console.log("Error in fetch items:", err);
        });
    };

    let dayList = [...Array(31).keys()].map(i => i + 1).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });
    let monthList = [...Array(12).keys()].map(i => i + 1).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });
    let yearList = [...Array(30).keys()].map(i => i + 2000).map(i => {
        return <MenuItem value={i} key={i}>{i}</MenuItem>
    });

    return (
        <div>
            <TriggerButton style={{
                position: 'fixed',
                bottom: '1.9rem',
                right: '1.5rem',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '3rem',
                height: '3rem',
                background: '#0D6EFD',
                color: '#fff'
            }} type="button" onClick={handleOpen}>
                <AddRoundedIcon />
            </TriggerButton>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={style}>
                    <h3 id="unstyled-modal-title" className="modal-title">
                        Add Task
                    </h3>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="title"
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
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name="description"
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
                            Add
                        </Button>
                    </Box>
                </ModalContent>
            </Modal>
        </div >
    );
}
export default AddTask;

const Backdrop = forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const style = {
    width: 400,
};

const ModalContent = styled(Box)(
    ({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
        };
    padding: 1rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
  
  
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
  
    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
    `,
);

const TriggerButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);
