import { Button } from "@mui/material";
import PropType from "prop-types";

CustomButton.propTypes = {
	label: PropType.string.isRequired,
	size: PropType.string,
	variant: PropType.string,
	color: PropType.string,
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
	color = "primary",
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
			color={color}
			onClick={onClick}
			disabled={disabled}
			sx={{ fontWeight: "bold", textTransform: "none", ...sx }}
			startIcon={startIcon}
			endIcon={endIcon}
		>
			{label}
		</Button>
	);
}
