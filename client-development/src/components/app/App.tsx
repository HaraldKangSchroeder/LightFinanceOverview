import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./App.css";
import LightFinanceOverview from "../lightFinanceOverview/LightFinanceOverview";
import Login from "../login/Login";
import CreateUser from "../create-user/CreateUser";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    if (!isLoggedIn) {
        return (
            <Router>
                <Switch>
                    <Route exact path="/Create">
                        <CreateUser setIsLoggedIn={setIsLoggedIn} setLoggedUsername={setUsername} />
                    </Route>
                    <Login setIsLoggedIn={setIsLoggedIn} setLoggedUsername={setUsername} />
                </Switch>
            </Router>
        )
    }
    return (
        <Router>
            <Switch>
                <Route>
                    <LightFinanceOverview setIsLoggedIn={setIsLoggedIn} setLoggedUsername={setUsername} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
