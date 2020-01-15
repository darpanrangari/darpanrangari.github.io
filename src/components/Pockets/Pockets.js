import React from 'react'
import Pocket from '../Pocket/Pocket'
import {connect} from 'react-redux';
import {
    Paper, List
} from '@material-ui/core';
import Header from '../Header/Header';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

class Pockets extends React.Component {
    constructor(props) {
        super(props)
        this.handlePocketClick = this.handlePocketClick.bind(this)
    }

    /**
     * Get all the available Pockets from state
     * and create a list of pocket
     *
     * @returns {[<pocket1>,<pocket2>]}
     */
    getPockets() {
        const {pockets} = this.props;

        if (pockets.length) {
            return pockets.map((pocket) => {
                return (
                    <Pocket
                        data={pocket}
                        key={pocket.currency}
                        onClickHandler={this.handlePocketClick}
                    />

                )
            })
        }

        return <p> You don't not have any pockets</p>;

    }

    /**
     * click handler for pocket
     */
    handlePocketClick() {
        this.props.history.push("/exchange")
    }

    render() {
        return (
            <Paper>

                <Header icon={<AccountBalanceIcon/>} heading="Pockets"/>

                <List component="nav" aria-label="pockets available">
                    {this.getPockets()}
                </List>

            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        pockets: state.pockets.pockets
    };
};

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pockets);

