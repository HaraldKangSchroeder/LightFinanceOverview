import { PinDropSharp } from "@material-ui/icons";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Payments from "../classes/Payments";
import { Rythm } from "../enums/enums";


let testIncome = {
    name: "testnameincome",
    amount: 10,
    organization: "DEVK",
    selectedDate: {date : 10, month : 5},
    rythm: Rythm.ONE_MONTH,
    type: "Income",
}

let testOutcome = {
    name: "testnameincome",
    amount: 10,
    organization: "DEVK",
    selectedDate: {date : 10, month : 5},
    rythm: Rythm.TWO_MONTH,
    type: "Outcome",
}

interface Value {
    payments: Payments,
    setPayments: Function,
    updatePayments: Function,
}

export const PaymentsContext = createContext<Value>(null);

export function PaymentsProvider(props: any) {
    const [payments, setPayments] = useState<Payments>(new Payments());

    const requestPayments = async () => {
        try {
            let {data} = await axios.get("/payments");
            // console.log(data);
            updatePayments(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const updatePayments = (data : any) => {
        setPayments(new Payments(data));
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