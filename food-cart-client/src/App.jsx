import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signin />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}
