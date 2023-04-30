import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoItem, CustomModal, Style } from "./components/Modal";
import axios from "axios";

import { Button, ToggleButton, ToggleButtonGroup, Card, CardContent, Typography, Grid } from '@mui/material';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [alignment, setAlignment] = useState('complete');
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState<TodoItem>({
        title: "", description: "", completed: false,
    });
    const viewCompleted = alignment === 'complete';

    useEffect(() => {
        refreshList();
    }, []);

    function refreshList() {
        axios.get("/api/todos/")
             .then((res) => setTodoList(res.data))
             .catch((err) => console.log(err));
    }

    function toggle() {
        setModal(!modal);
    }

    function handleSubmit(item: TodoItem) {
        toggle();
        //alert("save" + JSON.stringify(item));
        if (item.id) {
            axios.put(`/api/todos/${item.id}/`, item)
                 .then((res) => refreshList());
            return;
        }
        axios.post("/api/todos/", item)
             .then((res) => refreshList());
    }

    function handleDelete(item: TodoItem) {
        //alert("delete" + JSON.stringify(item));
        axios.delete(`/api/todos/${item.id}/`)
             .then((res) => refreshList());
    }

    function createItem() {
        const item = { title: "", description: "", completed: false };
        setActiveItem(item);
        setModal(!modal);
    }

    function editItem(item: TodoItem) {
       setActiveItem(item);
       setModal(!modal);
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const todoListItems = todoList.filter((item) => item.completed === viewCompleted).map((item) => (
        <ListItem key={item.id} secondaryAction={
            <div>
                <IconButton aria-label="edit" onClick={() => editItem(item)}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(item)}>
                    <DeleteIcon/>
                </IconButton> 
            </div> }>
            <ListItemText primary={item.title}
                          secondary={item.description} />
        </ListItem>
    ));

    return (
        <div className="App" >
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Card className="container" sx={{ ...Style, width: 800 }} >
                <CardContent className="row">
                    <Typography gutterBottom variant='h4' component='h1' sx={{fontWeight: 'bold'}}>
                        Todo List
                    </Typography>
                    <Grid container>
                        <Grid item xs={2}>
                            <Button size="small" variant="contained" color="secondary"
                                    onClick={createItem}>Add task</Button>
                        </Grid>
                        <Grid item xs={7} />
                        <Grid item xs={2}>
                            <ToggleButtonGroup color="primary" exclusive
                                            value={alignment} onChange={handleChange}>
                                <ToggleButton size="small" value="complete">Complete</ToggleButton>
                                <ToggleButton size="small" value="incomplete">Incomplete</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <List>{todoListItems}</List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {modal ? (
                <CustomModal activeItem={activeItem}
                       modal={modal}
                       toggle={toggle}
                       onSave={handleSubmit} />
            ) : null}
        </div>
    );
}

export default App;