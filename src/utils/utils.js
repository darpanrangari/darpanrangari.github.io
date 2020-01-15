import store from '../store/store'
import config from '../config/config'

const getCurrencyChar = (char) => {
    const currencyCodeChars = {
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

const validateMoney = (amount) => {
    var regex = /^\d+(?:\.\d{1,2})?$/;
    return regex.test(amount)
}


const currenciesMap = (currencies) => {
    const mapArr = []
    for (let c in currencies) {
        mapArr.push({name: c, value: currencies[c]})
    }
    return mapArr
}

const pocketBalance = (pocketCurrency) => {
    const pockets = store.getState().pockets.pockets
    const pocket = pockets.find(o => o.currency === pocketCurrency)
    const balance = (pocket && pocket.balance) ? pocket.balance : 0.00

    return balance.toFixed(2)
}

const getExchangeRates = (value, to, from) => {

    var rates = store.getState().data.rates.rates;
    const base = config.baseCurrency;

    if (!rates) {
        return 0
    }
    rates[base] = 1;


    if (!rates[to] || !rates[from]) throw "conversion error";


    if (from === base) {
        return ((rates[to]) * value).toFixed(2);
    }

    if (to === base) {
        return ((1 / rates[from]) * value).toFixed(2);
    }

    const exchangeRate = (rates[to] * (1 / rates[from])) * value

    return exchangeRate.toFixed(2);
}

export {
    currenciesMap,
    pocketBalance,
    getExchangeRates,
    validateMoney,
    getCurrencyChar
}
