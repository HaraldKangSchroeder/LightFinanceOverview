import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface Props {
    setIsLoggedIn : (isLoggedIn : boolean) => void,
    setLoggedUsername : (username : string) => void
}

export default function Login({setIsLoggedIn,setLoggedUsername} : Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        let {data} = await axios.post("/login", {
            username : username,
            password : password
        });
        if(data){
            setIsLoggedIn(true);
            return;
        }
        setShowError(true);
    }

    return (
        <div className="login-container">
            <div className="login-inner-container">
                <div className="login-header">LOGIN</div>
                <div className="login-user-input">
                    <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={handleChangeUsername} value={username} />
                </div>
                <div className="login-user-input">
                    <TextField fullWidth id="outlined-basic" type="password" label="Password" variant="outlined" onChange={handleChangePassword} value={password} />
                </div>
                <div className="login-button-container">
                    <Link className="link" to="/Create"><div className="login-button">CREATE USER</div></Link>
                    <div onClick={handleSubmit} className="login-button">LOGIN</div>
                </div>
                <div style={{opacity : showError ? 1 : 0}} className="login-error-text">Wrong username or password</div>
            </div>
        </div>
    )
}