import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1500,
			xxl: 1800,
			xxxl: 2100,
		},
	},
	palette: {
		black: {
			main: grey[900],
			light: grey[700],
		},
		white: {
			main: grey[50],
		},
	},
});
