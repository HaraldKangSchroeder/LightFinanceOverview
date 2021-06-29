import Grid from '@material-ui/core/Grid';
import "./App.css";
import SliderPayment from '../slider-payment/SliderPayment';
import Payments from '../payments/Payments';
import { PaymentsProvider } from '../../contexts/PaymentsContext';


function App() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6} style={{ background: "white" }}>
                <div className="header">Light Finance Overview</div>
                <PaymentsProvider>
                    <Payments type="Outcome" />
                    <Payments type="Income" />
                    <SliderPayment />
                </PaymentsProvider>
            </Grid>
            <Grid item xs={1} md={3} />
        </Grid>
    );
}

export default App;
