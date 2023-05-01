import { useState } from 'react';
import { Alert, Button, Card, Snackbar } from '@mui/material';
import './Sample.css';

const Style = {
    width: 0.25,
    borderRadius: 2,
    boxShadow: 8,
    p: 2,
};

const user = {
    name: 'Taylor Swift',
    imageUrl: 'https://pyxis.nymag.com/v1/imgs/ba2/f85/099d4651e7c4a62bcba5da1fbc5c16be70-18-taylor-swift.rsquare.w330.jpg',
    imageSize: 120,
};

function Profile(){
    return (
        <div style={{ margin: 0, textAlign: "center" }}>
            <img className="avatar" src={ user.imageUrl }
                 alt={ 'Photo of ' + user.name }
                 style={{ width: user.imageSize, height: user.imageSize }} />
            <h3 style={{ margin: 0, textAlign: "center" }}>{ user.name }</h3>
        </div>
      );
}

function MyButton({ text } : { text: string }) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        setOpen(true);
    }

    function handleClose() {    
        setOpen(false);
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <Button variant="contained" 
                    onClick={handleClick} >
                {text}
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    You clicked <b>{text}</b> {count} times!
                </Alert>
            </Snackbar>
        </div>
    );
}

function Sample() {
    const [testToggle, setTestToggle] = useState(false);

    return (
        <>
            <p> This page contains implementation samples of react concepts </p>
            { !testToggle && <MyButton text="HELLO" /> }
            { testToggle ? ( <MyButton text="TOGGLE ON" /> ) : ( <MyButton text="TOGGLE OFF" /> ) }
            <Card sx={ Style }>
                <Profile />
            </Card>
        </>
    );
}

export default Sample;