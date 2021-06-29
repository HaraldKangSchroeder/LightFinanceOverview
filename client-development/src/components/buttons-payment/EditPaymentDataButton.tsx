import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { useContext, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Payment from "../../classes/Payment";
import axios from "axios";
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import {isButtonStateSubmitAble} from "./Utils";
import { PaymentInterface } from "../../interfaces/global";

interface Props {
    payment: Payment
}

export default function EditPaymentDataButton({ payment }: Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentInterface>({
        name: payment.getName(),
        organization: payment.getOrganization(),
        amount: payment.getAmount(),
        selectedDate: payment.getSelectedDate(),
        rythm: payment.getRythm(),
    });
    const [originalName, setOriginalName] = useState(payment.getName());
    const {updatePayments} = useContext(PaymentsContext);

    const handleOpen = () => {
        setState({
            name: payment.getName(),
            organization: payment.getOrganization(),
            amount: payment.getAmount(),
            selectedDate: payment.getSelectedDate(),
            rythm: payment.getRythm(),
        });
        setOriginalName(payment.getName());
        setOpen(true);
    }

    const handleEdit = async () => {
        try{
            let paymentsUnformatted = await axios.post("/edit", {originalName: originalName, editedPayment:state});
            updatePayments(paymentsUnformatted);
        }
        catch(e){
            console.log(e);
        }
        handleClose();
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

    const handleChangeSelectedDate = (e : any) => {
        setState({
            ...state,
            selectedDate : e
        });
    }

    return (
        <div>
            <div className="default-payment-button specific-payment-button" onClick={handleOpen}>
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
                        value={state.name}
                        fullWidth
                        onChange={handleChangeName}
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
                        value={state.organization}
                        onChange={handleChangeOrganization}
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
                        type="number"
                        value={state.amount}
                        fullWidth
                        onChange={handleChangeAmount}
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
                            value={state.selectedDate}
                            onChange={handleChangeSelectedDate}
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
                    <Button onClick={handleEdit} color="primary" disabled={!isButtonStateSubmitAble(state)}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
