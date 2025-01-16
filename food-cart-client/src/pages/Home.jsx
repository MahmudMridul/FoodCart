import FoodItem from "../components/FoodItem";

export default function Home() {
	const user = JSON.parse(localStorage.getItem("user"));
	return (
		<>
			<h4>{user.userName}</h4>
			<FoodItem title="Biriyani" desc="Biriyani" />
		</>
	);
}
