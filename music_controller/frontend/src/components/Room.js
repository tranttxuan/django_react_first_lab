
import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from "@material-ui/core"
import { Redirect } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';

function Room(props) {
    const roomCode = props.match.params.roomCode
    // const roomCode = useParams().roomCode;

    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    // const [room, setRoom] =useState({votesToSkip:2, guestCanPause:false, isHost:false})
    const [showUpdate, setShowUpdate] = useState(false);
    const [spotifyAuthenticate, setSpotifyAuthenticate] = useState('')


    function authenticateSpotify() {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then(data => {
                setSpotifyAuthenticate(data.status)
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then(data => {window.location.replace(data.url) })
                }

            })
    }


    function getRoomDetails() {
        // fetch("/api/get-room" + "?code=" + roomCode)
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => {
                if (!response.ok) {
                    props.leaveRoomCallBack();
                    props.history.push("/")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                // setRoom({
                //     votesToSkip:data.votes_to_skip, guestCanPause:data.guest_can_pause, isHost:data.is_host
                // })
                setVotesToSkip(data.votes_to_skip)
                setGuestCanPause(data.guest_can_pause)
                setIsHost(data.is_host)
                if (data.is_host) authenticateSpotify();
            });
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }
        fetch('/api/leave-room', requestOptions)
            .then((response) => {
                props.leaveRoomCallBack();
                props.history.push("/")
            })
    }

    const handleUpdateRoom = () => {
        setShowUpdate(true)
    }


    useEffect(() => {
        console.log(">>>4")
        getRoomDetails();
    }, [])


    return (
        showUpdate
            ?
            <div>
                <CreateRoomPage
                    votesToSkip={votesToSkip}
                    guestCanPause={guestCanPause}
                    roomCode={roomCode}
                    uploadCallBack={getRoomDetails}
                    update={true}
                />

            </div>
            : roomCode
                ? <Grid container spacing={1}>

                    <Grid item xs={12} align='center'>
                        <Typography variant="h4" components="h4">
                            Code:   {roomCode}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h6" components="h6">
                            Votes: {votesToSkip}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h6" components="h6">
                            Guest can Pause: {guestCanPause.toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h6" components="h6">
                            Host: {isHost.toString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} align='center'>

                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleUpdateRoom}
                        >Setting</Button>

                    </Grid>

                    <Grid item xs={12} align='center'>

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={leaveButtonPressed}
                        >Leave Room</Button>

                    </Grid>
                </Grid>
                : <Redirect to="/" />

    )
}

export default Room


// import React, { Component } from "react";

// export default class Room extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       votesToSkip: 2,
//       guestCanPause: false,
//       isHost: false,
//     };
//     this.roomCode = this.props.match.params.roomCode;
//     this.getRoomDetails();
//   }
// // componentDidMount(){
// //     this.getRoomDetails();
// // }
//   getRoomDetails() {
//     fetch("/api/get-room" + "?code=" + this.roomCode)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           votesToSkip: data.votes_to_skip,
//           guestCanPause: data.guest_can_pause,
//           isHost: data.is_host,
//         });
//       });
//   }

//   render() {
//     return (
//       <div>
//         <h3>{this.roomCode}</h3>
//         <p>Votes: {this.state.votesToSkip}</p>
//         <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
//         <p>Host: {this.state.isHost.toString()}</p>
//       </div>
//     );
//   }
// }