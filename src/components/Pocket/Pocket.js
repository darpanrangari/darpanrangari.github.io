import React from 'react';
import {ListItem, ListItemText, Divider} from '@material-ui/core';

const Pocket = ({data, onClickHandler}) => {
    return (
        <>
            <ListItem onClick={() => onClickHandler(data)}>
                <ListItemText>{data.currency} {data.balance}</ListItemText>
                <ListItemText>{data.value}</ListItemText>
            </ListItem>
            <Divider/>
        </>
    )
}
export default Pocket
