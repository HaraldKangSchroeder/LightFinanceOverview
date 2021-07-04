import { TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import "./CreateUser.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";


export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const Auth = useContext(AuthContext);

    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        if(!isSubmitAble(username,password)) return;
        try {
            await axios.post("/createUser", {
                username : username,
                password : password,
            });
            Auth.setUsername(username);
            Auth.setAuth(true);
            return;
        }
        catch (e) {
            setShowError(true);
        }
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
                    <div onClick={handleSubmit} className={isSubmitAble(username,password) ? "create-user-button" : "create-user-button-disabled"}>CREATE</div>
                </div>
                <div style={{opacity : showError ? 1 : 0}} className="create-user-error-text">Username already exists</div>
            </div>
        </div>
    )
}

function isSubmitAble(username : string, password : string) : boolean{
    return username.length > 0 && password.length > 0;
}