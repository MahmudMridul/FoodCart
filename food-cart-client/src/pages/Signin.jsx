import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Signin() {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleUsernameEmail(e) {
    const v = e.target.value;
    setUsernameEmail(v);
  }

  function handlePassword(e) {
    const v = e.target.value;
    setPassword(v);
  }

  function handleSignin() {}

  function gotoSignup() {}

  return (
    <Box
      sx={{
        height: "97vh",
        width: "97vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mb: 3, width: 300, display: "inherit" }}
          required
          label="Username or Email"
          type="text"
          size="small"
          value={usernameEmail}
          onChange={handleUsernameEmail}
        />

        <FormControl size="small" variant="outlined" required>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            sx={{ width: 300, mb: 3 }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={handlePassword}
          />
        </FormControl>

        <Button
          sx={{ width: 300, mb: 3 }}
          variant="outlined"
          onClick={handleSignin}
          disabled={usernameEmail.length === 0 || password.length === 0}
        >
          Sign In
        </Button>

        <Typography
          sx={{ cursor: "pointer" }}
          align="right"
          color="info"
          onClick={gotoSignup}
        >
          Sign Up
        </Typography>
      </Box>
    </Box>
  );
}
