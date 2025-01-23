import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import CustomButton from "./CustomButton";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";

const columns = [
	{ field: "item", headerName: "Item", width: 150 },
	{
		field: "quantity",
		headerName: "Quantity",
		width: 80,
	},
	{
		field: "price",
		headerName: "Price",
		width: 80,
	},
	{
		field: "total",
		headerName: "Total",
		width: 80,
	},
];

export default function OrderSummary() {
	const { cartItems, cartItemCount } = useSelector((state) => state.app);
	const { totalPrice, items } = prepItems();

	function prepItems() {
		let items = [];
		let totalPrice = 0;
		for (let i = 0; i < cartItems.length; i++) {
			let item = cartItems[i];
			let total = item.price * item.quantity;
			totalPrice += total;
			items.push({
				id: i,
				item: item.title,
				quantity: item.quantity,
				price: item.price,
				total,
			});
		}
		return { totalPrice, items };
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Summary
			</Typography>

			<DataGrid
				sx={{ my: 2 }}
				rows={items}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[5, 10, 20]}
				disableRowSelectionOnClick
			/>
			<Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
				Total Quantity: {cartItemCount}
			</Typography>
			<Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
				Total Price: {totalPrice} BDT
			</Typography>

			<CustomButton
				label="Place Order"
				startIcon={<ShoppingCartCheckoutRoundedIcon />}
				sx={{ my: 2 }}
				disabled={cartItemCount === 0}
			/>
		</Box>
	);
}
