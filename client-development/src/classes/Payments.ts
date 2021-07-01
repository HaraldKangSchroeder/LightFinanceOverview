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
}