import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useState, useEffect } from 'react';
import { getData } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

export default function MainNavbar({ logout }) {
    const [userName, setUserName] = useState('');
    let navigator = useNavigate();
    useEffect(() => {
        let _userName = getData('userName');
        console.log("_userName", _userName);
        setUserName(_userName)
    }, []);
    
    const handleLogout = () => {
        logout();
        navigator("/")
    }
    // define nav items
    const navItems = [
        { icon: userName, alt: userName, action: console.log("logged") },
        { icon: <NotificationsRoundedIcon />, alt: "Notifications", action: console.log("is-auth") },
        { icon: <LogoutRoundedIcon />, alt: "Logout", action: handleLogout },
    ];

    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: 'left', display: { sm: 'block' } }}
                >
                    Task<span style={{ color: 'blueviolet', fontWeight: 'bolder' }}>GO</span>
                </Typography>
                <Box sx={{ display: { sm: 'block' } }}>
                    {navItems.map((item) => (
                        <Button key={item.alt} title={item.alt} sx={{ color: '#fff' }} onClick={item.action}>
                            {item.icon}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}