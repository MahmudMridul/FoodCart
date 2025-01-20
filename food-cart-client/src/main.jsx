import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "./theme.js";
import DetailModal from "./components/DetailModal.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<LoadingScreen />
				<DetailModal />
				<Container maxWidth="xxxl" disableGutters>
					<App />
				</Container>
			</ThemeProvider>
		</Provider>
	</StrictMode>
);
