import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Checkbox, Chip, Stack } from '@mui/material';

const TaskCard = ({ title, dueDate, description, isCompleted }) => {
    const [taskComplete, setTaskComplete] = useState(isCompleted);
    const handleChange = () => {
        setTaskComplete(prev => !prev)
    }

    return (
        <Card sx={{ width: 345 }} style={{ padding: '0.2rem', margin: '0.4rem' }}>
            <CardHeader
                title={title}
                subheader={dueDate}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Stack direction="row" spacing={1}>
                <Chip label="primary" color="primary" />
                <Chip label="success" color="success" />
                <Chip label="secondary" color="secondary" />
                <Chip label="warning" color="warning" />
            </Stack>
            <CardActions disableSpacing>
                <Checkbox
                    checked={taskComplete}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                /> Completed?
            </CardActions>
        </Card>
    );
}

export default TaskCard
