import { useDispatch, useSelector } from "react-redux";
import { base } from "../helpers/images";
import { useEffect } from "react";
import { getFoodItems } from "../slices/appSlice";
import FoodItem from "./FoodItem";
import { Grid2 } from "@mui/material";

export default function FoodItemList() {
	const dispatch = useDispatch();
	const foodItems = useSelector((state) => state.app.foodItems);
	const baseUrl = base;

	useEffect(() => {
		if (foodItems.length === 0) {
			dispatch(getFoodItems());
		}
	}, []);
	return (
		<Grid2 container columns={12} columnSpacing={2} rowSpacing={3}>
			{foodItems.length > 0 &&
				foodItems.map((item, index) => {
					return (
						<Grid2 key={index} item xs={3}>
							<FoodItem
								title={item.name}
								desc={item.description}
								url={`${baseUrl}/${item.imageUrl}`}
								price={item.price}
							/>
						</Grid2>
					);
				})}
		</Grid2>
	);
}
