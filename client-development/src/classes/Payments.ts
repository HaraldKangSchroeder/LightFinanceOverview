import { HighlightSharp } from "@material-ui/icons";
import { PaymentType } from "../enums/enums";
import Payment from "./Payment";

export default class Payments {
    payments : Payment[];

    constructor(paymentsUnformatted? : any){
        this.payments = [];
        if(paymentsUnformatted){
            this.readPaymentsUnformatted(paymentsUnformatted);
        }
    }

    getPaymentsList() {
        return this.payments;
    }

    addPayment(payment : Payment) {
        this.payments.push(payment);
    }

    readPaymentsUnformatted(paymentsUnformatted : any){
        for(let paymentUnformatted of paymentsUnformatted){
            let payment = new Payment(
                paymentUnformatted.name,
                paymentUnformatted.organization,
                paymentUnformatted.amount,
                paymentUnformatted.selectedMonth,
                paymentUnformatted.rythm,
                paymentUnformatted.type,
            );
            this.payments.push(payment);
        }
    }

    getPaymentsByType(type : string) : Payments{
        let paymentsWithType = new Payments();
        for(let payment of this.payments){
            if(payment.getType() === type){
                paymentsWithType.addPayment(payment);
            }
        }
        return paymentsWithType;
    }

    getBalanceUntilMonth(month : number) : number{
        let balance = 0;
        for(let i = 0; i <= month; i++){
            balance += this.getBalanceInMonth(i);
        }
        return balance;
    }

    getBalanceInMonth(month : number) : number {
        let balance = 0;
        let positivePaymentsInMonth = this.getPaymentsInMonthByType(month, PaymentType.INCOME);
        for(let payment of positivePaymentsInMonth){
            balance += payment.getAmount();
        }
        let negativePaymentsInMonth = this.getPaymentsInMonthByType(month, PaymentType.OUTCOME);
        for(let payment of negativePaymentsInMonth){
            balance -= payment.getAmount();
        }
        return balance;
    }

    getPaymentsInMonthByType(month : number, type : PaymentType) : Payment[] {
        let paymentsInMonth : Payment[] = [];
        for(let payment of this.payments){
            if(payment.getPaymentMonthsUntilMonth(month).includes(month) && payment.getType() === type){
                paymentsInMonth.push(payment);
            }   
        }
        return paymentsInMonth;
    }

    containsPaymentWithName(name : string) : boolean {
        for(let payment of this.payments) {
            if(payment.getName() === name){
                return true;
            }
        }
        return false;
    }
}