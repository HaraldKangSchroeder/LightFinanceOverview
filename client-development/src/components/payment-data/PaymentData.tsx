import Payment from "../../classes/Payment";
import DeletePaymentButton from "../buttons-payment/DeletePaymentButton";
import EditPaymentDataButton from "../buttons-payment/EditPaymentDataButton";
import "./PaymentData.css";

interface Props {
    payment: Payment,
}

// TODO : ADD FLEX WRAP TO DAYS DIV WHEN SCREEN GETTING TOO SMALL


export default function PaymentData(props: Props) {
    return (
        <div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Amount</div> {props.payment.getName()}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Organziation</div> {props.payment.getOrganization()}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Rythm</div> {props.payment.getRythm()}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Days</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {props.payment.getDates().map(date =>
                        <DateView day={date.getDay()} month={date.getMonth()} />
                    )}
                </div>
            </div>
            <div className="payment-data-buttons-container">
                <EditPaymentDataButton payment={props.payment}/>
                <DeletePaymentButton name={props.payment.name}/>
            </div>
        </div>
    )
}

interface PropsDateView {
    day : number,
    month : number
}

function DateView(props : PropsDateView) {
    return (
        <div className="date-view">
            {props.day} {getMonthNameById(props.month)}
        </div>
    )
}

function getMonthNameById(id: number) {
    switch (id) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "Mai";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "Und";
    }
}