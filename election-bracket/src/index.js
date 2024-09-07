import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainControl from './components/MainControl/MainControl';
import store from './app/store'
import { Provider } from 'react-redux'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';


const materialTheme = materialExtendTheme({
  colorSchemes: {
    dark: {
      palette: {
        text: {
          primary: '#F0F0F0',
          secondary: '#969696',
          contrastText: "#fff"
        },
        background: {
          paper: '#000000',
        },
      },
    },
  },
});

var theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        text: {
          primary: '#F0F0F0',
          secondary: '#969696',
          contrastText: "#fff"
        },
        background: {
          paper: '#000000',
          // level1: "#880808"
          surface:"#0B0D0E"
        },
      },
    },
  },
});

localStorage.clear()

// theme['shadows'][1] = "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider defaultMode='dark' theme={theme}>
        <MainControl></MainControl>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
