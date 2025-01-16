import { Button } from "@mui/material";
import PropType from "prop-types";

CustomButton.propTypes = {
	label: PropType.string.isRequired,
	size: PropType.string,
	variant: PropType.string,
	onClick: PropType.func.isRequired,
	disabled: PropType.bool,
	sx: PropType.object,
};

export default function CustomButton({
	label,
	size,
	variant,
	onClick,
	disabled,
	sx,
}) {
	return (
		<Button
			size={size ? size : "medium"}
			variant={variant ? variant : "outlined"}
			onClick={onClick}
			disabled={disabled}
			sx={{ fontWeight: "bold", textTransform: "none", ...sx }}
		>
			{label}
		</Button>
	);
}
