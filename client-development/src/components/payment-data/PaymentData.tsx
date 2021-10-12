import Payment from "../../classes/Payment";
import DeletePaymentButton from "../buttons-payment/DeletePaymentButton";
import EditPaymentDataButton from "../buttons-payment/EditPaymentDataButton";
import "./PaymentData.css";

interface Props {
    payment: Payment,
}

export default function PaymentData(props: Props) {
    return (
        <div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Amount</div> {props.payment.getAmount()}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Organziation</div> {props.payment.getOrganization()}
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Rythm</div> {props.payment.getRythm()} monthly
            </div>
            <div className="payment-data-element">
                <div className="payment-data-element-descriptor">Months</div>
                <div className="date-view-container">
                    {props.payment.getPayMonths().map(month =>
                        <DateView month={month} />
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
    month : number
}

function DateView({month} : PropsDateView) {
    return (
        <div className="date-view">
            {getMonthNameById(month)}
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