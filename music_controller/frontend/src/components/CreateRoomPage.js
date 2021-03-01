import { Button, Collapse, FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

function CreateRoomPage(props) {
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip || 1);
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause || false);
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleGuestCanPauseChange = (event) => {
        setGuestCanPause(event.target.value == 'true' ? true : false)
    }

    const handleVotesChange = (event) => {
        setVotesToSkip(event.target.value)
    }
    const handleRoomButtonPress = (event) => {
        // console.log("object")
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         votes_to_skip: votesToSkip,
        //         guest_can_pause: guestCanPause,
        //     })
        // }

        // console.log(requestOptions)
        if (props.update === true) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    votes_to_skip: votesToSkip,
                    guest_can_pause: guestCanPause,
                    code: props.roomCode
                })
            }
            console.log("update roome")
            fetch('/api/update-room', requestOptions)
                .then((response) => {
                    if (response.ok) setSuccessMsg("Room updated successfully")
                    else setErrorMsg("Error updating room ")
                    // response.json()
                    props.uploadCallBack();
                })

        } else {
            console.log("go here >>>>>>>>>")
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_can_pause: guestCanPause,
                    votes_to_skip: votesToSkip
                }),
            };
            console.log(guestCanPause, requestOptions)
            fetch("/api/create-room", requestOptions)
                .then((response) => response.json())
                .then((data) => props.history.push("/room/" + data.code));
        }

    }

    return (
        <Grid container spacing={1} style={{ width: '100%' }}>
            <Grid item xs={12} align='center'>
                <Collapse in={errorMsg !== '' || successMsg !== ''}>
                    {successMsg
                        ? <Alert
                            severity='success'
                            onClose={() => setSuccessMsg('')}
                        >{successMsg}</Alert>
                        : <Alert
                            severity='error'
                            onClose={() => setErrorMsg('')}
                        >{errorMsg}</Alert>
                    }
                </Collapse>
            </Grid>



            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    {props.update ? `Update Room ${props.roomCode}` : "Create A Room"}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback state
                    </div>
                    </FormHelperText>

                    <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label='Play/Pause'
                            labelPlacement="bottom" />

                        <FormControlLabel
                            value="false"
                            control={<Radio color='secondary' />}
                            label="No Control"
                            labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type='number'
                        defaultValue={votesToSkip}
                        onChange={handleVotesChange}
                        inputProps={{
                            min: 1,
                            style: { textAlign: 'center' }
                        }} />

                    <FormHelperText>
                        <div align="center">
                            Votes Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleRoomButtonPress}
                >
                    {props.update ? `Update Room` : "  Create a Room"}

                </Button>
            </Grid>


            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    to="/"
                    component={Link}
                >Back
                </Button>
            </Grid>


        </Grid>
    )
}

export default CreateRoomPage
