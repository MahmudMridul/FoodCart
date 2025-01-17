import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import { setOpen } from "../slices/appSlice";
import { useDispatch } from "react-redux";

FoodItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
};

export default function FoodItem({ title, desc }) {
	const dispatch = useDispatch();
	function handleDetail() {
		dispatch(setOpen(true));
	}
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image="D:/Projects/FoodCart/FoodImages/biriyani.jpg" // path to biriyani.jpg
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{desc}
				</Typography>
			</CardContent>
			<CardActions>
				<CustomButton label="Details" onClick={handleDetail} />
				<CustomButton label="Add to Cart" />
			</CardActions>
		</Card>
	);
}
