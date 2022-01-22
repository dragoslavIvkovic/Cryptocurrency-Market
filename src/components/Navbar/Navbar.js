import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../_styles/Navbar.scss";
import { StateContext } from "../../context/GlobalState";
import AuthModal from "../Auth/AuthModal";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});




export default function Navbar() {
     const classes = useStyles();
  const {  user } = useContext(StateContext);


  return (
    <nav>
      <Box
        sx={{
          mx: "50px",
          mt: "10px",
          display: "flex-inline",
          flexDirection: "row",
        }}
      >
        <Link className="navbar-link" to="/">
          Home
        </Link>

        <Link className="navbar-link" style={{ float: "right" }} to="watchlist">
          Watchlist
        </Link>
        <Grid className="navbar-link" style={{ float: "right" }} >
          {user ? "Logout" : <AuthModal />}
        </Grid>
        
      </Box>
    </nav>
  );
}
