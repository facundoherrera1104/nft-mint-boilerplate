import React from "react";
import { Switch, Route } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import ErrorPage from "views/Pages/ErrorPage.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/mainStyle.js";

import backImage from "assets/img/background/background-wallpaper-1920x1080.png";

const useStyles = makeStyles(styles);

export default function Pages(props) {
  const { ...rest } = props;

  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();

  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.path === "/") {   
        return (
          <Route
            exact            
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return (
          <Route component={ErrorPage} key={key} />
        );          
      }
    });
  };
  const getActiveRoute = routes => {
    let activeRoute = "NFT";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        return routes[i].name;
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <div>
      <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          // style={{ backgroundImage: "url(" + backImage + ")" }}
        >
          <Switch>
            { getRoutes(routes) }
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  );
}
