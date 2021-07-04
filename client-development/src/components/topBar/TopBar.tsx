import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import "./TopBar.css"


export default function TopBar() {

    const {setAuth, username} = useContext(AuthContext);

    return (
        <div className="topbar-container">
            <ExitToAppOutlinedIcon color="action" className="topbar-logout-button" onClick={(e : any) => {setAuth(false)}}/>
            <div className="topbar-username">{username}</div>
        </div>
    )
}