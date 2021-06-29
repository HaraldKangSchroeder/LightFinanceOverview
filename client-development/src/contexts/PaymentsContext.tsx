import { PinDropSharp } from "@material-ui/icons";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Payments from "../classes/Payments";


let testIncome = {
    name: "testnameincome",
    amount: 10,
    organization: "DEVK",
    selectedDate: new Date(),
    rythm: "one-month",
    dates: [new Date(), new Date()],
    type: "Income",
}

let testOutcome = {
    name: "testnameincome",
    amount: 10,
    organization: "DEVK",
    selectedDate: new Date(),
    rythm: "one-month",
    dates: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    type: "Outcome",
}

interface Value {
    payments: Payments,
    setPayments: Function,
    updatePayments: Function,
}

export const PaymentsContext = createContext<Value>(null);

export function PaymentsProvider(props: any) {
    const [payments, setPayments] = useState<Payments>(new Payments([
        testIncome,
        testIncome,
        testIncome,
        testIncome,
        testOutcome,
        testOutcome,
        testOutcome,
    ]));

    const requestPayments = async () => {
        try {
            let paymentsUnformatted = await axios.post("/payments", { test: "get payments" });
            updatePayments(paymentsUnformatted);
        }
        catch (e) {
            console.log(e);
        }
    }

    const updatePayments = (paymentsUnformatted : any) => {
        setPayments(new Payments(paymentsUnformatted));
    }

    useEffect(() => {
        requestPayments();
    }, []);

    return (
        <PaymentsContext.Provider value={{ payments: payments, setPayments: setPayments, updatePayments: updatePayments }}>
            {props.children}
        </PaymentsContext.Provider>
    )
}