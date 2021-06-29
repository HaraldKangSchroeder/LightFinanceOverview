import { useState } from "react";
import "./AddPayment.css";
import AddPaymentButton from "../buttons-payment/AddPaymentButton";

interface Props {
    type: string
}

export default function AddPayment({type} : Props) {
    return (
        <div>
            <div className="add-payment-container">
                <AddPaymentButton type={type}/>
            </div>
        </div>
    )
}