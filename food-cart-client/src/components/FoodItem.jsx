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
import { Box, ButtonGroup } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useState } from "react";

FoodItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	inCart: PropTypes.bool,
};

export default function FoodItem({ title, desc, url, price, inCart = false }) {
	const dispatch = useDispatch();
	const { cartItemCount, cartItems } = useSelector((state) => state.app);
	const [count, setCount] = useState(0);

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
		setCount(count + 1);
	}

	function removeFromCart() {
		let item = cartItems.find((i) => i.title === title);
		if (item) {
			const updatedCartItems = cartItems.map((i) => {
				if (i.title === title) {
					if (i.quantity <= 1) {
						setCount(0);
						return {
							...i,
							quantity: 0,
						};
					} else {
						setCount(count - 1);
						return {
							...i,
							quantity: i.quantity - 1,
						};
					}
				} else {
					return i;
				}
			});
			dispatch(set({ key: "cartItems", value: updatedCartItems }));
			dispatch(setCartItemCount());
		}
	}

	return (
		<Card sx={{ maxWidth: 350 }}>
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
					<Typography variant="h5" sx={{ mx: 1 }}>
						{count}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<CustomButton label="Details" onClick={handleDetail} />
				<ButtonGroup>
					<CustomButton
						startIcon={<AddRoundedIcon />}
						label=""
						onClick={addToCart}
					/>
					<CustomButton
						startIcon={<RemoveRoundedIcon />}
						label=""
						onClick={removeFromCart}
					/>
				</ButtonGroup>
			</CardActions>
		</Card>
	);
}
