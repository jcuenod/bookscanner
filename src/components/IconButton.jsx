import React, { Component } from 'react'

const IconButton = ({ onClick, classes, icon }) => (
    <div onClick={onClick} className={classes.join(" ")}>
        {icon}
    </div>
)
export default IconButton