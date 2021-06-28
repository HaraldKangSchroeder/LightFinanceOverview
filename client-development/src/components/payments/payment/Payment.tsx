
import { Collapse, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import "./Payment.css"
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useState } from "react";
import PaymentData from "./paymentData/PaymentData";

interface Props {
    payment: {
        name : string,
        amount: number,
        rythm: string,
        organization: string,
        payDay?: Date,
        payDays?: Date[],
    }
}

export default function Payment(props : Props) {
    const [open, setOpen] = useState(false);

    const handleClick = (e: any) => {
        setOpen(!open);
    }
    return (
        <div className="payment-container">
            <div className="payment-preview" onClick={handleClick}>
                <div className="payment-preview-left">
                    <div className="color-indicator"></div>
                    <div className="payment-name">Haftversicherung</div>
                </div>
                <div className="expand" style={open ? {transform : "rotate(180deg)"} : {}} />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <PaymentData payment={props.payment}/>
            </Collapse>
        </div>
    )
}