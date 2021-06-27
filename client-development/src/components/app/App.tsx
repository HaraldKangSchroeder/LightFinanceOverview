import React from 'react';
import Payment from '../payment/Payment';
import Grid from '@material-ui/core/Grid';
import "./App.css";
import SliderPayment from '../payment/slider-payment/SliderPayment';

let test = {
    name: "testname",
    amount: 10,
    organization: "DEVK",
    rythm: "monthly",
    payDay: new Date(),
}

let testArr = {
    name: "testname",
    amount: 10,
    organization: "DEVK",
    rythm: "monthly",
    payDays: [new Date(), new Date()],
}

function App() {
    return (
        <Grid container>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6} style={{background:"white"}}>
                <div className="header">Light Finance Overview</div>
                <div className="subheader">Outcome</div>
                <div className="payments-container">
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                </div>
                <div className="subheader">Income</div>
                <div className="payments-container">
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                    <Payment payment={test} />
                    <Payment payment={test} />
                    <Payment payment={testArr} />
                </div>
                <div className="subheader">Monthly Overview</div>
                <div className="slider-container" style={{height:"550px"}}>
                    <SliderPayment />
                </div>
            </Grid>
            <Grid item xs={1} md={3} />
        </Grid>
    );
}

export default App;
