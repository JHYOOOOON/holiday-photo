import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import PhotoBook from "./pages/PhotoBook";
import TakePhoto from "./pages/TakePhoto";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/takephoto" element={<TakePhoto />} />
				<Route path="/photobook" element={<PhotoBook />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
