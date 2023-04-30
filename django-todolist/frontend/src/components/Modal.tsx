import React, { useState } from "react";
import { Button, Modal, TextField, Card, Typography, Checkbox } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';

export interface TodoItem {
    id?: number,
    title: string,
    description: string,
    completed: boolean,
}

export const Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export function CustomModal({activeItem, modal, toggle, onSave} : {
    activeItem: TodoItem;
    modal: boolean;
    toggle: () => void;
    onSave: (item: TodoItem) => void;
}) {
    const [modalItem, setModalItem] = useState(activeItem);

    function handleChange(e: any) {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem2 = { ...modalItem, [name]: value };
        setModalItem(activeItem2);
    };

    return (
        <Modal open={modal} onClose={toggle}>
            <Card sx={Style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Todo Item
                </Typography>
                <FormGroup id="modal-modal-description" sx={{ mt: 2 }}> 
                    <TextField id="todo-title" label="Title" 
                            variant="outlined" sx={{ marginY: 1}}
                            name="title"
                            value={modalItem.title}
                            onChange={handleChange} />
                    <TextField id="todo-description" label="Description" 
                            variant="outlined" sx={{ marginY: 1}}
                            name="description"
                            value={modalItem.description}
                            onChange={handleChange} />
                    <FormControlLabel control={<Checkbox name="completed"
                                                    checked={modalItem.completed} 
                                                    onChange={handleChange} />} 
                                        label="Completed" 
                                        sx={{ marginY: 1}} />
                </FormGroup>
                <Button color="success" variant="contained"
                    onClick={() => onSave(modalItem)} >
                    Save
                </Button>
            </Card>
        </Modal>
    );
}

export default CustomModal;