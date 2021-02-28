
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Room(props) {
    const roomCode = props.match.params.roomCode
    // const roomCode = useParams().roomCode;
    console.log(">>> 1")
    console.log(roomCode)
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    // const [room, setRoom] =useState({votesToSkip:2, guestCanPause:false, isHost:false})
    console.log(">>> 2")
    function getRoomDetails() {
        console.log(">>> 33")
        // fetch("/api/get-room" + "?code=" + roomCode)
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // setRoom({
                //     votesToSkip:data.votes_to_skip, guestCanPause:data.guest_can_pause, isHost:data.is_host
                // })
                setVotesToSkip(data.votes_to_skip)
                setGuestCanPause(data.guest_can_pause)
                setIsHost(data.is_host)
            });
    }
    useEffect(() => {
        console.log(">>>4")
        getRoomDetails();
    }, [])
    console.log(">>>3")
    return (
        <div>
            <h2>{roomCode}</h2>
            <p>Host: {votesToSkip}</p>
            <p>Guest can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
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