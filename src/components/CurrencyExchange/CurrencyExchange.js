import React from 'react';
import {connect} from 'react-redux';
import { fetchCurrencies } from '../../actions/index'
import Exchange from '../Exchange/Exchange'
import './styles.css'

export class CurrencyExchange extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCurrencies();
    }

    render() {
        return (
            <div>
                <Exchange></Exchange>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currencies: state.data.currencies
    };
};
const mapDispatchToProps = {
    fetchCurrencies
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyExchange);
