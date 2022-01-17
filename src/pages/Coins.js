import React, { useContext, useState } from 'react'

import { StateContext } from '../context/GlobalState'
import '../_styles/Coin.scss'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Image,
  Typography,
  Box,
  Grid,
  TextField,
  Container,
  Stack,
  FormControl,
  Button,
  Tooltip,
  InputAdornment,
  InputBase,
  IconButton
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import InfoIcon from '@mui/icons-material/Info'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';

function Coins () {
  const [search, setSearch] = useState('');
  const [data,setData] = useState([]);
  const { coins,watchlist,setWatchlist } = useContext(StateContext);
   const [clicked, setClicked] = useState(false)

  const filteredCoins = coins.filter(
    coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    setSearch(e.target.value)
  }

console.log(watchlist);



  return (
    <Container sx={{ width: '80vw', marginTop: '5rem' }} className=''>
      <Grid align='center' mb={2}>
        <FormControl>
          <Typography className='coin-text'>Search a currency</Typography>

          <Paper
            elevation={3}
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              className='coin-search'
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </FormControl>
      </Grid>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell pl={9}>
                <Tooltip title='Add to watchlist' >
                <StarBorderIcon  />
                </Tooltip>
              </TableCell>
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
          <TableBody>
            {filteredCoins.map((row) => (
              <TableRow
                className='table-row'
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>
                  {/* <Tooltip title='Add to watchlist'> */}
                  
             {/* <Box>   { watchlist.includes(row.id) ? (
             <StarIcon onClick={(e) => setWatchlist = watchlist.filter(item => item !== e.target.value)}   />
           ) : (<StarBorderIcon  onClick={() => setWatchlist (watchlist => [...watchlist, row.id])}   /> )
           
            }
            </Box> */}
             <Box>   { (watchlist.indexOf(row.id) === -1) ? (
             <StarBorderIcon onClick={() =>    setWatchlist([...watchlist, row.id])}   />
           ) : (<StarIcon  onClick={() => setWatchlist (watchlist.filter((el) => {
        return el !== row.id}))}   /> )
           
            }
            </Box>
             
        

                  {/* </Tooltip> */}
                </TableCell>
                <TableCell
                  component='th'
                  scope='row'
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
                {/* <TableCell align='left'>{row.symbol}</TableCell> */}
                <TableCell align='left'>
                  <Typography
                    className='coin_price'
                    style={{ fontWeight: 700 }}
                  >
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
                      <ArrowDropDownIcon sx={{ fill: 'red' }} />
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
                      <ArrowDropUpIcon style={{ fill: 'green' }} />{' '}
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

                  <Typography
                    style={{ fontWeight: 700 }}
                    className='coin-symbol'
                  >
                    {row.symbol}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* {filteredCoins.map(coin => {
        return (
          <>
            <CoinProps
              key={coin.id}
              image={coin.image}
              name={coin.name}
              current_price={coin.current_price}
              symbol={coin.symbol}
             price_change_24h={coin.price_change_percentage_24h}
            />
           <Link to={`/coin/${coin.id}`}>
              <button className='view-detail-btn'>View Details</button>
            </Link>
          </>
        )
      })} */}
    </Container>
  )
}

export default Coins
