import { PaletteMode } from "@mui/material";
import { lightGreen, deepPurple, purple, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: lightGreen,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: lightGreen,
          divider: lightGreen[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: purple,
          divider: purple[700],
          background: {
            default: purple[900],
            paper: purple[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default theme;
