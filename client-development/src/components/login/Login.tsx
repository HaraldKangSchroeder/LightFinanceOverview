import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        console.log("handle submit");
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
            </div>
        </div>
    )
}