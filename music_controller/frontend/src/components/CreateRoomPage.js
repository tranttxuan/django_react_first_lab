import { FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import React from 'react'

function CreateRoomPage() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Create A Room
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback state
                    </div>
                    </FormHelperText>

                    <RadioGroup row defaultValue="true">
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
                        defaultValue={defaultValue}
                        inputProps={{ min: 1 }} />

                    <FormHelperText>
                        <div align="center">
                            Votes Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage
