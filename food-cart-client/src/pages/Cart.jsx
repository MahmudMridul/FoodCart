import { Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
	const cartItems = useSelector((state) => state.app.cartItems);
	return (
		<Grid2 container columns={12} columnSpacing={4}>
			<Grid2 item size={9}>
				<Grid2 container columns={12} columnSpacing={2} rowSpacing={3}>
					{cartItems.length > 0 &&
						cartItems.map((item, index) => {
							return (
								<Grid2 key={index} item size={4}>
									<CartItem
										title={item.title}
										desc={item.desc}
										price={item.price}
										charity={item.charity}
										url={item.url}
										quantity={item.quantity}
									/>
								</Grid2>
							);
						})}
				</Grid2>
			</Grid2>
			<Grid2 item size={3}>
				<OrderSummary />
			</Grid2>
		</Grid2>
	);
}
