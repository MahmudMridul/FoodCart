import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

FoodItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
};

export default function FoodItem({ title, desc }) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image="/assets/images/biriyani.jpg" // path to biriyani.jpg
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
				<CustomButton label="Details" />
				<CustomButton label="Add to Cart" />
			</CardActions>
		</Card>
	);
}
