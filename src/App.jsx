import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from './routes/routes';
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from "./Context/AuthContext";

const App = () => {


	const queryClientCinfig = new QueryClient();

	return (
		<QueryClientProvider client={queryClientCinfig}>
			<RouterProvider router={routes} />
			<ToastContainer />
		</QueryClientProvider>
	);
};

export default App;
