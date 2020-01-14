import React from 'react';
import {connect} from 'react-redux';
import {currenciesMap} from '../../utils/utils';

import {Typography} from '@material-ui/core'
import {
    FormControl,
    InputLabel,
    Select
} from "@material-ui/core"

class CurrencySelect extends React.Component {

    constructor(props) {
        super(props);

        this.getOptions = this.getOptions.bind(this);
    }

    getOptions() {
        const { currencies } = this.props

        return currenciesMap(currencies).map(({name, value}, index) => {
            return (
                <option value={name}>{`${name} - ${value}`}</option>
            )
        })

    }

    render() {
        const {selected, onSelectCurrency, balance} = this.props;

        return (
            <div>
                <FormControl variant="outlined" style={{margin:'10px 0'}}>
                    <Select
                        native
                        value={selected}
                        onChange={onSelectCurrency}
                    >
                        <option value="" />
                        {this.getOptions()}

                    </Select>
                    <Typography variant="subtitle2" gutterBottom>
                        Balance: {balance}
                    </Typography>
                </FormControl>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currencies: state.data.currencies,
    };
};
const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencySelect);
