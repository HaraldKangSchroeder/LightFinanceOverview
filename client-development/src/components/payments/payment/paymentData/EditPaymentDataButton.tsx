import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';


export default function EditPaymentDataButton() {
    const [open,setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <div className="default-button payment-button" onClick={() => { setOpen(true) }}>
                <EditIcon />
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label={`Name`}
                        type="text"
                        fullWidth
                    />
                    <div className={"dialog-margin"}>
                        <DialogContentText>
                            Change organization name
                        </DialogContentText>
                    </div>
                    <TextField
                        autoFocus
                        id="name"
                        label="Organization name"
                        type="text"
                        fullWidth
                    />
                    <div className={"dialog-margin"}>
                        <DialogContentText>
                            Change amount in euros
                        </DialogContentText>
                    </div>
                    <TextField
                        autoFocus
                        id="name"
                        label="Amount in Euros"
                        type="text"
                        fullWidth
                    />
                    <div className={"dialog-margin"}>
                        <DialogContentText>
                            Select new date. In case of having a rythm different to yearly, it will add the other dates
                            within the year respectively.
                        </DialogContentText>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{ width: "100%" }}
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={new Date()}
                            onChange={() => { }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <div className={"dialog-margin"}>
                        <DialogContentText>
                            Select new the rythm
                        </DialogContentText>
                    </div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        style={{ width: "100%" }}
                        onChange={() => { }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}