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
} from '@mui/material';
import '../_styles/Coin.scss'
import React, { useContext } from 'react'
import { StateContext } from '../context/GlobalState'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import InfoIcon from '@mui/icons-material/Info'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import SearchIcon from '@mui/icons-material/Search'
import StarIcon from '@mui/icons-material/Star'

export default function Watchlist () {
  const { coins, watchlist, setWatchlist } = useContext(StateContext)

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
                <InfoIcon
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
                <InfoIcon
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
                <InfoIcon
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
        {watchlist.map(coin => (
          <TableRow
            className='table-coin'
            key={coin.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align='left'>
              <Box>
                {' '}
                {watchlist.indexOf(coin) === -1 ? (
                  <Tooltip title='Add to Watchlist '>
                    <IconButton>
                      {' '}
                      <StarBorderIcon
                        onClick={() => setWatchlist([...watchlist, coin])}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='Remove from watchlist'>
                    <IconButton>
                      {' '}
                      <StarIcon
                        onClick={() =>
                          setWatchlist(
                            watchlist.filter(el => {
                              return el !== coin
                            })
                          )
                        }
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              {/* </Tooltip> */}
            </TableCell>
            <TableCell
              component='th'
              scope='coin'
              justifyContent='center'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={coin.image}
                alt='alt'
                style={{
                  width: '30px',
                  maxHeight: '30px'
                }}
              />
              <Typography mx={1} className='coin_name'>
                {coin.name}
              </Typography>
              <Typography className='coin_symbol'>{coin.symbol}</Typography>
              <Link mx={1} className='link__details' to={`/coin/${coin.id}`}>
                <Button className='btn-buy__coin'>Buy</Button>
              </Link>
            </TableCell>
            {/* <TableCell align='left'>{coin.symbol}</TableCell> */}
            <TableCell align='left'>
              <Typography className='coin_price' style={{ fontWeight: 700 }}>
                {coin.current_price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </Typography>
            </TableCell>
            <TableCell align='left'>
              {coin.price_change_24h < 0 ? (
                <Typography
                  style={{
                    color: 'red',
                    backgroundColor: '#FCE8E6',
                    borderRadius: '8px',
                    padding: '3px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <ArrowDropDownIcon sx={{ fill: 'red' }} />
                  {coin.price_change_24h?.toFixed(2)}%
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
                  <ArrowDropUpIcon style={{ fill: 'green' }} />{' '}
                  {coin.price_change_24h?.toFixed(2)}%
                </Typography>
              )}
            </TableCell>
            <TableCell align='left'> {coin.market_cap}</TableCell>
            <TableCell align='left'> {coin.total_volume}</TableCell>
            <TableCell align='left' className='circulating_supply'>
              <Typography
                style={{ fontWeight: 700, marginRight: '10px' }}
                className='coin-circulating_supply'
              >
                {coin.circulating_supply}
              </Typography>

              <Typography style={{ fontWeight: 700 }} className='coin-symbol'>
                {coin.symbol}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Paper>
  )
}