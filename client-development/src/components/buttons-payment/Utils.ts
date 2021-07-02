import { PaymentInterface } from "../../interfaces/interfaces";

export function isButtonStateSubmitAble(state : PaymentInterface) : boolean{
    return (
        state.name != "" &&
        state.organization != "" &&
        state.amount > 0
    )
}
