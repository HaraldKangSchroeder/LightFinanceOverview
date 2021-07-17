import { PaymentType, Rythm } from "../enums/enums";
import { PaymentInterface } from "../interfaces/interfaces";

export default class Payment implements PaymentInterface {
    name : string;
    organization : string;
    amount : number;
    selectedMonth : number;
    rythm : Rythm;
    type : PaymentType;

    constructor(name : string,organization : string, amount : number,selectedMonth : number, rythm : Rythm, type : PaymentType){
        this.name = name;
        this.organization = organization;
        this.amount = amount;
        this.selectedMonth = selectedMonth;
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

    getSelectedMonth() : number {
        return this.selectedMonth;
    }

    getRythm() : Rythm {
        return this.rythm;
    }

    getType() : PaymentType {
        return this.type;
    }

    getCopy() : Payment {
        let paymentCopy = new Payment(
            this.name,
            this.organization,
            this.amount,
            this.selectedMonth,
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
            selectedMonth : this.selectedMonth,
            rythm : this.rythm,
            type : this.type,
        }
    }

    getPayMonths() : number[] {
        let payMonths : number[] = [];
        for(let m = this.selectedMonth % this.rythm; this.isValidMonthNumber(m); m += this.rythm){
            payMonths.push(m);
        }
        return payMonths;
    }

    getPaymentMonthsUntilMonth(month : number) {
        let payMonths = this.getPayMonths();
        let payMonthsUntilMonth = payMonths.filter((item) => {
            return item <= month;
        });
        return payMonthsUntilMonth;
    }

    private isValidMonthNumber(month : number) {
        return month >= 0 && month <= 11;
    }
}