import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import { set, setOpen } from "../slices/appSlice";
import { useDispatch } from "react-redux";
import { trim } from "../helpers/functions";

FoodItem.propTypes = {
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default function FoodItem({ title, desc, url }) {
	const dispatch = useDispatch();
	function handleDetail() {
		const item = { title, desc, url };
		dispatch(set({ key: "modalItem", value: item }));
		dispatch(setOpen(true));
	}
	return (
		<Card sx={{ maxWidth: 350 }}>
			<CardMedia sx={{ height: 150 }} image={url} title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body1" sx={{ color: "text.secondary" }}>
					{trim(desc)}
				</Typography>
			</CardContent>
			<CardActions>
				<CustomButton label="Details" onClick={handleDetail} />
				<CustomButton label="Add to Cart" />
			</CardActions>
		</Card>
	);
}
