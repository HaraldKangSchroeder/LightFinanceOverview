import { Rythm } from "../enums/enums";

export interface PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedDate : PayDate;
    rythm : Rythm;
    type? : string; 
}

export interface PayDate {
    date : number,
    month : number,
}