import { Button } from "@mui/material";
import PropType from "prop-types";

CustomButton.propTypes = {
	label: PropType.string.isRequired,
	size: PropType.string,
	variant: PropType.string,
	onClick: PropType.func.isRequired,
	disabled: PropType.bool,
	sx: PropType.object,
	startIcon: PropType.node,
	endIcon: PropType.node,
};

export default function CustomButton({
	label,
	size = "medium",
	variant = "outlined",
	onClick,
	disabled,
	sx,
	startIcon = null,
	endIcon = null,
}) {
	return (
		<Button
			size={size}
			variant={variant}
			onClick={onClick}
			disabled={disabled}
			sx={{
				backgroundColor: "black.main",
				color: "white.main",
				fontWeight: "bold",
				textTransform: "none",
				border: 0,
				"&:hover": {
					backgroundColor: "black.light",
				},
				...sx,
			}}
			startIcon={startIcon}
			endIcon={endIcon}
		>
			{label}
		</Button>
	);
}
