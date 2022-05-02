import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./redux/store";
import { HomePage, Register, Login, ControlDevice, TempPage,SoilPage,SoundPage,LightPage } from "./pages";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./components/ScrollTop";
// import { utils } from './helpers';
// import { loadUser } from './redux/auth/authSlice';

// const { setAuthToken } = utils;

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  // useEffect(() => store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* <PrivateRoute exact path="/feedback" component={Feedback} />
          <PrivateRoute exact path="/thanks" component={ConfirmPage} /> */}

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route path="/control" component={ControlDevice} />
          <Route path="/temperature" component={TempPage} />
          <Route path="/moisture" component={SoilPage} />
          <Route path="/sound" component={SoundPage} />
          <Route path="/light" component={LightPage} />
          {/* <PrivateRoute path="/payment" component={PaymentPage} />

          <PrivateRoute exact path="/report" component={ReportPage} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
