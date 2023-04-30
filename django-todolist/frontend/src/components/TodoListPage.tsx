import { useEffect, useState, MouseEvent } from 'react';
import axios from "axios";

import './TodoList.css';
import { TodoItem, CustomModal, Style } from "../components/TodoListModal";
import { Button, ToggleButton, ToggleButtonGroup, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoList() {
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
        if (item.id) {
            axios.put(`/api/todos/${item.id}/`, item)
                 .then((res) => refreshList());
            return;
        }
        if (item.title === "" && item.description === "" && !item.completed) {
            return;
        }
        axios.post("/api/todos/", item)
             .then((res) => refreshList());
    }

    function handleDelete(item: TodoItem) {
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

    function handleChange(
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) {
        if (newAlignment) {
            setAlignment(newAlignment);
        }
    };

    const todoListItems = todoList.filter((item) => item.completed === viewCompleted).map((item) => (
        <ListItem key={item.id} sx={{ backgroundColor:"#F2F2F2", marginBottom:0.5 }}
            secondaryAction={
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
        <Card className="container" sx={{ ...Style, width: 500, p: 0 }} >
            <Typography variant='h5' component='h1' className='Todo-card-header'
                        sx={{fontWeight: 'bold'}} >
                Todo List
            </Typography>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}><Box display="flex" justifyContent="flex-start">
                        <Button size="medium" variant="contained" color="primary"
                                onClick={createItem}>Add task</Button>
                    </Box></Grid>
                    <Grid item xs={6}><Box display="flex" justifyContent="flex-end">
                        <ToggleButtonGroup color="primary" exclusive
                                            value={alignment} onChange={handleChange}>
                            <ToggleButton size="small" value="complete">Complete</ToggleButton>
                            <ToggleButton size="small" value="incomplete">Incomplete</ToggleButton>
                        </ToggleButtonGroup>
                    </Box></Grid>
                    <Grid item xs={12} >
                        <List sx={{ marginTop: 2, padding: 0 }} >{todoListItems}</List>
                    </Grid>
                </Grid>
            </CardContent>
            {!modal ? null : (<CustomModal activeItem={activeItem}
                                   modal={modal}
                                   toggle={toggle}
                                   onSave={handleSubmit} /> )}
        </Card>
    );
}

export default TodoList;