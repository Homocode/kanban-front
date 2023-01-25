import { useRef, useState } from "react";
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
import { loginService } from "../services";

export default function SignIn({ setSignIn }) {
  const { login } = useAuth();
  const username = useRef(null);
  const userlastname = useRef(null);
  const useremail = useRef(null);
  const userpassword = useRef(null);
  const [emailAlreadyUse, setEmailAlreadyUse] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await login(
        loginService.userLoginData("signin", {
          useremail,
          userpassword,
          username,
          userlastname,
        })
      );
      username.current.value = "";
      userpassword.current.value = "";
      useremail.current.value = "";
      userpassword.current.value = "";
    } catch (e) {
      // eslint-disable-next-line default-case
      switch (e.message) {
        case "Bad Credentials":
          setEmailAlreadyUse(true);
          useremail.current.value = "";
          userpassword.current.value = "";
      }
      console.error(e);
    }
  };

  const resetTextFieldError = () => {
    if (emailAlreadyUse === true) {
      setEmailAlreadyUse(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container={true}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ minHeight: "100vh", mt: "10%" }}
      >
        <Paper elevation={3} sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
          <Typography
            sx={{ fontWeight: 500, mt: 1, mb: 1 }}
            variant="h5"
            align="center"
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSignIn}>
            <TextField
              name="username"
              margin="normal"
              type="text"
              fullWidth
              label="Name"
              inputRef={username}
              sx={{ mt: 2, mb: 1.5 }}
              required
            />
            <TextField
              name="userlastname"
              margin="normal"
              type="text"
              fullWidth
              label="Lastname"
              inputRef={userlastname}
              sx={{ mt: 2, mb: 1.5 }}
              required
            />
            <TextField
              name="useremail"
              margin="normal"
              type="text"
              fullWidth
              label="Email"
              inputRef={useremail}
              sx={{ mt: 2, mb: 1.5 }}
              required
              error={emailAlreadyUse}
              helperText={emailAlreadyUse ? "Email already used" : null}
              onChange={resetTextFieldError}
            />
            <TextField
              name="password"
              margin="normal"
              type="password"
              fullWidth
              label="Password"
              inputRef={userpassword}
              sx={{ mt: 1.5, mb: 1.5 }}
              required
            />

            <Box display="flex" sx={{ justifyContent: "space-around" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 2 / 3, mt: 1.5, mb: 1.5 }}
              >
                Sign In
              </Button>
            </Box>

            <Box display="flex" sx={{ justifyContent: "space-around" }}>
              <Typography sx={{ color: "#CFCFCF" }} variant="p">
                or
              </Typography>
            </Box>

            <Box display="flex" sx={{ justifyContent: "space-around" }}>
              <Button
                onClick={() => setSignIn(false)}
                variant="contained"
                sx={{ width: 1 / 2, mt: 1.5, mb: 3 }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
}
