import { RouterProvider } from "react-router-dom";
import { Router } from "./pages/modules/portal-sekolah/profile";
import { ErrorBoundary } from "./pages/error";

function App() {
	return (
		<>
			<ErrorBoundary>
				<RouterProvider router={Router} />
			</ErrorBoundary>
		</>
	);
}

export default App;
