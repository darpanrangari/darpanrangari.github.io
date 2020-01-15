import React from 'react';
import {connect} from 'react-redux';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import CurrencyRate from '../CurrencyRate/CurrencyRate';
import {Divider, Paper, Button, Chip, Grid, Box, NoSsr} from '@material-ui/core';
import Header from "../Header/Header";
import {pocketBalance, getExchangeRates} from '../../utils/utils';
import {fetchLatestRates, exchangeNow, fetchCurrencies} from '../../actions';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {getCurrencyChar} from '../../utils/utils'

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

    /**
     * fetch all the available currencies from '/currencies' api
     * fetch the latest rate with respect to USD from '/latest' api
     * set default exchange rate for selected currency
     *
     * return {*}
     */
    componentDidMount() {
        const {currencyFrom, currencyTo} = this.state;
        this.props.fetchCurrencies();
        this.props.fetchLatestRates().then(() => {
            this.setState({
                exchangeRate: getExchangeRates(1, currencyTo, currencyFrom)
            })
        })
    }

    /**
     * Triggers when 'From' currency selected
     * Set currencyFrom and exchangeRate
     * @param event
     *
     * return {*}
     */
    onSelectFrom = (event) => {
        const {value} = event.target;

        this.setState({
            currencyFrom: value,
            exchangeRate: getExchangeRates(1, this.state.currencyTo, value)
        });
    };

    /**
     * Triggers when 'From currency value' changes
     * Set currencyFromValue and currencyToValue
     * @param event
     *
     * return {*}
     */
    onChangeRateFrom = (event) => {
        const {value} = event.target;

        this.setState({
            currencyFromValue: value.toString().split(".").map((el, i) => i ? el.split("").slice(0, 2).join("") : el).join("."),//value.match(/^\d+(?:\.\d{1,2})?$/),
            currencyToValue: getExchangeRates(value, this.state.currencyTo, this.state.currencyFrom),
        });
    };

    /**
     * Triggers when 'To' currency selected
     * Set currencyTo and exchangeRate
     * @param event
     *
     * return {*}
     */
    onSelectTo = (event) => {
        const {value} = event.target;

        this.setState({
            currencyTo: value,
            exchangeRate: getExchangeRates(1, value, this.state.currencyFrom)
        });
    };

    /**
     * Triggers when 'To currency value' changes
     * Set currencyToValue and currencyFromValue
     * @param event
     *
     * return {*}
     */
    onChangeRateTo = (event) => {
        const {value} = event.target;

        this.setState({
            currencyToValue: value.toString().split(".").map((el, i) => i ? el.split("").slice(0, 2).join("") : el).join("."),
            currencyFromValue: getExchangeRates(value, this.state.currencyFrom, this.state.currencyTo)
        });
    };

    /**
     * validation for enabling 'Exchange' button
     * check if pocket balance is available
     * check if valid amount value is entered
     *
     * @returns {boolean}
     */
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

    /**
     * Exchange the currency form 'selected From' to 'selected To'
     * and on success navigate to pocket screen
     */
    exchange = () => {
        this.props.exchangeNow(this.state);
        this.props.history.push("/")
    };

    /**
     * Header back button click handler
     */
    onClickBack = () => {
        this.props.history.push("/")
    };

    render() {
        const {currencyFrom, currencyTo, currencyFromValue, currencyToValue, exchangeRate} = this.state;

        return (
            <div className="exchange">
                <Header icon={<ArrowBackIcon/>} onClickHandler={this.onClickBack} heading="Exchange"/>

                <Paper style={{padding: '0 24px'}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <CurrencySelect balance={pocketBalance(currencyFrom)} onSelectCurrency={this.onSelectFrom}
                                        selected={currencyFrom}/>
                        <CurrencyRate onChangeRate={this.onChangeRateFrom} selected={currencyFromValue}/>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        <Chip color="primary" style={{margin: '0.5rem'}} variant="outlined"
                              label={`${getCurrencyChar(currencyFrom)} 1 = ${exchangeRate} ${getCurrencyChar(currencyTo)}`}
                              icon={<TrendingUpIcon/>}/>


                    </Grid>
                    <Divider/>

                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <CurrencySelect balance={pocketBalance(currencyTo)} onSelectCurrency={this.onSelectTo}
                                        selected={currencyTo}/>
                        <CurrencyRate onChangeRate={this.onChangeRateTo} selected={currencyToValue}/>
                    </Grid>

                    <Divider/>
                    <Button onClick={this.exchange} style={{margin: '20px 0'}} size="large"
                            disabled={this.isValidExchangeCase()}
                            variant="contained" color="secondary">
                        Exchange
                    </Button>

                    {/*<Box p={2} bgcolor="primary.main" color="primary.contrastText">*/}
                        {/*Server and Client*/}
                    {/*</Box>*/}
                    {/*<NoSsr>*/}
                        {/*<Box p={2} bgcolor="secondary.main" color="primary.contrastText">*/}
                            {/*Client only*/}
                        {/*</Box>*/}
                    {/*</NoSsr>*/}
                </Paper>
            </div>
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exchange);
