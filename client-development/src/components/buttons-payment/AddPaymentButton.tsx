import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import React, { useContext, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import axios from "axios";
import { getDateByPayDate, isButtonStateSubmitAble } from "./Utils";
import { PaymentInterface } from "../../interfaces/global";
import { Rythm } from "../../enums/enums";

interface Props {
    type: string
}

export default function AddPaymentButton(props: Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentInterface>({
        name: "",
        organization: "",
        amount: 0,
        selectedDate: {date : (new Date()).getDate(), month : (new Date()).getMonth()},
        rythm: Rythm.HALF_YEAR,
    });
    const { updatePayments } = useContext(PaymentsContext);

    const handleAdd = async () => {
        try {
            let {data} = await axios.post("/create", {
                ...state,
                type: props.type,
            });
            // console.log(paymentsUnformatted);
            updatePayments(data);
        }
        catch (e) {
            console.log(e);
        }
        handleClose();
    }

    const handleOpen = () => {
        setState({
            name: "",
            organization: "",
            amount: 0,
            selectedDate: {date : (new Date()).getDate(), month : (new Date()).getMonth()},
            rythm: Rythm.HALF_YEAR,
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChangeAmount = (e: any) => {
        setState({
            ...state,
            amount: parseInt(e.target.value)
        });
    }

    const handleChangeName = (e: any) => {
        setState({
            ...state,
            name: e.target.value
        });
    }

    const handleChangeSelectedDate = (e: Date) => {
        if(e == null || (isNaN(e.getDay()) || isNaN(e.getMonth()) || isNaN(e.getFullYear()))){
            setState({
                ...state,
                selectedDate: null
            });
            return;
        }
        setState({
            ...state,
            selectedDate: {date : e.getDate(), month : e.getMonth()}
        });
    }

    const handleChangeOrganization = (e: any) => {
        setState({
            ...state,
            organization: e.target.value
        });
    }

    const handleChangeRythm = (e: any) => {
        setState({
            ...state,
            rythm: e.target.value
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
                            Select one date of the current year on which the {props.type} occurs. In case of having a rythm different to yearly, it will add the other dates
                            within the year respectively.
                        </DialogContentText>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="dd/MM/yyyy"
                            value={getDateByPayDate(state.selectedDate)}
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
                        <MenuItem value={Rythm.ONE_MONTH}>one-month</MenuItem>
                        <MenuItem value={Rythm.TWO_MONTH}>two-month</MenuItem>
                        <MenuItem value={Rythm.THREE_MONTH}>three-month</MenuItem>
                        <MenuItem value={Rythm.FOUR_MONTH}>four-month</MenuItem>
                        <MenuItem value={Rythm.HALF_YEAR}>half-year</MenuItem>
                        <MenuItem value={Rythm.YEAR}>year</MenuItem>
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
