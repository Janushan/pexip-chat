import React, { useState } from "react";

import Home from "./pages/home";

import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Grid, Switch, Typography } from "@material-ui/core";

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
  const [redTheme, setRedMode] = useState(false);

  const RED_THEME = createMuiTheme({
    palette: {
      primary: {
        main: "#f50057",
        light: "#E8EEF8",
        dark: "#2653A6",
      },
    },
    typography: TYPOGRAPHY,
    overrides: {
      MuiTab: {
        root: {
          textTransform: "none",
          fontSize: "1.15rem",
          fontWeight: 600,
          paddingBottom: "1.5rem",
          paddingTop: "1.5rem",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        },
      },
      MuiInputBase: {
        root: {
          "& .Mui-focused": {
            color: "green",
          },
          color: "#11263f",
        },
      },
      MuiOutlinedInput: {
        multiline: {
          paddingLeft: "1.2rem",
        },
      },
      MuiTextField: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "lightgrey",
            },
            "&:hover fieldset": {
              borderColor: "#747D8C",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#747D8C",
              borderWidth: "1px",
            },
          },
        },
      },
      MuiButton: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          height: "3.6rem",
        },
      },
    },
  });

  const DEFAULT_THEME = createMuiTheme({
    palette: {
      primary: {
        main: "#237BDE",
        light: "#E8EEF8",
        dark: "#2653A6",
      },
    },
    typography: TYPOGRAPHY,
    overrides: {
      MuiTab: {
        root: {
          textTransform: "none",
          fontSize: "1.15rem",
          fontWeight: 600,
          paddingBottom: "1.5rem",
          paddingTop: "1.5rem",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        },
      },
      MuiInputBase: {
        root: {
          "& .Mui-focused": {
            color: "green",
          },
          color: "#11263f",
        },
      },
      MuiOutlinedInput: {
        multiline: {
          paddingLeft: "1.2rem",
        },
      },
      MuiTextField: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              // borderColor: "red",
            },
            "&:hover fieldset": {
              borderColor: "#747D8C",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#747D8C",
              borderWidth: "1px",
            },
          },
        },
      },
      MuiButton: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          height: "3.6rem",
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={redTheme ? RED_THEME : DEFAULT_THEME}>
      <StylesProvider injectFirst>
        <Home />
        <Grid
          className={"themeSwitchContainer"}
          container
          direction="row"
          alignItems="center"
        >
          <Typography>Theme Switcher:</Typography>
          <Switch checked={redTheme} onChange={() => setRedMode(!redTheme)} />
        </Grid>
      </StylesProvider>
    </MuiThemeProvider>
  );
}

export default App;
