import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import "./App.css";
import LightFinanceOverview from "../lightFinanceOverview/LightFinanceOverview";
import Login from "../login/Login";
import CreateUser from "../create-user/CreateUser";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

function App() {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        authorize(setAuth, setLoaded, setUsername);
    }, [])

    // this only prevents the short preview of the login screen in case of beeing authorized already
    if(!loaded) return <div></div>

    console.log("Auth at top : " + auth);
    return (
        <AuthProvider auth={auth} setAuth={setAuth} username={username}>
            <Router>
                <Switch>
                    <ProtectedRoute
                        bool={!auth}
                        redirectPath="/LightFinanceOverview"
                        path="/Create"
                        Component={<CreateUser />}
                    />
                    <ProtectedRoute
                        bool={auth}
                        redirectPath="/"
                        path="/LightFinanceOverview"
                        Component={<LightFinanceOverview />}
                    />
                    <ProtectedRoute
                        bool={!auth}
                        redirectPath="/LightFinanceOverview"
                        path="/"
                        Component={<Login />}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    )
}

const ProtectedRoute = ({ Component, bool, redirectPath, path }: any) => {
    return (
        <Route exact path={path}>
            {bool ? Component : <Redirect to={redirectPath}/>}
        </Route>
    )
}

async function authorize(setAuth : (auth : boolean) => void, setLoaded : (loaded : boolean) => void, setUsername : (username : string) => void){
    try {
        // if no cookie exists, it will throw an error here
        let res = await axios.get("/auth");
        setUsername(res.data.username);
        setAuth(true);
        setLoaded(true);
    }
    catch (e) {
        setLoaded(true);
    }
}


export default App;
