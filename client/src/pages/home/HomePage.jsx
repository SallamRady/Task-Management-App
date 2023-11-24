import React, { useEffect, useState } from "react";
import MainNavbar from "../../components/mainNav/mainNavbar";
import { Container } from "@mui/material";
import TasksList from "../../components/TasksList/TasksList";
import AddTask from "../../components/AddTask/AddTask";
import { connect } from "react-redux";
import { getData, hasKey } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../loading/LoadingPage";
import CategoriesBar from "../../components/filters/CategoriesBar";

const HomePage = ({ userName, logout, login, resetUser }) => {
    // declarations...
    let navigator = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        setLoading(true);
        async function fetchItems() {
            let _token = getData('token');
            await fetch("http://localhost:8080/tasks/all", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${_token}`,
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
                console.log("Tasks Data:", data);
                return data?.tasks;
            }).then(tasks => {
                setAllTasks(tasks);
                tasks = tasks?.filter(ele => {
                    if (activeCategory === 'All') return true;
                    return ele?.categories.indexOf(activeCategory) !== -1;
                });
                setTasks(tasks);
                setLoading(false);
            }).catch(err => {
                console.log("Error in fetch items:", err);
                setLoading(false);
            });
        };
        if (hasKey("token") && !userName) {
            resetUser();
        } else if (!hasKey("token")) {
            navigator("/");
        }
        fetchItems();
    }, []);
    useEffect(() => {
        let _tasks = allTasks?.filter(ele => {
            if (activeCategory === 'All') return true;
            return ele?.categories.indexOf(activeCategory) !== -1;
        });
        setTasks(_tasks);
    }, [activeCategory]);

    return (
        <>
            <MainNavbar logout={logout} login={login} />
            <CategoriesBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <Container id="TasksContainer"
                style={{ display: "flex", flexWrap: "wrap", marginTop: "5rem" }}
            >
                {loading && <LoadingPage />}
                {!loading && <>
                    <TasksList setTasks={setTasks} tasks={tasks || []} />
                    <AddTask tasks={tasks} setTasks={setTasks} /></>}

            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log("State ", state);
    return {
        token: state.auth.token,
        userId: state.auth.id,
        userName: state.auth.userName,
        email: state.auth.email,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () =>
            dispatch({
                type: "LOGIN",
                data: {
                    userName: "Sallam",
                    email: "s@s.com",
                    token: "token",
                    id: "i101d",
                },
            }),
        logout: () => dispatch({ type: "LOGOUT" }),
        resetUser: () => dispatch({ type: "RESETUSER" }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

// export default HomePage
