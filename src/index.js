import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from './App'
import { StateProvider } from './context/GlobalState'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Router>
        {' '}
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>,
  rootElement
)
