import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const connectWalletStyle = theme => ({
  ...sweetAlertStyle,
  connectWallet: {
    border: "none",
    boxShadow: "0 4px 0 0 #2f9e5b",
    cursor: "pointer",
    opacity: 1,
    outline: "none",
    fontFamily: "Tanker",
    color: "#000",
    backgroundColor: "#52cc83",
    borderRadius: "6px !important",
    fontSize: "18px",
    padding: "5px 10px",
    "&:hover" : {
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

export default connectWalletStyle;
