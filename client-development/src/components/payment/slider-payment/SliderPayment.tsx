import Slider from '@material-ui/core/Slider';
import "./SliderPayment.css";

export default function SliderPayment() {

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

    function valuetext(value: number) {
        return "" + value;
    }

    return (
        <div style={{ borderTopStyle: "solid", paddingTop: "30px", borderColor: "rgb(220,220,220)", paddingBottom: "50px", height: "500px", display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ height: "480px" }}>
                <Slider
                    defaultValue={-1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    max={11}
                    min={-1}
                    marks={months}
                    orientation="vertical"
                />
            </div>
            <div className="currency">
                <div className="currency-header">Currency :</div>
                <div>Value</div>
                <br/>
                <div className="currency-header">Money transfers :</div>
                <div className="money-transfer money-transfer-minus">-100 :<br/> Haftbefehl asdfs asdaasd  adasd</div>
                <div className="money-transfer money-transfer-minus">-100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-minus">-100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
                <div className="money-transfer money-transfer-plus">+100 :<br/> Haftbefehl</div>
            </div>
        </div>
    );
}