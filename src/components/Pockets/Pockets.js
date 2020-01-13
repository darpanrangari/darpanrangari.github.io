import React from 'react'
import Pocket from '../Pocket/Pocket'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    Paper, List
} from '@material-ui/core';
import Header from '../Header/Header';

class Pockets extends React.Component {
    constructor(props) {
        super(props)
        this.handlePocketClick = this.handlePocketClick.bind(this)
    }


    getPockets() {
        const {pockets} = this.props;

        if (pockets.length) {
            return pockets.map((pocket, index) => {
                return (
                    <Pocket
                        data={pocket}
                        key={pocket.currency}
                        onClickHandler={this.handlePocketClick}
                    />

                )
            })
        }

        return <p> You dont not have any pockets</p>;

    }

    handlePocketClick(data) {
        console.log('clicked', data);
        this.props.history.push("/exchange")
    }

    render() {
        return (
            <Paper>
                <Header heading="Pockets"/>

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

