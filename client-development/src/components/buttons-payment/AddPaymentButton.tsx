import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import React, { useContext, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import axios from "axios";
import {isButtonStateSubmitAble} from "./Utils";
import { PaymentInterface } from "../../interfaces/global";

interface Props {
    type: string
}

export default function AddPaymentButton(props : Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentInterface>({
        name: "",
        organization: "",
        amount: 0,
        selectedDate: new Date(),
        rythm: "half-year",
    });
    const {updatePayments} = useContext(PaymentsContext);

    const handleAdd = async () => {
        try{
            let paymentsUnformatted = await axios.post("/add", state);
            updatePayments(paymentsUnformatted);
        }
        catch(e){
            console.log(e);
        }
        handleClose();
    }

    const handleOpen = () => {
        setState({
            name: "",
            organization: "",
            amount: 0,
            selectedDate: new Date(),
            rythm: "half-year",
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeAmount = (e : any) => {
        setState({
            ...state,
            amount : parseInt(e.target.value)
        });
    }

    const handleChangeName = (e : any) => {
        setState({
            ...state,
            name : e.target.value
        });
    }

    const handleChangeSelectedDate = (e : any) => {
        setState({
            ...state,
            selectedDate : e
        });
    }

    const handleChangeOrganization = (e : any) => {
        setState({
            ...state,
            organization : e.target.value
        });
    }

    const handleChangeRythm = (e : any) => {
        setState({
            ...state,
            rythm : e.target.value
        });
    }
    
    return (
        <React.Fragment>
            <div className="default-payment-button" onClick={handleOpen}>
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
                        onChange={handleChangeName}
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
                        onChange={handleChangeOrganization}
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
                        type="number"
                        onChange={handleChangeAmount}
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
                            value={state.selectedDate}
                            onChange={handleChangeSelectedDate}
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
                        value={state.rythm}
                        style={{ width: "100%" }}                        
                        onChange={handleChangeRythm}
                    >
                        <MenuItem value={"one-month"}>one-month</MenuItem>
                        <MenuItem value={"two-month"}>two-month</MenuItem>
                        <MenuItem value={"three-month"}>three-month</MenuItem>
                        <MenuItem value={"four-month"}>four-month</MenuItem>
                        <MenuItem value={"half-year"}>half-year</MenuItem>
                        <MenuItem value={"year"}>year</MenuItem>
                    </Select>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary" disabled={!isButtonStateSubmitAble(state)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}