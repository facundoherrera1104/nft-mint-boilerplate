import HomePage from "views/HomePage.js";
import ErrorPage from "views/Pages/ErrorPage.js";

var dashRoutes = [
  {
    path: "/",
    name: "NFT Minting",
    component: HomePage,
    layout: "/user"
  },
  {
    path: "/404",
    name: "Error Page",
    component: ErrorPage,
    layout: "/user"
  }
];

export default dashRoutes;
