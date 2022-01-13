import { AppBar, Toolbar } from '@material-ui/core'
import { Box, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../_styles/Navbar.scss'

export default function Navbar () {
  return (
    <header>
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

        <Link
          className='navbar-link'
          style={{ float: 'right' }}
          to='/watchlist'
        >
          Watchlist
        </Link>
        <Link
          className='navbar-link'
          style={{ float: 'right' }}
          to='/login-signup'
        >
          LoginSignup
        </Link>
      </Box>
    </header>
  )
}
