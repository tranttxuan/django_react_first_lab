import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function RoomJoinPage(props) {
    const [error, setError] = useState('');
    const [value, setValue] = useState('');

    const handleJoinRoom = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: value
            })
        }
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    props.history.push(`room/${value}`)
                } else {
                    setError("Room not found.")
                }
            })
            .catch((err) => {setError(err)
        })
    }


    return (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Join A Room
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    error={error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={value}
                    helperText={error}
                    variant="outlined"
                    onChange={e => setValue(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinRoom}
                >
                    Enter Room
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="secondary"
                    to="/"
                    component={Link}
                >Back</Button>
            </Grid>
        </Grid>

    )
}

export default RoomJoinPage
