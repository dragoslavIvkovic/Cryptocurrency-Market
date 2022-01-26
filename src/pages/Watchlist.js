import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'

import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/GlobalState'
import {
  StarBorder,
  Info,
  ArrowDropUp,
  ArrowDropDown,
  Search,
  Star
} from '@mui/icons-material'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { styled } from '@mui/material/styles'

export default function Watchlist () {
  const { coins, watchlist, setWatchlist, user, setAlert } = useContext(
    StateContext
  )

  const results = coins.filter(item => watchlist?.includes(item.id))

  const addToWatchlist = async row => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, row?.id] : [row?.id] },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${row.name} Added to the Watchlist !`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const removeFromWatchlist = async row => {
    const coinRef = doc(db, 'watchlist', user.uid)
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter(wish => wish !== row?.id) },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${row.name} Removed from the Watchlist !`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const TypoChangeRed = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    color: '#F40D30',
    borderRadius: '8px',
    padding: '5px 10px 5px 10px',
    whiteSpace: 'nowrap',
    fontWeight: '600'
  }))
  const TypoChangeGreen = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    color: '#16C784',
    borderRadius: '8px',
    padding: '5px 10px 5px 10px',
    whiteSpace: 'nowrap',
    fontWeight: '600'
  }))
  const TableNormal = styled(Table)(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: 700,
    marginRight: '10px',
    textTransform: 'uppercase'
  }))
  const InfoIconGray = styled(Info)(({ theme }) => ({
    ...theme.typography.body2,
    fill: 'gray'
  }))

  return (
    <TableContainer elevation={3} component={Paper} sx={{ marginTop: '5vh' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title='Login to add w'>
                <StarBorder sx={{ ml: '10px' }} />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Typography sx={{ ml: '10px' }}>Name</Typography>
            </TableCell>
            <TableCell align='left'>Price</TableCell>

            <TableCell align='center'>1h%</TableCell>
            <TableCell align='center'>7d%</TableCell>
            <TableCell align='center'>24h%</TableCell>
            <TableCell align='center'>High 24h</TableCell>
            <TableCell align='center'>Low 24h</TableCell>
            <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
              Total Volume
              <Tooltip title='A measure of how much of a cryptocurrency was traded in the last 24 hours.'>
                <InfoIconGray />
              </Tooltip>
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
              Market Cap
              <Tooltip
                title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
Market Cap = Current Price x Circulating Supply."
              >
                <InfoIconGray />
              </Tooltip>
            </TableCell>
            <TableCell>
              Circulating Supply
              <Tooltip title='The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.'>
                <InfoIconGray />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(row => (
            <TableRow
              className='table-row'
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {user &&
                  (watchlist.indexOf(row.id) === -1 ? (
                    <Tooltip title='Add to Watchlist '>
                      <IconButton>
                        <StarBorder onClick={() => addToWatchlist(row)} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title='Remove from watchlist'>
                      <IconButton>
                        <Star onClick={() => removeFromWatchlist(row)} />
                      </IconButton>
                    </Tooltip>
                  ))}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                justifyContent='center'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Box sx={{ mr: '5px' }}>
                  <img
                    src={row.image}
                    alt='alt'
                    style={{
                      width: '40px',
                      height: '40px'
                    }}
                  />
                </Box>

                <Typography>{row.name}</Typography>
                <Typography>{row.symbol}</Typography>
                <Link mx={1} className='link__details' to={`/coin/${row.id}`}>
                  <Button className='btn-buy__coin'>Buy</Button>
                </Link>
              </TableCell>

              <TableCell>
                <Typography className='coin_price' style={{ fontWeight: 700 }}>
                  {row.current_price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </Typography>
              </TableCell>
              <TableCell>
                {row.price_change_percentage_1h_in_currency < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {row.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {row.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </TableCell>
              <TableCell>
                {row.price_change_percentage_24h_in_currency < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {row.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {row.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </TableCell>
              <TableCell>
                {row.price_change_percentage_7d_in_currency < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {row.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {row.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </TableCell>
              <TableCell>
                {row.high_24h < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {row.high_24h?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {row.high_24h?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </TableCell>
              <TableCell>
                {row.low_24h < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {row.low_24h?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {row.low_24h?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </TableCell>

              <TableCell>
                
                <TableNormal>{row.market_cap}</TableNormal>
              </TableCell>
              <TableCell>
                
                <TableNormal>{row.total_volume}</TableNormal>
              </TableCell>
              <TableCell className='circulating_supply'>
                <Typography
                  style={{ fontWeight: 700, marginRight: '10px' }}
                  className='coin-circulating_supply'
                >
                  {row.circulating_supply}
                </Typography>

                <Typography style={{ fontWeight: 700 }} className='coin-symbol'>
                  {row.symbol}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
