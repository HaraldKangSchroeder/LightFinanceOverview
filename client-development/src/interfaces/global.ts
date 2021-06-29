export interface PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedDate : Date;
    dates? : Date[];
    rythm : string;
    type? : string; 
}