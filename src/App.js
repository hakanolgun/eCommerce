import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div id="content">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:product_id" component={ProductDetail} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/basket" component={Basket} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/admin" component={Admin} admin={true} />
            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
