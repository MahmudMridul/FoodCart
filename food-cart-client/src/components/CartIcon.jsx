import { IconButton } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { useState } from "react";

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: -12px;
		right: -6px;
	}
`;

export default function CartIcon() {
	const [itemCount, setItemCount] = useState(0);
	return (
		<IconButton sx={{ mx: 1 }}>
			<ShoppingCartRoundedIcon sx={{ color: "white.main" }} />
			<CartBadge
				badgeContent={itemCount}
				sx={{ color: "white.main" }}
				overlap="circular"
			/>
		</IconButton>
	);
}
