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





export default function Navbar () {
 
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
    <nav
        sx={{
          mx: '50px',
          mt: '10px',
          display: 'flex-inline',
          flexDirection: 'row'
        }}
      >
        <Link className='navbar-link' to='/'>
         <Button>Home</Button> 
        </Link>

        
        <Grid className='navbar-link' style={{ float: 'right' }}>
          {user ? (
            <Button
           
              onClick={logOut}
            >
              Log Out
            </Button>
          ) : (
            <AuthModal />
          )}
        </Grid>
        <Link className='navbar-link' style={{ float: 'right' }} to='watchlist'>
        <Button>Watchlist</Button>  
        </Link>
     
    </nav>
  )
}
