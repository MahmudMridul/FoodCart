import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  function handleName() {}
  function handleEmail() {}

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handlePassword() {}
  function gotoSignin() {}
  function handleSignUp() {}

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
          label="First Name"
          type="text"
          size="small"
          value={name}
          placeholder="Elon"
          onChange={handleName}
        />

        <TextField
          sx={{ mb: 3, width: 300, display: "inherit" }}
          required
          label="Last Name"
          type="text"
          size="small"
          value={name}
          placeholder="Mask"
          onChange={handleName}
        />

        <TextField
          sx={{ mb: 3, width: 300, display: "inherit" }}
          required
          label="Username"
          type="text"
          size="small"
          value={name}
          placeholder="elon.mask"
          onChange={handleName}
        />

        <TextField
          sx={{ mb: 3, width: 300 }}
          error={emailError}
          required
          label="Email"
          type="email"
          size="small"
          value={email}
          placeholder="elon.mask@email.com"
          onChange={handleEmail}
        />

        <FormControl size="small" variant="outlined" required>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            sx={{ width: 300, mb: 0 }}
            error={passError}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={handlePassword}
          />
        </FormControl>

        <Typography sx={{ mt: 1 }} variant="caption" color="info">
          Password should have
        </Typography>
        <Typography
          variant="caption"
          color={
            password.length > 0 && isEightChars(password)
              ? "success"
              : "warning"
          }
        >
          at least 8 characters
        </Typography>
        <Typography
          variant="caption"
          color={containsBothCases(password) ? "success" : "warning"}
        >
          capital and small letters
        </Typography>
        <Typography
          variant="caption"
          color={containsNumber(password) ? "success" : "warning"}
        >
          at least 1 numeric character
        </Typography>
        <Typography
          sx={{ mb: 4 }}
          variant="caption"
          color={containsSpecialCharacter(password) ? "success" : "warning"}
        >
          at least 1 special character
        </Typography>

        <Button
          sx={{ width: 300, mb: 3 }}
          variant="outlined"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Typography
          sx={{ cursor: "pointer" }}
          align="right"
          color="info"
          onClick={gotoSignin}
        >
          Sign In
        </Typography>
      </Box>
    </Box>
  );
}
