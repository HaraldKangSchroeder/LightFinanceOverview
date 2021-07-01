import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { useContext, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Payment from "../../classes/Payment";
import axios from "axios";
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import {getDateByPayDate, isButtonStateSubmitAble} from "./Utils";
import { PaymentInterface } from "../../interfaces/global";
import { Rythm } from "../../enums/enums";

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
            let {data} = await axios.post("/update", {originalName: originalName, editedPayment:{...state, type: payment.getType()}});
            updatePayments(data);
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
                            Select new date of the current year. In case of having a rythm different to yearly, it will add the other dates
                            within the year respectively.
                        </DialogContentText>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{ width: "100%" }}
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
                    <Button onClick={handleEdit} color="primary" disabled={!isButtonStateSubmitAble(state)}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
