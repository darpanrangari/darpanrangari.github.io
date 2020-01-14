import React from 'react';
import {connect} from 'react-redux';
import {TextField} from '@material-ui/core'

const CurrencyRate = (props) => {
    return (
        <TextField style={{margin: '10px 0'}} id="outlined-basic"  type="number" variant="outlined" value={props.selected}
                   onChange={props.onChangeRate}/>
    )
}


const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyRate);
