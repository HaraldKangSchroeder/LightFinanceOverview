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

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/Login">
                    <Login />
                </Route>
                <Route exact path="/Create">
                    <CreateUser />
                </Route>
                <Route exact path="/LightFinanceOverview">
                    <LightFinanceOverview />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
