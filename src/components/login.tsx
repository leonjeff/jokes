import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
    token: "",
  });

  const ExecLogin = async () => {
    try {
      const response = await fetch(
        `https://retoolapi.dev/HYh8EK/user?user=${loginForm.user}&password=${loginForm.password}`
      );
      const data = await response.json();
      setLoginForm({ ...loginForm, token: data[0].token });
      localStorage.setItem("token", data[0].token);
      navigate('/jokes');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Grid>
      <h1>Login</h1>

      <Grid
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item sx={{ display: "flex", flexDirection: "row" }}>
          <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
            <FormHelperText>User</FormHelperText>
            <TextField
              value={loginForm.user}
              onChange={(e) =>
                setLoginForm({ ...loginForm, user: e.target.value })
              }
            />
          </FormControl>
          <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
            <FormHelperText>Password</FormHelperText>
            <TextField
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </FormControl>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ m: 5, width: "10%" }} variant="outlined">
            <Button variant="contained" onClick={ExecLogin}>
              Login
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Login };
