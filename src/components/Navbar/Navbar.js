import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import { Avatar, Button } from '@material-ui/core'
import { Box, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../_styles/Navbar.scss'
import { signOut } from 'firebase/auth'
import { StateContext } from '../../context/GlobalState'
import AuthModal from '../Auth/AuthModal'
import { auth, db } from '../../firebase'

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))



export default function Navbar () {
  const classes = useStyles()
  const { user, setAlert } = useContext(StateContext)
 
  const logOut = () => {
    signOut(auth)
    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successfully !'
    })
  }

  return (
    <nav>
      <Box
        sx={{
          mx: '50px',
          mt: '10px',
          display: 'flex-inline',
          flexDirection: 'row'
        }}
      >
        <Link className='navbar-link' to='/'>
          Home
        </Link>

        <Link className='navbar-link' style={{ float: 'right' }} to='watchlist'>
          Watchlist
        </Link>
        <Grid className='navbar-link' style={{ float: 'right' }}>
          {user ? (
            <Button
              variant='contained'
              className={classes.logout}
              onClick={logOut}
            >
              Log Out
            </Button>
          ) : (
            <AuthModal />
          )}
        </Grid>
      </Box>
    </nav>
  )
}
