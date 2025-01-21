import { IconButton } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: -12px;
		right: -6px;
	}
`;

export default function CartIcon() {
	const navigate = useNavigate();
	const cartItemCount = useSelector((store) => store.app.cartItemCount);

	function gotoCartItems() {
		navigate("cart");
	}

	return (
		<IconButton sx={{ mx: 1 }} onClick={gotoCartItems}>
			<ShoppingCartRoundedIcon sx={{ color: "white.main" }} />
			<CartBadge
				badgeContent={cartItemCount}
				sx={{ color: "white.main" }}
				overlap="circular"
			/>
		</IconButton>
	);
}
