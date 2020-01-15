import React from 'react';
import {TextField} from '@material-ui/core'

/**
 * Currency number field
 * @param props
 * @returns {*}
 * @constructor
 */
const CurrencyRate = (props) => {
    return (
        <TextField style={{margin: '10px 0'}} id="outlined-basic"  type="number" variant="outlined" value={props.selected}
                   onChange={props.onChangeRate}/>
    )
};

export default CurrencyRate;
