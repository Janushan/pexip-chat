import React from "react";

import Home from "./pages/home";

import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.scss";

const TYPOGRAPHY = {
  fontFamily: ["Open Sans", "Arial", "sans-serif"].join(","),
  htmlFontSize: 14,
  h1: {
    fontSize: 32,
    fontWeight: 700,
  },
  h2: {
    fontSize: 24,
    fontWeight: 500,
  },
  h3: {
    fontSize: 22,
    fontWeight: 500,
  },
  h4: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  h5: {
    fontSize: "1.1rem",
    fontWeight: 700,
  },
  body1: {
    fontSize: "1.1rem",
  },
};

function App() {
  const DEFAULT_THEME = createMuiTheme({
    palette: {
      primary: {
        main: "#237BDE",
        light: "#E8EEF8",
        dark: "#2653A6",
      },
    },
    typography: TYPOGRAPHY,
  });

  return (
    <MuiThemeProvider theme={DEFAULT_THEME}>
      <StylesProvider injectFirst>
        <Home />
      </StylesProvider>
    </MuiThemeProvider>
  );
}

export default App;
