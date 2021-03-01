import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';


function HomePage(props) {  
    return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant='h3' compact='h3'>
                        House Party
              </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <ButtonGroup
                        disableElevation
                        variant="contained"

                    >
                        <Button to="/join" component={Link} color='primary'> Join a Room   </Button>
                        <Button to="/create" component={Link} color='secondary'> Create a Room   </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

    )
}

export default HomePage
