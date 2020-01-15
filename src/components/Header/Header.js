import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";

import React from "react";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={props.onClickHandler} edge="start" color="inherit" aria-label="menu">
                    {props.icon}
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {props.heading}
                </Typography>
            </Toolbar>
        </AppBar>

    )
}

export default Header
