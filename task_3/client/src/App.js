import "./App.css";
import Home from "./compponents/Home";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminLogin from "./compponents/AdminLogin";
import StudentLogin from "./compponents/StudentLogin";
import StudentRegister from "./compponents/StudentRegister";
import AdminRegister from "./compponents/AdminRegister";
import DashBoard from "./compponents/DashBoard";
import PrivateRoute from "./compponents/PrivateRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/student/login' component={StudentLogin} />
          <Route exact path='/admin/register' component={AdminRegister} />
          <Route exact path='/student/register' component={StudentRegister} />
          <PrivateRoute exact path='/admin/dashboard' component={DashBoard} />


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
