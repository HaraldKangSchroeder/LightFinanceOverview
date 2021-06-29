import Payment from "../payment/Payment";
import "./Payments.css";
import React, { useContext } from "react";
import { PaymentsContext } from "../../contexts/PaymentsContext";
import AddPayment from "../add-payment/AddPayment";

interface Props {
    type: string,
}


export default function Payments(props: Props) {
    const { payments, setPayments } = useContext(PaymentsContext);
    console.log(payments);
    return (
        <React.Fragment>
            <div className="subheader">{props.type}</div>
            <div className="payments-container">
                {payments.getPaymentsByType(props.type).getPaymentsList().map(payment =>
                    <Payment payment={payment} />
                )}
            </div>
            <AddPayment type="Income" />
        </React.Fragment>
    );
}