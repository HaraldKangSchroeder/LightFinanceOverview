import DateFnsUtils from "@date-io/date-fns"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, DialogActions, Button } from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import { useContext, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Payment from "../../classes/Payment";
import axios from "axios";
import "./ButtonsPayment.css"
import { PaymentsContext } from "../../contexts/PaymentsContext";
import { isButtonStateSubmitAble } from "./Utils";
import { PaymentInterface } from "../../interfaces/interfaces";
import { Month, Rythm } from "../../enums/enums";

interface Props {
    payment: Payment
}

export default function EditPaymentDataButton({ payment }: Props) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentInterface>({
        name: payment.getName(),
        organization: payment.getOrganization(),
        amount: payment.getAmount(),
        selectedMonth: payment.getSelectedMonth(),
        rythm: payment.getRythm(),
    });
    const [originalName, setOriginalName] = useState(payment.getName());
    const { payments, updatePayments } = useContext(PaymentsContext);

    const handleOpen = () => {
        setState({
            name: payment.getName(),
            organization: payment.getOrganization(),
            amount: payment.getAmount(),
            selectedMonth: payment.getSelectedMonth(),
            rythm: payment.getRythm(),
        });
        setOriginalName(payment.getName());
        setOpen(true);
    }

    const handleEdit = async () => {
        try {
            let { data } = await axios.post("/update", { originalName: originalName, editedPayment: { ...state, type: payment.getType() } });
            updatePayments(data);
        }
        catch (e) {
            console.log(e);
        }
        handleClose();
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

    const handleChangeSelectedMonth = (e: any) => {
        setState({
            ...state,
            selectedMonth: e.target.value
        });
    }

    let isNameUnique = !(state.name !== originalName && payments.containsPaymentWithName(state.name));
    return (
        <div>
            <div className="default-payment-button specific-payment-button" onClick={handleOpen}>
                <EditIcon />
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the name (must stay unique).
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label={`Name`}
                        type="text"
                        value={state.name}
                        fullWidth
                        error={!isNameUnique}
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
                            Change the month. In case of having a rythm different to yearly, it will add the other months respectively.
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
                            Select new the rythm
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
                    <Button onClick={handleEdit} color="primary" disabled={!isButtonStateSubmitAble(state, isNameUnique)}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
