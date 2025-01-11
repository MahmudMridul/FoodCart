import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
