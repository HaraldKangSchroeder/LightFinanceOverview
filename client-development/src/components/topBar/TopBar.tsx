import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
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
            <div className="topbar-username">{username}</div>
        </div>
    )
}