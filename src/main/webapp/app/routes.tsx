import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import Loadable from "react-loadable";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import Dashboard from "./modules/dashboard/Dashboard";
import RetailerListing from "./modules/Retailer/RetailerList/RetailerList";
import { ROUTES } from "./routes/appRoutes";

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ "app/modules/account"),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ "app/modules/administration"),
  loading: () => <div>loading ...</div>,
});

const Routes = () => {
  return (
    <div className="view-routes">
      <Switch>
        {/* <ErrorBoundaryRoute path="/login" component={Login} /> */}
        {/* <ErrorBoundaryRoute path="/logout" component={Logout} />
        <ErrorBoundaryRoute path="/account/register" component={Register} />
        <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
        <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
        <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
        <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} /> */}
        <ErrorBoundaryRoute path="/" exact component={RetailerListing} />
        <ErrorBoundaryRoute path="/retailer" exact component={RetailerListing} />
        <ErrorBoundaryRoute path="/dashboard" exact component={Dashboard} />
        {/* <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
        <ErrorBoundaryRoute component={PageNotFound} /> */}
      </Switch>
    </div>
  );
};

export default Routes;
