import {
    container,
    homeYellowColor,
    homeBackColor,
    homeDividerColor,
    homeTextColor1
} from "assets/jss/material-dashboard-pro-react.js";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
  
const homePageStyle = theme => ({
    ...sweetAlertStyle,
    container: {
      ...container,
      marginTop: "40px",
      zIndex: "4",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "100px",
        marginTop: "20px",
      }
    },
    backdrop: {
        zIndex: 99999,
        color: '#fff',
    },
    titleImg: {
        position: "relative",
        backgroundImage: "url(/img/GOLFPUNKS.b2b4852674769f4730c7.gif)",
        backgroundSize: "cover",
        minHeight: "25rem!important",
        borderRadius: "3px",
        boxShadow: "rgb(238 238 238) 0px 0px 5px",
        border: "2px solid rgb(66, 163, 105) !important"
    },
    titleText: { 
        textAlign: "center",
        fontSize: "4rem !important",
        fontWeight: "500",
        lineHeight: "1.2!important",
        [theme.breakpoints.down("sm")]: {
            marginTop: "20px",
        }
    },
    mintCountBlock: {
        margin: "auto",
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    numberButton: {
        cursor: "pointer",
        minHeight: "32px",
        minWidth: "32px",
        fontSize: "20px",
        margin: "12px 8px 0 8px"
    },
    mintNumberContainer: { 
        background: "#fff",
        "&:before": {
            display: "none"
        },
        "&:after": {
            display: "none"
        },
        "& input": {
            appearance: "none",
            textAlign: "center",
            fontSize: "30px !important",
            padding: "2px 8px",
            fontWeight: "500",
            fontFamily: "Tanker !important"
        },
        "& input::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: "0"
        }
    },
    mintNumberInputCtrl: {
    },
    mintButonBlock: {
        textAlign: "center"
    },
    rightBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    connectWallet: {
        minWidth: "12rem",
        fontFamily: 'Tanker',
        color: "#000",
        background: "#52cc83",
        borderRadius: "6px !important",
        fontSize: "18px",
        padding: "5px 10px",
        boxShadow: "0 4px 0 0 #2f9e5b",
        "&:hover" : {
          pointer: "cursor",
          color: "#000 !important",
          background: "#52cc83",
          boxShadow: "0 4px 0 0 #2f9e5b",
        },
        "&:focus" : {
            color: "#000 !important",
            backgroundColor: "#52cc83",
            boxShadow: "0 4px 0 0 #2f9e5b",
        },
    }
  });
  
  export default homePageStyle;
  