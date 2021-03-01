import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create'
}


function Info(props) {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return 'Join page'
    }

    function createInfo() {
        return 'Create page'
    }
    useEffect(() => {

    }, [])
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography variant="h4" component="h4">
                    What is House Party?
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography variant="body1">
                    {page === pages.JOIN ? joinInfo() : createInfo()}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <IconButton
                onClick={()=>{page === pages.CREATE ?  setPage(pages.JOIN) : setPage(pages.CREATE) }}
                >
{page === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon /> }
                </IconButton>   
            </Grid>

            <Grid item xs={12} align='center'>
                <Button color='secondary' variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default Info
