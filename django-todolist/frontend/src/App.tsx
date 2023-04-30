import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from "./components/Modal";
import axios from "axios";

import { Button, ToggleButton, ToggleButtonGroup, Card, CardContent, Typography, Grid } from '@mui/material';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface todoItem {
    id?: number,
    title: string,
    description: string,
    completed: boolean,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

function App() {
    const [todoList, setTodoList] = useState<todoItem[]>([]);
    const [alignment, setAlignment] = useState('complete');
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState<todoItem>({
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

    function handleSubmit(item: todoItem) {
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

    function handleDelete(item: todoItem) {
        //alert("delete" + JSON.stringify(item));
        axios.delete(`/api/todos/${item.id}/`)
             .then((res) => refreshList());
    }

    function createItem() {
        const item = { title: "", description: "", completed: false };
        setActiveItem(item);
        setModal(!modal);
    }

    function editItem(item: todoItem) {
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
            <Card className="container" sx={{ ...style, width: 800 }} >
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
                <Modal activeItem={activeItem}
                       modal={modal}
                       toggle={toggle}
                       onSave={handleSubmit} />
            ) : null}
        </div>
    );
}

export default App;