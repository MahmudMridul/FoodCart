import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import { pushToCart, set, setCartItemCount, setOpen } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { trim } from "../helpers/functions";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Box } from "@mui/material";

CartItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
};

export default function CartItem({ title, desc, url, price, quantity }) {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.app);

	function handleDetail() {
		const item = { title, desc, url, price };
		dispatch(set({ key: "modalItem", value: item }));
		dispatch(setOpen(true));
	}

	function addToCart() {
		let item = cartItems.find((i) => i.title === title);
		if (item) {
			const updatedCartItems = cartItems.map((i) => {
				if (i.title === title) {
					return {
						...i,
						quantity: i.quantity + 1,
					};
				} else {
					return i;
				}
			});
			dispatch(set({ key: "cartItems", value: updatedCartItems }));
		} else {
			item = { title, desc, url, price, quantity: 1 };
			dispatch(pushToCart(item));
		}
		dispatch(setCartItemCount());
	}

	function removeFromCart() {
		let item = cartItems.find((i) => i.title === title);
		if (item) {
			const updatedCartItems = cartItems
				.map((i) => {
					if (i.title === title) {
						if (i.quantity <= 1) {
							return null;
						} else {
							return {
								...i,
								quantity: i.quantity - 1,
							};
						}
					} else {
						return i;
					}
				})
				.filter((i) => i !== null);
			dispatch(set({ key: "cartItems", value: updatedCartItems }));
			dispatch(setCartItemCount());
		}
	}

	return (
		<Card sx={{ minWidth: 350 }}>
			<CardMedia sx={{ height: 150 }} image={url} title={title} />
			<CardContent>
				<Typography
					sx={{ fontWeight: "bold" }}
					gutterBottom
					variant="h5"
					component="div"
				>
					{title}
				</Typography>
				<Typography variant="body1">{trim(desc)}</Typography>
				<Typography variant="h6">{`BDT ${price}`}</Typography>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<ShoppingCartRoundedIcon />
					<Typography variant="h6" sx={{ mx: 1 }}>
						{quantity}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<CustomButton label="Details" onClick={handleDetail} />
				<CustomButton
					startIcon={<AddCircleOutlineRoundedIcon />}
					label={"Add"}
					onClick={addToCart}
				/>
				<CustomButton
					startIcon={<RemoveCircleOutlineRoundedIcon />}
					label={"Remove"}
					onClick={removeFromCart}
				/>
			</CardActions>
		</Card>
	);
}
