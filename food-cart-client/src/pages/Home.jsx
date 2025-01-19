import { useEffect } from "react";
import FoodItem from "../components/FoodItem";
import NavBar from "../components/NavBar";
import { base } from "../helpers/images";
import { getFoodItems } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const dispatch = useDispatch();
	const foodItems = useSelector((state) => state.app.foodItems);
	const baseUrl = base;

	useEffect(() => {
		if (foodItems.length === 0) {
			dispatch(getFoodItems());
		}
	}, []);

	return (
		<>
			<NavBar />
			{foodItems.length > 0 &&
				foodItems.map((item, index) => {
					return (
						<FoodItem
							key={index}
							title={item.name}
							desc={item.description}
							url={`${baseUrl}/${item.imageUrl}`}
						/>
					);
				})}
		</>
	);
}
