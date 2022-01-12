import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/GlobalState";
import { Link, useParams } from "react-router-dom";
import "../_styles/CoinDetails.scss";
// import CoinProps from './CoinProps';
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import coinGecko from "../api/coinGecko";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { borderRadius, Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  Grid,
  Paper,
  Divider,
  CardMedia,
  Typography,
  CardHeader,
  BorderLinearProgress,
  Tooltip,TableRow
} from "@mui/material";
import axios from "axios";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentNeutralRoundedIcon from "@mui/icons-material/SentimentNeutralRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";

function CoinDetails() {
  const { coinId } = useParams();
  const { coins } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [marketChart, setMarketChart] = useState({});
  const [dayAgo, setDaysAgo] = useState("24h");
  const [cryptData, setCryptData] = useState({});

  const thisCoin = coins.filter((coin) => coin.coinId === coinId);

  let dates = [...Array(dayAgo)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  let datesLabel = dates.reverse();

  let hours = [...Array(24)].map((_, i) => {
    const d = new Date();
    let hour = d.getHours() - i;
    return hour < 0 ? 24 - Math.abs(hour) : hour;
  });

  let hoursLabels = hours.reverse();

  const getMarketChart = async () => {
    await axios;
    coinGecko
      .get(
        `/coins/${coinId}/market_chart?vs_currency=usd&days=${dayAgo}&interval=daily`
      )
      .then((res) => {
        setMarketChart(res.data.prices);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMarketChart();
  }, [dayAgo]);

  const getCryptoData = async () => {
    await axios;
    coinGecko
      .get(
        `/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      )
      .then((res) => {
        setCryptData(res.data);
        console.log("xx", res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCryptoData();
  }, []);

  let colorTrustScore = cryptData.tickers?.[0].trust_score;

  console.log(colorTrustScore);

  const data = {
    labels: dayAgo === "24h" ? hoursLabels : datesLabel,

    datasets: [
      {
        label: `${coinId} price change in $`,

        data: marketChart,
        fill: true,
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "red",

        pointHoverRadius: 5,
      },
    ],
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          float: "right",
          mr: "3vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
          className="data-container"
        >
          <Grid className="box-data" elevation={1} padding={2} sx={{}}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ color: "gray", justifyContent: "space-between" }}
            >
               <Box display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ justifyContent: "space-between", mx: "0.5vh" }}
            >
                <Typography sx={{ mx: "5px",fontWeight:"900", fontSize:"1vw" }}>{cryptData.name}</Typography>
                <Typography sx={{ mx: "5px",fontWeight:"900", fontSize:"1vw" }}>Price</Typography>
                <Typography
                  sx={{ textTransform: "uppercase", fontWeight: "bold", fontWeight:"900", fontSize:"1vw"}} 
                >
                  ({cryptData.symbol})
                </Typography>
              </Box>

              <Box display="flex"
              flexDirection="row"
              alignItems="center" 
              sx={{ justifyContent: "space-between",mx:"0.5vh" }}
            >
              
                {colorTrustScore === "green" ? (
                  <SentimentSatisfiedRoundedIcon style={{ fill: "green" }} />
                ) : colorTrustScore === "yellow" ? (
                  <SentimentNeutralRoundedIcon style={{ fill: "yellow" }} />
                ) : (
                  <SentimentDissatisfiedRoundedIcon style={{ fill: "red" }} />
                )}{" "}
                <Typography >Trust score</Typography>
              </Box>
            </Box>
            <Box display="flex"
              flexDirection="row"
              alignItems="center" mt="1vh"
              sx={{ justifyContent: "space-between", mb: "0.5vh" }}
            >
              <Typography
                sx={{ fontSize: "1.5vw", fontWeight: "700", mr: "0.5vw" }}
              >
                {cryptData?.market_data?.current_price?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </Typography>
              <Typography>
                {cryptData.market_data?.price_change_24h < 0 ? (
                  <Typography
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: "8px",
                      padding: "3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <ArrowDropDownIcon sx={{ fill: "white" }} />
                    {cryptData.market_data?.price_change_24h?.toFixed(2)}%
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      color: "white",
                      backgroundColor: "green",
                      borderRadius: "8px",
                      padding: "3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <ArrowDropUpIcon style={{ fill: "white" }} />
                    {cryptData.market_data?.price_change_24h?.toFixed(2)}%
                  </Typography>
                )}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center" mt="2vh"
              sx={{ justifyContent: "space-between", mb: "0.5vh" }}
            >
              <Typography sx={{ color: "red", fontWeight: "700" }}>
                Low:{" "}
                {cryptData.market_data?.low_24h?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
              <Typography sx={{ color: "green", fontWeight: "700" }}>
                High:{" "}
                {cryptData.market_data?.high_24h?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
          </Grid>
          

          <Grid elevation={1} className="box-data" padding={2}>
            <Typography align="center" sx={{fontWeight:"900", fontSize:"1vw", mb:"1vh"}}>Converted value</Typography>
            <Box
              display="flex"
              flexDirection="column"
              align="center"
              sx={{ justifyContent: "space-between" }}
            >
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{ justifyContent: "space-between" }}
              >
                {" "}
                {/* <Typography sx={{ fontWeight: '700' }}>
                  {' '}
                  {cryptData.market_data?.max_supply}
                </Typography> */}
              </Grid>

              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center" mt="1vh"
                sx={{ justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900", fontSize: "1vw" }}>
                  {" "}
                  {cryptData?.tickers?.[0]?.converted_last?.btc}
                </Typography><Divider sx={{width: "40%",display:"inline"}}></Divider>
                <Typography sx={{ fontWeight: "900", fontSize: "1vw", color: 'text.secondary' }}>BTC</Typography>
              </Grid>
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"  mt="1vh"
                sx={{ justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900", fontSize: "1vw" }}>
                  {" "}
                  {cryptData?.tickers?.[0]?.converted_last?.eth}
                </Typography><Divider sx={{width: "40%",display:"inline"}}></Divider>
                <Typography sx={{ fontWeight: "900", fontSize: "1vw", color: 'text.secondary' }}>ETH</Typography>
              </Grid>
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center" mt="1vh" 
                sx={{ justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900", fontSize: "1vw" }}>
                  {" "}
                  {cryptData?.tickers?.[0]?.converted_last?.usd}
                </Typography><Divider sx={{width: "40%",display:"inline"}}></Divider>
                <Typography sx={{ fontWeight: "900", fontSize: "1vw", color: 'text.secondary' }}>USD</Typography>
              </Grid>

              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{ justifyContent: "space-between" }}
              >
                {" "}
                {/* <Typography sx={{ fontWeight: '700' }}>
                  {' '}
                  {cryptData.market_data?.total_supply}
                </Typography> */}
              </Grid>
            </Box>
          </Grid>
          <Grid  elevation={1} className="box-data" padding={2}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center" 
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
              >
                Market Cap:{" "}
                <Tooltip
                  title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.

Market Cap = Current Price x Circulating Supply."
                >
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
              >
                Fully Diluted Market Cap:
                <Tooltip
                  title="The market cap if the max supply was in circulation.
Fully-diluted market cap (FDMC) = price x max supply. If max supply is null, FDMC = price x total supply. if max supply and total supply are infinite or not available, fully-diluted market cap shows."
                >
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center" mt="0.7vh"
              sx={{ justifyContent: "space-between" }}
            >
              <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                {cryptData.market_data?.market_cap?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </Typography>
              <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                {cryptData.market_data?.fully_diluted_valuation?.usd?.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"mt="0.7vh"
              sx={{ justifyContent: "space-between", mb: "0.5vh" }}
            >
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
                
              >
                Volume:{" "}
                <Tooltip title="A measure of how much of a cryptocurrency was traded in the last 24 hours.">
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
              >
                Circulating Supply:
                <Tooltip title="The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock marke">
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"mt="0.7vh"
              sx={{ justifyContent: "space-between" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{ justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                  {cryptData.market_data?.total_volume?.usd.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </Typography>
                <Typography sx={{ ml: "0.5vw", backgroundColor: "gray" }}>
                  24
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                {cryptData.market_data?.circulating_supply?.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center" mt="1vh"
              sx={{ justifyContent: "space-between", mb: "0.5vh" }}
            >
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
              >
                Max Supply :{" "}
                <Tooltip
                  title="The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency. It is analogous to the fully diluted shares in the stock market.
If this data has not been submitted by the project or verified by the CMC team, max supply shows - -."
                >
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: "700", fontSize: "0.7vw", color: "#B8B8B8" }}
              >
                Total Supply:
                <Tooltip
                  title="The amount of coins that have been already created, minus any coins that have been burned. It is analogous to the outstanding shares in the stock market.
If this data has not been submitted by the project or verified by the CMC team, total supply shows - -."
                >
                  <InfoIcon
                    color="disabled"
                    sx={{
                      fontSize: "large",
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ justifyContent: "space-between" }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{ justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                  {cryptData.market_data?.max_supply}
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: "900", fontSize: "0.8vw" }}>
                {cryptData.market_data?.total_supply}
              </Typography>
            </Box>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          align="center"
        >
          <Paper elevation={1} className="chart-box">
            <Button className="btn-days" onClick={(e) => setDaysAgo("24h")}>
              1D
            </Button>
            <Button className="btn-days" onClick={(e) => setDaysAgo(7)}>
              7D
            </Button>
            <Button className="btn-days" onClick={(e) => setDaysAgo(14)}>
              14D
            </Button>
            <Button onClick={(e) => setDaysAgo(30)}>1M</Button>
            <Button onClick={(e) => setDaysAgo(60)}>2M</Button>
            <Button onClick={(e) => setDaysAgo(90)}>3M</Button>
            <Line data={data} className="chart-data" />
          </Paper>
        </Box>
      </Box>

      <Box elevation={1} 
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor:"white",
          mt:"2vh",
          mx:"1vw", borderRadius:"8px"
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <img
            sx={{ width: "1vw", margin: "auto" }}
            src={cryptData?.image?.small}
            alt={coinId}
          />
          <Typography
            sx={{ fontWeight: "900", fontSize: "3vw", mx: "0.5vw" }}
            align="center"
          >
            {cryptData.name}
          </Typography>
          <Typography
            align="center"
            sx={{
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "1.2vw",
              mr: "0.5vw",
              backgroundColor: "#d3d3d3",
              borderRadius: "8px",
              padding: "2px",
              bottom: " 0",
            }}
          >
            {cryptData.symbol}
          </Typography>

          <StarBorderIcon
            sx={{
              border: "1px solid #d3d3d3",
              borderRadius: "8px",
              padding: "2px",
              fontSize: "2vw",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography
            align="center"
            sx={{
              fontSize: "1.5vw",
              fontWeight: "700",
              backgroundColor: "#d3d3d3",
              borderRadius: "8px",
              padding: "2px",
              mr: "1vw",
            }}
          >
            Rank:{cryptData.market_cap_rank}
          </Typography>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            `
            {cryptData?.description?.en
              .substring(0, 400)
              .replace(/<a\b[^>]*>/i, "")
              .replace(/<\/a>/i, "")}
            `
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <a
              href={cryptData?.links?.homepage[0]}
              target="_blank"
              rel="noreferrer noopener"
            >
              Read more on official {coinId} website - link <LinkIcon />
            </a>
            <a
              href={cryptData.links?.official_forum_url}
              target="_blank"
              rel="noreferrer noopener"
            >
              Official {coinId} forum <LinkIcon />
            </a>
          </Box>
        </CardContent>
        <Button align="center">TRADE</Button>
      </Box>
    </Box>
  );
}

export default CoinDetails;
