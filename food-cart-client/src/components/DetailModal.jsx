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
	const state = useSelector((store) => store.app);
	const { open, modalItem } = state;
	function handleClose() {
		dispatch(setOpen(false));
	}

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<img
						src={modalItem?.url}
						style={{ width: "100%", height: "100%", marginBottom: 10 }}
					/>
					<Typography variant="h5" gutterBottom>
						{modalItem?.title}
					</Typography>
					<Typography variant="body2">{modalItem?.desc}</Typography>
				</Box>
			</Modal>
		</div>
	);
}
