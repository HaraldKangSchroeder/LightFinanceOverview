
import { Collapse, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core"
import "./Payment.css"
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useState } from "react";
import PaymentData from "../payment-data/PaymentData";
import PaymentClass from "../../classes/Payment";
import stringToColorConverter from "string-to-color";
interface Props {
    payment: PaymentClass
}

export default function Payment({payment} : Props) {
    const [open, setOpen] = useState(false);

    const handleClick = (e: any) => {
        setOpen(!open);
    }

    let colorIndicatorBackground = stringToColorConverter(payment.getOrganization().toUpperCase()); // enables same backgroundcolor for equal orga names 
    return (
        <div className="payment-container">
            <div className="payment-preview" onClick={handleClick}>
                <div className="payment-preview-left">
                    <div className="color-indicator" style={{background: colorIndicatorBackground}}></div>
                    <div className="payment-name">{payment.getName()}</div>
                </div>
                <div className="expand" style={open ? {transform : "rotate(180deg)"} : {}} />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <PaymentData payment={payment}/>
            </Collapse>
        </div>
    )
}