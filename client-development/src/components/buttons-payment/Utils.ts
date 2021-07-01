import { PayDate, PaymentInterface } from "../../interfaces/global";

export function isButtonStateSubmitAble(state : PaymentInterface) : boolean{
    return (
        state.name != "" &&
        state.organization != "" &&
        state.amount > 0 &&
        state.selectedDate != null
    )
}

export function getDateByPayDate(payDate : PayDate) : Date{
    if(payDate == null) return null;
    let date = new Date();
    date.setMonth(payDate.month);
    date.setDate(payDate.date);
    return date;
}