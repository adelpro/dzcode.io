import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import createTheme from "@material-ui/core/styles/createTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { FC } from "react";
import { useSliceSelector } from "src/redux/selectors";

import { darkPalette } from "./palettes/dark";
import { lightPalette } from "./palettes/light";

export const Theme: FC = (props) => {
  const { darkMode, language } = useSliceSelector("settings");

  const theme = createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    direction: language.code === "ar" ? "rtl" : "ltr",
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <CssBaseline />
    </ThemeProvider>
  );
};
