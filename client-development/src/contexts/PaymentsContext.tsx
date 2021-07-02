import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Payments from "../classes/Payments";
interface Value {
    payments: Payments,
    updatePayments: (data : any) => void,
}

export const PaymentsContext = createContext<Value>(null);

export function PaymentsProvider(props: any) {
    const [payments, setPayments] = useState<Payments>(new Payments());

    const requestPayments = async () => {
        try {
            let {data} = await axios.get("/payments");
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
        <PaymentsContext.Provider value={{ payments: payments, updatePayments: updatePayments }}>
            {props.children}
        </PaymentsContext.Provider>
    )
}