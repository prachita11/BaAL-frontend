import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Main from "./components/Main";
import Developer from "./components/DevelopersPortal";
import DeveloperLogin from "./components/DeveloperLogin";
import DeveloperRegister from "./components/DeveloperRegister";
import DeveloperDashboard from "./components/DeveloperDashboard";
import ForgotPassword from "./components/ForgotPassword";
import Payment from "./components/Payment";
import SuccessPage from "./components/SuccessPage";
import { useSelector } from "react-redux";
import CheckoutForm from "./components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import FailedPage from "./components/FailedPage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IjjliSD8g54xptxjxFfH9nGPjacwbzP0tJChpoWhgiMBP8Kwwrdr423x12ZW8McmLX2ENBPD5CpklswoANEKLri00CP216whs"
);
const App = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Router className="main">
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/api" component={Developer}></Route>
        <Route
          path="/dev/login"
          render={() =>
            auth == "" || auth == undefined ? (
              <DeveloperLogin></DeveloperLogin>
            ) : (
              <Redirect to="/dev/home" />
            )
          }
        ></Route>
        <Route
          path="/dev/forgotPass"
          render={() =>
            auth == "" || auth == undefined ? (
              <ForgotPassword></ForgotPassword>
            ) : (
              <Redirect to="/dev/home" />
            )
          }
        ></Route>
        <Route
          path="/dev/register"
          render={() =>
            auth == "" || auth == undefined ? (
              <DeveloperRegister></DeveloperRegister>
            ) : (
              <Redirect to="/dev/home" />
            )
          }
        ></Route>
        <Route
          path="/dev/home"
          render={() =>
            auth !== "" && auth !== undefined ? (
              <DeveloperDashboard></DeveloperDashboard>
            ) : (
              <Redirect to="/dev/login" />
            )
          }
        ></Route>
        <Route
          path="/dev/plan"
          render={() =>
            auth !== "" && auth !== undefined ? (
              <Payment></Payment>
            ) : (
              <Redirect to="/dev/login" />
            )
          }
        ></Route>
        <Route
          path="/dev/success"
          render={() =>
            auth !== "" && auth !== undefined ? (
              <SuccessPage></SuccessPage>
            ) : (
              <Redirect to="/dev/login" />
            )
          }
        ></Route>
        <Route
          path="/dev/failed"
          render={() =>
            auth !== "" && auth !== undefined ? (
              <FailedPage></FailedPage>
            ) : (
              <Redirect to="/dev/login" />
            )
          }
        ></Route>
        <Route
          path="/dev/checkout"
          render={() =>
            auth !== "" && auth !== undefined ? (
              <Elements stripe={stripePromise}>
                {" "}
                <CheckoutForm></CheckoutForm>
              </Elements>
            ) : (
              <Redirect to="/dev/login" />
            )
          }
        ></Route>
      </Switch>
    </Router>
  );
};
export default App;
