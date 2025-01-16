import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function LoadingScreen() {
	const loading = useSelector((store) => store.app.loading);
	return (
		<div>
			<Backdrop
				sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}
