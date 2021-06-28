import { PinDropSharp } from "@material-ui/icons";
import { useState, createContext } from "react";

let test = {
    name: "testname",
    amount: 10,
    organization: "DEVK",
    rythm: "monthly",
    payDay: new Date(),
}

let testArr : Payment = {
    name: "testname",
    amount: 10,
    organization: "DEVK",
    rythm: "monthly",
    payDays: [new Date(), new Date()],
}

interface Payment {
    name: string,
    amount: number,
    rythm: string,
    organization: string,
    payDay?: Date,
    payDays?: Date[],
}


export const PaymentsContext = createContext<any>([]);

export function PaymentsProvider(props: any) {
    const [payments, setPayments] = useState([
        test,
        test,
        testArr,
        test,
        test,
        testArr
    ])

    return <PaymentsContext.Provider value={{payments : payments, setPayments : setPayments}}>
        {props.children}
    </PaymentsContext.Provider>
}