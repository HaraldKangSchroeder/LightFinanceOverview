import { Rythm } from "../enums/enums";
import { PayDate, PaymentInterface } from "../interfaces/global";

export default class Payment implements PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedDate : PayDate;
    rythm : Rythm;
    type : string;

    constructor(name : string,organization : string, amount : number,selectedDate : PayDate, rythm : Rythm, type : string){
        this.name = name;
        this.organization = organization;
        this.amount = amount;
        this.selectedDate = selectedDate;
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

    getSelectedDate() : PayDate {
        return this.selectedDate;
    }

    getRythm() : Rythm {
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
            rythm : this.rythm,
            type : this.type,
        }
    }

    getPayDates() : PayDate[] {
        let payDates : {date : number, month : number}[] = [];
        for(let m = this.selectedDate.month % this.rythm; this.isValidMonthNumber(m); m += this.rythm){
            payDates.push({
                date : this.selectedDate.date,
                month : m
            })
        }
        return payDates;
    }

    private isValidMonthNumber(month : number) {
        return month >= 0 && month <= 11;
    }
}