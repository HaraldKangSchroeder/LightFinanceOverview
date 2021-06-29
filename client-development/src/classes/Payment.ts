import { PaymentInterface } from "../interfaces/global";

export default class Payment implements PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedDate : Date;
    dates : Date[];
    rythm : string;
    type : string;

    constructor(name : string,organization : string, amount : number,selectedDate : Date, dates : Date[], rythm : string, type : string){
        this.name = name;
        this.organization = organization;
        this.amount = amount;
        this.selectedDate = selectedDate;
        this.dates = dates;
        this.rythm = rythm;
        this.type = type;
    }

    getName() : string {
        return this.name;
    }

    getOrganization() : string {
        return this.organization;
    }

    getAmount() : number {
        return this.amount;
    }

    getSelectedDate() : Date {
        return this.selectedDate;
    }

    getDates() : Date[] {
        return this.dates;
    }

    getRythm() : string {
        return this.rythm;
    }

    getType() : string {
        return this.type;
    }

    getCopy() : Payment {
        let paymentCopy = new Payment(
            this.name,
            this.organization,
            this.amount,
            this.selectedDate,
            this.dates,
            this.rythm,
            this.type
        );
        return paymentCopy;
    }

    getData() : Object {
        return {
            name : this.name,
            organization : this.organization,
            amount : this.amount,
            selectedDate : this.selectedDate,
            dates : this.dates,
            rythm : this.rythm,
            type : this.type,
        }
    }
}