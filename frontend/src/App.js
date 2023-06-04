import "@fontsource/inter";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import routes from "./pages/routes";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { isLoading } = useAuth();
  return (
    <div>
      <ToastContainer />
      {isLoading ? <></> : routes}
    </div>
  );
}

export default App;
