import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { setOpen } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

export default function DetailModal() {
	const dispatch = useDispatch();
	const open = useSelector((store) => store.app.open);
	function handleClose() {
		dispatch(setOpen(false));
	}

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Typography variant="h6">Text in a modal</Typography>
					<Typography sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
