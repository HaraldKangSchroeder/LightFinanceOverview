import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import "./AddPayment.css";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';

interface Props {
    type: string
}

export default function AddPayment(props: Props) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <div className="add-payment-container">
                <div className="default-button" onClick={() => { setOpen(true) }}>
                    <AddIcon />
                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add {props.type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the name of the {props.type}.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            id="name"
                            label={`Name of ${props.type}`}
                            type="text"
                            fullWidth
                        />
                        <div className={"dialog-margin"}>
                            <DialogContentText>
                                Enter the name of the respective organization
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
                                Enter the amount of the {props.type} in euros
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
                                Select one date on which the {props.type} occurs. In case of having a rythm different to yearly, it will add the other dates
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
                                Select the rythm
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
            </div>
        </div>
    )
}