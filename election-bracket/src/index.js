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
          secondary: '#969696'
        },
        background: {
          paper: '#000000',
        },
        info: {
          plainColor: `var(--joy-palette-info-300)`,
          plainHoverBg: `var(--joy-palette-info-800)`,
          plainActiveBg: `var(--joy-palette-info-700)`,
          plainDisabledColor: `var(--joy-palette-info-800)`,
          outlinedColor: `var(--joy-palette-info-200)`,
          outlinedBorder: `var(--joy-palette-info-700)`,
          outlinedHoverBg: `var(--joy-palette-info-800)`,
          outlinedHoverBorder: `var(--joy-palette-info-600)`,
          outlinedActiveBg: `var(--joy-palette-info-900)`,
          outlinedDisabledColor: `var(--joy-palette-info-800)`,
          outlinedDisabledBorder: `var(--joy-palette-info-800)`,
          softColor: `var(--joy-palette-info-200)`,
          softBg: `var(--joy-palette-info-900)`,
          softHoverBg: `var(--joy-palette-info-800)`,
          softActiveBg: `var(--joy-palette-info-700)`,
          softDisabledColor: `var(--joy-palette-info-800)`,
          softDisabledBg: `var(--joy-palette-info-900)`,
          solidColor: `#fff`,
          solidBg: `var(--joy-palette-info-600)`,
          solidHoverBg: `var(--joy-palette-info-700)`,
          solidActiveBg: `var(--joy-palette-info-800)`,
          solidDisabledColor: `var(--joy-palette-info-700)`,
          solidDisabledBg: `var(--joy-palette-info-900)`,
        },
      },
    },
  },
});

console.log("theme")
console.log(theme)

// theme['shadows'][1] = "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={theme}>
        <MainControl></MainControl>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
