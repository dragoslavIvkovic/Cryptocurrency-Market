import React, { useContext, useEffect, useState } from "react";

import { StateContext } from "../context/GlobalState";
import "../_styles/Coin.scss";
import { Link } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { StarBorder ,Info,ArrowDropUp,ArrowDropDown,Search,Star } from '@mui/icons-material';




function Coins() {
  const [search, setSearch] = useState("");
  const { coins, watchlist, setWatchlist } = useContext(StateContext);


  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container sx={{ width: "80vw", marginTop: "5rem" }} className="">
      <Grid align="center" mb={2}>
        <FormControl>
          <Typography className="coin-text">Search a currency</Typography>

          <Paper
            elevation={3}
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
              className="coin-search"
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
        </FormControl>
      </Grid>

      <TableContainer elevation={3} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title="Add to watchlist">
                  <StarBorder />
                </Tooltip>
              </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">24h %</TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Total Volume
                <Tooltip title="A measure of how much of a cryptocurrency was traded in the last 24 hours.">
                  <Info
                    color="disabled"
                    sx={{
                      fontSize: "large",

                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                Market Cap
                <Tooltip
                  title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
Market Cap = Current Price x Circulating Supply."
                >
                  <Info
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </TableCell>
              <TableCell align="left">
                Circulating Supply
                <Tooltip title="The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.">
                  <Info
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map((row) => (
              <TableRow
                className="table-row"
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {watchlist.indexOf(row.id) === -1 ? (
                    <Tooltip title="Add to Watchlist ">
                      <IconButton>
                        <StarBorder
                          onClick={() => setWatchlist([...watchlist, row.id])}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Remove from watchlist">
                      <IconButton>
                        <Star
                          onClick={() =>
                            setWatchlist(
                              watchlist.filter((el) => {
                                return el !== row.id;
                              })
                            )
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  justifyContent="center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={row.image}
                    alt="alt"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Typography mx={1} className="coin_name">
                    {row.name}
                  </Typography>
                  <Typography className="coin_symbol">{row.symbol}</Typography>
                  <Link mx={1} className="link__details" to={`/coin/${row.id}`}>
                    <Button className="btn-buy__coin">Buy</Button>
                  </Link>
                </TableCell>

                <TableCell align="left">
                  <Typography
                    className="coin_price"
                    style={{ fontWeight: 700 }}
                  >
                    {row.current_price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {row.price_change_24h < 0 ? (
                    <Typography
                      style={{
                        color: "red",
                        backgroundColor: "#FCE8E6",
                        borderRadius: "8px",
                        padding: "3px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <ArrowDropDown sx={{ fill: "red" }} />
                      {row.price_change_24h?.toFixed(2)}%
                    </Typography>
                  ) : (
                    <Typography
                      style={{
                        color: "green",
                        backgroundColor: "#E6F4EA",
                        borderRadius: "8px",
                        padding: "3px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <ArrowDropUp  style={{ fill: "green" }} />{" "}
                      {row.price_change_24h?.toFixed(2)}%
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="left"> {row.market_cap}</TableCell>
                <TableCell align="left"> {row.total_volume}</TableCell>
                <TableCell align="left" className="circulating_supply">
                  <Typography
                    style={{ fontWeight: 700, marginRight: "10px" }}
                    className="coin-circulating_supply"
                  >
                    {row.circulating_supply}
                  </Typography>

                  <Typography
                    style={{ fontWeight: 700 }}
                    className="coin-symbol"
                  >
                    {row.symbol}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Coins;
