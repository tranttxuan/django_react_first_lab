import React from 'react'
import { Route, Switch } from 'react-router-dom';
// import { render } from "react-dom";
import CreateRoomPage from './CreateRoomPage';
import HomePage from './HomePage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';


function App() {
    return (
        <div style={{ width: "100%" }}>

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/join" component={RoomJoinPage} />
                <Route exact path="/create" component={CreateRoomPage} />
                <Route exact path="/room/:roomCode" component={Room} />
            </Switch>

        </div>
    )
}

export default App

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);