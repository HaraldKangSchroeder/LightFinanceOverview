import { PaymentInterface } from "../../interfaces/global";

export function isButtonStateSubmitAble(state : PaymentInterface) : boolean{
    return (
        state.name != "" &&
        state.organization != "" &&
        state.amount > 0 &&
        state.selectedDate instanceof Date && !isNaN(state.selectedDate.getDay()) && !isNaN(state.selectedDate.getMonth()) && !isNaN(state.selectedDate.getFullYear())
    )
}