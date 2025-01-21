import { Box, Typography } from "@mui/material";
import CartIcon from "./CartIcon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "../slices/appSlice";
import CustomButton from "./CustomButton";

export default function NavBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));

	function handleSignout() {
		dispatch(signOut()).then((res) => {
			if (res.payload.success) {
				navigate("/");
			}
		});
	}

	return (
		<Box
			sx={{
				height: 40,
				width: "99%",
				mb: 2,
				px: 1.5,
				py: 1,
				borderRadius: 2,
				backgroundColor: "black.main",
				color: "white.main",
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<Typography sx={{ mx: 2 }} variant="subtitle1">
				{user.userName}
			</Typography>
			<CartIcon />
			<CustomButton
				label="Signout"
				onClick={handleSignout}
				color="white.main"
				variant="text"
				sx={{ mx: 1 }}
			/>
		</Box>
	);
}
