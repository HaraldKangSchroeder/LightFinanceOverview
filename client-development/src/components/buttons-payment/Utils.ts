import { PaymentInterface } from "../../interfaces/global";

export function isButtonStateSubmitAble(state : PaymentInterface) : boolean{
    return (
        state.name != "" &&
        state.organization != "" &&
        state.amount > 0
    )
}
