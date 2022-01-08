import { AppBar, Toolbar } from "@material-ui/core";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  
  return (
    <header>
      <Grid style={{ background: 'transparent',marginLeft:'10rem',marginTop:"3vh" }}><Link to="/">Home</Link></Grid>
    </header>
  );
}