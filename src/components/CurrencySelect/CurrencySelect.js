import React from 'react';
import {connect} from 'react-redux';
import {Typography} from '@material-ui/core'
import {
    FormControl,
    Select
} from "@material-ui/core"
import {getCurrencyChar} from '../../utils/utils'

const CurrencySelect = (props) => {
    const {selected, onSelectCurrency, balance, currencies} = props;

    const getOptions = () => {
        return Object.keys(currencies).map((currency) => {
            return (
                <option key={currency} value={currency}>{currency}</option>
            )
        })
    };

    return (
        <FormControl variant="outlined" style={{margin: '40px 0px 10px 0px'}}>
            <Select
                native
                value={selected}
                onChange={onSelectCurrency}
            >
                <option value=""/>
                {getOptions()}

            </Select>

            <Typography style={{margin: '10px 0'}} variant="subtitle2" gutterBottom>
                Balance: {`${getCurrencyChar(selected)} ${balance}`}
            </Typography>
        </FormControl>
    );
};


const mapStateToProps = state => {
    return {
        currencies: state.data.currencies,
    };
};

export default connect(
    mapStateToProps, {}
)(CurrencySelect);
