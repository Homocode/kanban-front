import { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import SignIn from "./SignIn";
import { userLoginData } from "../utils";

export default function LogIn() {
  const { login } = useAuth();
  const useremail = useRef(null);
  const userpassword = useRef(null);
  const [badCredentials, setBadCredentials] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(userLoginData("login", { useremail, userpassword }));
    } catch (e) {
      switch (e.message) {
        case "Bad Credentials":
          setBadCredentials(true);
          useremail.current.value = "";
          userpassword.current.value = "";
          break;
        default:
          break;
      }
    }
  };

  const resetTextFieldError = () => {
    if (badCredentials === true) {
      setBadCredentials(false);
    }
  };

  const handleCallbackResponse = async (response) => {
    const userObject = await jwt_decode(response.credential);
    const userCredentials = userLoginData("signin", userObject);
    try {
      await login(userCredentials);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "535646579832-5sv3q8icekuaits1pulu119kn8d5nlic.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInBtn-wrapper"),
      {
        theme: "outline",
        size: "large",
        text: "continue_with",
      }
    );
  });

  return (
    <>
      {signIn ? (
        <SignIn handleLogin={handleLogin} />
      ) : (
        <Container maxWidth="xs">
          <Grid
            container={true}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ minHeight: "100vh", mt: "10%" }}
          >
            <Paper
              elevation={3}
              sx={{ padding: "1.2em", borderRadius: "0.5em" }}
            >
              <Typography
                align="center"
                sx={{ fontWeight: 500, mt: 1, mb: 1 }}
                variant="h5"
              >
                Log in
              </Typography>
              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  name="useremail"
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Email"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  inputRef={useremail}
                  error={badCredentials}
                  onChange={resetTextFieldError}
                />
                <TextField
                  name="password"
                  margin="normal"
                  type="password"
                  fullWidth
                  label="Password"
                  sx={{ mt: 1.5, mb: 1.5 }}
                  required
                  inputRef={userpassword}
                  error={badCredentials}
                  onChange={resetTextFieldError}
                />

                <Box display="flex" sx={{ justifyContent: "space-around" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: 2 / 3, mt: 1.5, mb: 1.5 }}
                  >
                    Log In
                  </Button>
                </Box>

                <Box display="flex" sx={{ justifyContent: "space-around" }}>
                  <Typography sx={{ color: "#CFCFCF" }} variant="p">
                    or
                  </Typography>
                </Box>

                <Box display="flex" sx={{ justifyContent: "space-around" }}>
                  <Button
                    onClick={() => setSignIn(true)}
                    type="submit"
                    variant="contained"
                    sx={{ width: 1 / 2, mt: 1.5, mb: 3 }}
                  >
                    Sign In
                  </Button>
                </Box>

                <Box display="flex" sx={{ justifyContent: "space-around" }}>
                  <Typography sx={{ mb: 1, color: "#CFCFCF" }} variant="p">
                    __________________ or __________________
                  </Typography>
                </Box>

                <Box
                  id="signInBtn-wrapper"
                  display="flex"
                  data-type="standard"
                  sx={{ mt: 1.5, mb: 3, justifyContent: "space-around" }}
                />
              </Box>
            </Paper>
          </Grid>
        </Container>
      )}
    </>
  );
}
