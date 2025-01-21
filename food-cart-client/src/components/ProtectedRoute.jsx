import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import { isTokenExpired } from "../helpers/functions";

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function ProtectedRoute({ children }) {
	const user = JSON.parse(localStorage.getItem("user"));
	const accessToken = user ? user.accessToken : null;
	const location = useLocation();

	if (isTokenExpired(accessToken)) {
		localStorage.removeItem("user");
	}

	if (!accessToken) {
		return <Navigate to={"/signin"} state={{ from: location }} replace />;
	}
	return children;
}
