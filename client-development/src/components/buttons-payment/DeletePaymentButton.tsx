import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import { useContext, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { PaymentsContext } from "../../contexts/PaymentsContext";
import "./ButtonsPayment.css"

interface Props {
    name : string,
}

export default function DeletePaymentButton({name} : Props) {
    const [open, setOpen] = useState(false);
    const { updatePayments } = useContext(PaymentsContext);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = async () => {
        try {
            let {data} = await axios.post("/delete", { name: name });
            updatePayments(data);
        }
        catch (e) {
            console.log(e);
        }
        handleClose();
    }

    return (
        <div>
            <div className="default-payment-button specific-payment-button" onClick={() => { setOpen(true) }}>
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
                    <Button onClick={handleDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}