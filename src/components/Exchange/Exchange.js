import React from 'react';
import {connect} from 'react-redux';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import CurrencyRate from '../CurrencyRate/CurrencyRate';
import {Divider, Paper, Button, Chip} from '@material-ui/core';
import Header from "../Header/Header";
import {pocketBalance, getExchangeRates} from '../../utils/utils';
import {fetchLatestRates} from '../../actions';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyFrom: 'GBP',
            currencyFromValue: 0.00,
            currencyTo: 'USD',
            currencyToValue: 0.00
        }
    }

    componentDidMount(){
        this.props.fetchLatestRates()
    }

    onSelectFrom = (event) => {
        this.setState({
            currencyFrom: event.target.value
        });
    };

    onChangeRateFrom = (event) => {
        const {value} = event.target;
        this.setState({
            currencyFromValue: value,
            currencyToValue: getExchangeRates(this.state.currencyTo, this.state.currencyFrom) * value
        });
    };

    onSelectTo = (event) => {
        this.setState({
            currencyTo: event.target.value
        });
    };

    onChangeRateTo = (event) => {
        const {value} = event.target;
        this.setState({
            currencyToValue: value,
            currencyFromValue: getExchangeRates(this.state.currencyFrom, this.state.currencyTo) * value
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
            parseFloat(currencyFromValue) > 0 &&
            parseFloat(currencyToValue) > 0) {
            return false;
        }

        return true;
    };

    render() {
        const {currencyFrom, currencyTo, currencyFromValue, currencyToValue} = this.state;
        return (
            <>
                <Header heading="Exchange"/>
                <Paper style={{padding: '0 24px'}}>
                    <CurrencySelect onSelectCurrency={this.onSelectFrom} selected={currencyFrom}/>
                    <CurrencyRate onChangeRate={this.onChangeRateFrom} selected={currencyFromValue}/>

                    <Divider/>
                    <Chip style={{margin:'0.5rem'}} variant="outlined" label={`1 ${currencyTo} = ${getExchangeRates(currencyTo, currencyFrom).toFixed(4)}`} icon={<TrendingUpIcon />} />
                    <Divider/>

                    <CurrencySelect onSelectCurrency={this.onSelectTo} selected={currencyTo}/>
                    <CurrencyRate onChangeRate={this.onChangeRateTo} selected={currencyToValue}/>

                    <Divider/>
                    <Button style={{margin: '20px 0'}} size="large" disabled={this.isValidExchangeCase()}
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
    fetchLatestRates
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exchange);
