import { Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

export default function Cart() {
	const cartItems = useSelector((state) => state.app.cartItems);
	return (
		<Grid2 container columns={12} columnSpacing={2} rowSpacing={3}>
			{cartItems.length > 0 &&
				cartItems.map((item, index) => {
					return (
						<Grid2 key={index} item xs={12}>
							<CartItem
								title={item.title}
								desc={item.desc}
								price={item.price}
								url={item.url}
								quantity={item.quantity}
							/>
						</Grid2>
					);
				})}
		</Grid2>
	);
}
