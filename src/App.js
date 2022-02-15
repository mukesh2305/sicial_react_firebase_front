import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

// material-ui stuff
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute.js";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";

// code
const theme = createTheme(themeFile);
const token = localStorage.getItem("fbIdToken");

// let authendicated;
// if (token) {
// 	const decodedToken = jwtDecode(token);
// 	console.log(decodedToken);
// 	if (decodedToken.exp * 1000 < Date.now()) {
// 		authendicated = false;
// 		localStorage.removeItem('fbIdToken');
// 		window.location.href = '/login';
// 	} else {
// 		authendicated = true;
// 	}
// }
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
// console.log("authendicated", authendicated);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route element={<AuthRoute />}>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
