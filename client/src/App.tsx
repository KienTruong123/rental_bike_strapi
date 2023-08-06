import { CssBaseline, Snackbar, ThemeProvider } from "@mui/material"; // Import BrowserRouter and related components
import { Home } from "./components/Home";
import Profile from "./components/Profile"; // Import the Profile component
import { useThemeContext } from "./theme/ThemeContextProvider";
import NavigatorBar from "./layouts/Navbar";
import SignIn from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import Notification from "./layouts/Noftification";
import { Footer } from "./layouts/Footer";

let router = createBrowserRouter([
  {
    path: "/",
    Component: NavigatorBar,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/login",
    Component: SignIn,
  },
]);

export const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Notification/>
      <RouterProvider router={router} fallbackElement={<Fallback />} />
      <Footer/>
    </ThemeProvider>
  );
};

export function Fallback() {
  return <p>Performing initial data load</p>;
}
