import store from '../store/store'
import config from '../config/config'

const getCurrencyChar = (char) => {
    const currencyCodeChars = {
        RUB: '₽',
        EUR: '€',
        GBP: '£',
        USD: '$'
    };

    if (currencyCodeChars[char]) {
        return currencyCodeChars[char];
    }
    return char;
}

const getCurrencyValue = (fromVal, toVal, toFixed = 4) => {
    return ((1 / toVal) * fromVal).toFixed(toFixed);
}

const convertCurrency = (value, fromRate, toRate) => {
    if (fromRate && toRate && parseFloat(value)) {
        return ((parseFloat(value) * fromRate) / toRate).toFixed(2);
    }
    return '0.00';
}

const validateMoney = (value) => {
    value = value.replace(/,/, '.');
    if (value.length === 0) {
        return '0';
    }

    let valueInt = parseInt(value, 10);
    valueInt = Number.isNaN(valueInt) ? 0 : valueInt;
    valueInt = Math.abs(valueInt);

    let ext = value.indexOf('.') > -1 ? `.${value.split('.')[1]}` : null;
    ext = ext && ext.length > 3 ? ext.slice(0, 3) : ext;

    return valueInt + ext;
}

const eventOnlyValue = (event) => {
    if (
        (event.which >= 48 && event.which <= 57) ||
        ((event.charCode === 46 || event.charCode === 44) && event.target.value.indexOf('.') === -1)) {
        return true;
    }
    event.preventDefault();
    return false;
}

const currenciesMap = (currencies) => {
    const mapArr = []
        for(let c in currencies){
            mapArr.push({name:c,value:currencies[c]})
        }
    return mapArr
}

const pocketBalance = (pocketCurrency) => {
    const pockets = store.getState().pockets.pockets
    const pocket = pockets.find(o => o.currency === pocketCurrency)
    const balance = (pocket && pocket.balance) ? pocket.balance : 0.00

    return balance
}

const getExchangeRates = (to, from) => {
    console.log(store.getState())
    var rates = store.getState().data.rates.rates;
    const base = config.baseCurrency;

    if(!rates){
        return 0
    }
    rates[base] = 1;

    // Throw an error if either rate isn't in the rates array
    if ( !rates[to] || !rates[from] ) throw "conversion error";

    // If `from` currency === fx.base, return the basic exchange rate for the `to` currency
    if ( from === base ) {
        return rates[to];
    }

    // If `to` currency === fx.base, return the basic inverse rate of the `from` currency
    if ( to === base ) {
        return 1 / rates[from];
    }

    // Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the
    // relative exchange rate between the two currencies
    return (rates[to] * (1 / rates[from])).toFixed(2);
}

export {
    currenciesMap,
    pocketBalance,
    getExchangeRates
}
