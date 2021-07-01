import { Month, Rythm } from "../enums/enums";

export interface PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedMonth : Month;
    rythm : Rythm;
    type? : string; 
}
