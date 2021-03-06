import Grid from '@material-ui/core/Grid';
import "./LightFinanceOverview.css";
import SliderPayment from '../slider-payment/SliderPayment';
import Payments from '../payments/Payments';
import { PaymentsProvider } from '../../contexts/PaymentsContext';
import { PaymentType } from '../../enums/enums';
import TopBar from "../topBar/TopBar";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';


function LightFinanceOverview() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6} style={{ background: "white" }}>
                <TopBar />
                <div className="header">Light Finance Overview</div>
                <PaymentsProvider>
                    <Payments type={PaymentType.INCOME} />
                    <Payments type={PaymentType.OUTCOME} />
                    <SliderPayment />
                </PaymentsProvider>
            </Grid>
            <Grid item xs={1} md={3} />
        </Grid>
    );
}

export default LightFinanceOverview;
