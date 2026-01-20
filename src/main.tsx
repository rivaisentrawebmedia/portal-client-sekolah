import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./provider/index.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
	<Providers>
		<App />
		<ToastContainer
			theme={"colored"}
			position={"bottom-right"}
			closeOnClick={true}
			limit={1500}
		/>
	</Providers>,
);
