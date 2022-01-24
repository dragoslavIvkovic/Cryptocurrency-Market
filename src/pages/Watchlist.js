import {
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import '../_styles/Coin.scss'
import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/GlobalState'
import {
  StarBorder,
  Info,
  ArrowDropUp,
  ArrowDropDown,
  Search,
  Star
} from '@mui/icons-material';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Watchlist () {
  const { coins, watchlist, setWatchlist,user, setAlert, } = useContext(StateContext)

  const results = coins.filter(item => watchlist?.includes(item.id))

    const addToWatchlist = async (row) => {
    const coinRef = doc(db, "watchlist", user.uid);
  
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, row?.id] : [row?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${row.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async (row) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== row?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${row.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ overflow: 'hidden' }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell pl={9}></TableCell>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>24h %</TableCell>
            <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
              Total Volume
              <Tooltip title='A measure of how much of a cryptocurrency was traded in the last 24 hours.'>
                <Info
                  color='disabled'
                  sx={{
                    fontSize: 'large',

                    verticalAlign: 'middle'
                  }}
                />
              </Tooltip>
            </TableCell>
            <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
              Market Cap
              <Tooltip
                title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
Market Cap = Current Price x Circulating Supply."
              >
                <Info
                  color='disabled'
                  sx={{
                    fontSize: 'large',
                    verticalAlign: 'middle'
                  }}
                />
              </Tooltip>
            </TableCell>
            <TableCell align='left'>
              Circulating Supply
              <Tooltip title='The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.'>
                <Info
                  color='disabled'
                  sx={{
                    fontSize: 'large',
                    verticalAlign: 'middle'
                  }}
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        {results.map(row => (
          <TableRow
            className='table-coin'
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align='left'>
              <Box>
                 {user && (watchlist.indexOf(row.id) === -1 ? (
                    <Tooltip title='Add to Watchlist '>
                      <IconButton>
                        <StarBorder
                          onClick={() => addToWatchlist(row)}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title='Remove from watchlist'>
                      <IconButton>
                        <Star
                          onClick={() =>
                           removeFromWatchlist(row)}
                             
                        />
                      </IconButton>
                    </Tooltip>
                  ))}
              </Box>
            </TableCell>
            <TableCell
              component='th'
              scope='coin'
              justifyContent='center'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={row.image}
                alt='alt'
                style={{
                  width: '30px',
                  maxHeight: '30px'
                }}
              />
              <Typography mx={1} className='coin_name'>
                {row.name}
              </Typography>
              <Typography className='coin_symbol'>{row.symbol}</Typography>
              <Link mx={1} className='link__details' to={`/coin/${row.id}`}>
                <Button className='btn-buy__coin'>Buy</Button>
              </Link>
            </TableCell>
            {/* <TableCell align='left'>{coin.symbol}</TableCell> */}
            <TableCell align='left'>
              <Typography className='coin_price' style={{ fontWeight: 700 }}>
                {row.current_price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </Typography>
            </TableCell>
            <TableCell align='left'>
              {row.price_change_24h < 0 ? (
                <Typography
                  style={{
                    color: 'red',
                    backgroundColor: '#FCE8E6',
                    borderRadius: '8px',
                    padding: '3px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <ArrowDropDown sx={{ fill: 'red' }} />
                  {row.price_change_24h?.toFixed(2)}%
                </Typography>
              ) : (
                <Typography
                  style={{
                    color: 'green',
                    backgroundColor: '#E6F4EA',
                    borderRadius: '8px',
                    padding: '3px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <ArrowDropUp style={{ fill: 'green' }} />{' '}
                  {row.price_change_24h?.toFixed(2)}%
                </Typography>
              )}
            </TableCell>
            <TableCell align='left'> {row.market_cap}</TableCell>
            <TableCell align='left'> {row.total_volume}</TableCell>
            <TableCell align='left' className='circulating_supply'>
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
      </Table>
    </Paper>
  )
}
