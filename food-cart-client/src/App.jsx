import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import FoodItemList from "./components/FoodItemList";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<Signin />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				>
					<Route index path="/" element={<FoodItemList />} />
					<Route
						path="cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route />
			</Routes>
		</BrowserRouter>
	);
}
