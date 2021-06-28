import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';


export default function DeletePaymentButton() {
    const [open,setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <div className="default-button payment-button" onClick={() => { setOpen(true) }}>
                <DeleteIcon />
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete respective payment entry?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}