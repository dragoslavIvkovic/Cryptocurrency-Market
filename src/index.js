import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { ThemeCtxProvider, useThemeMode } from "./context/themeContext";
import { light, dark } from "./theme";
import { StateProvider } from './context/GlobalState'

const Root = () => {
  const { darkMode } = useThemeMode();
  let theme = React.useMemo(() => {
    return createTheme(darkMode ? dark : light);
  }, [darkMode]);

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

// Start the Rendering from the
// Root component
ReactDOM.render(
  <React.StrictMode>
  <StateProvider>
    <ThemeCtxProvider>
    
     <Router> <Root /></Router>
     
    </ThemeCtxProvider></StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);