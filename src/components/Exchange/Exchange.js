import React from 'react';
import {connect} from 'react-redux';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import CurrencyRate from '../CurrencyRate/CurrencyRate';
import {Divider, Paper, Button, Chip} from '@material-ui/core';
import Header from "../Header/Header";
import {pocketBalance, getExchangeRates, validateMoney} from '../../utils/utils';
import {fetchLatestRates, exchangeNow,fetchCurrencies} from '../../actions';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyFrom: 'GBP',
            currencyFromValue: 0.00,
            currencyTo: 'INR',
            currencyToValue: 0.00
        }
    }

    componentDidMount(){
        const {currencyFrom, currencyTo } = this.state;
        this.props.fetchCurrencies();
        this.props.fetchLatestRates().then(()=>{
            this.setState({
                exchangeRate: getExchangeRates(1, currencyTo, currencyFrom)
            })
        })
    }

    onSelectFrom = (event) => {
        const {value} = event.target;

        this.setState({
            currencyFrom: value,
            exchangeRate: getExchangeRates(1, this.state.currencyTo, value)
        });
    };

    onChangeRateFrom = (event) => {
        const {value} = event.target;

        this.setState({
            currencyFromValue: value.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join("."),//value.match(/^\d+(?:\.\d{1,2})?$/),
            currencyToValue: getExchangeRates(value, this.state.currencyTo, this.state.currencyFrom),
        });
    };

    onSelectTo = (event) => {
        const {value} = event.target;

        this.setState({
            currencyTo: value,
            exchangeRate: getExchangeRates(1, value, this.state.currencyFrom)
        });
    };

    onChangeRateTo = (event) => {
        const {value} = event.target;

        this.setState({
            currencyToValue: value.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join("."),
            currencyFromValue: getExchangeRates(value, this.state.currencyFrom, this.state.currencyTo)
        });
    };

    isValidExchangeCase = () => {
        const {
            currencyFrom,
            currencyFromValue,
            currencyTo,
            currencyToValue
        } = this.state;


        if (pocketBalance(currencyFrom) >= parseFloat(currencyFromValue) &&
            currencyFrom !== currencyTo &&
            parseFloat(currencyFromValue) >= 1 &&
            parseFloat(currencyToValue) > 0) {
            return false;
        }

        return true;
    };

    exchange = () => {
        console.log(this.state);
        this.props.exchangeNow(this.state);
        this.props.history.push("/")
    }

    render() {
        const {currencyFrom, currencyTo, currencyFromValue, currencyToValue, exchangeRate} = this.state;
        console.log(this.props.pockets)
        return (
            <>
                <Header heading="Exchange"/>
                <Paper style={{padding: '0 24px'}}>
                    <CurrencySelect balance = {pocketBalance(currencyFrom)} onSelectCurrency={this.onSelectFrom} selected={currencyFrom}/>
                    <CurrencyRate onChangeRate={this.onChangeRateFrom} selected={currencyFromValue}/>

                    <Divider/>
                    <Chip style={{margin:'0.5rem'}} variant="outlined" label={`1 ${currencyFrom} = ${exchangeRate}`} icon={<TrendingUpIcon />} />
                    <Divider/>

                    <CurrencySelect balance = {pocketBalance(currencyTo)} onSelectCurrency={this.onSelectTo} selected={currencyTo}/>
                    <CurrencyRate onChangeRate={this.onChangeRateTo} selected={currencyToValue}/>

                    <Divider/>
                    <Button onClick={this.exchange} style={{margin: '20px 0'}} size="large" disabled={this.isValidExchangeCase()}
                            variant="contained" color="secondary">
                        Exchange
                    </Button>
                </Paper>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        pockets: state.pockets.pockets
    };
};
const mapDispatchToProps = {
    fetchLatestRates,
    exchangeNow,
    fetchCurrencies
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exchange);
