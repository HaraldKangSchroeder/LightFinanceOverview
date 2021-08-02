import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function DeleteUserButton() {
    const [open, setOpen] = useState(false);
    const {username, setAuth} = useContext(AuthContext);

    const handleDeleteUser = async () => {
        try {
            let res = await axios.get("/deleteUser");
            if (res.status === 200) setAuth(false);
        }
        catch (e) {
            setAuth(false);
        }
    }

    return (
        <React.Fragment>
            <DeleteOutlined color="action" className="topbar-delete-user-button" onClick={() => {setOpen(true)}} />
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`You sure you want to delete ${username}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="primary" autoFocus>
                        Delete User
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}