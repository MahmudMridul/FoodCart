import FoodItem from "../components/FoodItem";
import NavBar from "../components/NavBar";

export default function Home() {
	return (
		<>
			<NavBar />

			<FoodItem title="Biriyani" desc="Biriyani" />
		</>
	);
}
