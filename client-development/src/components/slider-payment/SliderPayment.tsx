import Slider from '@material-ui/core/Slider';
import React, { useContext, useState } from 'react';
import Payments from '../../classes/Payments';
import { PaymentsContext } from '../../contexts/PaymentsContext';
import { PaymentType } from '../../enums/enums';
import "./SliderPayment.css";

export default function SliderPayment() {

    const [selectedMonth, setSelectedMonth] = useState(-1);
    const { payments } = useContext(PaymentsContext);

    const months = [
        {
            value: -1,
            label: 'Begin',
        },
        {
            value: 0,
            label: 'Jan',
        },
        {
            value: 1,
            label: 'Feb',
        },
        {
            value: 2,
            label: 'Mar',
        },
        {
            value: 3,
            label: 'Apr',
        },
        {
            value: 4,
            label: 'Mai',
        },
        {
            value: 5,
            label: 'Jun',
        },
        {
            value: 6,
            label: 'Jul',
        },
        {
            value: 7,
            label: 'Aug',
        },
        {
            value: 8,
            label: 'Sep',
        },
        {
            value: 9,
            label: 'Oct',
        },
        {
            value: 10,
            label: 'Nov',
        },
        {
            value: 11,
            label: 'Dec',
        },
    ];

    function handleMonth(month: number) {
        setSelectedMonth(month);
        return "" + month;
    }

    let bankBalance = payments.getBalanceUntilMonth(selectedMonth);
    let monthlyBalance = payments.getBalanceInMonth(selectedMonth);

    return (
        <React.Fragment>
            <div className="subheader">Monthly Overview</div>
            <div className="slider-container" style={{ height: "550px" }}>
                <div style={{ borderTopStyle: "solid", paddingTop: "30px", borderColor: "rgb(220,220,220)", paddingBottom: "50px", height: "500px", display: "flex", justifyContent: "space-evenly" }}>
                    <div style={{ height: "480px" }}>
                        <Slider
                            defaultValue={-1}
                            getAriaValueText={handleMonth}
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            max={11}
                            min={-1}
                            marks={months}
                            orientation="vertical"
                        />
                    </div>
                    <div className="currency">
                        <div className="currency-header">Bank Balance :</div>
                        <div className={bankBalance >= 0 ? "money-transfer-plus" : "money-transfer-minus"}>{bankBalance} Euro</div>

                        <div className="currency-header" style={{marginTop:"20px"}}>Monthly balance :</div>
                        <div className={monthlyBalance >= 0 ? "money-transfer-plus" : "money-transfer-minus"}>{monthlyBalance} Euro</div>

                        <div className="currency-header money-transfers-header">Money transfers :</div>
                        {
                            payments.getPaymentsInMonthByType(selectedMonth, PaymentType.INCOME).map(payment => 
                                <div className="money-transfer money-transfer-plus"> 
                                    <div>+ {payment.getAmount()} Euro</div> 
                                    <div style={{marginTop:"5px"}}>{payment.getName()}</div>
                                </div>
                            )
                        }
                        {
                            payments.getPaymentsInMonthByType(selectedMonth, PaymentType.OUTCOME).map(payment => 
                                <div className="money-transfer money-transfer-minus"> 
                                    <div>- {payment.getAmount()} Euro</div> 
                                    <div style={{marginTop:"5px"}}>{payment.getName()}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div >
        </React.Fragment>
    );
}