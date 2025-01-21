import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

export default function Home() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}
