import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../components/Copyright/Copyright';
import { connect } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const LoginPage = ({ login }) => {
    // declaration variables.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    // methods.
    const handleSubmit = async (event) => {
        event.preventDefault();
        let _token;
        await fetch('http://localhost:8080/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            _token = data?.token;
            const decoded = jwtDecode(_token);
            login({ ...decoded, token: _token });
        }).then(res => {
            navigator('/home');
        }).catch(err => {
            console.log("Error in login page : ", err)
        });
    };

    // return component view.
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signUp" style={{ color: '#1976d2' }} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.id,
        userName: state.auth.userName,
        email: state.auth.email,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (incommingData) => dispatch({ type: 'LOGIN', data: incommingData }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);