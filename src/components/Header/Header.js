import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import React from "react";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <AccountBalanceIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {props.heading}
                </Typography>
            </Toolbar>
        </AppBar>

    )
}

export default Header
