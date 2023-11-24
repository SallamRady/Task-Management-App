import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function MainNavbar(Props) {
    // define nav items
    const navItems = [
        { icon: <NotificationsRoundedIcon />, alt: "Notifications" },
        { icon: <MarkunreadRoundedIcon />, alt: "messages" },
        { icon: <LogoutRoundedIcon />, alt: "Logout" },
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
                        <Button key={item.alt} title={item.alt} sx={{ color: '#fff' }}>
                            {item.icon}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}