import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


function HomePage() {
    const [defaultVotes, setDefaultVotes] = useState(2);
    return (
        <Grid container spacing={1}>
            {/* <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Create A Room
                   </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Create A Room
            </Typography>
            </Grid> */}
        </Grid>

    )
}

export default HomePage
