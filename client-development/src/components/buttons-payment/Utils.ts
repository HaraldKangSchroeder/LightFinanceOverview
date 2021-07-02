import { PaymentInterface } from "../../interfaces/interfaces";

export function isButtonStateSubmitAble(state : PaymentInterface, unique : boolean) : boolean{
    return (
        state.name != "" &&
        state.organization != "" &&
        state.amount > 0 &&
        unique
    )
}
