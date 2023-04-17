import { createContext, useContext, useState, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LogoutIcon from "@mui/icons-material/Logout";

import Jokes from "./components/jokes/jokes";
import { Detail } from "./components/jokes/detail";
import { NewJoke } from "./components/jokes/new";
import { Login } from "./components/login";
import { useNavigate } from "react-router-dom";


import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

  const token = localStorage.getItem("token");

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/');

  }

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        height: "100vh",
      }}
    >
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              JOKES APP
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                control={
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                }
                label={theme.palette.mode + " mode"}
              />
              {token && (
                <FormControlLabel
                  control={
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={logout}
                      color="inherit"
                    >
                      <LogoutIcon />
                    </IconButton>
                  }
                  label="Logout"
                />
              )}
            </FormGroup>
          </Box>
        </Toolbar>
      </AppBar>

      {location.pathname === "/" ? (
        <Grid
          sx={{
            width: "100%",
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,60,253,1) 100%)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Jokes Home Page</h1>

          {token ? (
            <Link to="jokes" className="add">
              View Jokes List
            </Link>
          ) : (
            <Link to="login" className="add">
              Login
            </Link>
          )}
        </Grid>
      ) : null}

      <Outlet />
    </Grid>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
          <Link to="/">Home</Link>
          <Link to="jokes">Jokes</Link>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="jokes" element={<Jokes />}>
                <Route path=":id" element={<Detail />} />
                <Route path="new" element={<NewJoke />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
