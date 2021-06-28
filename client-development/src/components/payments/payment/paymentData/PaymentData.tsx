import DeletePaymentButton from "./DeletePaymentButton";
import EditPaymentDataButton from "./EditPaymentDataButton";
import "./PaymentData.css";

interface Props {
    payment: {
        amount: number,
        rythm: string,
        organization: string,
        payDay?: Date,
        payDays?: Date[],
    }
}

// TODO : ADD FLEX WRAP TO DAYS DIV WHEN SCREEN GETTING TOO SMALL


export default function PaymentData(props: Props) {
    var a = 5;
    return (
        <div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Amount</div> {props.payment.amount}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Organziation</div> {props.payment.organization}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Rythm</div> {props.payment.rythm}
            </div>
            {props.payment.payDay ?
                <div className="payment-data-element">
                    <div className="payment-data-element-descriptor">Day</div> {props.payment.payDay.getDay()}
                </div>
                :
                <div className="payment-data-element"> 
                    <div className="payment-data-element-descriptor">Days</div> <div>wa wa wa wa wa wawa wa wawa wa wawa wa wawa wa wawwa wa wa wa wa wawa wa wawa wa wawa wa wawa wa wawwa wa wa wa wa wawa wa wawa wa wawa wa wawa wa wawwa wa wa wa wa wawa wa wawa wa wawa wa wawa wa wawwa wa wa wa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wawa wa wa</div>
                </div>
            }
            <div className="payment-data-buttons-container">
                <EditPaymentDataButton />
                <DeletePaymentButton />
            </div>
        </div>
    )
}