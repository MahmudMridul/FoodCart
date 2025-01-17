import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		black: {
			main: grey[900],
			light: grey[800],
		},
		white: {
			main: grey[50],
		},
	},
});
