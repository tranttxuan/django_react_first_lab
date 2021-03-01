import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
// import { render } from "react-dom";
import CreateRoomPage from './CreateRoomPage';
import HomePage from './HomePage';
import Info from './Info';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';


function App() {
    const [roomCode, setRoomCode] = useState(null);
    const leaveRoom = () => {
        setRoomCode(null)
    };

    useEffect(() => {
        fetch('/api/user-in-room')
            .then(res => res.json())
            .then(data => setRoomCode(data.code))
    }, [])

    return (
        <div className="center">

            <Switch>
                <Route exact path="/"
                    render={() => {
                        return roomCode
                            ? <Redirect to={`/room/${roomCode}`} />
                            : <HomePage />
                    }}
                />
                <Route exact path="/join" component={RoomJoinPage} />
                <Route exact path="/create" component={CreateRoomPage} />
                <Route exact path="/room/:roomCode"
                    render={props => {
                        return <Room {...props} leaveRoomCallBack={leaveRoom} />
                    }}
                />
                <Route exact path="/info" component={Info} />
            </Switch>

        </div>
    )
}

export default App

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);