import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<Login />} />
      </Switch>
    </Router>
  );
};

export default App;
