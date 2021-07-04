import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import React, { useContext, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import axios from "axios";
import { isButtonStateSubmitAble } from "./Utils";
import { PaymentInterface } from "../../interfaces/interfaces";
import { Month, Rythm } from "../../enums/enums";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
    type: string
}

export default function AddPaymentButton(props: Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentInterface>({
        name: "",
        organization: "",
        amount: 0,
        selectedMonth: (new Date()).getMonth(),
        rythm: Rythm.HALF_YEAR,
    });
    const { payments,updatePayments} = useContext(PaymentsContext);
    const { setAuth } = useContext(AuthContext);

    const handleAdd = async () => {
        try {
            let { data } = await axios.post("/create", {
                ...state,
                type: props.type,
            });
            updatePayments(data);
        }
        catch (e) {
            setAuth(false);
        }
        handleClose();
    }

    const handleOpen = () => {
        setState({
            name: "",
            organization: "",
            amount: 0,
            selectedMonth: (new Date()).getMonth(),
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
            amount: parseFloat(e.target.value)
        });
    }

    const handleChangeName = (e: any) => {
        setState({
            ...state,
            name: e.target.value
        });
    }

    const handleChangeSelectedMonth = (e: any) => {
        setState({
            ...state,
            selectedMonth: e.target.value
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
    let isNameUnique = !payments.containsPaymentWithName(state.name);
    return (
        <React.Fragment>
            <div className="default-payment-button" onClick={handleOpen}>
                <AddIcon />
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add {props.type}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the name of the {props.type} (must be unique).
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label={`Name of ${props.type}`}
                        type="text"
                        error={!isNameUnique}
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
                            Select one month on which the {props.type} occurs. In case of having a rythm different to yearly, it will add the other months respectively.
                        </DialogContentText>
                    </div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.selectedMonth}
                        fullWidth
                        onChange={handleChangeSelectedMonth}
                    >
                        <MenuItem value={Month.JAN}>January</MenuItem>
                        <MenuItem value={Month.FEB}>February</MenuItem>
                        <MenuItem value={Month.MAR}>March</MenuItem>
                        <MenuItem value={Month.APR}>April</MenuItem>
                        <MenuItem value={Month.MAI}>Mai</MenuItem>
                        <MenuItem value={Month.JUN}>June</MenuItem>
                        <MenuItem value={Month.JUL}>July</MenuItem>
                        <MenuItem value={Month.AUG}>August</MenuItem>
                        <MenuItem value={Month.SEP}>September</MenuItem>
                        <MenuItem value={Month.OCT}>October</MenuItem>
                        <MenuItem value={Month.NOV}>November</MenuItem>
                        <MenuItem value={Month.DEC}>December</MenuItem>
                    </Select>

                    <div className={"dialog-margin"}>
                        <DialogContentText>
                            Select the rythm
                        </DialogContentText>
                    </div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.rythm}
                        fullWidth
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
                    <Button onClick={handleAdd} color="primary" disabled={!isButtonStateSubmitAble(state, isNameUnique)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
