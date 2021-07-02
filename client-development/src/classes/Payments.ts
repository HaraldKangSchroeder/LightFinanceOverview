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

    getBankBalanceUntilMonth(month : number) : number{
        let bankBalance = 0;
        for(let payment of this.payments){
            let paymentCount = payment.getPayMonthsUntilMonth(month).length;
            let sign = payment.getType() === PaymentType.INCOME ? 1 : -1;
            bankBalance += sign * paymentCount * payment.getAmount();
        }
        return bankBalance;
    }

    getPaymentsInMonthByType(month : number, type : PaymentType) : Payment[] {
        let paymentsInMonth : Payment[] = [];
        for(let payment of this.payments){
            if(payment.getPayMonthsUntilMonth(month).includes(month) && payment.getType() === type){
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