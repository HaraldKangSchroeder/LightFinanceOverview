import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import DeleteUserButton from './DeleteUserButton';
import "./TopBar.css"


export default function TopBar() {

    const { setAuth, username } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.get("/logout");
            setAuth(false);
        }
        catch (e) {
            setAuth(false);
        }
    }

    return (
        <div className="topbar-container">
            <ExitToAppOutlinedIcon color="action" className="topbar-logout-button" onClick={handleLogout} />
            <DeleteUserButton />
            <div className="topbar-username">User : {username}</div>
        </div>
    )
}