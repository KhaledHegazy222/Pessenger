import "@fontsource/inter";
import "./App.css";
import routes from "./pages/routes";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isLoading } = useAuth();
  console.log(process.env.REACT_APP_API_URL);
  return <div>{isLoading ? <></> : routes}</div>;
}

export default App;
