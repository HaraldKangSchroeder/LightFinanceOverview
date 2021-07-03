import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./CreateUser.css";
import { Link } from "react-router-dom";

export default function CreateUser() {
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
        <div className="create-user-container">
            <div className="create-user-inner-container">
                <div className="create-user-header">CREATE USER</div>
                <div className="create-user-user-input">
                    <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={handleChangeUsername} value={username} />
                </div>
                <div className="create-user-user-input">
                    <TextField fullWidth id="outlined-basic" type="password" label="Password" variant="outlined" onChange={handleChangePassword} value={password} />
                </div>
                <div className="create-user-button-container">
                    <Link className="link" to="/Login"><div className="create-user-button">CANCEL</div></Link>
                    <div onClick={handleSubmit} className="create-user-button">CREATE</div>
                </div>
            </div>
        </div>
    )
}