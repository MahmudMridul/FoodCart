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
import { useEffect, useState } from "react";
import {
	hasLowerCase,
	hasMinLength,
	hasNumber,
	hasSpecialChar,
	hasUpperCase,
	isValidEmail,
	isValidName,
	isValidUsername,
} from "../helpers/functions";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/appSlice";

export default function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [minLength, setMinLength] = useState(true);
	const [upperCase, setUpperCase] = useState(true);
	const [lowerCase, setLowerCase] = useState(true);
	const [number, setNumber] = useState(true);
	const [specialChar, setSpecialChar] = useState(true);

	const [validFirstName, setValidFirstName] = useState(true);
	const [validLastName, setValidLastName] = useState(true);
	const [validUsername, setValidUsername] = useState(true);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);

	useEffect(() => {
		const flag = minLength && upperCase && lowerCase && number && specialChar;
		setValidPassword(flag);
	}, [minLength, upperCase, lowerCase, number, specialChar]);

	const validInput =
		firstName.length > 0 &&
		validFirstName &&
		lastName.length > 0 &&
		validLastName &&
		userName.length > 0 &&
		validUsername &&
		email.length > 0 &&
		validEmail &&
		password.length >= 8 &&
		minLength &&
		upperCase &&
		lowerCase &&
		number &&
		specialChar;

	function handleFirstName(e) {
		let v = e.target.value;

		if (v === "") {
			setValidFirstName(true);
			setFirstName(v);
			return;
		}

		if (!isValidName(v)) {
			setValidFirstName(false);
		} else {
			setValidFirstName(true);
		}
		setFirstName(v);
	}

	function handleLastName(e) {
		let v = e.target.value;

		if (v === "") {
			setValidLastName(true);
			setLastName(v);
			return;
		}

		if (!isValidName(v)) {
			setValidLastName(false);
		} else {
			setValidLastName(true);
		}
		setLastName(v);
	}

	function handleUsername(e) {
		let v = e.target.value;

		if (v === "") {
			setValidUsername(true);
			setUsername(v);
			return;
		}

		if (!isValidUsername(v)) {
			setValidUsername(false);
		} else {
			setValidUsername(true);
		}
		setUsername(v);
	}

	function handleEmail(e) {
		let v = e.target.value;

		if (v === "") {
			setValidEmail(true);
			setEmail(v);
			return;
		}

		if (!isValidEmail(v)) {
			setValidEmail(false);
		} else {
			setValidEmail(true);
		}
		setEmail(v);
	}

	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}

	function handlePassword(e) {
		let v = e.target.value;

		if (v === "") {
			setMinLength(true);
			setUpperCase(true);
			setLowerCase(true);
			setNumber(true);
			setSpecialChar(true);
			setPassword(v);
			return;
		}

		if (!hasMinLength(v)) {
			setMinLength(false);
		} else {
			setMinLength(true);
		}

		if (!hasUpperCase(v)) {
			setUpperCase(false);
		} else {
			setUpperCase(true);
		}

		if (!hasLowerCase(v)) {
			setLowerCase(false);
		} else {
			setLowerCase(true);
		}

		if (!hasNumber(v)) {
			setNumber(false);
		} else {
			setNumber(true);
		}

		if (!hasSpecialChar(v)) {
			setSpecialChar(false);
		} else {
			setSpecialChar(true);
		}
		setPassword(v);
	}

	function gotoSignin() {
		navigate("/");
	}
	function handleSignup() {
		const payload = {
			firstName,
			lastName,
			userName,
			email,
			password,
		};
		dispatch(signUp(payload));
	}

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
					error={!validFirstName}
					helperText={
						!validFirstName
							? "First name should contain letters and spaces only"
							: ""
					}
					type="text"
					size="small"
					value={firstName}
					placeholder="Elon"
					onChange={handleFirstName}
				/>

				<TextField
					sx={{ mb: 3, width: 300, display: "inherit" }}
					required
					label="Last Name"
					error={!validLastName}
					helperText={
						!validLastName
							? "Last name should contain letters and spaces only"
							: ""
					}
					type="text"
					size="small"
					value={lastName}
					placeholder="Mask"
					onChange={handleLastName}
				/>

				<TextField
					sx={{ mb: 3, width: 300, display: "inherit" }}
					required
					label="Username"
					error={!validUsername}
					helperText={
						!validUsername
							? "Username must contain letters, at least 1 number and no space"
							: ""
					}
					type="text"
					size="small"
					value={userName}
					placeholder="elon.mask"
					onChange={handleUsername}
				/>

				<TextField
					sx={{ mb: 3, width: 300 }}
					required
					label="Email"
					error={!validEmail}
					helperText={!validEmail ? "Invalid email address" : ""}
					type="email"
					size="small"
					value={email}
					placeholder="elon.mask@email.com"
					onChange={handleEmail}
				/>

				<FormControl size="small" variant="outlined" required>
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						sx={{ width: 300, mb: !validPassword ? 0 : 3 }}
						error={!validPassword}
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

				{!validPassword ? (
					<>
						<Typography sx={{ mt: 1 }} variant="caption" color="info">
							Password should have
						</Typography>
						<Typography
							variant="caption"
							color={password.length >= 8 ? "success" : "warning"}
						>
							at least 8 characters
						</Typography>
						<Typography
							variant="caption"
							color={
								hasLowerCase(password) && hasUpperCase(password)
									? "success"
									: "warning"
							}
						>
							capital and small letters
						</Typography>
						<Typography
							variant="caption"
							color={hasNumber(password) ? "success" : "warning"}
						>
							at least 1 numeric character
						</Typography>
						<Typography
							sx={{ mb: 4 }}
							variant="caption"
							color={hasSpecialChar(password) ? "success" : "warning"}
						>
							at least 1 special character
						</Typography>
					</>
				) : null}

				<Button
					sx={{ width: 300, mb: 3 }}
					variant="outlined"
					onClick={handleSignup}
					disabled={!validInput}
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
