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

FoodItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};

export default function FoodItem({ title, desc, url, price }) {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.app);

	function handleDetail() {
		const item = { title, desc, url, price };
		dispatch(set({ key: "modalItem", value: item }));
		dispatch(setOpen(true));
	}

	function isItemInCart() {
		let item = cartItems.find((i) => i.title === title);
		if (item) {
			return true;
		}
		return false;
	}

	function addToCart() {
		if (isItemInCart()) {
			return;
		}
		let item = cartItems.find((i) => i.title === title);
		if (!item) {
			item = { title, desc, url, price, charity: false, quantity: 1 };
			dispatch(pushToCart(item));
			dispatch(setCartItemCount());
		}
	}

	return (
		<Card sx={{ minWidth: 350 }}>
			<CardMedia sx={{ height: 150 }} image={url} title={title} />
			<CardContent>
				<Typography
					sx={{
						fontWeight: "bold",
						"&:hover": {
							cursor: "pointer",
							textDecoration: "underline",
						},
					}}
					onClick={handleDetail}
					gutterBottom
					variant="h5"
					component="div"
				>
					{title}
				</Typography>
				<Typography variant="body1">{trim(desc)}</Typography>
				<Typography variant="h6">{`BDT ${price}`}</Typography>
			</CardContent>
			<CardActions>
				<CustomButton
					label={isItemInCart() ? "In Cart" : "Add to Cart"}
					onClick={addToCart}
				/>
			</CardActions>
		</Card>
	);
}
