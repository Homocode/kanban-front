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
import { userLoginData } from "../utils";

export default function SignIn() {
  const { login, error } = useAuth();
  const username = useRef(null);
  const userlastname = useRef(null);
  const useremail = useRef(null);
  const userpassword = useRef(null);
  const [emailAlreadyUse, setEmailAlreadyUse] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(
        userLoginData("signin", {
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
      useremail.current.value = "";
      // eslint-disable-next-line default-case
      switch (e.message) {
        case "Bad Credentials":
          setEmailAlreadyUse(true);
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
    <Container id="El de afuera" maxWidth="xs">
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
            variant="h4"
            align="center"
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              name="username"
              margin="normal"
              type="text"
              fullWidth
              label="Name"
              sx={{ mt: 2, mb: 1.5 }}
              required
            />
            <TextField
              name="userlastname"
              margin="normal"
              type="text"
              fullWidth
              label="Lastname"
              sx={{ mt: 2, mb: 1.5 }}
              required
            />
            <TextField
              name="useremail"
              margin="normal"
              type="text"
              fullWidth
              label="Email"
              sx={{ mt: 2, mb: 1.5 }}
              required
              error={emailAlreadyUse}
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
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 1.5, mb: 3 }}
            >
              Sig In
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
}
