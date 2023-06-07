import "@fontsource/inter";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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
