import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import { setAppMaxWidth } from "../helpers/functions";

export default function Home() {
	return (
		<Container maxWidth={setAppMaxWidth()} disableGutters>
			<NavBar />
			<Outlet />
		</Container>
	);
}
