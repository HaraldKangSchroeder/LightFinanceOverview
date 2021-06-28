import Payment from "./payment/Payment";
import "./Payments.css";
import React, {useContext} from "react";
import {PaymentsContext} from "./PaymentsContext";
import AddPayment from "./addPayment/AddPayment";

interface Props {
    headerText: string,
}


export default function Payments(props: Props) {
    const {payments, setPayments} = useContext(PaymentsContext);
    return (
        <React.Fragment>
            <div className="subheader">{props.headerText}</div>
            <div className="payments-container">
                <Payment payment={payments[0]} />
                <Payment payment={payments[0]} />
                <Payment payment={payments[0]} />
            </div>
            <AddPayment type="Income"/>
        </React.Fragment>
    );
}