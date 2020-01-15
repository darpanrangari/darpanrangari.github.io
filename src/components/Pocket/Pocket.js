import React from 'react';
import {ListItem, ListItemText, Divider} from '@material-ui/core';
import {getCurrencyChar} from '../../utils/utils'

const Pocket = ({data, onClickHandler}) => {
    return (
        <>
            <ListItem onClick={() => onClickHandler(data)}>
                <ListItemText
                    secondary={` Balance : ${getCurrencyChar(data.currency)} ${data.balance}`}>{data.currency} </ListItemText>
                <ListItemText>{data.value}</ListItemText>
            </ListItem>
            <Divider/>
        </>
    )
}
export default Pocket
