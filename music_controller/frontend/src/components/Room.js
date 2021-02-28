import React, { useState } from 'react'

function Room(props) {
    const roomCode = props.match.params.roomCode
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    return (
        <div>
            <p>Host: {votesToSkip}</p>
            <p>Guest can Pause: {guestCanPause == true ? "Yes" :"No"}</p>
            <p>Host: {isHost}</p>
        </div>
    )
}

export default Room
